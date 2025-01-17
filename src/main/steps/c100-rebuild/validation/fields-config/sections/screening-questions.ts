export const ScreeningQuestionsFieldsConfig = {
  section: 'screeningQuestions',
  fields: [
    {
      fieldName: 'sq_writtenAgreement',
      fieldType: "string",
    },
    {
      fieldName: 'sq_legalRepresentation',
      fieldType: "string",
      mandatory_if: {
        fieldName: 'sq_writtenAgreement',
        value: 'No',
      },
    },
    {
      fieldName: 'sq_legalRepresentationApplication',
      fieldType: "string",
      mandatory_if: {
        fieldName: 'sq_legalRepresentation',
        value: 'Yes',
      },
    },
    {
      fieldName: 'sq_courtPermissionRequired',
      fieldType: "string",
      mandatory_if: {
        fieldName: 'sq_legalRepresentationApplication',
        value: 'No',
      },
    },
    {
      fieldName: 'sq_permissionsRequest',
      fieldType: "string",
      mandatory_if: {
        fieldName: 'sq_courtPermissionRequired',
        value: 'Yes',
      },
    },
  ],
};
