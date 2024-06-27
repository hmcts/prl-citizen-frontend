import { AxiosResponse } from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../case/CosApiClient';
import { CaseType, Document } from '../case/definition';

import { RespondentSubmitResponseController } from './RespondentSubmitResponseController';

describe('RespondentSubmitResponseController', () => {
  const controller = new RespondentSubmitResponseController();
  const req = mockRequest();
  const res = mockResponse();
  const submitRespondentResponseMock = jest.spyOn(CosApiClient.prototype, 'submitC7Response');
  const generateC7DraftDocumenteMock = jest.spyOn(CosApiClient.prototype, 'generateC7DraftDocument');
  const downloadDocumentDocumenteMock = jest.spyOn(CosApiClient.prototype, 'downloadDocument');
  let partyDetails;
  const document = {
    status: 1,
    documentId:
      'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
    documentName: 'MOCK_FILENAME',
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

  test.skip('generateAndDownloadC7ResponseDraftDocument', async () => {
    req.session.userCase.id = '12234567890';
    req.session.userCase.caseTypeOfApplication = CaseType.C100;
    req.session.user.id = '12234567890';
    (req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '12234567890',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '12234567890',
          expiryDate: 'string',
          isApplicant: 'Yes',
        },
      },
    ]),
      (partyDetails = [
        {
          id: '12234567890',
          value: {
            address: {
              AddressLine1: 'Flatc1',
              AddressLine2: 'Unkonwn lane',
              County: 'Dummy County',
              PostCode: 'SW13ND',
              PostTown: 'Dummy Town',
            },
            dateOfBirth: '2000-11-14',
            email: 'a.b@test.com',
            firstName: 'John',
            isAtAddressLessThan5Years: 'Yes',

            phoneNumber: '0987654321',
            placeOfBirth: 'london',
            previousName: 'Johnny Smith',
            user: {
              idamId: '12234567890',
              email: '',
            },
          },
        },
      ]);
    req.session.userCase.respondents = partyDetails;
    await controller.generateAndDownloadC7ResponseDraftDocument(req, res);
    expect(res.end).toHaveBeenCalled();
  });

  test('generateAndDownloadC7ResponseDraftDocument with error', async () => {
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
