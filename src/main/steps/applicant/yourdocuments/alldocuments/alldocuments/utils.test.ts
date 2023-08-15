import { YesOrNo } from '../../../../../app/case/definition';

import { getDocumentList } from './utils';

describe('all documents utils', () => {
  // test.each([
  //   { value: 'positionstatements', expected: 'Your position statements' },
  //   { value: 'yourwitnessstatements', expected: 'Your witness statements' },
  //   { value: 'lettersfromschool', expected: 'Letters from school' },
  //   { value: 'digitaldownloads', expected: 'Emails, screenshots, images and other media files' },
  //   { value: 'medicalrecords', expected: 'Medical records' },
  //   { value: 'paternitytestreports', expected: 'Paternity test reports' },
  //   { value: 'drugalcoholtests', expected: 'Drug and alcohol tests (toxicology)' },
  //   { value: 'witnessavailability', expected: 'Witness availability' },
  //   { value: 'tenancyandmortgageavailability', expected: 'Tenancy and mortgage agreements' },
  //   { value: 'medicalreports', expected: 'Medical reports' },
  //   { value: 'otherDocuments', expected: 'Other documents' },
  //   { value: 'previousorders', expected: 'Previous orders submitted with application' },
  //   { value: 'otherpeoplewitnessstatement', expected: "Other people's witness statements" },
  //   { value: 'policedisclosures', expected: 'Police reports' },
  //   { value: 'miamcertificate', expected: 'MIAM certificate' },
  // ])('get english document list item text', ({ value, expected }) => {
  //   expect(getDocumentListItem(value)).toBe(expected);
  // });

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
