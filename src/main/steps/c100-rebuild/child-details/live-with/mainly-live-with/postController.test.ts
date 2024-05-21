import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { PartyType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
import ChildMainlyLiveWithPostController from './postController';

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
          statement: 'test',
        },
        mainlyLiveWith: {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          firstName: 'Bob',
          lastName: 'Silly',
          partyType: PartyType.APPLICANT,
        },
      },
    ],
    appl_allApplicants: [
      {
        applicantFirstName: 'Dummy ',
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        applicantLastName: 'Test1',
        applicantAddressPostcode: 'AG11NB',
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

describe('ChildMainlyLiveWithPostController Post Controller', () => {
  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildMainlyLiveWithPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        onlycontinue: true,
        liveWith: ['480e8295-4c5b-4b9b-827f-f9be423ec1c5'],
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
    expect(req.session.userCase).toEqual({
      appl_allApplicants: [
        {
          applicantAddressPostcode: 'AG11NB',
          applicantFirstName: 'Dummy ',
          applicantLastName: 'Test1',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        },
      ],
      cd_children: [
        {
          childMatters: {
            needsResolution: [],
          },
          firstName: 'Bob',
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          lastName: 'Silly',
          mainlyLiveWith: {
            firstName: 'Bob',
            id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            lastName: 'Silly',
            partyType: 'applicant',
          },

          parentialResponsibility: {
            statement: 'test',
          },
          personalDetails: {
            approxDateOfBirth: {
              day: '12',
              month: '12',
              year: '1987',
            },
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            isDateOfBirthUnknown: 'Yes',
            sex: 'Male',
          },
        },
      ],
    });
  });

  test('Should navigagte to the next page when there are no errors when continue button is clicked and mainlyLiveWith is string id', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildMainlyLiveWithPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        onlycontinue: true,
        mainlyLiveWith: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
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
    expect(req.session.userCase).toEqual({
      appl_allApplicants: [
        {
          applicantAddressPostcode: 'AG11NB',
          applicantFirstName: 'Dummy ',
          applicantLastName: 'Test1',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        },
      ],
      cd_children: [
        {
          childMatters: {
            needsResolution: [],
          },
          firstName: 'Bob',
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          lastName: 'Silly',
          mainlyLiveWith: {
            firstName: 'Dummy ',
            id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            lastName: 'Test1',
            partyType: 'applicant',
          },
          parentialResponsibility: {
            statement: 'test',
          },
          personalDetails: {
            approxDateOfBirth: {
              day: '12',
              month: '12',
              year: '1987',
            },
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            isDateOfBirthUnknown: 'Yes',
            sex: 'Male',
          },
        },
      ],
    });
  });

  test('Should redirect to same page when errors are present', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildMainlyLiveWithPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
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
    req.url = '/mockUrl/mainly-live-with';
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/mockUrl/mainly-live-with');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'required',
        propertyName: 'mainlyLiveWith',
      },
    ]);
  });

  test('Should update case child mainly live with applicant when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildMainlyLiveWithPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        mainlyLiveWith: {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          firstName: 'Bob',
          lastName: 'Silly',
          partyType: PartyType.APPLICANT,
        },
        appl_allApplicants: [
          {
            applicantFirstName: 'Dummy ',
            id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            applicantLastName: 'Test1',
            applicantAddressPostcode: 'AG11NB',
          },
        ],
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
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should update case child mainly live with applicant when save and come back button', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildMainlyLiveWithPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        mainlyLiveWith: {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          firstName: 'Bob',
          lastName: 'Silly',
          partyType: PartyType.APPLICANT,
        },
        appl_allApplicants: [
          {
            id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            firstName: 'Bob',
            lastName: 'Silly',
            partyType: PartyType.APPLICANT,
          },
        ],
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
          appl_allApplicants: [
            {
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              firstName: 'Bob',
              lastName: 'Silly',
              partyType: PartyType.APPLICANT,
            },
          ],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should update case child mainly live with respondent when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildMainlyLiveWithPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        mainlyLiveWith: {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          partyType: PartyType.RESPONDENT,
        },

        respondent: [
          {
            id: '983640e-0817-4ddc-b709-6723f7925094',
            respondentFirstName: 'rob',
            respondentLastName: 'di',
            partyType: PartyType.RESPONDENT,
          },
        ],
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
    expect(req.session.errors).toStrictEqual([]);
  });
});
