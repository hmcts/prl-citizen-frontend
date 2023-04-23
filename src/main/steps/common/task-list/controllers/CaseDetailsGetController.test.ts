import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { State } from '../../../../app/case/definition';

//import { SIGN_IN_URL } from "../../../urls";
import CaseDetailsGetController from './CaseDetailsGetController';

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
    await controller.get(req, res);
    expect(mockMyFunction).toHaveBeenCalled();
  });
});
