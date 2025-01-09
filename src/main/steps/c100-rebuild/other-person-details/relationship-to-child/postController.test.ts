import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { RelationshipType } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import OtherPersonsRelationshipToChildPostController from './postController';

describe('OtherPersonsRelationshipToChildPostController Post Controller', () => {
  const commonContent = {
    language: 'en',
    dateFormat: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            gender: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
      ],
      oprs_otherPersons: [
        {
          id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
          firstName: 'Amy',
          lastName: 'Root',
          personalDetails: {
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: '',
            otherGenderDetails: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                relationshipType: RelationshipType.MOTHER,
                childId: '20bda557-4d03-49c1-a3a4-a313431dc96d',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: 'eb609a11-a5f0-4cee-85ce-5670b58ca767',
                relationshipType: RelationshipType.FATHER,
                otherRelationshipTypeDetails: '',
              },
              {
                childId: '00e40672-de9f-4361-8b83-f5104d9aa11a',
                relationshipType: RelationshipType.GUARDIAN,
                otherRelationshipTypeDetails: '',
              },
            ],
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          childId: '7483640e-0817-4ddc-b709-6723f7925474',
          otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
        },
      },
    },
  } as unknown as CommonContent;

  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new OtherPersonsRelationshipToChildPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
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

  test('Should add relationship if there is no existing child relationship', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const req = mockRequest({
      ...commonContent,
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
      userCase: {
        ...commonContent.userCase,
        oprs_otherPersons: [
          {
            id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
            firstName: 'Amy',
            lastName: 'Root',
            personalDetails: {
              dateOfBirth: {
                day: '',
                month: '',
                year: '',
              },
              isDateOfBirthUnknown: '',
              approxDateOfBirth: {
                day: '',
                month: '',
                year: '',
              },
              gender: '',
              otherGenderDetails: '',
            },
            relationshipDetails: {
              relationshipToChildren: [],
            },
          },
        ],
      },
    });
    req.body = {
      relationshipType: RelationshipType.MOTHER,
      onlycontinue: true,
    };
    const controller = new OtherPersonsRelationshipToChildPostController(mockFields.fields);
    // req.session.userCase = ;
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);
    expect(req.session.userCase).toStrictEqual({
      cd_children: [
        {
          childMatters: {
            needsResolution: [],
          },
          firstName: 'Bob',
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          lastName: 'Silly',
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
          personalDetails: {
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            dateOfBirth: {
              day: '12',
              month: '12',
              year: '1987',
            },
            gender: 'Male',
            isDateOfBirthUnknown: '',
          },
        },
      ],
      id: '1234',
      oprs_otherPersons: [
        {
          firstName: 'Amy',
          id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
          lastName: 'Root',
          personalDetails: {
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: '',
            isDateOfBirthUnknown: '',
            otherGenderDetails: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '7483640e-0817-4ddc-b709-6723f7925474',
                otherRelationshipTypeDetails: '',
                relationshipType: 'Mother',
              },
            ],
          },
        },
      ],
    });
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new OtherPersonsRelationshipToChildPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
        otherPersonId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
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
