import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import * as steps from '../../../../steps';
//import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
// import { ApplicationType, CITIZEN_UPDATE /*, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE*/ } from '../case/definition';

import AddChilderns from './postContoller';

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

  test('Should redirect back to the current page with the form data on errors', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = { applicant1PhoneNumber: 'invalid phone number' };
    const mockPhoneNumberFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChilderns(mockPhoneNumberFormContent.fields);

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
    expect(1).toEqual(1);
  });

  test('adding a child', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChilderns(mockForm.fields);
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
    req.session.settings.listOfChild = dummySessionData;
    req.query.action = 'addChild';
    req.body = {
      'firstname-2': dummySessionData.ListOfChild[0].firstname,
      'lastname-2': dummySessionData.ListOfChild[0].lastname,
    };
    await controller.post(req, res);
    expect(req.session.settings.ListOfChild[0]).toEqual(dummySessionData.ListOfChild[0]);
  });

  test('adding a child with unexpected values', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChilderns(mockForm.fields);
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
    req.session.settings.listOfChild = dummySessionData;
    req.query.action = 'addChild';
    req.body = {
      'firstname-2': '',
      'lastname-2': '',
    };
    await controller.post(req, res);
    expect(req.session.settings.ListOfChild[0]).toEqual(dummySessionData.ListOfChild[0]);
  });

  test('removing a child from session', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChilderns(mockForm.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    req.query.action = 'removeChild';
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    req.session.settings.listOfChild = dummySessionData;
    await controller.post(req, res);
    await controller.addInformationUsingContinueButton(req, res);
    await controller.addInformationUsingContinueButton(req, res);
    expect(req.session.settings.ListOfChild?.length).toBe(1);
  });

  test('continue with adding a child in sessons', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChilderns(mockForm.fields);
    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    req.query.action = 'continue';
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    req.session.settings.listOfChild = dummySessionData;
    req.body = {
      'firstname-2': dummySessionData.ListOfChild[0].firstname,
      'lastname-2': dummySessionData.ListOfChild[0].lastname,
    };

    await controller.post(req, res);
    await controller.addInformationUsingContinueButton(req, res);
    req.body = dummySessionData.ListOfChild;
    await controller.updateInformationUsingContinueButton(req, res);
    expect(req.session.settings.ListOfChild[0]).toEqual(dummySessionData.ListOfChild[0]);
  });

  test('without an action', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const mockForm = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddChilderns(mockForm.fields);
    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    req.body = {
      'firstname-1': dummySessionData.ListOfChild[0].firstname,
      'lastname-1': dummySessionData.ListOfChild[0].lastname,
    };
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    req.session.settings.listOfChild = dummySessionData;
    await controller.post(req, res);
    await controller.addInformationUsingContinueButton(req, res);
    await controller.addInformationUsingContinueButton(req, res);
    expect(req.session.settings.ListOfChild[0]).toEqual(dummySessionData.ListOfChild[0]);
  });
});
