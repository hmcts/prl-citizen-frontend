import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { InternationalFactorsPostController } from './InternationalFactorsPostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');

let respondents;

describe('InternationalFactorsPostController', () => {
  let fields;
  const internationalFactorsPostController = new InternationalFactorsPostController(fields);
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

  test('Should update the International Elements details if user id matches with respondent all Yes', async () => {
    const response = {
      citizenInternationalElements: {
        childrenLiveOutsideOfEnWl: 'Yes',
        childrenLiveOutsideOfEnWlDetails: 'test1',
        parentsAnyOneLiveOutsideEnWl: 'Yes',
        parentsAnyOneLiveOutsideEnWlDetails: 'test2',
        anotherPersonOrderOutsideEnWl: 'Yes',
        anotherPersonOrderOutsideEnWlDetails: 'test3',
        anotherCountryAskedInformation: 'Yes',
        anotherCountryAskedInformationDetaails: 'test4',
      },
    };

    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;

    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';

    req.session.userCase.start = 'Yes';
    req.session.userCase.iFactorsStartProvideDetails = 'test1';
    req.session.userCase.parents = 'Yes';
    req.session.userCase.iFactorsParentsProvideDetails = 'test2';
    req.session.userCase.jurisdiction = 'Yes';
    req.session.userCase.iFactorsJurisdictionProvideDetails = 'test3';
    req.session.userCase.request = 'Yes';
    req.session.userCase.iFactorsRequestProvideDetails = 'test4';

    await internationalFactorsPostController.post(req, res);

    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWl
    ).toEqual('Yes');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWlDetails
    ).toEqual('test1');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.parentsAnyOneLiveOutsideEnWl
    ).toEqual('Yes');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements
        .parentsAnyOneLiveOutsideEnWlDetails
    ).toEqual('test2');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWl
    ).toEqual('Yes');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements
        .anotherPersonOrderOutsideEnWlDetails
    ).toEqual('test3');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.anotherCountryAskedInformation
    ).toEqual('Yes');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements
        .anotherCountryAskedInformationDetaails
    ).toEqual('test4');
  });

  test('Should update the International Elements details if user id matches with respondent all Yes NO', async () => {
    const response = {
      citizenInternationalElements: {
        childrenLiveOutsideOfEnWl: 'Yes',
        childrenLiveOutsideOfEnWlDetails: 'test1',
        parentsAnyOneLiveOutsideEnWl: 'No',

        anotherPersonOrderOutsideEnWl: 'Yes',
        anotherPersonOrderOutsideEnWlDetails: 'test3',
        anotherCountryAskedInformation: 'No',
      },
    };

    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;

    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';

    req.session.userCase.start = 'Yes';
    req.session.userCase.iFactorsStartProvideDetails = 'test1';
    req.session.userCase.parents = 'No';

    req.session.userCase.jurisdiction = 'Yes';
    req.session.userCase.iFactorsJurisdictionProvideDetails = 'test3';
    req.session.userCase.request = 'No';

    await internationalFactorsPostController.post(req, res);

    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWl
    ).toEqual('Yes');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWlDetails
    ).toEqual('test1');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.parentsAnyOneLiveOutsideEnWl
    ).toEqual('No');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements
        .parentsAnyOneLiveOutsideEnWlDetails
    ).not.toEqual('test2');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWl
    ).toEqual('Yes');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements
        .anotherPersonOrderOutsideEnWlDetails
    ).toEqual('test3');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.anotherCountryAskedInformation
    ).toEqual('No');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements
        .anotherCountryAskedInformationDetaails
    ).not.toEqual('test4');
  });

  test('Should update the International Elements details if user id matches with respondent all NO', async () => {
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

    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';

    req.session.userCase.start = 'No';

    req.session.userCase.parents = 'No';

    req.session.userCase.jurisdiction = 'No';

    req.session.userCase.request = 'No';

    await internationalFactorsPostController.post(req, res);

    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWl
    ).toEqual('No');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.childrenLiveOutsideOfEnWlDetails
    ).not.toEqual('test1');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.parentsAnyOneLiveOutsideEnWl
    ).toEqual('No');

    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.anotherPersonOrderOutsideEnWl
    ).toEqual('No');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements
        .anotherPersonOrderOutsideEnWlDetails
    ).not.toEqual('test3');
    expect(
      req.session.userCase.respondents[0].value.response.citizenInternationalElements.anotherCountryAskedInformation
    ).toEqual('No');
  });
});
