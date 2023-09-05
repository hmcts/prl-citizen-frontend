import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';

const logger = {
  info: jest.fn(),
  error: jest.fn(),
};
Logger.getLogger.mockReturnValue(logger);

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { AWPApplicationType, PartyType } from '../../app/case/definition';
import { UserDetails } from '../../app/controller/AppRequest';

import { PaymentAPI, PaymentController, PaymentHandler, PaymentValidationHandler } from './paymentController';

const mockToken = 'authToken';

const dummyCaseID = '2122323';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

const req = mockRequest({});
req.session.user.accessToken = mockToken;
req.session.userCase.caseId = dummyCaseID;
req.protocol = 'http';
req.host = 'localhost:3001';

const res = mockResponse({});

describe('PaymentHandler', () => {
  test('Should render the page', async () => {
    const paymentDetailsRequestBody = {
      caseId: dummyCaseID,
      returnUrl: 'http://localhost:3001/payment/reciever/callback',
      applicantCaseName: 'Test',
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    await PaymentHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls).toHaveLength(0);
    expect(req.host).toBe('localhost:3001');
  });
});

describe('PaymentValidationHandler', () => {
  req.params.status = 'Success';
  req.params.paymentId = 'DUMMY_X100';
  const paymentDetails = {
    payment_reference: 'RF32-123',
    date_created: '9-10-2022',
    external_reference: 'N/A',
    next_url: 'http://localhost:3001/payment/reciever/callback/RC-12/Success',
    status: 'Success',
  };
  req.session.userCase.paymentDetails = paymentDetails;
  test('expecting PaymentValidationHandler Controller', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetails,
      },
    });
    await PaymentValidationHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledTimes(2);
    expect(res.send.mock.calls).toHaveLength(0);
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
