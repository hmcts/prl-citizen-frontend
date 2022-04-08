jest.mock('axios');
jest.mock('@hmcts/nodejs-logging');
jest.useFakeTimers();

import { Logger } from '@hmcts/nodejs-logging';
import Axios, { AxiosStatic } from 'axios';
const logger = {
  info: jest.fn(),
  error: jest.fn(),
};
Logger.getLogger.mockReturnValue(logger);

import { getServiceAuthToken, initAuthToken } from './get-service-auth-token';

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

describe('initAuthToken', () => {
  test('Should set an interval to start fetching a token', () => {
    mockedAxios.post.mockResolvedValue('token');

    initAuthToken();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/lease',
      {
        microservice: 'ds_ui',
        oneTimePassword: expect.anything(),
      }
    );
  });

  test('Should log errors', () => {
    mockedAxios.post.mockRejectedValue({ response: { status: 500, data: 'Error' } });

    initAuthToken();
    return new Promise<void>(resolve => {
      setImmediate(() => {
        expect(logger.error).toHaveBeenCalledWith(500, 'Error');
        resolve();
      });
    });
  });
});

describe('getServiceAuthToken', () => {
  test('Should return a token', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'token' });

    initAuthToken();

    return new Promise<void>(resolve => {
      setImmediate(() => {
        expect(getServiceAuthToken()).not.toBeUndefined();
        resolve();
      });
    });
  });
});
