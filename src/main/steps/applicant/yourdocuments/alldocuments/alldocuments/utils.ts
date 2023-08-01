import { PartyType, UploadDocumentList, YesOrNo } from '../../../../../app/case/definition';
import {
  documents_list_items_cy,
  documents_list_items_en,
} from '../../../../../steps/applicant/upload-document/upload-document-list-items';
import { CITIZEN_DOWNLOAD_UPLOADED_DOCS } from '../../../../../steps/urls';
import {
  applicant_tasklist_items_all_docs_cy,
  applicant_tasklist_items_all_docs_en,
} from '../alldocuments/tasklist-items-all-documents';

enum documentTypes {
  POSITION_STATEMENT = 'positionstatements',
  WITNESS_STATEMENTS = 'yourwitnessstatements',
  LETTERS_FROM_SCHOOL = 'lettersfromschool',
  DIGITAL_DOWNLOADS = 'digitaldownloads',
  MEDICAL_RECORDS = 'medicalrecords',
  PATERNITY_TEST_REPORTS = 'paternity_test_reports',
  DRUG_ALCOHOL_TESTS = 'drug_alcohol_tests',
  POLICE_REPORTS = 'police_disclosures',
  WITNESS_AVAILABILITY = 'witness_availability',
  TENANCY_AND_MORTGAGE_AVAILABILITY = 'tenancy_and_mortgage_availability',
  MEDICAL_REPORTS = 'medicalreports',
  OTHER_DOCUMENTS = 'otherDocuments',
  PREVIOUS_ORDERS = 'previousorders',
  OTHER_PEOPLE_WITNESS_STATEMENTS = 'otherpeoplewitnessstatement',
}

export const getDocumentListItemEn = (docType: string): string => {
  let documentListItem;

  switch (docType) {
    case documentTypes.POSITION_STATEMENT:
      documentListItem = documents_list_items_en.your_position_statements;
      break;
    case documentTypes.WITNESS_STATEMENTS:
      documentListItem = documents_list_items_en.your_witness_statements;
      break;
    case documentTypes.LETTERS_FROM_SCHOOL:
      documentListItem = documents_list_items_en.letters_from_school;
      break;
    case documentTypes.DIGITAL_DOWNLOADS:
      documentListItem = documents_list_items_en.mail_screenshots_media_files;
      break;
    case documentTypes.MEDICAL_RECORDS:
      documentListItem = documents_list_items_en.medical_records;
      break;
    case documentTypes.PATERNITY_TEST_REPORTS:
      documentListItem = documents_list_items_en.paternity_test_reports;
      break;
    case documentTypes.DRUG_ALCOHOL_TESTS:
      documentListItem = documents_list_items_en.drug_and_alcohol_tests;
      break;
    case documentTypes.POLICE_REPORTS:
      documentListItem = documents_list_items_en.police_reports;
      break;
    case documentTypes.WITNESS_AVAILABILITY:
      documentListItem = applicant_tasklist_items_all_docs_en.witness_availability;
      break;
    case documentTypes.TENANCY_AND_MORTGAGE_AVAILABILITY:
      documentListItem = documents_list_items_en.tenancy_mortgage_agreements;
      break;
    case documentTypes.MEDICAL_REPORTS:
      documentListItem = documents_list_items_en.medical_reports;
      break;
    case documentTypes.OTHER_DOCUMENTS:
      documentListItem = documents_list_items_en.other_documents;
      break;
    case documentTypes.PREVIOUS_ORDERS:
      documentListItem = documents_list_items_en.previous_orders_submitted;
      break;
    case documentTypes.OTHER_PEOPLE_WITNESS_STATEMENTS:
      documentListItem = documents_list_items_en.other_witness_statements;
      break;
  }

  return documentListItem;
};

export const getDocumentListItemCy = (docType: string): string => {
  let documentListItem;

  switch (docType) {
    case documentTypes.POSITION_STATEMENT:
      documentListItem = documents_list_items_cy.your_position_statements;
      break;
    case documentTypes.WITNESS_STATEMENTS:
      documentListItem = documents_list_items_cy.your_witness_statements;
      break;
    case documentTypes.LETTERS_FROM_SCHOOL:
      documentListItem = documents_list_items_cy.letters_from_school;
      break;
    case documentTypes.DIGITAL_DOWNLOADS:
      documentListItem = documents_list_items_cy.mail_screenshots_media_files;
      break;
    case documentTypes.MEDICAL_RECORDS:
      documentListItem = documents_list_items_cy.medical_records;
      break;
    case documentTypes.PATERNITY_TEST_REPORTS:
      documentListItem = documents_list_items_cy.paternity_test_reports;
      break;
    case documentTypes.DRUG_ALCOHOL_TESTS:
      documentListItem = documents_list_items_cy.drug_and_alcohol_tests;
      break;
    case documentTypes.POLICE_REPORTS:
      documentListItem = documents_list_items_cy.police_reports;
      break;
    case documentTypes.WITNESS_AVAILABILITY:
      documentListItem = applicant_tasklist_items_all_docs_cy.witness_availability;
      break;
    case documentTypes.TENANCY_AND_MORTGAGE_AVAILABILITY:
      documentListItem = documents_list_items_cy.tenancy_mortgage_agreements;
      break;
    case documentTypes.MEDICAL_REPORTS:
      documentListItem = documents_list_items_cy.medical_reports;
      break;
    case documentTypes.OTHER_DOCUMENTS:
      documentListItem = documents_list_items_cy.other_documents;
      break;
    case documentTypes.PREVIOUS_ORDERS:
      documentListItem = documents_list_items_cy.previous_orders_submitted;
      break;
    case documentTypes.OTHER_PEOPLE_WITNESS_STATEMENTS:
      documentListItem = documents_list_items_cy.other_witness_statements;
      break;
  }

  return documentListItem;
};

export const getDocumentList = (
  citizenUploadedDocumentList: UploadDocumentList[] | undefined,
  docType: string,
  uploadedBy: string,
  partyName?: string
): object[] => {
  const orders: object[] = [];

  for (const doc of citizenUploadedDocumentList || []) {
    const docPartyType = doc.value.isApplicant === YesOrNo.YES ? PartyType.APPLICANT : PartyType.RESPONDENT;

    if (docType === documentTypes.POSITION_STATEMENT || docType === documentTypes.WITNESS_STATEMENTS) {
      if (doc.value.partyName !== partyName) {
        continue;
      }
    }

    if (
      uploadedBy === docPartyType &&
      (doc.value.documentType === getDocumentListItemEn(docType) ||
        doc.value.documentType === getDocumentListItemCy(docType))
    ) {
      const uid = doc.value.citizenDocument.document_url.substring(
        doc.value.citizenDocument.document_url.lastIndexOf('/') + 1
      );
      orders.push({
        href: `${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/${uid}`,
        createdDate: doc.value.documentDetails.documentUploadedDate,
        fileName: doc.value.citizenDocument.document_filename,
      });
    }
  }

  return orders;
};
