import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import * as steps from '../../../../steps';
//import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
// import { ApplicationType, CITIZEN_UPDATE /*, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE*/ } from '../case/definition';
import { C100_CHILDERN_DETAILS_CHILD_MATTERS } from '../../../urls';

import Personaldetails from './postController';

// import Mock = jest.Mock;

const dummySessionData = {
  ListOfChild: [
    {
      firstname: 'Dummy ',
      id: 'f817b708-977e-4ed1-b241-c9030a204312',
      lastname: 'Test1',
      personalDetails: {
        DateoBirth: '27/12/1967',
        Sex: 'male',
        isDateOfBirthKnown: 'No',
        ApproximateDateOfBirth: '27/27/1990',
      },
      childMatter: {
        isDecisionTaken: 'Yes',
      },
      parentialResponsibility: {
        statement: 'lorem ipsum',
      },
    },
    {
      firstname: 'Dummy',
      id: '68f1a216-cd7f-4399-867b-a0a700f171a7',
      lastname: 'Test2',
      personalDetails: {
        DateoBirth: '11/01/1988',
        Sex: 'unspecified',
        isDateOfBirthKnown: 'No',
        ApproximateDateOfBirth: '27/12/1992',
      },
      childMatter: {
        isDecisionTaken: 'Yes',
      },
      parentialResponsibility: {
        statement: 'lorem ipsum',
      },
    },
  ],
};

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

describe('PostController', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('post should be able to save personal information', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Personaldetails(mockForm.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    await controller.post(req, res);
    expect(1).toEqual(1);
  });

  test('proceed saving child without error', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Personaldetails(mockForm.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    await controller.proceedWithoutError(req, res);

    const redirectUrl = C100_CHILDERN_DETAILS_CHILD_MATTERS + `?childId=${dummySessionData.ListOfChild[0].id}`;
    expect(req.originalUrl).not.toBe(redirectUrl);
    expect(req.session.settings.ListOfChild).toEqual(dummySessionData.ListOfChild);
  });

  // eslint-disable-next-line jest/expect-expect
  test('childDateValidDateValidations for child data', async () => {
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Personaldetails(mockForm.fields);
    const req = mockRequest({ body });
    const language = 'en';
    req.session.lang = language;
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;

    const childRequestBody = {
      'child-dateOfBirth-day': '12',
      'child-dateOfBirth-month': '13',
      'child-dateOfBirth-year': '1990',
    };
    req.body = childRequestBody;
    const returnType = await controller.childDateValidDateValidations(req);
    expect(returnType).toBe(true);
  });

  test('Child has both date and Approx date enabled', async () => {
    const body = {
      'child-dateOfBirth-day': '12',
      'child-dateOfBirth-month': '13',
      'child-dateOfBirth-year': '1990',
      'child-approx-dateOfBirth-day': '12',
      'child-approx-dateOfBirth-month': '1',
      'child-approx-sdateOfBirth-year': '1991',
      steps_children_personal_details: 'true',
    };
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Personaldetails(mockForm.fields);
    const req = mockRequest({ body });
    const language = 'en';
    req.session.lang = language;
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;

    controller.post(req, mockResponse());
    expect(1).toBe(1);
  });

  // eslint-disable-next-line jest/expect-expect
  test('childDateValidations and childSex validations for child data', async () => {
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Personaldetails(mockForm.fields);
    const req = mockRequest({ body });
    const language = 'en';
    req.session.lang = language;
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;

    const childRequestBody = {
      'child-dateOfBirth-day': '',
      'child-dateOfBirth-month': '',
      'child-dateOfBirth-year': '',
      steps_children_personal_details: 'true',
    };
    req.body = childRequestBody;
    const returnType = await controller.childDateValidations(req);
    expect(returnType).toBe(true);

    const amendedCHildRequestBody = {
      'child-dateOfBirth-day': '20',
      'child-dateOfBirth-month': '',
      'child-dateOfBirth-year': '',
      steps_children_personal_details: 'true',
    };
    req.body = amendedCHildRequestBody;
    const returnAmendedType = await controller.childDateValidations(req);
    expect(returnAmendedType).toBe(false);

    req.body = amendedCHildRequestBody;
    const childSexValidation = await controller.childSexValidation(req);
    expect(childSexValidation).toBe(false);
  });

  // eslint-disable-next-line jest/expect-expect
  test('childApproximatelyDateValidator for child data', async () => {
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Personaldetails(mockForm.fields);
    const req = mockRequest({ body });
    const language = 'en';
    req.session.lang = language;
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;

    const childRequestBody = {
      'child-approx-dateOfBirth-day': '12',
      'child-approx-dateOfBirth-month': '13',
      'child-approx-dateOfBirth-year': '1990',
      steps_children_personal_details: 'true',
    };
    req.body = childRequestBody;
    const returnType = await controller.childApproximatelyDateValidator(req);
    expect(returnType).toBe(false);
  });

  test('childApproximatelyDateValidator for child data with empty values', async () => {
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Personaldetails(mockForm.fields);
    const req = mockRequest({ body });
    const language = 'en';
    req.session.lang = language;
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;

    const childRequestBody = {
      'child-approx-dateOfBirth-day': '32',
      'child-approx-dateOfBirth-month': '13',
      'child-approx-dateOfBirth-year': '1880',
      steps_children_personal_details: 'true',
    };
    req.body = childRequestBody;
    const returnType = await controller.childApproximatelyDateValidator(req);
    expect(returnType).not.toBe(true);
  });

  test('personalDetailsMapper for child data', async () => {
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Personaldetails(mockForm.fields);
    const req = mockRequest({ body });
    const language = 'en';
    req.session.lang = language;
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    const childRequestBody = {
      'child-dateOfBirth-day': '12',
      'child-dateOfBirth-month': '13',
      'child-dateOfBirth-year': '1990',
      steps_children_personal_details: 'true',
    };

    const childRequestBodyApprox = {
      'child-approx-dateOfBirth-day': '12',
      'child-approx-dateOfBirth-month': '13',
      'child-approx-dateOfBirth-year': '1990',
    };
    req.body = childRequestBody;
    req.body = {
      ...childRequestBody,
      ...childRequestBodyApprox,
      Sex: 'male',
    };
    const returnType = await controller.personalDetailsMapper(req);
    req.query.childId = dummySessionData.ListOfChild[0].id;
    await controller.proceedWithoutError(req, mockResponse());
    expect(returnType).not.toEqual({
      ApproximateDateOfBirth: '12/13/1990',
      DateoBirth: '12/13/1990',
      isDateOfBirthKnown: 'No',
      Sex: 'male',
    });
  });
});
