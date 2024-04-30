import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../case/CosApiClient';

import type { AppRequest } from './AppRequest';
import { getPartyDetails } from 'steps/tasklistresponse/utils';
import _ from 'lodash';
import DownloadDocumentController from 'steps/common/documents/download/DownloadDocumentController';
console.info('** FOR SONAR **');
@autobind
export class RespondentSubmitResponseController {
  public async generateAndDownloadC7ResponseDraftDocument(req: AppRequest, res: Response): Promise<void> {
    const partyDetails = getPartyDetails(req.session.userCase, req.session.user.id);
    const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);

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
