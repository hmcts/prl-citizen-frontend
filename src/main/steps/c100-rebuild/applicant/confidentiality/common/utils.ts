/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../../app/case/definition';

export type FieldLabel = {
  name: string;
  label: string;
  value: string;
  attributes: {
    checked: boolean;
  };
};

type FieldLabelArray = FieldLabel[];

export const generateDetailsKnownYesField = (fieldSet, contactDetailsList, isAlternative) => {
  let subFieldValueStorage: FieldLabelArray = [];
  const { value } = fieldSet;

  if (value === YesOrNo.YES) {
    fieldSet['attributes'] = { checked: true };
    const subFields = isAlternative
      ? (fieldSet['subFields']?.['contactDetailsPrivateAlternative']['values'] as [])
      : (fieldSet['subFields']?.['contactDetailsPrivate']['values'] as []);
    for (const subValue of subFields) {
      for (const bodyVal of contactDetailsList) {
        const field: FieldLabel = subValue;
        if (subValue['value'] === bodyVal) {
          field['attributes'] = { checked: true };
        }
        subFieldValueStorage = [...subFieldValueStorage.filter(item => item.value !== field['value']), field];
      }
    }
  }

  return fieldSet;
};
