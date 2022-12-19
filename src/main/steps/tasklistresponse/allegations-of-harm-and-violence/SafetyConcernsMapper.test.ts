import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { getSafetyConcerns, setSafetyConcerns } from './SafetyConcernsMapper';

let respondents;

describe('SafetyConcernsMapper', () => {
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

  test('When no child safetyconcerns are present,set respondent concerns', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.c1A_safteyConcerns = {};
    await setSafetyConcerns(respondents[0], req);
    expect(respondents[0].value.response.safetyConcerns).toBeDefined;
  });

  test('Should setMIAM miamStart No miamWillingness Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.c1A_safteyConcerns = {
      child: {
        physicalAbuse: {
          childrenConcernedAbout: ['abcd'],
        },
      },
    };
    req.session.userCase.c1A_concernAboutChild = ['physicalAbuse'];
    await setSafetyConcerns(respondents[0], req);
    expect(respondents[0].value.response.safetyConcerns.child.childrenConcernedAbout).toBeDefined;
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
    await getSafetyConcerns(respondents[0], req);
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
    await getSafetyConcerns(respondents[0], req);

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
    await getSafetyConcerns(respondents[0], req);

    expect(req.session.userCase.miamStart).toEqual('No');
    expect(req.session.userCase.miamWillingness).toEqual('No');
    expect(req.session.userCase.miamNotWillingExplnation).toEqual('dummyValue');
  });
});
