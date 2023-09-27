import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { caseApi } from '../../app/case/C100CaseApi';
import { getCaseApi } from '../../app/case/CaseApi';
import { CosApiClient } from '../../app/case/CosApiClient';
import { AppRequest } from '../../app/controller/AppRequest';
import { getFeatureToggle } from '../../app/utils/featureToggles';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import {
  ANONYMOUS_URLS,
  C100_URL,
  CALLBACK_URL,
  DASHBOARD_URL,
  LOCAL_API_SESSION,
  SAFEGAURD_EXCLUDE_URLS,
  SCREENING_QUESTIONS,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  TESTING_SUPPORT,
} from '../../steps/urls';

/**
 * Adds the oidc middleware to add oauth authentication
 */
export class OidcMiddleware {
  public enableFor(app: Application): void {
    const protocol = app.locals.developmentMode ? 'http://' : 'https://';
    const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
    const { errorHandler } = app.locals;

    app.get(SIGN_IN_URL, (req, res) => {
      if (req.query?.callback && req.query?.callback !== '/') {
        req.session.cookie.path = req.query?.callback as string;
      }
      const url = getRedirectUrl(`${protocol}${res.locals.host}${port}`, CALLBACK_URL);
      res.redirect(url);
    });

    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));

    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, CALLBACK_URL);
          if (req.session.cookie.path) {
            const caseId = req.session.cookie.path.split('/').pop();
            if (parseInt(caseId)) {
              req.session.save(() => res.redirect(req.session.cookie.path));
            } else {
              req.session.save(() => res.redirect(DASHBOARD_URL));
            }
          } else {
            req.session.save(() => res.redirect(DASHBOARD_URL));
          }
        } else {
          res.redirect(SIGN_IN_URL);
        }
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (app.locals.developmentMode) {
          req.session.c100RebuildLdFlag = config.get('launchDarkly.offline');
          req.session.testingSupport = config.get('launchDarkly.offline');
        }

        req.session.testingSupport = req.session.testingSupport ?? (await getFeatureToggle().isTestingSupportEnabled());

        req.session.save(async () => {
          const isAnonymousPage = ANONYMOUS_URLS.some(url => url.includes(req.path));

          if (isAnonymousPage) {
            const isScreeningPage = SCREENING_QUESTIONS.some(url => url.includes(req.path));
            if (req.session?.user && isScreeningPage) {
              return res.redirect(DASHBOARD_URL);
            }
            return next();
          }

          if (req.session?.user) {
            res.locals.isLoggedIn = true;
            req.locals.api = getCaseApi(req.session.user, req.locals.logger);

            if (!req.locals.C100Api) {
              req.locals.C100Api = caseApi(req.session.user, req.locals.logger);
            }
            const c100RebuildLdFlag: boolean =
              req.session.c100RebuildLdFlag !== undefined
                ? req.session.c100RebuildLdFlag
                : (req.session.c100RebuildLdFlag = await getFeatureToggle().isC100reBuildEnabled());
            //If C100-Rebuild URL is not part of the path, then we need to redirect user to dashboard even if they click on case
            if (req.path.startsWith(C100_URL)) {
              if (c100RebuildLdFlag) {
                return next();
              } else {
                return res.redirect(DASHBOARD_URL);
              }
            }
            //If testing support URL is not part of the path, then we need to redirect user to dashboard even if they click on link
            if (req.path.startsWith(TESTING_SUPPORT) || req.path.startsWith(LOCAL_API_SESSION)) {
              if (req.session.testingSupport) {
                return next();
              } else {
                return res.redirect(DASHBOARD_URL);
              }
            }

            if (req.session.userCase) {
              const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
              if (
                !SAFEGAURD_EXCLUDE_URLS.some(_url => req.path.startsWith(_url)) &&
                !req.path.split('/').includes(partyType)
              ) {
                return res.redirect(DASHBOARD_URL);
              }
              if (req.session.accessCodeLoginIn) {
                try {
                  const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
                  if (req.session.userCase.caseCode && req.session.userCase.accessCode) {
                    const caseReference = req.session.userCase.caseCode;
                    const accessCode = req.session.userCase.accessCode;
                    const data = { applicantCaseName: 'DUMMY CASE DATA' };

                    const linkCaseToCitizenData = await client.linkCaseToCitizen(
                      req.session.user,
                      caseReference as string,
                      req,
                      accessCode as string,
                      data
                    );
                    req.session.userCase = linkCaseToCitizenData.data;
                    req.session.accessCodeLoginIn = false;
                  }
                } catch (err) {
                  req.session.accessCodeLoginIn = false;
                }
                return req.session.save(next);
              }
            }
            return next();
          } else {
            if (req.originalUrl.includes('.css')) {
              return next();
            }
            res.redirect(SIGN_IN_URL + `?callback=${encodeURIComponent(req.originalUrl)}`);
          }
        });
      })
    );
  }
}
