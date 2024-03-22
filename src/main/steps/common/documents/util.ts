import dayjs from 'dayjs';
import _ from 'lodash';
import { Response } from 'express';

import { CaseWithId } from '../../../app/case/case';
import { PartyType } from '../../../app/case/definition';
import { CITIZEN_DOWNLOAD_UPLOADED_DOCS, UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS, VIEW_DOCUMENTS } from '../../urls';
import { interpolate } from '../string-parser';
import { applyParms } from '../url-parser';

import {
  CitizenDocuments,
  Document,
  DocumentCategory,
  ViewDocumentDetails,
  DocumentLabelCategory,
  DocumentSectionId,
  DocumentTypes,
  UploadDocumentSectionId,
  ViewDocumentsCategoryListProps,
  ViewDocumentsSectionId,
  UploadDocumentCategory,
} from './definitions';
import { uploadDocumentSections, viewDocumentsCategoryListConfig } from './config';
import { en, cy } from './common/content';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { FormError } from '../../../app/form/Form';

export const isOrdersFromTheCourtPresent = (caseData: CaseWithId): boolean =>
  !!(caseData && caseData?.citizenOrders?.length);

export const hasAnyDocumentForPartyType = (partyType: PartyType, caseData: CaseWithId): boolean =>
  !!(caseData && caseData?.citizenDocuments?.length
    ? caseData.citizenDocuments.find(document => document.partyType === partyType)
    : false);

export const getDocumentSectionTitle = (
  documentSectionId: DocumentSectionId,
  documentSectionTitles: Record<DocumentSectionId, string>
): string => _.get(documentSectionTitles, documentSectionId, '');

const getViewDocumentLinkMeta = (
  document: CitizenDocuments,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType
): ViewDocumentDetails['link'] => {
  const documentConfig = getDocumentConfig(document.categoryId);
  const linkMeta = {
    text: '',
    url: '',
    openInAnotherTab: false,
  };
  const urlParams = {
    partyType: loggedInUserPartyType,
    documentPartyType: document.partyType,
    documentCategory: document.categoryId,
  };

  if (
    [
      DocumentCategory.POSITION_STATEMENTS,
      DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
      DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
    ].includes(document.categoryId)
  ) {
    Object.assign(urlParams, { documentPartyId: document.partyId });
  }

  return documentConfig
    ? Object.assign(linkMeta, {
        text: documentConfig ? documentConfig.documentCategoryLabel(documentCategoryLabels, document.uploadedBy) : '',
        url: applyParms(VIEW_DOCUMENTS, urlParams),
        openInAnotherTab: false,
      })
    : linkMeta;
};

export const getDocumentCategoryLabel = (
  documentLabelId: DocumentLabelCategory,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  uploadedPartyName?: string
): string => {
  let documentLabel = _.get(documentCategoryLabels, documentLabelId, '');

  switch (documentLabelId) {
    case DocumentLabelCategory.POSITION_STATEMENTS:
    case DocumentLabelCategory.WITNESS_STATEMENTS:
      {
        documentLabel = interpolate(documentLabel, { partyName: uploadedPartyName ?? '' });
      }
      break;
  }

  return documentLabel;
};

const filterAndGroupPartyDocuments = (
  partyType: PartyType,
  documents: CaseWithId['citizenDocuments']
): CaseWithId['citizenDocuments'] | [] => {
  const groupedDocuments: CaseWithId['citizenDocuments'] = [];

  if (documents && documents.length) {
    documents
      .filter(document => document.partyType === partyType)
      .forEach(document => {
        if (
          [
            DocumentCategory.POSITION_STATEMENTS,
            DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
            DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
          ].includes(document.categoryId) &&
          !groupedDocuments.find(groupedDoc => groupedDoc.partyId === document.partyId)
        ) {
          groupedDocuments.push(document);
        } else {
          if (!groupedDocuments.find(groupedDoc => groupedDoc.categoryId === document.categoryId)) {
            groupedDocuments.push(document);
          }
        }
      });
  }

  return groupedDocuments;
};

const getViewDocumentCategoryDetails = (
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType,
  document: CitizenDocuments
): ViewDocumentDetails => ({
  categoryId: document.categoryId,
  link: getViewDocumentLinkMeta(document, documentCategoryLabels, loggedInUserPartyType),
});

export const getViewDocumentCategoryList = (
  documentSectionId: ViewDocumentsSectionId | UploadDocumentSectionId,
  caseData: CaseWithId,
  documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
  loggedInUserPartyType: PartyType
): ViewDocumentDetails[] | [] => {
  let documents: ViewDocumentDetails[] | [] = [];

  switch (documentSectionId) {
    case ViewDocumentsSectionId.APPLICANTS_DOCUMENT:
      {
        documents = filterAndGroupPartyDocuments(PartyType.APPLICANT, caseData?.citizenDocuments)!.map(
          getViewDocumentCategoryDetails.bind(null, documentCategoryLabels, loggedInUserPartyType)
        );
      }
      break;
    case ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS:
      {
        documents = filterAndGroupPartyDocuments(PartyType.RESPONDENT, caseData?.citizenDocuments)!.map(
          getViewDocumentCategoryDetails.bind(null, documentCategoryLabels, loggedInUserPartyType)
        );
      }
      break;
    default:
      break;
  }

  return documents;
};

const filterDocumentsByPartyIdAndCategory = (
  documentPartyId: CitizenDocuments['partyId'],
  documentCategoryId: DocumentCategory,
  documents: CaseWithId['citizenDocuments']
): CaseWithId['citizenDocuments'] => {
  return documents && documents.length
    ? documents.filter(document => document.partyId === documentPartyId && document.categoryId === documentCategoryId)
    : [];
};

const filterDocumentsByPartyTypeAndCategory = (
  documentPartyType: CitizenDocuments['partyType'],
  documentCategoryId: DocumentCategory,
  documents: CaseWithId['citizenDocuments']
): CaseWithId['citizenDocuments'] => {
  return documents && documents.length
    ? documents.filter(
        document => document.categoryId === documentCategoryId && document.partyType === documentPartyType
      )
    : [];
};

export const getDocuments = (
  documentCategoryId: DocumentCategory,
  documents: CaseWithId['citizenDocuments'],
  documentPartyType: CitizenDocuments['partyType'],
  documentPartyId?: CitizenDocuments['partyId']
): Document[] => {
  const filteredDocs =
    documentPartyId &&
    [
      DocumentCategory.POSITION_STATEMENTS,
      DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
      DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
    ].includes(documentCategoryId)
      ? filterDocumentsByPartyIdAndCategory(documentPartyId, documentCategoryId, documents)
      : filterDocumentsByPartyTypeAndCategory(documentPartyType, documentCategoryId, documents);
  const docs: Document[] = [];

  if (filteredDocs && filteredDocs.length) {
    filteredDocs.forEach(doc => {
      let documentId = doc.document.document_url.substring(doc.document.document_url.lastIndexOf('/') + 1);
      const document: Document = {
        [DocumentTypes.ENGLISH]: {
          documentId,
          documentName: doc.document.document_filename,
          createdDate: dayjs(doc.document.document_creation_date).format('DD MMM YYYY'),
          uploadedBy: doc.uploadedBy,
          downloadLink: `${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/${documentId}`,
        },
      };

      if (doc.documentWelsh) {
        documentId = doc.documentWelsh.document_url.substring(doc.document.document_url.lastIndexOf('/') + 1);
        Object.assign(document, {
          [DocumentTypes.WELSH]: {
            documentId,
            documentName: doc.documentWelsh.document_filename,
            createdDate: dayjs(doc.documentWelsh.document_creation_date).format('DD MMM YYYY'),
            uploadedBy: doc.uploadedBy,
            downloadLink: `${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/${documentId}`,
          },
        });
      }

      docs.push(document);
    });
  }

  return docs;
};

export const getDocumentConfig = (documentCategory: DocumentCategory): ViewDocumentsCategoryListProps | undefined =>
  viewDocumentsCategoryListConfig.find(section => section.categoryId === documentCategory);

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
      ? config.documentCategoryList
          .find(category => category.categoryId === categoryId)
          ?.documentCategoryLabel(documentCategoryLabels) ?? ''
      : '',
  };
};

/** Upload documents related utilty */

export const deleteDocument = async (req: AppRequest, res: Response): Promise<void> => {
  const { query, session } = req;
  const { user: userDetails, userCase: caseData } = session;
  const partyType = getCasePartyType(caseData, userDetails.id);
  const client = new CosApiClient(userDetails.accessToken, '/');
  const uploadedFilesDataReference = getUploadedFilesDataReference(partyType);

  try {
    await client.deleteCitizenStatementDocument(query.documentId as string, userDetails);

    if (req.session.userCase && req.session.userCase.hasOwnProperty(uploadedFilesDataReference)) {
      req.session.userCase[uploadedFilesDataReference] = caseData?.[uploadedFilesDataReference]?.filter(
        document => query.documentId !== document.document_url.substring(document.document_url.lastIndexOf('/') + 1)
      );

      if (req.session.userCase?.[uploadedFilesDataReference]?.length === 0) {
        delete req.session.userCase[uploadedFilesDataReference];
      }
    }

    req.session.errors = removeUploadDocErrors(req.session.errors);
  } catch (e) {
    req.session.errors = handleError(req.session.errors, 'donwloadError', true);
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
