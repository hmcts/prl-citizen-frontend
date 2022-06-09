import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
//import { LanguagePreference } from '../../../../app/case/definition';
@autobind
export default class ApplicantConfirmContactDetailsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const redirect = false;

    if (req.session?.user) {
      res.locals.isLoggedIn = true;
      req.locals.api = getCaseApi(req.session.user, req.locals.logger);
      if (!req.session.userCase) {
        //This language preference will be used while creating a case
        //  const languagePreference =
        //    req.session['lang'] === 'cy' ? LanguagePreference.WELSH : LanguagePreference.ENGLISH;
        //req.session.userCase = await req.locals.api.getCaseById('1651759489115676');
        //setting the applicant's preferred language in session
        // req.session['lang'] =
        //   req.session.userCase.applicant1LanguagePreference === LanguagePreference.WELSH ? 'cy' : 'en';
      }
      //return next();
    }

    //console.log("BEFORE call to getCaseById method====1111====>>");
    //res.locals.isLoggedIn = true;
    //req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    //await req.locals.api.getCases();
    //req.session.userCase = await req.locals.api.getCaseById('1651759489115676');

    req.session.userCase.applicant1FirstNames = 'John';
    req.session.userCase.applicant1LastNames = 'Smith';
    req.session.userCase.applicant1FullName = 'John Smith';
    req.session.userCase.applicant1PlaceOfBirth = 'London';
    req.session.userCase.applicant1Address1 = 'Flat 100';
    req.session.userCase.applicant1Address2 = 'Plashet Grove';
    req.session.userCase.applicant1AddressTown = 'London';
    req.session.userCase.applicant1PhoneNumber = '';
    req.session.userCase.applicant1PhoneNumber =
      req.session.userCase.applicant1PhoneNumber !== ''
        ? req.session.userCase.applicant1PhoneNumber
        : '<span class="govuk-error-message">Complete this section</span>';
    req.session.userCase.applicant1EmailAddress = '';
    req.session.userCase.applicant1EmailAddress =
      req.session.userCase.applicant1EmailAddress !== ''
        ? req.session.userCase.applicant1EmailAddress
        : '<span class="govuk-error-message">Complete this section</span>';
    req.session.userCase.applicant1DateOfBirth = { day: '20', month: '1', year: '2000' };

    const callback = redirect ? undefined : () => super.get(req, res);
    super.saveSessionAndRedirect(req, res, callback);
  }
}
