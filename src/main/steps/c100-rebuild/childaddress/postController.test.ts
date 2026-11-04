import config from 'config';
import { when } from 'jest-when';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { State } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

import C100ChildPostCodePostController from './postController';

jest.mock('config');
jest.mock('axios');
jest.mock('../../../app/case/CosApiClient');
jest.mock('../../../app/auth/service/get-service-auth-token');

describe('C100ChildPostCodePostController', () => {
  let req;
  let res;
  const mockFindCourtByPostCodeViaCosApi = jest.spyOn(CosApiClient.prototype, 'findCourtByPostCodeViaCosApi');
  const mockFormContent = {
    fields: {
      c100RebuildChildPostCode: {
        type: 'text',
        validator: value => isFieldFilledIn(value) || isInvalidPostcode(value),
      },
    },
  } as unknown as FormContent;
  config.get = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    mockFindCourtByPostCodeViaCosApi.mockReset();
    (config.get as jest.Mock).mockReset();
    when(config.get).calledWith('allowedCourts').mockReturnValue(['Swansea Civil Justice Centre']);
    mockFindCourtByPostCodeViaCosApi.mockResolvedValue('Swansea Civil Justice Centre');
    req.locals.C100Api.createCase.mockResolvedValue({
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('when postcode is empty', async () => {
    req.body.c100RebuildChildPostCode = '';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'required' }]);
    expect(mockFindCourtByPostCodeViaCosApi).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when postcode is invalid', async () => {
    req.body.c100RebuildChildPostCode = 'xyz';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'invalid' }]);
    expect(mockFindCourtByPostCodeViaCosApi).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when COS returns a court that is not allowed', async () => {
    mockFindCourtByPostCodeViaCosApi.mockResolvedValue('Southampton Combined Court Centre');
    req.session.testingSupport = true;
    req.body.c100RebuildChildPostCode = 'SO15 2XQ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(mockFindCourtByPostCodeViaCosApi).toHaveBeenCalledWith('SO15 2XQ', req.session.user);
    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).not.toHaveBeenCalled();
    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      'https://c100-application-staging.apps.live-1.cloud-platform.service.justice.gov.uk/'
    );
  });

  test('when COS returns an allowed court', async () => {
    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(mockFindCourtByPostCodeViaCosApi).toHaveBeenCalledWith('SA1 2DZ', req.session.user);
    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).toHaveBeenCalledTimes(1);
    expect(req.session.userCase).toEqual({
      caseId: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    expect(req.session.destroy).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when the whitelist is configured as a comma-separated string', async () => {
    when(config.get)
      .calledWith('allowedCourts')
      .mockReturnValue('Southampton Combined Court Centre,Swansea Civil Justice Centre');
    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(mockFindCourtByPostCodeViaCosApi).toHaveBeenCalledWith('SA1 2DZ', req.session.user);
    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).toHaveBeenCalledTimes(1);
    expect(req.session.destroy).not.toHaveBeenCalled();
  });

  test('when postcode is valid and any court is allowed', async () => {
    when(config.get).calledWith('allowedCourts').mockReturnValue(['*']);
    req.body.c100RebuildChildPostCode = 'DN1 3HS';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).toHaveBeenCalledTimes(1);
    expect(mockFindCourtByPostCodeViaCosApi).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test.each([null, undefined, ''])('when COS returns no court name (%p)', async courtName => {
    mockFindCourtByPostCodeViaCosApi.mockResolvedValue(courtName as string);
    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'invalid' }]);
    expect(req.locals.C100Api.createCase).not.toHaveBeenCalled();
    expect(req.session.destroy).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when postcode is valid but the COS lookup fails', async () => {
    mockFindCourtByPostCodeViaCosApi.mockRejectedValue(new Error('COS unavailable'));
    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'generic' }]);
    expect(req.locals.C100Api.createCase).not.toHaveBeenCalled();
    expect(req.session.destroy).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when the case already exists', async () => {
    req.session.userCase.caseId = 'existing-case';
    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(mockFindCourtByPostCodeViaCosApi).toHaveBeenCalledWith('SA1 2DZ', req.session.user);
    expect(req.session.userCase.caseId).toBe('existing-case');
    expect(req.locals.C100Api.createCase).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when postcode is valid but case creation fails', async () => {
    req.locals.C100Api.createCase.mockRejectedValue(new Error('Case creation unavailable'));
    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'generic' }]);
    expect(req.session.destroy).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });
});
