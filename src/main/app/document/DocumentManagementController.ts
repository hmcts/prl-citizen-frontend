import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import { APPLICANT_TASK_LIST_URL } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CaseWithId } from '../case/case';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const baseUrl = config.get('services.documentManagement.url');
    const documents = `${baseUrl}/cases/documents`;
    const url = `${documents}/5d33c497-5014-4ea1-8422-8453d008a121`;
    const binary_url = `${url}/binary`;
    const filename = 'dummyDoc.pdf';

    const documentsGenerated = [
      {
        value: {
          documentEmailContent: null,
          documentLink: {
            document_url: url,
            document_filename: filename,
            document_binary_url: binary_url,
          },
          documentDateAdded: null,
          documentComment: 'Uploaded by applicant',
          documentFileName: filename,
          documentType: null,
          documentFileId: null,
        },
        id: 'b12f2494-4114-4076-9d84-dd95f3b0a517',
      },
    ];

    const documentToGet = documentsGenerated[0]?.value.documentLink?.document_binary_url;
    console.log(documentToGet);
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: documentToGet });

    req.session.save(err => {
      if (err) {
        throw err;
      } else if (generatedDocument) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
        return res.end(generatedDocument.data);
      }
      return res.redirect(APPLICANT_TASK_LIST_URL);
    });
  }
}
