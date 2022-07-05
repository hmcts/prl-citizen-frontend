import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import { APPLICANT, APPLICANT_TASK_LIST_URL, RESPONDENT, RESPONDENT_TASK_LIST_URL } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
//import { getSystemUser } from '../auth/user/oidc';
//import { getCaseApi } from '../case/CaseApi';
import { CaseWithId } from '../case/case';
import {
  //ListValue,
  //PRLDocument,
  //CITIZEN_UPDATE,
  DocumentType,
  //LanguagePreference,
  //State,
} from '../case/definition';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    //const documentsGeneratedKey = 'documentsGenerated';
    const originalUrl = req.originalUrl; //FL401-Final-Document.pdf
    let filename = '';

    if (originalUrl !== null && originalUrl !== undefined && originalUrl.length > 0) {
      filename = originalUrl.substring(originalUrl.lastIndexOf('/') + 1);
    }

    // step: get the case details using caseid
    // once the mapping of the user is done with accesscode and caseid
    // this code needs to be removed as the details will be available in
    // request user session
    try {
      //const caseworkerUser = await getSystemUser();
      //req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);
      //const caseReference = req.session.userCase.caseCode?.replace(/-/g, '');

      //const caseData = await req.locals.api.getCaseById(caseReference as string);
      //console.log('caseData => '+caseData)

      let documentToGet;

      if (filename === DocumentType.FL401_FINAL_DOCUMENT) {
        //req.session.userCase.fl401SubmittedApplication = caseData.fl401SubmittedApplication;
        documentToGet = req.session.userCase.fl401SubmittedApplication?.document_binary_url;
      }
      // else{
      //   // get all the files list to download
      //   if (
      //     caseData.documentsGenerated !== null &&
      //     caseData.documentsGenerated !== undefined &&
      //     caseData.documentsGenerated.length > 0
      //   ) {
      //     req.session.userCase[documentsGeneratedKey] = caseData.documentsGenerated;
      //     documentToGet = this.getPDFFileDownload(req, documentsGeneratedKey, filename);
      //   }

      // }

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

        let redirectUrl = '';
        if (req.originalUrl.includes(APPLICANT)) {
          console.log('redirect to APPLICANT_TASK_LIST_URL');
          redirectUrl = APPLICANT_TASK_LIST_URL;
        } else if (req.originalUrl.includes(RESPONDENT)) {
          console.log('redirect to RESPONDENT_TASK_LIST_URL');
          redirectUrl = RESPONDENT_TASK_LIST_URL;
        }
        return res.redirect(redirectUrl);
      });
    } catch (err) {
      throw new Error('Error Occured in DocumentManagerController get method');
    }
  }

  // private getPDFFileDownload(req: AppRequest<Partial<CaseWithId>>, documentsGeneratedKey: string, filename: string) {
  //   const documentsGenerated = (req.session.userCase[documentsGeneratedKey] as ListValue<Partial<PRLDocument> | null>[]) ?? [];

  //   let documentToGet;

  //   // iterate through all the documents generated and get the required file to download as pdf
  //   if (!!documentsGenerated && documentsGenerated.length > 0) {
  //     const applicationSummaryDocuments = documentsGenerated
  //       .map(item => item.value)
  //       .filter(element => element?.documentFileName === filename);
  //     if (applicationSummaryDocuments !== null && applicationSummaryDocuments.length > 0) {
  //       documentToGet = applicationSummaryDocuments[0]?.documentLink?.document_binary_url;
  //     }
  //   }
  //   return documentToGet;
  // }
}
