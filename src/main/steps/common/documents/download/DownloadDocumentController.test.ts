import { AxiosResponse } from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { UserRole } from '../../../../app/case/definition';
import { DocumentCategory } from '../definitions';

import DownloadDocumentController from './DownloadDocumentController';
import { DOCUMENT_LANGUAGE } from './utils';

jest.mock('../../../../app/case/CosApiClient');
const req = mockRequest();
const res = mockResponse();

const controller = new DownloadDocumentController();
const downloadDocumentMock = jest.spyOn(CosApiClient.prototype, 'downloadDocument');

jest.mock('config');
jest.mock('axios');
jest.mock('../../../../app/auth/service/get-service-auth-token');

test('should throw error when fail to download', () => {
  downloadDocumentMock.mockRejectedValueOnce({
    response: {
      status: 500,
    },
    config: {
      method: 'GET',
    },
  });
  expect(controller.download(req, res)).rejects.toThrow('Error occured, cannot download the document.');
});
describe('DownloadDocumentController', () => {
  beforeEach(() => {
    downloadDocumentMock.mockResolvedValue({
      document_url: 'document_url/123',
      document_filename: 'c100_final_document',
      document_binary_url: 'document_url/123/binary',
      responseType: 'arraybuffer',
      headers: {
        'user-id': 'userId',
        'user-roles': UserRole.CITIZEN,
      },
    } as unknown as AxiosResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should download correct document c100 final english', () => {
    req.session.userCase = {
      ...mockUserCase,
      finalDocument: {
        document_url: 'document_url/123',
        document_filename: 'c100_final_document',
        document_binary_url: 'document_url/123/binary',
      },
    };
    (req.session.user = {
      idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'c100-application',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.ENGLISH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document c100 draft welsh', () => {
    req.session.userCase = {
      ...mockUserCase,
      c100DraftDocWelsh: {
        document_url: 'document_url/123',
        document_filename: 'c100_final_document',
        document_binary_url: 'document_url/123/binary',
      },
    };
    (req.session.user = {
      idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'c100-application',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.WELSH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document fl401-application welsh', () => {
    req.session.userCase = {
      ...mockUserCase,
      finalWelshDocument: {
        document_url: 'document_url/123',
        document_filename: 'c100_final_document',
        document_binary_url: 'document_url/123/binary',
      },
    };
    (req.session.user = {
      idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'fl401-application',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.WELSH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document cada-document english', () => {
    req.session.userCase = {
      ...mockUserCase,
      finalDocument: {
        document_url: 'document_url/123',
        document_filename: 'c100_final_document',
        document_binary_url: 'document_url/123/binary',
      },
    };
    (req.session.user = {
      idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'cada-document',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.ENGLISH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document aoh-document english', () => {
    req.session.userCase = {
      ...mockUserCase,
      c1ADocument: {
        document_url: 'document_url/123',
        document_filename: 'c100_final_document',
        document_binary_url: 'document_url/123/binary',
      },
    };
    (req.session.user = {
      idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'aoh-document',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.ENGLISH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document aoh-document welsh', () => {
    req.session.userCase = {
      ...mockUserCase,
      c1AWelshDocument: {
        document_url: 'document_url/123',
        document_filename: 'c100_final_document',
        document_binary_url: 'document_url/123/binary',
      },
    };
    (req.session.user = {
      idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'aoh-document',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.WELSH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document c7-response-document English', () => {
    req.session.userCase = {
      ...mockUserCase,
      respondentDocuments: [
        {
          partyId: '1234',
          partyType: 'respondent',
          categoryId: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
          uploadedBy: 'test user',
          uploadedDate: '01/01/2024',
          reviewedDate: '01/01/2024',
          documentLanguage: DOCUMENT_LANGUAGE.ENGLISH,
          document: {
            document_url: 'MOCK_DOCUMENT_URL',
            document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_hash: null,
            category_id: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
            document_creation_date: '01/01/2024',
          },
          documentWelsh: null,
        },
      ],
    };
    (req.session.user = {
      id: '1234',
      idamId: '1234',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'c7-response-document',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.ENGLISH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document c7-response-document Welsh', () => {
    req.session.userCase = {
      ...mockUserCase,
      respondentDocuments: [
        {
          partyId: '1234',
          partyType: 'respondent',
          categoryId: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
          uploadedBy: 'test user',
          uploadedDate: '01/01/2024',
          reviewedDate: '01/01/2024',
          documentLanguage: DOCUMENT_LANGUAGE.WELSH,
          document: {
            document_url: 'MOCK_DOCUMENT_URL',
            document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_hash: null,
            category_id: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
            document_creation_date: '01/01/2024',
          },
          documentWelsh: null,
        },
      ],
    };
    (req.session.user = {
      id: '1234',
      idamId: '1234',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'c7-response-document',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.WELSH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document c1a-application-document Welsh', () => {
    req.session.userCase = {
      ...mockUserCase,
      respondentDocuments: [
        {
          partyId: '1234',
          partyType: 'respondent',
          categoryId: DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION,
          uploadedBy: 'test user',
          uploadedDate: '01/01/2024',
          reviewedDate: '01/01/2024',
          documentLanguage: DOCUMENT_LANGUAGE.WELSH,
          document: {
            document_url: 'MOCK_DOCUMENT_URL',
            document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_hash: null,
            category_id: DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION,
            document_creation_date: '01/01/2024',
          },
          documentWelsh: null,
        },
      ],
    };
    (req.session.user = {
      id: '1234',
      idamId: '1234',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'c1a-application-document',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.WELSH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document c1a-application-document English', () => {
    req.session.userCase = {
      ...mockUserCase,
      respondentDocuments: [
        {
          partyId: '1234',
          partyType: 'respondent',
          categoryId: DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION,
          uploadedBy: 'test user',
          uploadedDate: '01/01/2024',
          reviewedDate: '01/01/2024',
          documentLanguage: DOCUMENT_LANGUAGE.ENGLISH,
          document: {
            document_url: 'MOCK_DOCUMENT_URL',
            document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_hash: null,
            category_id: DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION,
            document_creation_date: '01/01/2024',
          },
          documentWelsh: null,
        },
      ],
    };
    (req.session.user = {
      id: '1234',
      idamId: '1234',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'c1a-application-document',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.ENGLISH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document c1a-response-document English', () => {
    req.session.userCase = {
      ...mockUserCase,
      respondentDocuments: [
        {
          partyId: '1234',
          partyType: 'respondent',
          categoryId: DocumentCategory.RESPONDENT_RESPOND_TO_C1A,
          uploadedBy: 'test user',
          uploadedDate: '01/01/2024',
          reviewedDate: '01/01/2024',
          documentLanguage: DOCUMENT_LANGUAGE.ENGLISH,
          document: {
            document_url: 'MOCK_DOCUMENT_URL',
            document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_hash: null,
            category_id: DocumentCategory.RESPONDENT_RESPOND_TO_C1A,
            document_creation_date: '01/01/2024',
          },
          documentWelsh: null,
        },
      ],
    };
    (req.session.user = {
      id: '1234',
      idamId: '1234',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'c1a-response-document',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.ENGLISH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
  test('should download correct document c1a-response-document welsh', () => {
    req.session.userCase = {
      ...mockUserCase,
      respondentDocuments: [
        {
          partyId: '1234',
          partyType: 'respondent',
          categoryId: DocumentCategory.RESPONDENT_RESPOND_TO_C1A,
          uploadedBy: 'test user',
          uploadedDate: '01/01/2024',
          reviewedDate: '01/01/2024',
          documentLanguage: DOCUMENT_LANGUAGE.WELSH,
          document: {
            document_url: 'MOCK_DOCUMENT_URL',
            document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_hash: null,
            category_id: DocumentCategory.RESPONDENT_RESPOND_TO_C1A,
            document_creation_date: '01/01/2024',
          },
          documentWelsh: null,
        },
      ],
    };
    (req.session.user = {
      id: '1234',
      idamId: '1234',
      email: 'test@example.net',
    }),
      (req.params = {
        documentId: '',
        documentName: '',
        documentType: 'c1a-response-document',
        forceDownload: '',
        language: DOCUMENT_LANGUAGE.WELSH,
      });
    controller.download(req, res);
    expect(downloadDocumentMock).toHaveBeenCalled;
    expect(res.end).toHaveBeenCalled;
  });
});
