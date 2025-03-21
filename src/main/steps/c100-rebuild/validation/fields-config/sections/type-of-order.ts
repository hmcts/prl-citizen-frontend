export const TypeOfOrderFieldsConfig = {
  section: 'typeOfOrder',
  fields: [
    {
      fieldName: 'too_courtOrder',
      fieldType: 'array',
    },
    {
      fieldName: 'too_stopOtherPeopleDoingSomethingSubField',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'too_courtOrder',
        value: 'stopOtherPeopleDoingSomething',
      },
    },
    {
      fieldName: 'too_resolveSpecificIssueSubField',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'too_courtOrder',
        value: 'resolveSpecificIssue',
      },
    },
    {
      fieldName: 'too_shortStatement',
      fieldType: 'string',
    },
  ],
};
