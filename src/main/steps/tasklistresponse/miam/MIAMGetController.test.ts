import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { MIAMGetController } from './MIAMGetController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');

describe('MIAMGetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };

  const generateContent = content => languages[content.language];
  const miamGetController = new MIAMGetController('page', generateContent);
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
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
  });

  test('Should not get miam details if user id not matches with respondent idamId', async () => {
    await miamGetController.get(req, res);
    expect(req.session.userCase.miam).not.toEqual('Yes');
  });

  test('Should not get miam if user id matches with respondent but there is no consent', async () => {
    const response = {
      legalRepresentation: 'Yes',
    };
    req.session.userCase.respondents[0].value.response = response;
    await miamGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should not get miam if user id matches with respondent but there is no miam response details', async () => {
    const response = {
      miam: {},
    };
    req.session.userCase.respondents[0].value.response = response;
    await miamGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should get miam if user id matches with respondent', async () => {
    const response = {
      miam: {
        attendedMiam: 'Yes',
        willingToAttendMiam: 'No',
        reasonNotAttendingMiam: '',
      },
    };
    req.session.userCase.respondents[0].value.response = response;
    await miamGetController.get(req, res);
    expect(req.session.userCase.miamStart).toEqual('Yes');
    expect(req.session.userCase.miamWillingness).toEqual('No');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('');
  });

  test('Should get miam if user id matches with respondent1', async () => {
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: 'Yes',
        reasonNotAttendingMiam: '',
      },
    };
    req.session.userCase.respondents[0].value.response = response;
    await miamGetController.get(req, res);
    expect(req.session.userCase.miamStart).toEqual('No');
    expect(req.session.userCase.miamWillingness).toEqual('Yes');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('');
  });

  test('Should get miam if user id matches with respondent2', async () => {
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: 'No',
        reasonNotAttendingMiam: 'dummy_value',
      },
    };
    req.session.userCase.respondents[0].value.response = response;
    await miamGetController.get(req, res);
    expect(req.session.userCase.miamStart).toEqual('No');
    expect(req.session.userCase.miamWillingness).toEqual('No');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('dummy_value');
  });
});
