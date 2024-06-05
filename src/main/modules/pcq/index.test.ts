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

describe('PcqProvider', () => {
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
    PCQProvider.initialiseLogger(req);
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

  test('build pcq service url', async () => {
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
    const url = await PCQProvider.getPcqServiceUrl(
      'http://localhost',
      '/service-endpoint',
      appRequest,
      'actor=APPLICANT'
    );
    expect(url).toEqual(
      'http://localhost/service-endpoint?serviceId=prl_ca&actor=RESPONDENT&pcqId=MOCK_V4_UUID&partyId=user@gmail.com&returnUrl=actor=APPLICANT&language=en&ccdCaseId=undefined&token=b768000010d95d8814cc797c341dfcd9cdd693088e686ac1890b95c14ce0dd16c70160f511cbab4bd18fe0a4aeecc0b5fd10fc4ea73254fd206c368df7f1fdde0921566ee8360d653c50f7be16a6fee8191cb3e34c3c45e4b9a04299229c1f20f3062cb53bdf15b4d8a7181377347695fa3f7de0b4faab76c0f60405f8966926def1aa3a392ff2576e2d7bd463de0cbc5b982f645d8e18e258ba09536ad3cec0282769'
    );
  });
});
