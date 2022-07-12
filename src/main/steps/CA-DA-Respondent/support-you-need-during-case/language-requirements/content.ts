import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

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
  typeoflanguage: 'Give details of the language you require (including dialect, if applicable)',
  nointerpreter: 'No, I do not have any language requirements at this time',
  continue: 'Save and continue',
  errors: {
    respondentLangRequirements: {
      required: 'Please select an answer',
    },
    respondentLangDetails: {
      required: 'Please provide language details',
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
  typeoflanguage: 'Give details of the language you require (including dialect, if applicable)',
  nointerpreter: 'No, I do not have any language requirements at this time',
  continue: 'Save and continue',
  errors: {
    respondentLangRequirements: {
      required: 'Please select an answer',
    },
    respondentLangDetails: {
      required: 'Please provide language details',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    respondentLangRequirements: {
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
          subFields: {
            respondentLangDetails: {
              type: 'textarea',
              label: l => l.typeoflanguage,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: true,
        },
        {
          name: 'languageRequirements',
          label: l => l.nointerpreter,
          value: 'No, I do not have any language requirements at this time',
          exclusive: true,
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
