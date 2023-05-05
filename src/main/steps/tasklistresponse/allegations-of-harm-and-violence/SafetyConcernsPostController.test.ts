import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { RESPOND_TO_APPLICATION } from '../../urls';

import { SafetyConcernsPostController } from './SafetyConcernsPostController';

jest.mock('../../../app/case/CosApiClient');
const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');

describe('SafetyConcernsPostController', () => {
  const safetyConcernsPostController = new SafetyConcernsPostController();
  const req = mockRequest();
  const res = mockResponse();

  beforeEach(() => {
    req.session.user = {
      ...req.session.user,
      id: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
    };
    req.session.userCase = {
      ...req.session.userCase,
      state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'TestUser',
            lastName: 'Citizen',
            email: 'test@example.net',
            user: {
              idamId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
              email: 'test1234@example.net',
            },
            response: {},
          },
        },
      ],
      caseInvites: [
        {
          id: '577695bd-2fb5-4418-a699-79ee352ed5bb',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'respondent2@example.net',
            accessCode: '3GYFGJHO',
            invitedUserId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
            hasLinked: 'Yes',
            expiryDate: '2023-05-07',
            isApplicant: 'No',
          },
        },
      ],
      caseTypeOfApplication: 'C100',
      PRL_c1A_haveSafetyConcerns: 'No',
    };
  });

  afterEach(() => {
    updateCaserMock.mockClear();
  });

  test('Should update the userCase for safety concerns when updateCaseData API is success', async () => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    await safetyConcernsPostController.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.safetyConcerns).toEqual(
      expect.objectContaining({
        haveSafetyConcerns: 'No',
      })
    );
    expect(res.redirect).toHaveBeenCalledWith(RESPOND_TO_APPLICATION);
  });

  test('Should not update the userCase for safety concerns when updateCaseData API is throwing error', async () => {
    updateCaserMock.mockRejectedValue({ message: 'MOCK_ERROR', response: { status: 500, data: 'Error' } });
    await expect(safetyConcernsPostController.post(req, res)).rejects.toThrow(
      'SafetyConcernsPostController - Case could not be updated.'
    );
  });
});
