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
          address1: 'UK',
          address2: 'UK1',
          addressTown: 'London',
          addressCounty: 'UK',
          addressHistory: 'Yes',
          provideDetailsOfPreviousAddresses: 'NA',
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
              address1: 'UK',
              address2: 'UK1',
              addressTown: 'London',
              addressCounty: 'UK',
              addressHistory: 'Yes',
              provideDetailsOfPreviousAddresses: 'NA',
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

  test('should clean details of previous addresses when address history is no', async () => {
    const mockFormContent = {
      fields: { addressHistory: 'No' },
    } as unknown as FormContent;
    const controller = new ManualAddressPostController(mockFormContent.fields);
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
        addressHistory: 'No',
        provideDetailsOfPreviousAddresses: 'NA',
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
              address1: 'UK',
              address2: 'UK1',
              addressTown: 'London',
              addressCounty: 'UK',
              addressHistory: 'No',
              addressPostCode: 'AG11NB',
              provideDetailsOfPreviousAddresses: 'NA',
              country: 'UK',
            },
          ],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase).toStrictEqual({
      appl_allApplicants: [
        {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          address1: 'UK',
          address2: 'UK1',
          addressTown: 'London',
          addressCounty: 'UK',
          addressHistory: 'No',
          addressPostCode: 'AG11NB',
          provideDetailsOfPreviousAddresses: 'NA',
          applicantFirstName: 'Dummy',
          applicantLastName: 'Test1',
          applicantAddress1: 'UK',
          applicantAddress2: 'UK1',
          applicantAddressPostcode: undefined,
          applicantAddressTown: 'London',
          applicantAddressCounty: 'UK',
          applicantAddressHistory: 'No',
          applicantProvideDetailsOfPreviousAddresses: '',
          country: undefined,
        },
      ],
    });
  });

  test('should call redirect with correct params', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ManualAddressPostController(mockFormContent.fields);
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
        onlycontinue: true,
      },
      session: {
        lang: language,
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
