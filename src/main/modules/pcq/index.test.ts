/* eslint-disable @typescript-eslint/no-explicit-any */
const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import axios from 'axios';
import config from 'config';
import { Application } from 'express';

import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { PCQProvider } from './index';

describe('ReasonableAdjustementsProvider', () => {
  let appRequest;
  jest.mock('axios');
  config.get = jest.fn();
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.create = jest.fn(() => mockedAxios);

  beforeEach(() => {
    appRequest = {
      query: {
        lng: 'en',
      },
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(arg => arg),
      },
      session: {
        applicationSettings: {},
        user: {
          accessToken: 'testUserToken',
          email: 'user@gmail.com',
        },
        lang: 'cy',
        save: jest.fn(done => done()),
      },
    } as unknown as Application;
    jest.clearAllMocks();
    jest.spyOn((PCQProvider as any).route, 'enable');
  });

  test('when enabling Pcq module', async () => {
    jest.spyOn(config, 'get').mockImplementationOnce(() => 'true');
    await PCQProvider.enable(appRequest);
    expect((PCQProvider as any).route.enable(appRequest)).toBeCalled;
  });

  test('get PcqId from the request', async () => {
    const pcqId = await PCQProvider.getPcqId(appRequest);
    expect(pcqId).toEqual(appRequest.session.applicationSettings.pcqId);
  });

  test('when initializing the module', async () => {
    const req = mockRequest({
      post: jest.fn(),
      delete: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(arg => arg),
      },
      session: {
        user: {
          accessToken: 'testUserToken',
        },
        applicationSettings: {},
        lang: 'cy',
        save: jest.fn(done => done()),
      },
    });
    req.get = jest.fn();
    jest.spyOn(config, 'get').mockImplementationOnce(() => 'true');
    mockedAxios.create.mockResolvedValueOnce;
    PCQProvider.init(req);
    PCQProvider.log('test', 'test error message');
    expect(req.session.applicationSettings.pcqId).toBe(undefined);
  });

  test('build pcq params from the request for applicant', async () => {
    appRequest.session.userCase = {
      caseTypeOfApplication: 'C100',
    };
    appRequest.url = 'http://localhost:3031/c100-rebuild';
    jest.spyOn(config, 'get').mockImplementationOnce(() => 'password');
    const params = await PCQProvider.buildRequestParams(appRequest, 'http://localhost:3031');
    expect(params.actor).toEqual('APPLICANT');
  });

  test('build pcq params from the request for respondent', async () => {
    appRequest.session = {
      ...appRequest.session,
      userCase: {
        caseTypeOfApplication: 'C100',
      },
      lang: 'en',
      applicationSettings: {
        pcqId: 'qwer-qwer-qwer-qwert',
      },
    };
    jest.spyOn(config, 'get').mockImplementationOnce(() => 'password');
    appRequest.url = 'http://localhost:3031/tasklistresponse';
    const params = await PCQProvider.buildRequestParams(appRequest, 'http://localhost:3031');
    expect(params.actor).toEqual('RESPONDENT');
  });

  test('check if component is enabled', async () => {
    jest.spyOn(config, 'get').mockImplementationOnce(() => 'false');
    const enabled = await PCQProvider.isComponentEnabled();
    expect(enabled).toEqual(false);
  });

  test('build pcq service url', async () => {
    const url = await PCQProvider.buildPcqServiceUrl('http://localhost', '/service-endpoint', 'actor=APPLICANT');
    expect(url).toEqual('http://localhost/service-endpoint?actor=APPLICANT');
  });
});
