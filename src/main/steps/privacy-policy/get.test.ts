import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { PrivacyPolicyGetController } from './get';

describe('PrivacyPolicyGetController', () => {
  const controller = new PrivacyPolicyGetController();

  test('Should render the privacy policy page with adoption content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...generatePageContent({
        language,
        pageContent: generateContent,
        userEmail: 'test@example.com',
        userCase: req.session.userCase,
      }),
      ...defaultViewArgs,
      userCase: req.session.userCase,
      paymentError: false,
      caseId: undefined,
    });
  });
});
