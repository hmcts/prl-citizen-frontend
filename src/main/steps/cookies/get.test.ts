import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { CookiesGetController } from './get';

describe('CookiesGetController', () => {
  const controller = new CookiesGetController();

  test('Should render the cookie page with privatelaw service content', async () => {
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
