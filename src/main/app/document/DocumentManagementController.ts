import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import {
  APPLICANT,
  APPLICANT_TASK_LIST_URL,
  RESPONDENT,
  RESPONDENT_TASK_LIST_URL,
  UPLOAD_DOCUMENT,
} from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { getSystemUser } from '../auth/user/oidc';
import { CosApiClient } from '../case/CosApiClient';
import { CaseWithId } from '../case/case';
import { CITIZEN_UPDATE, DocumentType, ListValue, State, UploadDocumentList } from '../case/definition';
import { getFilename } from '../case/formatter/uploaded-files';
import type { AppRequest, UserDetails } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

import { DocumentManagementClient } from './DocumentManagementClient';
//import { DgsApiClient } from 'app/case/DgsApiClient';
//import { v4 as generateUuid } from 'uuid';
import { GenerateAndUploadDocumentRequest } from './GenerateAndUploadDocumentRequest';

const UID_LENGTH = 36;
@autobind
export class DocumentManagerController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async generatePdf(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (!req?.session?.userCase) {
      const initData = { id: '1661441222471371', state: State.successAuthentication, serviceType: '' };
      req.session.userCase = initData;
    }

    if (req?.session?.userCase?.applicantUploadFiles === undefined) {
      req.session.userCase['applicantUploadFiles'] = [];
    }

    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { _csrf, ...formData } = form.getParsedBody(req.body);
    const caseworkerUser = await getSystemUser();
    req.session.errors = form.getErrors(formData);
    console.log(' Form Data:---', formData);
    console.log('inside generatePdf');
    const partyName = req.session.user.givenName + ' ' + req.session.user.familyName;

    const uploadDocumentDetails = {
      caseId: req.session.userCase.id,
      freeTextUploadStatements: req.body.freeTextAreaForUpload,
      parentDocumentType: req.query.parentDocumentType,
      documentType: req.query.documentType,
      partyName,
      partyId: req.session.user.id,
    };
    const generateAndUploadDocumentRequest = new GenerateAndUploadDocumentRequest(uploadDocumentDetails);

    const client = new CosApiClient(caseworkerUser.accessToken, 'http://localhost:3001');
    const updatedCaseDataFromCos = await client.generateUserUploadedStatementDocument(
      caseworkerUser,
      generateAndUploadDocumentRequest
    );
    console.log(updatedCaseDataFromCos);
    if (updatedCaseDataFromCos.status !== 200) {
      req.session.errors.push({ errorType: 'Document could not be uploaded', propertyName: 'accessCode' });
    } else {
      const obj = {
        id: updatedCaseDataFromCos.documentId as string,
        name: updatedCaseDataFromCos.documentName as string,
      };
      req.session.userCase.applicantUploadFiles?.push(obj);
      req.session.errors = [];
    }
    const redirectUrl =
      UPLOAD_DOCUMENT + '?' + 'caption=' + req.query.parentDocumentType + '&document_type=' + req.query.documentType;
    this.redirect(req, res, redirectUrl);
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
      if (!req.session.userCase.fl401UploadWitnessDocuments?.[0].value?.document_binary_url) {
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
    const documentsUploadedKey = 'applicantDocumentsUploaded';
    const documentsUploaded = (req.session.userCase[documentsUploadedKey] as ListValue<UploadDocumentList>[]) ?? [];

    const documentIndexToDelete = parseInt(req.params.index, 10);
    const documentToDelete = documentsUploaded[documentIndexToDelete];
    if (!documentToDelete?.value?.value?.citizenDocument.document_url) {
      return res.redirect(UPLOAD_DOCUMENT);
    }
    const documentUrlToDelete = documentToDelete?.value?.value?.citizenDocument.document_url;

    // documentsUploaded[documentIndexToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsUploadedKey]: documentsUploaded },
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
    if (!req?.session?.userCase) {
      const initData = { id: '1661251852090684', state: State.successAuthentication, serviceType: '' };
      req.session.userCase = initData;
    }

    if (req?.session?.userCase?.applicantUploadFiles === undefined) {
      req.session.userCase['applicantUploadFiles'] = [];
    }

    console.log('request session:', req.session);
    if (!req.files?.length) {
      if (req.headers.accept?.includes('application/json')) {
        throw new Error('No files were uploaded');
      } else {
        console.log('Request: ', req.files);
        const fileData = req.files || [];
        const obj = {
          id: fileData[0]['originalname'],
          name: fileData[0]['originalname'],
        };
        req.session.userCase.applicantUploadFiles?.push(obj);
        console.log('content in upload files: ', obj);
        //return res.redirect(UPLOAD_DOCUMENT);
      }
    } else {
      console.log('Request: ', req.files);
      const fileData = req.files || [];
      const obj = {
        id: fileData[0]['originalname'],
        name: fileData[0]['originalname'],
      };

      if (req.session.userCase['applicantUploadFiles']) {
        req.session.userCase.applicantUploadFiles?.push(obj);
        console.log('content in upload files: ', obj);
        //return res.redirect(UPLOAD_DOCUMENT);
      } else {
        req.session.userCase['applicantUploadFiles'] = [];
        req.session.userCase.applicantUploadFiles?.push(obj);
      }
    }

    //const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    //const filesCreated = await documentManagementClient.create({
    //  files: req.files,
    //  classification: Classification.Public,
    //});

    // const filesCreated = (req.files as Express.Multer.File[]).map(file => {
    //   return {
    //     originalDocumentName: file.originalname,
    //   };
    // });

    console.log('3');
    const newUploads: ListValue<Partial<UploadDocumentList> | null>[] = [];
    // const newUploads: ListValue<Partial<UploadDocumentList> | null>[] = filesCreated.map(file => ({
    //   id: generateUuid(),
    //   value: {
    //     id: "aaaaaaa",
    //     value: {
    //       parentDocumentType: 'Witness Statement',
    //       DocumentType: 'Witness Statement',
    //       partyName: 'Sonal Saha',
    //       isApplicant: 'Yes',
    //       uploadedBy: 'Uploaded by Sonali Saha',
    //       dateCreated: '12/07/2022',
    //       documentUploadedDate: '12/07/2022',
    //       citizenDocument: {
    //         document_url: 'abcd',
    //         document_filename: file.originalDocumentName,
    //         document_binary_url: 'abcd',
    //       },
    //     },
    //   },
    // }));
    //  const documentsKey = 'applicant1DocumentsUploaded';
    //  const updatedDocumentsUploaded = newUploads.concat(req.session.userCase?.[documentsKey] || []);
    //  req.session.userCase = await req.locals.api.triggerEvent(
    //    req.session.userCase?.id,
    //    { [documentsKey]: updatedDocumentsUploaded },
    //     CITIZEN_UPDATE
    //  );
    req.session.save(() => {
      if (req.headers.accept?.includes('application/json')) {
        res.json(newUploads.map(file => ({ id: file.id, name: getFilename(file.value) })));
      } else {
        const redirectUrl =
          UPLOAD_DOCUMENT +
          '?' +
          'caption=' +
          req.query.parentDocumentType +
          '&document_type=' +
          req.query.documentType;
        res.redirect(redirectUrl);
      }
    });
  }
}
