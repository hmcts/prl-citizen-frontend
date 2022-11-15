import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import SelectAddressPostController from './SelectAddressPostController';
import { generateContent } from './content';

describe('respondent > address > lookup > SelectAddressPostController', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          respondentId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        },
      },
    },
    selectAddress: 0,
    addresses: [
      {
        fullAddress: 'FLAT 20, THAMES VIEW, CENTREWAY APARTMENTS, AXON PLACE, ILFORD, IG1 1NB',
        street1: 'FLAT 20, THAMES VIEW, AXON PLACE',
        street2: 'CENTREWAY APARTMENTS',
        town: 'ILFORD',
        county: 'REDBRIDGE',
        postcode: 'IG1 1NB',
      },
      {
        fullAddress: 'FLAT 21, THAMES VIEW, CENTREWAY APARTMENTS, AXON PLACE, ILFORD, IG1 1NB',
        street1: 'FLAT 21, THAMES VIEW, AXON PLACE',
        street2: 'CENTREWAY APARTMENTS',
        town: 'ILFORD',
        county: 'REDBRIDGE',
        postcode: 'IG1 1NB',
      },
    ],
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
            selectedAddress: 2,
          },
        },
      ],
    },
  } as unknown as CommonContent;

  test('should call super constructor with correct params', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new SelectAddressPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        respondentId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        firstName: 'Dummy ',
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        lastName: 'Test1',
        selectAddress: '0',
        address: {
          AddressLine1: 'UK',
          AddressLine2: 'UK1',
          PostTown: 'London',
          County: 'UK',
          PostCode: 'AG11NB',
          addressHistory: 'Yes',
          provideDetailsOfPreviousAddresses: 'NA',
          selectedAddress: 2,
        },
        addresses: [
          {
            fullAddress: 'FLAT 20, THAMES VIEW, CENTREWAY APARTMENTS, AXON PLACE, ILFORD, IG1 1NB',
            street1: 'FLAT 20, THAMES VIEW, AXON PLACE',
            street2: 'CENTREWAY APARTMENTS',
            town: 'ILFORD',
            county: 'REDBRIDGE',
            postcode: 'IG1 1NB',
          },
          {
            fullAddress: 'FLAT 21, THAMES VIEW, CENTREWAY APARTMENTS, AXON PLACE, ILFORD, IG1 1NB',
            street1: 'FLAT 21, THAMES VIEW, AXON PLACE',
            street2: 'CENTREWAY APARTMENTS',
            town: 'ILFORD',
            county: 'REDBRIDGE',
            postcode: 'IG1 1NB',
          },
        ],
        onlycontinue: true,
      },
      session: {
        lang: language,
        addresses: [
          {
            fullAddress: 'FLAT 20, THAMES VIEW, CENTREWAY APARTMENTS, AXON PLACE, ILFORD, IG1 1NB',
            street1: 'FLAT 20, THAMES VIEW, AXON PLACE',
            street2: 'CENTREWAY APARTMENTS',
            town: 'ILFORD',
            county: 'REDBRIDGE',
            postcode: 'IG1 1NB',
          },
          {
            fullAddress: 'FLAT 21, THAMES VIEW, CENTREWAY APARTMENTS, AXON PLACE, ILFORD, IG1 1NB',
            street1: 'FLAT 21, THAMES VIEW, AXON PLACE',
            street2: 'CENTREWAY APARTMENTS',
            town: 'ILFORD',
            county: 'REDBRIDGE',
            postcode: 'IG1 1NB',
          },
        ],
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
                selectedAddress: 2,
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
