import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import SelectAddressPostController from './SelectAddressPostController';
import { generateContent } from './content';

describe('applicant1 > address > lookup > SelectAddressPostController', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          applicantId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
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
      appl_allApplicants: [
        {
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
          applicantSelectedAddress: 2,
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
        applicantId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
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
        applicantSelectedAddress: 2,
        selectAddress: '0',
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
          appl_allApplicants: [
            {
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              applicantFirstName: 'Dummy',
              applicantLastName: 'Test1',
              address1: 'UK',
              address2: 'UK1',
              addressTown: 'London',
              addressCounty: 'UK',
              addressHistory: 'Yes',
              provideDetailsOfPreviousAddresses: 'NA',
              applicantSelectedAddress: 2,
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
