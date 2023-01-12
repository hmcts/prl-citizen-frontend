import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { ViewAllDocumentsPostController } from './ViewAllDocumentsPostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let partyDetails;

describe('ViewAllDocumentsPostController', () => {
  let fields;
  const controller = new ViewAllDocumentsPostController(fields);
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
            citizenFlags: {
              isAllDocumentsViewed: 'No',
            },
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

  test('Should update the isAllDocumentsViewed details if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.url = 'respondent';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = partyDetails;
    await controller.setAllDocumentsViewed(req, res);
    expect(req.session.userCase.respondents[0].value.response.citizenFlags.isAllDocumentsViewed).toEqual('Yes');
  });

  test('Should update the isAllDocumentsViewed details if user id matches with applicant for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.url = 'applicant';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicants = partyDetails;
    await controller.setAllDocumentsViewed(req, res);
    expect(req.session.userCase.applicants[0].value.response.citizenFlags.isAllDocumentsViewed).toEqual('Yes');
  });

  test('Should update the isAllDocumentsViewed details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.url = 'respondent';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    await controller.setAllDocumentsViewed(req, res);
    expect(req.session.userCase.respondentsFL401.response.citizenFlags.isAllDocumentsViewed).toEqual('Yes');
  });

  test('Should update the IsresponseInitiated details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.url = 'respondent';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = partyDetails;
    await controller.setResponseInitiatedFlag(req, res);
    expect(req.session.userCase.respondents[0].value.response.citizenFlags.isResponseInitiated).toEqual('Yes');
  });
});
