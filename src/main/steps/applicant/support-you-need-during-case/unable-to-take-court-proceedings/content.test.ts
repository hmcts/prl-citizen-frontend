import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'Is there a reason you are unable to take part in the court proceedings?',
  courtcommunication: 'For example, do you have a disability that would prevent you from attending court in person?',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  provideDetails: 'Provide details',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  errors: {
    unableForCourtProceedings: {
      required: 'Please select an answer',
    },
    courtProceedingProvideDetails: {
      required: 'Please provide the details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
  courtcommunication:
    'Meddyliwch am yr hyn y byddwch ei angen os bydd eich gwrandawiad yn un wyneb yn wyneb, trwy fideo neu dros y ffôn.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  provideDetails: 'Rhowch fanylion',
  one: 'Yes',
  two: 'No',
  continue: 'Parhau',
  errors: {
    unableForCourtProceedings: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
    },
    courtProceedingProvideDetails: {
      required: 'Rhowch fanylion',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Is there a reason you are unable to take part in the court proceedings?');
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtcommunication).toEqual(
      'For example, do you have a disability that would prevent you from attending court in person?'
    ),
      expect(generatedContent.summaryText).toEqual('Contacts for help');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain  field', () => {
    const unableforcourtproceedingsField = fields.unableForCourtProceedings as FormOptions;
    expect(unableforcourtproceedingsField.type).toBe('radios');
    expect(unableforcourtproceedingsField.classes).toBe('govuk-radios');
    expect((unableforcourtproceedingsField.section as Function)(generatedContent)).toBe(en.section);
    expect((unableforcourtproceedingsField.values[0].label as Function)(generatedContent)).toBe(en.one);
    expect(unableforcourtproceedingsField.values[0].value).toBe('Yes');

    expect(unableforcourtproceedingsField.values[0].subFields?.courtProceedingProvideDetails.type).toBe('textarea');
    expect(unableforcourtproceedingsField.values[0].subFields?.courtProceedingProvideDetails.type).toBe('textarea');
    expect(
      (unableforcourtproceedingsField.values[0].subFields?.courtProceedingProvideDetails.label as Function)(
        generatedContent
      )
    ).toBe(en.provideDetails);
    (unableforcourtproceedingsField.values[0].subFields?.courtProceedingProvideDetails.validator as Validator)(
      'test value'
    );
    expect(isFieldFilledIn).toHaveBeenCalledWith('test value');

    expect((unableforcourtproceedingsField.values[1].label as Function)(generatedContent)).toBe(en.two);
    expect(unableforcourtproceedingsField.values[1].value).toBe('No');

    expect(unableforcourtproceedingsField.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
