import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { ProceedingsOrderTypes } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import AddOrderDetailsPostController from './postController';

describe('AddOrderDetails Post Controller', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          orderType: 'careOrder',
        },
      },
    },
  } as unknown as CommonContent;

  test('Should navigagte to the next page without any errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddOrderDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        orderType: ProceedingsOrderTypes.CARE_ORDER,
      },
      body: {
        onlyContinue: true,
      },
      session: {
        lang: language,
      },
    });
    req.body.saveAsDraft = true;
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should add another order and redirect to the same page when add another order button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddOrderDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        orderType: ProceedingsOrderTypes.CARE_ORDER,
      },
      body: {
        addOrder: 'Yes',
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
