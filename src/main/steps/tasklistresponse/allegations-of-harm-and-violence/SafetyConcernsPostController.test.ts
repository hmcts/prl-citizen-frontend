import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { SafetyConcernsPostController } from './SafetyConcernsPostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');

let respondents;

describe('SafetyConcernsPostController', () => {
  let fields;
  const safetyConcernsPostController = new SafetyConcernsPostController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    jest.clearAllMocks;
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'TestUser',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
          },
          response: {},
        },
      },
    ];
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
    updateCaserMock.mockClear();
    jest.clearAllMocks;
  });

  test('Should update the case without safety concerns', async () => {
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: 'No',
        reasonNotAttendingMiam: 'dummy_value',
      },
    };

    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;

    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';

    req.session.userCase.miamStart = 'No';
    req.session.userCase.miamWillingness = 'No';
    req.session.userCase.miamNotWillingExplnation = 'dummy_value';

    await safetyConcernsPostController.post(req, res);

    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
  });

  test('Should update the case with safety concerns', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      miam: {
        attendedMiam: 'No',
        willingToAttendMiam: 'Yes',
      },
    };
    req.url = 'allegations-of-harm-and-violence';
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;

    req.session.userCase.miamStart = 'No';
    req.session.userCase.miamWillingness = 'Yes';

    await safetyConcernsPostController.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
  });
});
