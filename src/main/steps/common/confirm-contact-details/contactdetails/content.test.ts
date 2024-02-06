import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Your contact details',
  citizenUserPhoneNumber: 'UK telephone number',
  citizenUserEmailAddress: 'Email address',
  citizenUserSafeToCall: 'When it is safe to call you (optional)',
  safeToCallHint: 'Give a time between 9am and 5pm when it is safe to call you',
  continue: 'Continue',
  errors: {
    citizenUserPhoneNumber: {
      required: 'Enter a valid UK telephone number',
      invalid: 'Enter a valid UK telephone number',
    },
    citizenUserEmailAddress: {
      required: 'Enter a valid email address',
      invalid: 'Enter a valid email address, like name@example.com',
    },
    citizenUserSafeToCall: {
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
  },
};

const cy: typeof en = {
  title: 'Eich manylion cyswllt',
  citizenUserPhoneNumber: 'Rhif ffôn yn y DU',
  citizenUserEmailAddress: 'Cyfeiriad e-bost',
  citizenUserSafeToCall: 'Pa bryd y mae’n ddiogel eich ffonio (dewisol)',
  safeToCallHint: "Rhowch amser rhwng 9am a 5pm pan fydd yn ddiogel i'ch ffonio",
  continue: 'Parhau',
  errors: {
    citizenUserPhoneNumber: {
      required: 'Rhowch rif ffôn y DU',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
    citizenUserEmailAddress: {
      required: 'Rhowch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
    },
    citizenUserSafeToCall: {
      invalid: 'Rydych wedi defnyddio nod annilys. Defnyddiwch lythrennau a rhifau yn unig.',
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
    const citizenUserPhoneNumberField = fields.citizenUserPhoneNumber as FormOptions;
    expect(citizenUserPhoneNumberField.type).toBe('text');
    expect(citizenUserPhoneNumberField.classes).toBe('govuk-input--width-20');
    expect((citizenUserPhoneNumberField.label as Function)(generatedContent)).toBe(en.citizenUserPhoneNumber);
    (citizenUserPhoneNumberField.validator as Validator)('test value');

    const citizenUserEmailAddressField = fields.citizenUserEmailAddress as FormOptions;
    expect(citizenUserEmailAddressField.type).toBe('text');
    expect(citizenUserEmailAddressField.classes).toBe('govuk-input--width-20');
    expect((citizenUserEmailAddressField.label as Function)(generatedContent)).toBe(en.citizenUserEmailAddress);
    (citizenUserEmailAddressField.validator as Validator)('test value');

    const citizenUserSafeToCallField = fields.citizenUserSafeToCall as FormOptions;
    expect(citizenUserSafeToCallField.type).toBe('text');
    expect(citizenUserSafeToCallField.classes).toBe('govuk-input--width-20');
    expect((citizenUserSafeToCallField.label as Function)(generatedContent)).toBe(en.citizenUserSafeToCall);
    expect((citizenUserSafeToCallField.hint as Function)(generatedContent)).toBe(en.safeToCallHint);
    (citizenUserSafeToCallField.validator as Validator)('test value');
  });
  test('should contain continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');
  });
});
