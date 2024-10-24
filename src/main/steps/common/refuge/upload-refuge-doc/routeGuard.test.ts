import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import { routeGuard } from './routeGuard';

const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

describe('C8 Refuge > upload refuge doc > routeGuard', () => {
  test('Should delete the c8 document if removeFileId is present', async () => {
    const req = mockRequest({
      params: {
        removeFileId: '1234',
      },
      session: {
        userCase: {
          c8_refuge_document: {
            document_url: 'MOCK_URL/1234',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    deleteDocumentMock.mockResolvedValueOnce('SUCCESS');

    await routeGuard.get(req, res, next);

    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-doc');
    expect(req.session.userCase.c8_refuge_document).toBe(undefined);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should delete the c8 document if removeFileId is present for c100 applicant', async () => {
    const req = mockRequest({
      params: {
        removeFileId: '1234',
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
      session: {
        userCase: {
          appl_allApplicants: [
            {
              id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
              applicantFirstName: 'Test',
              applicantLastName: 'Test',
              refugeConfidentialityC8Form: {
                document_url: 'MOCK_URL',
                document_binary_url: 'MOCK_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
              },
            },
          ],
        },
      },
    });
    req.originalUrl = '/c100-rebuild';
    const res = mockResponse();
    const next = jest.fn();
    deleteDocumentMock.mockResolvedValueOnce('SUCCESS');

    await routeGuard.get(req, res, next);

    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      '/c100-rebuild/refuge/upload-refuge-doc/6b792169-84df-4e9a-8299-c2c77c9b7e58'
    );
    expect(req.session.userCase.appl_allApplicants[0].refugeConfidentialityC8Form).toBe(undefined);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should delete the c8 document if removeFileId is present for c100 other person', async () => {
    const req = mockRequest({
      params: {
        removeFileId: '1234',
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
      session: {
        userCase: {
          oprs_otherPersons: [
            {
              id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
              applicantFirstName: 'Test',
              applicantLastName: 'Test',
              refugeConfidentialityC8Form: {
                document_url: 'MOCK_URL',
                document_binary_url: 'MOCK_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
              },
            },
          ],
        },
      },
    });
    req.originalUrl = '/c100-rebuild';
    const res = mockResponse();
    const next = jest.fn();
    deleteDocumentMock.mockResolvedValueOnce('SUCCESS');

    await routeGuard.get(req, res, next);

    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      '/c100-rebuild/refuge/upload-refuge-doc/6b792169-84df-4e9a-8299-c2c77c9b7e58'
    );
    expect(req.session.userCase.oprs_otherPersons[0].refugeConfidentialityC8Form).toBe(undefined);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should call next if removeFileId is not present', async () => {
    const req = mockRequest({
      session: {
        userCase: {},
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
