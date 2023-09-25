import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { DocCategory, DocType, PartyType } from '../../../app/case/definition';

import { getDocumentMeta, getDocumentType, resetUploadDocumentSessionData } from './util';

describe('upload document util', () => {
  test.each([
    { docType: 'positionstatements', partyType: 'applicant', expected: 'POSITION_STATEMENTS' },
    {
      docType: 'yourwitnessstatements',
      partyType: 'applicant',
      expected: 'WITNESS_STATEMENTS_APPLICANT',
    },
    {
      docType: 'yourwitnessstatements',
      partyType: 'respondent',
      expected: 'WITNESS_STATEMENTS_RESPONDENT',
    },
    {
      docType: 'otherpeoplewitnessstatement',
      partyType: 'applicant',
      expected: 'OTHER_WITNESS_STATEMENTS',
    },
    { docType: 'medicalrecords', partyType: 'applicant', expected: 'MEDICAL_RECORDS' },
    { docType: 'medicalreports', partyType: 'applicant', expected: 'MEDICAL_REPORTS' },
    { docType: 'mediafiles', partyType: 'applicant', expected: 'MAIL_SCREENSHOTS_MEDIA_FILES' },
    {
      docType: 'lettersfromschool',
      partyType: 'applicant',
      expected: 'LETTERS_FROM_SCHOOL',
    },
    {
      docType: 'tenancyandmortgageavailability',
      partyType: 'applicant',
      expected: 'TENANCY_MORTGAGE_AGREEMENTS',
    },
    {
      docType: 'previousorders',
      partyType: 'applicant',
      expected: 'PREVIOUS_ORDERS_SUBMITTED_APPLICANT',
    },
    {
      docType: 'previousorders',
      partyType: 'respondent',
      expected: 'PREVIOUS_ORDERS_SUBMITTED_RESPONDENT',
    },
    {
      docType: 'paternitytestreports',
      partyType: 'applicant',
      expected: 'PATERNITY_TEST_REPORTS',
    },
    { docType: 'drugalcoholtests', partyType: 'applicant', expected: 'DRUG_AND_ALCOHOL_TESTS' },
    { docType: 'policedisclosures', partyType: 'applicant', expected: 'POLICE_REPORTS' },
    { docType: 'otherdocuments', partyType: 'applicant', expected: 'OTHER_DOCUMENTS' },
  ])('getDocumentType should return correct document types', ({ docType, partyType, expected }) => {
    expect(getDocumentType(docType as DocType, partyType as PartyType)).toBe(expected);
  });

  test.each([
    {
      category: 'witnessstatements',
      type: 'positionstatements',
      expected: { category: 'Witness statements and evidence', type: 'Your position statements' },
    },
    {
      category: 'witnessstatements',
      type: 'yourwitnessstatements',
      expected: { category: 'Witness statements and evidence', type: 'Your witness statements' },
    },
    {
      category: 'witnessstatements',
      type: 'otherpeoplewitnessstatement',
      expected: { category: 'Witness statements and evidence', type: "Other people's witness statements" },
    },
    {
      category: 'witnessstatements',
      type: 'mediafiles',
      expected: {
        category: 'Witness statements and evidence',
        type: 'Emails, screenshots, images and other media files',
      },
    },
    {
      category: 'witnessstatements',
      type: 'medicalrecords',
      expected: {
        category: 'Witness statements and evidence',
        type: 'Medical records',
      },
    },
    {
      category: 'witnessstatements',
      type: 'lettersfromschool',
      expected: { category: 'Witness statements and evidence', type: 'Letters from school' },
    },
    {
      category: 'witnessstatements',
      type: 'tenancyandmortgageavailability',
      expected: { category: 'Witness statements and evidence', type: 'Tenancy and mortgage agreements' },
    },
    {
      category: 'witnessstatements',
      type: 'default type',
      expected: { category: 'Witness statements and evidence', type: '' },
    },
    {
      category: 'applications',
      type: 'previousorders',
      expected: { category: 'Applications', type: 'Previous orders submitted with application' },
    },
    {
      category: 'applications',
      type: 'yourwitnessstatements',
      expected: { category: 'Applications', type: '' },
    },
    {
      category: 'expertreports',
      type: 'medicalreports',
      expected: { category: 'Expert reports', type: 'Medical reports' },
    },
    {
      category: 'expertreports',
      type: 'paternitytestreports',
      expected: { category: 'Expert reports', type: 'Paternity test reports' },
    },
    {
      category: 'expertreports',
      type: 'drugalcoholtests',
      expected: { category: 'Expert reports', type: 'Drug and alcohol tests (toxicology)' },
    },
    {
      category: 'expertreports',
      type: 'policedisclosures',
      expected: {
        category: 'Expert reports',
        type: 'Police reports',
      },
    },
    {
      category: 'expertreports',
      type: 'default type',
      expected: { category: 'Expert reports', type: '' },
    },
    {
      category: 'otherdocuments',
      type: 'otherdocuments',
      expected: { category: 'Other documents', type: 'Other documents' },
    },
    {
      category: 'otherdocuments',
      type: 'default type',
      expected: { category: 'Other documents', type: '' },
    },
  ])('getDocumentMeta should return correct details in english', ({ category, type, expected }) => {
    expect(getDocumentMeta(category as DocCategory, type as DocType, 'en')).toStrictEqual(expected);
  });

  test.each([
    {
      category: 'witnessstatements',
      type: 'positionstatements',
      expected: { category: 'Datganiadau tyst a thystiolaeth', type: 'Eich datganiadau safbwynt' },
    },
    {
      category: 'witnessstatements',
      type: 'yourwitnessstatements',
      expected: { category: 'Datganiadau tyst a thystiolaeth', type: 'Eich datganiadau tyst' },
    },
    {
      category: 'witnessstatements',
      type: 'otherpeoplewitnessstatement',
      expected: { category: 'Datganiadau tyst a thystiolaeth', type: 'Datganiadau tyst pobl eraill' },
    },
    {
      category: 'witnessstatements',
      type: 'mediafiles',
      expected: {
        category: 'Datganiadau tyst a thystiolaeth',
        type: 'Negeseuon e-bost, cipluniau, delweddau a ffeiliau cyfryngau eraill',
      },
    },
    {
      category: 'witnessstatements',
      type: 'medicalrecords',
      expected: {
        category: 'Datganiadau tyst a thystiolaeth',
        type: 'Cofnodion meddygol',
      },
    },
    {
      category: 'witnessstatements',
      type: 'lettersfromschool',
      expected: { category: 'Datganiadau tyst a thystiolaeth', type: 'Llythyrau gan yr ysgol' },
    },
    {
      category: 'witnessstatements',
      type: 'tenancyandmortgageavailability',
      expected: { category: 'Datganiadau tyst a thystiolaeth', type: 'Tenantiaeth a morgais' },
    },
    {
      category: 'witnessstatements',
      type: 'default type',
      expected: { category: 'Datganiadau tyst a thystiolaeth', type: '' },
    },
    {
      category: 'applications',
      type: 'previousorders',
      expected: { category: 'Ceisiadau', type: "Gorchmynion blaenorol wedi'u cyflwyno gyda'r cais" },
    },
    {
      category: 'applications',
      type: 'yourwitnessstatements',
      expected: { category: 'Ceisiadau', type: '' },
    },
    {
      category: 'expertreports',
      type: 'medicalreports',
      expected: { category: 'Adroddiadau arbenigwyr', type: 'Adroddiadau meddygol' },
    },
    {
      category: 'expertreports',
      type: 'paternitytestreports',
      expected: { category: 'Adroddiadau arbenigwyr', type: 'Adroddiadau profion tadolaeth' },
    },
    {
      category: 'expertreports',
      type: 'drugalcoholtests',
      expected: { category: 'Adroddiadau arbenigwyr', type: 'Profion cyffuriau ac alcohol (tocsicoleg)' },
    },
    {
      category: 'expertreports',
      type: 'policedisclosures',
      expected: {
        category: 'Adroddiadau arbenigwyr',
        type: "Adroddiadau'r heddlu",
      },
    },
    {
      category: 'expertreports',
      type: 'default type',
      expected: { category: 'Adroddiadau arbenigwyr', type: '' },
    },
    {
      category: 'otherdocuments',
      type: 'otherdocuments',
      expected: { category: 'Dogfennau eraill', type: 'Dogfennau eraill' },
    },
    {
      category: 'otherdocuments',
      type: 'default type',
      expected: { category: 'Dogfennau eraill', type: '' },
    },
  ])('getDocumentMeta should return correct details in welsh', ({ category, type, expected }) => {
    expect(getDocumentMeta(category as DocCategory, type as DocType, 'cy')).toStrictEqual(expected);
  });

  test('resetUploadDocumentSessionData should reset session data', () => {
    const req = mockRequest({
      userCase: {
        start: 'Yes',
        reasonForDocumentCantBeShared: 'test reason',
        declarationCheck: 'declaration',
        applicantUploadFiles: [
          {
            document: {
              document_url: 'url',
              document_binary_url: 'binary url',
              document_filename: 'filename',
              document_hash: 'document hash',
              document_creation_date: '1/1/2023',
            },
          },
        ],
        respondentUploadFiles: [
          {
            document: {
              document_url: 'url',
              document_binary_url: 'binary url',
              document_filename: 'filename',
              document_hash: 'document hash',
              document_creation_date: '1/1/2023',
            },
          },
        ],
      },
    });

    resetUploadDocumentSessionData(req.session);
    expect(req.session.userCase.start).toBeUndefined();
    expect(req.session.userCase.reasonForDocumentCantBeShared).toBeUndefined();
    expect(req.session.userCase.declarationCheck).toBeUndefined();
    expect(req.session.userCase.applicantUploadFiles).toStrictEqual([]);
    expect(req.session.userCase.respondentUploadFiles).toStrictEqual([]);
  });
});
