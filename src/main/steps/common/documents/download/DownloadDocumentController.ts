import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest, UserDetails } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { DocumentCategory } from '../definitions';
import { DOCUMENT_LANGUAGE, deTransformFileName, transformFileName } from '../download/utils';

@autobind
export default class DownloadDocumentController {
  private getDocumentMeta(
    documentType: string,
    caseData: CaseWithId,
    userDetails: UserDetails,
    language: string
  ): { documentId: string; documentName: string } {
    let documentReference;

    switch (documentType) {
      case 'c100-application':
        if (language === DOCUMENT_LANGUAGE.ENGLISH) {
          documentReference = caseData?.finalDocument ?? caseData.c100DraftDoc;
        } else {
          documentReference = caseData.finalWelshDocument ?? caseData.c100DraftDocWelsh;
        }
        break;

      case 'fl401-application':
      case 'cada-document':
        documentReference =
          language === DOCUMENT_LANGUAGE.ENGLISH ? caseData?.finalDocument : caseData.finalWelshDocument;
        break;
      case 'aoh-document':
        documentReference = language === DOCUMENT_LANGUAGE.ENGLISH ? caseData?.c1ADocument : caseData.c1AWelshDocument;
        break;
      case 'c7-response-document':
        documentReference = caseData?.respondentDocuments?.find(
          doc =>
            doc.partyId === userDetails.id &&
            doc.categoryId === DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION &&
            doc.documentLanguage === language
        )?.document;
        break;
      case 'c1a-application-document':
        documentReference = caseData?.respondentDocuments?.find(
          doc =>
            doc.partyId === userDetails.id &&
            doc.categoryId === DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION &&
            doc.documentLanguage === language
        )?.document;
        break;
      case 'c1a-response-document':
        documentReference = caseData?.respondentDocuments?.find(
          doc =>
            doc.partyId === userDetails.id &&
            doc.categoryId === DocumentCategory.RESPONDENT_RESPOND_TO_C1A &&
            doc.documentLanguage === language
        )?.document;
        break;
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
    let { documentId, documentName, documentType, forceDownload, language } = req.params;

    try {
      if (documentType) {
        const documentMeta = this.getDocumentMeta(documentType, req.session.userCase, req.session.user, language);
        documentId = documentMeta.documentId;
        documentName = documentMeta.documentName;
      }

      const document = await new CosApiClient(req.session.user.accessToken, req.locals.logger).downloadDocument(
        documentId,
        req.session.user.id
      );
      res.setHeader('Content-Type', document.headers['content-type'] ?? '');
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
