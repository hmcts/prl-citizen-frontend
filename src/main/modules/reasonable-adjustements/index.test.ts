/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios'; //, { AxiosInstance }
import config from 'config';
import { Application } from 'express';
import { LoggerInstance } from 'winston';

import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CommonComponentUserAction, PartyType } from '../../app/case/definition';

import { RARoute } from './route';

import { RAProvider } from './index';

jest.mock('axios');
config.get = jest.fn();

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

describe('ReasonableAdjustementsController', () => {
  const res = mockResponse();

  let appMock;
  beforeEach(() => {
    jest.clearAllMocks();
    appMock = {
      get: jest.fn(),
      locals: {
        errorHandler: jest.fn(arg => arg),
      },
      session: {
        user: {
          accessToken: 'testUser',
        },
      },
    } as unknown as Application;
  });

  test('apiClient', async () => {
    expect(RAProvider.APIClient).toBeCalled;
  });

  test('trySettlingRequest', async () => {
    await expect(RAProvider.trySettlingRequest('1212', CommonComponentUserAction.SUBMIT)).rejects.toThrow(
      'RA - cannot process data as correlationId does not match'
    );
    expect(mockLogger.error).toBeCalled;
  });
  test('trySettlingRequest with correlationId and SUBMIT', async () => {
    (RAProvider as any).correlationId = '1212';
    expect(await RAProvider.trySettlingRequest('1212', CommonComponentUserAction.SUBMIT)).toBe(undefined);
  });

  test('trySettlingRequest with correlationId and cancel', async () => {
    (RAProvider as any).correlationId = '1212';
    await expect(RAProvider.trySettlingRequest('1212', CommonComponentUserAction.CANCEL)).rejects.toThrow(
      'RA - user cancelled operation'
    );
  });
  test('destroy', async () => {
    RAProvider.destroy();
    expect(RAProvider.APIClient).toBeCalled;
  });
  test('init', async () => {
    (RAProvider as any).isEnabled = true;
    (RAProvider as any).client = null;
    mockedAxios.create.mockResolvedValueOnce;
    RAProvider.init(appMock);
    expect(RAProvider.APIClient).toBeCalled;
    expect(RAProvider.enable).toBeCalled;
    expect(RAProvider.getAppBaseUrl).toBeCalled;
    expect(RAProvider.APIClient).toBeCalled;
  });
  test('enable', async () => {
    (RAProvider as any).isEnabled = true;
    await RAProvider.enable;
    expect(RARoute.enable(appMock)).toBeCalled;
  });
  test('launch', async () => {
    (RAProvider as any).correlationId = '1212';
    const mockcreate = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    jest.spyOn(RAProvider, 'canProcessRequest').mockReturnValueOnce({ create: mockcreate } as unknown as AxiosInstance);
    jest.spyOn(RAProvider.service, 'getCommonComponentUrl').mockImplementationOnce(() => {
      return Promise.resolve({ url: 'a.b' });
    });
    mockedAxios.create.mockRejectedValueOnce;
    expect(
      await RAProvider.launch(
        {
          partyName: 'aa',
          roleOnCase: PartyType.APPLICANT,
        },
        'en',
        res
      )
    ).rejects.toThrowError;
  });
  test('launch return blank url', async () => {
    (RAProvider as any).correlationId = '1212';
    const mockcreate = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    jest.spyOn(RAProvider, 'canProcessRequest').mockReturnValueOnce({ create: mockcreate } as unknown as AxiosInstance);
    jest.spyOn(RAProvider.service, 'getCommonComponentUrl').mockImplementationOnce(() => {
      return Promise.resolve({ url: '' });
    });
    mockedAxios.create.mockRejectedValueOnce;
    await expect(
      RAProvider.launch(
        {
          partyName: 'aa',
          roleOnCase: PartyType.APPLICANT,
        },
        'en',
        res
      )
    ).rejects.toThrow('RA - cannot proceess request');
  });
});
