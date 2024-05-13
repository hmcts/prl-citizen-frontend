import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { toApiFormat } from '../../../app/case/to-api-format';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CA_RESPONDENT_RESPONSE_CONFIRMATION } from '../../urls';

export class ResponseSummaryConfirmationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    //TODO update when merged with response submission fixes
    const { userCase, user } = req.session;
    const caseReference = userCase.id;
    let partyId;
    userCase.respondents?.forEach(respondent => {
      if (respondent.value.user.idamId === user.id) {
        partyId = respondent.id;
        respondent.value.user.pcqId = userCase.respondentPcqId;
      }
    });
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    const caseData = toApiFormat(req?.session?.userCase);
    const updatedCaseDataFromCos = await client.submitRespondentResponse(caseReference, partyId, caseData);
    Object.assign(userCase, updatedCaseDataFromCos);
    req.session.save(() => res.redirect(CA_RESPONDENT_RESPONSE_CONFIRMATION));
  }
}
