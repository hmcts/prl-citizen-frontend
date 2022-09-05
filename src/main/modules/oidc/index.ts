import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getCaseDetails, getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { CosApiClient } from '../../app/case/CosApiClient';
// import { LanguagePreference } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { CALLBACK_URL, CITIZEN_HOME_URL, SIGN_IN_URL, SIGN_OUT_URL } from '../../steps/urls';

/**
 * Adds the oidc middleware to add oauth authentication
 */
export class OidcMiddleware {
  public enableFor(app: Application): void {
    const protocol = app.locals.developmentMode ? 'http://' : 'https://';
    const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
    const { errorHandler } = app.locals;

    app.get(SIGN_IN_URL, (req, res) =>
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, CALLBACK_URL))
    );

    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));

    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, CALLBACK_URL);
          req.session.save(() => res.redirect('/dashboard'));
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

        if (req.session?.user) {
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);

          if (req.session.userCase) {
            if (req.session.accessCodeLoginIn) {
              try {
                const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
                if (req.session.userCase.caseCode && req.session.userCase.accessCode) {
                  const caseReference = req.session.userCase.caseCode;
                  const accessCode = req.session.userCase.accessCode;
                  const data = { applicantCaseName: 'Tom Jerry - updated' };
                  // const caseworkerUser = await getSystemUser();
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
          req.session.userCaseList = await getCaseDetails(req);
          return next();
        } else {
          res.redirect(SIGN_IN_URL);
        }
      })
    );
  }
}
