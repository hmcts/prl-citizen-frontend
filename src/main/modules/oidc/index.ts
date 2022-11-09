import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getCaseDetails, getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { CosApiClient } from '../../app/case/CosApiClient';
// import { LanguagePreference } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  C100_REBUILD_URL,
  CALLBACK_URL,
  CITIZEN_HOME_URL,
  DASHBOARD_URL,
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

    app.get(SIGN_IN_URL, (req, res) =>
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, CALLBACK_URL))
    );

    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));

    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          console.log('*****Trying to login');
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, CALLBACK_URL);
          console.log('*****Logged in user is: ' + req.session.user.email);
          console.log('*****Redirecting to dashboard');
          req.session.save(() => res.redirect('/dashboard'));
        } else {
          console.log('***** Finding path');
          if (!req.session?.accessCodeLoginIn) {
            console.log('***** Redirecting to home url');
            res.redirect(CITIZEN_HOME_URL);
          } else {
            console.log('***** Redirecting to login');
            res.redirect(SIGN_IN_URL);
          }
        }
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        console.log('inside app.use');
        console.log('req.path is ' + req.path);
        //Skipping for C100 rebuild
        if (req.path.startsWith(CITIZEN_HOME_URL || C100_REBUILD_URL) && !req.session?.user) {
          return next();
        }
        console.log('inside oidc, finding user');
        if (req.session?.user) {
          console.log('***** User login success');
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);

          if (req.session.userCase) {
            console.log('****** inside oidc, user case found');
            if (req.session.accessCodeLoginIn) {
              try {
                console.log('****** access code login is valid');
                const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
                if (req.session.userCase.caseCode && req.session.userCase.accessCode) {
                  console.log('****** validating access code');
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
                  console.log('****** validating access code, link success');
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
            console.log('****** inside oidc, trying to get the cases');
            try {
              req.session.userCaseList = await getCaseDetails(req);
            } catch (e) {
              console.log('**** getCaseDetails error', e);
            }
          }
          return next();
        } else {
          console.log('****** login failed, no user details found');
          res.redirect(SIGN_IN_URL);
        }
      })
    );
  }
}
