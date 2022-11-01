import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import DetailKnownController from './postContoller';

const req = mockRequest({});
const res = mockResponse({});

const dummyData = [
  {
    id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
    applicantFirstName: 'Test1',
    applicantLastName: 'Test2',
    detailsKnown: '',
    startAlternative: '',
    start: '',
    contactDetailsPrivate: [],
    contactDetailsPrivateAlternative: [],
  },
  {
    id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
    applicantFirstName: 'Test2',
    applicantLastName: 'Test2',
    detailsKnown: '',
    startAlternative: '',
    start: '',
    contactDetailsPrivate: [],
    contactDetailsPrivateAlternative: [],
  },
];

describe('DetailKnownController - post Controller', () => {
  const mockDetailKnownForm = {
    fields: {},
  } as unknown as FormContent;
  const controller = new DetailKnownController(mockDetailKnownForm.fields);

  test('Testing Yes Scenario of Adding all Applicants', async () => {
    const language = 'en';
    req.session.lang = language;
    req.session.userCase.appl_allApplicants = dummyData;
    req['query']['applicantId'] = '480e8295-4c5b-4b9b-827f-f9be423ec1c5';
    req['body'] = {
      detailsKnown: 'Yes',
    };
    await controller.post(req, res);
    expect(req.session.userCase['appl_allApplicants']).toEqual(dummyData);
    expect(req.session.userCase['appl_allApplicants'][0].detailsKnown).toEqual(YesOrNo.YES);
  });

  test('Testing No Scenario of Adding all Applicants', async () => {
    const language = 'en';
    req.session.lang = language;
    req.session.userCase.appl_allApplicants = dummyData;
    req['query']['applicantId'] = 'd8d2d081-115e-49e6-add9-bd8b0e3e851a';
    req['body'] = {
      detailsKnown: 'No',
    };
    await controller.post(req, res);
    expect(req.session.userCase['appl_allApplicants']).toEqual(dummyData);
    expect(req.session.userCase['appl_allApplicants'][1].detailsKnown).toEqual(YesOrNo.NO);
  });
});
