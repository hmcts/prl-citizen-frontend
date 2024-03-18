import { CaseWithId } from '../../../app/case/case';
import { PartyType } from '../../../app/case/definition';

export type DocumentSectionsProps = {
  documentSectionId: string;
  documentSectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) => string;
  displayOrder: (partyType: PartyType) => number;
  isVisible: (caseData: CaseWithId) => boolean;
  documentsList: (
    loggedInPartyType: PartyType,
    caseData: CaseWithId,
    documentCategoryLabels: Record<DocumentLabelCategory, string>
  ) => DocumentDetails[] | [];
};

export const enum DocumentSectionId {
  ORDERS_FROM_THE_COURT = 'ordersFromTheCourt',
  APPLICANTS_DOCUMENT = 'applicantsDocuments',
  RESPONDENTS_DOCUMENTS = 'respondentsDocuments',
  ATTENDING_THE_HEARING = 'attendingTheHearing',
}

export const enum DocumentCategory {
  POSITION_STATEMENTS = 'positionStatements', //2
  APPLICANT_WITNESS_STATEMENTS = 'applicantStatements',
  RESPONDENT_WITNESS_STATEMENTS = 'respondentStatements', //1
  OTHER_PEOPLE_WITNESS_STATEMENTS = 'otherWitnessStatements', //2
  MEDICAL_REPORTS = 'medicalReports', //2
  MEDICAL_RECORDS = 'medicalRecords', //1
  POLICE_REPORTS = 'policeReport', //2
  DNA_REPORTS = 'DNAReports_expertReport', //1 PATERNITY R - resp
  DRUG_ALCOHOL_TESTS = 'drugAndAlcoholTest(toxicology)', //1
}

export type DocumentsListConfigProps = {
  documentCategoryId: DocumentCategory;
  documentLabel: (
    uploadedByPartyName: CitizenDocuments['uploadedBy'],
    documentCategoryLabels: Record<DocumentLabelCategory, string>
  ) => string;
  documentsList: (
    documents: CaseWithId['citizenDocuments'],
    documentPartyType: CitizenDocuments['partyType'],
    documentPartyId?: CitizenDocuments['partyId']
  ) => Document[];
};

export const enum DocumentLabelCategory {
  POSITION_STATEMENTS = 'positionStatements',
  WITNESS_STATEMENTS = 'witnessStatements',
  OTHER_PEOPLE_WITNESS_STATEMENTS = 'otherPeopleWitnessStatements',
  MEDICAL_REPORTS = 'medicalReports',
  MEDICAL_RECORDS = 'medicalRecords',
  POLICE_REPORTS = 'policeReports',
  DNA_REPORTS = 'DNAReports',
  DRUG_ALCOHOL_TESTS = 'drugAndAlcoholTests',
}

export type DocumentDetails = {
  categoryId: DocumentCategory;
  link: {
    text: string;
    url: string;
    openInAnotherTab: boolean;
  };
};

export type DocumentMeta = {
  document_url: string;
  document_binary_url: string;
  document_filename: string;
  document_hash: string | null;
  category_id: DocumentCategory | null;
  document_creation_date: string;
  document_id?: string;
};

export type CitizenDocuments = {
  partyId: string;
  partyType: PartyType;
  categoryId: DocumentCategory;
  uploadedBy: string;
  uploadedDate: string;
  reviewedDate: string | null;
  document: DocumentMeta;
  documentWelsh: DocumentMeta | null;
};

export const enum DocumentTypes {
  ENGLISH = 'document_en',
  WELSH = 'document_cy',
}

export type Document = {
  [key in DocumentTypes]?: {
    documentId: string;
    documentName: string;
    createdDate: string;
    uploadedBy: string;
    downloadLink: string;
  };
};
