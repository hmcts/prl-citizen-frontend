import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';

import AddApplicants from './getController';

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

describe('Add Applicant Controller', () => {
  test('Should render the page', async () => {
    const controller = new AddApplicants('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest();
    const res = mockResponse();
    req.session.lang = language;
    req.session.userCase['appl_allApplicants'] = dummyData;
    await controller.get(req, res);
    expect(req.session.userCase['appl_allApplicants']).toEqual([
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
    ]);
  });
});

describe('Remove applicant using query from session', () => {
  test('removing applicant from session', async () => {
    const controller = new AddApplicants('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest();
    req.session.userCase['appl_allApplicants'] = dummyData;
    req.query = {
      action: 'remove',
      applicantId: '95dd0bb0-82da-49b2-ac5a-18e6e834948c',
    };
    req.session.userCase['applicantTemporaryFormData'] = {
      TempFirstName: '',
      TempLastName: '',
    };
    const res = mockResponse();
    req.session.lang = language;
    controller.removeApplicantUsingId(req, res);
    expect(req.session.userCase['appl_allApplicants']).toHaveLength(1);
    expect(req.session.userCase['appl_allApplicants']).toEqual([
      {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
        applicantFirstName: 'Test',
        applicantLastName: 'Test',
      },
    ]);
  });
});
