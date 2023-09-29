import axios from 'axios';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CaseApi as C100Api } from '../../app/case/C100CaseApi';

import { PaymentHandler, PaymentValidationHandler } from './paymentController';

const mockToken = 'authToken';

const dummyCaseID = '2122323';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const updateCaserMock = jest.spyOn(C100Api.prototype, 'updateCase');

const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

const req = mockRequest({});
req.locals.logger = mockLogger;
req.session.user.accessToken = mockToken;
req.session.userCase.caseId = dummyCaseID;
req.protocol = 'http';
req.host = 'localhost:3001';

const res = mockResponse({});

describe('PaymentHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render the page', async () => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    const paymentDetailsRequestBody = {
      payment_reference: 'a',
      date_created: 'b',
      external_reference: 'c',
      next_url: 'd',
      status: 'Success',
      serviceRequestReference: 'e',
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    await PaymentHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/check-your-answers');
    expect(res.send.mock.calls).toHaveLength(0);
    expect(req.host).toBe('localhost:3001');
    expect(updateCaserMock).toHaveBeenCalled;
  });
  test('Should render the page in case of HWF', async () => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    req.session.userCase.helpWithFeesReferenceNumber = '12345';
    const paymentDetailsRequestBody = {
      payment_reference: 'a',
      date_created: 'b',
      external_reference: 'c',
      next_url: 'd',
      status: 'Success',
      serviceRequestReference: 'e',
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    await PaymentHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/check-your-answers');
    expect(res.send.mock.calls).toHaveLength(0);
    expect(req.host).toBe('localhost:3001');
    expect(updateCaserMock).toHaveBeenCalled;
  });
  test('Should render the page in case next url', async () => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    const paymentDetailsRequestBody = {
      payment_reference: '',
      date_created: '',
      external_reference: '',
      next_url: 'MOCK_NEXT_URL',
      status: '',
      serviceRequestReference: '',
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    await PaymentHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledWith('MOCK_NEXT_URL');
    expect(res.send.mock.calls).toHaveLength(0);
    expect(req.host).toBe('localhost:3001');
    expect(updateCaserMock).toHaveBeenCalled;
  });
  test('Should render the page in case error', async () => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    const paymentDetailsRequestBody = {
      payment_reference: '',
      date_created: '',
      external_reference: '',
      next_url: '',
      status: '',
      serviceRequestReference: '',
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    await PaymentHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/check-your-answers');
    expect(res.send.mock.calls).toHaveLength(0);
    expect(req.host).toBe('localhost:3001');
    expect(updateCaserMock).toHaveBeenCalled;
  });
  test('should catch and log error', async () => {
    mockedAxios.post.mockRejectedValue(undefined);
    await PaymentHandler(req, res);
    expect(req.session.paymentError).toBe(true);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/check-your-answers');
    expect(mockLogger.error).toHaveBeenCalledWith('Error in create service request/payment reference');
  });
});

describe('PaymentValidationHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const paymentDetails = {
    payment_reference: 'RF32-123',
    date_created: '9-10-2022',
    external_reference: 'N/A',
    next_url: 'http://localhost:3001/payment/reciever/callback/RC-12/Success',
    status: 'Success',
  };
  req.session.userCase.paymentDetails = paymentDetails;
  test('expecting PaymentValidationHandler Controller', async () => {
    req.params.status = 'Success';
    req.params.paymentId = 'DUMMY_X100';
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetails,
      },
    });
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        ...paymentDetails,
      },
    });
    updateCaserMock.mockResolvedValue({
      data: {
        draftOrderDoc: {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
          document_filename: 'finalDocument.pdf',
          document_binary_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
        },
      },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        draftOrderDoc: {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
          document_filename: 'finalDocument.pdf',
          document_binary_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
        },
      },
    });
    const mockApi = new C100Api(mockedAxios, mockLogger);
    req.locals.C100Api = mockApi;
    await PaymentValidationHandler(req, res);
    expect(req.session.paymentError).toBe(false);
  });
  test('should populate error if payment not a success', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetails,
        status: 'Failed',
      },
    });
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        ...paymentDetails,
        status: 'Failed',
      },
    });
    await PaymentValidationHandler(req, res);
    expect(req.session.paymentError).toBe(true);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/check-your-answers');
    expect(mockLogger.error).toHaveBeenCalledWith('Error in retreive payment status');
  });
  test('should catch error', async () => {
    mockedAxios.get.mockRejectedValueOnce;
    await PaymentValidationHandler(req, res);
    expect(req.session.paymentError).toBe(true);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/check-your-answers');
    expect(mockLogger.error).toHaveBeenCalledTimes(2);
    expect(mockLogger.error).toHaveBeenCalledWith('Error in retreive payment status');
  });
  test('expecting res 500', async () => {
    delete req.params.status;
    delete req.params.paymentId;
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetails,
      },
    });
    const result = await PaymentValidationHandler(req, res);
    expect(result).toBe(undefined);
  });
});
