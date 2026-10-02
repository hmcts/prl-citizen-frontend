import config from 'config';
import { when } from 'jest-when';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { State } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';
import * as featureToggle from '../../../app/utils/featureToggles';

import C100ChildPostCodePostController from './postController';

jest.mock('../../../app/case/CosApiClient');

describe('C100ChildPostCodePostController', () => {
  let req;
  let res;
  const mockFindCourtByPostCodeAndService = jest.spyOn(CosApiClient.prototype, 'findCourtByPostCodeAndService');
  const mockFindOsCourtByPostCodeAndService = jest.spyOn(CosApiClient.prototype, 'findOsCourtByPostCodeAndService');
  const mockOsCourtLookupEnabled = jest.spyOn(featureToggle, 'getFeatureToggle');
  const mockFormContent = {
    fields: {
      c100RebuildChildPostCode: {
        type: 'text',
        validator: value => isFieldFilledIn(value) || isInvalidPostcode(value),
      },
    },
  } as unknown as FormContent;
  const mockFeatureToggle = {
    isOsCourtLookupEnabled: jest.fn<Promise<boolean>, []>(),
  };
  config.get = jest.fn();

  jest.mock('config');
  jest.mock('axios');
  jest.mock('../../../app/auth/service/get-service-auth-token');

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    mockOsCourtLookupEnabled.mockReturnValue(mockFeatureToggle as never);
  });

  afterEach(() => {
    req.locals.C100Api.createCase.mockClear();
    mockFindCourtByPostCodeAndService.mockClear();
    mockFindOsCourtByPostCodeAndService.mockClear();
    mockOsCourtLookupEnabled.mockClear();
  });

  test('when postcode is empty', async () => {
    req.body.c100RebuildChildPostCode = '';
    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'required' }]);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when postcode is invalid', async () => {
    req.body.c100RebuildChildPostCode = 'xyz';
    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'invalid' }]);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when postcode is valid and is not an allowed court', async () => {
    mockFindCourtByPostCodeAndService.mockResolvedValue({
      slug: 'childcare-arrangements',
      name: 'Childcare arrangements if you separate from your partner',
      courts: [
        {
          name: 'Southampton Combined Court Centre',
          slug: 'southampton-combined-court-centre',
        },
      ],
    });
    req.locals.C100Api.createCase.mockResolvedValueOnce({
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    when(config.get).calledWith('allowedCourts').mockReturnValue(['Swansea Civil Justice Centre']);
    req.session.testingSupport = true;
    req.body.c100RebuildChildPostCode = 'SO15 2XQ';

    mockFeatureToggle.isOsCourtLookupEnabled.mockResolvedValue(false);

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).not.toHaveBeenCalled();
    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      'https://c100-application-staging.apps.live-1.cloud-platform.service.justice.gov.uk/'
    );
  });

  test('when postcode is valid, os flag is enabled and is not an allowed court', async () => {
    mockFindOsCourtByPostCodeAndService.mockResolvedValue('Southampton Combined Court Centre');
    req.locals.C100Api.createCase.mockResolvedValueOnce({
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    when(config.get).calledWith('allowedCourts').mockReturnValue(['Swansea Civil Justice Centre']);
    req.session.testingSupport = true;
    req.body.c100RebuildChildPostCode = 'SO15 2XQ';

    mockFeatureToggle.isOsCourtLookupEnabled.mockResolvedValue(true);

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).not.toHaveBeenCalled();
    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      'https://c100-application-staging.apps.live-1.cloud-platform.service.justice.gov.uk/'
    );
  });

  test('when postcode is valid and is an allowed court', async () => {
    mockFindCourtByPostCodeAndService.mockResolvedValue({
      slug: 'childcare-arrangements',
      name: 'Childcare arrangements if you separate from your partner',
      courts: [
        {
          name: 'Swansea Civil Justice Centre',
          slug: 'swansea-civil-justice-centre',
        },
      ],
    });
    req.locals.C100Api.createCase.mockResolvedValueOnce({
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    when(config.get).calledWith('allowedCourts').mockReturnValue(['Swansea Civil Justice Centre']);

    req.body.c100RebuildChildPostCode = 'SA1 2DZ';
    mockFeatureToggle.isOsCourtLookupEnabled.mockResolvedValue(false);

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).toHaveBeenCalled();
    expect(req.session.userCase).toEqual({
      caseId: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when postcode is valid, os flag is enabled and is an allowed court', async () => {
    mockFindOsCourtByPostCodeAndService.mockResolvedValue('Swansea Civil Justice Centre');
    req.locals.C100Api.createCase.mockResolvedValueOnce({
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    when(config.get).calledWith('allowedCourts').mockReturnValue(['Swansea Civil Justice Centre']);

    req.body.c100RebuildChildPostCode = 'SA1 2DZ';
    mockFeatureToggle.isOsCourtLookupEnabled.mockResolvedValue(true);

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).toHaveBeenCalled();
    expect(req.session.userCase).toEqual({
      caseId: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    expect(req.locals.logger.info).toHaveBeenCalledWith('COS court lookup result: Swansea Civil Justice Centre');
    expect(res.redirect).toHaveBeenCalled();
  });

  test.each([
    ['SA1 2FA', 'Swansea Civil Justice Centre'],
    ['YO14 9LT', 'Kingston-upon-Hull Combined Court Centre'],
    ['HU1 2EZ', 'Kingston-upon-Hull Combined Court Centre'],
    ['CM2 0PP', 'Chelmsford Justice Centre'],
    ['WV1 3LQ', 'Wolverhampton Combined Court Centre'],
  ])('when OS lookup for %s returns allowed court %s', async (postcode, courtName) => {
    mockFindOsCourtByPostCodeAndService.mockResolvedValue(courtName);
    req.locals.C100Api.createCase.mockResolvedValueOnce({
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    when(config.get)
      .calledWith('allowedCourts')
      .mockReturnValue([
        'Swansea Civil Justice Centre',
        'Kingston-upon-Hull Combined Court Centre',
        'Grimsby Combined Court Centre',
        'Chelmsford Justice Centre',
        "Chelmsford Magistrates' Court and Family Court",
        'Wolverhampton Combined Court Centre',
        "Wolverhampton Magistrates' Court",
      ]);
    req.body.c100RebuildChildPostCode = postcode;
    mockFeatureToggle.isOsCourtLookupEnabled.mockResolvedValue(true);

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(mockFindOsCourtByPostCodeAndService).toHaveBeenCalledWith(postcode, req.session.user);
    expect(mockFindCourtByPostCodeAndService).not.toHaveBeenCalled();
    expect(req.locals.C100Api.createCase).toHaveBeenCalled();
    expect(req.session.userCase.caseId).toBe('1234');
    expect(req.session.destroy).not.toHaveBeenCalled();
    expect(req.locals.logger.info).toHaveBeenCalledWith(`COS court lookup result: ${courtName}`);
  });

  test('when postcode is valid and any court is allowed', async () => {
    req.locals.C100Api.createCase.mockResolvedValueOnce({
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    when(config.get).calledWith('allowedCourts').mockReturnValue(['*']);

    req.body.c100RebuildChildPostCode = 'DN1 3HS';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).toHaveBeenCalled();
    expect(mockFindCourtByPostCodeAndService).not.toHaveBeenCalled();
    expect(req.locals.C100Api.createCase).toHaveBeenCalled();
    expect(req.session.userCase).toEqual({
      caseId: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    });
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when postcode is valid but FACT API throws error', async () => {
    mockFindCourtByPostCodeAndService.mockRejectedValue({ error: {}, status: '404' });

    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'generic' }]);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when an invalid postcode in valid format is sent', async () => {
    mockFindCourtByPostCodeAndService.mockRejectedValue({
      message: 'Not found: Mapit can not find information related to postcode',
    });
    when(config.get).calledWith('allowedCourts').mockReturnValue(['Swansea Civil Justice Centre']);

    req.body.c100RebuildChildPostCode = 'XYZ 123';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'invalid' }]);
    expect(req.locals.C100Api.createCase).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when postcode is valid but case create API throws error', async () => {
    mockFindCourtByPostCodeAndService.mockResolvedValue({
      slug: 'childcare-arrangements',
      name: 'Childcare arrangements if you separate from your partner',
      courts: [
        {
          name: 'Swansea Civil Justice Centre',
          slug: 'swansea-civil-justice-centre',
        },
      ],
    });
    when(config.get).calledWith('allowedCourts').mockReturnValue(['Swansea Civil Justice Centre']);
    req.locals.C100Api.createCase.mockRejectedValue({ error: {}, status: '404' });

    req.body.c100RebuildChildPostCode = 'SA1 2DZ';
    mockFeatureToggle.isOsCourtLookupEnabled.mockResolvedValue(false);
    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'generic' }]);
    expect(res.redirect).toHaveBeenCalled();
  });
});
