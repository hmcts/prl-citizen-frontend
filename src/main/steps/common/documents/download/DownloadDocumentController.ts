import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { deTransformFileName, transformFileName } from '../download/utils';

@autobind
export default class DownloadDocumentController {
  private getDocumentMeta(documentType: string, caseData: CaseWithId): { documentId: string; documentName: string } {
    let documentReference;

    if (documentType === 'c100-application') {
      documentReference = caseData.finalDocument ?? caseData.c100DraftDoc;
    } else if (['fl401-application', 'cada-document'].includes(documentType)) {
      documentReference = caseData.finalDocument;
    } else if (documentType === 'aoh-document') {
      documentReference = caseData.c1ADocument;
    }

    const documentId = documentReference
      ? documentReference.document_url.substring(documentReference!.document_url.lastIndexOf('/') + 1)
      : '';
    const documentName = _.get(documentReference, 'document_filename', '');

    return {
      documentId,
      documentName: transformFileName(documentName),
    };
  }

  public async download(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    let { documentId, documentName } = req.params;
    const { documentType, forceDownload = false } = req.params;
    try {
      if (documentType) {
        const documentMeta = this.getDocumentMeta(documentType, req.session.userCase);
        documentId = documentMeta.documentId;
        documentName = documentMeta.documentName;
      }

      const document = await new CosApiClient(req.session.user.accessToken, req.locals.logger).downloadDocument(
        documentId,
        req.session.user.id
      );
      res.setHeader('Content-Type', document.headers['content-type']);
      res.setHeader(
        'Content-Disposition',
        `${forceDownload ? 'attachment' : 'inline'}; filename=${deTransformFileName(documentName)};`
      );
      res.end(document.data);
    } catch (error) {
      req.locals.logger.error(`Error occured, cannot download the document. ${error.response.status}`);
      req.locals.logger.info(
        'documentId, documentName, documentType ',
        `${documentId}, ${documentName}, ${documentType}`
      );
      throw new Error('Error occured, cannot download the document.');
    }
  }
}
