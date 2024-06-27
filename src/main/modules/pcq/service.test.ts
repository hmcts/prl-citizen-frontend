/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { PCQService } from './service';

import { PCQProvider } from './index';

describe('Pcq service', () => {
  let appRequest;
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
  });

  test('when invoking pcq health - success scenario', async () => {
    const callBackResponse = {
      status: 'UP',
    };
    mockedAxios.get.mockReturnValueOnce({ data: callBackResponse } as unknown as Promise<any>);
    const successResponse = () => Promise.resolve();
    await PCQService.getPcqHealthStatus('http://pcq.aat.com/health');
    await successResponse;
    expect(successResponse).toHaveBeenCalled;
  });

  test('when invoking pcq health - failure scenario', async () => {
    const callBackResponse = {
      status: 'DOWN',
    };
    mockedAxios.get.mockReturnValueOnce({ data: callBackResponse } as unknown as Promise<any>);
    let error = false;
    try {
      await PCQService.getPcqHealthStatus('http://pcq.aat.com/health');
    } catch (err) {
      error = true;
    }
    expect(error).toEqual(true);
  });

  test('when invoking pcq health - error scenario', async () => {
    mockedAxios.get.mockRejectedValueOnce;
    let error = false;
    try {
      await PCQService.getPcqHealthStatus('http://pcq.aat.com/health');
    } catch (e) {
      error = true;
    }
    expect(error).toEqual(true);
  });
});
