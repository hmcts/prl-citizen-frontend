import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import { HearingsGetController } from './HearingsGetController';

const getHearings = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');

describe('HearingsGetController', () => {
  const controller = new HearingsGetController();
  const res = mockResponse();
  let req = mockRequest({
    session: {
      user: {
        id: '123',
      },
      userCase: {
        caseTypeOfApplication: 'C100',
        caseInvites: [
          {
            id: '123',
            value: {
              partyId: '123',
              caseInviteEmail: 'respondent2@example.net',
              accessCode: '3GYFGJHO',
              invitedUserId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
              hasLinked: 'Yes',
              expiryDate: '2023-05-07',
              isApplicant: 'Yes',
            },
          },
        ],
      },
    },
  });

  beforeEach(() => {
    getHearings.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    getHearings.mockClear();
  });

  test('Should get the details of previous hearings', async () => {
    await controller.get(req, res);
    expect(res.render).toBeCalled;
  });
  test('Should get the details of previous hearings for respondents', async () => {
    req = mockRequest({
      session: {
        user: {
          id: '123',
          idamId: '123',
        },
        userCase: {
          caseTypeOfApplication: 'C100',
          caseInvites: [
            {
              id: '123',
              value: {
                partyId: '123',
                caseInviteEmail: 'respondent2@example.net',
                accessCode: '3GYFGJHO',
                invitedUserId: '123',
                hasLinked: 'Yes',
                expiryDate: '2023-05-07',
                isApplicant: 'No',
              },
            },
          ],
          respondents: [
            {
              id: '123',
              value: {
                user: {
                  idamId: '123',
                },
              },
            },
          ],
        },
      },
    });
    await controller.get(req, res);
    expect(res.render).toBeCalled;
  });
});
