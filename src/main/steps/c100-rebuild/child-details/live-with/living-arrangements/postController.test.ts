import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { PartyType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
import ChildLivingArrangementsPostController from './postController';

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
        liveWith: [
          {
            id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            firstName: 'Dummy',
            lastName: 'Test1',
            partyType: PartyType.APPLICANT,
          },
        ],
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

describe('PersonaldetailsPostController Post Controller', () => {
  test('Should navigate to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildLivingArrangementsPostController(mockFormContent.fields);
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
          liveWith: [
            {
              firstName: 'Dummy ',
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              lastName: 'Test1',
              partyType: 'applicant',
            },
          ],
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

  test('Should navigate to the next page when there are no errors when continue button is clicked > liveWith > !Array', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildLivingArrangementsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        onlycontinue: true,
        liveWith: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
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
          liveWith: [],
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

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildLivingArrangementsPostController(mockFormContent.fields);
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
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should update case child live with applicant when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildLivingArrangementsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        liveWith: [
          {
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            firstName: 'Bob',
            lastName: 'Silly',
            partyType: PartyType.APPLICANT,
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

  test('Should update case child live with applicant when save and come back button', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildLivingArrangementsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        liveWith: [
          {
            id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            firstName: 'Bob',
            lastName: 'Silly',
            partyType: PartyType.APPLICANT,
          },
        ],
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
  });

  test('Should update case child live with respondent when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildLivingArrangementsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        liveWith: [
          {
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            firstName: 'Bob',
            lastName: 'Silly',
            partyType: PartyType.RESPONDENT,
          },
        ],
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
  });

  test('Should delete isOtherPersonConfidential if live with removed for other person', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ChildLivingArrangementsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        liveWith: [
          {
            id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            firstName: 'Dummy',
            lastName: 'Test1',
            partyType: PartyType.APPLICANT,
          },
        ],
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
          oprs_otherPersons: [
            {
              id: '7483640e-0817-4ddc-b709-6723f7925476',
              firstName: 'test',
              lastName: 'other',
              isOtherPersonAddressConfidential: true,
            },
          ],
        },
      },
    });
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase.oprs_otherPersons).toEqual([
      { id: '7483640e-0817-4ddc-b709-6723f7925476', firstName: 'test', lastName: 'other' },
    ]);
  });
});
