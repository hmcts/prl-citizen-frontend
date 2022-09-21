import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { MIAMGetController } from './MIAMGetController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let respondents;

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
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Test1234',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
          },
          response: '',
        },
      },
    ];
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
  });

  test('Should not get miam details if user id not matches with respondent idamId', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';

    req.session.userCase.respondents = respondents;
    await miamGetController.get(req, res);
    expect(req.session.userCase.miam).not.toEqual('Yes');
  });

  test('Should not get miam if user id matches with respondent but there is no consent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      legalRepresentation: 'Yes',
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await miamGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should not get miam if user id matches with respondent but there is no miam response details', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      miam: {},
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await miamGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should get miam if user id matches with respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      miam: {
        attendedMiam: 'Yes',
        willingToAttendMiam: 'No',
        reasonNotAttendingMiam: '',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await miamGetController.get(req, res);
    expect(req.session.userCase.miamStart).toEqual('Yes');
    expect(req.session.userCase.miamWillingness).toEqual('No');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('');
  });

  test('Should get miam if user id matches with respondent1', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: 'Yes',
        reasonNotAttendingMiam: '',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await miamGetController.get(req, res);
    expect(req.session.userCase.miamStart).toEqual('No');
    expect(req.session.userCase.miamWillingness).toEqual('Yes');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('');
  });

  test('Should get miam if user id matches with respondent2', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: 'No',
        reasonNotAttendingMiam: 'dummy_value',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await miamGetController.get(req, res);
    expect(req.session.userCase.miamStart).toEqual('No');
    expect(req.session.userCase.miamWillingness).toEqual('No');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('dummy_value');
  });
});
