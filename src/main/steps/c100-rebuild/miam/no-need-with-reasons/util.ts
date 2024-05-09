import _ from 'lodash';

import { CaseWithId, Miam_notAttendingReasons } from '../../../../app/case/case';
import { MiamNonAttendReason, Reason } from '../../../../app/case/definition';

import { cy, en } from './content';

export const prepareNoNeedWithReason = (userCase: Partial<CaseWithId>, language: string): Reason[] => {
  const reason: Reason[] = [];
  const translations = language === 'en' ? en : cy;
  reason.push(
    {
      heading: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.CHILD_PROTECTION)
        ? translations.nonAttendanceReasons.childProtection
        : null,
      subHeading: _.get(translations.childProtection, `${userCase?.miam_childProtectionEvidence}`),
    },
    {
      heading: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.URGENT)
        ? translations.nonAttendanceReasons.urgentHearing
        : null,
      subHeading: _.get(translations.urgentHearing, `${userCase?.miam_urgency}`),
    },
    {
      heading: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.PREV_MIAM)
        ? translations.nonAttendanceReasons.previousMIAMOrExempt
        : null,
      subHeading: _.get(translations.previousMIAMOrExempt, `${userCase?.miam_previousAttendance}`),
    },
    {
      heading: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.EXEMPT)
        ? translations.nonAttendanceReasons.validExemption
        : null,
      subHeading: _.get(translations.validExemption, `${userCase?.miam_notAttendingReasons}`),
      bullet:
        userCase?.miam_notAttendingReasons === Miam_notAttendingReasons.canNotAccessMediator
          ? translations.mediatorUnavailable[`${userCase?.miam_noMediatorReasons}`]
          : null,
    }
  );

  return reason;
};
