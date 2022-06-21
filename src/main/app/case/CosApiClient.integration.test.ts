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

    const client = new CosApiClient(req.session, 'http://return-url');

    const actual = await client.get();

    expect(mockGet).toHaveBeenCalledWith('/');

    expect(actual).toEqual({ mockPayment: 'data' });
  });
});
