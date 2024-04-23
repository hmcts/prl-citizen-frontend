import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { ViewAllDocumentsPostController } from './ViewAllDocumentsPostController';

const updateCaseDataMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
let partyDetails;

describe('ViewAllDocumentsPostController', () => {
  const controller = new ViewAllDocumentsPostController();
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    partyDetails = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Sonali',
          lastName: 'Citizen',
          email: 'abc@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
          address: {
            AddressLine1: 'AddressLine1',
            AddressLine2: 'AddressLine2',
            PostTown: 'PostTown',
            County: 'County',
            PostCode: 'PostCode',
          },
          response: {
            citizenFlags: {},
          },
        },
      },
    ];
    updateCaseDataMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    updateCaseDataMock.mockClear();
  });

  test('Should update the IsresponseInitiated details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.url = 'respondent';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.caseInvites = [
      {
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        },
      },
    ];
    await controller.setResponseInitiatedFlag(req, res);
    expect(req.session.userCase.respondents[0].value.response.citizenFlags.isResponseInitiated).toEqual('Yes');
  });
});
