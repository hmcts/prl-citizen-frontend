import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { YesOrNo } from '../../../app/case/definition';
import { APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED, RESPONDENT_PRIVATE_DETAILS_CONFIRMED } from '../../urls';

import { KeepDetailsPrivatePostController } from './KeepDetailsPrivatePostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let partyDetails;

describe('KeepDetailsPrivatePostController', () => {
  let fields;
  const controller = new KeepDetailsPrivatePostController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    partyDetails = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Sasank',
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

  test('Should update the KeepDetailsPrivate details if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.params.caseId = '123';
    req.session.userCase.contactDetailsPrivate = ['phoneNumber', 'email', 'address'];
    req.session.userCase.detailsKnown = 'details';
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
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.params.caseId = '123';
    req.session.userCase.contactDetailsPrivate = ['phoneNumber', 'email', 'address'];
    req.session.userCase.detailsKnown = 'details';
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
    const expected = {
      confidentiality: 'Yes',
      confidentialityList: ['phoneNumber', 'email', 'address'],
      otherPeopleKnowYourContactDetails: 'details',
    };
    expect(req.session.userCase.respondents[0].value.response.keepDetailsPrivate).toEqual(expected);
  });

  test('Should update the KeepDetailsPrivate details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.params.caseId = '123';
    req.session.userCase.contactDetailsPrivate = ['phoneNumber', 'email', 'address'];
    req.session.userCase.detailsKnown = 'details';
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
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondentsFL401.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondentsFL401.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the KeepDetailsPrivate details if user id matches with applicant for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.params.caseId = '123';
    req.session.userCase.contactDetailsPrivate = ['phoneNumber', 'email', 'address'];
    req.session.userCase.detailsKnown = 'details';
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
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should update confidentiality fields for C100 applicant', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.contactDetailsPrivate = ['address', 'phoneNumber'];
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.params.caseId = '123';
    req.session.userCase.contactDetailsPrivate = ['phoneNumber', 'email', 'address'];
    req.session.userCase.detailsKnown = 'details';
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
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with applicant for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the KeepDetailsPrivate details if user id matches with applicant for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.startAlternative = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.params.caseId = '123';
    req.session.userCase.contactDetailsPrivate = ['phoneNumber', 'email', 'address'];
    req.session.userCase.detailsKnown = 'details';
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
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicantsFL401.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with applicant for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.params.caseId = '123';
    req.session.userCase.contactDetailsPrivate = ['phoneNumber', 'email', 'address'];
    req.session.userCase.detailsKnown = 'details';
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
    req.url = 'applicant';
    await controller.post(req, res);
    const expected = {
      confidentiality: 'Yes',
      confidentialityList: ['phoneNumber', 'email', 'address'],
      otherPeopleKnowYourContactDetails: 'details',
    };
    expect(req.session.userCase.applicantsFL401.response.keepDetailsPrivate).toEqual(expected);
  });

  test('Should perform correct redirect for applicant when startAlternative is No', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.startAlternative = YesOrNo.NO;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED);
  });

  test('Should perform correct redirect for respondent when startAlternative is No', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.startAlternative = YesOrNo.NO;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.params.caseId = '123';
    req.session.userCase.contactDetailsPrivate = ['phoneNumber', 'email', 'address'];
    req.session.userCase.detailsKnown = 'details';
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
    req.url = 'respondent';
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(RESPONDENT_PRIVATE_DETAILS_CONFIRMED);
  });
});
