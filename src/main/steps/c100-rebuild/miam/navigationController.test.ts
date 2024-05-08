import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { Miam_noMediatorReasons, Miam_previousAttendance } from '../../../app/case/case';
import { DomesticAbuseExemptions, MiamNonAttendReason, YesOrNo } from '../../../app/case/definition';
import {
  C100_HEARING_URGENCY_URGENT,
  C100_MIAM_CHILD_PROTECTION,
  C100_MIAM_GENERAL_REASONS,
  C100_MIAM_GET_MEDIATOR,
  C100_MIAM_MIAM_DOMESTIC_ABUSE,
  C100_MIAM_NO_ACCESS_MEDIATOR,
  C100_MIAM_NO_NEED_WITH_REASONS,
  C100_MIAM_OTHER,
  C100_MIAM_OTHER_PROCEEDINGS,
  C100_MIAM_PREVIOUS_ATTENDANCE,
  C100_MIAM_PREVIOUS_MIAM_ATTENDANCE_OR_NCDR,
  C100_MIAM_PROVIDING_DA_EVIDENCE,
  C100_MIAM_UPLOAD_DA_EVIDENCE,
  C100_MIAM_URGENCY,
} from '../../urls';

import MIAMNavigationController from './navigationController';

const dummyRequest = mockRequest({
  query: {},
  session: {
    userCase: {
      miam_nonAttendanceReasons: ['childProtection', 'urgentHearing', 'validExemption'],
      miam_childProtectionEvidence: 'localAuthority',
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

  test('From no access mediator screen -> navigate to get mediator screen if miam_noMediatorReasons is none', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_NO_ACCESS_MEDIATOR, {
      miam_noMediatorReasons: 'none' as Miam_noMediatorReasons,
    });
    expect(nextUrl).toBe('/c100-rebuild/miam/get-mediator');
  });

  test('From no access mediator screen -> navigate to no need with reasons screen if miam_noMediatorReasons is not none', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_NO_ACCESS_MEDIATOR, {
      miam_noMediatorReasons: 'noAppointmentAvailable' as Miam_noMediatorReasons,
    });
    expect(nextUrl).toBe('/c100-rebuild/miam/no-need-with-reasons');
  });

  test('From previous attendance screen -> navigate to upload evidence for attending screen if previous attendance is fourMonthsPriorAttended', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_PREVIOUS_ATTENDANCE, {
      miam_previousAttendance: 'fourMonthsPriorAttended' as Miam_previousAttendance,
    });
    expect(nextUrl).toBe('/c100-rebuild/miam/upload-evidence-of-attending-miam-or-ncdr');
  });

  test('From previous attendance screen -> navigate to previous miam or ncdr screen if previous attendance is miamExamptionApplied', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_PREVIOUS_ATTENDANCE, {
      miam_previousAttendance: 'miamExamptionApplied' as Miam_previousAttendance,
    });
    expect(nextUrl).toBe('/c100-rebuild/miam/previous-miam-attendance-or-ncdr');
  });

  test('From previous miam or ncdr screen -> navigate to upload previous miam or ncdr evidence screen', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_PREVIOUS_MIAM_ATTENDANCE_OR_NCDR, {
      miam_haveDocSignedByMediatorForPrevAttendance: 'Yes' as YesOrNo,
    });
    expect(nextUrl).toBe('/c100-rebuild/miam/upload-evidence-of-attending-miam-or-ncdr');
  });

  test('From domestic abuse screen -> navigate to provide domestic abuse evidence screen', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_MIAM_DOMESTIC_ABUSE, {
      miam_domesticAbuse: ['financialAbuse' as DomesticAbuseExemptions],
    });
    expect(nextUrl).toBe(C100_MIAM_PROVIDING_DA_EVIDENCE);
  });

  test('From provide domestic abuse evidence screen -> navigate to upload domestic abuse evidence screen if miam_canProvideDomesticAbuseEvidence is yes', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_PROVIDING_DA_EVIDENCE, {
      miam_canProvideDomesticAbuseEvidence: 'Yes' as YesOrNo,
    });
    expect(nextUrl).toBe('/c100-rebuild/miam/domestic-abuse/upload-evidence');
  });

  test('From provide domestic abuse evidence screen -> navigate to screen for next non attendance reason', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_PROVIDING_DA_EVIDENCE, {
      miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'] as unknown as MiamNonAttendReason[],
      miam_canProvideDomesticAbuseEvidence: 'No' as YesOrNo,
    });
    expect(nextUrl).toBe('/c100-rebuild/miam/previous-attendance');
  });

  test('From upload domestic abuse evidence screen -> navigate to screen for next non attendance reason', async () => {
    const nextUrl = MIAMNavigationController.getNextUrl(C100_MIAM_UPLOAD_DA_EVIDENCE, {
      miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'] as unknown as MiamNonAttendReason[],
    });
    expect(nextUrl).toBe('/c100-rebuild/miam/previous-attendance');
  });

  test('domestic abuse screens should navigate to correct page when no other reasons for non attendance selected', async () => {
    dummyRequest.session.userCase = {
      ...dummyRequest.session.userCase,
      miam_domesticAbuse: ['none'],
      miam_nonAttendanceReasons: ['domesticViolence'],
    };

    expect(MIAMNavigationController.getNextUrl(C100_MIAM_MIAM_DOMESTIC_ABUSE, dummyRequest.session.userCase)).toBe(
      C100_MIAM_GET_MEDIATOR
    );
    expect(MIAMNavigationController.getNextUrl(C100_MIAM_PROVIDING_DA_EVIDENCE, dummyRequest.session.userCase)).toBe(
      C100_MIAM_GET_MEDIATOR
    );
    expect(MIAMNavigationController.getNextUrl(C100_MIAM_UPLOAD_DA_EVIDENCE, dummyRequest.session.userCase)).toBe(
      C100_MIAM_GET_MEDIATOR
    );
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
