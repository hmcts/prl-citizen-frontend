import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { PaymentHandler, PaymentValidationHandler } from './paymentController';

const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

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
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls).toHaveLength(0);
  });
});
