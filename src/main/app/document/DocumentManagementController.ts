import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import { APPLICANT_TASK_LIST_URL } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CaseWithId } from '../case/case';
import type { AppRequest, UserDetails } from '../controller/AppRequest';
import {
  PRLDocument,
  //CITIZEN_UPDATE,
  //DocumentType,
  //LanguagePreference,
  ListValue,
  //State,
} from '../case/definition';
import { DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const documentsGeneratedKey = 'documentsGenerated';
    const originalUrl = req.originalUrl; //FL401FinalDocument.pdf
    let filename = '';

    if (originalUrl !== null && originalUrl !== undefined && originalUrl.length > 0) {
      filename = originalUrl.substring(originalUrl.lastIndexOf('/') + 1);
    }

    // const languagePreference =
    //   req.session.userCase['applicant1LanguagePreference'] === LanguagePreference.WELSH ? 'Cy' : 'En';
    const documentsGenerated =
      (req.session.userCase[documentsGeneratedKey] as ListValue<Partial<PRLDocument> | null>[]) ?? [];

    // if (![State.Submitted].includes(req.session.userCase.state)) {
    //   throw new Error('Cannot display document as the application is not in submitted state');
    // }

    let documentToGet;

    if (!!documentsGenerated && documentsGenerated.length > 0) {
      const applicationSummaryDocuments = documentsGenerated
        .map(item => item.value)
        .filter(element => element?.documentFileName === filename);
      if (applicationSummaryDocuments !== null && applicationSummaryDocuments.length > 0) {
        documentToGet = applicationSummaryDocuments[0]?.documentLink?.document_binary_url;
      }
    }

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: documentToGet });

    
    req.session.save(err => {
      if (err) {
        throw err;
      } else if (generatedDocument) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename='+filename);
        return res.end(generatedDocument.data);
      }
      return res.redirect(APPLICANT_TASK_LIST_URL);
    });
  }
}
