import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { YesOrNo } from '../../../app/case/definition';
import { APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED, RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED } from '../../urls';

import { KeepDetailsPrivatePostController } from './KeepDetailsPrivatePostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
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
          firstName: 'Sonali',
          lastName: 'Citizen',
          email: 'abc@example.net',
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
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the KeepDetailsPrivate details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondentsFL401.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'respondent';
    await controller.post(req, res);
    expect(req.session.userCase.respondentsFL401.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the KeepDetailsPrivate details if user id matches with applicant for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should update confidentiality fields for C100 applicant', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.contactDetailsPrivate = ['address', 'phoneNumber'];
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
    expect(req.session.userCase.applicants[0].value.isAddressConfidential).toEqual('Yes');
    expect(req.session.userCase.applicants[0].value.isPhoneNumberConfidential).toEqual('Yes');
    expect(req.session.userCase.applicants[0].value.isEmailAddressConfidential).toEqual('No');
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
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicantsFL401.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with applicant for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicantsFL401.response.keepDetailsPrivate).toEqual(undefined);
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
    req.url = 'respondent';
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED);
  });
});
