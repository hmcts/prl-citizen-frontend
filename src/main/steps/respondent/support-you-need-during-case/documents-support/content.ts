import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need documents in an alternative format',
  courtCommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  docsColour: 'Documents in a specified colour',
  docsColourDetails: 'Describe what you need',
  docsReadFormat: 'Documents in an easy read format',
  docsReadFormatHint: 'information written in simple language with pictures',
  brailleDocs: 'Braille documents',
  largePrintDocs: 'Documents in large print',
  largePrintDocsDetails: 'Describe what you need',
  audioTranslation: 'Audio translation of documents',
  docsReadOut: 'Documents read out to me',
  emailInfo: 'Information emailed to me',
  other: 'Other',
  otherDetails: 'Describe what you need',
  noSupport: 'No, I do not need any of this support at this time',
  continue: 'Continue',
  errors: {
    docsSupport: {
      required: 'Please select an answer',
    },
    docsDetails: {
      required: 'Please provide the docs details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    largePrintDetails: {
      required: 'Please provide the large print details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    otherDetails: {
      required: 'Please provide the other details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen dogfennau mewn fformat amgen',
  courtCommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: 'Dogfennau mewn lliw penodol',
  docsColour: 'Dogfennau mewn lliw penodol',
  docsColourDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  docsReadFormat: 'Dogfennau mewn fformat hawdd i’w darllen',
  docsReadFormatHint: "Gwybodaeth wedi'i hysgrifennu mewn iaith syml â lluniau",
  brailleDocs: 'Dogfennau Braille',
  largePrintDocs: 'Dogfennau mewn print bras',
  largePrintDocsDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  audioTranslation: 'Cyfieithiad sain o ddogfennau',
  docsReadOut: 'Dogfennau yn cael eu darllen yn uchel i mi',
  emailInfo: 'Gwybodaeth yn cael ei hanfon ataf drwy e-bost',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  noSupport: 'Nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    docsSupport: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
    },
    docsDetails: {
      required: 'Rhowch fanylion y dogfennau',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    largePrintDetails: {
      required: 'Rhowch fanylion y print bras',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    otherDetails: {
      required: 'Rhowch fanylion y print bras',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
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
    docsSupport: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'docsSupport',
          label: l => l.docsColour,
          value: 'docsprint',
          subFields: {
            docsDetails: {
              type: 'textarea',
              label: l => l.docsColourDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'docsSupport',
          label: l => l.docsReadFormat,
          hint: l => l.docsReadFormatHint,
          value: 'docsreadformat',
        },
        {
          name: 'docsSupport',
          label: l => l.brailleDocs,
          value: 'brailledocs',
        },
        {
          name: 'docsSupport',
          label: l => l.largePrintDocs,
          value: 'largeprintdocs',
          subFields: {
            largePrintDetails: {
              type: 'textarea',
              label: l => l.largePrintDocsDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'docsSupport',
          label: l => l.audioTranslation,
          value: 'docsaudio',
        },
        {
          name: 'docsSupport',
          label: l => l.docsReadOut,
          value: 'docsReadOut',
        },
        {
          name: 'docsSupport',
          label: l => l.emailInfo,
          value: 'emailInfo',
        },
        {
          name: 'docsSupport',
          label: l => l.other,
          value: 'other',
          subFields: {
            otherDetails: {
              type: 'textarea',
              label: l => l.otherDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'docsSupport',
          label: l => l.noSupport,
          value: 'nosupport',
          exclusive: true,
        },
      ],
      validator: atLeastOneFieldIsChecked,
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
