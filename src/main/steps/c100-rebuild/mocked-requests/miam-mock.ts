import { mockRequest } from '../../../../test/unit/utils/mockRequest';

export const miamMockData = mockRequest({
  session: {
    userCase: {
      miam_nonAttendanceReasons: [
        'domesticViolence',
        'childProtection',
        'urgentHearing',
        'previousMIAMOrExempt',
        'validExemption',
      ],
      miam_domesticAbuse: ['none'],
      miam_childProtectionEvidence: ['none'],
      miam_urgency: ['none'],
      miam_previousAttendance: ['none'],
      miam_notAttendingReasons: ['none'],
    },
  },
});
