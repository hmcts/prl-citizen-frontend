import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { getConsentDetails, setConsentDetails } from './ConsentMapper';

let respondents;

describe('ConsentMapper', () => {
  const req = mockRequest();
  beforeEach(() => {
    respondents = [
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
          response: '',
        },
      },
    ];
  });

  test('Should setConsentDetails without response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.courtPermission = 'Yes';
    await setConsentDetails(respondents[0], req);
    expect(respondents[0].value.response.consent.consentToTheApplication).toEqual('Yes');
    expect(respondents[0].value.response.consent.permissionFromCourt).toEqual('Yes');
  });

  test('Should setConsentDetails with response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.courtPermission = 'Yes';
    const response = {
      legalRepresentation: 'No',
    };
    respondents[0].value.response = response;
    await setConsentDetails(respondents[0], req);
    expect(respondents[0].value.response.consent.consentToTheApplication).toEqual('Yes');
    expect(respondents[0].value.response.consent.permissionFromCourt).toEqual('Yes');
  });

  test('Should setConsentDetails with consent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.courtPermission = 'Yes';
    const response = {
      legalRepresentation: 'No',
      consent: '',
    };
    respondents[0].value.response = response;
    await setConsentDetails(respondents[0], req);
    expect(respondents[0].value.response.consent.consentToTheApplication).toEqual('Yes');
    expect(respondents[0].value.response.consent.permissionFromCourt).toEqual('Yes');
  });

  test('Should getConsentDetails with consent Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      consent: {
        consentToTheApplication: 'Yes',
        applicationReceivedDate: '2022/09/15',
        permissionFromCourt: 'No',
      },
    };
    respondents[0].value.response = response;
    await getConsentDetails(respondents[0], req);
    expect(req.session.userCase.doYouConsent).toEqual('Yes');
    expect(req.session.userCase.courtPermission).toEqual('No');
  });

  test('Should getConsentDetails with consent No', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      consent: {
        consentToTheApplication: 'No',
        applicationReceivedDate: '2022/09/15',
        permissionFromCourt: 'No',
      },
    };
    respondents[0].value.response = response;
    await getConsentDetails(respondents[0], req);
    expect(req.session.userCase.doYouConsent).toEqual('No');
    expect(req.session.userCase.courtPermission).toEqual('No');
  });

  test('Should getConsentDetails with permissionFromCourt Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      consent: {
        consentToTheApplication: 'No',
        applicationReceivedDate: '2022/09/15',
        permissionFromCourt: 'Yes',
      },
    };
    respondents[0].value.response = response;
    await getConsentDetails(respondents[0], req);
    expect(req.session.userCase.doYouConsent).toEqual('No');
    expect(req.session.userCase.courtPermission).toEqual('Yes');
  });
});
