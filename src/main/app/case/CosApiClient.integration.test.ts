import axios, { AxiosInstance } from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { CosApiClient } from './CosApiClient';

jest.mock('axios');
jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CosApiClient', () => {
  it('connect cos api', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();

    //const client = new CosApiClient(getUserDetails, 'http://return-url');

    const client = new CosApiClient('abc', req.locals.logger);

    const actual = await client.get();

    expect(mockGet).toHaveBeenCalledWith('/');

    expect(actual).toEqual({ mockPayment: 'data' });
  });

  // eslint-disable-next-line jest/expect-expect
  it('logs errors if it fails to fetch data', async () => {
    const req = mockRequest();
    const mockGet = jest.fn().mockRejectedValueOnce({ data: { some: 'error' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const client = new CosApiClient('abc', req.locals.logger);

    await expect(client.get()).rejects.toThrow('Could not connect to cos-api client.');
  });
});
