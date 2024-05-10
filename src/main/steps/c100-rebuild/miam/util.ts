//import _ from 'lodash';

import {
  Case,
  //CaseWithId, Miam_notAttendingReasons
} from '../../../app/case/case';
import {
  MiamNonAttendReason,
  // Reason
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
//import { languages as commonLanguages } from '../miam/domestic-abuse/common.content';
//import { cy, en } from '../miam/miam-excemptions-summary/content';

export const isAllowed = (reason: MiamNonAttendReason, caseData: Partial<Case>): boolean =>
  (caseData?.miam_nonAttendanceReasons ?? []).includes(reason);

export const removeEvidenceDocErrors = (req: AppRequest, evidenceDocumentType: string): void => {
  req.session.errors = req.session?.errors?.length
    ? req.session.errors?.filter(error => error.propertyName !== evidenceDocumentType)
    : [];
};

export const handleEvidenceDocError = (errorType: string, req: AppRequest, evidenceDocumentType: string): void => {
  req.session.errors = req.session?.errors?.length
    ? [...req.session.errors, { errorType, propertyName: evidenceDocumentType }]
    : [{ errorType, propertyName: evidenceDocumentType }];
};

// export const getExcemptionSummary = (userCase: Partial<CaseWithId>, language: string): Reason[] => {
//   const exemptionSummary: Reason[] = [];
//   const translations = language === 'en' ? en : cy;

//   exemptionSummary.push(
//     {
//       title: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.DOMESTIC)
//         ? translations.nonAttendanceReasons.domesticViolence
//         : undefined,
//       reasons: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.DOMESTIC)
//         ? userCase?.miam_domesticAbuse
//             ?.map(abuseEvidenceType => {
//               return {
//                 reason: _.get(commonLanguages[language], abuseEvidenceType),
//                 examption: _.get(userCase, `miam_domesticAbuse_${abuseEvidenceType}_subfields`, [])
//                   .map(abuseReason => _.get(commonLanguages[language][`${abuseEvidenceType}_subFields`], abuseReason))
//                   .filter(value => !_.isEmpty(value)),
//               };
//             })
//             .filter(value => !_.isEmpty(value))
//         : [],
//     },
//     {
//       title: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.CHILD_PROTECTION)
//         ? translations.nonAttendanceReasons.childProtection
//         : undefined,
//       reasons: [{ reason: _.get(translations.childProtection, `${userCase?.miam_childProtectionEvidence}`) }],
//     },
//     {
//       title: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.URGENT)
//         ? translations.nonAttendanceReasons.urgentHearing
//         : undefined,
//       reasons: [{ reason: _.get(translations.urgentHearing, `${userCase?.miam_urgency}`) }],
//     },
//     {
//       title: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.PREV_MIAM)
//         ? translations.nonAttendanceReasons.previousMIAMOrExempt
//         : undefined,
//       reasons: [{ reason: _.get(translations.previousMIAMOrExempt, `${userCase?.miam_previousAttendance}`) }],
//     },
//     {
//       title: userCase?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.EXEMPT)
//         ? translations.nonAttendanceReasons.validExemption
//         : undefined,
//       reasons: [
//         {
//           reason: _.get(translations.validExemption, `${userCase?.miam_notAttendingReasons}`),
//           examption: [
//             userCase?.miam_notAttendingReasons === Miam_notAttendingReasons.canNotAccessMediator
//               ? translations.mediatorUnavailable[`${userCase?.miam_noMediatorReasons}`]
//               : undefined,
//           ],
//         },
//       ],
//     }
//   );

//   return exemptionSummary;
// };
