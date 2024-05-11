import _ from 'lodash';

import {
  CaseWithId,
  Miam_childProtectionEvidence,
  Miam_notAttendingReasons,
  Miam_previousAttendance,
  Miam_urgency,
} from '../../../../app/case/case';
import { DomesticAbuseExemptions, MiamNonAttendReason, Reason } from '../../../../app/case/definition';
import { languages as commonLanguages } from '../domestic-abuse/common.content';

import { cy, en } from './content';

export const getExcemptionSummary = (userCase: Partial<CaseWithId>, language: string): Reason[] => {
  const exemptionSummary: Reason[] = [];
  const translations = language === 'en' ? en : cy;

  exemptionSummary.push(
    {
      title:
        userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.DOMESTIC) &&
        !userCase.miam_domesticAbuse?.includes(DomesticAbuseExemptions.NONE)
          ? translations.nonAttendanceReasons.domesticViolence
          : undefined,
      reasons: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.DOMESTIC)
        ? userCase?.miam_domesticAbuse
            ?.map(abuseEvidenceType => {
              return {
                reason: _.get(commonLanguages[language], abuseEvidenceType),
                examption: _.get(userCase, `miam_domesticAbuse_${abuseEvidenceType}_subfields`, [])
                  .map(abuseReason => _.get(commonLanguages[language][`${abuseEvidenceType}_subFields`], abuseReason))
                  .filter(value => !_.isEmpty(value)),
              };
            })
            .filter(value => !_.isEmpty(value))
        : [],
    },
    {
      title:
        userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.CHILD_PROTECTION) &&
        userCase.miam_childProtectionEvidence !== Miam_childProtectionEvidence.none
          ? translations.nonAttendanceReasons.childProtection
          : undefined,
      reasons: [{ reason: _.get(translations.childProtection, `${userCase?.miam_childProtectionEvidence}`) }],
    },
    {
      title:
        userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.URGENT) &&
        userCase.miam_urgency !== Miam_urgency.none
          ? translations.nonAttendanceReasons.urgentHearing
          : undefined,
      reasons: [{ reason: _.get(translations.urgentHearing, `${userCase?.miam_urgency}`) }],
    },
    {
      title:
        userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.PREV_MIAM) &&
        userCase.miam_previousAttendance !== Miam_previousAttendance.none
          ? translations.nonAttendanceReasons.previousMIAMOrExempt
          : undefined,
      reasons: [{ reason: _.get(translations.previousMIAMOrExempt, `${userCase?.miam_previousAttendance}`) }],
    },
    {
      title:
        userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.EXEMPT) &&
        userCase.miam_notAttendingReasons !== Miam_notAttendingReasons.none
          ? translations.nonAttendanceReasons.validExemption
          : undefined,
      reasons: [
        {
          reason: _.get(translations.validExemption, `${userCase?.miam_notAttendingReasons}`),
          examption:
            userCase?.miam_notAttendingReasons === Miam_notAttendingReasons.canNotAccessMediator
              ? [translations.mediatorUnavailable[`${userCase?.miam_noMediatorReasons}`]]
              : [],
        },
      ],
    }
  );

  return exemptionSummary;
};
