import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { State } from '../../../../app/case/definition';

import { GetCaseController } from './GetCaseController';

const userCase = {
  id: '1663168443106316',
  state: State.Submitted,
};
const retrieveByCaseIdrMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');

describe.skip('GetCaseController', () => {
  beforeEach(() => {
    retrieveByCaseIdrMock.mockResolvedValueOnce(userCase);
  });

  afterEach(() => {
    retrieveByCaseIdrMock.mockClear();
  });

  test('Should get the case details', async () => {
    const controller = new GetCaseController();

    const req = mockRequest();
    const res = mockResponse();

    req.params = { caseId: '1234567' };
    await controller.getCase(req, res);
    expect(req.session.userCase.id).toEqual('1663168443106316');
  });

  test.skip('Should not get the case details', async () => {
    const controller = new GetCaseController();

    const req = mockRequest();
    const res = mockResponse();

    await controller.getCase(req, res);
    expect(req.session.userCase.id).not.toEqual('1663168443106316');
  });
});
