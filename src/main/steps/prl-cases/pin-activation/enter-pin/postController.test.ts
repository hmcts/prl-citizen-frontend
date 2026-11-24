import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseActivationNotAllowedError } from '../../../../app/case/CaseActivationNotAllowedError';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { State } from '../../../../app/case/definition';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { isValidAccessCode } from '../../../../app/form/validation';
import { DASHBOARD_URL } from '../../../urls';

import LinkCaseToAccountPostController from './postController';

const validateAccessCodeMock = jest.spyOn(CosApiClient.prototype, 'validateAccessCode');
const linkCaseToCitizenMock = jest.spyOn(CosApiClient.prototype, 'linkCaseToCitizen');

describe('LinkCaseToAccountPostController', () => {
  let controller;
  let req;
  let res;
  let retrieveCaseByIdMock;

  beforeEach(() => {
    jest.clearAllMocks();
    validateAccessCodeMock.mockReset();
    linkCaseToCitizenMock.mockReset();
    controller = new LinkCaseToAccountPostController({} as FormFields);
    req = mockRequest({ body: { caseCode: '1234567890123456', accessCode: 'ABCD1234' } });
    req.session.errors = [];
    retrieveCaseByIdMock = jest.fn().mockRejectedValue(new Error('Citizen does not yet have case access'));
    req.locals.C100Api.retrieveCaseById = retrieveCaseByIdMock;
    res = mockResponse();
  });

  test('Links an eligible case without reading it as the unlinked citizen', async () => {
    validateAccessCodeMock.mockResolvedValueOnce('Valid');
    linkCaseToCitizenMock.mockResolvedValueOnce({
      caseData: { id: '1234567890123456', state: State.CASE_SERVED },
      hearingData: { caseHearings: [] },
    } as unknown as Awaited<ReturnType<CosApiClient['linkCaseToCitizen']>>);

    await controller.post(req, res);

    expect(validateAccessCodeMock).toHaveBeenCalledWith('1234567890123456', 'ABCD1234', req.session.user);
    expect(linkCaseToCitizenMock).toHaveBeenCalledWith('1234567890123456', 'ABCD1234');
    expect(validateAccessCodeMock.mock.invocationCallOrder[0]).toBeLessThan(
      linkCaseToCitizenMock.mock.invocationCallOrder[0]
    );
    expect(req.session.userCase.id).toBe('1234567890123456');
    expect(req.session.userCase.hearingCollection).toEqual([]);
    expect(retrieveCaseByIdMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('Returns to the dashboard with the blocked message when COS reports NotReady', async () => {
    req.session.userCase.state = State.CASE_SERVED;
    validateAccessCodeMock.mockResolvedValueOnce('NotReady');

    await controller.post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.session.caseActivationBlocked).toBe(true);
    expect(req.session.userCase.caseCode).toBeUndefined();
    expect(req.session.userCase.accessCode).toBeUndefined();
    expect(linkCaseToCitizenMock).not.toHaveBeenCalled();
    expect(retrieveCaseByIdMock).not.toHaveBeenCalled();
    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(DASHBOARD_URL);
  });

  test.each([
    ['Linked', [{ errorType: 'accesscodeAlreadyLinked', propertyName: 'accessCode' }]],
    ['Duplicate', [{ errorType: 'accesscodeAlreadyUsed', propertyName: 'accessCode' }]],
    [
      'Invalid',
      [
        { errorType: 'invalidCaseCode', propertyName: 'caseCode' },
        { errorType: 'invalidAccessCode', propertyName: 'accessCode' },
      ],
    ],
  ] as const)('Preserves the form errors for %s codes', async (status, errors) => {
    validateAccessCodeMock.mockResolvedValueOnce(status);

    await controller.post(req, res);

    expect(req.session.errors).toEqual(errors);
    expect(req.session.caseActivationBlocked).toBeUndefined();
    expect(linkCaseToCitizenMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(req.url);
  });

  test.each([401, 403, 404, 500])('Keeps the user on the form when the check fails with HTTP %s', async status => {
    validateAccessCodeMock.mockRejectedValueOnce({ response: { status } });

    await controller.post(req, res);

    expect(req.session.errors).toEqual([{ errorType: 'caseStatusUnavailable', propertyName: 'caseCode' }]);
    expect(req.session.caseActivationBlocked).toBeUndefined();
    expect(linkCaseToCitizenMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(req.url);
  });

  test('Allows another attempt when the case becomes eligible', async () => {
    validateAccessCodeMock.mockResolvedValueOnce('NotReady').mockResolvedValueOnce('Valid');
    linkCaseToCitizenMock.mockResolvedValueOnce({
      caseData: { id: '1234567890123456', state: State.CASE_SERVED },
      hearingData: null,
    });

    await controller.post(req, res);
    expect(linkCaseToCitizenMock).not.toHaveBeenCalled();
    await controller.post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.session.caseActivationBlocked).toBeUndefined();
    expect(validateAccessCodeMock).toHaveBeenCalledTimes(2);
    expect(linkCaseToCitizenMock).toHaveBeenCalledTimes(1);
    expect(req.session.userCase.id).toBe('1234567890123456');
  });

  test('Handles the case becoming ineligible between the check and linking', async () => {
    validateAccessCodeMock.mockResolvedValueOnce('Valid');
    linkCaseToCitizenMock.mockRejectedValueOnce(new CaseActivationNotAllowedError());

    await controller.post(req, res);

    expect(req.session.errors).toEqual([]);
    expect(req.session.caseActivationBlocked).toBe(true);
    expect(req.session.userCase.accessCode).toBeUndefined();
    expect(res.redirect).toHaveBeenCalledWith(DASHBOARD_URL);
  });

  test('Preserves the existing error handling for other linking failures', async () => {
    validateAccessCodeMock.mockResolvedValueOnce('Valid');
    linkCaseToCitizenMock.mockRejectedValueOnce(new Error('Link failed'));

    await controller.post(req, res);

    expect(req.session.errors).toEqual([
      { errorType: 'invalidCaseCode', propertyName: 'caseCode' },
      { errorType: 'invalidAccessCode', propertyName: 'accessCode' },
    ]);
    expect(res.redirect).toHaveBeenCalledWith(req.url);
  });

  test('Validates the form before calling COS', async () => {
    const formContent = {
      fields: { accessCode: { type: 'code', validator: isValidAccessCode } },
    } as unknown as FormContent;
    controller = new LinkCaseToAccountPostController(formContent.fields as FormFields);
    req.body.accessCode = 'bad';

    await controller.post(req, res);

    expect(validateAccessCodeMock).not.toHaveBeenCalled();
    expect(linkCaseToCitizenMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(req.url);
  });
});
