import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

//import { v4 as generateUuid } from 'uuid';
import { APPLICANT_TASK_LIST_URL } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CaseWithId } from '../case/case';
import //PRLDocument,
//CITIZEN_UPDATE,
//DocumentType,
//LanguagePreference,
//ListValue,
//State,
'../case/definition';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    //console.log('inside get method of DocumentManagerController............');
    //const documentsGeneratedKey = 'documentsGenerated';
    //const languagePreference =
    //req.session.userCase['applicant1LanguagePreference'] === LanguagePreference.WELSH ? 'Cy' : 'En';
    const documentsGenerated =
      //(req.session.userCase[documentsGeneratedKey] as ListValue<Partial<PRLDocument> | null>[]) ?? [];
      [
        {
          value: {
            documentEmailContent: null,
            documentLink: {
              document_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/4d2af5ad-a8a3-4263-9bbb-b12eb4ad62fe',
              document_filename: 'dummyDoc.pdf',
              document_binary_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/4d2af5ad-a8a3-4263-9bbb-b12eb4ad62fe/binary',
            },
            documentDateAdded: null,
            documentComment: 'Uploaded by applicant',
            documentFileName: 'dummyDoc.pdf',
            documentType: null,
            documentFileId: null,
          },
          id: 'b12f2494-4114-4076-9d84-dd95f3b0a517',
        },
      ];
    //  "auditTrackingId": "733449f5-2e82-41a7-905e-c689e88ccf11-117478813",
    // if (![State.Submitted].includes(req.session.userCase.state)) {
    //   throw new Error('Cannot display document as the application is not in submitted state');
    // }

    //let documentToGet;

    // if (!!documentsGenerated && documentsGenerated.length > 0) {
    //   const applicationSummaryDocuments = documentsGenerated
    //     .map(item => item.value)
    //     .filter(element => element?.documentType === DocumentType.YOUR_APPLICATION_FL401 + languagePreference);
    //   if (applicationSummaryDocuments !== null && applicationSummaryDocuments.length > 0) {
    //     documentToGet = applicationSummaryDocuments[0]?.documentLink?.document_binary_url;
    //   }
    // }

    const documentToGet = documentsGenerated[0]?.value.documentLink?.document_url;
    console.log(documentToGet);
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: documentToGet });

    req.session.save(err => {
      if (err) {
        throw err;
      } else if (generatedDocument) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=FL401.pdf');
        return res.end(generatedDocument.data);
      }
      return res.redirect(APPLICANT_TASK_LIST_URL);
    });
  }
}
