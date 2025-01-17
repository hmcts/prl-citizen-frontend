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
        fieldValue: 'noVideoAndPhoneHearing',
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
        fieldValue: 'needInterpreterInCertainLanguage',
      },
    },
    {
      fieldName: 'ra_specialArrangements',
      fieldType: 'array',
    },
    {
      fieldName: 'ra_specialArrangementsOther_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_specialArrangements',
        fieldValue: 'specialArrangementsOther',
      },
    },
    {
      fieldName: 'ra_disabilityRequirements',
      fieldType: 'array',
    },
  ],
};
