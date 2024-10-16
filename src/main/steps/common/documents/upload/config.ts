import {
  DocumentLabelCategory,
  DocumentSectionId,
  UploadDocumentCategory,
  UploadDocumentSectionId,
  UploadDocumentSectionsProps,
} from '../definitions';
import { getDocumentCategoryLabel, getDocumentSectionTitle } from '../view/utils';

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
        categoryId: UploadDocumentCategory.SUBMIT_AWP_APPLICATION,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.SUBMIT_AWP_APPLICATION, documentCategoryLabels),
      },
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
        categoryId: UploadDocumentCategory.FM5_DOCUMENT,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.FM5_DOCUMENT, documentCategoryLabels),
      },
      {
        categoryId: UploadDocumentCategory.OTHER_DOCUMENTS,
        documentCategoryLabel: (documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>) =>
          getDocumentCategoryLabel(DocumentLabelCategory.OTHER_DOCUMENTS, documentCategoryLabels),
      },
    ],
  },
];
