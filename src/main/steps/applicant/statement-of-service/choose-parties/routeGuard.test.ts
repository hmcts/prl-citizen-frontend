import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import { routeGuard } from './routeGuard';

const deleteCitizenStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteCitizenStatementDocument');

describe('applicant > statement-of-service > choose-parties > routeGuard', () => {
  test('should delete document when documentId present as query param', async () => {
    const req = mockRequest({
      session: {
        user: { id: '1234' },
        userCase: {
          id: '1234',
          caseType: 'FL401',
          applicantsFL401: {
            firstName: 'test',
            lastName: 'user',
          },
          statementOfServiceDocument: {
            document_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            document_binary_url: 'string',
            document_filename: 'string',
            document_hash: 'string',
            document_creation_date: 'string',
            name: 'file_example_TIFF_1MB',
          },
        },
      },
      query: {
        documentId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    deleteCitizenStatementDocumentMock.mockResolvedValue('SUCCESS');

    routeGuard.get(req, res, next);
    await new Promise(process.nextTick);
    expect(req.session.userCase.statementOfServiceDocument).toStrictEqual(undefined);
  });

  test('should call next when documentId not present in query params', async () => {
    const req = mockRequest({
      session: {
        user: { id: '1234' },
        userCase: {
          id: '1234',
          caseType: 'FL401',
          applicantsFL401: {
            firstName: 'test',
            lastName: 'user',
          },
          statementOfServiceDocument: {
            document_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            document_binary_url: 'string',
            document_filename: 'string',
            document_hash: 'string',
            document_creation_date: 'string',
            name: 'file_example_TIFF_1MB',
          },
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    routeGuard.get(req, res, next);
    await new Promise(process.nextTick);
    expect(next).toHaveBeenCalled();
  });
});
