import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';

import ApplicantTaskListGetController from './get';

describe('ApplicantTaskListGetController', () => {
  const controller = new ApplicantTaskListGetController();

  test('Should render the ApplicantTaskList page for private law service', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          ...mockUserCase,
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
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalled;
  });
});
