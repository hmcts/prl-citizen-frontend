import {
  MiamContentForOtherFeatureAndSubFeilds,
  MiamContentsForDomensticVoilence,
  MiamContentsForGeneralReasons,
  MiamContentsForPreviousAttendance,
  MiamContentsForUrgentHearing,
} from './miam.util';

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
      expect(sessionFields).not.toBe(undefined);
    });
  });
});
