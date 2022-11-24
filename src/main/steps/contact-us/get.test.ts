//import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { ContactUsGetController } from './get';

describe('ContactUsGetController', () => {
  const controller = new ContactUsGetController();

  test('Should render the contact us page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const language = 'en';

    expect(res.render).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...generatePageContent({
          language,
          pageContent: generateContent,
          userEmail: 'test@example.com',
          userCase: req.session.userCase,
          additionalData: {
            req,
          },
        }),
        // ...defaultViewArgs,
        // userCase: req.session.userCase,
      })
    );
  });
});
