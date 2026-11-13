import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient, CourtOnboardingResponse } from '../../../app/case/CosApiClient';
import { State } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

import C100ChildPostCodePostController from './postController';

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
  const onboardedCourt: CourtOnboardingResponse = {
    epimmsId: '234946',
    courtName: 'Swansea Civil Justice Centre',
    onboarded: true,
  };

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    mockFindCourtByPostCodeViaCosApi.mockReset();
    mockFindCourtByPostCodeViaCosApi.mockResolvedValue(onboardedCourt);
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

  test.each([
    [true, 'https://c100-application-staging.apps.live-1.cloud-platform.service.justice.gov.uk/'],
    [false, 'https://apply-to-court-about-child-arrangements.service.justice.gov.uk'],
  ])(
    'when COS reports an offline court, redirect to legacy with testingSupport=%s',
    async (testingSupport, legacyUrl) => {
      mockFindCourtByPostCodeViaCosApi.mockResolvedValue({ ...onboardedCourt, onboarded: false });
      req.session.testingSupport = testingSupport;
      req.body.c100RebuildChildPostCode = 'SO15 2XQ';

      await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

      expect(mockFindCourtByPostCodeViaCosApi).toHaveBeenCalledWith('SO15 2XQ', req.session.user);
      expect(req.session.errors).toEqual([]);
      expect(req.locals.C100Api.createCase).not.toHaveBeenCalled();
      expect(req.session.destroy).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(legacyUrl);
    }
  );

  test('when COS reports that the court is onboarded', async () => {
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

  test('when the court name differs, use the COS onboarding decision', async () => {
    mockFindCourtByPostCodeViaCosApi.mockResolvedValue({
      ...onboardedCourt,
      courtName: 'A different RefData site name',
    });
    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(mockFindCourtByPostCodeViaCosApi).toHaveBeenCalledWith('SA1 2DZ', req.session.user);
    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).toHaveBeenCalledTimes(1);
    expect(req.session.destroy).not.toHaveBeenCalled();
  });

  test('when COS has no court name, use the EPIMMS ID onboarding decision', async () => {
    mockFindCourtByPostCodeViaCosApi.mockResolvedValue({ ...onboardedCourt, courtName: null });
    req.body.c100RebuildChildPostCode = 'DN1 3HS';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).toHaveBeenCalledTimes(1);
    expect(mockFindCourtByPostCodeViaCosApi).toHaveBeenCalledWith('DN1 3HS', req.session.user);
    expect(res.redirect).toHaveBeenCalled();
  });

  test.each([
    null,
    undefined,
    '',
    'No Court Fetched',
    { ...onboardedCourt, epimmsId: '' },
    { ...onboardedCourt, epimmsId: '   ' },
    { epimmsId: '234946', courtName: 'Swansea' },
    { ...onboardedCourt, onboarded: 'true' },
  ])('when COS returns an invalid onboarding response (%p)', async response => {
    mockFindCourtByPostCodeViaCosApi.mockResolvedValue(response as CourtOnboardingResponse);
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

  test('when COS cannot resolve a court, show the postcode validation error', async () => {
    mockFindCourtByPostCodeViaCosApi.mockRejectedValue({ response: { status: 404 } });
    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'invalid' }]);
    expect(req.locals.C100Api.createCase).not.toHaveBeenCalled();
    expect(req.session.destroy).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test.each([401, 500])('when COS returns HTTP %s, keep the user on the postcode page', async status => {
    mockFindCourtByPostCodeViaCosApi.mockRejectedValue({ response: { status } });
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
