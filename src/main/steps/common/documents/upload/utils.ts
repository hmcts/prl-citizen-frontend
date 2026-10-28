import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { FormError } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS } from '../../../urls';
import { applyParms } from '../../url-parser';
import { cy, en } from '../common/content';
import {
  DocumentLabelCategory,
  DocumentSectionId,
  UploadDocumentAPICategory,
  UploadDocumentCategory,
} from '../definitions';
import { uploadDocumentSections } from '../upload/config';

/** Upload documents related utilty */

export const isXhr = (req: AppRequest): boolean => {
  if (!req.headers) {
    return false;
  }
  const fetchMode = req.headers['sec-fetch-mode'];
  if (fetchMode === 'cors' || fetchMode === 'no-cors') {
    return true;
  }
  return (
    req.headers['sec-fetch-dest'] === 'empty' || (!!req.headers.accept && !req.headers.accept.includes('text/html'))
  );
};

export const getUploadDocumentCategoryDetails = (
  language: string,
  categoryId: UploadDocumentCategory
): { sectionTitle: string; categoryLabel: string } => {
  const isEn = language === 'en';
  const config = uploadDocumentSections.find(section =>
    section.documentCategoryList.find(category => category.categoryId === categoryId)
  );
  const documentSectionTitles = (isEn ? en : cy).uploadDocuments.documentSectionTitles as Record<
    DocumentSectionId,
    string
  >;
  const documentCategoryLabels = (isEn ? en : cy).uploadDocuments.documentCategoryLabels as Record<
    Partial<DocumentLabelCategory>,
    string
  >;

  return {
    sectionTitle: config ? config.sectionTitle(documentSectionTitles) : '',
    categoryLabel: config
      ? (config.documentCategoryList
          .find(category => category.categoryId === categoryId)
          ?.documentCategoryLabel(documentCategoryLabels) ?? '')
      : '',
  };
};

export const getDocumentIdFromUrl = (documentUrl: string): string => {
  return documentUrl.substring(documentUrl.lastIndexOf('/') + 1);
};

export const isDocumentInSession = (documentId: string, documents: { document_url: string }[] | undefined): boolean => {
  return !!documents?.some(document => getDocumentIdFromUrl(document.document_url) === documentId);
};

export const removeDocumentFromSession = (
  req: AppRequest,
  caseData: Partial<CaseWithId>,
  uploadedFilesDataReference: string,
  documentId: string
): void => {
  if (req.session.userCase.hasOwnProperty(uploadedFilesDataReference)) {
    req.session.userCase[uploadedFilesDataReference] = caseData?.[uploadedFilesDataReference]?.filter(
      document => documentId !== getDocumentIdFromUrl(document.document_url)
    );

    if (req.session.userCase?.[uploadedFilesDataReference]?.length === 0) {
      delete req.session?.applicationSettings?.isDocumentGeneratedAndUplaoded;
      delete req.session.userCase[uploadedFilesDataReference];
    }
  }

  req.session.errors = removeUploadDocErrors(req.session.errors);
};

export const deleteDocument = async (req: AppRequest, res: Response): Promise<void> => {
  const { query, session } = req;
  const { user: userDetails, userCase: caseData } = session;
  const partyType = getCasePartyType(caseData, userDetails.id);
  const client = new CosApiClient(userDetails.accessToken, req.locals.logger);
  const uploadedFilesDataReference = getUploadedFilesDataReference(partyType);
  const documentId = query.documentId as string;

  if (!isDocumentInSession(documentId, caseData?.[uploadedFilesDataReference])) {
    req.session.errors = handleError(req.session.errors, 'deleteError', true);
    req.session.save(() => {
      res.redirect(
        applyParms(UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS, {
          partyType,
          docCategory: req.params.docCategory,
        })
      );
    });
    return;
  }

  try {
    await client.deleteDocument(documentId);

    removeDocumentFromSession(req, caseData, uploadedFilesDataReference, documentId);
  } catch (e) {
    console.log(e);
    req.session.errors = handleError(req.session.errors, 'deleteError', true);
  } finally {
    req.session.save(() => {
      res.redirect(
        applyParms(UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS, {
          partyType,
          docCategory: req.params.docCategory,
        })
      );
    });
  }
};

export const getUploadedFilesDataReference = (partyType: PartyType): string => {
  return partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles';
};

export const removeUploadDocErrors = (errors: FormError[] | undefined): FormError[] => {
  return errors?.length ? errors.filter(error => error.propertyName !== 'uploadDocumentFileUpload') : [];
};

export const handleError = (
  errors: FormError[] | undefined,
  errorType: string,
  omitOtherErrors?: boolean
): FormError[] => {
  let _errors: FormError[] = errors?.length ? errors : [];

  if (omitOtherErrors) {
    _errors = [...removeUploadDocErrors(_errors)];
  }

  return [..._errors, { errorType, propertyName: 'uploadDocumentFileUpload' }];
};

export const resetUploadDocumentSessionData = (req: AppRequest): void => {
  delete req.session.userCase.hasCourtAskedForThisDoc;
  delete req.session.userCase.reasonForDocumentCantBeShared;
  delete req.session.userCase.haveReasonForDocNotToBeShared;
  req.session.userCase.reasonsToNotSeeTheDocument = [];
  delete req.session.userCase.reasonsToRestrictDocument;
  req.session.userCase.applicantUploadFiles = [];
  req.session.userCase.respondentUploadFiles = [];
  delete req.session.userCase.declarationCheck;
  delete req.session?.applicationSettings?.isDocumentGeneratedAndUplaoded;
};

const sessionQueues = new Map<string, Promise<void>>();

// Runs upload/delete of files one request at a time per session to prevent data loss
export const runSynchronous = async <T>(
  req: AppRequest<T>,
  res: Response,
  task: () => Promise<void>
): Promise<void> => {
  const key = req.sessionID;
  const previous: Promise<void> = sessionQueues.get(key) ?? Promise.resolve();

  let release!: () => void;
  const current = new Promise<void>(resolve => {
    release = resolve;
  });
  const tail = previous.then(() => current);
  sessionQueues.set(key, tail);

  const canListen = typeof res.once === 'function';
  if (canListen) {
    res.once('close', release);
  }

  try {
    await previous;
    await new Promise<void>((resolve, reject) => req.session.reload(err => (err ? reject(err) : resolve())));
    await task();
  } catch (error) {
    console.log(error);
    release();
    if (!res.headersSent) {
      res.status(500).json({ error: { message: 'uploadError' } });
    }
  } finally {
    if (!canListen) {
      release();
    }
    void tail.then(() => {
      if (sessionQueues.get(key) === tail) {
        sessionQueues.delete(key);
      }
    });
  }
};

export interface ResponseHandlers {
  redirect: (nextUrl?: string) => void;
  respondJson: (body: object, nextUrl?: string) => void;
}

export const getDocumentCategory = (
  docCategory: UploadDocumentCategory,
  partyType: PartyType
): UploadDocumentAPICategory => {
  let documentCategory;

  switch (docCategory) {
    case UploadDocumentCategory.POSITION_STATEMENTS:
      documentCategory = UploadDocumentAPICategory.POSITION_STATEMENTS;
      break;
    case UploadDocumentCategory.WITNESS_STATEMENTS:
      documentCategory =
        partyType === PartyType.APPLICANT
          ? UploadDocumentAPICategory.APPLICANT_WITNESS_STATEMENTS
          : UploadDocumentAPICategory.RESPONDENT_WITNESS_STATEMENTS;
      break;
    case UploadDocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS:
      documentCategory = UploadDocumentAPICategory.OTHER_PEOPLE_WITNESS_STATEMENTS;
      break;
    case UploadDocumentCategory.MEDICAL_RECORDS:
      documentCategory = UploadDocumentAPICategory.MEDICAL_RECORDS;
      break;
    case UploadDocumentCategory.MEDICAL_REPORTS:
      documentCategory = UploadDocumentAPICategory.MEDICAL_REPORTS;
      break;
    case UploadDocumentCategory.EMAIL_IMAGES_MEDIA:
      documentCategory = UploadDocumentAPICategory.EMAIL_IMAGES_MEDIA;
      break;
    case UploadDocumentCategory.LETTERS_FROM_SCHOOL:
      documentCategory = UploadDocumentAPICategory.LETTERS_FROM_SCHOOL;
      break;
    case UploadDocumentCategory.TENANCY_AND_MORTGAGE_AGREEMENTS:
      documentCategory = UploadDocumentAPICategory.TENANCY_AND_MORTGAGE_AGREEMENTS;
      break;
    case UploadDocumentCategory.PREVIOUS_ORDERS_SUBMITTED:
      documentCategory =
        partyType === PartyType.APPLICANT
          ? UploadDocumentAPICategory.PREVIOUS_ORDERS_SUBMITTED_APPLICANT
          : UploadDocumentAPICategory.PREVIOUS_ORDERS_SUBMITTED_RESPONDENT;
      break;
    case UploadDocumentCategory.PATERNITY_TEST_REPORTS:
      documentCategory = UploadDocumentAPICategory.PATERNITY_TEST_REPORTS;
      break;
    case UploadDocumentCategory.DRUG_ALCOHOL_TESTS:
      documentCategory = UploadDocumentAPICategory.DRUG_ALCOHOL_TESTS;
      break;
    case UploadDocumentCategory.POLICE_REPORTS:
      documentCategory = UploadDocumentAPICategory.POLICE_REPORTS;
      break;
    case UploadDocumentCategory.FM5_DOCUMENT:
      documentCategory = UploadDocumentAPICategory.FM5_DOCUMENT;
      break;
    case UploadDocumentCategory.OTHER_DOCUMENTS:
      documentCategory = UploadDocumentAPICategory.OTHER_DOCUMENTS;
      break;
  }

  return documentCategory;
};

export const setRedirectUrl = (partyType: PartyType, req: AppRequest<Partial<CaseWithId>>): string => {
  return applyParms(UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS, {
    partyType,
    docCategory: req.params.docCategory,
  });
};

export const initializeData = (caseData: Partial<CaseWithId>): void => {
  if (!caseData?.applicantUploadFiles) {
    caseData['applicantUploadFiles'] = [];
  }

  if (!caseData.respondentUploadFiles) {
    caseData['respondentUploadFiles'] = [];
  }
};

export const getEmptyFileErrorType = (docCategory: UploadDocumentCategory): string => {
  return [UploadDocumentCategory.POSITION_STATEMENTS, UploadDocumentCategory.WITNESS_STATEMENTS].includes(docCategory)
    ? 'noStatementOrFile'
    : 'noFile';
};

// Document categories that use single file upload instead of multi file upload
export const SINGLE_FILE_UPLOAD_CATEGORIES: UploadDocumentCategory[] = [UploadDocumentCategory.FM5_DOCUMENT];

export const isSingleFileUpload = (docCategory: UploadDocumentCategory): boolean =>
  SINGLE_FILE_UPLOAD_CATEGORIES.includes(docCategory);

export const getUploadFileFieldName = (docCategory: UploadDocumentCategory): string =>
  isSingleFileUpload(docCategory) ? 'uploadDocumentFileUpload' : 'documents';
