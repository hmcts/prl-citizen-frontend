import { CaseWithId } from '../../../app/case/case';
import { PartyType } from '../../../app/case/definition';

import {
  CitizenDocuments,
  DocumentCategory,
  DocumentLabelCategory,
  DocumentSectionId,
  UploadDocumentCategory,
  UploadDocumentSectionId,
  UploadDocumentSectionsProps,
  ViewDocumentsCategoryListProps,
  ViewDocumentsSectionId,
  ViewDocumentsSectionsProps,
} from './definitions';
import {
  getDocumentCategoryLabel,
  getDocumentSectionTitle,
  getDocuments,
  getViewDocumentCategoryList,
  hasAnyDocumentForPartyType,
  isOrdersFromTheCourtPresent,
} from './util';

export const viewDocumentsSections: ViewDocumentsSectionsProps[] = [
  {
    sectionId: ViewDocumentsSectionId.ORDERS_FROM_THE_COURT,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.ORDERS_FROM_THE_COURT, documentSectionTitles),
    documentCategoryList: () => [],
    isVisible: isOrdersFromTheCourtPresent,
    displayOrder: () => 1,
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
    displayOrder: (partyType: PartyType) => (partyType === PartyType.APPLICANT ? 2 : 3),
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
    displayOrder: (partyType: PartyType) => (partyType === PartyType.RESPONDENT ? 2 : 3),
  },
  {
    sectionId: ViewDocumentsSectionId.ATTENDING_THE_HEARING,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(ViewDocumentsSectionId.ATTENDING_THE_HEARING, documentSectionTitles),
    documentCategoryList: () => [],
    isVisible: () => false,
    displayOrder: () => 4,
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

export const uploadDocumentSections: UploadDocumentSectionsProps[] = [
  {
    sectionId: UploadDocumentSectionId.WITNESS_STATEMENTS_AND_EVIDENCE,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(UploadDocumentSectionId.WITNESS_STATEMENTS_AND_EVIDENCE, documentSectionTitles),
    documentCategoryList: [
      {
        categoryId: UploadDocumentCategory.POSITION_STATEMENTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.POSITION_STATEMENTS, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.WITNESS_STATEMENTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.WITNESS_STATEMENTS, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.OTHER_PEOPLE_WITNESS_STATEMENTS, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.EMAIL_IMAGES_MEDIA,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.EMAIL_IMAGES_MEDIA, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.MEDICAL_RECORDS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.MEDICAL_RECORDS, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.LETTERS_FROM_SCHOOL,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.LETTERS_FROM_SCHOOL, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.TENANCY_AND_MORTGAGE_AGREEMENTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.TENANCY_AND_MORTGAGE_AGREEMENTS, documentCategoryLabels),
      },
    ],
  },
  {
    sectionId: UploadDocumentSectionId.APPLICATIONS,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(UploadDocumentSectionId.APPLICATIONS, documentSectionTitles),
    documentCategoryList: [
      {
        categoryId: UploadDocumentCategory.PREVIOUS_ORDERS_SUBMITTED,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.PREVIOUS_ORDERS_SUBMITTED, documentCategoryLabels),
      },
    ],
  },
  {
    sectionId: UploadDocumentSectionId.EXPERT_REPORTS,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(UploadDocumentSectionId.EXPERT_REPORTS, documentSectionTitles),
    documentCategoryList: [
      {
        categoryId: UploadDocumentCategory.MEDICAL_REPORTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.MEDICAL_REPORTS, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.PATERNITY_TEST_REPORTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.PATERNITY_TEST_REPORTS, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.DRUG_ALCOHOL_TESTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.DRUG_ALCOHOL_TESTS, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.POLICE_REPORTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.POLICE_REPORTS, documentCategoryLabels),
      },
    ],
  },
  {
    sectionId: UploadDocumentSectionId.OTHER_DOCUMENTS,
    sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) =>
      getDocumentSectionTitle(UploadDocumentSectionId.OTHER_DOCUMENTS, documentSectionTitles),
    documentCategoryList: [
      {
        categoryId: UploadDocumentCategory.OTHER_DOCUMENTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.OTHER_DOCUMENTS, documentCategoryLabels),
      },
    ],
  },
];
