import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { deTransformFileName } from '../download/utils';

@autobind
export default class DownloadDocumentController {
  public async download(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { documentId, documentName, documentType } = req.params;

    try {
      if (documentType === 'c100-application-document') {
        const c100ApplicationDocument = await req.locals.C100Api.downloadC100Application(documentId);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${deTransformFileName(documentName)};`);
        res.end(c100ApplicationDocument);
      } else {
        const document = await new CosApiClient(req.session.user.accessToken, req.locals.logger).downloadDocument(
          documentId,
          req.session.user.id
        );
        res.setHeader('Content-Type', document.headers['content-type']);
        res.setHeader('Content-Disposition', `inline; filename=${deTransformFileName(documentName)};`);
        res.end(document.data);
      }
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
