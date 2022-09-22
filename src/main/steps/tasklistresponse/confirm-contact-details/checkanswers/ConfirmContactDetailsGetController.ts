import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
//import { LanguagePreference } from '../../../../app/case/definition';
@autobind
export default class ConfirmContactDetailsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const redirect = false;

    if (req.session?.user) {
      res.locals.isLoggedIn = true;
      req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    }
    req.session.userCase.citizenUserFirstNames = 'John2';
    req.session.userCase.citizenUserLastNames = 'Smith';
    //req.session.userCase.citizenUserFullName = 'John Smith';
    req.session.userCase.citizenUserPlaceOfBirth = 'London';
    req.session.userCase.applicant1Address1 = 'Flat 100';
    req.session.userCase.applicant1Address2 = 'Plashet Grove';
    req.session.userCase.applicant1AddressTown = 'London';
    req.session.userCase.citizenUserPhoneNumber = '1234567890';
    req.session.userCase.citizenUserEmailAddress = 'test@gmail.com';
    req.session.userCase.citizenUserDateOfBirth = { day: '20', month: '1', year: '2000' };

    const callback = redirect ? undefined : () => super.get(req, res);
    super.saveSessionAndRedirect(req, res, callback);
  }
}
