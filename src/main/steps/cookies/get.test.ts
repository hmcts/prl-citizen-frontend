import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { CookiesGetController } from './get';

describe('CookiesGetController', () => {
  const controller = new CookiesGetController();
  const language = 'en';

  test('Should render the cookie page with adoption service content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generatePageContent({
        language,
        pageContent: generateContent,
        userEmail: 'test@example.com',
        userCase: req.session.userCase,
        userIdamId: '123456'
      }),
      ...defaultViewArgs,
      userCase: req.session.userCase,
    });
  });
});
