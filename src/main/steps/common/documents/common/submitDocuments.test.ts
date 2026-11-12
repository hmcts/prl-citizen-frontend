import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { FormFields } from '../../../../app/form/Form';
import { ResponseHandlers } from '../upload/utils';

import { submitDocuments } from './submitDocuments';

const submitUploadedDocumentsMock = jest.spyOn(CosApiClient.prototype, 'submitUploadedDocuments');

describe('submitDocuments', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormFields;

  const createHandlers = () =>
    ({
      redirect: jest.fn(),
      respondJson: jest.fn(),
    }) as unknown as ResponseHandlers;

  const createRequest = (category = 'your-position-statements', overrides: Record<string, unknown> = {}) =>
    mockRequest({
      body: {
        onlyContinue: true,
      },
      params: {
        docCategory: category,
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
          applicantUploadFiles: [
            {
              document_url: 'http://document-store/documents/test-id',
              document_binary_url: 'string',
              document_filename: 'test.pdf',
              document_hash: 'string',
              document_creation_date: 'string',
              name: 'test.pdf',
            },
          ],
          ...overrides,
        },
      },
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    { category: 'your-position-statements' },
    { category: 'your-witness-statements' },
    { category: 'other-people-witness-statement' },
    { category: 'media-files' },
    { category: 'medical-records' },
    { category: 'letters-from-school' },
    { category: 'tenancy-and-mortgage-agreements' },
    { category: 'medical-reports' },
    { category: 'paternity-test-reports' },
    { category: 'drug-and-alcohol-tests' },
    { category: 'police-disclosures' },
    { category: 'other-documents' },
  ])('should submit documents for category $category', async ({ category }) => {
    const req = createRequest(category);
    const handlers = createHandlers();

    submitUploadedDocumentsMock.mockResolvedValue({
      data: 'Success',
    });

    await submitDocuments(req, mockFormContent, handlers);

    expect(submitUploadedDocumentsMock).toHaveBeenCalledTimes(1);
    expect(submitUploadedDocumentsMock).toHaveBeenCalledWith(
      req.session.user,
      expect.objectContaining({
        caseId: '1234',
        partyId: '1234',
        documents: req.session.userCase.applicantUploadFiles,
      })
    );
    expect(req.session.errors).toEqual([]);
    expect(handlers.redirect).toHaveBeenCalledTimes(1);
  });

  test('should set error when files are not present', async () => {
    const req = createRequest('your-position-statements');
    req.session.userCase.applicantUploadFiles = [];
    const handlers = createHandlers();

    await submitDocuments(req, mockFormContent, handlers);

    expect(submitUploadedDocumentsMock).not.toHaveBeenCalled();
    expect(req.session.errors).toContainEqual(
      expect.objectContaining({
        errorType: 'noStatementOrFile',
        propertyName: 'uploadDocumentFileUpload',
      })
    );
    expect(handlers.redirect).toHaveBeenCalledTimes(1);
  });

  test('should set error when submitUploadedDocuments response is not success', async () => {
    const req = createRequest();
    const handlers = createHandlers();

    submitUploadedDocumentsMock.mockResolvedValue({
      data: '500',
    });

    await submitDocuments(req, mockFormContent, handlers);

    expect(submitUploadedDocumentsMock).toHaveBeenCalledTimes(1);
    expect(req.session.errors).toContainEqual(
      expect.objectContaining({
        errorType: 'uploadError',
        propertyName: 'uploadDocumentFileUpload',
      })
    );
    expect(handlers.redirect).toHaveBeenCalledTimes(1);
  });

  test('should set error when submitUploadedDocuments throws an error', async () => {
    const req = createRequest();
    const handlers = createHandlers();

    submitUploadedDocumentsMock.mockRejectedValueOnce(new Error('Submission failed'));

    await submitDocuments(req, mockFormContent, handlers);

    expect(submitUploadedDocumentsMock).toHaveBeenCalledTimes(1);
    expect(req.session.errors).toContainEqual(
      expect.objectContaining({
        errorType: 'uploadError',
        propertyName: 'uploadDocumentFileUpload',
      })
    );
    expect(handlers.redirect).toHaveBeenCalledTimes(1);
  });
});
