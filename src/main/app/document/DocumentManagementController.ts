import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import { APPLICANT, APPLICANT_TASK_LIST_URL, RESPONDENT, RESPONDENT_TASK_LIST_URL, UPLOAD_DOCUMENT } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { getSystemUser } from '../auth/user/oidc';
import { CosApiClient } from '../case/CosApiClient';
import { CaseWithId } from '../case/case';
import { DocumentType, ListValue, CITIZEN_UPDATE, CitizenUpoladDocument } from '../case/definition';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { DocumentManagementClient } from './DocumentManagementClient';

import { getFilename } from '../case/formatter/uploaded-files';
import { v4 as generateUuid } from 'uuid';

const UID_LENGTH = 36;
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

    const caseworkerUser = await getSystemUser();
    req.session.user = caseworkerUser;
    const caseReference = req.session.userCase.id;

    try {
      const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
      req.session.userCase = caseDataFromCos;
    } catch (err) {
      console.log(err);
    }

    let documentToGet;
    let uid;
    if (filename === DocumentType.FL401_FINAL_DOCUMENT) {
      if (!req.session.userCase.finalDocument?.document_binary_url) {
        throw new Error('FL401_FINAL_DOCUMENT binary url is not found');
      }
      documentToGet = req.session.userCase.finalDocument?.document_binary_url;
      uid = this.getUID(documentToGet);
    }

    if (filename === DocumentType.WITNESS_STATEMENT) {
      if (!req.session.userCase.fl401UploadWitnessDocuments[0].value?.document_binary_url) {
        throw new Error('APPLICATION_WITNESS_STATEMENT binary url is not found');
      }
      documentToGet = req.session.userCase.fl401UploadWitnessDocuments[0].value?.document_binary_url;
      uid = this.getUID(documentToGet);
    }

    const cdamUrl = config.get('services.documentManagement.url') + '/cases/documents/' + uid + '/binary';
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: cdamUrl });

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
  }

  private getUID(documentToGet: string) {
    const refinedUrl = documentToGet.replace('/binary', '');
    return refinedUrl.substring(refinedUrl.length - UID_LENGTH);
  }

  public async delete(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const documentsUploadedKey = 'applicant1DocumentsUploaded';
    const documentsUploaded =
      (req.session.userCase[documentsUploadedKey] as ListValue<Partial<CitizenUpoladDocument> | null>[]) ?? [];

    const documentIndexToDelete = parseInt(req.params.index, 10);
    const documentToDelete = documentsUploaded[documentIndexToDelete];
    if (!documentToDelete?.value?.documentLink?.document_url) { 
      return res.redirect(UPLOAD_DOCUMENT);
    }
    const documentUrlToDelete = documentToDelete.value.documentLink?.document_url;

    documentsUploaded[documentIndexToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsUploadedKey]: documentsUploaded},
      CITIZEN_UPDATE
    );

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    await documentManagementClient.delete({ url: documentUrlToDelete });

    req.session.save(err => {
      if (err) {
        throw err;
      }
      return res.redirect(UPLOAD_DOCUMENT);
    });
  }


  public async post(req: AppRequest, res: Response): Promise<void> {
    console.log('1');
    if (!req.files?.length) {
      if (req.headers.accept?.includes('application/json')) {
        throw new Error('No files were uploaded');
      } else {
        return res.redirect(UPLOAD_DOCUMENT);
      }
    }
    
    //const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    console.log('2');
    //const filesCreated = await documentManagementClient.create({
    //  files: req.files,
    //  classification: Classification.Public,
    //});

    const filesCreated= (req.files as Express.Multer.File[]).map(file=>{
      return {originalDocumentName: file.originalname,
      };
    });


    console.log('3');
    const newUploads: ListValue<Partial<CitizenUpoladDocument> | null>[] = filesCreated.map(file => ({
      id: generateUuid(),
      value: {
        documentComment: 'Uploaded by ***',
        documentFileName: file.originalDocumentName,
        documentLink: {
          document_url: 'abcd',
          document_filename: file.originalDocumentName,
          document_binary_url: 'abcd',
        },
      },
    }));
    console.log('ccc');
    //  const documentsKey = 'applicant1DocumentsUploaded';
    //  const updatedDocumentsUploaded = newUploads.concat(req.session.userCase?.[documentsKey] || []);
    //  req.session.userCase = await req.locals.api.triggerEvent(
    //    req.session.userCase?.id,
    //    { [documentsKey]: updatedDocumentsUploaded },
    //     CITIZEN_UPDATE
    //  );
    console.log('4');
    req.session.save(() => {
      if (req.headers.accept?.includes('application/json')) {
        res.json(newUploads.map(file => ({ id: file.id, name: getFilename(file.value) })));
      } else  {
        res.redirect(UPLOAD_DOCUMENT);
      }
    });
  }
  
}
