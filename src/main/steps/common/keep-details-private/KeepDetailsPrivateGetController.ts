import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { mapDataInSession } from '../../../steps/tasklistresponse/utils';
import { APPLICANT_DETAILS_KNOWN, RESPONDENT_DETAILS_KNOWN } from '../../urls';

export class KeepDetailsPrivateGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const { user } = req.session;
    const caseReference = req.params?.caseId;
    const client = new CosApiClient(user.accessToken, 'https://return-url');

    try {
      req.session.userCase = await client.retrieveByCaseId(caseReference, user);
      const partyType = getCasePartyType(req.session.userCase, user.id);

      mapDataInSession(req.session.userCase, user.id);

      req.session.save(() =>
        res.redirect(partyType === PartyType.RESPONDENT ? RESPONDENT_DETAILS_KNOWN : APPLICANT_DETAILS_KNOWN)
      );
    } catch (error) {
      throw new Error('KeepDetailsPrivateGetController - Case could not be updated.');
    }
  }
}
