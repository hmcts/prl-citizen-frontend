import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';

import { getPartyName } from '../../steps/common/task-list/utils';
import { getDocumentType } from '../../steps/common/upload-document/util';
import { applyParms } from '../../steps/common/url-parser';
import { UPDATE_CASE } from '../../steps/constants';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
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
import { CosApiClient } from '../case/CosApiClient';
import { CaseWithId } from '../case/case';
import {
  Applicant,
  CaseType,
  DocType,
  DocumentType,
  DownloadFileFieldFlag,
  FileProperties,
  PartyType,
  Respondent,
  YesOrNo,
} from '../case/definition';
import { toApiFormat } from '../case/to-api-format';
import type { AppRequest, AppSession, UserDetails } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormError, FormFields, FormFieldsFn } from '../form/Form';

import { DocumentManagementClient } from './DocumentManagementClient';
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

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    let filename = '';
    let endPoint = '';
    let client: CosApiClient;
    let caseReference: string;
    let loggedInCitizen: UserDetails;

    try {
      const fileDetails = this.getFileDetails(req);
      filename = fileDetails.filename;
      endPoint = fileDetails.endPoint;

      loggedInCitizen = req.session.user;
      caseReference = req.session.userCase.id;

      client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
      req.session.userCase = caseDataFromCos;
    } catch (err) {
      req.locals.logger.error(err);
    }

    let fieldFlag = '';
    let uid = '';

    const c7Details = this.generateC7Details(filename, endPoint, req);
    filename = c7Details.filename;
    endPoint = c7Details.endPoint;

    const documentDetails = this.getDocumentDetails(filename, req, endPoint);
    uid = documentDetails.uid;
    fieldFlag = documentDetails.fieldFlag;
    filename = documentDetails.filename;

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

    const cdamUrl = config.get('services.documentManagement.url') + '/cases/documents/' + uid + '/binary';
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: cdamUrl });

    req.session.save(err => {
      if (err) {
        throw err;
      } else if (generatedDocument) {
        res.setHeader('Content-Type', generatedDocument.headers['content-type']);
        res.setHeader('Content-Disposition', 'inline; filename="' + filename + '";');
        return this.returnDocumentData(req, res, cdamUrl, fieldFlag, generatedDocument, client, caseReference);
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

  private getFileDetails(req) {
    let filename = '';
    let endPoint = '';
    let originalUrl = req.originalUrl;

    if (originalUrl !== null && originalUrl !== undefined && originalUrl.length > 0) {
      if (req.params.docContext) {
        originalUrl = originalUrl.slice(0, originalUrl.lastIndexOf('/'));
      }
      filename = originalUrl.substring(originalUrl.lastIndexOf('/') + 1);
      const itemlist = originalUrl.toString().split('/');
      endPoint = itemlist[itemlist.length - 2];
    }

    return { filename, endPoint };
  }

  private generateC7Details(filename, endPoint, req) {
    if (filename === 'generate-c7-final') {
      endPoint = 'caresponse';
      req.session.userCase.respondents?.forEach(respondent => {
        if (respondent.value.user.idamId === req.session.user.id) {
          filename = respondent.id;
        }
      });
    }

    return { filename, endPoint };
  }

  private getC7Document(filename, req) {
    let documentToGet;
    let uid = '';

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

    return { uid, filename };
  }

  private getDocumentDetails(filename, req, endPoint) {
    let documentToGet;
    let uid = '';

    if (endPoint === 'caresponse') {
      const c7Document = this.getC7Document(filename, req);
      uid = c7Document.uid;
      filename = c7Document.filename;
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

    return this.searchFileNameMap(filename, req, uid);
  }

  private searchFileNameMap(filename, req, uid) {
    let fieldFlag = '';

    for (const entry of this.fileNameSearchPatternElementMap.entries()) {
      const fileNameSearchPattern = entry[0];
      if (filename.includes(fileNameSearchPattern) || filename === fileNameSearchPattern) {
        const obj = this.getDocumentUIDWithOutFlag(req, entry[1].elements);
        uid = obj!.uid;
        filename = obj!.filename;
        if (uid.trim() !== '') {
          if (entry[1]?.downloadFileFieldFlag) {
            fieldFlag = entry[1]?.downloadFileFieldFlag;
          }
          break;
        }
      }
    }

    return { fieldFlag, uid, filename };
  }

  private returnDocumentData(req, res, cdamUrl, fieldFlag, generatedDocument, client, caseReference) {
    if (cdamUrl && this.getFlagViewed(req, fieldFlag) === true) {
      // download and open the pdf in the same window
      return res.send(generatedDocument.data);
    } else {
      // set the flag from "Download" to "View" and only download the pdf
      if (fieldFlag && req.params?.docContext === UPDATE_CASE) {
        this.setFlagViewed(req, caseReference, client, req.session.user, fieldFlag);
      }
      return res.end(generatedDocument.data);
    }
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

    const handleMissingBinaryUrl = (doc, childElement, element) => {
      if (!doc.value[`${childElement}`].document_binary_url) {
        throw new Error('Binary URL is not found for ' + element + ':' + childElement);
      }
    };

    if (elements !== null && elements?.length && elements?.length > 0) {
      const element = elements[0];
      const childElement = elements[1];

      if (endPoint.includes(endPoint_input) && req.session.userCase[`${element}`]) {
        for (const doc of req.session.userCase[`${element}`]) {
          if (
            doc.value[`${childElement}`]?.document_url?.substring(
              doc.value[`${childElement}`]?.document_url?.lastIndexOf('/') + 1
            ) === filename
          ) {
            handleMissingBinaryUrl(doc, childElement, element);
            documentToGet = doc.value[`${childElement}`].document_binary_url;
            filename = doc.value[`${childElement}`].document_filename;
            break;
          }
        }
        uid = this.getUID(documentToGet);
      }
    }
    return { uid, filename };
  }

  private getDocumentUIDWithOutFlag(req: AppRequest<Partial<CaseWithId>>, element: string[] | undefined) {
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
      } else {
        {
          const docValues = this.getC1aOrC7Documents(ele1, document_filename, documentToGet, uid, req);
          uid = docValues.uid;
          document_filename = docValues.document_filename;
        }
      }
      return { uid, filename: document_filename };
    }
  }

  private getC1aOrC7Documents(element, document_filename, documentToGet, uid, req) {
    for (const document of req.session.userCase.respondentDocsList!) {
      if (
        element === 'c1a' &&
        document.value?.c1aDocument?.partyName === req.session.applicationSettings?.docToView.partyName
      ) {
        document_filename = document.value.c1aDocument.citizenDocument.document_filename;
        documentToGet = document.value.c1aDocument.citizenDocument.document_binary_url;
        uid = this.getUID(documentToGet);
        break;
      } else {
        if (
          element === 'c7' &&
          document.value?.c7Document?.partyName === req.session.applicationSettings?.docToView.partyName
        ) {
          document_filename = document.value.c7Document.citizenDocument.document_filename;
          documentToGet = document.value.c7Document.citizenDocument.document_binary_url;
          uid = this.getUID(documentToGet);
          break;
        }
      }
    }
    return { uid, document_filename };
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
        if (
          (flag === DownloadFileFieldFlag.IS_APPLICATION_VIEWED && cvIsApplicationViewed === YesOrNo.YES) ||
          (flag === DownloadFileFieldFlag.IS_ALLEGATION_OF_HARM_VIEWED && cvIsAllegationOfHarmViewed === YesOrNo.YES)
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
        if (
          (flag === DownloadFileFieldFlag.IS_APPLICATION_VIEWED && cvIsApplicationViewed === YesOrNo.YES) ||
          (flag === DownloadFileFieldFlag.IS_ALLEGATION_OF_HARM_VIEWED && cvIsAllegationOfHarmViewed === YesOrNo.YES)
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

  private setRedirectUrl(partyType: PartyType, req: AppRequest<Partial<CaseWithId>>) {
    const { documentCategory = '', documentType = '' } = req.query;

    return applyParms(partyType === PartyType.APPLICANT ? APPLICANT_UPLOAD_DOCUMENT : RESPONDENT_UPLOAD_DOCUMENT, {
      docCategory: documentCategory,
      doctype: documentType,
    });
  }

  private async initializeData(caseData: Partial<CaseWithId>): Promise<void> {
    if (!caseData?.applicantUploadFiles) {
      caseData['applicantUploadFiles'] = [];
    }

    if (!caseData.respondentUploadFiles) {
      caseData['respondentUploadFiles'] = [];
    }
  }

  private handleError(req: AppRequest, error: FormError) {
    if (!req.session?.errors) {
      req.session.errors = [];
      req.session.errors.push({ errorType: error.errorType, propertyName: error.propertyName });
    }
  }
  public async generateDocument(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { query, session, body } = req;
    const { user, userCase: caseData } = session;
    const partyType = getCasePartyType(caseData, user.id);
    const redirectUrl = this.setRedirectUrl(partyType, req);

    req.url = redirectUrl;
    this.initializeData(caseData);

    const client = new CosApiClient(user.accessToken, 'http://localhost:3001');
    try {
      const response = await client.generateStatementDocument(user, {
        caseId: caseData.id,
        categoryId: getDocumentType(query.documentType as DocType, partyType),
        partyId: user.id,
        partyName: getPartyName(caseData, partyType, user),
        partyType,
        restrictDocumentDetails: caseData.reasonForDocumentCantBeShared ?? ('' as string),
        freeTextStatements: body.textStatement as string,
      });

      if (response.status === 'Success') {
        req.session.userCase?.[
          partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles'
        ]?.push(response.document);

        const caseDetailsFromCos = await client.retrieveByCaseId(caseData.id, user);

        Object.assign(req.session.userCase, caseDetailsFromCos);
        const caseDataFromCos = this.notifyBannerForNewDcoumentUploaded(req, caseData.id, client, user);
        Object.assign(req.session.userCase, caseDataFromCos);
        req.session.errors = [];
      } else {
        this.handleError(req, { errorType: 'uploadError', propertyName: 'uploadFiles' });
      }
    } catch (e) {
      this.handleError(req, { errorType: 'uploadError', propertyName: 'uploadFiles' });
    } finally {
      this.redirect(req, res, redirectUrl);
    }
  }

  public async uploadDocument(req: AppRequest, res: Response): Promise<void> {
    const { query, body, session, files } = req;
    const { user, userCase: caseData } = session;
    const partyType = getCasePartyType(caseData, user.id);
    const client = new CosApiClient(user.accessToken, 'http://localhost:3001');
    const redirectUrl = this.setRedirectUrl(partyType, req);

    req.url = redirectUrl;
    this.initializeData(caseData);

    if (!files) {
      this.handleError(req, { errorType: 'noFile', propertyName: 'uploadFiles' });
      return this.redirect(req, res, redirectUrl);
    }

    const fields = typeof this.fields === 'function' ? this.fields(caseData) : this.fields;
    const form = new Form(fields);

    const { _csrf, ...formData } = form.getParsedBody(body);
    req.session.errors = form.getErrors(formData);

    try {
      const response = await client.uploadStatementDocument(user, {
        caseId: caseData.id,
        categoryId: getDocumentType(query.documentType as DocType, partyType),
        partyId: user.id,
        partyName: getPartyName(caseData, partyType, user),
        partyType,
        restrictDocumentDetails: caseData.reasonForDocumentCantBeShared ?? ('' as string),
        files: [files['files[]']],
      });

      if (response.status === 'Success') {
        req.session.userCase?.[
          partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles'
        ]?.push(response.document);

        const caseDetailsFromCos = await client.retrieveByCaseId(caseData.id, user);

        Object.assign(req.session.userCase, caseDetailsFromCos);
        const caseDataFromCos = this.notifyBannerForNewDcoumentUploaded(req, caseData.id, client, user);
        Object.assign(req.session.userCase, caseDataFromCos);
        req.session.errors = [];
      } else {
        this.handleError(req, { errorType: 'uploadError', propertyName: 'uploadFiles' });
      }
    } catch (e) {
      this.handleError(req, { errorType: 'uploadError', propertyName: 'uploadFiles' });
    } finally {
      this.redirect(req, res, redirectUrl);
    }
  }

  public async deleteDocument(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const { params, session } = req;
    const { user, userCase: caseData } = session;
    const partyType = getCasePartyType(caseData, user.id);
    const client = new CosApiClient(user.accessToken, 'http://localhost:3001');
    const redirectUrl = this.setRedirectUrl(partyType, req);

    req.url = redirectUrl;
    try {
      await client.deleteCitizenStatementDocument(user, params.documentId);
      const uploadedFiles =
        caseData?.[partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles'];

      req.session.userCase[partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles'] =
        uploadedFiles?.filter(
          document => params.documentId !== document.document_url.substring(document.document_url.lastIndexOf('/') + 1)
        );
      if (
        req.session.userCase[partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles']
          ?.length === 0
      ) {
        delete req.session.userCase[
          partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles'
        ];
      }
      req.session.errors = [];
    } catch (e) {
      this.handleError(req, { errorType: 'uploadError', propertyName: 'uploadFiles' });
    } finally {
      this.redirect(req, res, redirectUrl);
    }
  }

  private resetUploadSessionData(session: AppSession): void {
    delete session.userCase.start;
    session.userCase.applicantUploadFiles = [];
    session.userCase.respondentUploadFiles = [];
    delete session.userCase.reasonForDocumentCantBeShared;
    delete session.userCase.declarationCheck;
  }

  public redirectToCaseView(req: AppRequest<AnyObject>, res: Response): void {
    const { user, userCase: caseData } = req.session;
    const partyType = getCasePartyType(caseData, user.id);
    let redirectUrl;

    this.resetUploadSessionData(req.session);

    if (partyType === PartyType.APPLICANT) {
      if (caseData.caseTypeOfApplication === CaseType.C100) {
        redirectUrl = C100_APPLICANT_TASKLIST;
      } else {
        redirectUrl = APPLICANT_TASK_LIST_URL;
      }
    } else {
      redirectUrl = RESPONDENT_TASK_LIST_URL;
    }

    this.redirect(req, res, redirectUrl);
  }

  public redirectToUploadDocument(req: AppRequest<AnyObject>, res: Response): void {
    const { user, userCase: caseData } = req.session;
    const partyType = getCasePartyType(caseData, user.id);

    this.resetUploadSessionData(req.session);
    this.redirect(
      req,
      res,
      partyType === PartyType.APPLICANT ? APPLICANT_UPLOAD_DOCUMENT_LIST_URL : RESPONDENT_UPLOAD_DOCUMENT_LIST_URL
    );
  }
}
