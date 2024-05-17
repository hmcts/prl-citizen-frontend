import axios from 'axios';
import config from 'config';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { C100_CHECK_YOUR_ANSWER_REDIRECT, RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT } from '../../urls';

import PCQGetController from './get';

jest.mock('axios');
jest.mock('config');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedConfig = config as jest.Mocked<typeof config>;

describe('PCQGetController', () => {
  const controller = new PCQGetController();

  test('Should redirect to PCQ for respondent', async () => {
    mockedConfig.get.mockReturnValueOnce('SERVICE_TOKEN_KEY');
    mockedConfig.get.mockReturnValueOnce('https://pcq.aat.platform.hmcts.net');
    mockedConfig.get.mockReturnValueOnce('true');
    mockedConfig.get.mockReturnValueOnce('/service-endpoint');

    const req = mockRequest();
    const res = mockResponse();

    const redirectMock = jest.fn();
    res.redirect = redirectMock;

    mockedAxios.get.mockResolvedValue({
      data: {
        status: 'UP',
      },
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({ pcqId: 'UUID' });

    await controller.get(req, res, 'http://localhost:3001');

    expect(redirectMock.mock.calls[0][0]).toBeDefined;
  });

  test('Should redirect to PCQ for applicant', async () => {
    mockedConfig.get.mockReturnValueOnce('SERVICE_TOKEN_KEY');
    mockedConfig.get.mockReturnValueOnce('https://pcq.aat.platform.hmcts.net');
    mockedConfig.get.mockReturnValueOnce('true');
    mockedConfig.get.mockReturnValueOnce('/service-endpoint');

    const req = mockRequest();
    const res = mockResponse();

    const redirectMock = jest.fn();
    res.redirect = redirectMock;
    req.url = '/c100-rebuild/summary';

    mockedAxios.get.mockResolvedValue(
      Promise.resolve({
        data: {
          status: 'DOWN',
        },
      })
    );
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValueOnce({});
    await controller.get(req, res, 'http://localhost:3001');
    expect(res.redirect).toHaveBeenCalledWith(C100_CHECK_YOUR_ANSWER_REDIRECT);
  });

  test('Should not go to PCQ for applicant as pcq id already exists', async () => {
    mockedConfig.get.mockReturnValueOnce('SERVICE_TOKEN_KEY');
    mockedConfig.get.mockReturnValueOnce('https://pcq.aat.platform.hmcts.net');
    mockedConfig.get.mockReturnValueOnce('true');
    mockedConfig.get.mockReturnValueOnce('/service-endpoint');

    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase.applicantPcqId = 'qwert-qwer-qwer-qwe-we';
    const redirectMock = jest.fn();
    res.redirect = redirectMock;
    req.url = '/c100-rebuild/summary';
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValueOnce({});
    await controller.get(req, res, 'http://localhost:3001');
    expect(res.redirect).toHaveBeenCalledWith(C100_CHECK_YOUR_ANSWER_REDIRECT);
  });

  test('Should redirect to Check Your Answers if PCQ Health is DOWN', async () => {
    mockedConfig.get.mockReturnValueOnce('SERVICE_TOKEN_KEY');
    mockedConfig.get.mockReturnValueOnce('https://pcq.aat.platform.hmcts.net');
    mockedConfig.get.mockReturnValueOnce('true');
    mockedConfig.get.mockReturnValueOnce('/service-endpoint');
    const req = mockRequest();
    const res = mockResponse();

    mockedAxios.get.mockResolvedValue(
      Promise.resolve({
        data: {
          status: 'DOWN',
        },
      })
    );

    await controller.get(req, res, 'http://localhost:3001');

    expect(res.redirect).toHaveBeenCalledWith(RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT);
  });

  test('Should redirect to Check Your Answers if pcqId is already populated', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase.pcqId = '1234';

    await controller.get(req, res, 'http://localhost:3001');

    expect(res.redirect).toHaveBeenCalledWith(RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT);
  });

  test('Should redirect to Check Your Answers if config cannot be loaded', async () => {
    mockedConfig.get.mockReturnValueOnce(undefined);
    mockedConfig.get.mockReturnValueOnce(undefined);

    const req = mockRequest();
    const res = mockResponse();

    await controller.get(req, res, 'http://localhost:3001');

    expect(res.redirect).toHaveBeenCalledWith(RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT);
  });
});
