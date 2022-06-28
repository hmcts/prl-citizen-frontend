import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { APPLICANT_TASK_LIST_URL } from '../../steps/urls';
import { DocumentType, State } from '../case/definition';

import { DocumentManagerController } from './DocumentManagementController';

const { mockCreate, mockDelete, mockGet } = require('./DocumentManagementClient');

jest.mock('../document/DocumentManagementClient');

describe('DocumentManagerController', () => {
  const documentManagerController = new DocumentManagerController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockDelete.mockClear();
    mockGet.mockClear();
  });

  describe('fetch file', () => {
    it.each([
      {
        state: State.Submitted,
        documentsGenerated: {
          field1: 'documentsGenerated',
        },
        redirectUrl: APPLICANT_TASK_LIST_URL,
      },
    ])('fetch an existing file - %o', async ({ state, documentsGenerated }) => {
      const req = mockRequest({
        userCase: {
          state,
          [documentsGenerated.field1]: [
            { id: '1', value: { documentLink: { document_binary_url: 'object-of-doc-not-to-fetch' } } },
            {
              id: '2',
              value: {
                documentLink: { document_binary_url: 'object-of-doc-to-fetch' },
                documentType: DocumentType.YOUR_APPLICATION_FL401 + 'En',
              },
            },
            { id: '3', value: { documentLink: { document_binary_url: 'object-of-doc-not-to-fetch' } } },
          ],
        },
      });

      req.headers.accept = 'application/pdf';
      const res = mockResponse();

      await documentManagerController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith({
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/4d2af5ad-a8a3-4263-9bbb-b12eb4ad62fe',
      });
    });

    it.each([
      {
        state: State.Submitted,
        generatedFields: {
          field1: 'documentsGenerated',
        },
        redirectUrl: APPLICANT_TASK_LIST_URL,
      },
    ])("redirects if browser doesn't accept JSON/has JavaScript disabled - %o", async ({ redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state: State.Submitted,
          applicant1DocumentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-fetch' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-fetch' } } },
          ],
        },
      });
      const res = mockResponse();

      await documentManagerController.get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
    });

    //   it("fetch throws an error if the case isn't in a Submitted state", async () => {
    //     const req = mockRequest({
    //       userCase: {
    //         state: State.Draft,
    //         documentsGenerated: [
    //           { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-fetch' } } },
    //           { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-fetch' } } },
    //         ],
    //       },
    //     });
    //     const res = mockResponse();

    //     await expect(() => documentManagerController.get(req, res)).rejects.toThrow(
    //       'Cannot display document as the application is not in submitted state'
    //     );
    //   });
  });
});
