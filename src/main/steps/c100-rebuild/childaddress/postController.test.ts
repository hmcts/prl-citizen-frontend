import config from 'config';
import { when } from 'jest-when';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { State } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

import C100ChildPostCodePostController from './postController';

jest.mock('../../../app/case/CosApiClient');

describe('C100ChildPostCodePostController', () => {
  let req;
  let res;
  const mockFindCourtByPostCodeAndService = jest.spyOn(CosApiClient.prototype, 'findCourtByPostCodeAndService');
  const mockFormContent = {
    fields: {
      c100RebuildChildPostCode: {
        type: 'text',
        validator: value => isFieldFilledIn(value) || isInvalidPostcode(value),
      },
    },
  } as unknown as FormContent;
  config.get = jest.fn();

  jest.mock('config');
  jest.mock('axios');
  jest.mock('../../../app/auth/service/get-service-auth-token');

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    req.locals.C100Api.createCase.mockClear();
    mockFindCourtByPostCodeAndService.mockClear();
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
      state: State.Draft,
      noOfDaysRemainingToSubmitCase: '3',
    });
    when(config.get).calledWith('allowedCourts').mockReturnValue(['Swansea Civil Justice Centre']);
    req.session.userCase.testingSupport = true;
    req.body.c100RebuildChildPostCode = 'SO15 2XQ';

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
      state: State.Draft,
      noOfDaysRemainingToSubmitCase: '3',
    });
    when(config.get).calledWith('allowedCourts').mockReturnValue(['Swansea Civil Justice Centre']);

    req.body.c100RebuildChildPostCode = 'SA1 2DZ';

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.locals.C100Api.createCase).toHaveBeenCalled();
    expect(req.session.userCase).toEqual({
      caseId: '1234',
      caseTypeOfApplication: 'C100',
      state: State.Draft,
      noOfDaysRemainingToSubmitCase: '3',
    });
    expect(res.redirect).toHaveBeenCalled();
  });

  test('when postcode is valid and any court is allowed', async () => {
    req.locals.C100Api.createCase.mockResolvedValueOnce({
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.Draft,
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
      state: State.Draft,
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

    await new C100ChildPostCodePostController(mockFormContent.fields).post(req, res);

    expect(req.session.errors).toEqual([{ propertyName: 'c100RebuildChildPostCode', errorType: 'generic' }]);
    expect(res.redirect).toHaveBeenCalled();
  });
});
