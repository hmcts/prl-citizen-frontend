import _ from 'lodash';

import {
  CaseWithId,
  Miam_noMediatorReasons,
  Miam_notAttendingReasons,
  Miam_previousAttendance,
} from '../../../../../app/case/case';
import { MiamNonAttendReason, YesOrNo } from '../../../../../app/case/definition';

export const MiamQuestionsFieldsConfig = {
  section: 'miam',
  fields: [
    {
      fieldName: 'miam_otherProceedings',
      fieldType: 'string',
    },
    {
      fieldName: 'miam_consent',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_otherProceedings',
        value: 'No',
      },
    },
    {
      fieldName: 'miam_attendance',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_otherProceedings',
        value: 'No',
      },
    },
    {
      fieldName: 'miam_haveDocSigned',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_attendance',
        value: 'Yes',
      },
    },
    {
      fieldName: 'miam_certificate',
      fieldType: 'object',
      expression: (caseData: CaseWithId): { isMandatory: boolean } => {
        return { isMandatory: !_.isEmpty(caseData?.miam_certificate) };
      },
      mandatory_if: {
        fieldName: 'miam_haveDocSigned',
        value: 'Yes',
      },
    },
    {
      fieldName: 'miam_validReason',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_attendance',
        value: 'No',
      },
    },
    {
      fieldName: 'miam_nonAttendanceReasons',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'miam_validReason',
        value: 'Yes',
      },
    },
    {
      fieldName: 'miam_domesticAbuse',
      fieldType: 'array',
      expression: (caseData: CaseWithId): { isMandatory: boolean } => {
        return {
          isMandatory:
            caseData.miam_domesticAbuse?.every(subField => {
              if (_.isArray(caseData[`miam_domesticAbuse_${subField}_subfields`])) {
                return caseData[`miam_domesticAbuse_${subField}_subfields`].some(
                  subSubField => !_.isEmpty(subSubField)
                );
              }
              return !_.isEmpty(subField);
            }) ?? true,
        };
      },
      mandatory_if: {
        fieldName: 'miam_nonAttendanceReasons',
        expression: (caseData: CaseWithId): { isMandatory: boolean | undefined } => {
          return { isMandatory: caseData?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.DOMESTIC) };
        },
      },
    },
    {
      fieldName: 'miam_canProvideDomesticAbuseEvidence',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_nonAttendanceReasons',
        expression: (caseData: CaseWithId): { isMandatory: boolean | undefined } => {
          return { isMandatory: caseData?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.DOMESTIC) };
        },
      },
    },
    {
      fieldName: 'miam_detailsOfDomesticAbuseEvidence',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_canProvideDomesticAbuseEvidence',
        value: 'No',
      },
    },
    {
      fieldName: 'miam_childProtectionEvidence',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_nonAttendanceReasons',
        expression: (caseData: CaseWithId): { isMandatory: boolean | undefined } => {
          return { isMandatory: caseData?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.CHILD_PROTECTION) };
        },
      },
    },
    {
      fieldName: 'miam_urgency',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_nonAttendanceReasons',
        expression: (caseData: CaseWithId): { isMandatory: boolean | undefined } => {
          return { isMandatory: caseData?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.URGENT) };
        },
      },
    },
    {
      fieldName: 'miam_previousAttendance',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_nonAttendanceReasons',
        expression: (caseData: CaseWithId): { isMandatory: boolean | undefined } => {
          return { isMandatory: caseData?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.PREV_MIAM) };
        },
      },
    },
    {
      fieldName: 'miam_previousAttendanceEvidenceDoc',
      fieldType: 'object',
      expression: (caseData: CaseWithId): { isMandatory: boolean } => {
        return { isMandatory: !_.isEmpty(caseData?.miam_previousAttendanceEvidenceDoc) };
      },
      mandatory_if: {
        or: [
          {
            fieldName: 'miam_previousAttendance',
            fieldType: 'string',
            expression: (caseData: CaseWithId): { isMandatory: boolean | undefined } => {
              return {
                isMandatory: caseData?.miam_previousAttendance?.includes(
                  Miam_previousAttendance.fourMonthsPriorAttended
                ),
              };
            },
          },
          {
            fieldName: 'miam_haveDocSignedByMediatorForPrevAttendance',
            fieldType: 'string',
            expression: (caseData: CaseWithId): { isMandatory: boolean } => {
              return {
                isMandatory: caseData?.miam_haveDocSignedByMediatorForPrevAttendance === YesOrNo.YES,
              };
            },
          },
        ],
      },
    },
    {
      fieldName: 'miam_haveDocSignedByMediatorForPrevAttendance',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_previousAttendance',
        expression: (caseData: CaseWithId): { isMandatory: boolean | undefined } => {
          return {
            isMandatory: caseData?.miam_previousAttendance?.includes(Miam_previousAttendance.miamExamptionApplied),
          };
        },
      },
    },
    {
      fieldName: 'miam_detailsOfEvidence',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_haveDocSignedByMediatorForPrevAttendance',
        value: 'No',
      },
    },
    {
      fieldName: 'miam_notAttendingReasons',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_nonAttendanceReasons',
        expression: (caseData: CaseWithId): { isMandatory: boolean | undefined } => {
          return { isMandatory: caseData?.miam_nonAttendanceReasons?.includes(MiamNonAttendReason.EXEMPT) };
        },
      },
    },
    {
      fieldName: 'miam_noMediatorReasons',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_notAttendingReasons',
        expression: (caseData: CaseWithId): { isMandatory: boolean } => {
          return { isMandatory: caseData?.miam_notAttendingReasons === Miam_notAttendingReasons.canNotAccessMediator };
        },
      },
    },
    {
      fieldName: 'miam_noAppointmentAvailableDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_haveDocSignedByMediatorForPrevAttendance',
        expression: (caseData: CaseWithId): { isMandatory: boolean } => {
          return { isMandatory: caseData?.miam_noMediatorReasons === Miam_noMediatorReasons.noAppointmentAvailable };
        },
      },
    },
    {
      fieldName: 'miam_unableToAttainDueToDisablityDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'miam_haveDocSignedByMediatorForPrevAttendance',
        expression: (caseData: CaseWithId): { isMandatory: boolean } => {
          return { isMandatory: caseData?.miam_noMediatorReasons === Miam_noMediatorReasons.disability };
        },
      },
    },
  ],
};
