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

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
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
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
  });
  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
  });
  test('FL case for respondent keept details private', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'FL401',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'Sasank',
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
    controller = new TasklistGetController(EventRoutesContext.KEEP_DETAILS_PRIVATE_RESPONDENT);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });

  test('C100 case for respondent keept details private', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'Sasank',
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
    controller = new TasklistGetController(EventRoutesContext.KEEP_DETAILS_PRIVATE_RESPONDENT);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });

  test('FL401 case for applicant keept details private', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'FL401',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'Sasank',
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
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'Yes',
        },
      },
    ];
    req.url = 'applicant';
    controller = new TasklistGetController(EventRoutesContext.KEEP_DETAILS_PRIVATE_APPLICANT);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });

  test('C100 case for respondent keept details international elements', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'Sasank',
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
  });
  test('C100 case for respondent miam detials', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'Sasank',
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
  });
  test('C100 case for respondent response remaining events', async () => {
    req.session.userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'Sasank',
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
              idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
              email: 'test@example.net',
            },
            response: {
              miam: {
                attendedMiam: 'test',
                willingToAttendMiam: 'No',
                reasonNotAttendingMiam: 'test',
              },
              safetyConcerns: {
                safetyConcerns: {
                  haveSafetyConcerns: 'Yes',
                  safetyConcernAbout: ['children', 'respondent'],
                  concernAboutChild: ['physicalAbuse'],
                  concernAboutRespondent: ['physicalAbuse'],
                  otherconcerns: {
                    c1AkeepingSafeStatement: 'string',
                    c1AsupervisionAgreementDetails: 'string',
                    c1AagreementOtherWaysDetails: 'Yes',
                    c1AotherConcernsDrugs: 'Yes',
                    c1AotherConcernsDrugsDetails: 'string',
                    c1AchildSafetyConcerns: 'Yes',
                    c1AchildSafetyConcernsDetails: 'string',
                  },
                  abductions: {
                    c1AabductionReasonOutsideUk: 'string',
                    c1AchildsCurrentLocation: 'string',
                    c1AchildrenMoreThanOnePassport: 'Yes',
                    c1ApossessionChildrenPassport: ['Hello'],
                    c1AprovideOtherDetails: 'string',
                    c1ApassportOffice: 'Yes',
                    c1AabductionPassportOfficeNotified: 'Yes',
                    c1ApreviousAbductionsShortDesc: 'string',
                    c1ApoliceOrInvestigatorInvolved: 'Yes',
                    c1ApoliceOrInvestigatorOtherDetails: 'string',
                    c1AchildAbductedBefore: 'Yes',
                  },
                },
              },
              currentOrPreviousProceedings: {
                haveChildrenBeenInvolvedInCourtCase: 'No',
                courtOrderMadeForProtection: 'No',
                proceedingsList: [],
              },
              consent: {
                consentToTheApplication: 'test',
                permissionFromCourt: 'test',
                noConsentReason: 'test',
                courtOrderDetails: 'test',
                applicationReceivedDate: '03-20-2023',
              },
              support: {
                helpCommunication: ['one'],
                describeOtherNeed: 'string',
                courtComfort: ['two'],
                otherProvideDetails: 'string',
                courtHearing: ['three'],
                communicationSupportOther: 'string',
                docsSupport: ['four'],
                otherDetails: 'string',
                languageRequirements: ['five'],
                languageDetails: 'string',
                reasonableAdjustments: ['six'],
                safetyArrangements: ['seven'],
                safetyArrangementsDetails: 'string',
                travellingToCourt: ['eight'],
                travellingOtherDetails: 'string',
                attendingToCourt: ['nine'],
                hearingDetails: 'string',
                signLanguageDetails: 'string',
                lightingDetails: 'string',
                supportWorkerDetails: 'string',
                familyProviderDetails: 'string',
                therapyDetails: 'string',
                docsDetails: 'string',
                largePrintDetails: 'string',
                parkingDetails: 'string',
                differentChairDetails: 'string',
                describeSignLanguageDetails: 'string',
                lightingProvideDetails: 'string',
              },
              keepDetailsPrivate: {
                otherPeopleKnowYourContactDetails: 'string',
                onfidentiality: 'string',
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
    controller = new TasklistGetController(EventRoutesContext.MIAM_RESPONSE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });
  test('C100 case for respondent SAFETY_CONCERNS_RESPONSE', async () => {
    controller = new TasklistGetController(EventRoutesContext.SAFETY_CONCERNS_RESPONSE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });
  test('C100 case for respondent PROCEEDINGS_RESPONSE', async () => {
    controller = new TasklistGetController(EventRoutesContext.PROCEEDINGS_RESPONSE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });
  test('C100 case for respondent CONSENT_RESPONSE', async () => {
    controller = new TasklistGetController(EventRoutesContext.CONSENT_RESPONSE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });
  test('C100 case for respondent CONFIRM_CONTACT_DETAILS_APPLICANT', async () => {
    controller = new TasklistGetController(EventRoutesContext.CONFIRM_CONTACT_DETAILS_APPLICANT);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });
  test('C100 case for respondent CONFIRM_CONTACT_DETAILS_RESPONDENT', async () => {
    controller = new TasklistGetController(EventRoutesContext.CONFIRM_CONTACT_DETAILS_RESPONDENT);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });
  test('C100 case for respondent SUPPORT_DURING_CASE', async () => {
    controller = new TasklistGetController(EventRoutesContext.SUPPORT_DURING_CASE);
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });
});
