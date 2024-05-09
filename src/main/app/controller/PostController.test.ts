import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FormContent } from '../../app/form/Form';
import * as steps from '../../steps';
import { ApplicantUploadFiles, RespondentUploadFiles } from '../../steps/constants';
import { C100_URL } from '../../steps/urls';
import * as oidc from '../auth/user/oidc';
import * as caseApi from '../case/CaseApi';
import * as cosApiClient from '../case/CosApiClient';
import { isPhoneNoValid, isValidAccessCode } from '../form/validation';

import { PostController } from './PostController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');
const getCosApiClientMock = jest.spyOn(cosApiClient, 'CosApiClient');

const mockFormContent = {
  fields: {},
} as unknown as FormContent;
describe('PostController', () => {
  let controller;
  let req;
  let res;
  beforeEach(() => {
    controller = new PostController(mockFormContent.fields);
    req = mockRequest();
    res = mockResponse();
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
    });
  });

  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('Should have no errors and redirect to the next page in joint application journey', async () => {
    const body = {
      accessCode: 'QWERTY78',
      caseReference: '1234123412341234',
      accessCodeCheck: true,
      caseCode: 'QWERTY78',
      locals: {
        api: jest.fn(),
      },
      session: {
        user: {
          accessToken: 'testUser',
        },
      },
    };
    const caseData = {
      respondentCaseInvites: [
        {
          id: '1c02d57f-fc86-46e6-8680-7aa45ca373ca',
          value: {
            partyId: 'c96d2b74-dd9a-44f5-aa0a-8974f21d7101',
            accessCode: 'QWERTY78',
            expiryDate: '2022-06-22',
            invitedUserId: null,
            caseInviteEmail: 'sdsad@dda.com',
          },
        },
        {
          id: 'aa7b5d17-66dc-45e7-90a0-c84f9933f86c',
          value: {
            partyId: '5d99419b-1cb4-4b7d-bccd-0c946ab34210',
            accessCode: '9PJ2MXEJ',
            expiryDate: '2022-06-22',
            invitedUserId: null,
            caseInviteEmail: 'eewr@sfsdf.com',
          },
        },
        {
          id: 'cd69d298-feba-412f-aea9-6f7e39c2d0cb',
          value: {
            partyId: '04aabcb4-cc4a-42bc-8097-4c55819e55cb',
            accessCode: 'HC65ZLTA',
            expiryDate: '2022-06-22',
            invitedUserId: null,
            caseInviteEmail: null,
          },
        },
      ],
      caseReference: '1234123412341234',
      accessCodeCheck: true,
      applicationType: 'JOINT_APPLICATION',
    };
    (getCosApiClientMock as jest.Mock).mockReturnValue({
      retrieveCasesByUserId: jest.fn(() => {
        return {};
      }),
      validateAccessCode: jest.fn(() => {
        return 'Valid';
      }),
    });
    req = mockRequest({ body });
    res = mockResponse({});
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(caseData);
    await controller.post(req, res);

    expect(res.redirect).not.toHaveBeenCalled;
  });

  test('save and sign out', async () => {
    req = mockRequest({
      session: {},
      body: {
        saveAndSignOut: true,
        locals: {
          api: jest.fn(),
        },
      },
    });
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(() => {
        return {
          applicationType: '',
        };
      }),
      getCaseById: jest.fn(() => {
        return {
          respondentCaseInvites: [
            {
              id: '1c02d57f-fc86-46e6-8680-7aa45ca373ca',
              value: {
                partyId: 'c96d2b74-dd9a-44f5-aa0a-8974f21d7101',
                accessCode: 'QWERTY78',
                expiryDate: '2022-06-22',
                invitedUserId: null,
                caseInviteEmail: 'sdsad@dda.com',
              },
            },
            {
              id: 'aa7b5d17-66dc-45e7-90a0-c84f9933f86c',
              value: {
                partyId: '5d99419b-1cb4-4b7d-bccd-0c946ab34210',
                accessCode: '9PJ2MXEJ',
                expiryDate: '2022-06-22',
                invitedUserId: null,
                caseInviteEmail: 'eewr@sfsdf.com',
              },
            },
            {
              id: 'cd69d298-feba-412f-aea9-6f7e39c2d0cb',
              value: {
                partyId: '04aabcb4-cc4a-42bc-8097-4c55819e55cb',
                accessCode: 'HC65ZLTA',
                expiryDate: '2022-06-22',
                invitedUserId: null,
                caseInviteEmail: null,
              },
            },
          ],
          caseReference: '1234123412341234',
        };
      }),
    });

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should redirect back to the current page with the form data on errors', async () => {
    //const errors = [{ propertyName: 'citizenUserPhoneNumber', errorType: 'invalid' }];
    const body = { citizenUserPhoneNumber: 'invalid phone number' };
    const mockPhoneNumberFormContent = {
      fields: {
        citizenUserPhoneNumber: {
          type: 'tel',
          validator: isPhoneNoValid,
        },
      },
    } as unknown as FormContent;
    controller = new PostController(mockPhoneNumberFormContent.fields);
    req = mockRequest({ body });
    await controller.post(req, res);
    expect(req.session.userCase).toEqual({
      id: '1234',
      citizenUserPhoneNumber: 'invalid phone number',
    });
    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(req.path);
    expect(req.session.errors).toEqual([
      {
        errorType: 'invalid',
        propertyName: 'citizenUserPhoneNumber',
      },
    ]);
  });

  test('Should trigger onlyContinue from if else statment', async () => {
    const body = {
      onlyContinue: {
        text: 'Continue',
        classes: '',
      },
    };
    req = mockRequest({ body });
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should trigger onlyContinue from if else statment - mock error', async () => {
    const body = {
      onlyContinue: {
        text: 'Continue',
        classes: '',
      },
      accessCode: 'string',
    };
    const mockPhoneNumberFormContent = {
      fields: {
        accessCode: {
          type: 'code',
          validator: isValidAccessCode,
        },
      },
    } as unknown as FormContent;
    controller = new PostController(mockPhoneNumberFormContent.fields);
    req = mockRequest({ body });

    await controller.post(req, res);
    expect(req.session.errors).toEqual([
      {
        errorType: 'invalid',
        propertyName: 'accessCode',
      },
    ]);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should trigger saveAndComeLater from if else statment', async () => {
    const body = {
      saveAndComeLater: {
        text: 'Save and Come Later',
        classes: '',
      },
    };
    req = mockRequest({ body });
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should trigger saveAndComeLater & execute try statement', async () => {
    const body = {
      saveAndComeLater: {
        text: 'Save and Come Later',
        classes: '',
      },
    };
    req = mockRequest({ body });
    req.path = C100_URL;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should trigger saveAndComeLater & execute catch statement', async () => {
    const body = {
      saveAndComeLater: {
        text: 'Save and Come Later',
        classes: '',
      },
    };
    req = mockRequest({ body });
    req.path = C100_URL;

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should trigger saveAndSignOut from if else statment', async () => {
    const body = {
      saveAndSignOut: {
        text: 'Save and Sign Out',
        classes: '',
      },
    };
    req = mockRequest({ body });
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should trigger saveAndContinue', async () => {
    const body = {};
    req.session.errors = [];
    const mockPhoneNumberFormContent = {
      fields: {},
    } as unknown as FormContent;
    controller = new PostController(mockPhoneNumberFormContent.fields);
    req = mockRequest({ body });
    req.originalUrl = 'upload-documents-success';
    req.session.userCase.applicantUploadFiles = [
      {
        id: '9813df11-41bf-4b46-a602-86766b5e3547',
        documentName: 'uploaded1.pdf',
      },
      {
        id: '9813df11-41bf-4aaa-a602-86766b5e3547',
        documentName: 'uploaded2.pdf',
      },
    ];
    req.session.userCase.respondentUploadFiles = [
      {
        id: '9813df11-41bf-4b46-a602-86766b5e3547',
        documentName: 'uploaded1.pdf',
      },
      {
        id: '9813df11-41bf-4aaa-a602-86766b5e3547',
        documentName: 'uploaded2.pdf',
      },
    ];
    await controller.post(req, res);
    expect(req.session.userCase[ApplicantUploadFiles]).toStrictEqual([
      {
        documentName: 'uploaded1.pdf',
        id: '9813df11-41bf-4b46-a602-86766b5e3547',
      },
      {
        documentName: 'uploaded2.pdf',
        id: '9813df11-41bf-4aaa-a602-86766b5e3547',
      },
    ]);
    expect(req.session.userCase[RespondentUploadFiles]).toStrictEqual([
      {
        id: '9813df11-41bf-4b46-a602-86766b5e3547',
        documentName: 'uploaded1.pdf',
      },
      {
        id: '9813df11-41bf-4aaa-a602-86766b5e3547',
        documentName: 'uploaded2.pdf',
      },
    ]);
  });
  test('Should call filterErrorsForSaveAsDraft', async () => {
    const body = {
      saveAsDraft: 'yes',
      accessCode: '123',
      errors: [
        {
          errorType: 'invalid',
          propertyName: 'accessCode',
        },
      ],
    };
    const mockPhoneNumberFormContent = {
      fields: {
        accessCode: {
          type: 'code',
          validator: isValidAccessCode,
        },
      },
    } as unknown as FormContent;
    controller = new PostController(mockPhoneNumberFormContent.fields);
    req = mockRequest({ body });
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.errors).toEqual([
      {
        errorType: 'invalid',
        propertyName: 'accessCode',
      },
    ]);
  });
  test('Should log error when fail to trigger saveAndComeLater', async () => {
    const body = {
      saveAndComeLater: {
        text: 'Save and Come Later',
        classes: '',
      },
    };
    req = mockRequest({ body });
    req.path = C100_URL;
    req.locals.C100Api.updateCase.mockRejectedValue({
      message: 'MOCK_ERROR',
      response: { status: 500, data: 'Error' },
    });
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('redirect should throw error with saving session', async () => {
    controller = new PostController({});
    req = mockRequest();
    req.session.save = jest.fn(done => done('MOCK_ERROR'));

    let flag = false;
    let redirectError;
    try {
      await controller.redirect(req, res);
    } catch (err) {
      flag = true;
      redirectError = err;
    }

    expect(flag).toBe(true);
    expect(redirectError).toBe('MOCK_ERROR');
  });
});
