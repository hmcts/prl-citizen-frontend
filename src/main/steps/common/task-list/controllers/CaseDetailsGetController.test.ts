import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { State } from '../../../../app/case/definition';

//import { SIGN_IN_URL } from "../../../urls";
import CaseDetailsGetController from './CaseDetailsGetController';

const getHearings = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');
const retrieveCaseAndHearingsMock = jest.spyOn(CosApiClient.prototype, 'retrieveCaseAndHearings');

jest.mock('../../../../app/case/CosApiClient');
const mockMyFunction = CosApiClient as jest.Mock;
describe('GetCaseController', () => {
  let controller;
  let req;
  let res;

  test('Session doesnot have user', async () => {
    controller = new CaseDetailsGetController();
    req = {
      session: {},
    };
    res = mockResponse();
    await controller.get(req, res);
    expect(mockMyFunction).not.toHaveBeenCalled();
  });
  test('load should retrieve hearing data', async () => {
    controller = new CaseDetailsGetController();
    req = mockRequest({
      session: {
        user: {
          accessToken: '12345',
        },
        userCase: {
          id: '1234',
          state: State.AWAITING_SUBMISSION_TO_HMCTS,
          hearingCollection: [],
        },
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
    getHearings.mockResolvedValue(req.session.userCase);
    await controller.load(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.render).toBeCalled;
  });

  test('load should catch and throw errors', async () => {
    controller = new CaseDetailsGetController();
    req = mockRequest({
      session: {
        user: {
          accessToken: '12345',
        },
        userCase: {
          id: '1234',
          state: State.AWAITING_SUBMISSION_TO_HMCTS,
          hearingCollection: [],
        },
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
    getHearings.mockRejectedValue({ status: '500' });
    await expect(controller.load(req, res)).rejects.toThrow();
  });

  test('get should get hearings and case data', async () => {
    controller = new CaseDetailsGetController();
    req = mockRequest({
      session: {
        user: {
          accessToken: '12345',
        },
        userCase: {
          id: '1234',
          state: State.AWAITING_SUBMISSION_TO_HMCTS,
          hearingCollection: [],
        },
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
    retrieveCaseAndHearingsMock.mockResolvedValue({
      caseData: req.session.userCase,
      hearingData: { caseHearings: ['MOCK_HEARING'] },
    });
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.render).toBeCalled;
    expect(res.redirect).toHaveBeenCalledWith('/task-list/applicant');
    expect(req.session.userCase.hearingCollection).toStrictEqual(['MOCK_HEARING']);
  });

  test('get should redirect to dashboard if it cant get casedata', async () => {
    controller = new CaseDetailsGetController();
    req = mockRequest({
      session: {
        user: {
          accessToken: '12345',
        },
        userCase: {
          id: '1234',
          state: State.AWAITING_SUBMISSION_TO_HMCTS,
          hearingCollection: [],
        },
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
    retrieveCaseAndHearingsMock.mockRejectedValue({
      status: '500',
    });
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.render).toBeCalled;
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });
});
