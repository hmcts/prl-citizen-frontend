import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import AllDocumentsGetController, { getViewDocumentUrl } from './allDocumentsGetController';

describe('allDocumentsGetController', () => {
  const req = mockRequest();
  const res = mockResponse();
  const controller = new AllDocumentsGetController();

  test('Should redirect correctly for applicant', async () => {
    req.session = {
      ...req.session,
      userCase: {
        caseType: 'FL401',
        caseInvites: [],
        respondents: undefined,
        respondentsFL401: undefined,
      },
      user: { id: '1234' },
    };
    req.params = {
      docType: 'lettersfromschool',
      uploadedBy: 'applicant',
    };

    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/yourdocuments/alldocuments/lettersfromschool');
  });

  test('Should redirect correctly for respondent', async () => {
    req.session = {
      ...req.session,
      userCase: {
        caseType: 'FL401',
        caseInvites: [
          {
            value: {
              isApplicant: 'No',
              invitedUserId: '1234',
            },
          },
        ],
        respondents: undefined,
        respondentsFL401: { user: { idamId: '1234' } },
      },
      user: { id: '1234' },
    };
    req.params = {
      docType: 'lettersfromschool',
      uploadedBy: 'respondent',
    };

    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/respondent/yourdocuments/alldocuments/lettersfromschool');
  });

  test('Should redirect correctly for responsetoca', async () => {
    req.session = {
      ...req.session,
      userCase: {
        caseType: 'FL401',
        caseInvites: [],
        respondents: undefined,
        respondentsFL401: undefined,
      },
      user: { id: '1234' },
    };
    req.params = {
      docType: 'responsetoca',
      uploadedBy: 'applicant',
    };

    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/yourdocuments/alldocuments/responsetoca');
  });

  test('Should redirect correctly for aohtoca', async () => {
    req.session = {
      ...req.session,
      userCase: {
        caseType: 'FL401',
        caseInvites: [],
        respondents: undefined,
        respondentsFL401: undefined,
      },
      user: { id: '1234' },
    };
    req.params = {
      docType: 'aohtoca',
      uploadedBy: 'applicant',
    };

    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/yourdocuments/alldocuments/aohtoca');
  });

  test('should throw an error', async () => {
    req.session = {
      ...req.session,
      userCase: {
        caseType: 'FL401',
        caseInvites: [],
        respondents: undefined,
        respondentsFL401: undefined,
      },
      user: { id: '1234' },
      save: jest.fn(done => done('MOCK_ERROR')),
    };
    req.params = {
      docType: 'lettersfromschool',
      uploadedBy: 'applicant',
    };

    try {
      await controller.get(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
    }
  });

  test.each([
    { value: 'positionstatements', expected: '/yourdocuments/alldocuments/positionstatements' },
    { value: 'yourwitnessstatements', expected: '/yourdocuments/alldocuments/yourwitnessstatements' },
    { value: 'lettersfromschool', expected: '/yourdocuments/alldocuments/lettersfromschool' },
    { value: 'digitaldownloads', expected: '/yourdocuments/alldocuments/digitaldownloads' },
    { value: 'medicalrecords', expected: '/yourdocuments/alldocuments/medicalrecords' },
    { value: 'paternitytestreports', expected: '/yourdocuments/alldocuments/paternity_test_reports' },
    { value: 'drugalcoholtests', expected: '/yourdocuments/alldocuments/drug_alcohol_tests' },
    { value: 'witnessavailability', expected: '/yourdocuments/alldocuments/witness_availability' },
    {
      value: 'tenancyandmortgageavailability',
      expected: '/yourdocuments/alldocuments/tenancy_and_mortgage_availability',
    },
    { value: 'medicalreports', expected: '/yourdocuments/alldocuments/medicalreports' },
    { value: 'otherdocuments', expected: '/yourdocuments/alldocuments/otherDocuments' },
    { value: 'previousorders', expected: '/yourdocuments/alldocuments/previousorders' },
    { value: 'otherpeoplewitnessstatement', expected: '/yourdocuments/alldocuments/otherpeoplewitnessstatement' },
    { value: 'policedisclosures', expected: '/yourdocuments/alldocuments/police_disclosures' },
    { value: 'miamcertificate', expected: '/yourdocuments/alldocuments/miamcertificate' },
    { value: 'responsetoca', expected: '/yourdocuments/alldocuments/responsetoca' },
    { value: 'aohtoca', expected: '/yourdocuments/alldocuments/aohtoca' },
  ])('get correct urls for each document type', ({ value, expected }) => {
    expect(getViewDocumentUrl(value)).toBe(expected);
  });
});
