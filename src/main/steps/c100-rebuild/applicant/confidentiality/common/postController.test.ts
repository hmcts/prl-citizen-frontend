import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../../app/form/Form';

import { CommonConfidentialityController } from './postController';

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

describe('CommonConfidentialityController - post Controller', () => {
  const mockPhoneNumberFormContent = {
    fields: {},
  } as unknown as FormContent;
  const controller = new CommonConfidentialityController(mockPhoneNumberFormContent.fields);

  test('post controller checking if applicants are getting stored', async () => {
    const language = 'en';
    req.session.lang = language;
    await controller.post(req, res, '', dummyData);
    expect(req.session.userCase['appl_allApplicants']).toEqual(dummyData);
  });
});
