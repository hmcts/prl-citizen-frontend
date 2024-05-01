import { AxiosResponse } from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../case/CosApiClient';
import { Document } from '../case/definition';

import { RespondentSubmitResponseController } from './RespondentSubmitResponseController';

describe('RespondentSubmitResponseController', () => {
  const controller = new RespondentSubmitResponseController();
  const req = mockRequest();
  const res = mockResponse();
  const submitRespondentResponseMock = jest.spyOn(CosApiClient.prototype, 'submitRespondentResponse');
  const generateC7DraftDocumenteMock = jest.spyOn(CosApiClient.prototype, 'generateC7DraftDocument');
  const downloadDocumentDocumenteMock = jest.spyOn(CosApiClient.prototype, 'downloadDocument');
  let partyDetails;
  const document = {
    status: 1,
    document_url:
      'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
    document_filename: 'MOCK_FILENAME',
  };
  beforeEach(() => {
    submitRespondentResponseMock.mockResolvedValue(req.session.userCase);
    generateC7DraftDocumenteMock.mockResolvedValue(document as unknown as Document);
    downloadDocumentDocumenteMock.mockResolvedValue({
      headers: { 'content-type': 'test' },
      data: {},
    } as unknown as AxiosResponse);
  });
  afterEach(() => {
    submitRespondentResponseMock.mockClear();
    generateC7DraftDocumenteMock.mockClear();
  });

  test('getDraftDocument', async () => {
    req.session.userCase.id = '12234567890';
    req.session.user.id = '1234';
    req.session.userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '1234',
          value: {
            response: {
              citizenFlags: {},
            },
            user: {
              idamId: '1234',
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '1234',
            invitedUserId: '1234',
          },
        },
      ],
    };
    await controller.generateAndDownloadC7ResponseDraftDocument(req, res);
    await new Promise(process.nextTick);
    expect(res.end).toHaveBeenCalledTimes(1);
  });
  test('getDraftDocument with error', async () => {
    generateC7DraftDocumenteMock.mockRejectedValue({ status: '500' });
    req.session.userCase.id = '12234567890';
    req.session.user.id = '1234';
    req.session.userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '1234',
          value: {
            response: {
              citizenFlags: {},
            },
            user: {
              idamId: '1234',
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '1234',
            invitedUserId: '1234',
          },
        },
      ],
    };
    req.session.userCase.respondents = partyDetails;
    await expect(controller.generateAndDownloadC7ResponseDraftDocument(req, res)).rejects.toThrow();
  });
});
