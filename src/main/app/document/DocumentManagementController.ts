/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import { ApplicantUploadFiles, RespondentUploadFiles } from '../../steps/constants';
import {
  APPLICANT,
  APPLICANT_TASK_LIST_URL,
  APPLICANT_UPLOAD_DOCUMENT,
  APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
  C100_APPLICANT_TASKLIST,
  RESPONDENT,
  RESPONDENT_TASK_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
} from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CosApiClient, UploadDocumentRequest } from '../case/CosApiClient';
import { CaseWithId } from '../case/case';
import {
  Applicant,
  CaseType,
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

const UID_LENGTH = 36;
@autobind
export class DocumentManagerController extends PostController<AnyObject> {
  private fileNameSearchPatternElementMap: Map<string, FileProperties> = new Map<string, FileProperties>();
  private fileNameElementMap: Map<string, FileProperties> = new Map<string, FileProperties>();

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
    console.info('** FOR SONAR **');
    if (this.fileNameSearchPatternElementMap.size === 0) {
      this.fileNameSearchPatternElementMap = new Map<string, FileProperties>();
      this.fileNameSearchPatternElementMap.set('miamcertificate', { elements: ['miamCertificationDocumentUpload'] });
      this.fileNameSearchPatternElementMap.set('responsetoca', { elements: ['respondentDocsList', 'c7'] });
      this.fileNameSearchPatternElementMap.set('aohtoca', { elements: ['respondentDocsList', 'c1a'] });
      this.fileNameSearchPatternElementMap.set('othtoca', { elements: ['respondentDocsList', 'other'] });
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
      const caseDetailsFromCos = await client.retrieveByCaseId(req.session.userCase.id, loggedInCitizen);

      Object.assign(req.session.userCase, caseDetailsFromCos);
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

  public async notifyBannerForNewDcoumentC100Respondent(req: AppRequest<Partial<CaseWithId>>): Promise<void> {
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
  }

  public async notifyBannerForNewDcoumentC100Applicant(req: AppRequest<Partial<CaseWithId>>): Promise<void> {
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
  }

  public async notifyBannerForNewDcoumentUploaded(
    req: AppRequest<Partial<CaseWithId>>,
    caseReference: string,
    client: CosApiClient,
    loggedInCitizen: UserDetails
  ): Promise<CaseWithId> {
    if (req?.session?.userCase?.caseTypeOfApplication === 'C100') {
      this.notifyBannerForNewDcoumentC100Respondent(req);
      this.notifyBannerForNewDcoumentC100Applicant(req);
    }

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
    const updatedCaseDataFromCos = await client.updateCase(loggedInCitizen, caseReference, data, 'citizen-case-update');
    return updatedCaseDataFromCos;
  }

  private getC100ApplicantName(req: AppRequest<AnyObject>, partyName: string) {
    req.session.userCase?.applicants?.forEach(applicant => {
      if (applicant.value?.user?.idamId === req.session.user.id) {
        partyName += applicant.value?.firstName + ' ' + applicant.value?.lastName;
      }
    });

    return partyName;
  }

  private getFL401ApplicantName(req: AppRequest<AnyObject>, partyName: string) {
    if (req.session.userCase?.applicantsFL401?.user?.idamId === req.session.user.id) {
      partyName +=
        req.session.userCase.applicantsFL401?.firstName + ' ' + req.session.userCase.applicantsFL401?.lastName;
    }

    return partyName;
  }

  private getPartyName(isApplicant, req: AppRequest<AnyObject>) {
    let partyName = '';
    if (YesOrNo.YES === isApplicant) {
      if (req.session.userCase?.caseTypeOfApplication === 'C100') {
        partyName = this.getC100ApplicantName(req, partyName);
      } else {
        partyName = this.getFL401ApplicantName(req, partyName);
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

  private retrieveFileNameEndPoint(req: AppRequest<Partial<CaseWithId>>): { filename: string; endPoint: string } {
    const originalUrl = req.originalUrl;
    let filename = '';
    let endPoint = '';
    if (originalUrl !== null && originalUrl !== undefined && originalUrl.length > 0) {
      filename = originalUrl.substring(originalUrl.lastIndexOf('/') + 1);
      const itemList = originalUrl.toString().split('/');
      endPoint = itemList[itemList.length - 2];
    }
    return { filename, endPoint };
  }

  private async resolveDocument(
    req: AppRequest<Partial<CaseWithId>>,
    filename: string,
    endPoint: string,
    fieldFlag: any
  ) {
    let documentToGet = '';
    let uid = '';
    if (filename === 'generate-c7-final') {
      endPoint = 'caresponse';
      const respondent = req.session.userCase.respondents?.find(resp => resp.value.user.idamId === req.session.user.id);
      if (respondent) {
        filename = respondent.id;
      }
    }
    if (endPoint === 'caresponse') {
      req.session.userCase.citizenResponseC7DocumentList?.forEach(document => {
        if (document.value.createdBy === filename) {
          if (!document.value.citizenDocument.document_binary_url) {
            throw new Error('CA_RESPONSE binary url is not found');
          }
          filename = 'C7_Document.pdf';
          documentToGet = document.value.citizenDocument.document_binary_url;
          uid = this.getUID(documentToGet);
        }
      });
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
    return this.getFileNameUidAndFieldFlag(filename, req, uid, endPoint, fieldFlag);
  }

  private getFileNameUidAndFieldFlag(
    filename: string,
    req: AppRequest<Partial<CaseWithId>>,
    uid: string,
    endPoint: string,
    fieldFlag: any
  ) {
    for (const [
      fileNameSearchPattern,
      { elements, downloadFileFieldFlag },
    ] of this.fileNameSearchPatternElementMap.entries()) {
      if (filename.includes(fileNameSearchPattern) || filename === fileNameSearchPattern) {
        const obj = this.getDocumentUIDWithOutFlag(req, elements, downloadFileFieldFlag);
        uid = obj!.uid;
        filename = obj!.filename;
        if (uid.trim() !== '') {
          if (downloadFileFieldFlag) {
            fieldFlag = downloadFileFieldFlag;
          }
          break;
        }
      }
    }

    if (uid.trim() === '') {
      for (const entry of this.fileNameElementMap.entries()) {
        const searchPattern = entry[0];
        const element = entry[1];
        const obj = this.getDocumentUIDWithMultipleElements(endPoint, req, filename, searchPattern, element.elements);
        uid = obj.uid;
        filename = obj.filename;
        if (uid !== '') {
          break;
        }
      }
    }
    return { filename, uid, fieldFlag };
  }

  private async fetchDocument(req: AppRequest<Partial<CaseWithId>>, uid: string) {
    const cdamUrl = config.get('services.documentManagement.url') + '/cases/documents/' + uid + '/binary';
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: cdamUrl });
    return { generatedDocument, cdamUrl };
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    let client: any;
    let caseReference = '';
    let loggedInCitizen: UserDetails;
    let filename = '';
    let endPoint = '';
    let fieldFlag = '';
    let uid = '';
    try {
      const data = this.retrieveFileNameEndPoint(req);
      filename = data.filename;
      endPoint = data.endPoint;
      loggedInCitizen = req.session.user;
      caseReference = req.session.userCase.id;

      client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
      req.session.userCase = caseDataFromCos;
      req.session.userCase = caseDataFromCos;
    } catch (err) {
      req.locals.logger.error(err);
    }
    const documentData = await this.resolveDocument(req, filename, endPoint, fieldFlag);
    fieldFlag = documentData.fieldFlag;
    filename = documentData.filename;
    uid = documentData.uid;

    const { generatedDocument, cdamUrl } = await this.fetchDocument(req, uid);

    this.handleDocumentResponse(req, generatedDocument, res, cdamUrl, fieldFlag, caseReference, client, filename);
  }

  private handleDocumentResponse(
    req: AppRequest<Partial<CaseWithId>>,
    generatedDocument,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res: Response<any, Record<string, any>>,
    cdamUrl: string,
    fieldFlag: string,
    caseReference: string,
    client: CosApiClient,
    filename: string
  ) {
    req.session.save(err => {
      if (err) {
        throw err;
      } else if (generatedDocument) {
        res.setHeader('Content-Type', generatedDocument.headers['content-type']);
        if (cdamUrl && this.getFlagViewed(req, fieldFlag) === true) {
          // download and open the pdf in the same window
          return res.send(generatedDocument.data);
        } else {
          // set the flag from "Download" to "View" and only download the pdf
          if (fieldFlag && req.query?.updateCase && req.query?.updateCase === YesOrNo.YES) {
            this.setFlagViewed(req, caseReference, client, req.session.user, fieldFlag);
          }
          res.setHeader('Content-Disposition', 'inline; filename="' + filename + '";');
          return res.end(generatedDocument.data);
        }
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

    if (elements && elements?.length > 0 && endPoint.includes(endPoint_input)) {
      const [element, childElement] = elements;
      const matchingDocuments = req.session.userCase[element]?.filter(doc =>
        doc.value[childElement]?.document_url?.endsWith(filename)
      );

      if (matchingDocuments && matchingDocuments.length > 0) {
        const matchedDocument = matchingDocuments[0].value[childElement];
        if (!matchedDocument.document_binary_url) {
          throw new Error('Binary URL is not found for ' + element + ':' + childElement);
        }
        documentToGet = matchedDocument.document_binary_url;
        filename = matchedDocument.document_filename;
        uid = this.getUID(documentToGet);
      }
    }
    return { uid, filename };
  }

  private getDocumentUIDWithOutFlag(
    req: AppRequest<Partial<CaseWithId>>,
    element: string[] | undefined,
    flag: string | undefined
  ) {
    let uid = '';
    let documentToGet = '';
    let ele = '';
    let ele1 = '';
    let document_filename = req.session.userCase[`${element}`]?.document_filename;

    if (element !== null && element !== undefined) {
      ele = element[0];
      ele1 = element[1];
      if (ele !== 'respondentDocsList') {
        if (!req.session.userCase[`${ele}`]?.document_binary_url) {
          throw new Error('binary url is not found for ' + document_filename);
        }
        documentToGet = req.session.userCase[`${ele}`]?.document_binary_url;
        uid = this.getUID(documentToGet);

        if (flag !== null || flag !== undefined) {
          flag = YesOrNo.YES;
        }
      } else {
        ({ document_filename, uid } = this.respondentDocList(req, ele1, document_filename, documentToGet, uid));
      }
      return { uid, filename: document_filename };
    }
  }

  private respondentDocList(
    req: AppRequest<Partial<CaseWithId>>,
    ele1: string,
    document_filename: string,
    documentToGet: string,
    uid: string
  ) {
    for (const document of req.session.userCase.respondentDocsList!) {
      if (ele1 === 'c1a' && document.value?.c1aDocument?.partyName === req.query?.name) {
        document_filename = document.value.c1aDocument.citizenDocument.document_filename;
        documentToGet = document.value.c1aDocument.citizenDocument.document_binary_url;
        uid = this.getUID(documentToGet);
        break;
      } else if (ele1 === 'c7' && document.value?.c7Document?.partyName === req.query?.name) {
        document_filename = document.value.c7Document.citizenDocument.document_filename;
        documentToGet = document.value.c7Document.citizenDocument.document_binary_url;
        uid = this.getUID(documentToGet);
        break;
      }
    }
    return { document_filename, documentToGet, uid };
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
        caseReference,
        data,
        'citizen-case-update'
      );
      req.session.userCase = updatedCaseDataFromCos;
    }
  }

  private getFlagViewed(req: AppRequest<Partial<CaseWithId>>, flag: string): boolean {
    let flagViewed = false;
    req?.session?.userCase.respondents?.forEach((respondent: Respondent) => {
      const cvIsApplicationViewed = respondent?.value?.response?.citizenFlags?.isApplicationViewed;
      const cvIsAllegationOfHarmViewed = respondent?.value?.response?.citizenFlags?.isAllegationOfHarmViewed;

      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        if (flag === DownloadFileFieldFlag.IS_APPLICATION_VIEWED && cvIsApplicationViewed === YesOrNo.YES) {
          flagViewed = true;
        } else if (
          flag === DownloadFileFieldFlag.IS_ALLEGATION_OF_HARM_VIEWED &&
          cvIsAllegationOfHarmViewed === YesOrNo.YES
        ) {
          flagViewed = true;
        }
      }
    });
    return flagViewed;
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
    const { caption = '', document_type = '', parentDocumentType = '', documentType = '' } = req.query;

    return `${
      isApplicant === YesOrNo.YES ? APPLICANT_UPLOAD_DOCUMENT : RESPONDENT_UPLOAD_DOCUMENT
    }?caption=${caption}&document_type=${document_type}&parentDocType=${parentDocumentType}&docType=${documentType}`;
  }

  public async undefiendUploadFiles(req: AppRequest): Promise<void> {
    if (req?.session?.userCase?.applicantUploadFiles === undefined) {
      req.session.userCase[ApplicantUploadFiles] = [];
    }

    if (req?.session?.userCase?.respondentUploadFiles === undefined) {
      req.session.userCase[RespondentUploadFiles] = [];
    }
  }

  public async fileData(req: AppRequest): Promise<void> {
    if (!req.files?.length) {
      if (req.headers.accept?.includes('application/json')) {
        throw new Error('No files were uploaded');
      }
    }
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    let isApplicant;
    if (req.query && req.query.isApplicant) {
      isApplicant = req.query.isApplicant;
    }

    this.undefiendUploadFiles(req);

    this.fileData(req);

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

    const client = new CosApiClient(caseworkerUser.accessToken, 'http://localhost:3001');

    const uploadRequest: UploadDocumentRequest = {
      user: caseworkerUser,
      caseId,
      parentDocumentType,
      documentType,
      partyId,
      partyName,
      isApplicant,
      files,
      documentRequestedByCourt,
    };
    const citizenDocumentListFromCos = await client.UploadDocumentListFromCitizen(uploadRequest);
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
      const caseDetailsFromCos = await client.retrieveByCaseId(req.session.userCase.id, caseworkerUser);

      Object.assign(req.session.userCase, caseDetailsFromCos);
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

  public async clearUploadDocumentFormData(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    let isApplicant;
    let isContinue;
    if (req.query && req.query.isApplicant) {
      isApplicant = req.query.isApplicant;
    }

    if (req.query && req.query.isContinue) {
      isContinue = req.query.isContinue;
    }

    if (YesOrNo.YES === isApplicant) {
      req.session.userCase.start = undefined;
      req.session.userCase.applicantUploadFiles = undefined;
      req.session.userCase.declarationCheck = undefined;
    } else {
      req.session.userCase.start = undefined;
      req.session.userCase.respondentUploadFiles = undefined;
      req.session.userCase.declarationCheck = undefined;
    }

    if (YesOrNo.YES === isContinue) {
      this.redirect(req, res, this.setTaskListURL(isApplicant, isContinue, req));
    } else {
      this.redirect(req, res, this.setUploadDocumentListURL(isApplicant));
    }
  }

  private setUploadDocumentListURL(isApplicant) {
    let redirectUrl = '';
    if (YesOrNo.YES === isApplicant) {
      redirectUrl = APPLICANT_UPLOAD_DOCUMENT_LIST_URL;
    } else {
      redirectUrl = RESPONDENT_UPLOAD_DOCUMENT_LIST_URL;
    }
    return redirectUrl;
  }

  private setTaskListURL(isApplicant, isContinue, req: AppRequest<AnyObject>) {
    let redirectUrl = '';
    if (YesOrNo.YES === isApplicant && YesOrNo.YES === isContinue) {
      if (req.session.userCase.caseTypeOfApplication === CaseType.C100) {
        redirectUrl = C100_APPLICANT_TASKLIST;
      } else {
        redirectUrl = APPLICANT_TASK_LIST_URL;
      }
    } else {
      redirectUrl = RESPONDENT_TASK_LIST_URL;
    }
    return redirectUrl;
  }
}
