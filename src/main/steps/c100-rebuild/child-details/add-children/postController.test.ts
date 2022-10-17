import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import AddChildrenPostController from './postContoller';

describe('AddChildrenPostController Post Controller', () => {
  const commonContent = {
    language: 'en',
  } as unknown as CommonContent;
  const dummyChildrenData = [
    {
      id: '7483640e-0817-4ddc-b709-6723f7925474',
      firstName: 'Bob',
      lastName: 'Silly',
      personalDetails: {
        dateOfBirth: {
          year: '',
          month: '',
          day: '',
        },
        isDateOfBirthUnknown: '',
        approxDateOfBirth: {
          year: '',
          month: '',
          day: '',
        },
        sex: '',
      },
      childMatters: {
        needsResolution: [],
      },
      parentialResponsibility: {
        statement: '',
      },
    },
    {
      id: '7483640e-0817-4ddc-b709-6723f7925485',
      firstName: 'Jane',
      lastName: 'Doe',
      personalDetails: {
        dateOfBirth: {
          year: '',
          month: '',
          day: '',
        },
        isDateOfBirthUnknown: '',
        approxDateOfBirth: {
          year: '',
          month: '',
          day: '',
        },
        sex: '',
      },
      childMatters: {
        needsResolution: [],
      },
      parentialResponsibility: {
        statement: '',
      },
    },
  ];

  test('Should redirect to the same page, when there are errors for added children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChildrenPostController(mockFormContent.fields);
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
          cd_children: [dummyChildrenData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should redirect to the same page, when there are errors while adding a new children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChildrenPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        childFirstName: 'Bob',
        childLastName: '',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          cd_children: [dummyChildrenData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should navigagte to the next page, when there are no errors present for added children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChildrenPostController(mockFormContent.fields);
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
          cd_children: [dummyChildrenData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.cd_children).toHaveLength(1);
    expect(req.session.userCase.cd_children[0]).toEqual(
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
    const controller = new AddChildrenPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        'firstName-1': 'Bob',
        'lastName-1': 'Silly',
        childFirstName: 'Jane',
        childLastName: 'Doe',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          cd_children: [dummyChildrenData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.cd_children).toHaveLength(2);
    expect(req.session.userCase.cd_children[1]).toEqual(
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
    const controller = new AddChildrenPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        childFirstName: 'Bob',
        childLastName: 'Silly',
        onlycontinue: true,
      },
      session: {
        lang: language,
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.cd_children).toHaveLength(1);
    expect(req.session.userCase.cd_children[0]).toEqual(
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
    const controller = new AddChildrenPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        childFirstName: 'Jane',
        childLastName: 'Doe',
        addChild: 'Yes',
      },
      session: {
        lang: language,
        userCase: {
          cd_children: [dummyChildrenData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.cd_children).toHaveLength(2);
    expect(req.session.userCase.cd_children[1]).toEqual(
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
    const controller = new AddChildrenPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        childFirstName: '',
        childLastName: 'Doe',
        addChild: 'Yes',
      },
      session: {
        lang: language,
        userCase: {
          cd_children: [dummyChildrenData[0]],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.cd_children).toHaveLength(1);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should remove the child and redirect to the same page when remove child button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChildrenPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        removeChild: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      session: {
        lang: language,
        userCase: {
          cd_children: dummyChildrenData,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.cd_children).toHaveLength(1);
    expect(req.session.userCase.cd_children[0]).toEqual(
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
    const controller = new AddChildrenPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        childFirstName: 'Connor',
        childLastName: 'Wills',
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          cd_children: dummyChildrenData,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
