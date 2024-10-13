import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Have you lived at this address for less than 5 years?',
  one: 'Yes',
  two: 'No',
  explainYesLabel:
    'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
  continue: 'Continue',
  errors: {
    isAtAddressLessThan5Years: {
      required: 'Enter your details known',
    },
    citizenUserAddressHistory: {
      required:
        'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  title: 'A ydych wedi byw yn y cyfeiriad hwn am lai na 5 mlynedd?',
  one: 'Ydw',
  two: 'Nac ydw',
  explainYesLabel:
    'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf, gan gychwyn gyda’r diweddaraf',
  continue: 'Parhau',
  errors: {
    isAtAddressLessThan5Years: {
      required: 'Rhowch eich manylion hysbys',
    },
    citizenUserAddressHistory: {
      required:
        'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf, gan gychwyn gyda’r diweddaraf',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('address history > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain  field', () => {
    const isAtAddressLessThan5YearsField = fields.isAtAddressLessThan5Years as FormOptions;
    expect(isAtAddressLessThan5YearsField.type).toBe('radios');
    expect(isAtAddressLessThan5YearsField.classes).toBe('govuk-radios');
    expect((isAtAddressLessThan5YearsField.label as Function)(generatedContent)).toBe(undefined);
    expect((isAtAddressLessThan5YearsField.section as Function)(generatedContent)).toBe(undefined);
    expect((isAtAddressLessThan5YearsField.values[0].label as Function)(generatedContent)).toBe(en.one);
    expect(isAtAddressLessThan5YearsField.values[0].value).toBe(YesOrNo.YES);
    expect((isAtAddressLessThan5YearsField.values[1].label as Function)(generatedContent)).toBe(en.two);
    expect(isAtAddressLessThan5YearsField.values[1].value).toBe(YesOrNo.NO);
    expect(isAtAddressLessThan5YearsField.values[0].subFields?.citizenUserAddressHistory.type).toBe('textarea');
    expect(
      (isAtAddressLessThan5YearsField.values[0].subFields?.citizenUserAddressHistory.label as Function)(
        generatedContent
      )
    ).toBe(en.explainYesLabel);
    expect(isAtAddressLessThan5YearsField.values[0].subFields?.citizenUserAddressHistory.id).toBe(
      'provideDetailsOfPreviousAddresses'
    );
    (isAtAddressLessThan5YearsField.values[0].subFields?.citizenUserAddressHistory.validator as Validator)(
      'test value'
    );
    expect(isAtAddressLessThan5YearsField.validator).toBe(isFieldFilledIn);
  });
  test('should contain continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');
  });
});
