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
  const dummyRespondentData = [
    {
      id: '7483640e-0817-4ddc-b709-6723f7925474',
      firstName: 'Bob',
      lastName: 'Silly',
    },
    {
      id: '7483640e-0817-4ddc-b709-6723f7925485',
      firstName: 'Jane',
      lastName: 'Doe',
    },
  ];

  test('Should redirect to the same page, when there are errors for added children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        'firstName-1': '',
        'lastName-1': 'Silly',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should redirect to the same page, when there are errors while adding a new respondent on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        c100TempFirstName: 'Bob',
        c100TempLastName: '',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should navigagte to the next page, when there are no errors present for added respondent on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        'firstName-1': 'Bob',
        'lastName-1': 'Silly',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.resp_Respondents).toHaveLength(1);
    expect(req.session.userCase.resp_Respondents[0]).toEqual(
      expect.objectContaining({
        firstName: 'Bob',
        lastName: 'Silly',
      })
    );
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should navigagte to the next page, when there are no errors present for added children and save the details of new children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        'firstName-1': 'Bob',
        'lastName-1': 'Silly',
        c100TempFirstName: 'Jane',
        c100TempLastName: 'Doe',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [dummyRespondentData[0]],
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

  test('Should navigagte to the next page, when there are no errors present while adding the fist child on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddRespondentsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        c100TempFirstName: 'Bob',
        c100TempLastName: 'Silly',
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
        firstName: 'Bob',
        lastName: 'Silly',
      })
    );
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should add another child and redirect to the same page, when add another child button is clicked', async () => {
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
          resp_Respondents: [dummyRespondentData[0]],
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

  test('Should not add another child and redirect to the same page with an error, when add another child button is clicked', async () => {
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
          resp_Respondents: [dummyRespondentData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.resp_Respondents).toHaveLength(1);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should remove the Respondent and redirect to the same page when remove respondent button is clicked', async () => {
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
          resp_Respondents: dummyRespondentData,
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
          resp_Respondents: dummyRespondentData,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
