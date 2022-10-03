import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';

import AddApplicantPostController from './postController';

const dummyChild = [
  {
    id: '8689c8b2-a4f9-45f1-823a-66e18107852d',
    firstname: 'Test1',
    lastname: 'Test1',
    personalDetails: {
      DateoBirth: '',
      isDateOfBirthKnown: '',
      ApproximateDateOfBirth: '',
      Sex: '',
    },
    childMatter: {
      isDecisionTaken: '',
    },
    parentialResponsibility: {
      statement: '',
    },
  },
  {
    id: 'b910ce67-3f36-41e8-aa74-5a1276a65368',
    firstname: 'Test2',
    lastname: 'Test2',
    personalDetails: {
      DateoBirth: '',
      isDateOfBirthKnown: '',
      ApproximateDateOfBirth: '',
      Sex: '',
    },
    childMatter: {
      isDecisionTaken: '',
    },
    parentialResponsibility: {
      statement: '',
    },
  },
];
describe('PostController', () => {
  test('Should redirect back to the current page with the form data on errors', async () => {
    const mockPhoneNumberFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockPhoneNumberFormContent.fields);

    const req = mockRequest();
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    await controller.post(req, res);
    expect(dummyChild).toEqual(dummyChild);
  });

  test('reseting form fields in Session', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['tempchildrenFormData'] = {
      TempFirstName: 'Test1',
      TempLastName: 'Test2',
    };
    controller.resetSessionTemporaryFormValues(req);
    expect(req.session.userCase['tempchildrenFormData']).toEqual({
      TempFirstName: '',
      TempLastName: '',
    });
  });

  test('Adding children after clicking on Continue Button', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['children'] = dummyChild;
    req.body = {
      'childFirstName-1': '',
      'childLastName-1': '',
    };
    controller.mapEnteriesToValuesAfterContinuing(req, mockResponse());
    expect(req.session.userCase['children']).toEqual([
      {
        id: '8689c8b2-a4f9-45f1-823a-66e18107852d',
        firstname: '',
        lastname: '',
        personalDetails: {
          DateoBirth: '',
          isDateOfBirthKnown: '',
          ApproximateDateOfBirth: '',
          Sex: '',
        },
        childMatter: {
          isDecisionTaken: '',
        },
        parentialResponsibility: {
          statement: '',
        },
      },
      {
        id: 'b910ce67-3f36-41e8-aa74-5a1276a65368',
        firstname: undefined,
        lastname: undefined,
        personalDetails: {
          DateoBirth: '',
          isDateOfBirthKnown: '',
          ApproximateDateOfBirth: '',
          Sex: '',
        },
        childMatter: {
          isDecisionTaken: '',
        },
        parentialResponsibility: {
          statement: '',
        },
      },
    ]);
  });

  test('Adding children after clicking on Continue Button - s', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['children'] = dummyChild;
    req.body = {
      'childFirstName-1': '',
      'childLastName-1': '',
    };
    controller.post(req, mockResponse());
    expect(req.session.userCase['children']).toHaveLength(2);
  });

  test('Adding children after if both body appliantfirst and childLastName is empty', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['children'] = dummyChild;
    req.body = {
      'childFirstName-1': '',
      'childLastName-1': '',
      firstname: '',
      lastname: '',
    };
    controller.post(req, mockResponse());
    expect(req.session.userCase['children']).toHaveLength(2);
  });

  test('Adding Applicant after if both body appliantfirst and applicantlastname with values', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['children'] = dummyChild;
    req.session.save = function () {
      return req.session;
    };
    req.body = {
      saveAndContinue: 'true',
      'childFirstName-1': 'da',
      'childLastName-1': 'x',
      firstname: 'test',
      lastname: 'tes',
    };
    controller.post(req, mockResponse());
    expect(req.session.userCase['children']).toHaveLength(3);
  });
  test('Adding another applicant using addAnotherchild', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['children'] = dummyChild;
    req.session.save = function () {
      return req.session;
    };
    req.body = {
      firstname: 'dummy 3',
      lastname: 'dummy 3',
    };
    controller.addAnotherChild(req);
    expect(req.session.userCase['children']).toHaveLength(3);
    expect(req.session.userCase['children'][2].firstname).toBe('dummy 3');
  });
});
