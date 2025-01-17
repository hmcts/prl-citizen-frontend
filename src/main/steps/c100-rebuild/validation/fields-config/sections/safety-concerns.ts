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
        fieldValue: 'Yes',
      },
    },
    {
      fieldName: 'c1A_concernAboutChild',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'c1A_haveSafetyConcerns',
        fieldValue: 'Yes',
      },
    },
    {
      fieldName: 'c1A_concernAboutApplicant',
      fieldType: 'array',
      mandatory_if: {
        or: [
          {
            fieldName: 'c1A_safetyConernAbout',
            fieldValue: 'applicant',
          },
          {
            fieldName: 'c1A_concernAboutChild',
            fieldValue: 'witnessingDomesticAbuse',
          },
        ],
      },
    },
    {
      fieldName: 'c1A_safteyConcerns',
      fieldType: 'object',
      expression: caseData => {
        const childSafetyConcerns = caseData?.c1A_concernAboutChild || [];
        let isMandatory = false;

        if (childSafetyConcerns.length >= 1 && childSafetyConcerns[0] !== 'abduction') {
          isMandatory = childSafetyConcerns
            .filter(concern => concern !== 'abduction')
            .some(concern => {
              const safetyConern = caseData?.c1A_safteyConcerns?.child?.[concern];

              return !safetyConern || !safetyConern?.childrenConcernedAbout?.length;
            });
        }

        return {
          isMandatory,
        };
      },
    },
    {
      fieldName: 'c1A_abductionReasonOutsideUk',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_concernAboutChild',
        fieldValue: 'abduction',
      },
    },
    {
      fieldName: 'c1A_childsCurrentLocation',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_concernAboutChild',
        fieldValue: 'abduction',
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
        fieldValue: 'Yes',
      },
    },
    {
      fieldName: 'c1A_possessionChildrenPassport',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'c1A_passportOffice',
        fieldValue: 'Yes',
      },
    },
    {
      fieldName: 'c1A_provideOtherDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_possessionChildrenPassport',
        fieldValue: 'Other',
      },
    },
    {
      fieldName: 'c1A_abductionPassportOfficeNotified',
      fieldType: 'string',
      mandatory_if: {
        or: [
          {
            fieldName: 'c1A_childrenMoreThanOnePassport',
            fieldValue: 'Other',
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
        fieldValue: 'Yes',
      },
    },
    {
      fieldName: 'c1A_policeOrInvestigatorInvolved',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_childAbductedBefore',
        fieldValue: 'Yes',
      },
    },
    {
      fieldName: 'c1A_policeOrInvestigatorOtherDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'c1A_policeOrInvestigatorInvolved',
        fieldValue: 'Yes',
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
        fieldValue: 'Yes',
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
        fieldValue: 'Yes',
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
