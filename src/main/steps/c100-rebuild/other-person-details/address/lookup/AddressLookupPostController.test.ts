import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import AddressLookupPostController from './AddressLookupPostController';
import { generateContent } from './content';
describe('applicant1 > address > lookup > AddressLookupPostController', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          otherPersonId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        },
      },
    },
    userCase: {
      oprs_otherPersons: [
        {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          firstName: 'Bob',
          lastName: 'Jones',
          otherPersonAddress: {
            PostCode: 'AG11NB',
          },
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
        otherPersonId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        firstName: 'Bob',
        lastName: 'Jones',
        otherPersonAddress: {
          PostCode: 'AG11NB',
        },
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          oprs_otherPersons: [
            {
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              firstName: 'Bob',
              lastName: 'Jones',
              otherPersonAddress: {
                PostCode: 'AG11NB',
              },
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
