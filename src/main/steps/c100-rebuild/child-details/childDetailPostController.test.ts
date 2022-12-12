import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { generateContent as generateChildMatters } from '../child-details/child-matters/content';
import { generateContent as generateChildParentalResponsibility } from '../child-details/parental-responsibility/content';
import { generateContent as generateChildPersonalDetails } from '../child-details/personal-details/content';

import ChildDetailsPostController from './childDetailPostController';

const commonContent = {
  language: 'en',
  userCase: {
    cd_children: [
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
          isDateOfBirthUnknown: 'Yes',
          approxDateOfBirth: {
            year: '1987',
            month: '12',
            day: '12',
          },
          sex: 'Male',
        },
        childMatters: {
          needsResolution: [],
        },
        parentialResponsibility: {
          statement: 'parentialResponsibility',
        },
      },
    ],
  },
  additionalData: {
    req: {
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
    },
  },
} as unknown as CommonContent;

describe('ChildDetailsPostController - personal detail common Post Controller', () => {
  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        _ctx: 'pd',
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
    generateChildPersonalDetails(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        _ctx: 'pd',
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
    generateChildPersonalDetails(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});

describe('ChildDetailsPostController - parential responsibility common Post Controller', () => {
  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        _ctx: 'pr',
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
    generateChildParentalResponsibility(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        _ctx: 'pr',
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
    generateChildParentalResponsibility(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});

describe('ChildDetailsPostController -  child matter common Post Controller', () => {
  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        _ctx: 'cm',
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
    generateChildMatters(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        _ctx: 'cm',
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
    generateChildMatters(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
