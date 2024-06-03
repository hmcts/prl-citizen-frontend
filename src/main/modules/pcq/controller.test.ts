/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from 'config';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { YesNoEmpty } from '../../app/case/definition';
import PayAndSubmitPostController from '../../steps/c100-rebuild/check-your-answers/PayAndSubmitPostController';
import ResponseSummaryConfirmationPostController from '../../steps/tasklistresponse/summary/postController';

import { PCQController, PcqController } from './controller';

import { PCQProvider } from './index';

jest.mock('config');

describe('PCQController', () => {
  let appResponse;
  let appRequest;
  jest.mock('axios');
  config.get = jest.fn();
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const responseControllerMock = jest.spyOn(ResponseSummaryConfirmationPostController.prototype, 'submitC7Response');

  mockedAxios.create = jest.fn(() => mockedAxios);

  beforeEach(() => {
    appRequest = mockRequest({
      params: {
        context: 'ra-cc-external-id',
      },
      session: {
        applicationSettings: {},
      },
      url: 'http://localhost:3001/pcq/c100-rebuild',
      userCase: {
        caseTypeOfApplication: 'C100',
        appl_allApplicants: [
          {
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            applicantFirstName: 'dummy',
            applicantLastName: 'Test',
            personalDetails: {
              haveYouChangeName: YesNoEmpty.YES,
              applPreviousName: 'Test1',
              dateOfBirth: {
                year: '1987',
                month: '12',
                day: '12',
              },
              gender: 'Male',
              applicantPlaceOfBirth: '',
            },
          },
        ],
        applicants: [
          {
            id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            value: {
              firstName: 'testuser',
              lastName: 'citizen',
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
                legalRepresentation: 'No',
              },
            },
          },
        ],
        respondents: [
          {
            id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            value: {
              firstName: 'testuser',
              lastName: 'citizen',
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
                legalRepresentation: 'No',
              },
            },
          },
        ],
        caseInvites: [
          {
            id: '1',
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
      },
    });
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    appResponse = mockResponse();
    jest.spyOn(PcqController as any, 'handleError');

    jest.spyOn(PCQProvider.service, 'getPcqHealthStatus').mockImplementation(() => Promise.resolve('UP'));
    jest.clearAllMocks();
  });

  test('when launching Pcq module for c7 - success scenario', async () => {
    jest.spyOn(PCQProvider, 'launchPcqService').mockImplementation(() => Promise.resolve());
    jest.spyOn(PCQProvider.service, 'getPcqHealthStatus').mockImplementation(() => Promise.resolve('UP'));
    jest.spyOn(PCQProvider, 'getPcqServiceUrl');
    jest.spyOn(config, 'get').mockImplementation(() => 'password');
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect(PCQProvider.buildRequestParams).toBeCalled;
    expect(PCQProvider.getPcqServiceUrl).toBeCalled;
  });

  test('when launching Pcq module for c7 - error scenario', async () => {
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    jest.spyOn(PCQProvider.service, 'getPcqHealthStatus').mockRejectedValueOnce({ status: 500 });
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect((PCQController as any).handleError).toBeCalled;
    expect(PCQProvider.buildRequestParams).not.toBeCalled;
    expect(PCQProvider.getPcqServiceUrl).not.toBeCalled;
  });

  test('when launching Pcq module for c7 - error scenario when pcq health is down', async () => {
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    jest.spyOn(PCQProvider.service, 'getPcqHealthStatus').mockResolvedValueOnce('DOWN');
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect((PCQController as any).handleError).toBeCalled;
    expect(PCQProvider.buildRequestParams).not.toBeCalled;
    expect(PCQProvider.getPcqServiceUrl).not.toBeCalled;
  });

  test('when launching Pcq module for c100 rebuild - success scenario', async () => {
    jest.spyOn(PCQProvider, 'launchPcqService').mockImplementation(() => Promise.resolve());
    jest.spyOn(PCQProvider.service, 'getPcqHealthStatus').mockImplementation(() => Promise.resolve('UP'));
    jest.spyOn(PCQProvider, 'getPcqServiceUrl');
    appRequest.url = 'http://localhost:3001/pcq/c100-rebuild';
    jest.spyOn(config, 'get').mockImplementation(() => 'password');
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect(PCQProvider.buildRequestParams).toBeCalled;
    expect(PCQProvider.getPcqServiceUrl).toBeCalled;
  });

  test('when launching Pcq module for c100 rebuild - error scenario', async () => {
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    jest.spyOn(PCQProvider, 'launchPcqService').mockRejectedValueOnce({ status: 500 });
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect((PCQController as any).handleError).toBeCalled;
    expect(PCQProvider.buildRequestParams).not.toBeCalled;
    expect(PCQProvider.getPcqServiceUrl).not.toBeCalled;
  });

  test('should call Pay and submit controller after pcq if c100-rebuild is the return url', async () => {
    appRequest.url = 'http://localhost:3001/c100-rebuild';
    appRequest.params = {
      context: 'c100-rebuild',
    };
    await PCQController.onPcqCompletion(appRequest, appResponse);
    expect((PayAndSubmitPostController as any).handlePayment).toBeCalled;
  });

  test('should call C7 response submission controller after pcq if c7 response is the return url', async () => {
    appRequest.url = 'http://localhost:3001/c7-response';
    appRequest.params = {
      context: 'c7-response',
    };
    responseControllerMock.mockResolvedValue();
    await PCQController.onPcqCompletion(appRequest, appResponse);
    expect(responseControllerMock).toHaveBeenCalled;
  });
});
