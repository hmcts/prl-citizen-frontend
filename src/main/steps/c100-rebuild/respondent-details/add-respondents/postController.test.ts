import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import AddRespondentsPostController from './postController';

describe('AddRespondentsPostController Post Controller', () => {
  const commonContent = {
    language: 'en',
  } as unknown as CommonContent;
  const dummyRespondentsData = [
    {
      id: '7483640e-0817-4ddc-b709-6723f7925474',
      firstName: 'John',
      lastName: 'Doe',
      personalDetails: {
        repondentDetials: 'YES',
        gender: 'Male',
      },
      relationshipDetails: {
        relationshipToChildren: [
          {
            relationshipType: 'Father',
            childId: '7483640e-0817-4ddc-b709-6723f7925475',
          },
        ],
      },
      contactDetails: {
        emailAddress: 'test@gmail.com',
      },
    },
    {
      id: '7483640e-0817-4ddc-b709-6723f7925479',
      firstName: 'Jane',
      lastName: 'Doe',
      personalDetails: {
        repondentDetials: 'YES',
        gender: 'Male',
      },
      relationshipDetails: {
        relationshipToChildren: [
          {
            relationshipType: 'Father',
            childId: '7483640e-0817-4ddc-b709-6723f7925475',
          },
        ],
      },
      contactDetails: {
        emailAddress: 'test@gmail.com',
      },
    },
  ];

  test('Should redirect to the same page, when there are errors for added respondents on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        'firstName-1': '',
        'lastName-1': 'Doe',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentsData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should redirect to the same page, when there are errors while adding a new respondents on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        c100TempFirstName: 'John',
        c100TempLastName: '',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentsData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should navigagte to the next page, when there are no errors present for added respondents on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        'firstName-1': 'John',
        'lastName-1': 'Doe',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentsData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.resp_Respondents).toHaveLength(1);
    expect(req.session.userCase.resp_Respondents[0]).toEqual(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
      })
    );
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should navigagte to the next page, when there are no errors present for added respondents and save the details of new respondents on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        'firstName-1': 'John',
        'lastName-1': 'Doe',
        c100TempFirstName: 'Jane',
        c100TempLastName: 'Doe',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentsData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.resp_Respondents).toHaveLength(2);
    expect(req.session.userCase.resp_Respondents[1]).toEqual(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Doe',
      })
    );
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should navigagte to the next page, when there are no errors present while adding the fist respondent on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        c100TempFirstName: 'John',
        c100TempLastName: 'Doe',
        onlycontinue: true,
      },
      session: {
        lang: language,
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.resp_Respondents).toHaveLength(1);
    expect(req.session.userCase.resp_Respondents[0]).toEqual(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
      })
    );
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should add another respondent and redirect to the same page, when add another respondent button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        c100TempFirstName: 'Jane',
        c100TempLastName: 'Doe',
        addRespondent: 'Yes',
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentsData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.resp_Respondents).toHaveLength(2);
    expect(req.session.userCase.resp_Respondents[1]).toEqual(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Doe',
      })
    );

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should not add another respondent and redirect to the same page with an error, when add another respondent button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        c100TempFirstName: '',
        c100TempLastName: 'Doe',
        addRespondent: 'Yes',
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentsData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.resp_Respondents).toHaveLength(1);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should remove the respondent and redirect to the same page when remove respondent button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        removeRespondent: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: dummyRespondentsData,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.resp_Respondents).toHaveLength(1);
    expect(req.session.userCase.resp_Respondents[0]).toEqual(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Doe',
      })
    );
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        c100TempFirstName: 'Connor',
        c100TempLastName: 'Wills',
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: dummyRespondentsData,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
