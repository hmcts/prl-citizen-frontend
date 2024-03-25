/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import { C100_URL } from '../../../../steps/urls';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Language requirements',
  headingTitle: 'Do you have any language requirements?',
  line1: `Think about all communication with the court, as well as what you might
  need at a hearing. Consider remote and in-person hearings, in case your preferred
  hearing type is not possible.`,
  select_all_apply: 'Select all that apply to you',
  speakInWelsh: 'I need to speak in Welsh',
  readAndWriteInWelsh: 'I need to read and write in Welsh',
  needInterpreterInCertainLanguage: 'I need an interpreter in a certain language',
  needInterpreterInCertainLanguage_subfield:
    'Give details of the language you require (including dialect, if applicable)',
  noLanguageRequirements: 'No, I do not have any language requirements at this time',
  errors: {
    ra_needInterpreterInCertainLanguage_subfield: {
      required: 'Give details of the language you need an interpreter for',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_languageNeeds: {
      required: 'Select whether you have any language requirements',
    },
  },
});

export const cy = () => ({
  caption: 'Gofynion ieithyddol',
  headingTitle: 'A oes gennych chi unrhyw ofynion ieithyddol?',
  line1:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  speakInWelsh: "Rwy'n dymuno siarad Cymraeg",
  readAndWriteInWelsh: "Rwy'n dymuno darllen ac ysgrifennu yn Gymraeg",
  needInterpreterInCertainLanguage: "Rwy'n dymuno cael cyfieithydd mewn iaith benodol",
  needInterpreterInCertainLanguage_subfield:
    'Rhowch fanylion yr iaith sydd ei hangen arnoch (gan gynnwys tafodiaith, os yn berthnasol)',
  noLanguageRequirements: 'Nac oes, nid oes gennyf unrhyw ofynion ieithyddol ar hyn o bryd',
  errors: {
    ra_needInterpreterInCertainLanguage_subfield: {
      required: 'Rhowch fanylion yr iaith mae angen cyfieithydd arnoch ar ei chyfer',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_languageNeeds: {
      required: 'Nodwch a oes gennych chi unrhyw ofynion ieithyddol',
    },
  },
});

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    const isC100Journey = req.originalUrl.startsWith(C100_URL);

    return {
      ra_languageNeeds: {
        id: 'ra_languageNeeds',
        type: 'checkboxes',
        hint: l => l.select_all_apply,
        validator: value => atLeastOneFieldIsChecked(value),
        values: [
          {
            name: 'ra_languageNeeds',
            label: l => l.speakInWelsh,
            value: isC100Journey ? 'speakInWelsh' : 'speakwelsh',
          },
          {
            name: 'ra_languageNeeds',
            label: l => l.readAndWriteInWelsh,
            value: isC100Journey ? 'readAndWriteInWelsh' : 'readandwritewelsh',
          },
          {
            name: 'ra_languageNeeds',
            label: l => l.needInterpreterInCertainLanguage,
            value: isC100Journey ? 'needInterpreterInCertainLanguage' : 'languageinterpreter',
            subFields: {
              ra_needInterpreterInCertainLanguage_subfield: {
                type: 'textarea',
                label: l => l.needInterpreterInCertainLanguage_subfield,
                labelSize: null,
                attributes: {
                  rows: 3
                },
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
            value: isC100Journey ? 'noLanguageRequirements' : 'nointerpreter',
            exclusive: true,
          },
        ],
      },
    };
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return RAProvider.utils.generateContentForLocalComponent(content, languages, form);
};
