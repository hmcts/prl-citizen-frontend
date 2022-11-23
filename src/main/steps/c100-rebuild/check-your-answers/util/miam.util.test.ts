/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-unresolved */
import { cy as attendanceCy, en as attendanceEn } from '../../miam/attendance/content';
import { cy as mcCy, en as mcEn } from '../../miam/mediator-confirmation/content';
import { cy as opCy, en as opEn } from '../../miam/other-proceedings/content';
import { cy as UrgentHearingContentCy, en as UrgentHearingContentEn } from '../../miam/urgency/content';
import { cy as vrCy, en as vrEn } from '../../miam/valid-reason/content';

import {
  MiamContentForOtherFeatureAndSubFeilds,
  MiamContentsForChildProtection,
  MiamContentsForDomensticVoilence,
  MiamContentsForGeneralReasons,
  MiamContentsForPreviousAttendance,
  MiamContentsForUrgentHearing,
  additionalTitlesMiam,
} from './miam.util';

const additionalTitlesMiamTestSample = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        childInvolvementInSupervision: opEn().title,
        mediatorConfirmation: mcEn().title,
        reasonForNotAttendingMiam: vrEn().title,
        validResonsNotAttendingMiam: vrEn().title,
        attendedMiamMidiation: attendanceEn().title,
        urgentHearing: UrgentHearingContentEn().title,
        error: '',
      };
    },
    cy: () => {
      return {
        childInvolvementInSupervision: opCy().title,
        mediatorConfirmation: mcCy().title,
        reasonForNotAttendingMiam: vrCy().title,
        validResonsNotAttendingMiam: vrCy().title,
        attendedMiamMidiation: attendanceCy().title,
        urgentHearing: UrgentHearingContentCy().title,
        error: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};

/* eslint-disable @typescript-eslint/ban-types */
describe('miam Util', () => {
  test('miam_nonAttendanceReasons test for checking if respective screen match contentss', () => {
    const userCase = {
      miam_nonAttendanceReasons: [
        'domesticViolence',
        'childProtection',
        'urgentHearing',
        'previousMIAMOrExempt',
        'validExemption',
      ],
    };
    const sessionFields = MiamContentsForGeneralReasons(userCase);
    userCase.miam_nonAttendanceReasons.forEach(item => {
      expect(sessionFields?.en()[item]).not.toBe(undefined);
      expect(sessionFields?.cy()[item]).not.toBe(undefined);
    });
  });

  test('miam_domesticAbuse test for checking if respective screen match contentss', () => {
    const userCase = {
      miam_domesticAbuse: [
        'policeInvolvement',
        'courtInvolvement',
        'letterOfBeingVictim',
        'letterFromAuthority',
        'letterFromSupportService',
        'ILRDuetoDomesticAbuse',
        'financiallyAbuse',
      ],
    };
    const sessionFields = MiamContentsForDomensticVoilence(userCase);
    userCase.miam_domesticAbuse.forEach(item => {
      expect(sessionFields?.en()[item]).not.toBe(undefined);
      expect(sessionFields?.cy()[item]).not.toBe(undefined);
    });
  });

  test('miam_urgency test for checking if respective screen match contentss', () => {
    const userCase = {
      miam_urgency: [
        'freedomPhysicalSafety',
        'freedomPhysicalSafetyInFamily',
        'riskSafetyInHome',
        'riskUnreasonableFinancialHardship',
        'riskOfHarmToChildren',
        'unlawfullyRemovedFromUK',
        'riskOfUnfairCourtDecision',
        'riskOfIrretrievableProblems',
        'riskOfCourtProceedingsDispute',
      ],
    };
    const sessionFields = MiamContentsForUrgentHearing(userCase);
    userCase.miam_urgency.forEach(item => {
      expect(sessionFields?.en()[item]).not.toBe(undefined);
      expect(sessionFields?.cy()[item]).not.toBe(undefined);
    });
  });

  test('miam_previousAttendance test for checking if respective screen match contentss', () => {
    const userCase = {
      miam_previousAttendance: [
        'fourMonthsPriorAttended',
        'onTimeParticipation',
        'beforeInitiationProceeding',
        'fourMonthsPriorFiled',
        'miamExamptionApplied',
        'beforStatingApplication',
      ],
    };
    const sessionFields = MiamContentsForPreviousAttendance(userCase);
    userCase.miam_previousAttendance.forEach(item => {
      expect(sessionFields?.en()[item]).not.toBe(undefined);
      expect(sessionFields?.cy()[item]).not.toBe(undefined);
    });
  });
  test('miam_notAttendingReasons test for checking if respective screen match contentss', () => {
    const userCase = {
      miam_notAttendingReasons: [
        'noSufficientContactDetails',
        'applyingForWithoutNoticeHearing',
        'canNotAccessMediator',
        'notAttendingAsInPrison',
        'notHabituallyResident',
        'under18',
      ],
    };
    const sessionFields = MiamContentForOtherFeatureAndSubFeilds(userCase);
    userCase.miam_notAttendingReasons.forEach(item => {
      expect(sessionFields?.en()[item]).not.toBe(undefined);
      expect(sessionFields?.cy()[item]).not.toBe(undefined);
    });
  });

  test('miam_notAttendingReasons_canNotAccessMediator test for checking if respective screen match contentss', () => {
    const userCase = {
      miam_notAttendingReasons_canNotAccessMediator: [
        'mediatorDoesNotHaveDisabilityAccess',
        'noMediatorAppointment',
        'noAuthorisedFamilyMediator',
      ],
    };
    const sessionFields = MiamContentForOtherFeatureAndSubFeilds(userCase);
    userCase.miam_notAttendingReasons_canNotAccessMediator.forEach(item => {
      expect(sessionFields).not.toBe(item);
      expect(sessionFields).not.toBe(item);
    });
  });
  test('MiamContentsForChildProtection test for checking if respective screen match contentss', () => {
    const userCase = {
      /* A field that is used to store the evidence of child protection. */
      miam_childProtectionEvidence: ['test1', 'test2', 'test3', 'test4'],
    };
    const sessionFields = MiamContentsForChildProtection(userCase);
    userCase.miam_childProtectionEvidence.forEach(item => {
      expect(sessionFields?.en()[item]).not.toBe([]);
      expect(sessionFields?.cy()[item]).not.toBe([]);
    });
  });

  test('additionalTitlesMiam test for checking if respective screen match contentss', () => {
    expect(additionalTitlesMiam('en').toString()).toBe(additionalTitlesMiamTestSample('en').toString());
    expect(additionalTitlesMiam('cy').toString()).toBe(additionalTitlesMiamTestSample('cy').toString());
  });
});
