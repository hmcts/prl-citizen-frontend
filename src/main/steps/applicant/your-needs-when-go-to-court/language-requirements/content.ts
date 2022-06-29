import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'Language requirements',
  title: 'Do you have any language requirements?',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  speakwelsh: 'I need to speak in Welsh',
  readandwritewelsh: 'I need to read and write in Welsh',
  languageinterpreter: 'I need an interpreter in a certain language',
  nointerpreter: 'No, I do not have any language requirements at this time',
  continue: 'Save and continue',
  errors: {
    languageRequirements: {
      required: 'Please select an answer',
    },
  },
};

const cy: typeof en = {
  section: 'Language requirements',
  title: 'Do you have any language requirements?',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  speakwelsh: 'I need to speak in Welsh',
  readandwritewelsh: 'I need to read and write in Welsh',
  languageinterpreter: 'I need an interpreter in a certain language',
  nointerpreter: 'No, I do not have any language requirements at this time',
  continue: 'Save and continue',
  errors: {
    languageRequirements: {
      required: 'Please select an answer',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    languageRequirements: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'languageRequirements',
          label: l => l.speakwelsh,
          value: 'I need to speak in Welsh',
        },
        {
          name: 'languageRequirements',
          label: l => l.readandwritewelsh,
          value: 'I need to read and write in Welsh',
        },
        {
          name: 'languageRequirements',
          label: l => l.languageinterpreter,
          value: 'I need an interpreter in a certain language',
        },
        {
          divider: 'or',
        },
        {
          name: 'languageRequirements',
          label: l => l.nointerpreter,
          value: 'No, I do not have any language requirements at this time',
          behaviour: 'exclusive',
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
