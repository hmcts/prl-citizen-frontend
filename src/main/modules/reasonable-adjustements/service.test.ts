import axios, { AxiosInstance } from 'axios';
import config from 'config';

import { PartyType } from '../../app/case/definition';

import { RAService } from './service';

import { RAProvider } from './index';
jest.mock('axios');
config.get = jest.fn();

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ReasonableAdjustementsController', () => {
  beforeEach(() => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    const mockPost = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    jest
      .spyOn(RAProvider, 'APIClient')
      .mockReturnValueOnce({ get: mockGet, post: mockPost } as unknown as AxiosInstance);
  });
  test('getRAData', async () => {
    mockedAxios.get.mockRejectedValue;
    expect(await RAService.getRAData('12')).rejects.toThrowError;
  });
  test('getCommonComponentUrl', async () => {
    mockedAxios.post.mockRejectedValue;
    expect(await RAService.getCommonComponentUrl('12', { partyName: 'a', roleOnCase: PartyType.APPLICANT }, 'en'))
      .rejects.toThrowError;
  });
});
