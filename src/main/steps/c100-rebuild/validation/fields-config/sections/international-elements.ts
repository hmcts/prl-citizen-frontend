export const InternationalElementsFieldsConfig = {
  section: 'internationalElements',
  fields: [
    {
      fieldName: 'ie_internationalStart',
      fieldType: 'string',
    },
    {
      fieldName: 'ie_provideDetailsStart',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ie_internationalStart',
        value: 'Yes',
      },
    },
    {
      fieldName: 'ie_internationalParents',
      fieldType: 'string',
    },
    {
      fieldName: 'ie_provideDetailsParents',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ie_internationalParents',
        value: 'Yes',
      },
    },
    {
      fieldName: 'ie_internationalJurisdiction',
      fieldType: 'string',
    },
    {
      fieldName: 'ie_provideDetailsJurisdiction',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ie_internationalJurisdiction',
        value: 'Yes',
      },
    },
    {
      fieldName: 'ie_internationalRequest',
      fieldType: 'string',
    },
    {
      fieldName: 'ie_provideDetailsRequest',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'ie_internationalRequest',
        value: 'Yes',
      },
    },
  ],
};
