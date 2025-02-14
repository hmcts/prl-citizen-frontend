import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { C1AAbuseTypes } from '../../../../../app/case/definition';

export const SafetyConcernsFieldsConfig = {
  section: 'safetyConcerns',
  fields: [
    {
      fieldName: 'c1A_haveSafetyConcerns',
      fieldType: 'string',
    },
    {
      fieldName: 'c1A_safetyConernAbout',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'c1A_haveSafetyConcerns',
        value: 'Yes',
      },
    },
    {
      fieldName: 'c1A_concernAboutChild',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'c1A_haveSafetyConcerns',
        value: 'Yes',
      },
    },
    {
      fieldName: 'c1A_concernAboutApplicant',
      fieldType: 'array',
      mandatory_if: {
        or: [
          {
            fieldName: 'c1A_safetyConernAbout',
            value: 'applicant',
          },
          {
            fieldName: 'c1A_concernAboutChild',
            value: 'witnessingDomesticAbuse',
          },
        ],
      },
    },
    {
      fieldName: 'c1A_safteyConcerns',
      fieldType: 'object',
      expression: (caseData: CaseWithId): { isMandatory: boolean } => {
        const childSafetyConcerns = caseData?.c1A_concernAboutChild || [];
        let isMandatory = false;

        if (childSafetyConcerns.length >= 1 && childSafetyConcerns[0] !== 'abduction') {
          isMandatory = childSafetyConcerns
            .filter(concern => concern !== 'abduction')
            .some(concern => {
              const safetyConern = caseData?.c1A_safteyConcerns?.child?.[concern];

              return !_.isEmpty(safetyConern) && !_.isEmpty(safetyConern.childrenConcernedAbout);
            });
        }

        return {
          isMandatory,
        };
      },
      mandatory_if: {
        fieldName: 'c1A_concernAboutChild',
        fieldType: 'array',
        expression: (caseData: CaseWithId): { isMandatory: boolean } => {
          return {
            isMandatory:
              (caseData?.c1A_concernAboutChild?.filter(
                concern =>
                  concern !== C1AAbuseTypes.ABDUCTION &&
                  concern !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
                  concern !== C1AAbuseTypes.SOMETHING_ELSE
              ).length ?? 0) > 0,
          };
        },
      },
    },
    {
      fieldName: 'c1A_abductionReasonOutsideUk',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_concernAboutChild',
        value: 'abduction',
      },
    },
    {
      fieldName: 'c1A_childsCurrentLocation',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_concernAboutChild',
        value: 'abduction',
      },
    },
    {
      fieldName: 'c1A_passportOffice',
      fieldType: 'string',
      mandatory_if: {
        or: [
          {
            fieldName: 'c1A_abductionReasonOutsideUk',
          },
          {
            fieldName: 'c1A_childsCurrentLocation',
          },
        ],
      },
    },
    {
      fieldName: 'c1A_childrenMoreThanOnePassport',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_passportOffice',
        value: 'Yes',
      },
    },
    {
      fieldName: 'c1A_possessionChildrenPassport',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'c1A_passportOffice',
        value: 'Yes',
      },
    },
    {
      fieldName: 'c1A_provideOtherDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_possessionChildrenPassport',
        value: 'Other',
      },
    },
    {
      fieldName: 'c1A_abductionPassportOfficeNotified',
      fieldType: 'string',
      mandatory_if: {
        or: [
          {
            fieldName: 'c1A_childrenMoreThanOnePassport',
            value: 'Other',
          },
          {
            fieldName: 'c1A_possessionChildrenPassport',
          },
        ],
      },
    },
    {
      fieldName: 'c1A_childAbductedBefore',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_abductionPassportOfficeNotified',
      },
    },
    {
      fieldName: 'c1A_previousAbductionsShortDesc',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_childAbductedBefore',
        value: 'Yes',
      },
    },
    {
      fieldName: 'c1A_policeOrInvestigatorInvolved',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_childAbductedBefore',
        value: 'Yes',
      },
    },
    {
      fieldName: 'c1A_policeOrInvestigatorOtherDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_policeOrInvestigatorInvolved',
        value: 'Yes',
      },
    },
    {
      fieldName: 'c1A_otherConcernsDrugs',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_safetyConernAbout',
      },
    },
    {
      fieldName: 'c1A_otherConcernsDrugsDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_otherConcernsDrugs',
        value: 'Yes',
      },
    },
    {
      fieldName: 'c1A_childSafetyConcerns',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_safetyConernAbout',
      },
    },
    {
      fieldName: 'c1A_childSafetyConcernsDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_childSafetyConcerns',
        value: 'Yes',
      },
    },
    {
      fieldName: 'c1A_keepingSafeStatement',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_safetyConernAbout',
      },
    },
    {
      fieldName: 'c1A_supervisionAgreementDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_safetyConernAbout',
      },
    },
    {
      fieldName: 'c1A_agreementOtherWaysDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_safetyConernAbout',
      },
    },
  ],
};
