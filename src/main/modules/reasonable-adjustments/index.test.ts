/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from 'config';
import { Application } from 'express';

import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { RAProvider } from './index';

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

  test('when invoking destroy', async () => {
    await RAProvider.destroy(appRequest);
    expect((RAProvider as any).correlationId).toBeNull;
    expect((RAProvider as any).client).toBeNull;
    expect((RAProvider as any).appBaseUrl).toBeUndefined;
  });
});
