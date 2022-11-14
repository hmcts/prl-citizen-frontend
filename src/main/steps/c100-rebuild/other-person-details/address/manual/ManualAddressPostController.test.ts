import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import ManualAddressPostController from './ManualAddressPostController';
import { generateContent } from './content';

describe('applicant1 > address > lookup > ManualAddressPostController', () => {
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
          firstName: 'Dummy ',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          lastName: 'Test1',
          address: {
            PostCode: 'AG11NB',
            AddressLine1: 'UK',
            AddressLine2: 'UK1',
            PostTown: 'London',
            County: 'UK',
          },
        },
      ],
    },
  } as unknown as CommonContent;

  test('should call super constructor with correct params', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ManualAddressPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        otherPersonId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        oprs_otherPersons: [
          {
            firstName: 'Dummy ',
            id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
            lastName: 'Test1',
            address: {
              PostCode: 'AG11NB',
              AddressLine1: 'UK',
              AddressLine2: 'UK1',
              PostTown: 'London',
              County: 'UK',
            },
          },
        ],
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          oprs_otherPersons: [
            {
              firstName: 'Dummy ',
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              lastName: 'Test1',
              address: {
                PostCode: 'AG11NB',
                AddressLine1: 'UK',
                AddressLine2: 'UK1',
                PostTown: 'London',
                County: 'UK',
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
