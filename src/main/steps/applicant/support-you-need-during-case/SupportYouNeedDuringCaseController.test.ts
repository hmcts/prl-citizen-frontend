import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { YesOrNo } from '../../../app/case/definition';

import { SupportYouNeedDuringYourCaseController } from './SupportYouNeedDuringCaseController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let partyDetails;
jest.mock('../../../app/case/CosApiClient');

describe('SupportYouNeedDuringYourCaseController', () => {
  let fields;
  const controller = new SupportYouNeedDuringYourCaseController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    partyDetails = [
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
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
          response: {
            legalRepresentation: 'No',
          },
        },
      },
    ];
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
    updateCaserMock.mockClear();
  });

  test('Should update the SupportYouNeedDuringYourCase details if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'respondent/support-you-need-during-case';
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'No',
        },
      },
    ];
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response).not.toBeUndefined;
  });

  test('Should not update the SupportYouNeedDuringYourCase details if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.doYouConsent = 'yes';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'No',
        },
      },
    ];
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the SupportYouNeedDuringYourCase details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondentsFL401.response).not.toBeUndefined;
  });

  test('Should not update the SupportYouNeedDuringYourCase details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'respondent/support-you-need-during-case';
    await controller.post(req, res);
    expect(req.session.userCase.respondentsFL401.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the SupportYouNeedDuringYourCase details if user id matches with applicant for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant/support-you-need-during-case';
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'Yes',
        },
      },
    ];
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response).not.toBeUndefined;
  });

  test('Should not update the SupportYouNeedDuringYourCase details if user id matches with applicant for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant/support-you-need-during-case';
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'Yes',
        },
      },
    ];
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the SupportYouNeedDuringYourCase details if user id matches with applicant for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'applicant';
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'Yes',
        },
      },
    ];
    await controller.post(req, res);
    expect(req.session.userCase.applicantsFL401.response).not.toBeUndefined;
  });

  test('Should not update the SupportYouNeedDuringYourCase details if user id matches with applicant for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'applicant/support-you-need-during-case';
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'Yes',
        },
      },
    ];
    await controller.post(req, res);
    expect(req.session.userCase.applicantsFL401.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the SupportYouNeedDuringYourCase details if user id doesnot matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'respondent';
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'Yes',
        },
      },
    ];
    await controller.post(req, res);
    expect(req.session.userCase.respondentsFL401.response).not.toBeUndefined;
  });
});
