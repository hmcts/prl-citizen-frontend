import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import { APPLICANT, APPLICANT_TASK_LIST_URL, RESPONDENT, RESPONDENT_TASK_LIST_URL } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CaseWithId } from '../case/case';
import { DocumentType } from '../case/definition';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const originalUrl = req.originalUrl;
    let filename = '';

    if (originalUrl !== null && originalUrl !== undefined && originalUrl.length > 0) {
      filename = originalUrl.substring(originalUrl.lastIndexOf('/') + 1);
    }

    try {
      let documentToGet;

      if (filename === DocumentType.FL401_FINAL_DOCUMENT) {
        documentToGet = req.session.userCase.fl401SubmittedApplication?.document_binary_url;
      }

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
}
