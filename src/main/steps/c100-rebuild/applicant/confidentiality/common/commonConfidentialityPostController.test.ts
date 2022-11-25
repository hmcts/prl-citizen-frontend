import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { Gender, YesNoEmpty } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import ApplicantCommonConfidentialityController from './commonConfidentialityPostController';

const req = mockRequest({});
const res = mockResponse({});

const dummyData = [
  {
    id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
    applicantFirstName: 'Test1',
    applicantLastName: 'Test2',
    detailsKnown: '',
    startAlternative: '',
    start: 'Yes',
    contactDetailsPrivate: [],
    contactDetailsPrivateAlternative: [],
    personalDetails: {
      haveYouChangeName: YesNoEmpty.EMPTY,
      applPreviousName: '',
      dateOfBirth: {
        day: '',
        month: '',
        year: '',
      },
      gender: Gender.EMPTY,
      otherGenderDetails: '',
      applicantPlaceOfBirth: '',
    },
  },
  {
    id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
    applicantFirstName: 'Test2',
    applicantLastName: 'Test2',
    detailsKnown: '',
    startAlternative: '',
    start: 'Yes',
    contactDetailsPrivate: [],
    contactDetailsPrivateAlternative: [],
    personalDetails: {
      haveYouChangeName: YesNoEmpty.EMPTY,
      applPreviousName: '',
      dateOfBirth: {
        day: '',
        month: '',
        year: '',
      },
      gender: Gender.EMPTY,
      otherGenderDetails: '',
      applicantPlaceOfBirth: '',
    },
  },
];

describe('CommonConfidentialityController - post Controller', () => {
  const mockFields = {
    fields: {},
  } as unknown as FormContent;
  const controller = new ApplicantCommonConfidentialityController(mockFields.fields);

  test('post controller checking if applicants are getting stored', async () => {
    const language = 'en';
    req.session.lang = language;
    req.session.userCase.appl_allApplicants = dummyData;
    await controller.post(req, res);
    expect(req.session.userCase['appl_allApplicants']).toEqual([]);
  });

  test('postcontroller detail know screen', async () => {
    const language = 'en';
    req.session.lang = language;
    req.params.applicantId = '480e8295-4c5b-4b9b-827f-f9be423ec1c5';
    req.session.userCase.appl_allApplicants = dummyData;
    req.body = {
      _ctx: 'appl_detailsknow',
      detailsKnown: 'Yes',
      contactDetailsPrivate: [],
    };
    await controller.post(req, res);
    expect(req.session.userCase['appl_allApplicants'].toString()).toEqual(dummyData.toString());
    expect(req.session.userCase['appl_allApplicants'][0].contactDetailsPrivate).toEqual([]);
  });
  test('postcontroller Start', async () => {
    const language = 'en';
    req.session.lang = language;
    req.params.applicantId = '480e8295-4c5b-4b9b-827f-f9be423ec1c5';
    req.session.userCase.appl_allApplicants = dummyData;
    req.body = {
      _ctx: 'appl_start',
      start: 'Yes',
      contactDetailsPrivate: ['email'],
    };
    await controller.post(req, res);
    expect(req.session.userCase['appl_allApplicants'][0].contactDetailsPrivate).toEqual(['email']);
  });

  test('postcontroller start Alternative', async () => {
    const language = 'en';
    req.session.lang = language;
    req.params.applicantId = '480e8295-4c5b-4b9b-827f-f9be423ec1c5';
    req.session.userCase.appl_allApplicants = dummyData;
    req.body = {
      _ctx: 'appl_start_alternative',
      startAlternative: 'Yes',
      contactDetailsPrivateAlternative: ['email'],
    };
    await controller.post(req, res);
    expect(req.session.userCase['appl_allApplicants'][0].contactDetailsPrivate).toEqual([]);
    expect(req.session.userCase['appl_allApplicants'][0].contactDetailsPrivateAlternative).toEqual(['email']);
  });
});
