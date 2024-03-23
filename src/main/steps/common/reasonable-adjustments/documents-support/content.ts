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
  caption: 'Reasonable adjustments',
  headingTitle: 'I need documents in an alternative format',
  line1:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  specifiedColorDocuments: 'Documents in a specified colour',
  easyReadFormatDocuments: 'Documents in Easy Read format',
  easyReadFormatDocumentsHint: 'information written in simple language with pictures',
  brailleDocuments: 'Braille documents',
  largePrintDocuments: 'Documents in large print',
  audioTranslationDocuments: 'Audio translation of documents',
  readOutDocuments: 'Documents read out to me',
  emailInformation: 'Information emailed to me',
  documentHelpOther: 'Other',
  noSupportRequired: 'No, I do not need any support at this time',
  describeWhatNeeded: 'Describe what you need',
  errors: {
    ra_documentInformation: {
      required: 'Select which format you need your documents in',
    },
    ra_specifiedColorDocuments_subfield: {
      required: 'Describe which colour you need your documents in',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_largePrintDocuments_subfield: {
      required: 'Describe which large print you need your documents in',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_documentHelpOther_subfield: {
      required: 'Describe which alternative format you need your documents in',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});

export const cy = () => ({
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf angen dogfennau mewn fformat arall',
  line1:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiad wyneb yn wyneb, dros y ffôn neu drwy fideo, rhag ofn nad yw’r math o wrandawiad a ffefrir gennych yn bosibl',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  specifiedColorDocuments: 'Dogfennau mewn lliw penodol',
  easyReadFormatDocuments: 'Dogfennau mewn fformat hawdd i’w darllen',
  easyReadFormatDocumentsHint: "Gwybodaeth wedi'i hysgrifennu mewn iaith syml gyda lluniau",
  brailleDocuments: 'Dogfennau Braille',
  largePrintDocuments: 'Dogfennau mewn print bras',
  audioTranslationDocuments: 'Cyfieithiad sain o ddogfennau',
  readOutDocuments: 'Dogfennau yn cael eu darllen yn uchel i mi',
  emailInformation: 'Gwybodaeth yn cael ei hanfon ataf drwy e-bost',
  documentHelpOther: 'Arall',
  noSupportRequired: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  describeWhatNeeded: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  errors: {
    ra_documentInformation: {
      required: 'Dewiswch pa fformat y mae arnoch angen eich dogfennau ynddo',
    },
    ra_specifiedColorDocuments_subfield: {
      required: 'Disgrifiwch ym mha liw yr ydych angen eich dogfennau',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_largePrintDocuments_subfield: {
      required: 'Disgrifiwch ym mha brint bras yr ydych angen eich dogfennau',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_documentHelpOther_subfield: {
      required: 'Disgrifiwch ym mha fformat amgen y mae arnoch angen eich dogfennau',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
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
      ra_documentInformation: {
        type: 'checkboxes',
        hint: l => l.select_all_apply,
        validator: atLeastOneFieldIsChecked,
        values: [
          {
            name: 'ra_documentInformation',
            label: l => l.specifiedColorDocuments,
            value: isC100Journey ? 'specifiedColorDocuments' : 'docsprint',
            subFields: {
              ra_specifiedColorDocuments_subfield: {
                type: 'textarea',
                label: l => l.describeWhatNeeded,
                labelSize: null,
                attributes: {
                  rows: 1,
                },
                validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
              },
            },
          },
          {
            name: 'ra_documentInformation',
            label: l => l.easyReadFormatDocuments,
            value: isC100Journey ? 'easyReadFormatDocuments' : 'docsreadformat',
            hint: l => l.easyReadFormatDocumentsHint,
          },
          {
            name: 'ra_documentInformation',
            label: l => l.brailleDocuments,
            value: isC100Journey ? 'brailleDocuments' : 'brailledocs',
          },
          {
            name: 'ra_documentInformation',
            label: l => l.largePrintDocuments,
            value: isC100Journey ? 'largePrintDocuments' : 'largeprintdocs',
            subFields: {
              ra_largePrintDocuments_subfield: {
                type: 'textarea',
                label: l => l.describeWhatNeeded,
                labelSize: null,
                attributes: {
                  rows: 1,
                },
                validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
              },
            },
          },
          {
            name: 'ra_documentInformation',
            label: l => l.audioTranslationDocuments,
            value: isC100Journey ? 'audioTranslationDocuments' : 'docsaudio',
          },
          {
            name: 'ra_documentInformation',
            label: l => l.readOutDocuments,
            value: isC100Journey ? 'readOutDocuments' : 'docsReadOut',
          },
          {
            name: 'ra_documentInformation',
            label: l => l.emailInformation,
            value: isC100Journey ? 'emailInformation' : 'emailInfo',
          },
          {
            name: 'ra_documentInformation',
            label: l => l.documentHelpOther,
            value: isC100Journey ? 'documentHelpOther' : 'other',
            subFields: {
              ra_documentHelpOther_subfield: {
                type: 'textarea',
                label: l => l.describeWhatNeeded,
                labelSize: null,
                attributes: {
                  rows: 1,
                },
                validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
              },
            },
          },
          {
            divider: l => l.divider,
          },
          {
            name: 'ra_documentInformation',
            label: l => l.noSupportRequired,
            value: isC100Journey ? 'noSupportRequired' : 'nosupport',
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
