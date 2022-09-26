import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';

import AddApplicantPostController from './postController';

const dummyData = [
  {
    id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
    applicantFirstName: 'Test',
    applicantLastName: 'Test',
  },
  {
    id: '95dd0bb0-82da-49b2-ac5a-18e6e834948c',
    applicantFirstName: 'Test2',
    applicantLastName: 'Test2',
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
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
        applicantFirstName: '',
        applicantLastName: '',
      },
      {
        id: '95dd0bb0-82da-49b2-ac5a-18e6e834948c',
        applicantFirstName: undefined,
        applicantLastName: undefined,
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
});
