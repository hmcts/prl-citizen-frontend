import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getCaseDetails, getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { caseApi } from '../../app/case/C100CaseApi';
import { getCaseApi } from '../../app/case/CaseApi';
import { CosApiClient } from '../../app/case/CosApiClient';
// import { LanguagePreference } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { getFeatureToggle } from '../../app/utils/featureToggles';
import {
  C100_URL,
  CALLBACK_URL,
  CITIZEN_HOME_URL,
  DASHBOARD_URL,
  PageLink,
  SIGN_IN_URL,
  SIGN_OUT_URL,
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
      let callback: PageLink = CALLBACK_URL;
      if (req.query?.callback && req.query?.callback !== '/') {
        const url = encodeURIComponent(req.query?.callback as string);
        callback = `${CALLBACK_URL}?callback=${url}` as PageLink;
      }
      console.log(callback);
      const url = getRedirectUrl(`${protocol}${res.locals.host}${port}`, callback);
      res.redirect(url);
    });

    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));

    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, CALLBACK_URL);
          req.session.save(() => res.redirect(DASHBOARD_URL));
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
          req.locals.logger.info('C100 - Launch Darkly Flag', c100RebuildLdFlag);
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
                  const data = { applicantCaseName: 'Tom Jerry - updated' };
                  await client.linkCaseToCitizen1(
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
                //TODO Log error saying case linking has failed
              }
            }
          }

          if (!req.session.userCase) {
            //This language preference will be used while creating a case
            // const languagePreference =
            //   req.session['lang'] === 'cy' ? LanguagePreference.WELSH : LanguagePreference.ENGLISH;
            // req.session.userCase = await req.locals.api.getOrCreateCase(
            //   res.locals.serviceType,
            //   req.session.user,
            //   languagePreference
            // );
            //setting the applicant's preferred language in session
            // req.session['lang'] =
            // req.session.userCase.applicant1LanguagePreference === LanguagePreference.WELSH ? 'cy' : 'en';
          }
          //TODO pvt law team to revisit & correct
          if (req.path.startsWith(DASHBOARD_URL)) {
            try {
              req.session.userCaseList = await getCaseDetails(req);
            } catch (e) {
              req.locals.logger.error('**** getCaseDetails error', e);
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
