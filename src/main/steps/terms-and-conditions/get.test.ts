import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { TermsAndConditionsGetController } from './get';

describe('TermsAndConditionsGetController', () => {
  const controller = new TermsAndConditionsGetController();

  test('Should render the accessibility statement page', async () => {
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
            user: {
              fullname: `${req.session.user.givenName} ${req.session.user.familyName}`,
            },
          },
        }),
      })
    );
  });
});
