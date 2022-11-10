import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
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
  needInterpreterInCertainLanguageDetailsLabel: `Give details of the language you require (including dialect, 
    if applicable)`,
  noLanguageRequirements: 'No, I do not have any language requirements at this time',
  errors: {
    ra_needInterpreterInCertainLanguageDetails: {
      required: 'Give details of the language you need an interpreter for',
    },
    ra_languageNeeds: {
      required: 'Select whether you have any language requirements',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Gofynion ieithyddol',
  headingTitle: 'A oes gennych chi unrhyw ofynion ieithyddol?',
  line1:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  speakInWelsh: "Rwy'n dymuno siarad Cymraeg",
  readAndWriteInWelsh: "Rwy'n dymuno darllen ac ysgrifennu yn Gymraeg",
  needInterpreterInCertainLanguage: "Rwy'n dymuno cael cyfieithydd mewn iaith benodol",
  needInterpreterInCertainLanguageDetailsLabel: `Give details of the language you require (including dialect, 
    if applicable) - welsh`,
  noLanguageRequirements: 'Nac oes, nid oes gennyf unrhyw ofynion ieithyddol ar hyn o bryd',
  errors: {
    ra_needInterpreterInCertainLanguageDetails: {
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
            ra_needInterpreterInCertainLanguageDetails: {
              type: 'textarea',
              label: l => l.needInterpreterInCertainLanguageDetailsLabel,
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
