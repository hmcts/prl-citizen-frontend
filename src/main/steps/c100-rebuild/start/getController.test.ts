import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { FieldPrefix } from '../../../app/case/case';
import { State } from '../../../app/case/definition';

import C100StartGetController from './getController';

jest.mock('../../../app/case/CosApiClient');

const mockMyFunction = CosApiClient as jest.Mock;
jest.mock('axios');
jest.mock('config');
jest.mock('../../../app/auth/service/get-service-auth-token');
describe('GetCaseController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new C100StartGetController('page', () => ({}), FieldPrefix.APPLICANT);
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
    await expect(controller.get(req, res)).rejects.toThrow('case could not be created-createC100ApplicantCase');
  });

  test('createC100ApplicantCase', async () => {
    req.session.userCase = {
      id: '1234',
      caseTypeOfApplication: 'C100',
      state: State.Draft,
      noOfDaysRemainingToSubmitCase: '3',
    };
    req.locals.C100Api.createCase.mockResolvedValueOnce(req.session.userCase);
    await controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/childaddress');
  });
});
