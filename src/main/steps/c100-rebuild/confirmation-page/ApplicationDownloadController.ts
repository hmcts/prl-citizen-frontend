import config from 'config';
import { Response } from 'express';

import { getServiceAuthToken } from '../../../app/auth/service/get-service-auth-token';
import { Document } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { DocumentManagementClient } from '../../../app/document/DocumentManagementClient';

export class ApplicationDownloadController {
  public async download(req: AppRequest, res: Response): Promise<void> {
    try {
      const documentManagementClient = new DocumentManagementClient(
        config.get('services.documentManagement.url'),
        getServiceAuthToken(),
        req.session.user
      );
      const applicationInfo = req.session?.userCase.finalDocument as Document;
      const documentUrl = applicationInfo.document_url;
      const documentId = documentUrl.substring(documentUrl.lastIndexOf('/') + 1);

      const generatedDocument = await documentManagementClient.get({
        url: `${config.get('services.documentManagement.url')}/cases/documents/${documentId}/binary`,
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=' + applicationInfo.document_filename);
      res.end(generatedDocument.data);
    } catch (e) {
      throw new Error('Could not download the copy of application');
    }
  }
}
