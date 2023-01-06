import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import ContactPreferencePostController from './postController';

describe('ContactPreferencePostController Post Controller', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          applicantContactDetail: {
            applicantContactPreferences: ['Digital'],
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: '7483640e-0817-4ddc-b709-6723f7925474',
        },
      },
    },
  } as unknown as CommonContent;

  test('Should navigate to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactPreferencePostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        applicantId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactPreferencePostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        applicantId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
