import { error } from 'console';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../../app/auth/user/oidc';
import * as cosApiClient from '../../../../app/case/CosApiClient';
import { FormContent } from '../../../../app/form/Form';
import { isValidAccessCode } from '../../../../app/form/validation';
import * as steps from '../../../../steps';

import PinActivationPostController from './postController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
const getCosApiClientMock = jest.spyOn(cosApiClient, 'CosApiClient');

describe('CaseActivationPostController', () => {
  let controller;
  let req;
  let res;

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  beforeEach(() => {
    controller = new PinActivationPostController(mockFormContent.fields);
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

  test('Should trigger checkCaseAccessCode from if else statment - accessCodeLoginIn should be false', async () => {
    const mockPhoneNumberFormContent = {
      fields: {
        accessCode: {
          type: 'code',
          validator: isValidAccessCode,
        },
      },
    } as unknown as FormContent;
    controller = new PinActivationPostController(mockPhoneNumberFormContent.fields);
    req.body = {
      accessCodeCheck: {
        text: 'Continue',
        classes: '',
      },
      accessCode: 'string',
    };
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should trigger checkCaseAccessCode for already linked case', async () => {
    const body = {
      accessCode: 'string',
      caseReference: '123',
      accessCodeCheck: true,
      caseCode: 'string',
    };
    controller = new PinActivationPostController(mockFormContent.fields);
    req = mockRequest({ body });
    req.session.errors = [];
    (getCosApiClientMock as jest.Mock).mockReturnValue({
      retrieveCasesByUserId: jest.fn(() => {
        return {};
      }),
      validateAccessCode: jest.fn(() => {
        return 'Linked';
      }),
    });
    await controller.post(req, res);
    expect(req.session.errors).toEqual([{ errorType: 'accesscodeAlreadyLinked', propertyName: 'accessCode' }]);
    expect(res.redirect).toHaveBeenCalled();
  });
  test('Should trigger checkCaseAccessCode for not valid case', async () => {
    const body = {
      accessCode: 'string',
      caseReference: '123',
      accessCodeCheck: true,
      caseCode: 'string',
    };
    controller = new PinActivationPostController(mockFormContent.fields);
    req = mockRequest({ body });
    req.session.errors = [];
    (getCosApiClientMock as jest.Mock).mockReturnValue({
      retrieveCasesByUserId: jest.fn(() => {
        return {};
      }),
      validateAccessCode: jest.fn(() => {
        return 'Not Valid';
      }),
    });
    await controller.post(req, res);
    expect(req.session.errors).toEqual([
      { errorType: 'invalidCaseCode', propertyName: 'caseCode' },
      { errorType: 'invalidAccessCode', propertyName: 'accessCode' },
    ]);
    expect(res.redirect).toHaveBeenCalled();
  });
  test('Should log error if failed to execute checkCaseAccessCode', async () => {
    const body = {
      accessCode: 'string',
      caseReference: '123',
      accessCodeCheck: true,
      caseCode: 'string',
    };
    controller = new PinActivationPostController(mockFormContent.fields);
    req = mockRequest({ body });
    req.session.errors = [];
    (getCosApiClientMock as jest.Mock).mockReturnValue({
      retrieveCasesByUserId: jest.fn(() => {
        return {};
      }),
      validateAccessCode: jest.fn(() => {
        throw error;
      }),
    });
    await controller.post(req, res);
    expect(req.session.errors).toEqual([
      { errorType: 'invalidCaseCode', propertyName: 'caseCode' },
      { errorType: 'invalidAccessCode', propertyName: 'accessCode' },
    ]);
    expect(res.redirect).toHaveBeenCalled();
  });
});
