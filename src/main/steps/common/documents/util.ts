import dayjs from 'dayjs';
import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import { PartyType } from '../../../app/case/definition';
import { CITIZEN_DOWNLOAD_UPLOADED_DOCS, VIEW_DOCUMENTS } from '../../urls';
import { interpolate } from '../string-parser';
import { applyParms } from '../url-parser';

import {
  CitizenDocuments,
  Document,
  DocumentCategory,
  DocumentDetails,
  DocumentLabelCategory,
  DocumentSectionId,
  DocumentTypes,
  DocumentsListConfigProps,
} from './definitions';

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

const getDocumentLinkMeta = (
  document: CitizenDocuments,
  loggedInPartyType: PartyType,
  documentCategoryLabels: Record<DocumentLabelCategory, string>
): DocumentDetails['link'] => {
  const documentConfig = getDocumentConfig(document.categoryId);
  const linkMeta = {
    text: '',
    url: '',
    openInAnotherTab: false,
  };
  const urlParams = {
    partyType: loggedInPartyType,
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
        text: documentConfig ? documentConfig.documentLabel(document.uploadedBy, documentCategoryLabels) : '',
        url: applyParms(VIEW_DOCUMENTS, urlParams),
        openInAnotherTab: false,
      })
    : linkMeta;
};

export const getDocumentLabel = (
  documentLabelId: DocumentLabelCategory,
  uploadedPartyName: CitizenDocuments['uploadedBy'],
  documentCategoryLabels: Record<DocumentLabelCategory, string>
): DocumentDetails['link']['text'] => {
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

const getDocumentDetails = (
  loggedInPartyType: PartyType,
  documentCategoryLabels: Record<DocumentLabelCategory, string>,
  document: CitizenDocuments
): DocumentDetails => ({
  categoryId: document.categoryId,
  link: getDocumentLinkMeta(document, loggedInPartyType, documentCategoryLabels),
});

export const getDocumentsList = (
  documentSectionId: DocumentSectionId,
  loggedInPartyType: PartyType,
  caseData: CaseWithId,
  documentCategoryLabels: Record<DocumentLabelCategory, string>
): DocumentDetails[] | [] => {
  let documents: DocumentDetails[] | [] = [];

  switch (documentSectionId) {
    case DocumentSectionId.APPLICANTS_DOCUMENT:
      {
        documents = filterAndGroupPartyDocuments(PartyType.APPLICANT, caseData?.citizenDocuments)!.map(
          getDocumentDetails.bind(null, loggedInPartyType, documentCategoryLabels)
        );
      }
      break;
    case DocumentSectionId.RESPONDENTS_DOCUMENTS:
      {
        documents = filterAndGroupPartyDocuments(PartyType.RESPONDENT, caseData?.citizenDocuments)!.map(
          getDocumentDetails.bind(null, loggedInPartyType, documentCategoryLabels)
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

export const getDocumentConfig = (documentCategory: DocumentCategory): DocumentsListConfigProps | undefined =>
  documentsListConfig.find(documentConfig => documentConfig.documentCategoryId === documentCategory);

// Moved here as getting error with bind being undefined when importing from config file
export const documentsListConfig: DocumentsListConfigProps[] = [
  {
    documentCategoryId: DocumentCategory.POSITION_STATEMENTS,
    documentLabel: getDocumentLabel.bind(null, DocumentLabelCategory.POSITION_STATEMENTS),
    documentsList: getDocuments.bind(null, DocumentCategory.POSITION_STATEMENTS),
  },
  {
    documentCategoryId: DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
    documentLabel: getDocumentLabel.bind(null, DocumentLabelCategory.WITNESS_STATEMENTS),
    documentsList: getDocuments.bind(null, DocumentCategory.APPLICANT_WITNESS_STATEMENTS),
  },
  {
    documentCategoryId: DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
    documentLabel: getDocumentLabel.bind(null, DocumentLabelCategory.WITNESS_STATEMENTS),
    documentsList: getDocuments.bind(null, DocumentCategory.RESPONDENT_WITNESS_STATEMENTS),
  },
  {
    documentCategoryId: DocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS,
    documentLabel: getDocumentLabel.bind(null, DocumentLabelCategory.OTHER_PEOPLE_WITNESS_STATEMENTS),
    documentsList: getDocuments.bind(null, DocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS),
  },
  {
    documentCategoryId: DocumentCategory.MEDICAL_RECORDS,
    documentLabel: getDocumentLabel.bind(null, DocumentLabelCategory.MEDICAL_RECORDS),
    documentsList: getDocuments.bind(null, DocumentCategory.MEDICAL_RECORDS),
  },
  {
    documentCategoryId: DocumentCategory.MEDICAL_REPORTS,
    documentLabel: getDocumentLabel.bind(null, DocumentLabelCategory.MEDICAL_REPORTS),
    documentsList: getDocuments.bind(null, DocumentCategory.MEDICAL_REPORTS),
  },
  {
    documentCategoryId: DocumentCategory.DNA_REPORTS,
    documentLabel: getDocumentLabel.bind(null, DocumentLabelCategory.DNA_REPORTS),
    documentsList: getDocuments.bind(null, DocumentCategory.DNA_REPORTS),
  },
  {
    documentCategoryId: DocumentCategory.DRUG_ALCOHOL_TESTS,
    documentLabel: getDocumentLabel.bind(null, DocumentLabelCategory.DRUG_ALCOHOL_TESTS),
    documentsList: getDocuments.bind(null, DocumentCategory.DRUG_ALCOHOL_TESTS),
  },
  {
    documentCategoryId: DocumentCategory.POLICE_REPORTS,
    documentLabel: getDocumentLabel.bind(null, DocumentLabelCategory.POLICE_REPORTS),
    documentsList: getDocuments.bind(null, DocumentCategory.POLICE_REPORTS),
  },
];
