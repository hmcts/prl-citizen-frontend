import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { generateContent as getLookupGenerateContent } from '../other-person-details/address/lookup/content';
import { generateContent as getManualGenerateContent } from '../other-person-details/address/manual/content';

import LookupAndManualAddressPostController from './LookupAndManualAddressPostController';

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
    _ctx: 'opAddressManual',
  } as unknown as CommonContent;

  test('should call super constructor with correct params', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new LookupAndManualAddressPostController(mockFormContent.fields);
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
        _ctx: 'opAddressManual',
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
          _ctx: 'opAddressManual',
        },
      },
    });
    const res = mockResponse();
    getManualGenerateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});

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
          address: {
            PostCode: 'AG11NB',
          },
        },
      ],
    },
    _ctx: 'opAddressLookup',
  } as unknown as CommonContent;

  test('should call super constructor with correct params', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new LookupAndManualAddressPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        otherPersonId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        firstName: 'Bob',
        lastName: 'Jones',
        address: {
          PostCode: 'AG11NB',
        },
        _ctx: 'opAddressLookup',
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
              address: {
                PostCode: 'AG11NB',
              },
            },
          ],
          _ctx: 'opAddressLookup',
        },
      },
    });
    const res = mockResponse();
    getLookupGenerateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
  test('Should navigagte to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new LookupAndManualAddressPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        otherPersonId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
      body: {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        firstName: 'Bob',
        lastName: 'Jones',
        address: {
          PostCode: 'AG11NB',
        },
        _ctx: 'opAddressLookup',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          oprs_otherPersons: [
            {
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
              firstName: 'Bob',
              lastName: 'Jones',
              address: {
                PostCode: 'AG11NB',
              },
            },
          ],
          _ctx: 'opAddressLookup',
        },
      },
      locals: {
        logger: 'abc',
      },
    });
    const res = mockResponse();
    getLookupGenerateContent(commonContent);
    await controller.post(req, res);
    expect(req.session.addresses).toBeTruthy;
    expect(res.redirect).toHaveBeenCalled();
  });
});
