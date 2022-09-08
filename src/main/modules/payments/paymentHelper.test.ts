import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { PaymentHelper } from './paymentHelper';

const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const dummyCaseID = '2122323';

const InstanceOfPaymentHelper = new PaymentHelper();
describe('PaymentHelper', () => {
  const req = mockRequest({});

  req.session.user.accessToken = mockToken;
  req.session.userCase.caseId = dummyCaseID;
  req.protocol = 'http';
  req.host = 'localhost:3001';
  test('Should redirect back to the current page with the form data on errors', async () => {
    const generateMockSystemCredential = await InstanceOfPaymentHelper.SystemCredentailsToApiData(req);

    expect(generateMockSystemCredential).toEqual({
      Authorization: mockToken,
      ServiceAuthorization: undefined,
      applicantCaseName: 'Test',
      caseId: dummyCaseID,
      returnUrL: 'http://undefined/payment/reciever/callback',
    });
  });
});
