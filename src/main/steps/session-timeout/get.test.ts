import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Language, generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { SessionTimeoutGetController } from './get';

describe('SessionTimeoutGetController', () => {
  let controller: SessionTimeoutGetController;

  beforeEach(() => {
    controller = new SessionTimeoutGetController();
  });

  test('should destroy session and render timeout page', async () => {
    const req = mockRequest({
      session: {
        lang: 'en' as Language,
        user: { email: 'test@example.com' },
        userCase: {},
        destroy: jest.fn(cb => cb()), // immediately call the callback
      },
    });

    const res = mockResponse();

    const content = generatePageContent({
      language: req.session.lang,
      pageContent: generateContent,
      userCase: req.session.userCase,
      userEmail: req.session.user.email,
      additionalData: { req },
    });

    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith('session-timeout/template', content);
  });
});
