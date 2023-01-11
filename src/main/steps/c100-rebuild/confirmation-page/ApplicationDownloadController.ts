import { Response } from 'express';

import { Document } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export class ApplicationDownloadController {
  public async download(req: AppRequest, res: Response): Promise<void> {
    try {
      const applicationInfo = req.session?.userCase.finalDocument as Document;
      const documentUrl = applicationInfo.document_url;
      const documentId = documentUrl.substring(documentUrl.lastIndexOf('/') + 1);

      const generatedDocument = await req.locals.C100Api.downloadDraftApplication(documentId);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=' + applicationInfo.document_filename);
      res.end(generatedDocument);
    } catch (e) {
      throw new Error('Could not download the copy of application');
    }
  }
}
