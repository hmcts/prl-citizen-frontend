import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { C100OrderTypes } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import AddOrderDetailsPostController from './postController';

describe('AddOrderDetails Post Controller', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        query: {
          orderType: 'careOrder',
        },
      },
    },
  } as unknown as CommonContent;

  test('Should navigagte to the next page without any errors', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddOrderDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      query: {
        orderType: C100OrderTypes.CARE_ORDER,
      },
      body: {
        onlycontinue: true,
      },
      session: {
        lang: language,
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
