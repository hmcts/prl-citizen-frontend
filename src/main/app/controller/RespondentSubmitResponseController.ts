import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import { CA_RESPONDENT_RESPONSE_CONFIRMATION } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CosApiClient } from '../case/CosApiClient';
import { toApiFormat } from '../case/to-api-format';
import { DocumentManagementClient } from '../document/DocumentManagementClient';

import type { AppRequest, UserDetails } from './AppRequest';
const UID_LENGTH = 36;
@autobind
export class RespondentSubmitResponseController {
  public async save(req: AppRequest, res: Response): Promise<void> {
    const caseReference = req.session.userCase.id;
    let partyId;
    req.session.userCase.respondents?.forEach(respondent => {
      if (respondent.value.user.idamId === req.session.user.id) {
        partyId = respondent.id;
      }
    });
    const client = new CosApiClient(req.session.user.accessToken, 'https://return-url');
    const caseData = toApiFormat(req?.session?.userCase);

    const updatedCaseDataFromCos = await client.submitRespondentResponse(
      req.session.user,
      caseReference,
      partyId,
      caseData
    );
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    req.session.save(() => res.redirect(CA_RESPONDENT_RESPONSE_CONFIRMATION));
  }

  public async getDraftDocument(req: AppRequest, res: Response): Promise<void> {
    const caseReference = req.session.userCase.id;
    let partyId;
    req.session.userCase.respondents?.forEach(respondent => {
      if (respondent.value.user.idamId === req.session.user.id) {
        partyId = respondent.id;
      }
    });
    const client = new CosApiClient(req.session.user.accessToken, 'https://return-url');
    const caseData = toApiFormat(req?.session?.userCase);

    const draftDocument = await client.generateC7DraftDocument(req.session.user, caseReference, partyId, caseData);
    const binaryUrl = draftDocument?.documentId;
    if (!binaryUrl) {
      throw new Error('Document url is not found');
    }
    const uid = this.getUID(binaryUrl);
    const cdamUrl = config.get('services.documentManagement.url') + '/cases/documents/' + uid + '/binary';
    const fileName = draftDocument?.documentName;
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: cdamUrl });
    req.session.save(err => {
      if (err) {
        throw err;
      } else if (generatedDocument) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
        return res.end(generatedDocument.data);
      }

      const redirectUrl = '#';
      return res.redirect(redirectUrl);
    });
  }

  private getUID(documentToGet: string) {
    const refinedUrl = documentToGet.replace('/binary', '');
    return refinedUrl.substring(refinedUrl.length - UID_LENGTH);
  }

  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }
}
