import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import { ApplicantUploadFiles, RespondentUploadFiles } from '../../steps/constants';
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
import { CaseWithId } from '../case/case';
import { DocumentType, YesOrNo } from '../case/definition';
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
      req.session.userCase[ApplicantUploadFiles] = [];
    }

    if (req?.session?.userCase?.respondentUploadFiles === undefined) {
      req.session.userCase[RespondentUploadFiles] = [];
    }

    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { _csrf, ...formData } = form.getParsedBody(req.body);
    const caseworkerUser = req.session.user;
    req.session.errors = form.getErrors(formData);

    const partyName = req.session.user.givenName + ' ' + req.session.user.familyName;
    const isApplicant = req.query.isApplicant;

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
      if (YesOrNo.YES === isApplicant) {
        req.session.userCase.applicantUploadFiles?.push(obj);
      } else {
        req.session.userCase.respondentUploadFiles?.push(obj);
      }
      const caseDataFromCos = await client.retrieveByCaseId(req.session.userCase.id, caseworkerUser);
      req.session.userCase.citizenUploadedDocumentList = caseDataFromCos.citizenUploadedDocumentList;
      req.session.errors = [];
    }
    this.redirect(req, res, this.setRedirectUrl(isApplicant, req));
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    let filename = '';
    let endPoint = '';
    try {
      const originalUrl = req.originalUrl;

      if (originalUrl !== null && originalUrl !== undefined && originalUrl.length > 0) {
        filename = originalUrl.substring(originalUrl.lastIndexOf('/') + 1);
        const itemlist = originalUrl.toString().split('/');
        endPoint = itemlist[itemlist.length - 2];
      }

      const caseworkerUser = await getSystemUser();
      req.session.user = caseworkerUser;
      const caseReference = req.session.userCase.id;

      const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
      req.session.userCase = caseDataFromCos;
      // this is for testing //
      // req.session.userCase.orderCollection = [
      //   {
      //     id: '9df80a48-dd3d-4e29-918b-472aa34a2490',
      //     value: {
      //       dateCreated: '08-Aug-2022',
      //       orderType: 'test_orderType',
      //       orderDocument: {
      //         document_url:
      //           'http://dm-store-aat.service.core-compute-aat.internal/documents/f2436270-0d05-436b-bafc-51000defd1e',
      //         document_binary_url:
      //           'http://dm-store-aat.service.core-compute-aat.internal/documents/f2436270-0d05-436b-bafc-51000defd1eb/binary',
      //         document_filename: 'FL401-Final-Document 11.pdf',
      //         document_hash: null,
      //       },
      //       otherDetails: {
      //         createdBy: 'createdBy',
      //         orderCreatedDate: 'orderCreatedDate',
      //         orderMadeDate: 'orderMadeDate',
      //         orderRecipients: 'orderRecipients',
      //       },
      //     },
      //   },
      // ];
    } catch (err) {
      console.log(err);
    }

    let documentToGet;
    let uid;

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
    }

    if (endPoint === 'downloadCitizenDocument' && req.session.userCase?.citizenUploadedDocumentList) {
      for (const doc of req.session.userCase?.citizenUploadedDocumentList) {
        if (
          doc.value?.citizenDocument?.document_url?.substring(
            doc.value?.citizenDocument?.document_url?.lastIndexOf('/') + 1
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
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
        return res.end(generatedDocument.data);
      }

      let redirectUrl = '';
      if (req.originalUrl.includes(APPLICANT)) {
        redirectUrl = APPLICANT_TASK_LIST_URL;
      } else if (req.originalUrl.includes(RESPONDENT)) {
        redirectUrl = RESPONDENT_TASK_LIST_URL;
      }
      return res.redirect(redirectUrl);
    });
  }

  private getUID(documentToGet: string) {
    const refinedUrl = documentToGet.replace('/binary', '');
    return refinedUrl.substring(refinedUrl.length - UID_LENGTH);
  }

  public async deleteDocument(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const isApplicant = req.query.isApplicant;
    const caseworkerUser = req.session.user;
    const documentIdToDelete = req.params.documentId;
    const deleteDocumentDetails = {
      caseId: req.session.userCase.id,
      documentId: documentIdToDelete,
    };
    const deleteDocumentRequest = new DeleteDocumentRequest(deleteDocumentDetails);
    const client = new CosApiClient(caseworkerUser.accessToken, 'http://localhost:3001');
    const deleteCitizenDocFromCos = await client.deleteCitizenStatementDocument(caseworkerUser, deleteDocumentRequest);
    if ('SUCCESS' === deleteCitizenDocFromCos) {
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
    this.redirect(req, res, this.setRedirectUrl(isApplicant, req));
  }

  private setRedirectUrl(isApplicant, req: AppRequest<Partial<CaseWithId>>) {
    let redirectUrl = '';
    if (YesOrNo.YES === isApplicant) {
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
    return redirectUrl;
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const isApplicant = req.query.isApplicant;

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
        const fileData = req.files || [];
        const obj = {
          id: fileData[0]['originalname'],
          name: fileData[0]['originalname'],
        };
        req.session.userCase.applicantUploadFiles?.push(obj);

        //return res.redirect(UPLOAD_DOCUMENT);
      }
    } else {
      const fileData = req.files || [];

      const obj = {
        id: fileData[0]['originalname'],
        name: fileData[0]['originalname'],
      };

      if (isApplicant === YesOrNo.YES) {
        req.session.userCase.applicantUploadFiles?.push(obj);
      } else {
        req.session.userCase.respondentUploadFiles?.push(obj);
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
