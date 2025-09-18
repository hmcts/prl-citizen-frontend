/* eslint-disable @typescript-eslint/no-explicit-any */
const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import axios from 'axios';
import config from 'config';
import { Application } from 'express';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
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
        applicationSettings: {
          reasonableAdjustments: {
            correlationId: null,
          },
        },
        user: {
          accessToken: 'testUserToken',
        },
        lang: 'cy',
        save: jest.fn(done => done()),
      },
    } as unknown as Application;
    appResponse = mockResponse();
    jest.clearAllMocks();
    jest.spyOn(RAProvider, 'isComponentEnabled').mockImplementation(() => Promise.resolve(true));
    jest.spyOn((RAProvider as any).route, 'enable');
    //jest.spyOn(RAProvider, 'createAndSaveCorrelationId').mockImplementation(() => Promise.resolve());
  });

  test('when enabling RA module', async () => {
    await RAProvider.enable(appRequest);
    expect((RAProvider as any).route.enable(appRequest)).toHaveBeenCalled;
  });

  test('when initializing the module', async () => {
    const req = mockRequest({
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
        save: jest.fn(done => done()),
      },
    });
    req.get = jest.fn();

    mockedAxios.create.mockResolvedValueOnce;
    RAProvider.init(req);

    expect((RAProvider as any).appBaseUrl).not.toBeNull;
    expect((RAProvider as any).client).not.toBeNull;
    expect(req.session.applicationSettings.reasonableAdjustments.correlationId).toBe(null);
    expect(req.session.applicationSettings.reasonableAdjustments.urlBeforeRedirection).toBe('');
  });

  test('get the sequence of the module', async () => {
    const sequence = await RAProvider.getSequence();
    expect(sequence).toHaveLength(15);
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
    await RAProvider.launch(requestData, 'en', appRequest, appResponse);
    expect(appResponse.redirect).toHaveBeenCalled;
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
      await RAProvider.launch(requestData, 'en', appRequest, appResponse);
    } catch (error) {
      hasError = true;
    }
    expect(appResponse.redirect).not.toHaveBeenCalled;
    expect(hasError).toEqual(true);
    expect(logger.error).toHaveBeenCalled;
  });

  test('when launching RA component common component API throws error with data', async () => {
    const requestData: RAFlags = {
      partyName: 'testUser',
      roleOnCase: 'Respondent 1',
      details: [],
    };
    let hasError = false;
    jest.spyOn(RAProvider.service, 'getCommonComponentUrl').mockRejectedValueOnce({
      response: {
        data: 'test',
      },
    });

    let errorMessage;
    try {
      await RAProvider.launch(requestData, 'en', appRequest, appResponse);
    } catch (error) {
      hasError = true;
      errorMessage = error.message;
    }
    expect(appResponse.redirect).not.toHaveBeenCalled;
    expect(hasError).toEqual(true);
    expect(logger.error).toHaveBeenCalled;
    expect(errorMessage).toBe('"test"');
  });

  test('when invoking trySettlingRequest while user action is submit', async () => {
    const requestData: RAFlags = {
      partyName: 'testUser',
      roleOnCase: 'Respondent 1',
      details: [],
    };
    let isRequestSettled = false;
    jest.spyOn(RAProvider as any, 'canProcessRequest').mockImplementation(() => true);
    jest
      .spyOn(RAProvider.service, 'getCommonComponentUrl')
      .mockImplementation(() => Promise.resolve({ url: 'https://cui-ra.aat.platform.hmcts.net/test-id' }));
    await RAProvider.launch(requestData, 'en', appRequest, appResponse);
    await RAProvider.trySettlingRequest(appRequest, 'MOCK_V4_UUID', RACommonComponentUserAction.SUBMIT).then(() => {
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
    await RAProvider.launch(requestData, 'en', appRequest, appResponse);
    try {
      await RAProvider.trySettlingRequest(appRequest, 'MOCK_V4_UUID', RACommonComponentUserAction.CANCEL);
      isRequestSettled = true;
    } catch (error) {
      isRequestSettled = false;
    } finally {
      expect(isRequestSettled).toBe(false);
    }
  });

  test('trySettlingRequest should reset language pref data', async () => {
    const requestData: RAFlags = {
      partyName: 'testUser',
      roleOnCase: 'Respondent 1',
      details: [],
    };
    let isRequestSettled;
    const req = mockRequest({
      session: {
        userCase: {
          ra_languageReqAndSpecialArrangements: 'ra_languageReqAndSpecialArrangements',
        },
      },
    });

    jest
      .spyOn(RAProvider.service, 'getCommonComponentUrl')
      .mockImplementation(() => Promise.resolve({ url: 'https://cui-ra.aat.platform.hmcts.net/test-id' }));
    await RAProvider.launch(requestData, 'en', appRequest, appResponse);
    try {
      await RAProvider.trySettlingRequest(req, 'MOCK_V4_UUID', RACommonComponentUserAction.CANCEL);
      isRequestSettled = true;
    } catch (error) {
      isRequestSettled = false;
    } finally {
      expect(isRequestSettled).toBe(false);
    }
    expect(req.session.userCase.ra_languageReqAndSpecialArrangements).toBe(undefined);
  });

  test('when invoking trySettlingRequest should throw error if correlationId doesnt match', async () => {
    const req = mockRequest({
      session: {
        applicationSettings: {
          reasonableAdjustments: {
            correlationId: 'MOCK_CORRELATION_ID',
          },
        },
      },
    });
    await new Promise(process.nextTick);

    let error;
    try {
      await RAProvider.trySettlingRequest(req, 'MOCK_V4_UUID', RACommonComponentUserAction.CANCEL);
    } catch (err) {
      error = err;
    }
    expect(error.message).toBe('RA - cannot process data as correlationId does not match');
  });

  test('when invoking getPreferredLanguage', async () => {
    expect(RAProvider.getPreferredLanguage(appRequest)).toBe('en');
    delete appRequest.query.lng;
    expect(RAProvider.getPreferredLanguage(appRequest)).toBe('cy');
  });

  test('when invoking getPreferredLanguage for en through header', async () => {
    delete appRequest.query.lng;
    delete appRequest.session.lang;
    appRequest.headers = { 'accept-language': 'en' };
    expect(RAProvider.getPreferredLanguage(appRequest)).toBe('en');
  });

  test('when invoking getPreferredLanguage for unsupported language', async () => {
    delete appRequest.query.lng;
    delete appRequest.session.lang;
    appRequest.headers = { 'accept-language': 'jp' };
    expect(RAProvider.getPreferredLanguage(appRequest)).toBe('en');
  });

  test('when invoking destroy', async () => {
    await RAProvider.destroy(appRequest);
    expect((RAProvider as any).correlationId).toBeNull;
    expect((RAProvider as any).client).toBeNull;
    expect((RAProvider as any).appBaseUrl).toBeUndefined;
  });
});
