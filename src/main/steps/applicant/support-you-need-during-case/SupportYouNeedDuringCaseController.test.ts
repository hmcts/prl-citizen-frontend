import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { YesOrNo } from '../../../app/case/definition';

import { SupportYouNeedDuringYourCaseController } from './SupportYouNeedDuringCaseController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
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

  test('Should update the SupportYouNeedDuringYourCase details if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'respondent/support-you-need-during-case';
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response).not.toBeUndefined;
  });

  test('Should not update the SupportYouNeedDuringYourCase details if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
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
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant/support-you-need-during-case';
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response).not.toBeUndefined;
  });

  test('Should not update the SupportYouNeedDuringYourCase details if user id matches with applicant for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant/support-you-need-during-case';
    await controller.post(req, res);
    expect(req.session.userCase.applicants[0].value.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the SupportYouNeedDuringYourCase details if user id matches with applicant for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicantsFL401.response).not.toBeUndefined;
  });

  test('Should not update the SupportYouNeedDuringYourCase details if user id matches with applicant for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'applicant/support-you-need-during-case';
    await controller.post(req, res);
    expect(req.session.userCase.applicantsFL401.response.keepDetailsPrivate).toEqual(undefined);
  });
});
