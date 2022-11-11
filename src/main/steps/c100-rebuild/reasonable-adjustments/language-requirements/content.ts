/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Language requirements',
  headingTitle: `Do you have any language 
  requirements?`,
  line1: `Think about all communication with the court, as well as what you might 
  need at a hearing. Consider remote and in-person hearings, in case your preferred 
  hearing type is not possible.`,
  select_all_apply: 'Select all that apply to you',
  speakInWelsh: 'I need to speak in Welsh',
  readAndWriteInWelsh: 'I need to read and write in Welsh',
  needInterpreterInCertainLanguage: 'I need an interpreter in a certain language',
  needInterpreterInCertainLanguage_subfield: `Give details of the language you require (including dialect, 
    if applicable)`,
  noLanguageRequirements: 'No, I do not have any language requirements at this time',
  errors: {
    ra_needInterpreterInCertainLanguage_subfield: {
      required: 'Give details of the language you need an interpreter for',
    },
    ra_languageNeeds: {
      required: 'Select whether you have any language requirements',
    },
  },
});

export const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Language requirements - welsh',
  headingTitle: `Do you have any language 
  requirements? - welsh`,
  line1: `Think about all communication with the court, as well as what you might 
  need at a hearing. Consider remote and in-person hearings, in case your preferred 
  hearing type is not possible. - welsh`,
  select_all_apply: 'Select all that apply to you - welsh',
  speakInWelsh: 'I need to speak in Welsh - welsh',
  readAndWriteInWelsh: 'I need to read and write in Welsh - welsh',
  needInterpreterInCertainLanguage: 'I need an interpreter in a certain language - welsh',
  needInterpreterInCertainLanguage_subfield: `Give details of the language you require (including dialect, 
    if applicable) - welsh`,
  noLanguageRequirements: 'No, I do not have any language requirements at this time - welsh',
  errors: {
    ra_needInterpreterInCertainLanguage_subfield: {
      required: 'Give details of the language you need an interpreter for - welsh',
    },
    ra_languageNeeds: {
      required: 'Select whether you have any language requirements - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_languageNeeds: {
      id: 'ra_languageNeeds',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_languageNeeds',
          label: l => l.speakInWelsh,
          value: 'speakInWelsh',
        },
        {
          name: 'ra_languageNeeds',
          label: l => l.readAndWriteInWelsh,
          value: 'readAndWriteInWelsh',
        },
        {
          name: 'ra_languageNeeds',
          label: l => l.needInterpreterInCertainLanguage,
          value: 'needInterpreterInCertainLanguage',
          subFields: {
            ra_needInterpreterInCertainLanguage_subfield: {
              type: 'textarea',
              label: l => l.needInterpreterInCertainLanguage_subfield,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'ra_languageNeeds',
          label: l => l.noLanguageRequirements,
          value: 'none',
          behaviour: 'exclusive',
        },
      ],
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
