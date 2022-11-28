import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
import ResponseTaskListGetController from './get';

describe('ResponseTaskListGetController', () => {
  const controller = new ResponseTaskListGetController();
  const language = 'en';

  test('Should render the ResponseTaskList page for private law service', async () => {
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
          additionalData: { req },
        }),
        // ...defaultViewArgs,
        // userCase: req.session.userCase,
      })
    );
  });
});
