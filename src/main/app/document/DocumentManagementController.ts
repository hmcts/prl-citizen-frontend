import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import {
  APPLICANT,
  APPLICANT_TASK_LIST_URL,
  APPLICANT_UPLOAD_DOCUMENT,
  RESPONDENT,
  RESPONDENT_TASK_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT,
} from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { getSystemUser } from '../auth/user/oidc';
import { CosApiClient } from '../case/CosApiClient';
import { CaseWithId, UploadedFile } from '../case/case';
import { DocumentType, Respondent, YesOrNo } from '../case/definition';
import { toApiFormat } from '../case/to-api-format';
import type { AppRequest, UserDetails } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

import { DeleteDocumentRequest } from './DeleteDocumentRequest';
import { DocumentManagementClient } from './DocumentManagementClient';
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
    if (req?.session?.userCase?.applicantUploadFiles === undefined) {
      req.session.userCase['applicantUploadFiles'] = [];
    }

    if (req?.session?.userCase?.respondentUploadFiles === undefined) {
      req.session.userCase['respondentUploadFiles'] = [];
    }

    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { _csrf, ...formData } = form.getParsedBody(req.body);
    const caseworkerUser = await getSystemUser();
    req.session.errors = form.getErrors(formData);

    const partyName = req.session.user.givenName + ' ' + req.session.user.familyName;
    const isApplicant = req.query.isApplicant;
    let redirectUrl;

    const uploadDocumentDetails = {
      caseId: req.session.userCase.id,
      freeTextUploadStatements: req.body.freeTextAreaForUpload,
      parentDocumentType: req.query.parentDocumentType,
      documentType: req.query.documentType,
      partyName,
      partyId: req.session.user.id,
      isApplicant,
    };
    const generateAndUploadDocumentRequest = new GenerateAndUploadDocumentRequest(uploadDocumentDetails);

    const client = new CosApiClient(caseworkerUser.accessToken, 'http://localhost:3001');
    const uploadCitizenDocFromCos = await client.generateUserUploadedStatementDocument(
      caseworkerUser,
      generateAndUploadDocumentRequest
    );
    if (uploadCitizenDocFromCos.status !== 200) {
      req.session.errors.push({ errorType: 'Document could not be uploaded', propertyName: 'uploadFiles' });
    } else {
      const obj = {
        id: uploadCitizenDocFromCos.documentId as string,
        name: uploadCitizenDocFromCos.documentName as string,
      };
      if (isApplicant === YesOrNo.YES) {
        req.session.userCase.applicantUploadFiles?.push(obj);
      } else {
        req.session.userCase.respondentUploadFiles?.push(obj);
      }
      const caseDataFromCos = await client.retrieveByCaseId(req.session.userCase.id, caseworkerUser);
      req.session.userCase.citizenUploadedDocumentList = caseDataFromCos.citizenUploadedDocumentList;
      req.session.errors = [];
    }
    if (isApplicant === YesOrNo.YES) {
      redirectUrl =
        APPLICANT_UPLOAD_DOCUMENT +
        '?' +
        'caption=' +
        req.query.parentDocumentType +
        '&document_type=' +
        req.query.documentType;
    } else {
      redirectUrl =
        RESPONDENT_UPLOAD_DOCUMENT +
        '?' +
        'caption=' +
        req.query.parentDocumentType +
        '&document_type=' +
        req.query.documentType;
    }
    this.redirect(req, res, redirectUrl);
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    let filename = '';
    let endPoint = '';
    let client;
    let caseReference;
    let caseworkerUser;
    try {
      const originalUrl = req.originalUrl;

      if (originalUrl !== null && originalUrl !== undefined && originalUrl.length > 0) {
        filename = originalUrl.substring(originalUrl.lastIndexOf('/') + 1);
        const itemlist = originalUrl.toString().split('/');
        endPoint = itemlist[itemlist.length - 2];
      }

      caseworkerUser = await getSystemUser();
      caseReference = req.session.userCase.id;

      client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
      req.session.userCase = caseDataFromCos;
    } catch (err) {
      console.log(err);
    }

    let documentToGet;
    let uid;
    let isAllegationOfHarmViewed;

    if (filename === 'cadafinaldocumentrequest') {
      if (!req.session.userCase.finalDocument?.document_binary_url) {
        throw new Error('APPLICANT_CA_REQUEST binary url is not found');
      }
      filename = req.session.userCase.finalDocument.document_filename;
      documentToGet = req.session.userCase.finalDocument?.document_binary_url;
      uid = this.getUID(documentToGet);
    }

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
    if (filename.includes('miamcertificate')) {
      if (!req.session.userCase.miamCertificationDocumentUpload?.document_binary_url) {
        throw new Error('miam certificate binary url is not found');
      }
      filename = req.session.userCase.miamCertificationDocumentUpload.document_filename;
      documentToGet = req.session.userCase.miamCertificationDocumentUpload.document_binary_url;

      uid = this.getUID(documentToGet);
    }

    if (filename.includes('aohviolence')) {
      if (!req.session.userCase.c1ADocument?.document_binary_url) {
        throw new Error('c1ADocument binary url is not found');
      }
      filename = req.session.userCase.c1ADocument.document_filename;
      documentToGet = req.session.userCase.c1ADocument.document_binary_url;
      uid = this.getUID(documentToGet);
      isAllegationOfHarmViewed = YesOrNo.YES;
    }

    if (endPoint === 'downloadCitizenDocument' && req.session.userCase?.citizenUploadedDocumentList) {
      for (const doc of req.session.userCase?.citizenUploadedDocumentList) {
        if (
          doc.value.citizenDocument.document_url.substring(
            doc.value.citizenDocument.document_url.lastIndexOf('/') + 1
          ) === filename
        ) {
          if (!doc.value.citizenDocument.document_binary_url) {
            throw new Error('APPLICATION_POSITION_STATEMENT binary url is not found');
          }
          documentToGet = doc.value.citizenDocument.document_binary_url;
          filename = doc.value.citizenDocument.document_filename;
        }
      }
      uid = this.getUID(documentToGet);
    }

    if (endPoint === 'downloadManageDocument' && req.session.userCase?.otherDocuments) {
      for (const doc of req.session.userCase?.otherDocuments) {
        if (
          doc.value?.documentOther?.document_url.substring(
            doc.value.documentOther.document_url.lastIndexOf('/') + 1
          ) === filename
        ) {
          if (!doc.value.documentOther.document_binary_url) {
            throw new Error('APPLICATION_POSITION_STATEMENT binary url is not found');
          }
          documentToGet = doc.value.documentOther.document_binary_url;
          filename = doc.value.documentOther.document_filename;
        }
      }
      uid = this.getUID(documentToGet);
    }

    if (endPoint === 'orders' && req.session.userCase?.orderCollection) {
      for (const doc of req.session.userCase?.orderCollection) {
        if (
          doc.value.orderDocument.document_url.substring(doc.value.orderDocument.document_url.lastIndexOf('/') + 1) ===
          filename
        ) {
          if (!doc.value.orderDocument.document_binary_url) {
            throw new Error('ORDERS_FROM_THE_COURT binary url is not found');
          }
          documentToGet = doc.value.orderDocument.document_binary_url;
          filename = doc.value.orderDocument.document_filename;
        }
      }
      uid = this.getUID(documentToGet);
    }

    if (endPoint === 'applicationmade' && req.session.userCase?.existingProceedings) {
      for (const doc of req.session.userCase?.existingProceedings) {
        if (
          doc.value?.uploadRelevantOrder?.document_url.substring(
            doc.value.uploadRelevantOrder.document_url.lastIndexOf('/') + 1
          ) === filename
        ) {
          if (!doc.value.uploadRelevantOrder.document_binary_url) {
            throw new Error('APPLICATION MADE IN THESE PROCEEDINGS binary url is not found');
          }
          documentToGet = doc.value.uploadRelevantOrder.document_binary_url;
          filename = doc.value.uploadRelevantOrder.document_filename;
        }
      }
      uid = this.getUID(documentToGet);
    }

    const cdamUrl = config.get('services.documentManagement.url') + '/cases/documents/' + uid + '/binary';
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: cdamUrl });

    req.session.save(err => {
      if (err) {
        throw err;
      } else if (generatedDocument) {
        if (
          isAllegationOfHarmViewed === YesOrNo.YES &&
          req.query?.updateCase &&
          req.query?.updateCase === YesOrNo.YES
        ) {
          this.setAllegationOfHarmViewed(req, caseReference, client, caseworkerUser);
        }
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

  private async setAllegationOfHarmViewed(
    req: AppRequest<Partial<CaseWithId>>,
    caseReference: string,
    client: CosApiClient,
    caseworkerUser: UserDetails
  ) {
    let isAllegationOfHarmViewed;
    req?.session?.userCase.respondents?.forEach((respondent: Respondent) => {
      if (
        respondent?.value.email === req.session?.user.email &&
        !respondent?.value?.response?.citizenFlags?.isAllegationOfHarmViewed
      ) {
        isAllegationOfHarmViewed = YesOrNo.YES;
        if (respondent.value.response && respondent.value.response.citizenFlags) {
          respondent.value.response.citizenFlags.isAllegationOfHarmViewed = YesOrNo.YES;
        } else {
          respondent.value.response = {
            citizenFlags: {
              isApplicationViewed: 'No',
              isAllegationOfHarmViewed: 'Yes',
            },
          };
        }
      }
    });
    if (isAllegationOfHarmViewed) {
      const data = toApiFormat(req?.session?.userCase);
      data.id = caseReference;
      const updatedCaseDataFromCos = await client.updateCase(
        caseworkerUser,
        caseReference as string,
        data,
        'linkCitizenAccount'
      );
      req.session.userCase = updatedCaseDataFromCos;
    }
  }

  private getUID(documentToGet: string) {
    const refinedUrl = documentToGet.replace('/binary', '');
    return refinedUrl.substring(refinedUrl.length - UID_LENGTH);
  }

  public async deleteDocument(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const isApplicant = req.query.isApplicant;
    let redirectUrl;
    const caseworkerUser = await getSystemUser();
    //req.session.userCase['applicantUploadFiles'];
    const documentIdToDelete = req.params.documentId;
    const deleteDocumentDetails = {
      caseId: req.session.userCase.id,
      documentId: documentIdToDelete,
    };
    const deleteDocumentRequest = new DeleteDocumentRequest(deleteDocumentDetails);
    const client = new CosApiClient(caseworkerUser.accessToken, 'http://localhost:3001');
    const deleteCitizenDocFromCos = await client.deleteCitizenStatementDocument(caseworkerUser, deleteDocumentRequest);
    if (deleteCitizenDocFromCos === 'SUCCESS') {
      if (isApplicant === YesOrNo.YES) {
        req.session.userCase.applicantUploadFiles?.forEach((document, index) => {
          if (document.id === documentIdToDelete) {
            req.session.userCase.applicantUploadFiles?.splice(index, 1);
          }
        });
      } else {
        req.session.userCase.respondentUploadFiles?.forEach((document, index) => {
          if (document.id === documentIdToDelete) {
            req.session.userCase.respondentUploadFiles?.splice(index, 1);
          }
        });
      }
      const caseDataFromCos = await client.retrieveByCaseId(req.session.userCase.id, caseworkerUser);
      req.session.userCase.citizenUploadedDocumentList = caseDataFromCos.citizenUploadedDocumentList;
      req.session.errors = [];
    } else {
      req.session.errors?.push({ errorType: 'Document could not be deleted', propertyName: 'uploadFiles' });
    }
    if (isApplicant === YesOrNo.YES) {
      redirectUrl =
        APPLICANT_UPLOAD_DOCUMENT +
        '?' +
        'caption=' +
        req.query.parentDocumentType +
        '&document_type=' +
        req.query.documentType;
    } else {
      redirectUrl =
        RESPONDENT_UPLOAD_DOCUMENT +
        '?' +
        'caption=' +
        req.query.parentDocumentType +
        '&document_type=' +
        req.query.documentType;
    }
    this.redirect(req, res, redirectUrl);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const isApplicant = req.query.isApplicant;
    //let applicantFiles: UploadedFile[] = [];
    const respondentFiles: UploadedFile[] = [];
    //if (isApplicant === YesOrNo.YES) {
    if (req?.session?.userCase?.applicantUploadFiles === undefined) {
      req.session.userCase['applicantUploadFiles'] = [];
    }

    if (req?.session?.userCase?.respondentUploadFiles === undefined) {
      req.session.userCase['respondentUploadFiles'] = [];
    }

    if (!req.files?.length) {
      if (req.headers.accept?.includes('application/json')) {
        throw new Error('No files were uploaded');
      } else {
        console.log('test.....');
        const fileData = req.files || [];
        console.log('File data... : ', fileData);
        const obj = {
          id: fileData[0]['originalname'],
          name: fileData[0]['originalname'],
        };
        req.session.userCase.applicantUploadFiles?.push(obj);
        console.log('content in upload files: ', req.session.userCase.applicantUploadFiles?.push(obj));

        //return res.redirect(UPLOAD_DOCUMENT);
      }
    } else {
      const fileData = req.files || [];
      console.log('File data... : ', fileData);

      const obj = {
        id: fileData[0]['originalname'],
        name: fileData[0]['originalname'],
      };

      console.log('ID details: ', obj.id);
      console.log('name details: ', obj.name);

      if (isApplicant === YesOrNo.YES) {
        req.session.userCase.applicantUploadFiles?.push(obj);
      } else {
        req.session.userCase.respondentUploadFiles?.push(obj);

        console.log('Respondent files []', respondentFiles);
      }
    }

    let redirectUrl;

    if (isApplicant === YesOrNo.YES) {
      redirectUrl =
        APPLICANT_UPLOAD_DOCUMENT +
        '?' +
        'caption=' +
        req.query.parentDocumentType +
        '&document_type=' +
        req.query.documentType;
    } else {
      redirectUrl =
        RESPONDENT_UPLOAD_DOCUMENT +
        '?' +
        'caption=' +
        req.query.parentDocumentType +
        '&document_type=' +
        req.query.documentType;
    }
    this.redirect(req, res, redirectUrl);
  }
}
