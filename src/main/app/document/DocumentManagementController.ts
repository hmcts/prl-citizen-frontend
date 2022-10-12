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
import { CosApiClient } from '../case/CosApiClient';
import { CaseWithId } from '../case/case';
import {
  Applicant,
  DocumentType,
  DownloadFileFieldFlag,
  FileProperties,
  Respondent,
  YesOrNo,
} from '../case/definition';
import { toApiFormat } from '../case/to-api-format';
import type { AppRequest, UserDetails } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

import { DeleteDocumentRequest } from './DeleteDocumentRequest';
import { DocumentManagementClient } from './DocumentManagementClient';
import { GenerateAndUploadDocumentRequest } from './GenerateAndUploadDocumentRequest';
import { UploadedDocumentRequest } from './UploadedDocumentRequest';

const UID_LENGTH = 36;
@autobind
export class DocumentManagerController extends PostController<AnyObject> {
  private fileNameSearchPatternElementMap: Map<string, FileProperties> = new Map<string, FileProperties>();
  private fileNameElementMap: Map<string, FileProperties> = new Map<string, FileProperties>();

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);

    if (this.fileNameSearchPatternElementMap.size === 0) {
      this.fileNameSearchPatternElementMap = new Map<string, FileProperties>();
      this.fileNameSearchPatternElementMap.set('miamcertificate', { elements: ['miamCertificationDocumentUpload'] });
      this.fileNameSearchPatternElementMap.set('cadafinaldocumentrequest', {
        elements: ['finalDocument'],
        downloadFileFieldFlag: DownloadFileFieldFlag.IS_APPLICATION_VIEWED,
      });
      this.fileNameSearchPatternElementMap.set('aohviolence', {
        elements: ['c1ADocument'],
        downloadFileFieldFlag: DownloadFileFieldFlag.IS_ALLEGATION_OF_HARM_VIEWED,
      });
    }

    if (this.fileNameElementMap.size === 0) {
      this.fileNameElementMap.set('downloadCitizenDocument', {
        elements: ['citizenUploadedDocumentList', 'citizenDocument'],
      });
      this.fileNameElementMap.set('orders', { elements: ['orderCollection', 'orderDocument'] });
      this.fileNameElementMap.set('applicationmade', { elements: ['existingProceedings', 'uploadRelevantOrder'] });
      this.fileNameElementMap.set('downloadManageDocument', { elements: ['otherDocuments', 'documentOther'] });
    }
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
    const loggedInCitizen = req.session.user;

    const isApplicant = req.query.isApplicant;
    const partyName = this.getPartyName(isApplicant, req);

    const uploadDocumentDetails = {
      documentRequestedByCourt: req.session.userCase.start,
      caseId: req.session.userCase.id,
      freeTextUploadStatements: req.body.freeTextAreaForUpload,
      parentDocumentType: req.query.parentDocumentType,
      documentType: req.query.documentType,
      partyName,
      partyId: req.session.user.id,
      isApplicant,
    };
    const generateAndUploadDocumentRequest = new GenerateAndUploadDocumentRequest(uploadDocumentDetails);

    const client = new CosApiClient(loggedInCitizen.accessToken, 'http://localhost:3001');
    const uploadCitizenDocFromCos = await client.generateUserUploadedStatementDocument(
      loggedInCitizen,
      generateAndUploadDocumentRequest
    );
    if (uploadCitizenDocFromCos.status !== 200) {
      if (!req.session.errors) {
        req.session.errors = [];
      }
      req.session.errors?.push({ errorType: 'Document could not be uploaded', propertyName: 'uploadFiles' });
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
      const caseDataFromCos = this.notifyBannerForNewDcoumentUploaded(
        req,
        req.session.userCase.id,
        client,
        req.session.user
      );
      Object.assign(req.session.userCase, caseDataFromCos);
      //const caseDataFromCos = await client.retrieveByCaseId(req.session.userCase.id, loggedInCitizen);
      //req.session.userCase.citizenUploadedDocumentList = caseDataFromCos.citizenUploadedDocumentList;
      req.session.errors = [];
    }
    this.redirect(req, res, this.setRedirectUrl(isApplicant, req));
  }

  public async notifyBannerForNewDcoumentUploaded(
    req: AppRequest<Partial<CaseWithId>>,
    caseReference: string,
    client: CosApiClient,
    loggedInCitizen: UserDetails
  ): Promise<CaseWithId> {
    if (req?.session?.userCase?.caseTypeOfApplication === 'C100') {
      req?.session?.userCase.respondents?.forEach((respondent: Respondent) => {
        if (respondent.value.response && respondent.value.response.citizenFlags) {
          respondent.value.response.citizenFlags.isAllDocumentsViewed = YesOrNo.NO;
        } else {
          respondent.value.response = {
            citizenFlags: {
              isAllDocumentsViewed: 'No',
            },
          };
        }
      });
      req?.session?.userCase.applicants?.forEach((applicant: Applicant) => {
        if (applicant.value.response && applicant.value.response.citizenFlags) {
          applicant.value.response.citizenFlags.isAllDocumentsViewed = YesOrNo.NO;
        } else {
          applicant.value.response = {
            citizenFlags: {
              isAllDocumentsViewed: 'No',
            },
          };
        }
      });
    } else {
      if (req?.session?.userCase.respondentsFL401) {
        if (
          req?.session?.userCase.respondentsFL401?.response &&
          req?.session?.userCase.respondentsFL401?.response.citizenFlags
        ) {
          req.session.userCase.respondentsFL401.response.citizenFlags.isAllDocumentsViewed = YesOrNo.NO;
        } else {
          req.session.userCase.respondentsFL401.response = {
            citizenFlags: {
              isAllDocumentsViewed: 'No',
            },
          };
        }
      }
      if (req?.session?.userCase.applicantsFL401) {
        if (
          req?.session?.userCase.applicantsFL401?.response &&
          req?.session?.userCase.applicantsFL401?.response.citizenFlags
        ) {
          req.session.userCase.applicantsFL401.response.citizenFlags.isAllDocumentsViewed = YesOrNo.NO;
        } else {
          req.session.userCase.applicantsFL401.response = {
            citizenFlags: {
              isAllDocumentsViewed: 'No',
            },
          };
        }
      }
    }

    const data = toApiFormat(req?.session?.userCase);
    data.id = caseReference;
    const updatedCaseDataFromCos = await client.updateCase(
      loggedInCitizen,
      caseReference as string,
      data,
      'citizen-internal-case-update'
    );
    return updatedCaseDataFromCos;
  }

  private getPartyName(isApplicant, req: AppRequest<AnyObject>) {
    let partyName = '';
    if (YesOrNo.YES === isApplicant) {
      if (req.session.userCase?.caseTypeOfApplication === 'C100') {
        req.session.userCase?.applicants?.forEach(applicant => {
          if (applicant.value?.user?.idamId === req.session.user.id) {
            partyName = applicant.value?.firstName + ' ' + applicant.value?.lastName;
          }
        });
      } else {
        if (req.session.userCase?.applicantsFL401?.user?.idamId === req.session.user.id) {
          partyName =
            req.session.userCase.applicantsFL401?.firstName + ' ' + req.session.userCase.applicantsFL401?.lastName;
        }
      }
    } else {
      if (req.session.userCase?.caseTypeOfApplication === 'C100') {
        req.session.userCase?.respondents?.forEach(respondent => {
          if (respondent.value?.user?.idamId === req.session.user.id) {
            partyName = respondent.value?.firstName + ' ' + respondent.value?.lastName;
          }
        });
      } else {
        if (req.session.userCase?.respondentsFL401?.user?.idamId === req.session.user.id) {
          partyName =
            req.session.userCase.respondentsFL401?.firstName + ' ' + req.session.userCase.respondentsFL401?.lastName;
        }
      }
    }
    return partyName;
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    let filename = '';
    let endPoint = '';
    let client;
    let caseReference;
    let loggedInCitizen;

    try {
      const originalUrl = req.originalUrl;

      if (originalUrl !== null && originalUrl !== undefined && originalUrl.length > 0) {
        filename = originalUrl.substring(originalUrl.lastIndexOf('/') + 1);
        const itemlist = originalUrl.toString().split('/');
        endPoint = itemlist[itemlist.length - 2];
      }

      loggedInCitizen = req.session.user;
      caseReference = req.session.userCase.id;

      client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
      req.session.userCase = caseDataFromCos;
    } catch (err) {
      console.log(err);
    }

    let documentToGet = '';
    let uid = '';
    let fieldFlag = '';

    if (filename === DocumentType.WITNESS_STATEMENT) {
      if (!req.session.userCase.fl401UploadWitnessDocuments?.[0].value?.document_binary_url) {
        throw new Error('APPLICATION_WITNESS_STATEMENT binary url is not found');
      }
      documentToGet = req.session.userCase.fl401UploadWitnessDocuments[0].value?.document_binary_url;
      uid = this.getUID(documentToGet);
    }

    for (const entry of this.fileNameSearchPatternElementMap.entries()) {
      const fileNameSearchPattern = entry[0];
      if (filename.includes(fileNameSearchPattern) || filename === fileNameSearchPattern) {
        uid = this.getDocumentUIDWithOutFlag(req, entry[1].elements, entry[1].downloadFileFieldFlag);
        if (uid.trim() !== '') {
          if (entry[1]?.downloadFileFieldFlag) {
            fieldFlag = entry[1]?.downloadFileFieldFlag;
          }
          break;
        }
      }
    }

    if (uid.trim() === '') {
      for (const entry of this.fileNameElementMap.entries()) {
        const searchPattern = entry[0];
        const element = entry[1];
        uid = this.getDocumentUIDWithMultipleElements(endPoint, req, filename, searchPattern, element.elements);
        if (uid !== '') {
          break;
        }
      }
    }

    const cdamUrl = config.get('services.documentManagement.url') + '/cases/documents/' + uid + '/binary';
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: cdamUrl });

    req.session.save(err => {
      if (err) {
        throw err;
      } else if (generatedDocument) {
        if (fieldFlag && req.query?.updateCase && req.query?.updateCase === YesOrNo.YES) {
          this.setFlagViewed(req, caseReference, client, req.session.user, fieldFlag);
        }
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

  private getDocumentUIDWithMultipleElements(
    endPoint: string,
    req: AppRequest<Partial<CaseWithId>>,
    filename: string,
    endPoint_input: string,
    elements: string[] | undefined
  ) {
    let documentToGet = '';
    let uid = '';

    if (elements !== null && elements?.length && elements?.length > 0) {
      const element = elements[0];
      const childElement = elements[1];

      if (endPoint === endPoint_input && req.session.userCase[`${element}`]) {
        for (const doc of req.session.userCase[`${element}`]) {
          if (
            doc.value[`${childElement}`]?.document_url?.substring(
              doc.value[`${childElement}`]?.document_url?.lastIndexOf('/') + 1
            ) === filename
          ) {
            if (!doc.value[`${childElement}`].document_binary_url) {
              throw new Error('Binary URL is not found for ' + element + ':' + childElement);
            }
            documentToGet = doc.value[`${childElement}`].document_binary_url;
            break;
          }
        }
        uid = this.getUID(documentToGet);
      }
    }
    return uid;
  }

  private getDocumentUIDWithOutFlag(
    req: AppRequest<Partial<CaseWithId>>,
    element: string[] | undefined,
    flag: string | undefined
  ) {
    let uid = '';
    let documentToGet = '';
    let ele = '';
    const document_filename = req.session.userCase[`${element}`]?.document_filename;

    if (element !== null && element !== undefined) {
      ele = element[0];
      if (!req.session.userCase[`${ele}`]?.document_binary_url) {
        throw new Error('binary url is not found for ' + document_filename);
      }
      documentToGet = req.session.userCase[`${ele}`]?.document_binary_url;
      uid = this.getUID(documentToGet);

      if (flag !== null || flag !== undefined) {
        flag = YesOrNo.YES;
      }
    }
    return uid;
  }

  private async setFlagViewed(
    req: AppRequest<Partial<CaseWithId>>,
    caseReference: string,
    client: CosApiClient,
    loggedInCitizen: UserDetails,
    flag: string
  ) {
    let isFlagViewed;
    let skipCallToSaveState: boolean;
    req?.session?.userCase.respondents?.forEach((respondent: Respondent) => {
      const cvIsApplicationViewed = respondent?.value?.response?.citizenFlags?.isApplicationViewed;
      const cvIsAllegationOfHarmViewed = respondent?.value?.response?.citizenFlags?.isAllegationOfHarmViewed;

      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        if (flag === DownloadFileFieldFlag.IS_APPLICATION_VIEWED && cvIsApplicationViewed === YesOrNo.YES) {
          skipCallToSaveState = true;
        } else if (
          flag === DownloadFileFieldFlag.IS_ALLEGATION_OF_HARM_VIEWED &&
          cvIsAllegationOfHarmViewed === YesOrNo.YES
        ) {
          skipCallToSaveState = true;
        }

        if (!skipCallToSaveState) {
          this.setCaseDataCitizenFlags(flag, cvIsAllegationOfHarmViewed, cvIsApplicationViewed, respondent);
          isFlagViewed = YesOrNo.YES;
        }
      }
    });
    if (isFlagViewed) {
      const data = toApiFormat(req?.session?.userCase);
      data.id = caseReference;
      const updatedCaseDataFromCos = await client.updateCase(
        loggedInCitizen,
        caseReference as string,
        data,
        'citizen-internal-case-update'
      );
      req.session.userCase = updatedCaseDataFromCos;
    }
  }

  private setCaseDataCitizenFlags(
    flag: string,
    cvIsAllegationOfHarmViewed: string | undefined,
    cvIsApplicationViewed: string | undefined,
    respondent: Respondent
  ) {
    const temp = {};
    if (respondent?.value?.response?.citizenFlags) {
      if (flag === DownloadFileFieldFlag.IS_APPLICATION_VIEWED) {
        //Object.assign(respondent?.value?.response?.citizenFlags, {isApplicationViewed: 'Yes'});
        Object.assign(temp, { isApplicationViewed: 'Yes' });

        if (cvIsAllegationOfHarmViewed === 'Yes') {
          Object.assign(temp, { isAllegationOfHarmViewed: 'Yes' });
        } else {
          Object.assign(temp, { isAllegationOfHarmViewed: 'No' });
        }
      }

      if (flag === DownloadFileFieldFlag.IS_ALLEGATION_OF_HARM_VIEWED) {
        Object.assign(temp, { isAllegationOfHarmViewed: 'Yes' });

        if (cvIsApplicationViewed === 'Yes') {
          Object.assign(temp, { isApplicationViewed: 'Yes' });
        } else {
          Object.assign(temp, { isApplicationViewed: 'No' });
        }
      }
      Object.assign(respondent.value.response.citizenFlags, temp);
    }
  }

  private getUID(documentToGet: string) {
    const refinedUrl = documentToGet.replace('/binary', '');
    return refinedUrl.substring(refinedUrl.length - UID_LENGTH);
  }

  public async deleteDocument(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const isApplicant = req.query.isApplicant;
    const loggedInCitizen = req.session.user;
    const documentIdToDelete = req.params.documentId;
    const deleteDocumentDetails = {
      caseId: req.session.userCase.id,
      documentId: documentIdToDelete,
    };
    const deleteDocumentRequest = new DeleteDocumentRequest(deleteDocumentDetails);
    const client = new CosApiClient(loggedInCitizen.accessToken, 'http://localhost:3001');
    const deleteCitizenDocFromCos = await client.deleteCitizenStatementDocument(loggedInCitizen, deleteDocumentRequest);
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
      const caseDataFromCos = await client.retrieveByCaseId(req.session.userCase.id, loggedInCitizen);
      req.session.userCase.citizenUploadedDocumentList = caseDataFromCos.citizenUploadedDocumentList;
      req.session.errors = [];
    } else {
      if (!req.session.errors) {
        req.session.errors = [];
      }
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
    let isApplicant;
    if (req.query && req.query.isApplicant) {
      isApplicant = req.query.isApplicant;
    }
    if (req?.session?.userCase?.applicantUploadFiles === undefined) {
      req.session.userCase[ApplicantUploadFiles] = [];
    }

    if (req?.session?.userCase?.respondentUploadFiles === undefined) {
      req.session.userCase[RespondentUploadFiles] = [];
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
      }
    } else {
      //const fileData = req.files || [];
      // const obj = {
      //   id: fileData[0]['originalname'],
      //   name: fileData[0]['originalname'],
      // };
    }

    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { _csrf, ...formData } = form.getParsedBody(req.body);
    const caseworkerUser = req.session.user;
    req.session.errors = form.getErrors(formData);

    const partyName = this.getPartyName(isApplicant, req);

    const files = req.files || [];

    let documentRequestedByCourt;

    if (req.session.userCase && req.session.userCase.start) {
      documentRequestedByCourt = req.session.userCase.start;
    }

    console.log('documentRequestedByCourt option: ', documentRequestedByCourt);

    let parentDocumentType;
    let documentType;
    const caseId = req.session.userCase.id;
    if (req.query && req.query.parentDocumentType) {
      parentDocumentType = req.query.parentDocumentType;
    }
    if (req.query && req.query.documentType) {
      documentType = req.query.documentType;
    }
    const partyId = req.session.user.id;

    const uploadedDocumentRequest = new UploadedDocumentRequest(
      caseId,
      files,
      parentDocumentType,
      documentType,
      partyName,
      partyId,
      isApplicant
    );

    const client = new CosApiClient(caseworkerUser.accessToken, 'http://localhost:3001');

    console.log('Calling upload request: ', uploadedDocumentRequest);

    const citizenDocumentListFromCos = await client.UploadDocumentListFromCitizen(
      caseworkerUser,
      caseId,
      parentDocumentType,
      documentType,
      partyId,
      partyName,
      isApplicant,
      files,
      documentRequestedByCourt
    );
    if (citizenDocumentListFromCos.status !== 200) {
      req.session.errors.push({ errorType: 'Document could not be uploaded', propertyName: 'uploadFiles' });
    } else {
      const obj = {
        id: citizenDocumentListFromCos.documentId as string,
        name: citizenDocumentListFromCos.documentName as string,
      };
      if (YesOrNo.YES === isApplicant) {
        req.session.userCase.applicantUploadFiles?.push(obj);
      } else {
        req.session.userCase.respondentUploadFiles?.push(obj);
      }
      const caseDataFromCos = this.notifyBannerForNewDcoumentUploaded(
        req,
        req.session.userCase.id,
        client,
        req.session.user
      );
      Object.assign(req.session.userCase, caseDataFromCos);
      req.session.errors = [];
    }

    this.redirect(req, res, this.setRedirectUrl(isApplicant, req));
  }
}
