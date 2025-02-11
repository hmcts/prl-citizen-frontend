import axios, { AxiosInstance } from 'axios';

import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

import RALangReqSplArrangementsPostController from './postController';

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('RA > language-requirements-and-special-arrangements > review > postController', () => {
  test('should save language preferences and special arrangements', async () => {
    const req = mockRequest({
      body: {
        onlyContinue: true,
      },
      session: {
        userCase: {
          ra_languageReqAndSpecialArrangements: 'ra_languageReqAndSpecialArrangements',
        },
      },
    });
    const res = mockResponse();
    const controller = new RALangReqSplArrangementsPostController({});

    const mockGet = jest.fn().mockResolvedValueOnce({ data: 200 });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);

    await controller.post(req, res);
    await new Promise(process.nextTick);
    expect(req.session.userCase.ra_languageReqAndSpecialArrangements).toBe('ra_languageReqAndSpecialArrangements');
  });

  test('should not save language preferences and special arrangements if ra_languageReqAndSpecialArrangements not present', async () => {
    const req = mockRequest({
      body: {
        onlyContinue: true,
      },
    });
    const res = mockResponse();
    const controller = new RALangReqSplArrangementsPostController({});

    const mockGet = jest.fn().mockResolvedValueOnce({ data: 200 });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);

    await controller.post(req, res);
    expect(req.session.userCase.ra_languageReqAndSpecialArrangements).toBe(undefined);
  });

  test('should redirect to error screen if an error is thrown', async () => {
    const req = mockRequest({
      body: {
        onlyContinue: true,
        ra_languageReqAndSpecialArrangements: 'ra_languageReqAndSpecialArrangements',
      },
    });
    delete req.session.userCase;
    const res = mockResponse();
    const controller = new RALangReqSplArrangementsPostController({});

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/reasonable-adjustments/error');
  });
});
