import { PartyType } from '../../../app/case/definition';

import {
  DocumentCategory,
  DocumentLabelCategory,
  DocumentSectionId,
  DocumentSectionsProps,
  DocumentsListConfigProps,
} from './definitions';
import {
  getDocumentLabel,
  getDocumentSectionTitle,
  getDocuments,
  getDocumentsList,
  hasAnyDocumentForPartyType,
  isOrdersFromTheCourtPresent,
} from './util';

export const documentSections: DocumentSectionsProps[] = [
  {
    documentSectionId: DocumentSectionId.ORDERS_FROM_THE_COURT,
    documentSectionTitle: getDocumentSectionTitle.bind(null, DocumentSectionId.ORDERS_FROM_THE_COURT),
    displayOrder: () => 1,
    isVisible: isOrdersFromTheCourtPresent,
    documentsList: () => [],
  },
  {
    documentSectionId: DocumentSectionId.APPLICANTS_DOCUMENT,
    documentSectionTitle: getDocumentSectionTitle.bind(null, DocumentSectionId.APPLICANTS_DOCUMENT),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.APPLICANT ? 2 : 3),
    isVisible: hasAnyDocumentForPartyType.bind(null, PartyType.APPLICANT),
    documentsList: getDocumentsList.bind(null, DocumentSectionId.APPLICANTS_DOCUMENT),
  },
  {
    documentSectionId: DocumentSectionId.RESPONDENTS_DOCUMENTS,
    documentSectionTitle: getDocumentSectionTitle.bind(null, DocumentSectionId.RESPONDENTS_DOCUMENTS),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.RESPONDENT ? 2 : 3),
    isVisible: hasAnyDocumentForPartyType.bind(null, PartyType.RESPONDENT),
    documentsList: getDocumentsList.bind(null, DocumentSectionId.RESPONDENTS_DOCUMENTS),
  },
  {
    documentSectionId: DocumentSectionId.ATTENDING_THE_HEARING,
    documentSectionTitle: getDocumentSectionTitle.bind(null, DocumentSectionId.ATTENDING_THE_HEARING),
    displayOrder: () => 6,
    isVisible: () => false,
    documentsList: () => [],
  },
];

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
