import { DocCategory, DocType } from "../../../app/case/definition";
import { document_list_en, document_list_cy } from '../../../steps/applicant/upload-document/section-titles';
import { documents_list_items_en, documents_list_items_cy } from '../../../steps/applicant/upload-document/upload-document-list-items';

interface DocumentMeta {
  category: string;
  type: string;
}

export const getDocumentMeta = (category: DocCategory, type: DocType, language: string): DocumentMeta => {
  const meta = {
    category: '',
    type: ''
  };
  const documentCategory = language === 'en' ? document_list_en : document_list_cy;
  const documentType = language === 'en' ? documents_list_items_en : documents_list_items_cy;

  switch (category) {
    case DocCategory.WITNESS_STATEMENT:
      {
        if (type === DocType.POSITION_STATEMENTS) {
          Object.assign(meta, {
            category: documentCategory.witness_statements_and_evidence,
            type: documentType.your_position_statements
          })
        } else if (type === DocType.YOUR_WITNESS_STATEMENTS) {
          Object.assign(meta, {
            category: documentCategory.witness_statements_and_evidence,
            type: documentType.your_witness_statements
          })
        } else if (type === DocType.OTHER_PEOPLE_WITNESS_STATEMENTS) {
          Object.assign(meta, {
            category: documentCategory.witness_statements_and_evidence,
            type: documentType.other_witness_statements
          })
        } else if (type === DocType.MEDIA_FILES) {
          Object.assign(meta, {
            category: documentCategory.witness_statements_and_evidence,
            type: documentType.mail_screenshots_media_files
          })
        } else if (type === DocType.MEDICAL_RECORDS) {
          Object.assign(meta, {
            category: documentCategory.witness_statements_and_evidence,
            type: documentType.medical_records
          })
        } else if (type === DocType.LETTERS_FROM_SCHOOL) {
          Object.assign(meta, {
            category: documentCategory.witness_statements_and_evidence,
            type: documentType.letters_from_school
          })
        } else if (type === DocType.TENANCY_AND_MORTGAGE_AVAILABILITY) {
          Object.assign(meta, {
            category: documentCategory.witness_statements_and_evidence,
            type: documentType.tenancy_mortgage_agreements
          })
        } else {
          Object.assign(meta, {
            category: documentCategory.witness_statements_and_evidence,
          })
        }
        break;
      }
    case DocCategory.APPLICATIONS:
      {
        if (type === DocType.PREVIOUS_ORDERS) {
          Object.assign(meta, {
            category: documentCategory.applications,
            type: documentType.previous_orders_submitted
          })
        } else {
          Object.assign(meta, {
            category: documentCategory.applications,
          })
        }
        break;
      }
    case DocCategory.EXPERT_REPORTS:
      {
        if (type === DocType.MEDICAL_REPORTS) {
          Object.assign(meta, {
            category: documentCategory.expert_reports,
            type: documentType.medical_reports
          })
        } else if (type === DocType.PATERNITY_TEST_REPORTS) {
          Object.assign(meta, {
            category: documentCategory.expert_reports,
            type: documentType.paternity_test_reports
          })
        } else if (type === DocType.DRUG_ALCOHOL_TESTS) {
          Object.assign(meta, {
            category: documentCategory.expert_reports,
            type: documentType.drug_and_alcohol_tests
          })
        } else if (type === DocType.POLICE_REPORTS) {
          Object.assign(meta, {
            category: documentCategory.expert_reports,
            type: documentType.police_reports
          })
        } else {
          Object.assign(meta, {
            category: documentCategory.expert_reports,
          })
        }
        break;
      }
    case DocCategory.OTHER_DOCUMENTS:
      {
        if (type === DocType.OTHER_DOCUMENTS) {
          Object.assign(meta, {
            category: documentCategory.other_documents,
            type: documentType.other_documents
          })
        } else {
          Object.assign(meta, {
            category: documentCategory.other_documents,
          })
        }
        break;
      }
  }

  return meta;
}