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
          respondentId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        },
      },
    },
    userCase: {
      resp_Respondents: [
        {
          firstName: 'Dummy ',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          lastName: 'Test1',
          address: {
            AddressLine1: 'UK',
            AddressLine2: 'UK1',
            PostTown: 'London',
            County: 'UK',
            PostCode: 'AG11NB',
            addressHistory: 'Yes',
            provideDetailsOfPreviousAddresses: 'NA',
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
        respondentId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        applicantFirstName: 'Dummy ',
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        applicantLastName: 'Test1',
        applicantAddressPostcode: 'AG11NB',
        address1: 'UK',
        address2: 'UK1',
        addressTown: 'London',
        addressCounty: 'UK',
        addressHistory: 'Yes',
        provideDetailsOfPreviousAddresses: 'NA',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [
            {
              firstName: 'Dummy ',
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              lastName: 'Test1',
              address: {
                AddressLine1: 'UK',
                AddressLine2: 'UK1',
                PostTown: 'London',
                County: 'UK',
                PostCode: 'AG11NB',
                addressHistory: 'Yes',
                provideDetailsOfPreviousAddresses: 'NA',
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

  test('check saveAndComeLater condition', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ManualAddressPostController(mockFormContent.fields);
    const req = mockRequest({
      params: {
        respondentId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        saveAndComeLater: true,
      },
      session: {
        lang: 'en',
        userCase: {
          resp_Respondents: [
            {
              firstName: 'Dummy ',
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              lastName: 'Test1',
              address: {
                AddressLine1: 'UK',
                AddressLine2: 'UK1',
                PostTown: 'London',
                County: 'UK',
                PostCode: 'AG11NB',
                addressHistory: 'Yes',
                provideDetailsOfPreviousAddresses: 'NA',
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
