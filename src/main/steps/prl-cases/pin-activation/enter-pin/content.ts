import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isAccessCodeValid, isAlphaNumeric, isCaseCodeValid, isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Access your case',
  paragraph:
    'Access and manage your case using your case number and access code. These will be in the letter, email or pack sent by the court.',
  caseNumberLabel: 'Enter your case number',
  caseNumberHintText: 'This is a 16-digit number',
  accessCodeLabel: 'Enter your access code',
  accessCodeHintText: 'This has 8 characters',
  saveAndContinue: 'Save and continue',
});

const cy = () => ({
  title: 'Access your case - welsh',
  paragraph:
    'Access and manage your case using your case number and access code. These will be in the letter, email or pack sent by the court. -welsh',
  caseNumberLabel: 'Enter your case number -welsh ',
  caseNumberHintText: 'This is a 16-digit number -welsh',
  accessCodeLabel: 'Enter your access code -welsh',
  accessCodeHintText: 'This has 8 characters -welsh',
  saveAndContinue: 'Save and continue -welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    caseNumber: {
      type: 'text',
      // classes: 'govuk-input--width-20',
      label: l => l.caseCcaseNumberLabelodeLabel,
      hint: l => l.caseNumberHintText,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isCaseCodeValid(value) || isAlphaNumeric(value),
    },
    accessCode: {
      type: 'text',
      // classes: 'govuk-input--width-20',
      label: l => l.accessCodeLabel,
      hint: l => l.accessCodeHintText,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isAccessCodeValid(value),
    },
  },
  accessCodeCheck: {
    text: l => l.saveAndContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
