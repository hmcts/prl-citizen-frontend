import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { YesOrNo } from '../../../app/case/definition';

import {
  getKeepYourDetailsPrivate,
  mapConfidentialListToFields,
  setKeepYourDetailsPrivate,
} from './KeepYourDetailsPrivateMapper';

let respondents;

describe('KeepYourDetailsPrivateMapper', () => {
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

  test('Should setKeepYourDetailsPrivate without response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'Yes';
    await setKeepYourDetailsPrivate(respondents[0].value, req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should setKeepYourDetailsPrivate with response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'Yes';
    const response = {
      legalRepresentation: 'No',
    };
    respondents[0].value.response = response;
    await setKeepYourDetailsPrivate(respondents[0].value, req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should setKeepYourDetailsPrivate without keepDetailsPrivate', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'Yes';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: '',
    };
    respondents[0].value.response = response;
    await setKeepYourDetailsPrivate(respondents[0].value, req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should setKeepYourDetailsPrivate with keepDetailsPrivate', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'Yes';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: '',
        confidentiality: '',
        confidentialityList: [],
      },
    };
    respondents[0].value.response = response;
    await setKeepYourDetailsPrivate(respondents[0].value, req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should getKeepYourDetailsPrivate with consent Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'Yes',
        confidentiality: 'No',
      },
    };
    respondents[0].value.response = response;
    await getKeepYourDetailsPrivate(respondents[0].value, req);
    expect(req.session.userCase.detailsKnown).toEqual('Yes');
    expect(req.session.userCase.startAlternative).toEqual('No');
  });

  test('Should getKeepYourDetailsPrivate with keepDetailsPrivate No', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'No',
        confidentiality: 'No',
      },
    };
    respondents[0].value.response = response;
    await getKeepYourDetailsPrivate(respondents[0].value, req);
    expect(req.session.userCase.detailsKnown).toEqual('No');
    expect(req.session.userCase.startAlternative).toEqual('No');
  });

  test('Should getKeepYourDetailsPrivate with confidentiality Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'No',
        confidentiality: 'Yes',
        confidentialityList: ['address', 'phoneNumber'],
      },
    };
    respondents[0].value.response = response;
    await getKeepYourDetailsPrivate(respondents[0].value, req);
    expect(req.session.userCase.detailsKnown).toEqual('No');
    expect(req.session.userCase.startAlternative).toEqual('Yes');
  });

  test('Should setKeepYourDetailsPrivate with confidentiality Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.contactDetailsPrivate = ['phoneNumber', 'email', 'address'];
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'No',
        confidentiality: 'Yes',
        confidentialityList: ['address', 'phoneNumber'],
      },
    };

    const expected = {
      keepDetailsPrivate: {
        confidentiality: 'Yes',
        confidentialityList: ['phoneNumber', 'email', 'address'],
        otherPeopleKnowYourContactDetails: 'No',
      },
      legalRepresentation: 'No',
    };
    respondents[0].value.response = response;
    expect(setKeepYourDetailsPrivate(respondents[0].value, req).response).toEqual(expected);
  });

  test('Should setKeepYourDetailsPrivate with confidentiality No', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.startAlternative = YesOrNo.NO;
    req.session.userCase.contactDetailsPrivate = [];
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'No',
        confidentiality: 'Yes',
        confidentialityList: ['address', 'phoneNumber'],
      },
    };

    const expected = {
      keepDetailsPrivate: {
        confidentiality: 'No',
        confidentialityList: [],
        otherPeopleKnowYourContactDetails: 'No',
      },
      legalRepresentation: 'No',
    };
    respondents[0].value.response = response;
    expect(setKeepYourDetailsPrivate(respondents[0].value, req).response).toEqual(expected);
  });

  test('mapConfidentialListToFields', async () => {
    const partyDetails = {
      ...respondents[0].value,
      response: {
        legalRepresentation: 'No',
        keepDetailsPrivate: {
          otherPeopleKnowYourContactDetails: 'No',
          confidentiality: 'Yes',
          confidentialityList: ['phoneNumber'],
        },
      },
    };
    expect(mapConfidentialListToFields(partyDetails).isAddressConfidential === 'No');
    expect(mapConfidentialListToFields(partyDetails).isPhoneNumberConfidential === 'Yes');
    expect(mapConfidentialListToFields(partyDetails).isEmailAddressConfidential === 'No');
  });
});
