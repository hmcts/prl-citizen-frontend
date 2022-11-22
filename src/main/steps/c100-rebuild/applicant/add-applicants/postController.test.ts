import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';

import AddApplicantPostController from './postController';

const dummyData = [
  {
    id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
    applicantFirstName: 'Test1',
    applicantLastName: 'Test2',
    detailsKnown: '',
    startAlternative: '',
    start: 'Yes',
    contactDetailsPrivate: ['email'],
    contactDetailsPrivateAlternative: ['email'],
  },
  {
    id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
    applicantFirstName: 'Test2',
    applicantLastName: 'Test2',
    detailsKnown: '',
    startAlternative: '',
    start: 'Yes',
    contactDetailsPrivate: ['email'],
    contactDetailsPrivateAlternative: ['email'],
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
    expect(dummyData).toEqual(dummyData);
  });

  test('reseting form fields in Session', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['applicantTemporaryFormData'] = {
      TempFirstName: 'Test1',
      TempLastName: 'Test2',
    };
    controller.resetSessionTemporaryFormValues(req);
    expect(req.session.userCase['applicantTemporaryFormData']).toEqual({
      TempFirstName: '',
      TempLastName: '',
    });
  });

  test('Adding Applicant after clicking on Continue Button', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['appl_allApplicants'] = dummyData;
    req.body = {
      'ApplicantFirstName-1': '',
      'ApplicantLastName-1': '',
    };
    controller.mapEnteriesToValuesAfterContinuing(req, mockResponse());
    expect(req.session.userCase['appl_allApplicants']).toEqual([
      {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        applicantFirstName: '',
        applicantLastName: '',
        detailsKnown: '',
        startAlternative: '',
        start: 'Yes',
        contactDetailsPrivate: ['email'],
        contactDetailsPrivateAlternative: ['email'],
      },
      {
        id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
        applicantFirstName: undefined,
        applicantLastName: undefined,
        detailsKnown: '',
        startAlternative: '',
        start: 'Yes',
        contactDetailsPrivate: ['email'],
        contactDetailsPrivateAlternative: ['email'],
      },
    ]);
  });

  test('Adding Applicant after clicking on Continue Button - s', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['appl_allApplicants'] = dummyData;
    req.body = {
      'ApplicantFirstName-1': '',
      'ApplicantLastName-1': '',
    };
    controller.post(req, mockResponse());
    expect(req.session.userCase['appl_allApplicants']).toHaveLength(2);
  });

  test('Adding Applicant after if both body appliantfirst and applicantlastname is empty', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['appl_allApplicants'] = dummyData;
    req.body = {
      'ApplicantFirstName-1': '',
      'ApplicantLastName-1': '',
      applicantFirstName: '',
      applicantLastName: '',
    };
    controller.post(req, mockResponse());
    expect(req.session.userCase['appl_allApplicants']).toHaveLength(2);
  });

  test('Adding Applicant after if both body appliantfirst and applicantlastname with values', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['appl_allApplicants'] = dummyData;
    req.session.save = function () {
      return req.session;
    };
    req.body = {
      saveAndContinue: 'true',
      'ApplicantFirstName-1': 'da',
      'ApplicantLastName-1': 'x',
      applicantFirstName: 'test',
      applicantLastName: 'tes',
    };
    controller.post(req, mockResponse());
    expect(req.session.userCase['appl_allApplicants']).toHaveLength(3);
  });
  test('Adding another applicant using addAnotherApplicant', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['appl_allApplicants'] = dummyData;
    req.session.save = function () {
      return req.session;
    };
    req.body = {
      applicantFirstName: 'dummy 3',
      applicantLastName: 'dummy 3',
    };
    controller.addAnotherApplicant(req);
    expect(req.session.userCase['appl_allApplicants']).toHaveLength(3);
    expect(req.session.userCase['appl_allApplicants'][2].applicantFirstName).toBe('dummy 3');
    expect(req.session.userCase['appl_allApplicants'][2].applicantLastName).toBe('dummy 3');
  });

  test('Adding Applicant after if both body appliantfirst and applicantlastname without values', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['appl_allApplicants'] = [];
    req.session.save = function () {
      return req.session;
    };
    req.body = {
      saveAndContinue: 'true',
      'ApplicantFirstName-1': '',
      'ApplicantLastName-1': '',
      applicantFirstName: '',
      applicantLastName: '',
    };
    controller.post(req, mockResponse());
    expect(req.session.userCase['appl_allApplicants']).toHaveLength(0);
  });

  test('Adding Applicant after if both body appliantfirst and applicantlastname without values, saveAndContinue unchecked', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['appl_allApplicants'] = [];
    req.session.save = function () {
      return req.session;
    };
    req.body = {
      saveAndContinue: undefined,
      'ApplicantFirstName-1': '',
      'ApplicantLastName-1': '',
      applicantFirstName: '',
      applicantLastName: '',
    };
    (req.session.errors = [{ errorType: 'required', propertyName: 'needsResolution' }]),
      controller.post(req, mockResponse());
    expect(req.session.userCase['appl_allApplicants']).toHaveLength(0);
  });

  test('Redirecting Add Applicant clicking on Continue Button', async () => {
    const mockFields = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddApplicantPostController(mockFields.fields);
    const req = mockRequest();
    req.session.userCase['appl_allApplicants'] = [
      {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        applicantFirstName: 'abc',
        applicantLastName: 'abc',
        detailsKnown: '',
        startAlternative: '',
        start: 'Yes',
        contactDetailsPrivate: ['email'],
        contactDetailsPrivateAlternative: ['email'],
      },
    ];
    req.body = {
      'ApplicantFirstName-1': 'Test',
      'ApplicantLastName-1': 'Test',
    };
    controller.mapEnteriesToValuesAfterContinuing(req, mockResponse());
    expect(req.session.userCase['appl_allApplicants']).toEqual([
      {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        applicantFirstName: 'Test',
        applicantLastName: 'Test',
        detailsKnown: '',
        startAlternative: '',
        start: 'Yes',
        contactDetailsPrivate: ['email'],
        contactDetailsPrivateAlternative: ['email'],
      },
    ]);
  });
});
