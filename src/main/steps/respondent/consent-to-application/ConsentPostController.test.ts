import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { YesOrNo } from '../../../app/case/definition';

import { ConsentPostController } from './ConsentPostController';

//const setConsentDetailsMock = jest.spyOn(consentMapper, 'setConsentDetails');
const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let respondents;

describe('ConsentPostController', () => {
  let fields;
  const consentPostController = new ConsentPostController(fields);
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

  test('Should update the consent details if user id matches with respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = respondents;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    await consentPostController.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.consent.consentToTheApplication).toEqual('Yes');
  });

  test('Should not update the consent details if user id matches with respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.respondents = respondents;
    req.session.userCase.doYouConsent = YesOrNo.YES;
    await consentPostController.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.consent).toEqual(undefined);
  });
});
