import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';
import { LoggerInstance } from 'winston';

const logger = {
  info: jest.fn(),
  error: jest.fn(),
};
Logger.getLogger.mockReturnValue(logger);

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import mockUserCase from '../../../test/unit/utils/mockUserCase';
import { CaseApi as C100Api } from '../../app/case/C100CaseApi';
import { AWPApplicationType, C100_CASE_EVENT, PartyType } from '../../app/case/definition';
import { UserDetails } from '../../app/controller/AppRequest';

import {
  PaymentAPI,
  PaymentController,
  PaymentHandler,
  PaymentValidationHandler,
  submitCase,
} from './paymentController';

const mockToken = 'authToken';

const dummyCaseID = '2122323';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const saveC100DraftApplicationMock = jest.spyOn(C100Api.prototype, 'saveC100DraftApplication');
const submittedCaserMock = jest.spyOn(C100Api.prototype, 'submitC100Case');

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
    saveC100DraftApplicationMock.mockResolvedValue(req.session.userCase);
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
    expect(saveC100DraftApplicationMock).toHaveBeenCalled;
  });
  test('Should render the page in case of HWF', async () => {
    saveC100DraftApplicationMock.mockResolvedValue(req.session.userCase);
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
    expect(saveC100DraftApplicationMock).toHaveBeenCalled;
  });
  test('Should render the page in case next url', async () => {
    saveC100DraftApplicationMock.mockResolvedValue(req.session.userCase);
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
    expect(saveC100DraftApplicationMock).toHaveBeenCalled;
  });
  test('Should render the page in case error', async () => {
    saveC100DraftApplicationMock.mockResolvedValue(req.session.userCase);
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
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'defaultPaymentError' });
    expect(saveC100DraftApplicationMock).toHaveBeenCalled;
  });
  test('should catch and log error', async () => {
    mockedAxios.post.mockRejectedValue(undefined);
    await PaymentHandler(req, res);
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'defaultPaymentError' });
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
    saveC100DraftApplicationMock.mockResolvedValue({
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
    expect(req.session.paymentError).toStrictEqual({ hasError: false, errorContext: null });
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
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'paymentUnsuccessful' });
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/check-your-answers');
    expect(mockLogger.error).toHaveBeenCalledWith('Error in retreive payment status');
  });
  test('should catch error', async () => {
    mockedAxios.get.mockRejectedValueOnce;
    await PaymentValidationHandler(req, res);
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'paymentUnsuccessful' });
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
        status: 'Failed',
      },
    });
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        ...paymentDetails,
        status: 'Failed',
      },
    });
    const result = await PaymentValidationHandler(req, res);
    expect(result).toBe(undefined);
  });

  test('expecting PaymentValidationHandler Controller check for res send', async () => {
    const paymentDetails2 = {
      ...paymentDetails,
      serviceRequestReference: '123',
    };
    req.session.userCase.paymentDetails = paymentDetails2;
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetails2,
      },
    });
    await PaymentValidationHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
  });

  test('expecting PaymentValidationHandler Controller check for res status', async () => {
    req.params = {};
    await PaymentValidationHandler(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  test('expecting submitCase Controller', async () => {
    await submitCase(
      req,
      res,
      '1234',
      mockUserCase,
      'http://localhost:3001/payment/reciever/callback/RC-12/Success',
      C100_CASE_EVENT.CASE_SUBMIT
    );
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalled();
    expect(res.send.mock.calls).toHaveLength(0);
  });

  test('submitCase should catch not submitted error', async () => {
    submittedCaserMock.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });
    await submitCase(
      req,
      res,
      '1234',
      mockUserCase,
      'http://localhost:3001/payment/reciever/callback/RC-12/Success',
      C100_CASE_EVENT.CASE_SUBMIT
    );
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'applicationNotSubmitted' });
  });
});

describe('PaymentController', () => {
  const userDetails: UserDetails = {
    accessToken: '123',
    email: 'billy@bob.com',
    givenName: 'billy',
    familyName: 'bob',
    id: '1234',
  };

  const paymentController = new PaymentController(mockedAxios, Logger);

  describe('getPaymentStatus', () => {
    test('getPaymentStatus success', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { status: 'Success' } });

      expect(await PaymentController.getPaymentStatus(userDetails, '123', 'MOCK_REFERENCE')).toStrictEqual({
        status: 'success',
        response: { status: 'Success' },
      });
    });

    test('getPaymentStatus throws error', async () => {
      mockedAxios.get.mockRejectedValueOnce({ data: { status: 'reject' } });
      let flag;
      try {
        await PaymentController.getPaymentStatus(userDetails, '123', 'MOCK_REFERENCE');
      } catch {
        flag = false;
      }
      expect(flag).toEqual(false);
    });
  });

  describe('initiatePayment', () => {
    let paymentResponse;
    let paymentData;

    beforeEach(() => {
      paymentResponse = {
        payment_reference: 'MOCK_REFERENCE',
        date_created: 'MOCK_DATE',
        external_reference: 'MOCK_REFERENCE',
        next_url: 'MOCK_URL',
        status: 'Success',
        serviceRequestReference: 'MOCK_REFERENCE',
      };

      paymentData = {
        caseId: '1234',
        returnUrl: 'MOCK_URL',
        applicantCaseName: 'MOCK_CASE_NAME',
        feeType: 'MOCK_FEE_TYPE',
        awpType: 'C2' as AWPApplicationType,
        partyType: 'applicant' as PartyType,
      };
    });

    test('initiatePayment when hwf reference exists', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: paymentResponse,
      });

      paymentData = { ...paymentData, hwfRefNumber: 'MOCK_REF_NUMBER' };

      expect(await paymentController.initiatePayment(paymentData)).toStrictEqual({
        context: 'PAYMENT_SUCCESS_HWF',
        response: {
          paymentReference: 'MOCK_REFERENCE',
          paymentDate: 'MOCK_DATE',
          externalReference: 'MOCK_REFERENCE',
          nextActionUrl: 'MOCK_URL',
          paymentStatus: 'Success',
          paymentServiceRequestReference: 'MOCK_REFERENCE',
        },
      });
    });

    test('initiatePayment when hwf reference doesnt exist', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: paymentResponse,
      });

      expect(await paymentController.initiatePayment(paymentData)).toStrictEqual({
        context: 'PAYMENT_SUCCESS',
        response: {
          paymentReference: 'MOCK_REFERENCE',
          paymentDate: 'MOCK_DATE',
          externalReference: 'MOCK_REFERENCE',
          nextActionUrl: 'MOCK_URL',
          paymentStatus: 'Success',
          paymentServiceRequestReference: 'MOCK_REFERENCE',
        },
      });
    });

    test('initiatePayment payment redirect', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: paymentResponse,
      });

      delete paymentResponse.serviceRequestReference;

      expect(await paymentController.initiatePayment(paymentData)).toStrictEqual({
        context: 'PAYMENT_REDIRECT',
        response: {
          paymentReference: 'MOCK_REFERENCE',
          paymentDate: 'MOCK_DATE',
          externalReference: 'MOCK_REFERENCE',
          nextActionUrl: 'MOCK_URL',
          paymentServiceRequestReference: undefined,
          paymentStatus: 'Success',
        },
        redirectUrl: 'MOCK_URL',
      });
    });

    test('initiatePayment payment error from lack of details', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: paymentResponse,
      });
      delete paymentResponse.next_url;
      delete paymentResponse.serviceRequestReference;

      let flag;
      try {
        await paymentController.initiatePayment(paymentData);
      } catch {
        flag = false;
      }
      expect(flag).toEqual(false);
    });

    test('initiatePayment other payment error', async () => {
      mockedAxios.post.mockRejectedValue({
        data: paymentResponse,
      });
      delete paymentResponse.next_url;
      delete paymentResponse.serviceRequestReference;

      let flag;
      try {
        await paymentController.initiatePayment(paymentData);
      } catch {
        flag = false;
      }
      expect(flag).toEqual(false);
    });
  });

  describe('PaymentAPI', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('PaymentAPI success', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { status: 'Success' } });

      expect(await PaymentAPI(userDetails.accessToken, Logger)).toBeInstanceOf(PaymentController);
    });
  });
});
