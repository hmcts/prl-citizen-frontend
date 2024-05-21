import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import { deleteDocument } from './utils';

const deleteCitizenStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteCitizenStatementDocument');

describe('documents > upload > utils', () => {
  describe('deleteDocuments', () => {
    test('should remove document from upload files list', async () => {
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
            applicantUploadFiles: [
              {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
        query: {
          documentId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      });
      const res = mockResponse();
      deleteCitizenStatementDocumentMock.mockResolvedValue('SUCCESS');

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(req.session.userCase.applicantUploadFiles).toStrictEqual(undefined);
    });

    test('should add error to session when deleteCitizenStatementDocument fails', async () => {
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
            applicantUploadFiles: [
              {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
        query: {
          documentId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      });
      const res = mockResponse();
      deleteCitizenStatementDocumentMock.mockRejectedValue('500');

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([
        { errorType: 'donwloadError', propertyName: 'uploadDocumentFileUpload' },
      ]);
    });
  });
});
