import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import * as steps from '../../../../steps';
//import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
// import { ApplicationType, CITIZEN_UPDATE /*, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE*/ } from '../case/definition';

import ParentResponsibility from './postController';

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
        ApproximateDateOfBirth: '//',
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
        ApproximateDateOfBirth: '//',
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

  test('Parental responsibility controller with childId', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = { applicant1PhoneNumber: 'invalid phone number' };
    const mockPhoneNumberFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ParentResponsibility(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.query.childId = dummySessionData.ListOfChild[0].id;
    req.session.settings = settings;
    await controller.post(req, res);
    expect(req.session.settings.ListOfChild).toEqual(dummySessionData.ListOfChild);
    expect(req.originalUrl).not.toBe(req.redirectURI);
  });

  test('Parental responsibility controller with childId and parentalResponsibility', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {
      parentalResponsibility: '',
    };
    const mockPhoneNumberFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ParentResponsibility(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.query.childId = dummySessionData.ListOfChild[0].id;
    req.session.settings = settings;
    await controller.post(req, res);
    expect(req.session.settings.ListOfChild).toEqual(dummySessionData.ListOfChild);
    expect(req.originalUrl).not.toBe(req.redirectURI);
    expect(req.session.errors).not.toBe(0);
  });

  test('Parental responsibility controller without childId', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = { applicant1PhoneNumber: 'invalid phone number' };
    const mockPhoneNumberFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ParentResponsibility(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    await controller.post(req, res);
    expect(req.session.settings.ListOfChild).toEqual(dummySessionData.ListOfChild);
    expect(req.originalUrl).not.toBe(req.redirectURI);
    expect(req.session.lang).toBe(language);
  });
});
