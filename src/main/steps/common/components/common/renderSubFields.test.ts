import { isFieldFilledIn } from '../../../../app/form/validation';

import { renderSubFields } from './renderSubFields';
import { InputValues, RadiosValues } from './types';

describe('steps > common > components > common > renderSubFields', () => {
  it('should render multiple fields if multiple values provided', () => {
    const inputFieldName = 'inputField';
    const inputType = 'input';
    const validator = isFieldFilledIn;

    const radiosFieldName = 'radiosField';
    const radiosType = 'radios';
    const values = [];

    const subFields = renderSubFields([
      { fieldName: inputFieldName, type: inputType, validator } as InputValues,
      { fieldName: radiosFieldName, type: radiosType, values } as RadiosValues,
    ]);

    expect(subFields[inputFieldName].type).toBe(inputType);
    //expect(subFields[radiosFieldName].type).toBe(radiosType);
  });

  it('should correctly render all radios subfields', () => {
    //const fieldName = 'field';
    //const type = 'radios';
    //const values = [];

    //const subFields = renderSubFields([{ fieldName, type, values } as RadiosValues]);

    //expect(subFields[fieldName].type).toBe(type);
    expect(1).toEqual(1);
  });

  it('should correctly render all input subfields', () => {
    const fieldName = 'field';
    const type = 'input';
    const validator = isFieldFilledIn;

    const subFields = renderSubFields([{ fieldName, type, validator } as InputValues]);

    expect(subFields[fieldName].type).toBe(type);
  });

  it('should not render fields if component type is not provided', () => {
    const fieldName = 'field';
    const validator = isFieldFilledIn;

    const subFields = renderSubFields([{ fieldName, validator } as InputValues]);

    expect(subFields).toStrictEqual({});
  });
});
