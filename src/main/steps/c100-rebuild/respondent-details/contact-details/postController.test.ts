import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import ContactDetailsPostController from './postController';

describe('ContactDetailsPostController Post Controller', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      resp_Respondents: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          contactDetails: {
            donKnowEmailAddress: YesOrNo.NO,
            emailAddress: '',
            telephoneNumber: '',
            donKnowTelephoneNumber: YesOrNo.NO,
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
        },
      },
    },
  } as unknown as CommonContent;

  test('Should navigate to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
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
    const controller = new ContactDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
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

  test('Should clean email address and telephone number when dont know is yes', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        respondentId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        saveAndComeLater: true,
        donKnowEmailAddress: ['', 'Yes'],
        donKnowTelephoneNumber: ['', 'Yes'],
        emailAddress: 'test@test.com',
        telephoneNumber: '012345678',
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [
            {
              id: '7483640e-0817-4ddc-b709-6723f7925474',
              firstName: 'Bob',
              lastName: 'Silly',
              contactDetails: {
                donKnowEmailAddress: YesOrNo.NO,
                emailAddress: 'test@test.com',
                telephoneNumber: '012345678',
                donKnowTelephoneNumber: YesOrNo.NO,
              },
            },
          ],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase).toStrictEqual({
      resp_Respondents: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          contactDetails: {
            donKnowEmailAddress: YesOrNo.YES,
            emailAddress: '',
            telephoneNumber: '',
            donKnowTelephoneNumber: YesOrNo.YES,
          },
        },
      ],
    });
  });
});
