import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { mapConsentToApplicationDetails, prepareRequest } from './ConsentMapper';

let respondents;

describe('ConsentMapper', () => {
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

  it('should set consent fields correctly if doYouConsent is YES and courtPermission is NO', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.reasonForNotConsenting = '';
    req.session.userCase.courtPermission = 'No';
    req.session.userCase.courtOrderDetails = '';

    respondents[0].value.response.consent = await prepareRequest(req.session.userCase);

    expect(respondents[0].value.response.consent.consentToTheApplication).toEqual('Yes');
    expect(respondents[0].value.response.consent.reasonForNotConsenting).toBeUndefined();
    expect(respondents[0].value.response.consent.permissionFromCourt).toEqual('No');
    expect(respondents[0].value.response.consent.courtOrderDetails).toBeUndefined();
  });

  it('should set consent fields correctly if doYouConsent is NO and courtPermission is YES', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.doYouConsent = 'No';
    req.session.userCase.reasonForNotConsenting = 'sample test here';
    req.session.userCase.courtPermission = 'Yes';
    req.session.userCase.courtOrderDetails = 'sample test here';

    respondents[0].value.response.consent = await prepareRequest(req.session.userCase);

    expect(respondents[0].value.response.consent.consentToTheApplication).toEqual('No');
    expect(respondents[0].value.response.consent.noConsentReason).toEqual('sample test here');
    expect(respondents[0].value.response.consent.permissionFromCourt).toEqual('Yes');
    expect(respondents[0].value.response.consent.noConsentReason).toEqual('sample test here');
    expect(respondents[0].value.response.consent.noConsentReason).not.toBeFalsy();
  });

  it('should set delete reasonForNotConsenting if doYouConsent is Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.reasonForNotConsenting = 'sample test here';

    respondents[0].value.response.consent = await prepareRequest(req.session.userCase);

    expect(respondents[0].value.response.consent.consentToTheApplication).toEqual('Yes');
    expect(respondents[0].value.response.consent.noConsentReason).toBeUndefined();
  });

  it('should set delete courtOrderDetails if courtPermission is No', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.courtPermission = 'No';
    req.session.userCase.courtOrderDetails = 'sample test here';

    respondents[0].value.response.consent = await prepareRequest(req.session.userCase);

    expect(respondents[0].value.response.consent.permissionFromCourt).toEqual('No');
    expect(respondents[0].value.response.consent.courtOrderDetails).toBeUndefined();
  });

  test('Should mapConsentToApplicationDetails with consentToTheApplication set to YES and permissionFromCourt set to NO', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      consent: {
        consentToTheApplication: 'Yes',
        noConsentReason: '',
        permissionFromCourt: 'No',
        courtOrderDetails: '',
      },
    };
    respondents[0].value.response = response;

    req.session.userCase = await mapConsentToApplicationDetails(respondents[0]);

    expect(req.session.userCase.doYouConsent).toEqual('Yes');
    expect(req.session.userCase.reasonForNotConsenting).toEqual('');

    expect(req.session.userCase.courtPermission).toEqual('No');
    expect(req.session.userCase.courtOrderDetails).toEqual('');
  });

  test('Should mapConsentToApplicationDetails with consentToTheApplication set to NO and permissionFromCourt set to YES', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      consent: {
        consentToTheApplication: 'No',
        noConsentReason: 'test giorgi',
        permissionFromCourt: 'Yes',
        courtOrderDetails: 'test giorgi',
      },
    };
    respondents[0].value.response = response;

    req.session.userCase = await mapConsentToApplicationDetails(respondents[0]);

    expect(req.session.userCase.doYouConsent).toEqual('No');
    expect(req.session.userCase.reasonForNotConsenting).toEqual('test giorgi');

    expect(req.session.userCase.courtPermission).toEqual('Yes');
    expect(req.session.userCase.courtOrderDetails).toEqual('test giorgi');
  });
});
