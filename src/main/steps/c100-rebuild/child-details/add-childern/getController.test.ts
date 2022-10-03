import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';

import AddChildern from './getController';

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

describe('Add Applicant Controller', () => {
  test('Should render the page', async () => {
    const controller = new AddChildern('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest();
    const res = mockResponse();
    req.session.lang = language;
    req.session.userCase['childern'] = dummyChild;
    await controller.get(req, res);
    expect(req.session.userCase['childern']).toEqual([
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
    ]);
  });
});

describe('Remove childern using query from session', () => {
  test('removing childern from session', async () => {
    const controller = new AddChildern('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest();
    req.session.userCase['childern'] = dummyChild;
    req.query = {
      action: 'remove',
      childId: '8689c8b2-a4f9-45f1-823a-66e18107852d',
    };
    req.session.userCase['tempChildernFormData'] = {
      TempFirstName: '',
      TempLastName: '',
    };
    const res = mockResponse();
    req.session.lang = language;
    controller.removeApplicantUsingId(req, res);
    expect(req.session.userCase['childern']).toHaveLength(1);
    expect(req.session.userCase['childern']).toEqual([
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
    ]);
  });
});
