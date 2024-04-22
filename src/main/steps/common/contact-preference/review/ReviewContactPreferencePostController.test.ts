import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { FormFields } from '../../../../app/form/Form';

import ReviewContactPreferencePostController from './ReviewContactPreferencePostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
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
      applicants: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
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
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
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
    req.body.partyContactPreference = 'post';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.user.id = '123';
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(req.session.userCase.contactPreferences).toEqual('post');
    expect(res.redirect).toHaveBeenCalledWith('/applicant/contact-preference/confirmation');
  });

  test('Should update the userCase for contact preferences when updateCaseData API is success for digital', async () => {
    req.session.userCase.applicants[0].value.contactPreferences = 'email';
    req.body.partyContactPreference = 'email';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.user.id = '123';
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(req.session.userCase.contactPreferences).toEqual('email');
    expect(res.redirect).toHaveBeenCalledWith('/applicant/contact-preference/confirmation');
  });

  test('Should update the userCase for contact preferences when updateCaseData API is success for respondent', async () => {
    req.session.userCase.respondents[0].value.contactPreferences = 'post';
    req.body.partyContactPreference = 'post';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.user.id = '8e87fde0-bab4-4701-abbe-2d277ca38fr5';
    req.session.userCase.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(req.session.userCase.contactPreferences).toEqual('post');
    expect(res.redirect).toHaveBeenCalledWith('/respondent/contact-preference/confirmation');
  });

  test('Should update the userCase for contact preferences when updateCaseData API is success for email for respondent', async () => {
    req.session.userCase.applicants[0].value.contactPreferences = 'email';
    req.body.partyContactPreference = 'email';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.user.id = '8e87fde0-bab4-4701-abbe-2d277ca38fr5';
    req.session.userCase.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(req.session.userCase.contactPreferences).toEqual('email');
    expect(res.redirect).toHaveBeenCalledWith('/respondent/contact-preference/confirmation');
  });

  test('Should not update the userCase for contact preferences when updateCaseData API is throwing error', async () => {
    updateCaserMock.mockRejectedValue({ message: 'MOCK_ERROR', response: { status: 500, data: 'Error' } });
    await expect(controller.post(req, res)).rejects.toThrow(
      'ReviewContactPreferencePostController - error when saving contact preferences and redirecting'
    );
  });
});
