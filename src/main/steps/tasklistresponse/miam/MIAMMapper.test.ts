import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { getMIAMDetails, setMIAMDetails } from './MIAMMapper';

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
    expect(setMIAMDetails(req.session.userCase).attendedMiam).toEqual('Yes');
    expect(setMIAMDetails(req.session.userCase).willingToAttendMiam).toEqual('Yes');
    expect(setMIAMDetails(req.session.userCase).reasonNotAttendingMiam).toEqual('');
  });

  test('Should setMIAM miamStart No miamWillingness Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.miamStart = 'No';
    req.session.userCase.miamWillingness = 'Yes';
    expect(setMIAMDetails(req.session.userCase).attendedMiam).toEqual('No');
    expect(setMIAMDetails(req.session.userCase).willingToAttendMiam).toEqual('Yes');
    expect(setMIAMDetails(req.session.userCase).reasonNotAttendingMiam).toEqual('');
  });

  test('Should setMIAM miamStart No miamWillingness No miamNotWillingExplnation Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.miamStart = 'No';
    req.session.userCase.miamWillingness = 'No';
    req.session.userCase.miamNotWillingExplnation = 'testinputvalue';
    expect(setMIAMDetails(req.session.userCase).attendedMiam).toEqual('No');
    expect(setMIAMDetails(req.session.userCase).willingToAttendMiam).toEqual('No');
    expect(setMIAMDetails(req.session.userCase).reasonNotAttendingMiam).toEqual('testinputvalue');
  });

  test('Should setMIAM miamStart Yes miamWillingness No miamNotWillingExplnation test', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.miamStart = 'Yes';
    req.session.userCase.miamWillingness = 'No';
    req.session.userCase.miamNotWillingExplnation = 'testinputvalue';
    expect(setMIAMDetails(req.session.userCase).attendedMiam).toEqual('Yes');
    expect(setMIAMDetails(req.session.userCase).willingToAttendMiam).toEqual('No');
    expect(setMIAMDetails(req.session.userCase).reasonNotAttendingMiam).toEqual('testinputvalue');
  });

  test('Should setMIAM miamStart Yes miamWillingness No miamNotWillingExplnation testval', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    respondents[0].value.response.miam = {};
    expect(setMIAMDetails(req.session.userCase)).toEqual({
      attendedMiam: 'Yes',
      reasonNotAttendingMiam: 'testinputvalue',
      willingToAttendMiam: 'No',
    });
  });

  test('Should getMIAM miamStart Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      miam: {
        attendedMiam: 'Yes',
        willingToAttendMiam: null,
        reasonNotAttendingMiam: null,
      },
    };
    respondents[0].value.response = response;
    await getMIAMDetails(respondents[0], req);
    expect(req.session.userCase.miamStart).toEqual('Yes');
    expect(req.session.userCase.miamWillingness).toEqual('No');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('');
  });

  test('Should getMIAM miamStart No miamWillingness Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: 'Yes',
        reasonNotAttendingMiam: null,
      },
    };
    respondents[0].value.response = response;
    await getMIAMDetails(respondents[0], req);

    expect(req.session.userCase.miamStart).toEqual('No');
    expect(req.session.userCase.miamWillingness).toEqual('Yes');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('');
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
    await getMIAMDetails(respondents[0], req);

    expect(req.session.userCase.miamStart).toEqual('No');
    expect(req.session.userCase.miamWillingness).toEqual('No');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('dummyValue');
  });
});
