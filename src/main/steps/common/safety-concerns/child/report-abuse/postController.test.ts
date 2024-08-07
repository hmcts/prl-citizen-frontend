import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { C1AAbuseTypes } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
import SafteyConcernsAbusePostController from './postController';

describe('SafteyConcernsAbusePostController Post Controller', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/tasklistresponse',
        params: {
          abuseType: 'physicalAbuse',
        },
      },
    },
  } as unknown as CommonContent;

  test('Should navigagte to the next page without any errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new SafteyConcernsAbusePostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
      },
      body: {
        onlycontinue: true,
      },
      session: {
        lang: language,
      },
    });
    req.originalUrl = '/tasklistresponse';
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new SafteyConcernsAbusePostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
      },
      body: {
        saveAndComeLater: true,
      },
      session: {
        lang: language,
      },
    });
    req.originalUrl = '/tasklistresponse';
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
