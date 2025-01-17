export const HelpWithFeesFieldsConfig = {
  section: 'helpWithFees',
  fields: [
    {
      fieldName: 'hwf_needHelpWithFees',
      fieldType: 'string',
    },
    {
      fieldName: 'hwf_feesAppliedDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'hwf_needHelpWithFees',
        value: 'Yes',
      },
    },
    {
      fieldName: 'helpWithFeesReferenceNumber',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'hwf_needHelpWithFees',
        value: 'Yes',
      },
    }
  ],
};
