import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest, UserDetails } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { DocumentCategory } from '../definitions';
import { deTransformFileName, transformFileName } from '../download/utils';

@autobind
export default class DownloadDocumentController {
  private getDocumentMeta(
    documentType: string,
    caseData: CaseWithId,
    userDetails: UserDetails
  ): { documentId: string; documentName: string } {
    let documentReference;

    if (documentType === 'c100-application') {
      documentReference = caseData.finalDocument ?? caseData.c100DraftDoc;
    } else if (['fl401-application', 'cada-document'].includes(documentType)) {
      documentReference = caseData.finalDocument;
    } else if (documentType === 'aoh-document') {
      documentReference = caseData.c1ADocument;
    } else if (documentType === 'c7-response-document') {
      const c7Document = caseData.citizenDocuments?.find(
        doc =>
          doc.partyId === userDetails.id && doc.categoryId === DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION
      );
      documentReference = c7Document?.document;
    } else if (documentType === 'c1a-response-document') {
      const c1aDocument = caseData.citizenDocuments?.find(
        doc =>
          doc.partyId === userDetails.id && doc.categoryId === DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION
      );
      documentReference = c1aDocument?.document;
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
    // eslint-disable-next-line prefer-const
    let { documentId, documentName, documentType, forceDownload } = req.params;

    try {
      if (documentType) {
        const documentMeta = this.getDocumentMeta(documentType, req.session.userCase, req.session.user);
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
        `${forceDownload === 'forceDownload' ? 'attachment' : 'inline'}; filename=${deTransformFileName(documentName)};` //check with vivek
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
