import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { RelationshipType } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import RespondentsRelationshipToChildPostController from './postController';

const dummyData = {
  language: 'en',
  params: {
    childId: '7483640e-0817-4ddc-b709-6723f7925474',
    respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
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
          statement: 'test stmt',
        },
      },
    ],
    resp_Respondents: [
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
  body: {
    onlycontinue: true,
  },
  additionalData: {
    req: {
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
        respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
      },
    },
  },
} as unknown as CommonContent;

describe('PostController', () => {
  test('Should create instance of RespondentsRelationshipToChildPostController', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;

    const controller = new RespondentsRelationshipToChildPostController(mockFields.fields);

    expect(controller).toBeInstanceOf(RespondentsRelationshipToChildPostController);
  });

  test('Should call post and update respondent > relationship to child', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const req = mockRequest(dummyData);
    req.body = {
      relationshipType: RelationshipType.MOTHER,
      onlycontinue: true,
    };
    const controller = new RespondentsRelationshipToChildPostController(mockFields.fields);
    // req.session.userCase = ;
    const res = mockResponse();
    generateContent(dummyData);
    await controller.post(req, res);
    expect(req.session.userCase).toEqual({ ...dummyData.userCase, id: '1234' });
    expect(res.redirect).toHaveBeenCalledWith('/citizen-home');
  });

  test('Should add relationship if there is an existing child relationship and index >= 0', async () => {
    const testData = {
      ...dummyData,
      userCase: {
        ...dummyData.userCase,
        appl_allApplicants: [
          {
            id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
            applicantFirstName: 'Amy',
            applicantLastName: 'Root',
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
                  relationshipType: RelationshipType.EMPTY,
                  childId: '',
                  otherRelationshipTypeDetails: '',
                },
              ],
            },
          },
        ],
      },
    };
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const req = mockRequest(testData);
    req.body = {
      relationshipType: RelationshipType.MOTHER,
      onlycontinue: true,
    };
    const controller = new RespondentsRelationshipToChildPostController(mockFields.fields);
    // req.session.userCase = ;
    const res = mockResponse();
    generateContent(dummyData);
    await controller.post(req, res);
    expect(req.session.userCase).toEqual({ ...testData.userCase, id: '1234' });
    expect(res.redirect).toHaveBeenCalledWith('/citizen-home');
  });

  test('Should add relationship if there is an existing child relationship', async () => {
    const testData = {
      ...dummyData,
      userCase: {
        ...dummyData.userCase,
        appl_allApplicants: [
          {
            id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
            applicantFirstName: 'Amy',
            applicantLastName: 'Root',
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
    };
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const req = mockRequest(testData);
    req.body = {
      relationshipType: RelationshipType.MOTHER,
      onlycontinue: true,
    };
    const controller = new RespondentsRelationshipToChildPostController(mockFields.fields);
    // req.session.userCase = ;
    const res = mockResponse();
    generateContent(dummyData);
    await controller.post(req, res);
    expect(req.session.userCase).toEqual({ ...testData.userCase, id: '1234' });
    expect(res.redirect).toHaveBeenCalledWith('/citizen-home');
  });

  test('Should call saveAndComeLater when saveAndComeLater is called', async () => {
    const testData = {
      ...dummyData,
      userCase: {
        ...dummyData.userCase,
        appl_allApplicants: [
          {
            id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
            applicantFirstName: 'Amy',
            applicantLastName: 'Root',
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
    };
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const req = mockRequest(testData);
    req.body = {
      relationshipType: RelationshipType.MOTHER,
      saveAndComeLater: true,
    };
    const controller = new RespondentsRelationshipToChildPostController(mockFields.fields);
    // req.session.userCase = ;
    const res = mockResponse();
    generateContent(dummyData);
    await controller.post(req, res);
    expect(req.session.userCase).toEqual({ ...testData.userCase, id: '1234' });
    expect(res.redirect).toHaveBeenCalledWith('/request');
  });
});
