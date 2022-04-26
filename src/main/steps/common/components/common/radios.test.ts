/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { YesNoNotsure } from '../../../../app/case/definition';
//import { isFieldFilledIn } from '../../../../app/form/validation';

import { Radios } from './radios';

//jest.mock('../../../app/form/validation');

const fieldName = 'birthFatherNameOnCertificate';

const enContent = {
  section: 'Section',
  label: "Is the birth father's name on the birth certificate?",
  hint: "Ask the Private Law court if you're not sure.",
  yes: 'Yes',
  no: 'No',
  unsure: 'Not sure',
  continue: 'Save and continue',
  saveAsDraft: 'Save as draft',
};

const values = [
  { key: 'yes', value: YesNoNotsure.YES },
  { key: 'no', value: YesNoNotsure.NO },
  { key: 'unsure', value: YesNoNotsure.NOT_SURE },
];

const { form } = new Radios({
  enContent,
  fieldName,
  values,
  label: 'label',
  hint: 'hint',
});

describe('radios class', () => {
  it('should render the radios field with the correct data', () => {
    const field = form.fields[fieldName];
    const { type, label, hint } = field;
    const fieldInputValue = 'test';
    const [yes, no, unsure] = field.values;

    expect(type).toBe('radios');
    expect((label as Function)(enContent)).toBe(enContent.label);
    expect((hint as Function)(enContent)).toBe(enContent.hint);
    expect((yes.label as Function)(enContent)).toBe('Yes');
    expect(yes.value).toBe('Yes');
    expect((no.label as Function)(enContent)).toBe('No');
    expect(no.value).toBe('No');
    expect((unsure.label as Function)(enContent)).toBe('Not sure');
    expect(unsure.value).toBe('NotSure');

    (field.validator as Function)(fieldInputValue);
    //expect(isFieldFilledIn).toHaveBeenCalledWith(fieldInputValue);
  });

  it('should contain submit button', () => {
    expect((form.submit.text as Function)(enContent)).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(enContent)).toBe('Save as draft');
  });
});
