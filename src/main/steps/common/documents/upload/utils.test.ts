import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import { deleteDocument, getDocumentIdFromUrl, isDocumentInSession } from './utils';

const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

describe('documents > upload > utils', () => {
  describe('getDocumentIdFromUrl', () => {
    test('should extract document id from url', () => {
      expect(
        getDocumentIdFromUrl(
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c'
        )
      ).toBe('c9f56483-6e2d-43ce-9de8-72661755b87c');
    });
  });

  describe('isDocumentInSession', () => {
    test('should return true when document id exists in session documents', () => {
      const documents = [
        {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      ];
      expect(isDocumentInSession('c9f56483-6e2d-43ce-9de8-72661755b87c', documents)).toBe(true);
    });

    test('should return false when document id does not exist in session documents', () => {
      const documents = [
        {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      ];
      expect(isDocumentInSession('tampered-document-id-1234', documents)).toBe(false);
    });

    test('should return false when documents is undefined', () => {
      expect(isDocumentInSession('c9f56483-6e2d-43ce-9de8-72661755b87c', undefined)).toBe(false);
    });
  });

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
      deleteDocumentMock.mockResolvedValue('SUCCESS');

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(req.session.userCase.applicantUploadFiles).toStrictEqual(undefined);
    });

    test('should add error to session when deleteDocument fails', async () => {
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
      deleteDocumentMock.mockRejectedValue('500');

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([
        { errorType: 'deleteError', propertyName: 'uploadDocumentFileUpload' },
      ]);
    });

    test('should reject deletion when document id does not belong to user session', async () => {
      deleteDocumentMock.mockClear();
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
          documentId: 'tampered-document-id-1234',
        },
      });
      const res = mockResponse();

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(deleteDocumentMock).not.toHaveBeenCalled();
      expect(req.session.errors).toStrictEqual([
        { errorType: 'deleteError', propertyName: 'uploadDocumentFileUpload' },
      ]);
    });
  });
});
