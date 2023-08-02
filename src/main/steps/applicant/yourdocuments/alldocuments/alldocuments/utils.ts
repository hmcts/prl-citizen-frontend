import { DocType, PartyType, UploadDocumentList, YesOrNo } from '../../../../../app/case/definition';
import { documents_list_items_en } from '../../../../../steps/applicant/upload-document/upload-document-list-items';
import { CITIZEN_DOWNLOAD_UPLOADED_DOCS } from '../../../../../steps/urls';
import { applicant_tasklist_items_all_docs_en } from '../alldocuments/tasklist-items-all-documents';

export const getDocumentListItem = (docType: string): string => {
  let documentListItem;

  switch (docType) {
    case DocType.POSITION_STATEMENTS:
      documentListItem = documents_list_items_en.your_position_statements;
      break;
    case DocType.YOUR_WITNESS_STATEMENTS:
      documentListItem = documents_list_items_en.your_witness_statements;
      break;
    case DocType.LETTERS_FROM_SCHOOL:
      documentListItem = documents_list_items_en.letters_from_school;
      break;
    case DocType.DIGITAL_DOWNLOADS:
      documentListItem = documents_list_items_en.mail_screenshots_media_files;
      break;
    case DocType.MEDICAL_RECORDS:
      documentListItem = documents_list_items_en.medical_records;
      break;
    case DocType.PATERNITY_TEST_REPORTS:
      documentListItem = documents_list_items_en.paternity_test_reports;
      break;
    case DocType.DRUG_ALCOHOL_TESTS:
      documentListItem = documents_list_items_en.drug_and_alcohol_tests;
      break;
    case DocType.POLICE_REPORTS:
      documentListItem = documents_list_items_en.police_reports;
      break;
    case DocType.WITNESS_AVAILABILITY:
      documentListItem = applicant_tasklist_items_all_docs_en.witness_availability;
      break;
    case DocType.TENANCY_AND_MORTGAGE_AVAILABILITY:
      documentListItem = documents_list_items_en.tenancy_mortgage_agreements;
      break;
    case DocType.MEDICAL_REPORTS:
      documentListItem = documents_list_items_en.medical_reports;
      break;
    case DocType.OTHER_DOCUMENTS:
      documentListItem = documents_list_items_en.other_documents;
      break;
    case DocType.PREVIOUS_ORDERS:
      documentListItem = documents_list_items_en.previous_orders_submitted;
      break;
    case DocType.OTHER_PEOPLE_WITNESS_STATEMENTS:
      documentListItem = documents_list_items_en.other_witness_statements;
      break;
    case DocType.MIAM_CERTIFICATE:
      documentListItem = applicant_tasklist_items_all_docs_en.miam_certificate;
      break;
  }

  return documentListItem;
};

export const getDocumentList = (
  citizenUploadedDocumentList: UploadDocumentList[] | undefined,
  docType: string,
  uploadedBy: string,
  partyName?: string,
  idamId?: string
): object[] => {
  let documents: object[] = [];

  for (const doc of citizenUploadedDocumentList || []) {
    const docPartyType = doc.value.isApplicant === YesOrNo.YES ? PartyType.APPLICANT : PartyType.RESPONDENT;

    if (docType === DocType.POSITION_STATEMENTS || docType === DocType.YOUR_WITNESS_STATEMENTS) {
      if (doc.value.partyName !== partyName) {
        continue;
      }
    }

    if (idamId) {
      if (doc.value.uploadedBy === idamId && doc.value.documentType === getDocumentListItem(docType)) {
        documents = appendDocument(documents, doc);
      }
    } else if (uploadedBy === docPartyType && doc.value.documentType === getDocumentListItem(docType)) {
      documents = appendDocument(documents, doc);
    }
  }

  return documents;
};

const appendDocument = (documents, doc) => {
  const uid = doc.value.citizenDocument.document_url.substring(
    doc.value.citizenDocument.document_url.lastIndexOf('/') + 1
  );

  documents.push({
    href: `${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/${uid}`,
    createdDate: doc.value.documentDetails.documentUploadedDate,
    fileName: doc.value.citizenDocument.document_filename,
  });

  return documents;
};
