import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Language requirements',
  title: 'Do you have any language requirements?',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  speakwelsh: 'I need to speak in Welsh',
  readandwritewelsh: 'I need to read and write in Welsh',
  languageinterpreter: 'I need an interpreter in a certain language',
  typeoflanguage: 'Give details of the language you require (including dialect, if applicable)',
  nointerpreter: 'No, I do not have any language requirements at this time',
  continue: 'Continue',
  errors: {
    languageRequirements: {
      required: 'Please select an answer',
    },
    languageDetails: {
      required: 'Please provide language details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Gofynion ieithyddol',
  title: 'A oes gennych chi unrhyw ofynion ieithyddol?',
  courtcommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: 'Dogfennau mewn lliw penodol',
  speakwelsh: 'Rwyf eisiau siarad Cymraeg',
  readandwritewelsh: 'Rwyf eisiau siarad ac ysgrifennu yn Gymraeg',
  languageinterpreter: 'Mae arnaf angen cyfieithydd mewn iaith benodol',
  typeoflanguage: 'Give details of the language you require (including dialect, if applicable)',
  nointerpreter: 'Nac oes, nid oes gennyf unrhyw ofynion o ran iaith ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    languageRequirements: {
      required: 'Please select an answer',
    },
    languageDetails: {
      required: 'Please provide language details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
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
          value: 'speakwelsh',
        },
        {
          name: 'languageRequirements',
          label: l => l.readandwritewelsh,
          value: 'readandwritewelsh',
        },
        {
          name: 'languageRequirements',
          label: l => l.languageinterpreter,
          value: 'languageinterpreter',
          subFields: {
            languageDetails: {
              type: 'textarea',
              label: l => l.typeoflanguage,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'languageRequirements',
          label: l => l.nointerpreter,
          value: 'nointerpreter',
          exclusive: true,
        },
      ],
    },
  },
  onlyContinue: {
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
