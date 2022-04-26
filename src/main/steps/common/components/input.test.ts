/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { isFieldFilledIn } from '../../../app/form/validation';

import { Input } from './input';

jest.mock('../../../app/form/validation');

const fieldName = 'birthFatherOccupation';

const enContent = {
  section: 'Section',
  label: "What is the occupation of the child's birth father?",
  hint: "Ask the adoption agency or social worker if you’re not sure. If the occupation is not known, you can type 'unknown'.",
  errors: {
    [fieldName]: {
      required: 'Enter an occupation',
    },
  },
  continue: 'Save and continue',
  saveAsDraft: 'Save as draft',
};

const { form } = new Input({
  fieldName,
  enContent,
  validator: isFieldFilledIn,
  label: 'label',
  labelSize: 'l',
  hint: 'hint',
});

describe('input class', () => {
  it('should render the input field with the correct data', () => {
    const field = form.fields[fieldName];
    const fieldInputValue = 'test';
    const { label, hint } = enContent;

    expect(field.type).toBe('input');
    expect((field.label as Function)(enContent)).toBe(label);
    expect((field.hint as Function)(enContent)).toBe(hint);
    expect(field.labelSize).toBe('l');

    (field.validator as Function)(fieldInputValue);
    expect(isFieldFilledIn).toHaveBeenCalledWith(fieldInputValue);
  });

  it('should contain submit button', () => {
    expect((form.submit.text as Function)(enContent)).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(enContent)).toBe('Save as draft');
  });
});
