/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from 'config';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { YesNoEmpty } from '../../app/case/definition';

import { PCQController, PcqController } from './controller';

import { PCQProvider } from './index';

jest.mock('config');

describe('PCQController', () => {
  let appResponse;
  let appRequest;
  jest.mock('axios');
  config.get = jest.fn();
  const mockedAxios = axios as jest.Mocked<typeof axios>;
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
            reasonableAdjustmentsFlags: [
              {
                name: 'Private waiting area',
                name_cy: 'Ystafell aros breifat',
                flagComment: '',
                flagComment_cy: '',
                dateTimeCreated: '2023-11-16T16:05:25.000',
                dateTimeModified: '2023-11-16T16:05:57.000',
                path: ['Party', 'Reasonable adjustment', 'I need something to feel comfortable during my hearing'],
                hearingRelevant: 'Yes',
                flagCode: 'RA0033',
                status: 'Requested',
                availableExternally: 'Yes',
              },
            ],
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
    jest.spyOn(PCQProvider.service, 'launchPcqService').mockImplementation(() => Promise.resolve());
    jest.spyOn(PCQProvider.service, 'getPcqHealthStatus').mockImplementation(() => Promise.resolve('UP'));
    jest.spyOn(PCQProvider, 'buildPcqServiceUrl');
    jest.spyOn(config, 'get').mockImplementation(() => 'password');
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect(PCQProvider.buildRequestParams).toBeCalled;
    expect(PCQProvider.buildPcqServiceUrl).toBeCalled;
  });

  test('when launching Pcq module for c7 - error scenario', async () => {
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    jest.spyOn(PCQProvider.service, 'getPcqHealthStatus').mockRejectedValueOnce({ status: 500 });
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect((PCQController as any).handleError).toBeCalled;
    expect(PCQProvider.buildRequestParams).not.toBeCalled;
    expect(PCQProvider.buildPcqServiceUrl).not.toBeCalled;
  });

  test('when launching Pcq module for c7 - error scenario when pcq health is down', async () => {
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    jest.spyOn(PCQProvider.service, 'getPcqHealthStatus').mockResolvedValueOnce('DOWN');
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect((PCQController as any).handleError).toBeCalled;
    expect(PCQProvider.buildRequestParams).not.toBeCalled;
    expect(PCQProvider.buildPcqServiceUrl).not.toBeCalled;
  });

  test('when launching Pcq module for c100 rebuild - success scenario', async () => {
    jest.spyOn(PCQProvider.service, 'launchPcqService').mockImplementation(() => Promise.resolve());
    jest.spyOn(PCQProvider.service, 'getPcqHealthStatus').mockImplementation(() => Promise.resolve('UP'));
    jest.spyOn(PCQProvider, 'buildPcqServiceUrl');
    appRequest.url = 'http://localhost:3001/pcq/c100-rebuild';
    jest.spyOn(config, 'get').mockImplementation(() => 'password');
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect(PCQProvider.buildRequestParams).toBeCalled;
    expect(PCQProvider.buildPcqServiceUrl).toBeCalled;
  });

  test('when launching Pcq module for c100 rebuild - error scenario', async () => {
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    jest.spyOn(PCQProvider.service, 'launchPcqService').mockRejectedValueOnce({ status: 500 });
    await PCQController.launch(appRequest, appResponse, 'http://localhost:3001');
    expect((PCQController as any).handleError).toBeCalled;
    expect(PCQProvider.buildRequestParams).not.toBeCalled;
    expect(PCQProvider.buildPcqServiceUrl).not.toBeCalled;
  });
});
