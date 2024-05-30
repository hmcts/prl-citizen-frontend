import { CaseWithId } from '../../../app/case/case';
import { PartyType } from '../../../app/case/definition';

export const enum ViewDocumentsSectionId {
  APPLICATION_PACKS = 'applicationPacks',
  ORDERS_FROM_THE_COURT = 'ordersFromTheCourt',
  APPLICANTS_DOCUMENT = 'applicantsDocuments',
  RESPONDENTS_DOCUMENTS = 'respondentsDocuments',
  ATTENDING_THE_HEARING = 'attendingTheHearing',
}
export type DocumentSectionId = UploadDocumentSectionId | ViewDocumentsSectionId;

export type ViewDocumentsSectionsProps = {
  sectionId: DocumentSectionId;
  sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) => string;
  displayOrder: (loggedInUserPartyType: PartyType) => number;
  isVisible: (caseData: CaseWithId) => boolean;
  documentCategoryList: (
    caseData: CaseWithId,
    documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
    loggedInUserPartyType: PartyType
  ) => ViewDocumentDetails[] | ViewDocCategoryLinkProps[] | [];
};

export const enum UploadDocumentSectionId {
  WITNESS_STATEMENTS_AND_EVIDENCE = 'witnessStatementsAndEvidence',
  APPLICATIONS = 'applications',
  EXPERT_REPORTS = 'expertReports',
  OTHER_DOCUMENTS = 'otherDocuments',
}

export type UploadDocumentCategoryListProps = {
  categoryId: UploadDocumentCategory;
  documentCategoryLabel: (
    documentCategoryLabels: Record<Partial<DocumentLabelCategory>, string>,
    uploadedByPartyName?: string
  ) => string;
  show?: (caseData: CaseWithId) => boolean;
};

export type UploadDocumentSectionsProps = {
  sectionId: string;
  sectionTitle: (documentSectionTitles: Record<DocumentSectionId, string>) => string;
  documentCategoryList: UploadDocumentCategoryListProps[];
};

export const enum DocumentCategory {
  POSITION_STATEMENTS = 'positionStatements',
  APPLICANT_WITNESS_STATEMENTS = 'applicantStatements',
  RESPONDENT_WITNESS_STATEMENTS = 'respondentStatements',
  OTHER_PEOPLE_WITNESS_STATEMENTS = 'otherWitnessStatements',
  MEDICAL_REPORTS = 'medicalReports',
  MEDICAL_RECORDS = 'medicalRecords',
  POLICE_REPORTS = 'policeReport',
  DNA_REPORTS = 'DNAReports_expertReport',
  DRUG_ALCOHOL_TESTS = 'DRUG_AND_ALCOHOL_TESTS',
  RESPONDENT_C7_RESPONSE_TO_APPLICATION = 'respondentApplication',
  RESPONDENT_RESPOND_TO_C1A = 'respondentC1AResponse',
  RESPONDENT_C1A_RESPONSE_TO_APPLICATION = 'respondentC1AApplication',
}

export const enum UploadDocumentAPICategory {
  POSITION_STATEMENTS = 'POSITION_STATEMENTS',
  APPLICANT_WITNESS_STATEMENTS = 'WITNESS_STATEMENTS_APPLICANT',
  RESPONDENT_WITNESS_STATEMENTS = 'WITNESS_STATEMENTS_RESPONDENT',
  OTHER_PEOPLE_WITNESS_STATEMENTS = 'OTHER_WITNESS_STATEMENTS',
  MEDICAL_REPORTS = 'MEDICAL_REPORTS',
  MEDICAL_RECORDS = 'MEDICAL_RECORDS',
  EMAIL_IMAGES_MEDIA = 'MAIL_SCREENSHOTS_MEDIA_FILES',
  LETTERS_FROM_SCHOOL_APPLICANT = 'LETTERS_FROM_SCHOOL_APPLICANT',
  LETTERS_FROM_SCHOOL_RESPONDENT = 'LETTERS_FROM_SCHOOL_RESPONDENT',
  TENANCY_AND_MORTGAGE_AGREEMENTS = 'TENANCY_MORTGAGE_AGREEMENTS',
  PREVIOUS_ORDERS_SUBMITTED_APPLICANT = 'PREVIOUS_ORDERS_SUBMITTED_APPLICANT',
  PREVIOUS_ORDERS_SUBMITTED_RESPONDENT = 'PREVIOUS_ORDERS_SUBMITTED_RESPONDENT',
  POLICE_REPORTS = 'POLICE_REPORTS',
  PATERNITY_TEST_REPORTS = 'PATERNITY_TEST_REPORTS',
  FM5_DOCUMENT = 'FM5_STATEMENTS',
  OTHER_DOCUMENTS = 'OTHER_DOCUMENTS',
  DRUG_ALCOHOL_TESTS = 'DRUG_AND_ALCOHOL_TESTS',
}

export const enum UploadDocumentCategory {
  POSITION_STATEMENTS = 'your-position-statements',
  WITNESS_STATEMENTS = 'your-witness-statements',
  OTHER_PEOPLE_WITNESS_STATEMENTS = 'other-people-witness-statement',
  EMAIL_IMAGES_MEDIA = 'media-files',
  MEDICAL_RECORDS = 'medical-records',
  LETTERS_FROM_SCHOOL = 'letters-from-school',
  TENANCY_AND_MORTGAGE_AGREEMENTS = 'tenancy-and-mortgage-agreements',
  PREVIOUS_ORDERS_SUBMITTED = 'previous-orders',
  MEDICAL_REPORTS = 'medical-reports',
  PATERNITY_TEST_REPORTS = 'paternity-test-reports',
  DRUG_ALCOHOL_TESTS = 'drug-and-alcohol-tests',
  POLICE_REPORTS = 'police-disclosures',
  FM5_DOCUMENT = 'fm5-document',
  OTHER_DOCUMENTS = 'other-documents',
}

export type ViewDocumentsCategoryListProps = {
  categoryId: DocumentCategory;
  documentCategoryLabel: (
    documentCategoryLabels: Record<DocumentLabelCategory, string>,
    uploadedByPartyName?: string
  ) => string;
  documents: (
    documents: CaseWithId['citizenDocuments'],
    loggedInUserPartyType: PartyType,
    documentPartyType: CitizenDocuments['partyType'],
    documentPartyId?: CitizenDocuments['partyId']
  ) => Document[];
};

export const enum DocumentLabelCategory {
  VIEW_ALL_ORDERS = 'viewAllOrders',
  YOUR_APPLICATION_PACK = 'packServed',
  APPLICATION_PACK_TO_BE_SERVED = 'packToBeServed',
  RESPONDENT_C7_RESPONSE_TO_APPLICATION = 'respondentResponseToApplication',
  POSITION_STATEMENTS = 'positionStatements',
  WITNESS_STATEMENTS = 'witnessStatements',
  OTHER_PEOPLE_WITNESS_STATEMENTS = 'otherPeopleWitnessStatements',
  MEDICAL_REPORTS = 'medicalReports',
  MEDICAL_RECORDS = 'medicalRecords',
  POLICE_REPORTS = 'policeReports',
  DNA_REPORTS = 'DNAReports',
  DRUG_ALCOHOL_TESTS = 'drugAndAlcoholTests',
  LETTERS_FROM_SCHOOL = 'lettersFromSchool',
  TENANCY_AND_MORTGAGE_AGREEMENTS = 'tenancyMortgageAgreements',
  PREVIOUS_ORDERS_SUBMITTED = 'previousOrdersSubmitted',
  PATERNITY_TEST_REPORTS = 'paternityTestReports',
  EMAIL_IMAGES_MEDIA = 'emailImagesMedia',
  FM5_DOCUMENT = 'fm5Document',
  OTHER_DOCUMENTS = 'otherDocuments',
}

export type ViewDocumentDetails = {
  categoryId: DocumentCategory;
  link: {
    text: string;
    url: string;
    openInAnotherTab?: boolean;
  };
};

export type ViewDocCategoryLinkProps = {
  link: {
    text: string;
    url: string;
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
  partyName: string;
  categoryId: DocumentCategory;
  uploadedBy: string;
  uploadedDate: string;
  reviewedDate: string | null;
  document: DocumentMeta;
  documentWelsh: DocumentMeta | null;
  solicitorRepresentedPartyName?: string;
  solicitorRepresentedPartyId?: string;
  documentLanguage?: string;
};

export type CitizenOrders = {
  partyId: string;
  partyName: string;
  partyType: PartyType;
  uploadedBy: string;
  document: DocumentMeta;
  documentWelsh: DocumentMeta;
  orderType: string;
  createdDate: string;
  servedDate: string;
  wasCafcassServed: boolean;
  final: boolean;
  new: boolean;
};
export interface CitizenApplicationPacks extends CitizenDocuments {
  applicantSoaPack?: DocumentMeta[] | null;
  respondentSoaPack?: DocumentMeta[] | null;
  servedParty: 'Applicant' | 'Respondent';
}

export const enum DocumentTypes {
  ENGLISH = 'document_en',
  WELSH = 'document_cy',
}

export type OrderDocumentMeta = {
  [key in DocumentTypes]?: {
    documentId: string;
    documentName: string;
    orderMadeDate: string;
    documentDownloadUrl: string;
  };
};

export type ApplicationPackDocumentMeta = {
  documentId: string;
  documentName: string;
  servedDate: string;
  documentDownloadUrl: string;
};

export type Document = {
  [key in DocumentTypes]?: {
    documentId: string;
    documentName: string;
    documentDownloadUrl: string;
    createdDate?: string;
    uploadedBy?: string;
  };
};
