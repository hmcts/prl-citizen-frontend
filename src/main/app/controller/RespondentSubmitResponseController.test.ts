import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../case/CosApiClient';

import { RespondentSubmitResponseController } from './RespondentSubmitResponseController';

const { mockGet } = require('../document/DocumentManagementClient');
jest.mock('../document/DocumentManagementClient');
describe('RespondentSubmitResponseController', () => {
  const controller = new RespondentSubmitResponseController();
  const req = mockRequest();
  const res = mockResponse();
  const submitRespondentResponseMock = jest.spyOn(CosApiClient.prototype, 'submitRespondentResponse');
  const generateC7DraftDocumenteMock = jest.spyOn(CosApiClient.prototype, 'generateC7DraftDocument');
  let partyDetails;
  const document = {
    status: 1,
    documentId:
      'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
    documentName: 'MOCK_FILENAME',
  };
  beforeEach(() => {
    submitRespondentResponseMock.mockResolvedValue(req.session.userCase);
    generateC7DraftDocumenteMock.mockResolvedValue(document);
    mockGet.mockResolvedValue('true');
  });
  afterEach(() => {
    submitRespondentResponseMock.mockClear();
    generateC7DraftDocumenteMock.mockClear();
    mockGet.mockClear();
  });

  test('getDraftDocument', async () => {
    req.session.userCase.id = '12234567890';
    req.session.user.id = '12234567890';
    partyDetails = [
      {
        id: '1',
        value: {
          firstName: '',
          lastName: '',
          email: '',
          user: {
            idamId: '12234567890',
            email: '',
          },
        },
      },
    ];
    req.session.userCase.respondents = partyDetails;
    await controller.getDraftDocument(req, res);
    await new Promise(process.nextTick);
    expect(res.end).toHaveBeenCalledTimes(1);
  });
  test('getDraftDocument with error', async () => {
    const document1 = {
      status: 1,
      documentId: '',
      documentName: 'MOCK_FILENAME',
    };
    generateC7DraftDocumenteMock.mockResolvedValue(document1);
    req.session.userCase.id = '12234567890';
    req.session.user.id = '12234567890';
    partyDetails = [
      {
        id: '1',
        value: {
          firstName: '',
          lastName: '',
          email: '',
          user: {
            idamId: '12234567890',
            email: '',
          },
        },
      },
    ];
    req.session.userCase.respondents = partyDetails;
    await expect(controller.getDraftDocument(req, res)).rejects.toThrow('Document url is not found');
  });
});
