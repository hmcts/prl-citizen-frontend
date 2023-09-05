import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CosApiClient } from '../../../app/case/CosApiClient';

import ApplicantTaskListGetController from './get';

const getHearings = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');

describe('ApplicantTaskListGetController', () => {
  const controller = new ApplicantTaskListGetController();
  test('Should render the ApplicantTaskList page for private law service', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          ...mockUserCase,
          hearingCollection: [],
          respondentsFL401: {
            firstName: '',
            lastName: '',
          },
          applicantsFL401: {
            firstName: '',
            lastName: '',
          },
          caseId: '',
        },
      },
      user: {
        id: '',
      },
    });
    getHearings.mockResolvedValue(req.session.userCase);
    const res = mockResponse();
    await controller.get(req, res);
    await controller.load(req, res);
    expect(res.render).toBeCalled;
  });
});
