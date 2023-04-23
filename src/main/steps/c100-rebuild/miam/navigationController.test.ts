import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { MiamNonAttendReason } from '../../../app/case/definition';
import {
  C100_HEARING_URGENCY_URGENT,
  C100_MIAM_CHILD_PROTECTION,
  C100_MIAM_GENERAL_REASONS,
  C100_MIAM_GET_MEDIATOR,
  C100_MIAM_MIAM_DOMESTIC_ABUSE,
  C100_MIAM_NO_NEED_WITH_REASONS,
  C100_MIAM_OTHER,
  C100_MIAM_OTHER_PROCEEDINGS,
  C100_MIAM_PREVIOUS_ATTENDANCE,
  C100_MIAM_URGENCY,
} from '../../urls';

import MIAMNavigationController from './navigationController';

const dummyRequest = mockRequest({
  query: {},
  session: {
    userCase: {
      miam_nonAttendanceReasons: ['childProtection', 'urgentHearing', 'validExemption'],
      miam_childProtectionEvidence: ['localAuthority'],
      miam_urgency: ['freedomPhysicalSafetyInFamily'],
      miam_notAttendingReasons: ['none'],
    },
  },
});

describe('MIAMNavigationController', () => {
  test('From MIAM reason selection screen -> navigate to the information capture screen of the first reason', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_GENERAL_REASONS, dummyRequest.session.userCase);
    expect(nextUrl).toBe(C100_MIAM_CHILD_PROTECTION);
  });

  test('From child protection screen -> navigate to the urgent hearing screen', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_CHILD_PROTECTION, dummyRequest.session.userCase);
    expect(nextUrl).toBe(C100_MIAM_URGENCY);
  });

  test('From urgent hearing screen -> navigate to the other exempt screen', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_URGENCY, dummyRequest.session.userCase);
    expect(nextUrl).toBe(C100_MIAM_OTHER);
  });

  test('From other exempt screen -> navigate to no need to attend MIAM with valid reasons screen', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_OTHER, dummyRequest.session.userCase);
    expect(nextUrl).toBe(C100_MIAM_NO_NEED_WITH_REASONS);
  });

  test('From no need to attend MIAM with valid reasons screen -> navigate to MIAM urgency details capture screen', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_NO_NEED_WITH_REASONS, dummyRequest.session.userCase);
    expect(nextUrl).toBe(C100_HEARING_URGENCY_URGENT);
    expect(nextUrl).not.toBe(C100_MIAM_OTHER_PROCEEDINGS);
  });

  test('when navigating back to MIAM reason selection screen and changing the reasons selection should navigate forward to appropriate screens', async () => {
    dummyRequest.session.userCase = {
      ...dummyRequest.session.userCase,
      miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
      miam_domesticAbuse: ['none'],
      miam_previousAttendance: ['none'],
    };

    expect(MIAMNavigationController.getNextUrl(C100_MIAM_GENERAL_REASONS, dummyRequest.session.userCase)).toBe(
      C100_MIAM_MIAM_DOMESTIC_ABUSE
    );

    expect(MIAMNavigationController.getNextUrl(C100_MIAM_MIAM_DOMESTIC_ABUSE, dummyRequest.session.userCase)).toBe(
      C100_MIAM_PREVIOUS_ATTENDANCE
    );

    expect(MIAMNavigationController.getNextUrl(C100_MIAM_PREVIOUS_ATTENDANCE, dummyRequest.session.userCase)).toBe(
      C100_MIAM_GET_MEDIATOR
    );
  });

  test('checkForAnyValidReason', async () => {
    expect(
      MIAMNavigationController.checkForAnyValidReason(
        {
          miam_nonAttendanceReasons: [
            MiamNonAttendReason.CHILD_PROTECTION,
            MiamNonAttendReason.URGENT,
            MiamNonAttendReason.NONE,
          ],
        },
        MiamNonAttendReason.EXEMPT
      )
    ).toBe(false);
  });
});
