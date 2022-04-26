import { FormField } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

import { Component } from './../common/component';
import { defaultButtons } from './../common/default-buttons';
import { renderSubFields } from './../common/renderSubFields';
import { RadiosValues } from './../common/types';

export class Radios extends Component {
  constructor(values: RadiosValues) {
    super(values);

    this.form = {
      fields: { ...generateRadiosField(values) },
      ...defaultButtons,
    };
  }
}

export const generateRadiosField = (values: RadiosValues): Record<string, FormField> => ({
  [values.fieldName]: {
    type: 'radios',
    label: l => l[`${values.label}`],
    hint: l => l[`${values.hint}`],
    values: values.values.map(({ key, value, subFields }) => ({
      label: l => l[key],
      value,
      subFields: subFields ? renderSubFields(subFields) : undefined,
    })),
    validator: isFieldFilledIn,
  },
});
