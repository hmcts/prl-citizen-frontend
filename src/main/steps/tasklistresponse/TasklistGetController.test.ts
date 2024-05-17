import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import * as oidc from '../../app/auth/user/oidc';
import { CosApiClient } from '../../app/case/CosApiClient';
import { EventRoutesContext } from '../../app/case/definition';

import { TasklistGetController } from './TasklistGetController';

const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

jest.mock('axios');
config.get = jest.fn();
const mockedAxios = Axios as jest.Mocked<AxiosStatic>;
const token = 'authToken';

const retrieveCaseAndHearingsMock = jest.spyOn(CosApiClient.prototype, 'retrieveCaseAndHearings');

jest.mock('../../app/case/CosApiClient');

const mockMyFunction = CosApiClient as jest.Mock;
jest.mock('../../app/auth/service/get-service-auth-token');

describe('GetCaseController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    when(config.get)
      .calledWith('services.idam.clientID')
      .mockReturnValue('prl-citizen-frontend')
      .calledWith('services.idam.authorizationURL')
      .mockReturnValue('https://idam-web-public/login');

    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
    });
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
    });

    req = mockRequest({
      session: {
        user: {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        },
        userCaseList: [
          {
            id: '1234',
          },
        ],
      },
      params: {
        caseId: '1234',
      },
    });
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'No',
        },
      },
    ];
    req.url = 'respondent';
    res = mockResponse();
    mockMyFunction.mockReturnValue('hello');
    retrieveCaseAndHearingsMock.mockResolvedValue(req.session.userCase);
  });
  afterEach(() => {
    retrieveCaseAndHearingsMock.mockClear();
  });
  test('respondent keept details private', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'testuser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            user: {
              idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
              email: 'test@example.net',
            },
            response: {
              keepDetailsPrivate: {
                otherPeopleKnowYourContactDetails: 'tdgfhcv',
                confidentiality: 'Yes',
                confidentialityList: ['phoneNumber'],
              },
              citizenFlags: {
                isAllegationOfHarmViewed: 'Yes',
              },
            },
          },
        },
      ],
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
    };
    controller = new TasklistGetController(EventRoutesContext.KEEP_DETAILS_PRIVATE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/respondent/keep-details-private/details_known');
  });

  test('applicant keept details private', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'FL401',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'testuser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            user: {
              idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
              email: 'test@example.net',
            },
            response: {
              keepDetailsPrivate: {
                otherPeopleKnowYourContactDetails: 'tdgfhcv',
                confidentiality: 'Yes',
                confidentialityList: ['phoneNumber'],
              },
              citizenFlags: {
                isAllegationOfHarmViewed: 'Yes',
              },
            },
          },
        },
      ],
    };
    req.url = 'applicant';
    controller = new TasklistGetController(EventRoutesContext.KEEP_DETAILS_PRIVATE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/applicant/keep-details-private/details_known');
  });

  test('C100 case for respondent keept details international elements', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'testuser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            user: {
              idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
              email: 'test@example.net',
            },
            response: {
              citizenInternationalElements: {
                childrenLiveOutsideOfEnWl: 'test',
                childrenLiveOutsideOfEnWlDetails: 'test',
                parentsAnyOneLiveOutsideEnWl: 'test',
                parentsAnyOneLiveOutsideEnWlDetails: 'test',
                anotherPersonOrderOutsideEnWl: 'test',
                anotherPersonOrderOutsideEnWlDetails: 'test',
                anotherCountryAskedInformation: 'test',
                anotherCountryAskedInformationDetaails: 'test',
              },
              citizenFlags: {
                isAllegationOfHarmViewed: 'Yes',
              },
            },
          },
        },
      ],
    };
    controller = new TasklistGetController(EventRoutesContext.INTERNATIONAL_FACTORS_RESPONSE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/international-factors/start');
  });
  test('C100 case for respondent miam detials', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'testuser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            user: {
              idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
              email: 'test@example.net',
            },
            response: {
              miam: {
                attendedMiam: 'test',
                willingToAttendMiam: 'No',
                reasonNotAttendingMiam: 'test',
              },
              citizenFlags: {
                isAllegationOfHarmViewed: 'Yes',
              },
            },
          },
        },
      ],
    };
    controller = new TasklistGetController(EventRoutesContext.MIAM_RESPONSE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/miam/miam-start');
  });
  test('C100 case for respondent SAFETY_CONCERNS_RESPONSE', async () => {
    controller = new TasklistGetController(EventRoutesContext.SAFETY_CONCERNS_RESPONSE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/respondent/safety-concerns/concern-guidance');
  });
  test('C100 case for respondent PROCEEDINGS_RESPONSE', async () => {
    controller = new TasklistGetController(EventRoutesContext.PROCEEDINGS_RESPONSE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/proceedings/start');
  });
  test('C100 case for respondent CONSENT_RESPONSE', async () => {
    controller = new TasklistGetController(EventRoutesContext.CONSENT_RESPONSE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/consent-to-application/consent');
  });
  test('C100 case for respondent CONFIRM_CONTACT_DETAILS_APPLICANT', async () => {
    controller = new TasklistGetController(EventRoutesContext.CONFIRM_CONTACT_DETAILS_APPLICANT);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/applicant/confirm-contact-details/checkanswers');
  });
  test('C100 case for respondent CONFIRM_CONTACT_DETAILS_RESPONDENT', async () => {
    controller = new TasklistGetController(EventRoutesContext.CONFIRM_CONTACT_DETAILS_RESPONDENT);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/respondent/confirm-contact-details/checkanswers');
  });
  test('C100 case for respondent CONTACT_PREFERENCE', async () => {
    controller = new TasklistGetController(EventRoutesContext.CONTACT_PREFERENCE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenLastCalledWith('/applicant/contact-preference/choose-a-contact-preference');
  });
});
