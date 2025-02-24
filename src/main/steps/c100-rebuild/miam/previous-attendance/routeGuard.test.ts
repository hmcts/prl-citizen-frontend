import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('MIAM previous attendance reasons Route Guard', () => {
  describe('get', () => {
    test('Should render the page when the guard validation passes', async () => {
      const req = mockRequest({
        session: {
          userCase: {
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
          },
        },
      });
      const res = mockResponse();
      const next = jest.fn();
      routeGuard.get(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    test('Should not render the page when the guard validation fails', async () => {
      const req = mockRequest({
        session: {
          userCase: {
            miam_nonAttendanceReasons: ['urgentHearing'],
          },
        },
      });
      const res = mockResponse();
      const next = jest.fn();
      routeGuard.get(req, res, next);
      expect(res.redirect).toHaveBeenCalledWith('error');
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('post', () => {
    test('Should delete previous attendance details if four months prior selected', async () => {
      const req = mockRequest({
        body: {
          miam_previousAttendance: 'fourMonthsPriorAttended',
        },
        session: {
          userCase: {
            miam_haveDocSignedByMediatorForPrevAttendance: 'No',
            miam_detailsOfEvidence: 'details',
          },
        },
      });
      const res = mockResponse();
      const next = jest.fn();
      routeGuard.post(req, res, next);
      expect(req.session.userCase).toEqual({});
      expect(next).toHaveBeenCalled();
    });

    test('Should not delete previous attendance details if miamExamptionApplied selected', async () => {
      const req = mockRequest({
        body: {
          miam_previousAttendance: 'miamExamptionApplied',
        },
        session: {
          userCase: {
            miam_haveDocSignedByMediatorForPrevAttendance: 'No',
            miam_detailsOfEvidence: 'details',
          },
        },
      });
      const res = mockResponse();
      const next = jest.fn();
      routeGuard.post(req, res, next);
      expect(req.session.userCase).toEqual({
        miam_haveDocSignedByMediatorForPrevAttendance: 'No',
        miam_detailsOfEvidence: 'details',
      });
      expect(next).toHaveBeenCalled();
    });
  });
});
