import axios from 'axios';

import { C100_START } from '../../../../main/steps/urls';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { LandingPageController } from './landingPageController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('LandingPageController', () => {
  test('Should create case when CreateCase API gives success response and navigate to start page', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        id: '1234567890',
      },
    });

    const controller = new LandingPageController();

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    expect(mockedAxios.post).toHaveBeenCalledWith('/case/create', {
      data: {
        caseTypeOfApplication: 'C100',
      },
    });
    expect(req.session.userCase).toHaveProperty('caseId', '1234567890');
    expect(res.redirect).toHaveBeenCalledWith(C100_START);
  });
  test('Should fail in creating a case when CreateCase API gives error response and not navigate', async () => {
    mockedAxios.post.mockResolvedValue({
      response: {
        status: 500,
      },
    });

    const controller = new LandingPageController();

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    expect(mockedAxios.post).toHaveBeenCalledWith('/case/create', {
      data: {
        caseTypeOfApplication: 'C100',
      },
    });
    expect(req.session.userCase).not.toHaveProperty('caseId');
    expect(res.redirect).not.toHaveBeenCalled();
  });
});
