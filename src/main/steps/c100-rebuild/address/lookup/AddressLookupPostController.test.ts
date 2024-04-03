import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
//import { FormContent } from '../../../../../app/form/Form';
//import { CommonContent } from '../../../../common/common.content';

import AddressLookupPostController from './AddressLookupPostController';
import { generateContent } from './content';
describe('address > lookup > AddressLookupPostController', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          partyType: 'applicant',
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
      resp_Respondents: [
        {
          firstName: 'Dummy ',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c52',
          lastName: 'Test1',
          address: {},
        },
      ],
    },
  } as unknown as CommonContent;

  test('Check saveAndComeLater conditions', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddressLookupPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        partyType: 'applicant',
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

  test('check valid address scenario', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddressLookupPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        partyType: 'applicant',
      },
      body: {
        addressPostcode: 'B437AJ',
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

  test('check valid address scenario for respondent', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddressLookupPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c52',
        partyType: 'respondent-details',
      },
      body: {
        PostCode: 'B437AJ',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          resp_Respondents: [
            {
              firstName: 'Dummy ',
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c52',
              lastName: 'Test1',
              address: {},
            },
          ],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase.resp_Respondents[0].address.PostCode).toBe('B437AJ');
  });

  test('check valid address scenario for other-person-details', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new AddressLookupPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        id: '480e8295-4c5b-4b9b-827f-f9be423ec1c52',
        partyType: 'other-person-details',
      },
      body: {
        PostCode: 'B437AJ',
        onlycontinue: true,
      },
      session: {
        lang: language,
        userCase: {
          oprs_otherPersons: [
            {
              firstName: 'Dummy ',
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c52',
              lastName: 'Test1',
              address: {},
            },
          ],
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase.oprs_otherPersons[0].address.PostCode).toBe('B437AJ');
  });
});
