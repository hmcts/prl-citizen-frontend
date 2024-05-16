import { Logger } from '@hmcts/nodejs-logging';
import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CA_RESPONDENT_RESPONSE_CONFIRMATION } from '../../urls';
import { getPartyDetails, mapDataInSession } from '../utils';

const logger = Logger.getLogger('ResponseSummaryConfirmationPostController');

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
      }
    });
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    if (userCase.respondentPcqId) {
      try {
        const partyDetails = getPartyDetails(userCase, user.id)!;
        if (partyDetails && !partyDetails.user.pcqId) {
          partyDetails.user.pcqId = userCase.respondentPcqId;
          req.session.userCase = await client.updateCaseData(
            caseReference,
            partyDetails,
            PartyType.RESPONDENT,
            userCase.caseTypeOfApplication as CaseType,
            CaseEvent.CITIZEN_PCQ_UPDATE
          );
          mapDataInSession(req.session.userCase, user.id);
        }
      } catch (error) {
        logger.info('Error in uploading pcq id against the party', error.message);
      }
    }
    const updatedCaseDataFromCos = await client.submitRespondentResponse(caseReference, partyId);
    Object.assign(userCase, updatedCaseDataFromCos);
    req.session.save(() => res.redirect(CA_RESPONDENT_RESPONSE_CONFIRMATION));
  }
}
