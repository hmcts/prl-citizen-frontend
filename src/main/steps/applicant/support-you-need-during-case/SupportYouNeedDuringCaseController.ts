import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../steps/tasklistresponse/utils';
import {
  APPLICANT_TASK_LIST_URL,
  PARTY_TASKLIST,
  RESPONDENT_TASK_LIST_URL,
  RESPOND_TO_APPLICATION,
} from '../../../steps/urls';

import { prepareSupportYouNeedDuringCaseRequest } from './SupportYouNeedDuringYourCaseService';
@autobind
export class SupportYouNeedDuringYourCaseController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    try {
      const { user, userCase } = req.session;
      const partyType = getCasePartyType(userCase, user.id);
      const partyDetails = getPartyDetails(userCase, user.id);
      const client = new CosApiClient(user.accessToken, 'https://return-url');
      if (partyDetails) {
        Object.assign(partyDetails.response, { supportYouNeed: prepareSupportYouNeedDuringCaseRequest(userCase) });
        req.session.userCase = await client.updateCaseData(
          user,
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.SUPPORT_YOU_DURING_CASE
        );
        mapDataInSession(req.session.userCase, user.id);

        let return_url;
        if (partyType === PartyType.APPLICANT) {
          return_url = APPLICANT_TASK_LIST_URL;
        } else {
          return_url = this.getReturnUrl(req);
        }

        req.session.save(() => res.redirect(return_url));
      }
    } catch (err) {
      throw new Error('SupportDuringCase - Case could not be updated.');
    }
  }

  private getReturnUrl = (req: AppRequest) => {
    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      return req.session.applicationSettings?.navfromRespondToApplication
        ? RESPOND_TO_APPLICATION
        : applyParms(`${PARTY_TASKLIST}`, { partyType: PartyType.RESPONDENT });
    } else {
      return req.session.applicationSettings?.navfromRespondToApplication
        ? RESPOND_TO_APPLICATION
        : RESPONDENT_TASK_LIST_URL;
    }
  };
}
