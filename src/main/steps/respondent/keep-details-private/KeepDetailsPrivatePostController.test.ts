import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { YesOrNo } from '../../../app/case/definition';

import { KeepDetailsPrivatePostController } from './KeepDetailsPrivatePostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let respondents;

describe('KeepDetailsPrivatePostController', () => {
  let fields;
  const controller = new KeepDetailsPrivatePostController(fields);
  const req = mockRequest();
  const res = mockResponse();
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
    req.session.userCase.respondents = respondents;
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with respondent for CA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.respondents = respondents;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    await controller.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.keepDetailsPrivate).toEqual(undefined);
  });

  test('Should update the KeepDetailsPrivate details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondentsFL401 = respondents[0].value;
    req.session.userCase.startAlternative = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    await controller.post(req, res);
    expect(req.session.userCase.respondentsFL401.response.keepDetailsPrivate.confidentiality).toEqual('Yes');
  });

  test('Should not update the KeepDetailsPrivate details if user id matches with respondent for DA', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.respondentsFL401 = respondents[0].value;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'fl401';
    await controller.post(req, res);
    expect(req.session.userCase.respondentsFL401.response.keepDetailsPrivate).toEqual(undefined);
  });
});
