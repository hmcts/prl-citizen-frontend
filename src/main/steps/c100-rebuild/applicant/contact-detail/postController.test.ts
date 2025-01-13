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
            applicantContactPreferences: 'email',
            canProvideEmail: 'Yes',
            emailAddress: 'app@test.com',
            canProvideTelephoneNumber: 'Yes',
            telephoneNumber: '012345678',
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

  test('Should clean data when email and telephone are provided', async () => {
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
        canProvideEmail: 'Yes',
        telephoneNumber: '012345678',
        emailAddress: 'test@test.com',
        canProvideTelephoneNumber: 'Yes',
        canNotProvideTelephoneNumberReason: 'Cannot provide telephone number',
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
    expect(req.session.userCase).toStrictEqual({
      appl_allApplicants: [
        {
          applicantContactDetail: {
            applicantContactPreferences: 'email',
            canLeaveVoiceMail: undefined,
            canNotProvideTelephoneNumberReason: '',
            canProvideEmail: 'Yes',
            canProvideTelephoneNumber: 'Yes',
            telephoneNumber: '012345678',
            emailAddress: 'test@test.com',
          },
          applicantFirstName: 'c1',
          applicantLastName: 'c1',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: [],
          detailsKnown: '',
          id: 'a68f0076-5e0a-4751-85f0-f9d911eaa4ac',
          start: '',
          startAlternative: '',
        },
      ],
    });
  });

  test('Should clean data when email and telephone cant be provided', async () => {
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
        canProvideEmail: 'No',
        canProvideTelephoneNumber: 'No',
        canNotProvideTelephoneNumberReason: 'Cannot provide telephone number',
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
    expect(req.session.userCase).toStrictEqual({
      appl_allApplicants: [
        {
          applicantContactDetail: {
            applicantContactPreferences: '',
            canLeaveVoiceMail: undefined,
            canNotProvideTelephoneNumberReason: 'Cannot provide telephone number',
            canProvideEmail: 'No',
            canProvideTelephoneNumber: 'No',
            emailAddress: '',
            telephoneNumber: '',
          },
          applicantFirstName: 'c1',
          applicantLastName: 'c1',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: [],
          detailsKnown: '',
          id: 'a68f0076-5e0a-4751-85f0-f9d911eaa4ac',
          start: '',
          startAlternative: '',
        },
      ],
    });
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

  test('Should navigagte to the next page when there is no email provided & no errors when continue button is clicked', async () => {
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
        canProvideEmail: 'No',
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
