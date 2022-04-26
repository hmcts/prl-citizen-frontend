import { FormField } from '../../../app/form/Form';

import { Component } from './common/component';
import { defaultButtons } from './common/default-buttons';
import { InputValues } from './common/types';

export class Input extends Component {
  constructor(values: InputValues) {
    super(values);

    this.form = {
      fields: { ...generateInputField(values) },
      ...defaultButtons,
    };
  }
}

export const generateInputField = (values: InputValues): Record<string, FormField> => ({
  [values.fieldName]: {
    type: 'input',
    label: l => l[`${values.label}`],
    hint: l => l[`${values.hint}`],
    labelSize: values.labelSize,
    validator: values.validator,
  },
});
