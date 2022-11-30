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
    const userCase = req.session.userCase;

    expect(res.render).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...generatePageContent({
          language,
          pageContent: generateContent,
          userCase,
          userEmail: 'test@example.com',
          additionalData: { req },
        }),
      })
    );
  });
});
