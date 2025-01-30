import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';

import TaskListGetController from './TaskListGetController';

describe('tasklist get controller', () => {
  describe('load', () => {
    test('should set navfromRespondToApplication to false, save session and call super.get', () => {
      const req = mockRequest({
        session: {
          enableCaseTrainTrack: true,
          user: { id: '1234' },
          userCase: {
            ...mockUserCase,
            caseTypeOfApplication: 'C100',
            state: 'AWAITING_SUBMISSION_TO_HMCTS',
          },
        },
        params: {
          partyType: 'applicant',
        },
        state: 'AWAITING_SUBMISSION_TO_HMCTS',
      });
      const res = mockResponse();
      const taskListGetController = new TaskListGetController();
      taskListGetController.load(req, res);

      expect(req.session.applicationSettings).toEqual({ breadcrumbs: [], navfromRespondToApplication: false });
      expect(req.session.save).toHaveBeenCalled();
    });
  });
});
