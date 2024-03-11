import { CaseWithId } from '../../../app/case/case';
import { DocCategory, DocType, PartyType, YesOrNo } from '../../../app/case/definition';
import { AppSession } from '../../../app/controller/AppRequest';
import { document_list_cy, document_list_en } from '../../../steps/applicant/upload-document/section-titles';
import {
  documents_list_items_cy,
  documents_list_items_en,
} from '../../../steps/applicant/upload-document/upload-document-list-items';

interface DocumentMeta {
  category: DocCategory;
  type: DocType;
}

const getPositionStatementsDocInfo = (
  type: DocType,
  documentCategory: Record<string, string>,
  documentType: Record<string, string>
): DocumentMeta => {
  const docInfo = {
    category: '',
    type: '',
  };

  switch (type) {
    case DocType.POSITION_STATEMENTS: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.your_position_statements,
      });
      break;
    }
    case DocType.YOUR_WITNESS_STATEMENTS: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.your_witness_statements,
      });
      break;
    }
    case DocType.OTHER_PEOPLE_WITNESS_STATEMENTS: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.other_witness_statements,
      });
      break;
    }
    case DocType.MEDIA_FILES: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.mail_screenshots_media_files,
      });
      break;
    }
    case DocType.MEDICAL_RECORDS: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.medical_records,
      });
      break;
    }
    case DocType.LETTERS_FROM_SCHOOL: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.letters_from_school,
      });
      break;
    }
    case DocType.TENANCY_AND_MORTGAGE_AVAILABILITY: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
        type: documentType.tenancy_mortgage_agreements,
      });
      break;
    }
    default: {
      Object.assign(docInfo, {
        category: documentCategory.witness_statements_and_evidence,
      });
      break;
    }
  }

  return docInfo as DocumentMeta;
};

const getExpertReportsDocInfo = (
  type: DocType,
  documentCategory: Record<string, string>,
  documentType: Record<string, string>
): DocumentMeta => {
  const docInfo = {
    category: '',
    type: '',
  };

  switch (type) {
    case DocType.MEDICAL_REPORTS: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
        type: documentType.medical_reports,
      });
      break;
    }
    case DocType.PATERNITY_TEST_REPORTS: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
        type: documentType.paternity_test_reports,
      });
      break;
    }
    case DocType.DRUG_ALCOHOL_TESTS: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
        type: documentType.drug_and_alcohol_tests,
      });
      break;
    }
    case DocType.POLICE_REPORTS: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
        type: documentType.police_reports,
      });
      break;
    }
    default: {
      Object.assign(docInfo, {
        category: documentCategory.expert_reports,
      });
      break;
    }
  }

  return docInfo as DocumentMeta;
};

export const getDocumentMeta = (category: DocCategory, type: DocType, language: string): DocumentMeta => {
  const meta = {
    category: '',
    type: '',
  };
  const documentCategory = language === 'en' ? document_list_en : document_list_cy;
  const documentType = language === 'en' ? documents_list_items_en : documents_list_items_cy;

  switch (category) {
    case DocCategory.WITNESS_STATEMENT: {
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

  return meta as DocumentMeta;
};

export const getDocumentType = (type: DocType, partyType: PartyType): string => {
  let documentType;

  switch (type) {
    case DocType.POSITION_STATEMENTS:
      documentType = 'POSITION_STATEMENTS';
      break;
    case DocType.YOUR_WITNESS_STATEMENTS:
      documentType =
        partyType === PartyType.APPLICANT ? 'WITNESS_STATEMENTS_APPLICANT' : 'WITNESS_STATEMENTS_RESPONDENT';
      break;
    case DocType.OTHER_PEOPLE_WITNESS_STATEMENTS:
      documentType = 'OTHER_WITNESS_STATEMENTS';
      break;
    case DocType.MEDICAL_RECORDS:
      documentType = 'MEDICAL_RECORDS';
      break;
    case DocType.MEDICAL_REPORTS:
      documentType = 'MEDICAL_REPORTS';
      break;
    case DocType.MEDIA_FILES:
      documentType = 'MAIL_SCREENSHOTS_MEDIA_FILES';
      break;
    case DocType.LETTERS_FROM_SCHOOL:
      documentType = 'LETTERS_FROM_SCHOOL';
      break;
    case DocType.TENANCY_AND_MORTGAGE_AVAILABILITY:
      documentType = 'TENANCY_MORTGAGE_AGREEMENTS';
      break;
    case DocType.PREVIOUS_ORDERS:
      documentType =
        partyType === PartyType.APPLICANT
          ? 'PREVIOUS_ORDERS_SUBMITTED_APPLICANT'
          : 'PREVIOUS_ORDERS_SUBMITTED_RESPONDENT';
      break;
    case DocType.PATERNITY_TEST_REPORTS:
      documentType = 'PATERNITY_TEST_REPORTS';
      break;
    case DocType.DRUG_ALCOHOL_TESTS:
      documentType = 'DRUG_AND_ALCOHOL_TESTS';
      break;
    case DocType.POLICE_REPORTS:
      documentType = 'POLICE_REPORTS';
      break;
    case DocType.OTHER_DOCUMENTS:
      documentType = 'OTHER_DOCUMENTS';
      break;
  }

  return documentType;
};

export const resetUploadDocumentSessionData = (session: AppSession): void => {
  delete session.userCase.hasCourtAskedForThisDoc;
  delete session.userCase.reasonForDocumentCantBeShared;
  delete session.userCase.haveReasonForDocNotToBeShared;
  session.userCase.reasonsToNotSeeTheDocument = [];
  delete session.userCase.reasonsToRestrictDocument;
  session.userCase.applicantUploadFiles = [];
  session.userCase.respondentUploadFiles = [];
  delete session.userCase.declarationCheck;
};

export const isConfidentialDoc = (caseData: Partial<CaseWithId>): YesOrNo => {
  return caseData?.haveReasonForDocNotToBeShared === YesOrNo.YES &&
    caseData?.reasonsToNotSeeTheDocument?.includes('hasConfidentailDetails')
    ? YesOrNo.YES
    : YesOrNo.NO;
};

export const isRestrictedDoc = (caseData: Partial<CaseWithId>): YesOrNo => {
  return caseData?.haveReasonForDocNotToBeShared === YesOrNo.YES &&
    caseData?.reasonsToNotSeeTheDocument?.includes('containsSentsitiveInformation')
    ? YesOrNo.YES
    : YesOrNo.NO;
};
