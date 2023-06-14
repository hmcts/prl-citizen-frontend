import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { applicantContactPreferencesEnum } from '../../../app/case/definition';
import { APPLICANT_TASKLIST_CONTACT_POST } from '../../urls';

import { ContactPreferencesPostController } from './ContactPreferencesPostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let partyDetails;

describe('ContactPreferencesPostController', () => {
  let fields;
  const controller = new ContactPreferencesPostController(fields);
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
              idamId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
              email: 'test1234@example.net',
            },
            response: 'MOCK_RESPONSE',
            contactPreferences: 'digital',
          },
        },
      ],
      caseInvites: [
        {
          id: '577695bd-2fb5-4418-a699-79ee352ed5bb',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
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
    expect(req.session.userCase.applicants[0].value.response.applicantPreferredContact).toEqual(undefined);
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with applicant for Post contact preference', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.applicantPreferredContact = applicantContactPreferencesEnum.POST;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response.applicantPreferredContact).toEqual(undefined);
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
    expect(req.session.userCase.respondents[0].value.response.applicantPreferredContact).toEqual(undefined);
  });

  test('Should update the userCase for contact preferences when updateCaseData API is success', async () => {
    req.session.userCase.applicants[0].value.applicantPreferredContact = applicantContactPreferencesEnum.POST;
    req.body.applicantPreferredContact = applicantContactPreferencesEnum.POST;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    expect(req.session.userCase.applicantPreferredContact).toEqual(applicantContactPreferencesEnum.POST);
    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_TASKLIST_CONTACT_POST);
  });

  test('Should not update the userCase for contact preferences when updateCaseData API is throwing error', async () => {
    updateCaserMock.mockRejectedValue({ message: 'MOCK_ERROR', response: { status: 500, data: 'Error' } });
    await expect(controller.post(req, res)).rejects.toThrow(
      'ContactPreferencesPostController - Case could not be updated.'
    );
  });
});
