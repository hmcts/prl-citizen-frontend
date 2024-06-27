import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { State } from '../../../app/case/definition';

import C100StartPostController from './postController';

jest.mock('../../../app/case/CosApiClient');

const mockMyFunction = CosApiClient as jest.Mock;
jest.mock('axios');
jest.mock('config');
jest.mock('../../../app/auth/service/get-service-auth-token');
describe('C100StartPostController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new C100StartPostController({});
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

  test('createC100ApplicantCase with error', async () => {
    req.session.userCase = {
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.Draft,
      noOfDaysRemainingToSubmitCase: '3',
    };
    await expect(controller.post(req, res)).rejects.toThrow('case could not be created-createC100ApplicantCase');
  });

  test('createC100ApplicantCase', async () => {
    req.session.userCase = {
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.Draft,
      noOfDaysRemainingToSubmitCase: '3',
    };
    req.locals.C100Api.createCase.mockResolvedValueOnce(req.session.userCase);
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });
});
