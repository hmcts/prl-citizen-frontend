import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { RESPOND_TO_APPLICATION } from '../../../urls';

import InternationalFactorsPostController from './InternationalFactorsPostController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
jest.mock('../../../../app/case/CosApiClient');
const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');

describe('InternationalFactorsPostController', () => {
  let fields;
  const internationalFactorsPostController = new InternationalFactorsPostController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    jest.clearAllMocks;
    req.session.user = {
      ...req.session.user,
      id: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
    };
    req.session.userCase = {
      ...req.session.userCase,
      state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'testuser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            dateOfBirth: '03-20-2023',
            phoneNumber: '7755664466',
            placeOfBirth: 'BPP',
            previousName: 'test',
            isAtAddressLessThan5Years: 'No',
            addressLivedLessThan5YearsDetails: 'Hello',
            address: {
              AddressLine1: 'string',
              AddressLine2: 'string',
              AddressLine3: 'string',
              PostTown: 'string',
              County: 'string',
              PostCode: 'string',
              Country: 'string',
            },
            user: {
              idamId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
              email: 'test1234@example.net',
            },
            response: {},
          },
        },
      ],
      caseInvites: [
        {
          id: '577695bd-2fb5-4418-a699-79ee352ed5bb',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'respondent2@example.net',
            accessCode: '3GYFGJHO',
            invitedUserId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
            hasLinked: 'Yes',
            expiryDate: '2023-05-07',
            isApplicant: 'No',
          },
        },
      ],
      caseTypeOfApplication: 'C100',
    };
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

    req.session.userCase.respondents[0].response = response;

    req.session.userCase.start = 'Yes';
    req.session.userCase.iFactorsStartProvideDetails = 'test1';
    req.session.userCase.parents = 'Yes';
    req.session.userCase.iFactorsParentsProvideDetails = 'test2';
    req.session.userCase.jurisdiction = 'Yes';
    req.session.userCase.iFactorsJurisdictionProvideDetails = 'test3';
    req.session.userCase.request = 'Yes';
    req.session.userCase.iFactorsRequestProvideDetails = 'test4';
    req.url = 'international-factors';

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

    req.session.userCase.respondents[0].response = response;

    req.session.userCase.start = 'Yes';
    req.session.userCase.iFactorsStartProvideDetails = 'test1';
    req.session.userCase.parents = 'No';

    req.session.userCase.jurisdiction = 'Yes';
    req.session.userCase.iFactorsJurisdictionProvideDetails = 'test3';
    req.session.userCase.request = 'No';
    req.url = 'international-factors';

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

    req.session.userCase.respondents[0].response = response;

    req.session.userCase.start = 'No';

    req.session.userCase.parents = 'No';

    req.session.userCase.jurisdiction = 'No';

    req.session.userCase.request = 'No';
    req.url = 'international-factors';

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

  test('Should update the userCase for international factors when updateCaseData API is success', async () => {
    req.session.userCase.start = 'No';
    req.session.userCase.parents = 'No';
    req.session.userCase.jurisdiction = 'No';
    req.session.userCase.request = 'No';
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await internationalFactorsPostController.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.citizenInternationalElements).toEqual(
      expect.objectContaining({
        childrenLiveOutsideOfEnWl: 'No',
        parentsAnyOneLiveOutsideEnWl: 'No',
        anotherPersonOrderOutsideEnWl: 'No',
        anotherCountryAskedInformation: 'No',
      })
    );
    expect(res.redirect).toHaveBeenCalledWith(RESPOND_TO_APPLICATION);
  });

  test('Should not update the userCase for international factors when updateCaseData API is throwing error', async () => {
    updateCaserMock.mockRejectedValue({ message: 'MOCK_ERROR', response: { status: 500, data: 'Error' } });
    await expect(internationalFactorsPostController.post(req, res)).rejects.toThrow(
      'InternationalFactorsPostController - Case could not be updated.'
    );
  });
});
