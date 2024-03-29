import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { AccessibilityStatementGetController } from './get';

describe('AccessibilityStatementGetController', () => {
  const controller = new AccessibilityStatementGetController();
  const language = 'en';

  test('Should render the accessibility statement page for private law service', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const userCase = req.session.userCase;

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...generatePageContent({
        language,
        pageContent: generateContent,
        userCase,
        userEmail: 'test@example.com',
      }),
      ...defaultViewArgs,
      userCase: req.session.userCase,
      additionalData: expect.anything(),
      paymentError: { hasError: false, errorContext: null },
      caseId: '1234',
      breadcrumbs: [],
    });
  });
});
