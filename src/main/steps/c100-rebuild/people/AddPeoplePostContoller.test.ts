import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { generateContent as childrenGenerateContent } from '../child-details/add-children/content';
import { generateContent as otherChildrenGenerateContent } from '../child-details/other-children/names/content';

import AddPeoplePostContoller from './AddPeoplePostContoller';

const commonContent = {
  language: 'en',
} as unknown as CommonContent;

const mockData = [
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

describe('Add children', () => {
  test('Should redirect to the same page, when there are errors for added children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        'firstName-1': '',
        'lastName-1': 'Silly',
        _ctx: 'cd',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
        userCase: {
          cd_children: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    childrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should redirect to the same page, when there are errors while adding a new children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: 'Bob',
        c100TempLastName: '',
        _ctx: 'cd',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
        userCase: {
          cd_children: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    childrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should navigagte to the next page, when there are no errors present for added children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        'firstName-1': 'Bob',
        'lastName-1': 'Silly',
        _ctx: 'cd',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
        userCase: {
          cd_children: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    childrenGenerateContent(commonContent);
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
    const controller = new AddPeoplePostContoller(mockFormContent.fields);
    const req = mockRequest({
      body: {
        'firstName-1': 'Bob',
        'lastName-1': 'Silly',
        c100TempFirstName: 'Jane',
        c100TempLastName: 'Doe',
        _ctx: 'cd',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
        userCase: {
          cd_children: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    childrenGenerateContent(commonContent);
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
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: 'Bob',
        c100TempLastName: 'Silly',
        _ctx: 'cd',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
      },
    });
    const res = mockResponse();
    childrenGenerateContent(commonContent);
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

  test('Should add another child, throw error and redirect to the same page, when add another child button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: 'Jane',
        c100TempLastName: 'Doe',
        'firstName-1': 'Bob',
        'lastName-1': 'Silly',
        _ctx: 'cd',
        add: 'Yes',
      },
      session: {
        lang: 'en',
        userCase: {
          cd_children: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    childrenGenerateContent(commonContent);
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
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: '',
        c100TempLastName: 'Doe',
        _ctx: 'cd',
        add: 'Yes',
      },
      session: {
        lang: 'en',
        userCase: {
          cd_children: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    childrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.cd_children).toHaveLength(1);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should remove the child and redirect to the same page when remove child button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        _ctx: 'cd',
        remove: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      session: {
        lang: 'en',
        userCase: {
          cd_children: mockData,
        },
      },
    });
    const res = mockResponse();
    childrenGenerateContent(commonContent);
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
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: 'Connor',
        c100TempLastName: 'Wills',
        _ctx: 'cd',
        saveAndComeLater: true,
      },
      session: {
        lang: 'en',
        userCase: {
          cd_children: mockData,
        },
      },
    });
    const res = mockResponse();
    childrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});

describe('Add other children', () => {
  test('Should redirect to the same page, when there are errors for added children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        'firstName-1': '',
        'lastName-1': 'Silly',
        _ctx: 'oc',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
        userCase: {
          ocd_otherChildren: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should redirect to the same page, when there are errors while adding a new children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: 'Bob',
        c100TempLastName: '',
        _ctx: 'oc',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
        userCase: {
          ocd_otherChildren: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should navigagte to the next page, when there are no errors present for added children on continue', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        'firstName-1': 'Bob',
        'lastName-1': 'Silly',
        _ctx: 'oc',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
        userCase: {
          ocd_otherChildren: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.ocd_otherChildren).toHaveLength(1);
    expect(req.session.userCase.ocd_otherChildren[0]).toEqual(
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
    const controller = new AddPeoplePostContoller(mockFormContent.fields);
    const req = mockRequest({
      body: {
        'firstName-1': 'Bob',
        'lastName-1': 'Silly',
        c100TempFirstName: 'Jane',
        c100TempLastName: 'Doe',
        _ctx: 'oc',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
        userCase: {
          ocd_otherChildren: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.ocd_otherChildren).toHaveLength(2);
    expect(req.session.userCase.ocd_otherChildren[1]).toEqual(
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
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: 'Bob',
        c100TempLastName: 'Silly',
        _ctx: 'oc',
        onlycontinue: true,
      },
      session: {
        lang: 'en',
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.ocd_otherChildren).toHaveLength(1);
    expect(req.session.userCase.ocd_otherChildren[0]).toEqual(
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
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: 'Jane',
        c100TempLastName: 'Doe',
        'firstName-1': 'Bob',
        'lastName-1': 'Silly',
        _ctx: 'oc',
        add: 'Yes',
      },
      session: {
        lang: 'en',
        userCase: {
          ocd_otherChildren: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.ocd_otherChildren).toHaveLength(2);
    expect(req.session.userCase.ocd_otherChildren[1]).toEqual(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Doe',
      })
    );

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should add another child, throw error and redirect to the same page, when add another child button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: 'Jane',
        c100TempLastName: 'Doe',
        'firstName-1': 'Bob1',
        'lastName-1': 'Silly',
        _ctx: 'oc',
        add: 'Yes',
      },
      session: {
        lang: 'en',
        userCase: {
          ocd_otherChildren: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.ocd_otherChildren).toHaveLength(1);

    expect(res.redirect).toHaveBeenCalled();
  });
  test('Should not add another child and redirect to the same page with an error, when add another child button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: '',
        c100TempLastName: 'Doe',
        _ctx: 'oc',
        add: 'Yes',
      },
      session: {
        lang: 'en',
        userCase: {
          ocd_otherChildren: [mockData[0]],
        },
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.ocd_otherChildren).toHaveLength(1);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should remove the child and redirect to the same page when remove child button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        _ctx: 'oc',
        remove: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      session: {
        lang: 'en',
        userCase: {
          ocd_otherChildren: mockData,
        },
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(req.session.userCase.ocd_otherChildren).toHaveLength(1);
    expect(req.session.userCase.ocd_otherChildren[0]).toEqual(
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
    const controller = new AddPeoplePostContoller(mockFormContent.fields);

    const req = mockRequest({
      body: {
        c100TempFirstName: 'Connor',
        c100TempLastName: 'Wills',
        _ctx: 'oc',
        saveAndComeLater: true,
      },
      session: {
        lang: 'en',
        userCase: {
          ocd_otherChildren: mockData,
        },
      },
    });
    const res = mockResponse();
    otherChildrenGenerateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
