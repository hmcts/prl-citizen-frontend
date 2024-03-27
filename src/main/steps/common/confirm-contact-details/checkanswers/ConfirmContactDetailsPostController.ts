import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import {
  CaseEvent,
  CaseType,
  PartyDetails,
  PartyType,
  applicantContactPreferencesEnum,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../../steps/tasklistresponse/utils';
import {
  APPLICANT_TASKLIST_CONTACT_EMAIL_SUCCESS,
  APPLICANT_TASKLIST_CONTACT_POST_SUCCESS,
  APPLICANT_TASK_LIST_URL,
  C100_APPLICANT_TASKLIST,
  PARTY_TASKLIST,
  RESPONDENT_TASK_LIST_URL,
  RESPOND_TO_APPLICATION,
} from '../../../../steps/urls';

import {
  mapConfirmContactDetails,
  prepareRequest,
  //setContactDetails
} from './ContactDetailsMapper';

@autobind
export class ConfirmContactDetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
    console.info('** FOR SONAR **');
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, 'https://return-url');

    if (partyDetails) {
      const request = prepareRequest(userCase) as PartyDetails;
      if (userCase.caseTypeOfApplication === CaseType.C100 && partyType === PartyType.APPLICANT) {
        Object.assign(partyDetails, mapConfirmContactDetails(request));
      }
      const { response, address, ...rest } = request;
      Object.assign(partyDetails, {
        ...partyDetails,
        ...rest,
        address: {
          ...partyDetails.address,
          ...address,
        },
        response: {
          ...partyDetails.response,
          ...response,
        },
      });

      try {
        req.session.userCase = await client.updateCaseData(
          user,
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.CONFIRM_YOUR_DETAILS
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => {
          const redirectUrl = this.getRedirectUrl(partyType, req, userCase);
          res.redirect(redirectUrl);
        });
      } catch (error) {
        throw new Error('ConfirmContactDetailsPostController - Case could not be updated.');
      }
    }
  }

  private getRedirectUrl(partyType: PartyType, req: AppRequest<AnyObject>, userCase: CaseWithId) {
    let redirectUrl;
    if (partyType === PartyType.RESPONDENT) {
      // temporary until FL401 respondent tasklist refactored
      if (req.session.userCase.caseTypeOfApplication === 'C100') {
        redirectUrl = req.session.applicationSettings?.navfromRespondToApplication
          ? RESPOND_TO_APPLICATION
          : applyParms(`${PARTY_TASKLIST}`, { partyType: PartyType.RESPONDENT });
      } else {
        redirectUrl = req.session.applicationSettings?.navfromRespondToApplication
          ? RESPOND_TO_APPLICATION
          : RESPONDENT_TASK_LIST_URL;
      }
    } else if (userCase.caseTypeOfApplication === CaseType.C100) {
      redirectUrl = C100_APPLICANT_TASKLIST;
      if (req.session.applicationSettings?.navFromContactPreferences) {
        if (userCase.applicantPreferredContact === applicantContactPreferencesEnum.POST) {
          redirectUrl = APPLICANT_TASKLIST_CONTACT_POST_SUCCESS;
        } else {
          redirectUrl = APPLICANT_TASKLIST_CONTACT_EMAIL_SUCCESS;
        }
      }
    } else {
      redirectUrl = APPLICANT_TASK_LIST_URL;
    }
    return redirectUrl;
  }
}
