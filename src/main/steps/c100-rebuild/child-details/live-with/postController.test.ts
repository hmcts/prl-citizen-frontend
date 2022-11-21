import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { PartyType } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import PersonaldetailsPostController from './postController';

describe('PersonaldetailsPostController Post Controller', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      people: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          partyType: PartyType.CHILDREN,
        },
      ],

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
              id: '7483640e-0817-4ddc-b709-6723f7925474',
              firstName: 'Bob',
              lastName: 'Silly',
              partyType: PartyType.CHILDREN,
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

  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new PersonaldetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
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
      fields: {
        liveWith: {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          partyType: PartyType.CHILDREN,
        },
      },
    } as unknown as FormContent;
    const controller = new PersonaldetailsPostController(mockFormContent.fields);
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
            partyType: PartyType.CHILDREN,
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

  test('Should call post and update other person > relationship to child', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const req = mockRequest(commonContent);
    req.body = {
      liveWith: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          partyType: PartyType.CHILDREN,
        },
      ],
      onlycontinue: true,
    };
    const controller = new PersonaldetailsPostController(mockFields.fields);
    // req.session.userCase = ;
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
    // expect(req.session.userCase).toEqual({ ...commonContent.userCase, id: '1234' });
    // expect(res.redirect).toHaveBeenCalledWith('/citizen-home');
  });
});
