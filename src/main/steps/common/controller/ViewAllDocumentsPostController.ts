import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../steps/tasklistresponse/utils';
import { RESPOND_TO_APPLICATION } from '../../../steps/urls';

export class ViewAllDocumentsPostController {
  public async setResponseInitiatedFlag(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id)?.partyDetails;
    const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);
    if (partyDetails) {
      if (partyDetails.response && partyDetails.response.citizenFlags) {
        partyDetails.response.citizenFlags.isResponseInitiated = YesOrNo.YES;
      }

      try {
        req.session.userCase = await client.updateCaseData(
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.CITIZEN_INTERNAL_FLAG_UPDATES
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.applicationSettings = {
          ...req.session.applicationSettings,
          navfromRespondToApplication: true,
        };
        req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
      } catch (error) {
        throw new Error('KeepDetailsPrivatePostController - Case could not be updated.');
      }
    }
  }
}
