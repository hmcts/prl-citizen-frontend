import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import {
  isAccessCodeValid,
  isAlphaNumeric,
  isCaseCodeValid,
  isFieldFilledIn,
  isNumeric,
} from '../../../../app/form/validation';

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
  errors: {
    caseCode: {
      required: 'Enter your case code',
      invalid: 'The case code must be made up of 16 digits',
      notNumeric: 'Case code must be numeric',
      invalidCaseCode: 'Enter your case code',
    },
    accessCode: {
      required: 'Enter your access code',
      invalid: 'The access code must be made up of 8 characters and must be alphanumeric',
      accesscodeAlreadyLinked: 'Provided access code is already linked to the case.',
      invalidAccessCode: 'Enter your access code',
    },
  },
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
  errors: {
    caseCode: {
      required: 'Enter your case code -welsh',
      invalid: 'The case code must be made up of 16 digits -welsh',
      notNumeric: 'Case code must be numeric -welsh',
      invalidCaseCode: 'Enter your case code -welsh',
    },
    accessCode: {
      required: 'Enter your access code -welsh',
      invalid: 'The access code must be made up of 8 characters and must be alphanumeric -welsh',
      accesscodeAlreadyLinked: 'Provided access code is already linked to the case. -welsh',
      invalidAccessCode: 'Enter your access code -welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    caseCode: {
      type: 'text',
      label: l => l.caseNumberLabel,
      hint: l => l.caseNumberHintText,
      labelSize: 's',
      validator: value => isFieldFilledIn(value) || isCaseCodeValid(value) || isNumeric(value),
    },
    accessCode: {
      type: 'text',
      label: l => l.accessCodeLabel,
      hint: l => l.accessCodeHintText,
      labelSize: 's',
      validator: value => isFieldFilledIn(value) || isAccessCodeValid(value) || isAlphaNumeric(value),
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
