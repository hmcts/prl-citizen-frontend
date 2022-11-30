/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child Arrangements',
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
    },
    ra_largePrintDocuments_subfield: {
      required: 'Describe which large print you need your documents in',
    },
    ra_documentHelpOther_subfield: {
      required: 'Describe which alternative format you need your documents in',
    },
  },
});

export const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
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
  describeWhatNeeded: 'Describe what you need - welsh',
  errors: {
    ra_documentInformation: {
      required: 'Select which format you need your documents in - welsh',
    },
    ra_specifiedColorDocuments_subfield: {
      required: 'Describe which colour you need your documents in - welsh',
    },
    ra_largePrintDocuments_subfield: {
      required: 'Describe which large print you need your documents in - welsh',
    },
    ra_documentHelpOther_subfield: {
      required: 'Describe which alternative format you need your documents in - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_documentInformation: {
      id: 'ra_documentInformation',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_documentInformation',
          label: l => l.specifiedColorDocuments,
          value: 'specifiedColorDocuments',
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
          value: 'easyReadFormatDocuments',
          hint: l => l.easyReadFormatDocumentsHint,
        },
        {
          name: 'ra_documentInformation',
          label: l => l.brailleDocuments,
          value: 'brailleDocuments',
        },
        {
          name: 'ra_documentInformation',
          label: l => l.largePrintDocuments,
          value: 'largePrintDocuments',
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
          value: 'audioTranslationDocuments',
        },
        {
          name: 'ra_documentInformation',
          label: l => l.readOutDocuments,
          value: 'readOutDocuments',
        },
        {
          name: 'ra_documentInformation',
          label: l => l.emailInformation,
          value: 'emailInformation',
        },
        {
          name: 'ra_documentInformation',
          label: l => l.documentHelpOther,
          value: 'documentHelpOther',
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
          value: 'noSupportRequired',
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
