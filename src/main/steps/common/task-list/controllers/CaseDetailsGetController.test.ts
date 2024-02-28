import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { State } from '../../../../app/case/definition';

//import { SIGN_IN_URL } from "../../../urls";
import CaseDetailsGetController from './CaseDetailsGetController';

const getHearings = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');
const caseData = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');

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
  test('Session have user', async () => {
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
    caseData.mockResolvedValue(req.session.userCase);
    await controller.get(req, res);
    await controller.load(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
    expect(res.render).toBeCalled;
  });
});
