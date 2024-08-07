/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-unresolved */
import { CaseWithId } from '../../../../app/case/case';
import { cy as attendanceCy, en as attendanceEn } from '../../miam/attendance/content';
import { cy as GeneralContentCy, en as GeneralContentEn } from '../../miam/general-reasons/content';
import { cy as mcCy, en as mcEn } from '../../miam/mediator-confirmation/content';
import { cy as opCy, en as opEn } from '../../miam/other-proceedings/content';
import { cy as UrgentHearingContentCy, en as UrgentHearingContentEn } from '../../miam/urgency/content';
import { cy as validReasonCy, en as validReasonEn } from '../../miam/valid-reason/content';

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
        reasonForNotAttendingMiam: validReasonEn.title,
        validResonsNotAttendingMiam: validReasonEn.title,
        attendedMiamMidiation: attendanceEn.title,
        urgentHearing: UrgentHearingContentEn.title,
        error: '',
      };
    },
    cy: () => {
      return {
        childInvolvementInSupervision: opCy().title,
        mediatorConfirmation: mcCy().title,
        reasonForNotAttendingMiam: validReasonCy.title,
        validResonsNotAttendingMiam: validReasonCy.title,
        attendedMiamMidiation: attendanceCy.title,
        urgentHearing: UrgentHearingContentCy.title,
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
    const sessionFields = MiamContentsForGeneralReasons(userCase as unknown as CaseWithId);
    userCase.miam_nonAttendanceReasons.forEach(item => {
      expect(sessionFields?.en()[item]).toBe(GeneralContentEn[item]);
      expect(sessionFields?.cy()[item]).toBe(GeneralContentCy[item]);
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
        'financialAbuse',
      ],
    };
    const sessionFields = MiamContentsForDomensticVoilence(userCase as unknown as CaseWithId);
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
    const sessionFields = MiamContentsForUrgentHearing(userCase as unknown as CaseWithId);
    userCase.miam_urgency.forEach(item => {
      expect(sessionFields?.en()[item]).not.toBe(undefined);
      expect(sessionFields?.cy()[item]).not.toBe(undefined);
    });
  });

  test('miam_previousAttendance test for checking if respective screen match contentss', () => {
    const userCase = {
      miam_previousAttendance: ['fourMonthsPriorAttended', 'miamExamptionApplied'],
    };
    const sessionFields = MiamContentsForPreviousAttendance(userCase as unknown as CaseWithId);
    userCase.miam_previousAttendance.forEach(item => {
      expect(sessionFields?.en()[item]).not.toBe(undefined);
      expect(sessionFields?.cy()[item]).not.toBe(undefined);
    });
  });
  test('miam_notAttendingReasons test for checking if respective screen match contentss', () => {
    const userCase = {
      miam_notAttendingReasons: ['applyingForWithoutNoticeHearing', 'canNotAccessMediator', 'under18'],
    };
    const sessionFields = MiamContentForOtherFeatureAndSubFeilds(userCase as unknown as CaseWithId);
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
    const sessionFields = MiamContentForOtherFeatureAndSubFeilds(userCase as unknown as CaseWithId);
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
    const sessionFields = MiamContentsForChildProtection(userCase as unknown as CaseWithId);
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
