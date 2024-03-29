import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../../app/form/Form';
// import { getAddressesFromPostcode } from '../../../../../app/postcode/postcode-lookup-api';
import { CommonContent } from '../../../../common/common.content';

import AddressLookupPostController from './AddressLookupPostController';
import { generateContent } from './content';
describe('respondent > address > lookup > AddressLookupPostController', () => {
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
          address: {},
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
        respondentId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        firstName: 'Dummy ',
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        lastName: 'Test1',
        address: {
          PostCode: 'AG11NB',
        },
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [
            {
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              firstName: 'Test1',
              lastName: 'Test1',
              address: {
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

  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddressLookupPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        respondentId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        PostCode: 'AG11NB',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [
            {
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              firstName: 'Test1',
              lastName: 'Test1',
              address: {
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
    expect(req.session.addresses).toBeTruthy;
    expect(res.redirect).toHaveBeenCalled();
  });
});
