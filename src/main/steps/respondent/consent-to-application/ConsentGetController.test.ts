import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { ConsentGetController } from './ConsentGetController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let respondents;

describe('ConsentGetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };
  //const userEmail = 'test@example.com';
  const generateContent = content => languages[content.language];
  const consentGetController = new ConsentGetController('page', generateContent);
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
          response: '',
        },
      },
    ];
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
  });

  test('Should not get consent if user id not matches with respondent idamId', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';

    req.session.userCase.respondents = respondents;
    await consentGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should not get consent if user id matches with respondent but there is no response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';

    req.session.userCase.respondents = respondents;
    await consentGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should not get consent if user id matches with respondent but there is no consent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      legalRepresentation: 'No',
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await consentGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should not get consent if user id matches with respondent but there is no consentToTheApplication', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      legalRepresentation: 'No',
      consent: '',
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await consentGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).not.toEqual('Yes');
  });

  test('Should get consent if user id matches with respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      legalRepresentation: 'No',
      consent: {
        consentToTheApplication: 'Yes',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await consentGetController.get(req, res);
    expect(req.session.userCase.doYouConsent).toEqual('Yes');
  });
});
