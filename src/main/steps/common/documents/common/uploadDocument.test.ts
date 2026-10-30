import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import type { ResponseHandlers } from '../upload/utils';

import { uploadDocument } from './uploadDocument';

const uploadDocumentListFromCitizenMock = jest.spyOn(CosApiClient.prototype, 'uploadDocument');

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
      uploadDocumentFileUpload: {
        name: 'test.pdf',
        data: '',
        mimetype: 'application/pdf',
      },
    };

    req.headers.accept = 'text/html';

    return req;
  };

  const createXhrRequest = () => {
    const req = mockRequest({
      body: {
        uploadFile: true,
      },
      headers: {
        'sec-fetch-mode': 'cors',
        accept: 'application/json',
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

  test('should upload document with XHR request', async () => {
    const req = createXhrRequest();
    const handlers = createHandlers();

    uploadDocumentListFromCitizenMock.mockResolvedValue(documentDetail);

    await uploadDocument(req, handlers);

    expect(req.session.userCase.applicantUploadFiles).toStrictEqual([documentDetail.document]);
    expect(uploadDocumentListFromCitizenMock).toHaveBeenCalledWith(req.session.user, {
      files: [req.files.documents],
    });
  });

  test('should upload document with non-XHR request', async () => {
    const req = createRequest();
    const handlers = createHandlers();

    uploadDocumentListFromCitizenMock.mockResolvedValue(documentDetail);

    await uploadDocument(req, handlers);

    expect(req.session.userCase.applicantUploadFiles).toStrictEqual([documentDetail.document]);
    expect(uploadDocumentListFromCitizenMock).toHaveBeenCalledWith(req.session.user, {
      files: [req.files['uploadDocumentFileUpload']],
    });
  });

  test('should set error when files are not present', async () => {
    const req = createXhrRequest();
    const handlers = createHandlers();
    delete req.files;

    await uploadDocument(req, handlers);

    expect(req.session.errors).toContainEqual(
      expect.objectContaining({
        errorType: 'noStatementOrFile',
      })
    );
    expect(uploadDocumentListFromCitizenMock).not.toHaveBeenCalled();
    // expect(handlers.redirect).toHaveBeenCalledWith(expect.any(String));
  });

  test('should set error when uploadDocument status is not success', async () => {
    const req = createXhrRequest();
    const handlers = createHandlers();

    uploadDocumentListFromCitizenMock.mockResolvedValue({
      ...documentDetail,
      status: '',
    });

    await uploadDocument(req, handlers);

    expect(req.session.errors).toContainEqual(
      expect.objectContaining({
        errorType: 'uploadError',
      })
    );
    expect(req.session.userCase.applicantUploadFiles).toHaveLength(0);
  });

  test('should set error when uploadDocument throws an error', async () => {
    const req = createXhrRequest();
    const handlers = createHandlers();

    uploadDocumentListFromCitizenMock.mockRejectedValueOnce(new Error('Upload failed'));

    await uploadDocument(req, handlers);

    expect(req.session.errors).toContainEqual(
      expect.objectContaining({
        errorType: 'uploadError',
      })
    );
    expect(req.session.userCase.applicantUploadFiles).toHaveLength(0);
  });
});
