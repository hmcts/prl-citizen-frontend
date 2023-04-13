import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { mapMIAMRequest, prepareMIAMRequest } from './MIAMMapper';

let respondents;

describe('MIAMMapper', () => {
  const req = mockRequest();
  beforeEach(() => {
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'testFirstName',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
          },
          response: {},
        },
      },
    ];
  });

  test('Should setMIAM miamStart Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.miamStart = 'Yes';
    req.session.userCase.miamWillingness = 'Yes';
    expect(prepareMIAMRequest(req.session.userCase).attendedMiam).toEqual('Yes');
    expect(prepareMIAMRequest(req.session.userCase).willingToAttendMiam).toEqual(null);
    expect(prepareMIAMRequest(req.session.userCase).reasonNotAttendingMiam).toEqual('');
  });

  test('Should setMIAM miamStart No miamWillingness Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.miamStart = 'No';
    req.session.userCase.miamWillingness = 'Yes';
    expect(prepareMIAMRequest(req.session.userCase).attendedMiam).toEqual('No');
    expect(prepareMIAMRequest(req.session.userCase).willingToAttendMiam).toEqual('Yes');
    expect(prepareMIAMRequest(req.session.userCase).reasonNotAttendingMiam).toEqual('');
  });

  test('Should setMIAM miamStart No miamWillingness No miamNotWillingExplnation Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.miamStart = 'No';
    req.session.userCase.miamWillingness = 'No';
    req.session.userCase.miamNotWillingExplnation = 'testinputvalue';
    expect(prepareMIAMRequest(req.session.userCase).attendedMiam).toEqual('No');
    expect(prepareMIAMRequest(req.session.userCase).willingToAttendMiam).toEqual('No');
    expect(prepareMIAMRequest(req.session.userCase).reasonNotAttendingMiam).toEqual('testinputvalue');
  });

  test('Should setMIAM miamStart Yes miamWillingness No miamNotWillingExplnation test', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.miamStart = 'Yes';
    req.session.userCase.miamWillingness = 'No';
    req.session.userCase.miamNotWillingExplnation = 'testinputvalue';
    expect(prepareMIAMRequest(req.session.userCase).attendedMiam).toEqual('Yes');
    expect(prepareMIAMRequest(req.session.userCase).willingToAttendMiam).toEqual(null);
    expect(prepareMIAMRequest(req.session.userCase).reasonNotAttendingMiam).toEqual('');
  });

  test('Should setMIAM miamStart Yes miamWillingness No miamNotWillingExplnation testval', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    respondents[0].value.response.miam = {};
    expect(prepareMIAMRequest(req.session.userCase)).toEqual({
      attendedMiam: 'Yes',
      reasonNotAttendingMiam: '',
      willingToAttendMiam: null,
    });
  });

  test('Should getMIAM miamStart Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: null,
        reasonNotAttendingMiam: '',
      },
    };
    respondents[0].value.response = response;
    expect(mapMIAMRequest(respondents[0]).miamStart).toEqual('No');
    expect(mapMIAMRequest(respondents[0]).miamWillingness).toEqual(null);
    expect(mapMIAMRequest(respondents[0]).miamNotWillingExplnation).toEqual('');
  });

  test('Should getMIAM miamStart No miamWillingness Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: 'Yes',
        reasonNotAttendingMiam: '',
      },
    };
    respondents[0].value.response = response;
    expect(mapMIAMRequest(respondents[0]).miamStart).toEqual('No');
    expect(mapMIAMRequest(respondents[0]).miamWillingness).toEqual('Yes');
    expect(mapMIAMRequest(respondents[0]).miamNotWillingExplnation).toEqual('');
  });

  test('Should getMIAM miamStart No miamWillingness No miamNotWillingExplnation Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: 'No',
        reasonNotAttendingMiam: 'dummyValue',
      },
    };
    respondents[0].value.response = response;
    respondents[0].value.response = response;
    expect(mapMIAMRequest(respondents[0]).miamStart).toEqual('No');
    expect(mapMIAMRequest(respondents[0]).miamWillingness).toEqual('No');
    expect(mapMIAMRequest(respondents[0]).miamNotWillingExplnation).toEqual('dummyValue');
  });
});
