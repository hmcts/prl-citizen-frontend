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
    jest.clearAllMocks();
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockImplementation(() => Promise.resolve(true));
    jest.spyOn((PCQProvider as any).route, 'enable');
    //jest.spyOn(PCQProvider, 'createAndSaveCorrelationId').mockImplementation(() => Promise.resolve());
  });

  test('when enabling RA module', async () => {
    await PCQProvider.enable(appRequest);
    expect((PCQProvider as any).route.enable(appRequest)).toBeCalled;
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
    PCQProvider.init(req);

    expect((PCQProvider as any).appBaseUrl).not.toBeNull;
    expect((PCQProvider as any).client).not.toBeNull;
    expect(req.session.applicationSettings.reasonableAdjustments.correlationId).toBe(null);
    expect(req.session.applicationSettings.reasonableAdjustments.urlBeforeRedirection).toBe('');
  });

  test('get the client instance of the module', async () => {
    mockedAxios.create.mockResolvedValueOnce;
    PCQProvider.init(appRequest);
    expect(PCQProvider.APIClient()).not.toBeNull;
  });
});
