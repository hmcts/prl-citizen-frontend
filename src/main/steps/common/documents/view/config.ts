import { CaseWithId } from '../../../../app/case/case';
import { PartyType } from '../../../../app/case/definition';
import {
  CitizenDocuments,
  DocumentCategory,
  DocumentLabelCategory,
  DocumentSectionId,
  ViewDocumentsCategoryListProps,
  ViewDocumentsSectionId,
  ViewDocumentsSectionsProps,
} from '../definitions';

import {
  getApplicationPacksCategoryList,
  getDocumentCategoryLabel,
  getDocumentSectionTitle,
  getDocuments,
  getViewDocumentCategoryList,
  hasAnyDocumentForPartyType,
  hasApplicationPacks,
  hasOrders,
} from './utils';

export const viewDocumentsSections: ViewDocumentsSectionsProps[] = [
  {
    sectionId: ViewDocumentsSectionId.APPLICATION_PACKS,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.APPLICATION_PACKS, documentSectionTitles),
    documentCategoryList: (
      caseData: CaseWithId,
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      loggedInUserPartyType: PartyType
    ) => getApplicationPacksCategoryList(caseData, documentCategoryLabels, loggedInUserPartyType),
    isVisible: hasApplicationPacks,
    displayOrder: () => 1,
  },
  {
    sectionId: ViewDocumentsSectionId.ORDERS_FROM_THE_COURT,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.ORDERS_FROM_THE_COURT, documentSectionTitles),
    documentCategoryList: () => [],
    isVisible: hasOrders,
    displayOrder: () => 2,
  },
  {
    sectionId: ViewDocumentsSectionId.APPLICANTS_DOCUMENT,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.APPLICANTS_DOCUMENT, documentSectionTitles),
    documentCategoryList: (
      caseData: CaseWithId,
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      loggedInUserPartyType: PartyType
    ) =>
      getViewDocumentCategoryList(
        ViewDocumentsSectionId.APPLICANTS_DOCUMENT,
        caseData,
        documentCategoryLabels,
        loggedInUserPartyType
      ),
    isVisible: (caseData: CaseWithId) => hasAnyDocumentForPartyType(PartyType.APPLICANT, caseData),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.APPLICANT ? 3 : 4),
  },
  {
    sectionId: ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS, documentSectionTitles),
    documentCategoryList: (
      caseData: CaseWithId,
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      loggedInUserPartyType: PartyType
    ) =>
      getViewDocumentCategoryList(
        ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS,
        caseData,
        documentCategoryLabels,
        loggedInUserPartyType
      ),
    isVisible: (caseData: CaseWithId) => hasAnyDocumentForPartyType(PartyType.RESPONDENT, caseData),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.RESPONDENT ? 3 : 4),
  },
  {
    sectionId: ViewDocumentsSectionId.ATTENDING_THE_HEARING,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.ATTENDING_THE_HEARING, documentSectionTitles),
    documentCategoryList: () => [],
    isVisible: () => false,
    displayOrder: () => 5,
  },
];

export const viewDocumentsCategoryListConfig: ViewDocumentsCategoryListProps[] = [
  {
    categoryId: DocumentCategory.POSITION_STATEMENTS,
    documentCategoryLabel: (
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      uploadedPartyName?: string
    ) => getDocumentCategoryLabel(DocumentLabelCategory.POSITION_STATEMENTS, documentCategoryLabels, uploadedPartyName),
    documents: (
      documents: CaseWithId['citizenDocuments'],
      documentPartyType: CitizenDocuments['partyType'],
      documentPartyId?: CitizenDocuments['partyId']
    ) => getDocuments(DocumentCategory.POSITION_STATEMENTS, documents, documentPartyType, documentPartyId),
  },
  {
    categoryId: DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
    documentCategoryLabel: (
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      uploadedPartyName?: string
    ) => getDocumentCategoryLabel(DocumentLabelCategory.WITNESS_STATEMENTS, documentCategoryLabels, uploadedPartyName),
    documents: (
      documents: CaseWithId['citizenDocuments'],
      documentPartyType: CitizenDocuments['partyType'],
      documentPartyId?: CitizenDocuments['partyId']
    ) => getDocuments(DocumentCategory.APPLICANT_WITNESS_STATEMENTS, documents, documentPartyType, documentPartyId),
  },
  {
    categoryId: DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
    documentCategoryLabel: (
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      uploadedPartyName?: string
    ) => getDocumentCategoryLabel(DocumentLabelCategory.WITNESS_STATEMENTS, documentCategoryLabels, uploadedPartyName),
    documents: (
      documents: CaseWithId['citizenDocuments'],
      documentPartyType: CitizenDocuments['partyType'],
      documentPartyId?: CitizenDocuments['partyId']
    ) => getDocuments(DocumentCategory.RESPONDENT_WITNESS_STATEMENTS, documents, documentPartyType, documentPartyId),
  },
  {
    categoryId: DocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS,
    documentCategoryLabel: (
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      uploadedPartyName?: string
    ) =>
      getDocumentCategoryLabel(
        DocumentLabelCategory.OTHER_PEOPLE_WITNESS_STATEMENTS,
        documentCategoryLabels,
        uploadedPartyName
      ),
    documents: (
      documents: CaseWithId['citizenDocuments'],
      documentPartyType: CitizenDocuments['partyType'],
      documentPartyId?: CitizenDocuments['partyId']
    ) => getDocuments(DocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS, documents, documentPartyType, documentPartyId),
  },
  {
    categoryId: DocumentCategory.MEDICAL_RECORDS,
    documentCategoryLabel: (
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      uploadedPartyName?: string
    ) => getDocumentCategoryLabel(DocumentLabelCategory.MEDICAL_RECORDS, documentCategoryLabels, uploadedPartyName),
    documents: (
      documents: CaseWithId['citizenDocuments'],
      documentPartyType: CitizenDocuments['partyType'],
      documentPartyId?: CitizenDocuments['partyId']
    ) => getDocuments(DocumentCategory.MEDICAL_RECORDS, documents, documentPartyType, documentPartyId),
  },
  {
    categoryId: DocumentCategory.MEDICAL_REPORTS,
    documentCategoryLabel: (
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      uploadedPartyName?: string
    ) => getDocumentCategoryLabel(DocumentLabelCategory.MEDICAL_REPORTS, documentCategoryLabels, uploadedPartyName),
    documents: (
      documents: CaseWithId['citizenDocuments'],
      documentPartyType: CitizenDocuments['partyType'],
      documentPartyId?: CitizenDocuments['partyId']
    ) => getDocuments(DocumentCategory.MEDICAL_REPORTS, documents, documentPartyType, documentPartyId),
  },
  {
    categoryId: DocumentCategory.DNA_REPORTS,
    documentCategoryLabel: (
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      uploadedPartyName?: string
    ) => getDocumentCategoryLabel(DocumentLabelCategory.DNA_REPORTS, documentCategoryLabels, uploadedPartyName),
    documents: (
      documents: CaseWithId['citizenDocuments'],
      documentPartyType: CitizenDocuments['partyType'],
      documentPartyId?: CitizenDocuments['partyId']
    ) => getDocuments(DocumentCategory.DNA_REPORTS, documents, documentPartyType, documentPartyId),
  },
  {
    categoryId: DocumentCategory.DRUG_ALCOHOL_TESTS,
    documentCategoryLabel: (
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      uploadedPartyName?: string
    ) => getDocumentCategoryLabel(DocumentLabelCategory.DRUG_ALCOHOL_TESTS, documentCategoryLabels, uploadedPartyName),
    documents: (
      documents: CaseWithId['citizenDocuments'],
      documentPartyType: CitizenDocuments['partyType'],
      documentPartyId?: CitizenDocuments['partyId']
    ) => getDocuments(DocumentCategory.DRUG_ALCOHOL_TESTS, documents, documentPartyType, documentPartyId),
  },
  {
    categoryId: DocumentCategory.POLICE_REPORTS,
    documentCategoryLabel: (
      documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
      uploadedPartyName?: string
    ) => getDocumentCategoryLabel(DocumentLabelCategory.POLICE_REPORTS, documentCategoryLabels, uploadedPartyName),
    documents: (
      documents: CaseWithId['citizenDocuments'],
      documentPartyType: CitizenDocuments['partyType'],
      documentPartyId?: CitizenDocuments['partyId']
    ) => getDocuments(DocumentCategory.POLICE_REPORTS, documents, documentPartyType, documentPartyId),
  },
];
