import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { ContactPreference } from '../../../../app/case/definition';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

import ReviewContactPreferencePostController from './ReviewContactPreferencePostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
let partyDetails;

describe('ContactPreferencesPostController', () => {
  const mockFields = {
    fields: {},
  } as unknown as FormFields;
  const controller = new ReviewContactPreferencePostController(mockFields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    partyDetails = [
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
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e1',
        value: {
          firstName: 'Giorgi',
          lastName: 'Citizen',
          email: 'abc@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e1',
            email: 'test@example.net',
          },
          response: '',
        },
      },
    ];
    req.session.user = {
      ...req.session.user,
      id: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
    };
    req.session.userCase = {
      ...req.session.userCase,
      state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
      citizenUserAddress1: 'Flatc1',
      citizenUserAddress2: 'Unkonwn lane',
      citizenUserAddressCounty: 'Dummy County',
      citizenUserAddressPostcode: 'SW13ND',
      citizenUserAddressTown: 'Dummy Town',
      citizenUserAddressHistory: '',
      citizenUserDateOfBirth: {
        year: '2000',
        month: '11',
        day: '14',
      },
      citizenUserEmailAddress: 'a.b@test.com',
      citizenUserFirstNames: 'John',
      isAtAddressLessThan5Years: 'No',
      citizenUserLastNames: 'Smith',
      citizenUserPhoneNumber: '0987654321',
      citizenUserPlaceOfBirth: 'london',
      citizenUserAdditionalName: 'Johnny Smith',
      citizenUserSafeToCall: '4 pm',
      isCitizenLivingInRefuge: 'No',
      applicants: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'testuser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            dateOfBirth: '2023-11-12',
            phoneNumber: '7755664466',
            placeOfBirth: 'BPP',
            previousName: 'test',
            isAtAddressLessThan5Years: 'No',
            addressLivedLessThan5YearsDetails: 'Hello',
            address: {
              AddressLine1: 'string',
              AddressLine2: 'string',
              AddressLine3: 'string',
              PostTown: 'string',
              County: 'string',
              PostCode: 'string',
              Country: 'string',
            },
            user: {
              idamId: '123',
              email: 'test1234@example.net',
            },
            response: 'MOCK_RESPONSE',
            contactPreferences: 'email',
          },
        },
      ],
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e2',
          value: {
            firstName: 'testuser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            dateOfBirth: '03-20-2023',
            phoneNumber: '7755664466',
            placeOfBirth: 'BPP',
            previousName: 'test',
            isAtAddressLessThan5Years: 'No',
            addressLivedLessThan5YearsDetails: 'Hello',
            address: {
              AddressLine1: 'string',
              AddressLine2: 'string',
              AddressLine3: 'string',
              PostTown: 'string',
              County: 'string',
              PostCode: 'string',
              Country: 'string',
            },
            user: {
              idamId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
              email: 'test1234@example.net',
            },
            response: 'MOCK_RESPONSE',
            contactPreferences: 'email',
            liveInRefuge: 'No',
          },
        },
      ],
      caseInvites: [
        {
          id: '577695bd-2fb5-4418-a699-79ee352ed5bb',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e2',
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
    };
    req.body.onlycontinue = true;
  });

  afterEach(() => {
    updateCaserMock.mockClear();
  });

  test('Should not update the applicantContactPreferences details if user id matches with applicant', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response.preferredModeOfContact).toEqual(undefined);
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with applicant for Post contact preference', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.preferredModeOfContact = 'post';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response.preferredModeOfContact).toEqual(undefined);
  });

  test('Should not update the applicantContactPreferences details if user id matches with respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e1',
        value: {
          firstName: 'Giorgi',
          lastName: 'Citizen',
          email: 'abc@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e1',
            email: 'test@example.net',
          },
          response: '',
        },
      },
    ];
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.preferredModeOfContact).toEqual(undefined);
  });

  test('Should update the userCase for contact preferences when updateCaseData API is success', async () => {
    req.session.userCase.applicants[0].value.contactPreferences = 'post';
    req.body.partyContactPreference = 'email';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.user.id = '123';
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);

    expect(req.session.userCase.contactPreferences).toEqual('post');
    expect(res.redirect).toHaveBeenCalledWith('/applicant/contact-preference/review');
  });

  test('Should not update the userCase for contact preferences when updateCaseData API is throwing error', async () => {
    req.session.userCase.applicants[0].value.contactPreferences = 'post';
    req.body.partyContactPreference = 'email';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.user.id = '123';
    updateCaserMock.mockRejectedValue({ message: 'MOCK_ERROR', response: { status: 500, data: 'Error' } });
    await expect(controller.post(req, res)).rejects.toThrow(
      'ReviewContactPreferencePostController - error when saving contact preferences and redirecting'
    );
  });
});

test('Should return to same page with error', async () => {
  const req = mockRequest();
  const res = mockResponse();
  req.session.user = {
    ...req.session.user,
    id: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
  };
  req.session.userCase = {
    ...req.session.userCase,
    state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
    citizenUserAddress1: 'Flatc1',
    citizenUserAddress2: 'Unkonwn lane',
    citizenUserAddressCounty: 'Dummy County',
    citizenUserAddressPostcode: 'SW13ND',
    citizenUserAddressTown: 'Dummy Town',
    citizenUserAddressHistory: '',
    citizenUserDateOfBirth: {
      year: '2000',
      month: '11',
      day: '14',
    },
    citizenUserEmailAddress: 'a.b@test.com',
    citizenUserFirstNames: 'John',
    isAtAddressLessThan5Years: 'No',
    citizenUserLastNames: 'Smith',
    citizenUserPhoneNumber: '0987654321',
    citizenUserPlaceOfBirth: 'london',
    citizenUserAdditionalName: 'Johnny Smith',
    citizenUserSafeToCall: '4 pm',
    isCitizenLivingInRefuge: 'No',
    applicants: [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'testuser',
          lastName: 'Citizen',
          email: 'abc@example.net',
          dateOfBirth: '2023-11-12',
          phoneNumber: '7755664466',
          placeOfBirth: 'BPP',
          previousName: 'test',
          isAtAddressLessThan5Years: 'No',
          addressLivedLessThan5YearsDetails: 'Hello',
          address: {
            AddressLine1: 'string',
            AddressLine2: 'string',
            AddressLine3: 'string',
            PostTown: 'string',
            County: 'string',
            PostCode: 'string',
            Country: 'string',
          },
          user: {
            idamId: '123',
            email: 'test1234@example.net',
          },
          response: 'MOCK_RESPONSE',
          contactPreferences: 'email',
        },
      },
    ],
    respondents: [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e2',
        value: {
          firstName: 'testuser',
          lastName: 'Citizen',
          email: 'abc@example.net',
          dateOfBirth: '03-20-2023',
          phoneNumber: '7755664466',
          placeOfBirth: 'BPP',
          previousName: 'test',
          isAtAddressLessThan5Years: 'No',
          addressLivedLessThan5YearsDetails: 'Hello',
          address: {
            AddressLine1: 'string',
            AddressLine2: 'string',
            AddressLine3: 'string',
            PostTown: 'string',
            County: 'string',
            PostCode: 'string',
            Country: 'string',
          },
          user: {
            idamId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
            email: 'test1234@example.net',
          },
          response: 'MOCK_RESPONSE',
          contactPreferences: 'email',
          liveInRefuge: 'No',
        },
      },
    ],
    caseInvites: [
      {
        id: '577695bd-2fb5-4418-a699-79ee352ed5bb',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e2',
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
  };
  req.body.onlycontinue = true;

  const mockForm: FormContent = {
    fields: {
      partyContactPreference: {
        type: 'radios',
        classes: 'govuk-radios',
        validator: atLeastOneFieldIsChecked,
        label: l => l.contactPreferenceLabel,
        labelSize: 'm',
        hint: l => l.contactPreferenceHintText,
        values: [
          {
            label: l => l.labelDigital,
            name: 'partyContactPreference',
            value: ContactPreference.EMAIL,
            hint: l => l.labelDitigalHintText,
          },
          {
            label: l => l.labelPost,
            name: 'partyContactPreference',
            value: ContactPreference.POST,
            hint: l => l.labelPostHintText,
          },
        ],
      },
    },
    onlycontinue: {
      text: l => l.continue,
    },
  };
  const controller1 = new ReviewContactPreferencePostController(mockForm.fields);
  req.session.userCase.applicants[0].value.contactPreferences = undefined;
  req.session.userCase.caseTypeOfApplication = 'C100';
  req.session.user.id = '123';
  req.body.onlycontinue = true;
  req.session.userCase.partyContactPreference = undefined;
  req.body.partyContactPreference = undefined;
  controller1.post(req, res);
  expect(res.redirect).toHaveBeenCalledWith('/request');
});
