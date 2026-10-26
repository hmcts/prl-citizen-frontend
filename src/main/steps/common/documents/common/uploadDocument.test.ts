import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import type { ResponseHandlers } from '../upload/utils';

import { uploadDocument } from './uploadDocument';

const uploadMultipleDocumentsMock = jest.spyOn(CosApiClient.prototype, 'uploadMultipleDocuments');

describe('uploadDocument', () => {
  const documentDetail = {
    status: 'Success',
    success: {
      messageHtml: 'test.pdf',
      messageText: 'test.pdf',
    },
    document: {
      document_url: 'string',
      document_binary_url: 'string',
      document_filename: 'string',
      document_hash: 'string',
      document_creation_date: 'string',
      name: 'test',
    },
  };

  const createRequest = () => {
    const req = mockRequest({
      body: {
        uploadFile: true,
      },
      params: {
        docCategory: 'your-position-statements',
      },
      session: {
        user: {
          id: '1234',
          accessToken: 'test-token',
        },
        userCase: {
          id: '1234',
          caseType: 'FL401',
          applicantsFL401: {
            firstName: 'test',
            lastName: 'user',
          },
        },
      },
    });

    req.files = {
      documents: {
        name: 'test.pdf',
        data: '',
        mimetype: 'application/pdf',
      },
    };

    req.headers.accept = 'text/html';

    return req;
  };

  const createHandlers = () =>
    ({
      respondJson: jest.fn(),
      redirect: jest.fn(),
    }) as unknown as ResponseHandlers;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should upload document', async () => {
    const req = createRequest();
    const handlers = createHandlers();

    uploadMultipleDocumentsMock.mockResolvedValue([documentDetail]);

    await uploadDocument(req, handlers);

    expect(req.session.userCase.applicantUploadFiles).toStrictEqual([documentDetail.document]);
    expect(uploadMultipleDocumentsMock).toHaveBeenCalledWith(req.session.user, {
      files: [req.files.documents],
    });
    expect(handlers.redirect).toHaveBeenCalledWith(expect.any(String));
  });

  test('should upload multiple documents when multiple files are provided', async () => {
    const req = createRequest();
    const handlers = createHandlers();
    const file1 = { name: 'test1.pdf', data: '', mimetype: 'application/pdf' };
    const file2 = { name: 'test2.pdf', data: '', mimetype: 'application/pdf' };
    req.files = {
      documents: [file1, file2],
    };

    uploadMultipleDocumentsMock.mockResolvedValue([
      { ...documentDetail, document: { ...documentDetail.document, document_filename: 'test1.pdf' } },
      { ...documentDetail, document: { ...documentDetail.document, document_filename: 'test2.pdf' } },
    ]);

    await uploadDocument(req, handlers);

    expect(req.session.userCase.applicantUploadFiles).toHaveLength(2);
    expect(uploadMultipleDocumentsMock).toHaveBeenCalledWith(req.session.user, {
      files: [file1, file2],
    });
    expect(handlers.redirect).toHaveBeenCalledWith(expect.any(String));
  });

  test('should set error when files are not present', async () => {
    const req = createRequest();
    const handlers = createHandlers();
    delete req.files;

    await uploadDocument(req, handlers);

    expect(req.session.errors).toContainEqual(
      expect.objectContaining({
        errorType: 'noStatementOrFile',
      })
    );
    expect(uploadMultipleDocumentsMock).not.toHaveBeenCalled();
    expect(handlers.redirect).toHaveBeenCalledWith(expect.any(String));
  });

  test('should set error when uploadDocument status is not success', async () => {
    const req = createRequest();
    const handlers = createHandlers();

    uploadMultipleDocumentsMock.mockResolvedValue([
      {
        ...documentDetail,
        status: '',
      },
    ]);

    await uploadDocument(req, handlers);

    expect(req.session.errors).toContainEqual(
      expect.objectContaining({
        errorType: 'uploadError',
      })
    );
    expect(req.session.userCase.applicantUploadFiles).toHaveLength(0);
    expect(handlers.redirect).toHaveBeenCalledWith(expect.any(String));
  });

  test('should set error when uploadDocument throws an error', async () => {
    const req = createRequest();
    const handlers = createHandlers();

    uploadMultipleDocumentsMock.mockRejectedValueOnce(new Error('Upload failed'));

    await uploadDocument(req, handlers);

    expect(req.session.errors).toContainEqual(
      expect.objectContaining({
        errorType: 'uploadError',
      })
    );
    expect(req.session.userCase.applicantUploadFiles).toHaveLength(0);
    expect(handlers.redirect).toHaveBeenCalledWith(expect.any(String));
  });
});
