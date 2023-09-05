import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../steps/tasklistresponse/utils';
import {
  APPLICANT_PRIVATE_DETAILS_CONFIRMED,
  APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPONDENT_PRIVATE_DETAILS_CONFIRMED,
  RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
} from '../../../steps/urls';

import { mapConfidentialListToFields, prepareKeepDetailsPrivateRequest } from './KeepYourDetailsPrivateMapper';

@autobind
export class KeepDetailsPrivatePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, 'https://return-url');

    if (partyDetails) {
      const request = prepareKeepDetailsPrivateRequest(userCase);
      if (userCase.caseTypeOfApplication === CaseType.C100 && partyType === PartyType.APPLICANT) {
        Object.assign(partyDetails, mapConfidentialListToFields(request));
      }
      Object.assign(partyDetails.response, { keepDetailsPrivate: request });
      try {
        req.session.userCase = await client.updateCaseData(
          user,
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.KEEP_DETAILS_PRIVATE
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => {
          const redirectUrl = getRedirectUrl(req, partyType);
          res.redirect(redirectUrl);
        });
      } catch (error) {
        throw new Error('KeepDetailsPrivatePostController - Case could not be updated.');
      }
    }
  }
}
function getRedirectUrl(req: AppRequest<AnyObject>, partyType: PartyType): string {
  let redirectUrl;
  if (partyType === PartyType.RESPONDENT) {
    redirectUrl =
      req.session.userCase?.startAlternative === YesOrNo.NO
        ? RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED
        : RESPONDENT_PRIVATE_DETAILS_CONFIRMED;
  } else {
    redirectUrl =
      req.session.userCase?.startAlternative === YesOrNo.NO
        ? APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED
        : APPLICANT_PRIVATE_DETAILS_CONFIRMED;
  }
  return redirectUrl;
}
