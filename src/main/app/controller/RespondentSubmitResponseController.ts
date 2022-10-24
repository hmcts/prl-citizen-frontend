import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CA_RESPONDENT_RESPONSE_CONFIRMATION } from '../../steps/urls';
import { CosApiClient } from '../case/CosApiClient';

import type { AppRequest } from './AppRequest';

@autobind
export class RespondentSubmitResponseController {
  public async save(req: AppRequest, res: Response): Promise<void> {
    const caseReference = req.session.userCase.id;
    const partyId = req.session.user.id;
    const client = new CosApiClient(req.session.user.accessToken, 'https://return-url');

    const updatedCaseDataFromCos = await client.submitRespondentResponse(req.session.user, caseReference, partyId);
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    req.session.save(() => res.redirect(CA_RESPONDENT_RESPONSE_CONFIRMATION));
  }
}
