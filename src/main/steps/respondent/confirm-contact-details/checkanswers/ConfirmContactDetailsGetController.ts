import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { Respondent } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { getContactDetails } from '../../../../steps/common/confirm-contact-details/checkanswers/ContactDetailsMapper';
import {
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_PERSONAL_DETAILS,
} from '../../../../steps/urls';
//import { LanguagePreference } from '../../../../app/case/definition';
@autobind
export default class ConfirmContactDetailsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    //const redirect = false;

    // if (req.session?.user) {
    //   res.locals.isLoggedIn = true;
    //   req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    // }
    // req.session.userCase.citizenUserFirstNames = 'John1';
    // req.session.userCase.citizenUserLastNames = 'Smith';
    // req.session.userCase.citizenUserFullName = 'John Smith';
    // req.session.userCase.citizenUserPlaceOfBirth = 'London';
    // req.session.userCase.applicant1Address1 = 'Flat 100';
    // req.session.userCase.applicant1Address2 = 'Plashet Grove';
    // req.session.userCase.applicant1AddressTown = 'London';
    // req.session.userCase.citizenUserPhoneNumber = '1234567890';
    // req.session.userCase.citizenUserEmailAddress = 'test@gmail.com';
    // req.session.userCase.citizenUserDateOfBirth = { day: '20', month: '1', year: '2000' };

    // const callback = redirect ? undefined : () => super.get(req, res);
    // super.saveSessionAndRedirect(req, res, callback);

    const loggedInCitizen = req.session.user;
    const caseReference = req.session.userCase.id;

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    Object.assign(req.session.userCase, caseDataFromCos);

    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
        if (respondent?.value?.user?.idamId === req.session?.user.id) {
          Object.assign(req.session.userCase, getContactDetails(respondent.value, req));
        }
      });
    } else {
      Object.assign(req.session.userCase, getContactDetails(req.session.userCase.respondentsFL401!, req));
    }

    let redirectUrl = RESPONDENT_CHECK_ANSWERS;

    if (
      !req.session.userCase.citizenUserFullName ||
      !req.session.userCase.citizenUserDateOfBirth ||
      !req.session.userCase.citizenUserPlaceOfBirth
    ) {
      redirectUrl = RESPONDENT_PERSONAL_DETAILS;
    } else if (!req.session.userCase.citizenUserEmailAddress || !req.session.userCase.citizenUserPhoneNumber) {
      redirectUrl = RESPONDENT_CONTACT_DETAILS;
    }

    req.session.save(() => res.redirect(redirectUrl));
  }
}
