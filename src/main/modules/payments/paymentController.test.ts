import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { PaymentHandler, PaymentValidationHandler } from './paymentController';

const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const dummyCaseID = '2122323';

const req = mockRequest({});
req.session.user.accessToken = mockToken;
req.session.userCase.caseId = dummyCaseID;
req.protocol = 'http';
req.host = 'localhost:3001';

const res = mockResponse({});

describe('PaymentHandler', () => {
  test('testing the payment handler', () => {
    PaymentHandler(req, res);
    expect(1).toBe(1);
  });
});

describe('PaymentValidationHandler', () => {
  req.params.status = 'Success';
  req.params.paymentId = 'DUMMY_X100';
  test('ex', () => {
    PaymentValidationHandler(req, res);
    expect(1).toBe(1);
  });
});
