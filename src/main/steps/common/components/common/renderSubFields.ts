import { FormField } from '../../../../app/form/Form';
import { generateInputField } from '../input';

import { ComponentValues, InputValues } from './types';

export const renderSubFields = (values: ComponentValues[]): Record<string, FormField> => {
  let subFields = {};

  values.forEach(value => {
    subFields = { ...subFields, ...renderComponent(value) };
  });

  return subFields;
};

const renderComponent = (component: ComponentValues): Record<string, FormField> => {
  switch (component.type) {
    case 'input':
      return generateInputField(component as InputValues);
    default:
      return {};
  }
};
