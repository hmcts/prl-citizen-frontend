import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../case/CosApiClient';

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
});
