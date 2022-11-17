import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
//import { FormContent } from '../../../../../app/form/Form';
//import { CommonContent } from '../../../../common/common.content';

import AddressLookupPostController from './AddressLookupPostController';
import { generateContent } from './content';
describe('applicant1 > address > lookup > AddressLookupPostController', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          applicantId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        },
      },
    },
    userCase: {
      appl_allApplicants: [
        {
          applicantFirstName: 'Dummy ',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          applicantLastName: 'Test1',
          applicantAddressPostcode: 'AG11NB',
        },
      ],
    },
  } as unknown as CommonContent;

  test('should call super constructor with correct params', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddressLookupPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        applicantId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        applicantFirstName: 'Dummy ',
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        applicantLastName: 'Test1',
        applicantAddressPostcode: 'AG11NB',
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          appl_allApplicants: [
            {
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              applicantFirstName: 'Dummy',
              applicantLastName: 'Test1',
            },
          ],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
