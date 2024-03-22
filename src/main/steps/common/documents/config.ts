import { PartyType } from '../../../app/case/definition';

import {
  DocumentCategory,
  DocumentLabelCategory,
  UploadDocumentCategory,
  UploadDocumentSectionId,
  UploadDocumentSectionsProps,
  ViewDocumentsCategoryListProps,
  ViewDocumentsSectionId,
  ViewDocumentsSectionsProps,
} from './definitions';
import {
  getDocumentCategoryLabel,
  getViewDocumentCategoryList,
  getDocumentSectionTitle,
  getDocuments,
  hasAnyDocumentForPartyType,
  isOrdersFromTheCourtPresent,
} from './util';

export const viewDocumentsSections: ViewDocumentsSectionsProps[] = [
  {
    sectionId: ViewDocumentsSectionId.ORDERS_FROM_THE_COURT,
    sectionTitle: getDocumentSectionTitle.bind(null, ViewDocumentsSectionId.ORDERS_FROM_THE_COURT),
    documentCategoryList: () => [],
    isVisible: isOrdersFromTheCourtPresent,
    displayOrder: () => 1,
  },
  {
    sectionId: ViewDocumentsSectionId.APPLICANTS_DOCUMENT,
    sectionTitle: getDocumentSectionTitle.bind(null, ViewDocumentsSectionId.APPLICANTS_DOCUMENT),
    documentCategoryList: getViewDocumentCategoryList.bind(null, ViewDocumentsSectionId.APPLICANTS_DOCUMENT),
    isVisible: hasAnyDocumentForPartyType.bind(null, PartyType.APPLICANT),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.APPLICANT ? 2 : 3),
  },
  {
    sectionId: ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS,
    sectionTitle: getDocumentSectionTitle.bind(null, ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS),
    documentCategoryList: getViewDocumentCategoryList.bind(null, ViewDocumentsSectionId.RESPONDENTS_DOCUMENTS),
    isVisible: hasAnyDocumentForPartyType.bind(null, PartyType.RESPONDENT),
    displayOrder: (partyType: PartyType) => (partyType === PartyType.RESPONDENT ? 2 : 3),
  },
  {
    sectionId: ViewDocumentsSectionId.ATTENDING_THE_HEARING,
    sectionTitle: getDocumentSectionTitle.bind(null, ViewDocumentsSectionId.ATTENDING_THE_HEARING),
    documentCategoryList: () => [],
    isVisible: () => false,
    displayOrder: () => 4,
  },
];

export const viewDocumentsCategoryListConfig: ViewDocumentsCategoryListProps[] = [
  {
    categoryId: DocumentCategory.POSITION_STATEMENTS,
    documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.POSITION_STATEMENTS),
    documents: getDocuments.bind(null, DocumentCategory.POSITION_STATEMENTS),
  },
  {
    categoryId: DocumentCategory.APPLICANT_WITNESS_STATEMENTS,
    documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.WITNESS_STATEMENTS),
    documents: getDocuments.bind(null, DocumentCategory.APPLICANT_WITNESS_STATEMENTS),
  },
  {
    categoryId: DocumentCategory.RESPONDENT_WITNESS_STATEMENTS,
    documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.WITNESS_STATEMENTS),
    documents: getDocuments.bind(null, DocumentCategory.RESPONDENT_WITNESS_STATEMENTS),
  },
  {
    categoryId: DocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS,
    documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.OTHER_PEOPLE_WITNESS_STATEMENTS),
    documents: getDocuments.bind(null, DocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS),
  },
  {
    categoryId: DocumentCategory.MEDICAL_RECORDS,
    documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.MEDICAL_RECORDS),
    documents: getDocuments.bind(null, DocumentCategory.MEDICAL_RECORDS),
  },
  {
    categoryId: DocumentCategory.MEDICAL_REPORTS,
    documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.MEDICAL_REPORTS),
    documents: getDocuments.bind(null, DocumentCategory.MEDICAL_REPORTS),
  },
  {
    categoryId: DocumentCategory.DNA_REPORTS,
    documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.DNA_REPORTS),
    documents: getDocuments.bind(null, DocumentCategory.DNA_REPORTS),
  },
  {
    categoryId: DocumentCategory.DRUG_ALCOHOL_TESTS,
    documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.DRUG_ALCOHOL_TESTS),
    documents: getDocuments.bind(null, DocumentCategory.DRUG_ALCOHOL_TESTS),
  },
  {
    categoryId: DocumentCategory.POLICE_REPORTS,
    documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.POLICE_REPORTS),
    documents: getDocuments.bind(null, DocumentCategory.POLICE_REPORTS),
  },
];

export const uploadDocumentSections: UploadDocumentSectionsProps[] = [
  {
    sectionId: UploadDocumentSectionId.WITNESS_STATEMENTS_AND_EVIDENCE,
    sectionTitle: getDocumentSectionTitle.bind(null, UploadDocumentSectionId.WITNESS_STATEMENTS_AND_EVIDENCE),
    documentCategoryList: [
      {
        categoryId: UploadDocumentCategory.POSITION_STATEMENTS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.POSITION_STATEMENTS),
      },
      {
        categoryId: UploadDocumentCategory.WITNESS_STATEMENTS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.WITNESS_STATEMENTS),
      },
      {
        categoryId: UploadDocumentCategory.OTHER_PEOPLE_WITNESS_STATEMENTS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.OTHER_PEOPLE_WITNESS_STATEMENTS),
      },
      {
        categoryId: UploadDocumentCategory.EMAIL_IMAGES_MEDIA,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.EMAIL_IMAGES_MEDIA),
      },
      {
        categoryId: UploadDocumentCategory.MEDICAL_RECORDS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.MEDICAL_RECORDS),
      },
      {
        categoryId: UploadDocumentCategory.LETTERS_FROM_SCHOOL,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.LETTERS_FROM_SCHOOL),
      },
      {
        categoryId: UploadDocumentCategory.TENANCY_AND_MORTGAGE_AGREEMENTS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.TENANCY_AND_MORTGAGE_AGREEMENTS),
      },
    ],
  },
  {
    sectionId: UploadDocumentSectionId.APPLICATIONS,
    sectionTitle: getDocumentSectionTitle.bind(null, UploadDocumentSectionId.APPLICATIONS),
    documentCategoryList: [
      {
        categoryId: UploadDocumentCategory.PREVIOUS_ORDERS_SUBMITTED,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.PREVIOUS_ORDERS_SUBMITTED),
      },
    ],
  },
  {
    sectionId: UploadDocumentSectionId.EXPERT_REPORTS,
    sectionTitle: getDocumentSectionTitle.bind(null, UploadDocumentSectionId.EXPERT_REPORTS),
    documentCategoryList: [
      {
        categoryId: UploadDocumentCategory.MEDICAL_REPORTS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.MEDICAL_REPORTS),
      },
      {
        categoryId: UploadDocumentCategory.PATERNITY_TEST_REPORTS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.PATERNITY_TEST_REPORTS),
      },
      {
        categoryId: UploadDocumentCategory.DRUG_ALCOHOL_TESTS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.DRUG_ALCOHOL_TESTS),
      },
      {
        categoryId: UploadDocumentCategory.POLICE_REPORTS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.POLICE_REPORTS),
      },
    ],
  },
  {
    sectionId: UploadDocumentSectionId.OTHER_DOCUMENTS,
    sectionTitle: getDocumentSectionTitle.bind(null, UploadDocumentSectionId.OTHER_DOCUMENTS),
    documentCategoryList: [
      {
        categoryId: UploadDocumentCategory.OTHER_DOCUMENTS,
        documentCategoryLabel: getDocumentCategoryLabel.bind(null, DocumentLabelCategory.OTHER_DOCUMENTS),
      },
    ],
  },
];
