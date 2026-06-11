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
        fieldName: 'ra_intermediaryRequirements',
        value: 'intermediaryRequired',
      },
    },
    {
      fieldName: 'ra_assistanceRequirements',
      fieldType: 'string',
    },
    {
      fieldName: 'ra_assistanceRequirements_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_assistanceRequirements',
        value: 'assistanceRequired',
      },
    },
  ],
};
