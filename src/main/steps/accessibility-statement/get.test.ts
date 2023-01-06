import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { AccessibilityStatementGetController } from './get';

describe('AccessibilityStatementGetController', () => {
  const controller = new AccessibilityStatementGetController();

  test('Should render the accessibility statement page for private law service', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...generatePageContent({
        language,
        pageContent: generateContent,
        userCase,
        userEmail: 'test@example.com',
      }),
      ...defaultViewArgs,
      userCase: req.session.userCase,
      paymentError: false,
      caseId: undefined,
    });
  });
});
