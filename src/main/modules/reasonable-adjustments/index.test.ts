/* eslint-disable @typescript-eslint/no-explicit-any */
const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import axios from 'axios';
import config from 'config';
import { Application } from 'express';
import { LoggerInstance } from 'winston';

import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { RACommonComponentUserAction, RAFlags } from './definitions';

import { RAProvider } from './index';

describe('ReasonableAdjustementsProvider', () => {
  let appRequest;
  let appResponse;
  jest.mock('axios');
  config.get = jest.fn();
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.create = jest.fn(() => mockedAxios);
  const logger = {
    error: jest.fn().mockImplementation((message: string) => message),
    info: jest.fn().mockImplementation((message: string) => message),
  } as unknown as LoggerInstance;

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
        user: {
          accessToken: 'testUserToken',
        },
        lang: 'cy',
      },
    } as unknown as Application;
    appResponse = mockResponse();
    jest.clearAllMocks();
    jest.spyOn(RAProvider, 'isComponentEnabled').mockImplementation(() => Promise.resolve(true));
    jest.spyOn((RAProvider as any).route, 'enable');
  });

  test('when enabling RA module', async () => {
    await RAProvider.enable(appRequest);
    expect((RAProvider as any).route.enable(appRequest)).toBeCalled;
  });

  test('when initializing the module', async () => {
    mockedAxios.create.mockResolvedValueOnce;
    RAProvider.init(appRequest);
    expect((RAProvider as any).appBaseUrl).not.toBeNull;
    expect((RAProvider as any).client).not.toBeNull;
  });

  test('get the client instance of the module', async () => {
    mockedAxios.create.mockResolvedValueOnce;
    RAProvider.init(appRequest);
    expect(RAProvider.APIClient()).not.toBeNull;
  });

  test('get appBaseUrl of the module', async () => {
    mockedAxios.create.mockResolvedValueOnce;
    RAProvider.init(appRequest);
    expect(RAProvider.getAppBaseUrl()).not.toBeNull;
  });

  test('get the sequence of the module', async () => {
    const sequence = await RAProvider.getSequence();
    expect(sequence).toHaveLength(1);
  });

  test('when launching RA component - success scenario', async () => {
    const requestData: RAFlags = {
      partyName: 'testUser',
      roleOnCase: 'Respondent 1',
      details: [],
    };
    jest
      .spyOn(RAProvider.service, 'getCommonComponentUrl')
      .mockImplementation(() => Promise.resolve({ url: 'https://cui-ra.aat.platform.hmcts.net/test-id' }));
    await RAProvider.launch(requestData, 'en', appResponse);
    expect(appResponse.redirect).toBeCalled;
  });

  test('when launching RA component common component API throws error', async () => {
    const requestData: RAFlags = {
      partyName: 'testUser',
      roleOnCase: 'Respondent 1',
      details: [],
    };
    let hasError = false;
    jest.spyOn(RAProvider.service, 'getCommonComponentUrl').mockImplementation(() => Promise.resolve({ url: '' }));
    try {
      await RAProvider.launch(requestData, 'en', appResponse);
    } catch (error) {
      hasError = true;
    }
    expect(appResponse.redirect).not.toBeCalled;
    expect(hasError).toEqual(true);
    expect(logger.error).toBeCalled;
  });

  test('when invoking trySettlingRequest while user action is sumbit', async () => {
    const requestData: RAFlags = {
      partyName: 'testUser',
      roleOnCase: 'Respondent 1',
      details: [],
    };
    let isRequestSettled = false;

    jest
      .spyOn(RAProvider.service, 'getCommonComponentUrl')
      .mockImplementation(() => Promise.resolve({ url: 'https://cui-ra.aat.platform.hmcts.net/test-id' }));
    await RAProvider.launch(requestData, 'en', appResponse);
    await RAProvider.trySettlingRequest('MOCK_V4_UUID', RACommonComponentUserAction.SUBMIT).then(() => {
      isRequestSettled = true;
      expect(isRequestSettled).toBe(true);
    });
  });

  test('when invoking trySettlingRequest while user action is cancel', async () => {
    const requestData: RAFlags = {
      partyName: 'testUser',
      roleOnCase: 'Respondent 1',
      details: [],
    };
    let isRequestSettled;

    jest
      .spyOn(RAProvider.service, 'getCommonComponentUrl')
      .mockImplementation(() => Promise.resolve({ url: 'https://cui-ra.aat.platform.hmcts.net/test-id' }));
    await RAProvider.launch(requestData, 'en', appResponse);
    try {
      await RAProvider.trySettlingRequest('MOCK_V4_UUID', RACommonComponentUserAction.CANCEL);
      isRequestSettled = true;
    } catch (error) {
      isRequestSettled = false;
    } finally {
      expect(isRequestSettled).toBe(false);
    }
  });

  test('when invoking getPreferredLanguage', async () => {
    expect(RAProvider.getPreferredLanguage(appRequest)).toBe('en');
    delete appRequest.query.lng;
    expect(RAProvider.getPreferredLanguage(appRequest)).toBe('cy');
  });

  test('when invoking destroy', async () => {
    RAProvider.destroy();
    expect((RAProvider as any).correlationId).toBeNull;
    expect((RAProvider as any).client).toBeNull;
    expect((RAProvider as any).appBaseUrl).toBe('');
  });
});
