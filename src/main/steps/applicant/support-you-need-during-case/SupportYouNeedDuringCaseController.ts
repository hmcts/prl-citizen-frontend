import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType } from '../../../app/case/definition';
//import { toApiFormat } from '../../../app/case/to-api-format';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../steps/tasklistresponse/utils';
import { APPLICANT_TASK_LIST_URL, RESPONDENT_TASK_LIST_URL, RESPOND_TO_APPLICATION } from '../../../steps/urls';

import { prepareRequest } from './SupportYouNeedDuringYourCaseService';
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
        Object.assign(partyDetails.response, { supportYouNeed: prepareRequest(userCase) });
        req.session.userCase = await client.updateCaseData(
          user,
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.CITIZEN_CASE_UPDATE
        );
        mapDataInSession(req.session.userCase, user.id);

        let return_url;
        if (partyType === PartyType.APPLICANT) {
          return_url = APPLICANT_TASK_LIST_URL;
        } else if (partyType === PartyType.RESPONDENT && req.session.userCase.caseTypeOfApplication === 'C100') {
          return_url = req.session.applicationSettings?.navfromRespondToApplication
            ? RESPOND_TO_APPLICATION
            : RESPONDENT_TASK_LIST_URL;
        }

        req.session.save(() => res.redirect(return_url));
      }
    } catch (err) {
      throw new Error('SupportDuringCase - Case could not be updated.');
    }
  }
}
