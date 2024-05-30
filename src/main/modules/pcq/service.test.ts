/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { PCQService } from './service';

import { PCQProvider } from './index';

describe('Pcq service', () => {
  let appRequest, appResponse;
  jest.spyOn(PCQProvider, 'log');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.create = jest.fn(() => mockedAxios);
  mockedAxios.get = jest.fn();

  beforeEach(() => {
    appRequest = mockRequest({
      session: {
        applicationSettings: {},
      },
      userCase: {
        caseTypeOfApplication: 'C100',
      },
    });
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    appResponse = mockResponse();
  });

  test('when invoking pcq health - success scenario', async () => {
    const callBackResponse = {
      status: 'UP',
    };
    mockedAxios.get.mockReturnValueOnce({ data: callBackResponse } as unknown as Promise<any>);
    const response = await PCQService.getPcqHealthStatus('http://pcq.aat.com/health');
    expect(response).toBe('UP');
  });

  test('when invoking pcq health - failure scenario', async () => {
    const callBackResponse = {
      status: 'DOWN',
    };
    mockedAxios.get.mockReturnValueOnce({ data: callBackResponse } as unknown as Promise<any>);
    const response = await PCQService.getPcqHealthStatus('http://pcq.aat.com/health');
    expect(response).toBe('DOWN');
  });

  test('when invoking pcq health - error scenario', async () => {
    mockedAxios.get.mockRejectedValueOnce;
    await PCQService.getPcqHealthStatus('http://pcq.aat.com/health');
    expect(PCQProvider.log).toBeCalled;
  });

  test('when invoking launch pcq - success scenario', async () => {
    try {
      const callBackResponse = {
        status: 'UP',
      };
      mockedAxios.get.mockReturnValueOnce({ data: callBackResponse } as unknown as Promise<any>);

      await PCQService.launchPcqService(appRequest, appResponse, 'http://pcq.aat.com/service-endpoint');
    } catch (error) {
      expect(PCQProvider.log).toBeCalled;
    }
  });

  test('when invoking launch pcq - error scenario', async () => {
    try {
      await PCQService.launchPcqService(appRequest, appResponse, 'http://pcq.aat.com/service-endpoint');
    } catch (error) {
      expect(PCQProvider.log).toBeCalled;
    }
  });
});
