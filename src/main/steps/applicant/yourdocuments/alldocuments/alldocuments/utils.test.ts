import { YesOrNo } from '../../../../../app/case/definition';

import { getDocumentList, getDocumentListItemCy, getDocumentListItemEn } from './utils';

describe('all documents utils', () => {
  test.each([
    { value: 'positionstatements', expected: 'Your position statements' },
    { value: 'yourwitnessstatements', expected: 'Your witness statements' },
    { value: 'lettersfromschool', expected: 'Letters from school' },
    { value: 'digitaldownloads', expected: 'Emails, screenshots, images and other media files' },
    { value: 'medicalrecords', expected: 'Medical records' },
    { value: 'paternity_test_reports', expected: 'Paternity test reports' },
    { value: 'drug_alcohol_tests', expected: 'Drug and alcohol tests (toxicology)' },
    { value: 'witness_availability', expected: 'Witness availability' },
    { value: 'tenancy_and_mortgage_availability', expected: 'Tenancy and mortgage agreements' },
    { value: 'medicalreports', expected: 'Medical reports' },
    { value: 'otherDocuments', expected: 'Other documents' },
    { value: 'previousorders', expected: 'Previous orders submitted with application' },
    { value: 'otherpeoplewitnessstatement', expected: "Other people's witness statements" },
    { value: 'police_disclosures', expected: 'Police reports' },
  ])('get english document list item text', ({ value, expected }) => {
    expect(getDocumentListItemEn(value)).toBe(expected);
  });

  test.each([
    { value: 'positionstatements', expected: 'Eich datganiadau safbwynt' },
    { value: 'yourwitnessstatements', expected: 'Eich datganiadau tyst' },
    { value: 'lettersfromschool', expected: 'Llythyrau gan yr ysgol' },
    { value: 'digitaldownloads', expected: 'Negeseuon e-bost, cipluniau, delweddau a ffeiliau cyfryngau eraill' },
    { value: 'medicalrecords', expected: 'Cofnodion meddygol' },
    { value: 'paternity_test_reports', expected: 'Adroddiadau profion tadolaeth' },
    { value: 'drug_alcohol_tests', expected: 'Profion cyffuriau ac alcohol (tocsicoleg)' },
    { value: 'witness_availability', expected: 'Pryd fydd tystion ar gael' },
    { value: 'tenancy_and_mortgage_availability', expected: 'Tenantiaeth a morgais' },
    { value: 'medicalreports', expected: 'Adroddiadau meddygol' },
    { value: 'otherDocuments', expected: 'Dogfennau eraill' },
    { value: 'previousorders', expected: "Gorchmynion blaenorol wedi'u cyflwyno gyda'r cais" },
    { value: 'otherpeoplewitnessstatement', expected: 'Datganiadau tyst pobl eraill' },
    { value: 'police_disclosures', expected: "Adroddiadau'r heddlu" },
  ])('get welsh document list item text', ({ value, expected }) => {
    expect(getDocumentListItemCy(value)).toBe(expected);
  });

  test('getDocumentList for letters from school', () => {
    const documentList = [
      {
        id: '1234',
        value: {
          documentType: 'Letters from school',
          partyName: 'Elise Lynn',
          isApplicant: 'No',
          dateCreated: 'MOCK_DATE',
          document_filename: 'MOCK_FILENAME',
          document_url: 'MOCK_URL',
          parentDocumentType: 'Witness statements and evidence',
          citizenDocument: {
            document_url: 'MOCK_URL',
            document_filename: 'MOCK_FILENAME',
            document_binary_url: 'MOCK_BINARY_URL',
          },
          documentDetails: {
            documentName: 'MOCK_NAME',
            documentUploadedDate: 'MOCK_DATE',
          },
          uploadedBy: 'Elise Lynn',
          documentRequestedByCourt: YesOrNo.YES,
        },
      },
    ];

    const uid = documentList[0].value.citizenDocument.document_url.substring(
      documentList[0].value.citizenDocument.document_url.lastIndexOf('/') + 1
    );
    const expected = [
      {
        href: `/yourdocuments/alldocuments/downloadCitizenDocument/${uid}`,
        fileName: 'MOCK_FILENAME',
        createdDate: 'MOCK_DATE',
      },
    ];

    expect(getDocumentList(documentList, 'lettersfromschool', 'respondent')).toEqual(expected);
  });

  test('getDocumentList for position statements', () => {
    const documentList = [
      {
        id: '1234',
        value: {
          documentType: 'Your position statements',
          partyName: 'Elise Lynn',
          isApplicant: 'No',
          dateCreated: 'MOCK_DATE',
          document_filename: 'MOCK_FILENAME',
          document_url: 'MOCK_URL',
          parentDocumentType: 'Witness statements and evidence',
          citizenDocument: {
            document_url: 'MOCK_URL',
            document_filename: 'MOCK_FILENAME',
            document_binary_url: 'MOCK_BINARY_URL',
          },
          documentDetails: {
            documentName: 'MOCK_NAME',
            documentUploadedDate: 'MOCK_DATE',
          },
          uploadedBy: 'Elise Lynn',
          documentRequestedByCourt: YesOrNo.YES,
        },
      },
    ];

    const uid = documentList[0].value.citizenDocument.document_url.substring(
      documentList[0].value.citizenDocument.document_url.lastIndexOf('/') + 1
    );
    const expected = [
      {
        href: `/yourdocuments/alldocuments/downloadCitizenDocument/${uid}`,
        fileName: 'MOCK_FILENAME',
        createdDate: 'MOCK_DATE',
      },
    ];

    expect(getDocumentList(documentList, 'positionstatements', 'respondent', 'Elise Lynn')).toEqual(expected);
  });

  test('should not return document list for position statements if wrong partyName', () => {
    const documentList = [
      {
        id: '1234',
        value: {
          documentType: 'Your position statements',
          partyName: 'Elise Lynn',
          isApplicant: 'No',
          dateCreated: 'MOCK_DATE',
          document_filename: 'MOCK_FILENAME',
          document_url: 'MOCK_URL',
          parentDocumentType: 'Witness statements and evidence',
          citizenDocument: {
            document_url: 'MOCK_URL',
            document_filename: 'MOCK_FILENAME',
            document_binary_url: 'MOCK_BINARY_URL',
          },
          documentDetails: {
            documentName: 'MOCK_NAME',
            documentUploadedDate: 'MOCK_DATE',
          },
          uploadedBy: 'Elise Lynn',
          documentRequestedByCourt: YesOrNo.YES,
        },
      },
    ];

    expect(getDocumentList(documentList, 'positionstatements', 'respondent', 'John Smith')).toEqual([]);
  });
});
