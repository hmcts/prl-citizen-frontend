import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { InternationalFactorsGetController } from './InternationalFactorsGetController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let respondents;

describe('InternationalFactorsGetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };

  const generateContent = content => languages[content.language];
  const internationalFactorsGetController = new InternationalFactorsGetController('page', generateContent);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Test1234',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
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

  test('Should not get international elements details if user id not matches with respondent idamId', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';

    req.session.userCase.respondents = respondents;
    await internationalFactorsGetController.get(req, res);
    expect(req.session.userCase.citizenInternationalElements).not.toEqual('Yes');
  });

  test('Should not get international elements if user id matches with respondent but there is no international elements', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      legalRepresentation: 'Yes',
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await internationalFactorsGetController.get(req, res);
    expect(req.session.userCase.citizenInternationalElements).not.toEqual('Yes');
  });

  test('Should not get international elements if user id matches with respondent but there is no international elements response details', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      citizenInternationalElements: {},
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    await internationalFactorsGetController.get(req, res);
    expect(req.session.userCase.start).not.toEqual('Yes');
  });

  test('Should get international elements if user id matches with respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      citizenInternationalElements: {
        childrenLiveOutsideOfEnWl: 'Yes',
        childrenLiveOutsideOfEnWlDetails: 'test1',
        parentsAnyOneLiveOutsideEnWl: 'No',
        anotherPersonOrderOutsideEnWl: 'Yes',
        anotherPersonOrderOutsideEnWlDetails: 'test2',
        anotherCountryAskedInformation: 'No',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;

    await internationalFactorsGetController.get(req, res);

    expect(req.session.userCase.start).toEqual('Yes');
    expect(req.session.userCase.iFactorsStartProvideDetails).toEqual('test1');
    expect(req.session.userCase.parents).toEqual('No');
    expect(req.session.userCase.jurisdiction).toEqual('Yes');
    expect(req.session.userCase.iFactorsJurisdictionProvideDetails).toEqual('test2');
    expect(req.session.userCase.request).toEqual('No');
  });

  test('Should get international elements if user id matches with respondent with no', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    const response = {
      citizenInternationalElements: {
        childrenLiveOutsideOfEnWl: 'No',
        parentsAnyOneLiveOutsideEnWl: 'No',
        anotherPersonOrderOutsideEnWl: 'No',
        anotherCountryAskedInformation: 'No',
      },
    };
    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;

    await internationalFactorsGetController.get(req, res);

    expect(req.session.userCase.start).toEqual('No');
    expect(req.session.userCase.parents).toEqual('No');
    expect(req.session.userCase.jurisdiction).toEqual('No');
    expect(req.session.userCase.request).toEqual('No');
  });
});
