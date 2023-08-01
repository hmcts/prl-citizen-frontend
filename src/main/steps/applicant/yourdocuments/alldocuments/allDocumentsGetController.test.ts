import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import AllDocumentsGetController from './allDocumentsGetController';

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
});
