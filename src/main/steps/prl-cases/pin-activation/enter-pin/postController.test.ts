import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../../app/auth/user/oidc';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { HearingData } from '../../../../app/case/case';
import { State } from '../../../../app/case/definition';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { isValidAccessCode } from '../../../../app/form/validation';
import * as steps from '../../../../steps';

import LinkCaseToAccountPostController from './postController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
const validateAccessCodeMock = jest.spyOn(CosApiClient.prototype, 'validateAccessCode');
const linkCaseToCitizenMock = jest.spyOn(CosApiClient.prototype, 'linkCaseToCitizen');

describe('LinkCaseToAccountPostController', () => {
  let controller;
  let req;
  let res;

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  beforeEach(() => {
    controller = new LinkCaseToAccountPostController(mockFormContent.fields as FormFields);
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

  test('Should link case and save data when access code is valid', async () => {
    const body = {
      accessCode: 'string',
      caseReference: '123',
      accessCodeCheck: true,
      caseCode: 'string',
    };
    req = mockRequest({ body });
    req.session.errors = [];
    validateAccessCodeMock.mockResolvedValueOnce('valid');
    linkCaseToCitizenMock.mockResolvedValueOnce({
      caseData: { id: '123', state: 'success' as State },
      hearingData: { caseHearings: ['hearings'] } as unknown as HearingData,
    });
    await controller.post(req, res);
    expect(req.session.userCase.id).toBe('123');
    expect(req.session.userCase.hearingCollection).toStrictEqual(['hearings']);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should throw error if invalid access code', async () => {
    const mockPhoneNumberFormContent = {
      fields: {
        accessCode: {
          type: 'code',
          validator: isValidAccessCode,
        },
      },
    } as unknown as FormContent;
    controller = new LinkCaseToAccountPostController(mockPhoneNumberFormContent.fields as FormFields);

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

  test('Should set errors and redirect if case already linked', async () => {
    const body = {
      accessCode: 'string',
      caseReference: '123',
      accessCodeCheck: true,
      caseCode: 'string',
    };
    req = mockRequest({ body });
    req.session.errors = [];
    validateAccessCodeMock.mockResolvedValueOnce('Linked');
    await controller.post(req, res);
    expect(req.session.errors).toEqual([{ errorType: 'accesscodeAlreadyLinked', propertyName: 'accessCode' }]);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should set errors and redirect if access code invalid', async () => {
    const body = {
      accessCode: 'string',
      caseReference: '123',
      accessCodeCheck: true,
      caseCode: 'string',
    };
    req = mockRequest({ body });
    req.session.errors = [];
    validateAccessCodeMock.mockResolvedValueOnce('Invalid');
    await controller.post(req, res);
    expect(req.session.errors).toEqual([
      { errorType: 'invalidCaseCode', propertyName: 'caseCode' },
      { errorType: 'invalidAccessCode', propertyName: 'accessCode' },
    ]);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should throw error if validateAccessCode fails', async () => {
    const body = {
      accessCode: 'string',
      caseReference: '123',
      accessCodeCheck: true,
      caseCode: 'string',
    };
    req = mockRequest({ body });
    req.session.errors = [];
    validateAccessCodeMock.mockRejectedValueOnce({ status: '500' });

    await controller.post(req, res);
    expect(req.session.errors).toEqual([
      { errorType: 'invalidCaseCode', propertyName: 'caseCode' },
      { errorType: 'invalidAccessCode', propertyName: 'accessCode' },
    ]);
    expect(res.redirect).toHaveBeenCalled();
  });
});
