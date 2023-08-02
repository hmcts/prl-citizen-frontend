import { DocCategory, DocType } from '../../../app/case/definition';
import { document_list_cy, document_list_en } from '../../../steps/applicant/upload-document/section-titles';
import {
  documents_list_items_cy,
  documents_list_items_en,
} from '../../../steps/applicant/upload-document/upload-document-list-items';

interface DocumentMeta {
  category: string;
  type: string;
}


const getPositionStatementsDocInfo = (type: DocType, documentCategory: Record<string, string>, documentType: Record<string, string>): DocumentMeta => {
  const docInfo = {
    category: '',
    type: ''
  };

  switch (type) {
    case DocType.POSITION_STATEMENTS: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.your_position_statements
      })
      break;
    }
    case DocType.YOUR_WITNESS_STATEMENTS: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.your_witness_statements
      })
      break;
    }
    case DocType.OTHER_PEOPLE_WITNESS_STATEMENTS: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.other_witness_statements
      })
      break;
    }
    case DocType.MEDIA_FILES: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.mail_screenshots_media_files
      })
      break;
    } case DocType.MEDICAL_RECORDS: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.medical_records
      })
      break;
    } case DocType.LETTERS_FROM_SCHOOL: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.letters_from_school
      })
      break;
    } case DocType.TENANCY_AND_MORTGAGE_AVAILABILITY: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.tenancy_mortgage_agreements
      })
      break;
    }
    default: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
      })
      break;
    }
  }

  return docInfo;
}

const getExpertReportsDocInfo = (type: DocType, documentCategory: Record<string, string>, documentType: Record<string, string>): DocumentMeta => {
  const docInfo = {
    category: '',
    type: ''
  };

  switch (type) {
    case DocType.MEDICAL_REPORTS: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
        type: documentType.medical_reports
      })
      break;
    }
    case DocType.PATERNITY_TEST_REPORTS: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
        type: documentType.paternity_test_reports
      })
      break;
    }
    case DocType.DRUG_ALCOHOL_TESTS: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
        type: documentType.drug_and_alcohol_tests
      })
      break;
    }
    case DocType.POLICE_REPORTS: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
        type: documentType.police_reports
      })
      break;
    }
    default: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
      })
      break;
    }
  }

  return docInfo;
}

export const getDocumentMeta = (category: DocCategory, type: DocType, language: string): DocumentMeta => {
  const meta = {
    category: '',
    type: '',
  };
  const documentCategory = language === 'en' ? document_list_en : document_list_cy;
  const documentType = language === 'en' ? documents_list_items_en : documents_list_items_cy;

  switch (category) {
    case DocCategory.WITNESS_STATEMENT:
      {
        Object.assign(meta, { ...getPositionStatementsDocInfo(type, documentCategory, documentType) });
        break;
      }
    case DocCategory.APPLICATIONS: {
      if (type === DocType.PREVIOUS_ORDERS) {
        Object.assign(meta, {
          category: documentCategory.applications,
          type: documentType.previous_orders_submitted,
        });
      } else {
        Object.assign(meta, {
          category: documentCategory.applications,
        });
      }
      break;
    }
    case DocCategory.EXPERT_REPORTS: {
      Object.assign(meta, { ...getExpertReportsDocInfo(type, documentCategory, documentType) });
      break;
    }
    case DocCategory.OTHER_DOCUMENTS: {
      if (type === DocType.OTHER_DOCUMENTS) {
        Object.assign(meta, {
          category: documentCategory.other_documents,
          type: documentType.other_documents,
        });
      } else {
        Object.assign(meta, {
          category: documentCategory.other_documents,
        });
      }
      break;
    }
  }

  return meta;
};
