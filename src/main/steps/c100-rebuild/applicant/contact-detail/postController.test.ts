import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import ContactDetailPostController from './postController';

describe('ContactDetail Post Controller', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: 'a68f0076-5e0a-4751-85f0-f9d911eaa4ac',
          applicantFirstName: 'c1',
          applicantLastName: 'c1',
          detailsKnown: '',
          startAlternative: '',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: [],
          applicantContactDetail: {
            canProvideEmail: 'No',
            emailAddress: '',
            canProvideTelephoneNumber: 'Yes',
            telephoneNumber: '',
            canNotProvideTelephoneNumberReason: 'I cannot provide a mobile phone number',
            canLeaveVoiceMail: 'Yes',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: 'a68f0076-5e0a-4751-85f0-f9d911eaa4ac',
        },
      },
    },
  } as unknown as CommonContent;

  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactDetailPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        applicantId: 'a68f0076-5e0a-4751-85f0-f9d911eaa4ac',
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

  test('Should navigagte to the next page when there are no errors when saveAndComeLater button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactDetailPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        applicantId: 'a68f0076-5e0a-4751-85f0-f9d911eaa4ac',
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
