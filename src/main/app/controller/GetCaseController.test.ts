import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import {
  APPLICANT_TASK_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  RESPONDENT_TASK_LIST_URL,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  RESPOND_TO_APPLICATION,
} from '../../steps/urls';
import { CosApiClient } from '../case/CosApiClient';
import { State } from '../case/definition';

import { GetCaseController } from './GetCaseController';

jest.mock('../case/CosApiClient');

const mockMyFunction = CosApiClient as jest.Mock;
jest.mock('axios');
jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');
describe('GetCaseController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new GetCaseController();
    req = mockRequest({
      locals: {
        api: jest.fn(),
      },
      session: {
        userCase: {},
        userCaseList: [
          {
            id: '1234',
          },
        ],
      },
      params: {
        caseId: '1234',
      },
    });
    res = mockResponse();
    mockMyFunction.mockReturnValue('hello');
  });
  test('applicant Case', async () => {
    await controller.getApplicantCase(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });

  test('respondent case', async () => {
    await controller.getRespondentCase(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });

  test('guide respondent to tasklist', async () => {
    await controller.fetchAndRedirectToTasklist(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });

  test('fetchAndRedirectToTasklist redirect to RESPONDENT_TASK_LIST_URL', async () => {
    req.originalUrl = RESPONDENT_TASK_LIST_URL + '/' + req.params.caseId;
    await controller.fetchAndRedirectToTasklist(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/respondent/task-list');
  });
  test('fetchAndRedirectToTasklist redirect to dashboard', async () => {
    req.session.user = undefined;
    await controller.fetchAndRedirectToTasklist(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/login?callback=/request');
  });

  test('fetchAndRedirectToTasklist redirect to RESPONDENT_VIEW_ALL_DOCUMENTS', async () => {
    req.originalUrl = RESPONDENT_VIEW_ALL_DOCUMENTS + '/' + req.params.caseId;
    await controller.fetchAndRedirectToTasklist(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/respondent/yourdocuments/alldocuments/alldocuments');
  });

  test('fetchAndRedirectToTasklist redirect to APPLICANT_TASK_LIST_URL', async () => {
    req.originalUrl = APPLICANT_TASK_LIST_URL + '/' + req.params.caseId;
    await controller.fetchAndRedirectToTasklist(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/applicant/task-list');
  });

  test('fetchAndRedirectToTasklist redirect to APPLICANT_VIEW_ALL_DOCUMENTS', async () => {
    req.originalUrl = APPLICANT_VIEW_ALL_DOCUMENTS + '/' + req.params.caseId;
    await controller.fetchAndRedirectToTasklist(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/applicant/yourdocuments/alldocuments/alldocuments');
  });

  test('fetchAndRedirectToTasklist redirect to RESPOND_TO_APPLICATION', async () => {
    req.originalUrl = RESPOND_TO_APPLICATION + '/' + req.params.caseId;
    await controller.fetchAndRedirectToTasklist(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/start');
  });

  test('fetchAndRedirectToTasklist redirect to SIGN_IN_URL', async () => {
    // req.originalUrl = SIGN_IN_URL + '/' + req.params.caseId;
    req = mockRequest();
    await controller.fetchAndRedirectToTasklist(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });

  test('createC100ApplicantCase with error', async () => {
    req.session.userCase = {
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    };
    await expect(controller.createC100ApplicantCase(req, res)).rejects.toThrow(
      'case could not be created-createC100ApplicantCase'
    );
  });
  test('createC100ApplicantCase', async () => {
    req.session.userCase = {
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      noOfDaysRemainingToSubmitCase: '3',
    };
    req.locals.C100Api.createCase.mockResolvedValueOnce(req.session.userCase);
    await controller.createC100ApplicantCase(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/childaddress');
  });
  test('getC100ApplicantCase', async () => {
    req.params.caseId = '123';
    await expect(controller.getC100ApplicantCase(req, res)).rejects.toThrow(
      'Error in retriving the case - getC100ApplicantCase'
    );
  });
});
