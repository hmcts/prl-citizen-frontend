import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import mockUserCase from '../../../test/unit/utils/mockUserCase';
import { C100_CASE_EVENT } from '../../app/case/definition';

import { PaymentHandler, PaymentValidationHandler, submitCase } from './paymentController';

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
});
