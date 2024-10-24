import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import PersonaldetailsPostController from './postController';

const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

describe('C8 refuge > staying in refuge > postController', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
        },
      ],
      oprs_otherPersons: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925475',
          firstName: 'dummy',
          lastName: 'Test',
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: '7483640e-0817-4ddc-b709-6723f7925474',
        },
      },
    },
  } as unknown as CommonContent;

  describe('c100 applicant', () => {
    test('Should update party details and navigate to the next page when there are no errors', async () => {
      const mockFormContent = {
        fields: {},
      } as unknown as FormContent;
      const controller = new PersonaldetailsPostController(mockFormContent.fields);
      const language = 'en';
      const req = mockRequest({
        params: {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
        },
        body: {
          onlyContinue: true,
          citizenUserLivingInRefuge: 'Yes',
        },
        session: {
          lang: language,
          userCase: {
            ...commonContent.userCase,
          },
        },
      });
      req.originalUrl = '/c100-rebuild';
      const res = mockResponse();
      generateContent(commonContent);
      await controller.post(req, res);

      expect(res.redirect).toHaveBeenCalled;
      expect(req.session.userCase.appl_allApplicants[0].liveInRefuge).toBe('Yes');
    });

    test('Should update party details and delete existing document if no is selected', async () => {
      const mockFormContent = {
        fields: {},
      } as unknown as FormContent;
      const controller = new PersonaldetailsPostController(mockFormContent.fields);
      const language = 'en';
      const req = mockRequest({
        params: {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
        },
        body: {
          onlyContinue: true,
          citizenUserLivingInRefuge: 'No',
        },
        session: {
          lang: language,
          userCase: {
            ...commonContent.userCase,
            appl_allApplicants: [
              {
                id: '7483640e-0817-4ddc-b709-6723f7925474',
                applicantFirstName: 'dummy',
                applicantLastName: 'Test',
                refugeConfidentialityC8Form: {
                  document_url: 'MOCK_URL',
                  document_binary_url: 'MOCK_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                },
              },
            ],
          },
        },
      });
      req.originalUrl = '/c100-rebuild';
      const res = mockResponse();
      generateContent(commonContent);
      deleteDocumentMock.mockResolvedValueOnce('SUCCESS');

      await controller.post(req, res);

      expect(res.redirect).toHaveBeenCalled;
      expect(req.session.userCase.appl_allApplicants[0].liveInRefuge).toBe('No');
      expect(req.session.userCase.appl_allApplicants[0].refugeConfidentialityC8Form).toBe(undefined);
    });
  });

  describe('c100 other people', () => {
    test('Should update party details and navigate to the next page when there are no errors for c100 other people', async () => {
      const mockFormContent = {
        fields: {},
      } as unknown as FormContent;
      const controller = new PersonaldetailsPostController(mockFormContent.fields);
      const language = 'en';
      const req = mockRequest({
        params: {
          id: '7483640e-0817-4ddc-b709-6723f7925475',
        },
        body: {
          onlyContinue: true,
          citizenUserLivingInRefuge: 'Yes',
        },
        session: {
          lang: language,
          userCase: {
            ...commonContent.userCase,
          },
        },
      });
      req.originalUrl = '/c100-rebuild';
      const res = mockResponse();
      generateContent(commonContent);
      await controller.post(req, res);

      expect(res.redirect).toHaveBeenCalled;
      expect(req.session.userCase.oprs_otherPersons[0].liveInRefuge).toBe('Yes');
    });

    test('Should update party details and delete existing document if no is selected', async () => {
      const mockFormContent = {
        fields: {},
      } as unknown as FormContent;
      const controller = new PersonaldetailsPostController(mockFormContent.fields);
      const language = 'en';
      const req = mockRequest({
        params: {
          id: '7483640e-0817-4ddc-b709-6723f7925475',
        },
        body: {
          onlyContinue: true,
          citizenUserLivingInRefuge: 'No',
        },
        session: {
          lang: language,
          userCase: {
            ...commonContent.userCase,
            oprs_otherPersons: [
              {
                id: '7483640e-0817-4ddc-b709-6723f7925475',
                firstName: 'dummy',
                lastName: 'Test',
                refugeConfidentialityC8Form: {
                  document_url: 'MOCK_URL',
                  document_binary_url: 'MOCK_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                },
              },
            ],
          },
        },
      });
      req.originalUrl = '/c100-rebuild';
      const res = mockResponse();
      generateContent(commonContent);
      deleteDocumentMock.mockResolvedValueOnce('SUCCESS');

      await controller.post(req, res);

      expect(res.redirect).toHaveBeenCalled;
      expect(req.session.userCase.oprs_otherPersons[0].liveInRefuge).toBe('No');
      expect(req.session.userCase.appl_allApplicants[0].refugeConfidentialityC8Form).toBe(undefined);
    });

    test('Should catch error when deleting document', async () => {
      const mockFormContent = {
        fields: {},
      } as unknown as FormContent;
      const controller = new PersonaldetailsPostController(mockFormContent.fields);
      const language = 'en';
      const req = mockRequest({
        params: {
          id: '7483640e-0817-4ddc-b709-6723f7925475',
        },
        body: {
          onlyContinue: true,
          citizenUserLivingInRefuge: 'No',
        },
        session: {
          lang: language,
          userCase: {
            ...commonContent.userCase,
            oprs_otherPersons: [
              {
                id: '7483640e-0817-4ddc-b709-6723f7925475',
                firstName: 'dummy',
                lastName: 'Test',
                refugeConfidentialityC8Form: {
                  document_url: 'MOCK_URL',
                  document_binary_url: 'MOCK_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                },
              },
            ],
          },
        },
      });
      req.originalUrl = '/c100-rebuild';
      const res = mockResponse();
      generateContent(commonContent);
      deleteDocumentMock.mockRejectedValueOnce('failure');

      await expect(controller.post(req, res)).rejects.toThrow(
        'Error occured, document could not be deleted. - deleteDocument'
      );

      expect(res.redirect).toHaveBeenCalled;
      expect(req.session.userCase.oprs_otherPersons[0].liveInRefuge).toBe('No');
      expect(req.session.userCase.oprs_otherPersons[0].refugeConfidentialityC8Form).toStrictEqual({
        document_url: 'MOCK_URL',
        document_binary_url: 'MOCK_BINARY_URL',
        document_filename: 'MOCK_FILENAME',
      });
    });
  });

  describe('applicant/respondent', () => {
    test('Should update party details and navigate to the next page when there are no errors for c100 other people', async () => {
      const mockFormContent = {
        fields: {},
      } as unknown as FormContent;
      const controller = new PersonaldetailsPostController(mockFormContent.fields);
      const language = 'en';
      const req = mockRequest({
        params: {},
        body: {
          onlyContinue: true,
          citizenUserLivingInRefuge: 'Yes',
        },
        session: {
          lang: language,
          userCase: {
            ...commonContent.userCase,
          },
        },
      });
      const res = mockResponse();
      generateContent(commonContent);
      await controller.post(req, res);

      expect(res.redirect).toHaveBeenCalled;
      expect(req.session.userCase.citizenUserLivingInRefuge).toBe('Yes');
    });
  });

  test('Should update case when save and come back button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new PersonaldetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      params: {
        id: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      body: {
        saveAndComeLater: true,
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });
});
