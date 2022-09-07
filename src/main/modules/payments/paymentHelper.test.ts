import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { PaymentHelper } from './paymentHelper';

const InstanceOfPaymentHelper = new PaymentHelper();

describe('PostController', () => {
  const req = mockRequest({});

  req.session.user.accessToken = 'XXYZ-DUMMT';
  req.protocol = 'http';
  req.host = 'localhost:3001';

  test('Should redirect back to the current page with the form data on errors', async () => {
    const generateMockSystemCredential = InstanceOfPaymentHelper.SystemCredentailsToApiData(req);

    expect(generateMockSystemCredential).not.toBe({
      Authorization: 'XXYZ-DUMMT',
      ServiceAuthorization: 'dummy',
      returnUrL: 'xyz',
      caseId: '12',
      applicantCaseName: 'Test',
    });
  });
});
