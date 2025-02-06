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
      fieldName: 'ra_specialArrangementsOther_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_specialArrangements',
        value: 'specialArrangementsOther',
      },
    },
    {
      fieldName: 'ra_disabilityRequirements',
      fieldType: 'array',
    },
    {
      fieldName: 'ra_documentInformation',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'ra_disabilityRequirements',
        value: 'documentsHelp',
      },
    },
    {
      fieldName: 'ra_specifiedColorDocuments_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_documentInformation',
        value: 'specifiedColorDocuments',
      },
    },
    {
      fieldName: 'ra_largePrintDocuments_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_documentInformation',
        value: 'largePrintDocuments',
      },
    },
    {
      fieldName: 'ra_documentHelpOther_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_documentInformation',
        value: 'documentHelpOther',
      },
    },
    {
      fieldName: 'ra_communicationHelp',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'ra_disabilityRequirements',
        value: 'communicationHelp',
      },
    },
    {
      fieldName: 'ra_signLanguageInterpreter_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_communicationHelp',
        value: 'signLanguageInterpreter',
      },
    },
    {
      fieldName: 'ra_communicationHelpOther_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_communicationHelp',
        value: 'communicationHelpOther',
      },
    },
    {
      fieldName: 'ra_supportCourt',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'ra_disabilityRequirements',
        value: 'extraSupport',
      },
    },
    {
      fieldName: 'ra_supportWorkerCarer_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_supportCourt',
        value: 'supportWorkerCarer',
      },
    },
    {
      fieldName: 'ra_friendFamilyMember_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_supportCourt',
        value: 'friendFamilyMember',
      },
    },
    {
      fieldName: 'ra_therapyAnimal_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_supportCourt',
        value: 'therapyAnimal',
      },
    },
    {
      fieldName: 'ra_supportCourtOther_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_supportCourt',
        value: 'supportCourtOther',
      },
    },
    {
      fieldName: 'ra_feelComportable',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'ra_disabilityRequirements',
        value: 'feelComfortableSupport',
      },
    },
    {
      fieldName: 'ra_appropriateLighting_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_feelComportable',
        value: 'appropriateLighting',
      },
    },
    {
      fieldName: 'ra_feelComportableOther_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_feelComportable',
        value: 'feelComportableOther',
      },
    },
    {
      fieldName: 'ra_travellingCourt',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'ra_disabilityRequirements',
        value: 'helpTravellingMovingBuildingSupport',
      },
    },
    {
      fieldName: 'ra_parkingSpace_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_travellingCourt',
        value: 'parkingSpace',
      },
    },
    {
      fieldName: 'ra_differentTypeChair_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_travellingCourt',
        value: 'differentTypeChair',
      },
    },
    {
      fieldName: 'ra_travellingCourtOther_subfield',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ra_travellingCourt',
        value: 'travellingCourtOther',
      },
    },
  ],
};
