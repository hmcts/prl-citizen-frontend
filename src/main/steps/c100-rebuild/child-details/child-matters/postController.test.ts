import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import * as steps from '../../../../steps';
//import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
// import { ApplicationType, CITIZEN_UPDATE /*, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE*/ } from '../case/definition';

import Addchildrens from './postContoller';

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
    const body = {};
    const mockPhoneNumberFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Addchildrens(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.query.childId = dummySessionData.ListOfChild[0].id;
    req.session.lang = language;
    req.session.userCase.children = dummySessionData.ListOfChild;
    await controller.post(req, res);
    expect(req.session.userCase.children).toBe(dummySessionData.ListOfChild);
  });

  test('Child matter if isDecision not selected', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {};
    const requestBody = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Addchildrens(requestBody.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    req.query.childId = dummySessionData.ListOfChild[0].id;
    const language = 'en';
    req.session.lang = language;
    req.session.userCase.children = dummySessionData.ListOfChild;
    expect(req.session.userCase.children[0].childMatter.isDecision).toEqual(undefined);
    await controller.post(req, res);
    expect(req.session.userCase.children).toEqual(dummySessionData.ListOfChild);
  });

  test('isDecisionTaken - set as empty', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = {
      isDecisionTaken: '',
    };
    const mockPhoneNumberFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new Addchildrens(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    const language = 'en';
    req.session.lang = language;
    req.session.userCase.children = dummySessionData.ListOfChild;
    req.query.childId = dummySessionData.ListOfChild[0].id;
    await controller.post(req, res);
    expect(req.session.userCase.children).toEqual(dummySessionData.ListOfChild);
    expect(req.session.userCase.children[0].childMatter.isDecision).toEqual(undefined);
  });
});
