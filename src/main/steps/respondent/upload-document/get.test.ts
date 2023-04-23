import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
import UploadDocumentListGetController from './get';

describe('UploadDocumentListGetController', () => {
  const controller = new UploadDocumentListGetController();
  const language = 'en';

  test('Should render the RespondentTaskList page for private law service', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const userCase = req.session.userCase;

    expect(res.render).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...generatePageContent({
          language,
          pageContent: generateContent,
          userCase,
          userEmail: 'test@example.com',
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
