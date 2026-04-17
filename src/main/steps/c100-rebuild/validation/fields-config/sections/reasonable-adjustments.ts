export const ReasonableAdjustmentsFieldsConfig = {
  section: 'reasonableAdjustments',
  fields: [
    {
      fieldName: 'ra_typeOfHearing',
      fieldType: 'array',
    },
    {
      fieldName: 'ra_noVideoAndPhoneHearing_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_typeOfHearing',
        value: 'noVideoAndPhoneHearing',
      },
    },
    {
      fieldName: 'ra_languageNeeds',
      fieldType: 'array',
    },
    {
      fieldName: 'ra_needInterpreterInCertainLanguage_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_languageNeeds',
        value: 'needInterpreterInCertainLanguage',
      },
    },
    {
      fieldName: 'ra_specialArrangements',
      fieldType: 'array',
    },
    {
      fieldName: 'ra_intermediaryRequirements',
      fieldType: 'string',
    },
    {
      fieldName: 'ra_intermediaryRequired_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_disabilityRequirements',
        value: 'intermediaryRequired',
      },
    },
    {
      fieldName: 'ra_disabilityRequirements',
      fieldType: 'string',
    },
    {
      fieldName: 'ra_assistanceRequired_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_disabilityRequirements',
        value: 'assistanceRequired',
      },
    },
  ],
};
