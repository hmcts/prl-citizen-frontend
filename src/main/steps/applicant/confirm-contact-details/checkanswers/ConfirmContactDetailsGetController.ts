import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { Applicant } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { getContactDetails } from '../../../../steps/common/confirm-contact-details/checkanswers/ContactDetailsMapper';
import { APPLICANT_CHECK_ANSWERS, APPLICANT_CONTACT_DETAILS, APPLICANT_PERSONAL_DETAILS } from '../../../../steps/urls';
@autobind
export default class ConfirmContactDetailsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    const caseReference = req.params?.caseId;

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    Object.assign(req.session.userCase, caseDataFromCos);

    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
        if (applicant?.value?.user?.idamId === req.session?.user.id) {
          Object.assign(req.session.userCase, getContactDetails(applicant.value, req));
        }
      });
    } else {
      Object.assign(req.session.userCase, getContactDetails(req.session.userCase.applicantsFL401!, req));
    }

    let redirectUrl = APPLICANT_CHECK_ANSWERS;

    if (
      req.session.userCase.citizenUserFullName ||
      req.session.userCase.citizenUserDateOfBirth ||
      req.session.userCase.citizenUserPlaceOfBirth
    ) {
      redirectUrl = APPLICANT_PERSONAL_DETAILS;
    } else if (req.session.userCase.citizenUserEmailAddress || req.session.userCase.citizenUserPhoneNumber) {
      redirectUrl = APPLICANT_CONTACT_DETAILS;
    }

    req.session.save(() => res.redirect(redirectUrl));
  }
}
