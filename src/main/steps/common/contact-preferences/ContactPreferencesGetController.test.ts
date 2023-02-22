import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { ContactPreferencesGetController } from './ContactPreferencesGetController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let partyDetails;

describe('ContactPreferencesGetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };
  const generateContent = content => languages[content.language];
  const controller = new ContactPreferencesGetController('page', generateContent);
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
          response: '',
        },
      },
    ];
    req.session.userCase.applicantPreferredContact = '';
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
  });

  test('Should not get applicantPreferredContact if user id not matches with applicant idamId', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = partyDetails;
    await controller.get(req, res);
    expect(req.session.userCase.applicantPreferredContact).not.toEqual('Digital');
  });

  test('Should not get applicantPreferredContact if user id matches but there is no response', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = partyDetails;
    await controller.get(req, res);
    expect(req.session.userCase.applicantPreferredContact).not.toEqual('Post');
  });

  test('Should get applicantPreferredContact if user id matches with applicant', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    const response = {
      applicantPreferredContact: 'Post',
    };
    partyDetails[0].value.response = response;
    req.session.userCase.applicants = partyDetails;
    req.url = 'applicant';
    await controller.get(req, res);
    expect(req.session.userCase.applicantPreferredContact).toEqual('Post');
  });
});
