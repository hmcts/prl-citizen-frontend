import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { ResponseHandlers } from '../upload/utils';

import { deleteDocument } from './deleteDocument';

describe('deleteDocument', () => {
  const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

  const createHandlers = (): ResponseHandlers => ({
    redirect: jest.fn(),
    respondJson: jest.fn(),
  });

  const createRequest = (documents: object[], applicationSettings = {}) =>
    mockRequest({
      params: {
        docCategory: 'your-position-statements',
      },
      session: {
        user: {
          id: '1234',
          accessToken: 'token',
        },
        applicationSettings,
        userCase: {
          id: 'case-123',
          caseType: 'FL401',
          applicantsFL401: {
            firstName: 'test',
            lastName: 'user',
          },
          applicantUploadFiles: documents,
        },
      },
    });

  beforeEach(() => {
    deleteDocumentMock.mockReset();
  });

  test('should delete document and return successful JSON response', async () => {
    const req = createRequest([
      {
        document_url: '/documents/document-123',
        document_binary_url: 'binary/document-123',
        document_filename: 'test.pdf',
      },
      {
        document_url: '/documents/document-456',
        document_binary_url: 'binary/document-456',
        document_filename: 'other.pdf',
      },
    ]);
    const handlers = createHandlers();

    deleteDocumentMock.mockResolvedValue('Success');

    await deleteDocument(req, handlers, 'document-123');

    expect(deleteDocumentMock).toHaveBeenCalledWith('document-123');
    expect(req.session.userCase.applicantUploadFiles).toEqual([
      {
        document_url: '/documents/document-456',
        document_binary_url: 'binary/document-456',
        document_filename: 'other.pdf',
      },
    ]);
    expect(handlers.respondJson).toHaveBeenCalledWith({}, expect.any(String));
  });

  test('should delete the uploaded files property when the last document is deleted', async () => {
    const req = createRequest(
      [
        {
          document_url: '/documents/document-123',
          document_filename: 'test.pdf',
        },
      ],
      { isDocumentGeneratedAndUplaoded: true }
    );
    const handlers = createHandlers();

    deleteDocumentMock.mockResolvedValue('Success');

    await deleteDocument(req, handlers, 'document-123');

    expect(req.session.userCase.applicantUploadFiles).toBeUndefined();
    expect(req.session.applicationSettings.isDocumentGeneratedAndUplaoded).toBeUndefined();
    expect(deleteDocumentMock).toHaveBeenCalledWith('document-123');
    expect(handlers.respondJson).toHaveBeenCalledWith({}, expect.any(String));
  });

  test('should set deleteError and return error JSON when deletion fails', async () => {
    const req = createRequest([
      {
        document_url: '/documents/document-123',
        document_filename: 'test.pdf',
      },
    ]);
    const handlers = createHandlers();

    deleteDocumentMock.mockRejectedValueOnce(new Error('delete failed'));

    await deleteDocument(req, handlers, 'document-123');

    expect(req.session.errors).toContainEqual({
      errorType: 'deleteError',
      propertyName: 'uploadDocumentFileUpload',
    });

    expect(req.session.userCase.applicantUploadFiles).toEqual([
      {
        document_url: '/documents/document-123',
        document_filename: 'test.pdf',
      },
    ]);

    expect(handlers.respondJson).toHaveBeenCalledWith(
      {
        error: {
          message: 'deleteError',
        },
      },
      expect.any(String)
    );
  });
});
