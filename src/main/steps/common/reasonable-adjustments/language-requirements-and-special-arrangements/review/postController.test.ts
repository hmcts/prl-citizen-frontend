import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

import RALangReqSplArrangementsPostController from './postController';

describe('RA > language-requirements-and-special-arrangements > review > postController', () => {
  test('should redirect when onlyContinue is submitted', async () => {
    const req = mockRequest({
      body: {
        onlyContinue: true,
      },
      session: {
        userCase: {
          ra_languageReqAndSpecialArrangements: 'ra_languageReqAndSpecialArrangements',
        },
      },
    });
    const res = mockResponse();
    const controller = new RALangReqSplArrangementsPostController({});

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('should not redirect if onlyContinue is not present', async () => {
    const req = mockRequest({ body: {} });
    const res = mockResponse();
    const controller = new RALangReqSplArrangementsPostController({});

    await controller.post(req, res);
    expect(res.redirect).not.toHaveBeenCalled();
  });
});
