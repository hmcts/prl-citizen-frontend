import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { YesOrNo } from '../../../app/case/definition';

import {
  mapConfidentialListToFields,
  mapKeepYourDetailsPrivate,
  prepareKeepDetailsPrivateRequest,
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
          response: {},
        },
      },
    ];
  });

  test('Should prepare keepDetailsPrivate request without response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'Yes';
    respondents[0].value = await prepareKeepDetailsPrivateRequest(req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should prepare keepDetailsPrivate request with response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'Yes';
    const response = {
      legalRepresentation: 'No',
    };
    respondents[0].value.response = response;
    respondents[0].value = await prepareKeepDetailsPrivateRequest(req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should prepare keepDetailsPrivate request without keepDetailsPrivate', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'Yes';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: '',
    };
    respondents[0].value.response = response;
    respondents[0].value = await prepareKeepDetailsPrivateRequest(req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should prepare keepDetailsPrivate request with keepDetailsPrivate', async () => {
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
    respondents[0].value = await prepareKeepDetailsPrivateRequest(req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should prepare keepDetailsPrivate request with confidentialityList details', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.contactDetailsPrivate = ['address', 'phoneNumber'];
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: '',
        confidentiality: '',
        confidentialityList: [],
      },
    };
    respondents[0].value.response = response;
    respondents[0].value = await prepareKeepDetailsPrivateRequest(req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentialityList).toEqual(['address', 'phoneNumber']);
  });

  test('Should delete confidentialityList from request when confidentiality is No', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.detailsKnown = 'Yes';
    req.session.userCase.startAlternative = 'No';
    req.session.userCase.contactDetailsPrivate = ['address', 'phoneNumber'];
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: '',
        confidentiality: '',
        confidentialityList: [],
      },
    };
    respondents[0].value.response = response;
    respondents[0].value = await prepareKeepDetailsPrivateRequest(req);
    expect(respondents[0].value.response.keepDetailsPrivate.otherPeopleKnowYourContactDetails).toEqual('Yes');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('No');
    expect(respondents[0].value.response.keepDetailsPrivate.confidentialityList).toEqual(undefined);
  });

  test('Should map keepDetailsPrivate data when otherPeopleKnowYourContactDetails is Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'Yes',
        confidentiality: 'No',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase = mapKeepYourDetailsPrivate(respondents[0].value);
    expect(req.session.userCase.detailsKnown).toEqual('Yes');
    expect(req.session.userCase.startAlternative).toEqual('No');
  });

  test('Should map keepDetailsPrivate data when confidentiality is Yes and otherPeopleKnowYourContactDetails is Yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'Yes',
        confidentiality: 'Yes',
        confidentialityList: ['address', 'phoneNumber'],
      },
    };
    respondents[0].value.response = response;
    req.session.userCase = mapKeepYourDetailsPrivate(respondents[0].value);
    expect(req.session.userCase.detailsKnown).toEqual('Yes');
    expect(req.session.userCase.startAlternative).toEqual('Yes');
    expect(req.session.userCase.contactDetailsPrivate).toEqual(['address', 'phoneNumber']);
  });

  test('Should map keepDetailsPrivate data when otherPeopleKnowYourContactDetails is No', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'No',
        confidentiality: 'No',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase = mapKeepYourDetailsPrivate(respondents[0].value);
    expect(req.session.userCase.detailsKnown).toEqual('No');
    expect(req.session.userCase.startAlternative).toEqual('No');
  });

  test('Should map keepDetailsPrivate data when confidentiality is Yes', async () => {
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
    req.session.userCase = mapKeepYourDetailsPrivate(respondents[0].value);
    expect(req.session.userCase.detailsKnown).toEqual('No');
    expect(req.session.userCase.startAlternative).toEqual('Yes');
    expect(req.session.userCase.contactDetailsPrivate).toEqual(['address', 'phoneNumber']);
  });

  test("Should map keepDetailsPrivate data when I don't know is selected", async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'I dont know',
        confidentiality: 'No',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase = mapKeepYourDetailsPrivate(respondents[0].value);
    expect(req.session.userCase.detailsKnown).toEqual('I dont know');
    expect(req.session.userCase.startAlternative).toEqual('No');
  });

  test("Should map keepDetailsPrivate data when confidentiality is Yes and I don't know is selected", async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'I dont know',
        confidentiality: 'Yes',
        confidentialityList: ['address', 'phoneNumber'],
      },
    };
    respondents[0].value.response = response;
    req.session.userCase = mapKeepYourDetailsPrivate(respondents[0].value);
    expect(req.session.userCase.detailsKnown).toEqual('I dont know');
    expect(req.session.userCase.startAlternative).toEqual('Yes');
    expect(req.session.userCase.contactDetailsPrivate).toEqual(['address', 'phoneNumber']);
  });

  test('Should not map confidentialityList when confidentiality is No', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'I dont know',
        confidentiality: 'No',
        confidentialityList: ['address', 'phoneNumber'],
      },
    };
    respondents[0].value.response = response;
    req.session.userCase = mapKeepYourDetailsPrivate(respondents[0].value);
    expect(req.session.userCase.detailsKnown).toEqual('I dont know');
    expect(req.session.userCase.startAlternative).toEqual('No');
    expect(req.session.userCase.contactDetailsPrivate).toEqual(undefined);
  });

  test('Should map confidential list items to fields', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    const response = {
      legalRepresentation: 'No',
      keepDetailsPrivate: {
        otherPeopleKnowYourContactDetails: 'Yes',
        confidentiality: 'No',
        confidentialityList: ['address', 'phoneNumber'],
      },
    };
    respondents[0].value.response = response;
    req.session.userCase = mapConfidentialListToFields(respondents[0].value);
    expect(req.session.userCase.isAddressConfidential).toEqual(YesOrNo.YES);
    expect(req.session.userCase.isEmailAddressConfidential).toEqual(YesOrNo.NO);
    expect(req.session.userCase.isPhoneNumberConfidential).toEqual(YesOrNo.YES);
  });
});
