import autobind from 'autobind-decorator';
import type { Response } from 'express';
import _ from 'lodash';

import { CaseType } from '../../app/case/definition';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../steps/tasklistresponse/utils';
import { CA_RESPONDENT_RESPONSE_CONFIRMATION } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CosApiClient } from '../case/CosApiClient';

import type { AppRequest } from './AppRequest';

console.info('** FOR SONAR **');
@autobind
export class RespondentSubmitResponseController {
  // public async save(req: AppRequest, res: Response): Promise<void> {
  //   const caseReference = req.session.userCase.id;
  //   let partyId;
  //   req.session.userCase.respondents?.forEach(respondent => {
  //     if (respondent.value.user.idamId === req.session.user.id) {
  //       partyId = respondent.id;
  //     }
  //   });
  //   const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);
  //   const caseData = toApiFormat(req?.session?.userCase);

  //   const updatedCaseDataFromCos = await client.submitRespondentResponse(caseReference, partyId, caseData);
  //   Object.assign(req.session.userCase, updatedCaseDataFromCos);

  //   req.session.save(() => res.redirect(CA_RESPONDENT_RESPONSE_CONFIRMATION));
  // }

  public async save(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, req.locals.logger);

    if (partyDetails) {
      try {
        req.session.userCase = await client.submitRespondentResponse1(
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => {
          const redirectUrl = CA_RESPONDENT_RESPONSE_CONFIRMATION;
          res.redirect(redirectUrl);
        });
      } catch (error) {
        throw new Error('ConfirmContactDetailsPostController - Case could not be updated.');
      }
    }
  }

  public async getDraftDocument(req: AppRequest, res: Response): Promise<void> {
    const caseReference = req.session.userCase.id;
    let partyId;
    req.session.userCase.respondents?.forEach(respondent => {
      if (respondent.value.user.idamId === req.session.user.id) {
        partyId = respondent.id;
      }
    });
    const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);
    const caseData = toApiFormat(req?.session?.userCase);

    try {
      const draftC7ResponseDocument = await client.generateC7DraftDocument(
        req.session.userCase.id,
        _.get(partyDetails, 'partyId', '')
      );
      req.params = {
        ...req.params,
        documentId: draftC7ResponseDocument.document_url.substring(
          draftC7ResponseDocument.document_url.lastIndexOf('/') + 1
        ),
        documentName: draftC7ResponseDocument.document_filename,
        forceDownload: 'forceDownload',
      };
      await new DownloadDocumentController().download(req, res);
    } catch (error) {
      client.logError(error);
      throw new Error(error);
    }
  }
}
