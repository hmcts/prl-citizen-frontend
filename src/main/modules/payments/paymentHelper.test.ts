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
  req.session.userCase.applicantCaseName = 'Test';
  req.protocol = 'http';
  req.host = 'localhost:3001';
  test('Should match the output values corresponding to given input', async () => {
    const generateMockSystemCredential = await InstanceOfPaymentHelper.SystemCredentailsToApiData(req);

    expect(generateMockSystemCredential.Authorization).toEqual(mockToken);
    expect(generateMockSystemCredential.applicantCaseName).toEqual('Test');
    expect(generateMockSystemCredential.caseId).toEqual(dummyCaseID);
  });

  test('Shouldn"t match the output values corresponding to given input', async () => {
    const generateMockSystemCredential = await InstanceOfPaymentHelper.SystemCredentailsToApiData(req);

    expect(generateMockSystemCredential).not.toEqual({
      Authorization: '',
      ServiceAuthorization: '',
      applicantCaseName: '',
      caseId: '',
      returnUrL: '',
      hwfRefNumber: '',
    });
  });
});
