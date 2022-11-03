import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
//import { YesOrNo } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import FeebackPostController from './postController';

const req = mockRequest({});
const res = mockResponse({});

const dummyData = [
  {
    id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
    applicantFirstName: 'Test1',
    applicantLastName: 'Test2',
    detailsKnown: 'Yes',
    startAlternative: '',
    start: 'Yes',
    contactDetailsPrivate: ['email'],
    contactDetailsPrivateAlternative: [],
  },
  {
    id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
    applicantFirstName: 'Test2',
    applicantLastName: 'Test2',
    detailsKnown: 'Yes',
    startAlternative: '',
    start: 'Yes',
    contactDetailsPrivate: ['email'],
    contactDetailsPrivateAlternative: [],
  },
];

describe('FeebackPostController - post Controller', () => {
  const mockDetailKnownForm = {
    fields: {},
  } as unknown as FormContent;
  const controller = new FeebackPostController(mockDetailKnownForm.fields);

  test('Check if current applicant is not the last applicant - it must redirect to next applicant', async () => {
    const language = 'en';
    req.session.lang = language;
    req.session.userCase.appl_allApplicants = dummyData;
    req['query']['applicantId'] = '480e8295-4c5b-4b9b-827f-f9be423ec1c5';
    await controller.post(req, res);
    expect(req.session.userCase['appl_allApplicants']).toEqual(dummyData);
    expect(
      req.session.userCase['appl_allApplicants'].findIndex(applicant => applicant['id'] === req.query['applicantId'])
    ).toBe(0);
  });

  test('Check if current applicant is not the last applicant - it shouldn"t redirect to next applicant', async () => {
    const language = 'en';
    req.session.lang = language;
    req.session.userCase.appl_allApplicants = dummyData;
    req['query']['applicantId'] = 'd8d2d081-115e-49e6-add9-bd8b0e3e851a';
    await controller.post(req, res);
    expect(req.session.userCase['appl_allApplicants']).toEqual(dummyData);
    expect(
      req.session.userCase['appl_allApplicants'].findIndex(applicant => applicant['id'] === req.query['applicantId'])
    ).not.toBe(0);
  });
});
