import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { caseApi } from '../../app/case/C100CaseApi';
import { getCaseApi } from '../../app/case/CaseApi';
import { CosApiClient } from '../../app/case/CosApiClient';
// import { LanguagePreference } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { getFeatureToggle } from '../../app/utils/featureToggles';
import { C100_URL, CALLBACK_URL, CITIZEN_HOME_URL, DASHBOARD_URL, SIGN_IN_URL, SIGN_OUT_URL } from '../../steps/urls';

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
            req.session.save(() => res.redirect(req.session.cookie.path));
          } else {
            req.session.save(() => res.redirect(DASHBOARD_URL));
          }
        } else {
          if (!req.session?.accessCodeLoginIn) {
            res.redirect(CITIZEN_HOME_URL);
          } else {
            res.redirect(SIGN_IN_URL);
          }
        }
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (req.path.startsWith(CITIZEN_HOME_URL) && !req.session?.user) {
          return next();
        }

        if (app.locals.developmentMode) {
          req.session.c100RebuildLdFlag = config.get('launchDarkly.offline');
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

          if (req.session.userCase) {
            if (req.session.accessCodeLoginIn) {
              try {
                const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
                if (req.session.userCase.caseCode && req.session.userCase.accessCode) {
                  const caseReference = req.session.userCase.caseCode;
                  const accessCode = req.session.userCase.accessCode;
                  const data = { applicantCaseName: 'DUMMY CASE DATA' };
                  await client.linkCaseToCitizen(
                    req.session.user,
                    caseReference as string,
                    req,
                    accessCode as string,
                    data
                  );
                  req.session.accessCodeLoginIn = false;
                }
              } catch (err) {
                req.session.accessCodeLoginIn = false;
              }
            }
          }
          return next();
        } else {
          const url = encodeURIComponent(req.originalUrl);
          res.redirect(SIGN_IN_URL + `?callback=${url}`);
        }
      })
    );
  }
}
