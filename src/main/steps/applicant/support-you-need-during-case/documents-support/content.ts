import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need documents in an alternative format',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  docsprint: 'I need documents printed in a particular colour or font',
  docsreadformat: 'Documents in an easy read format',
  brailledocs: 'Braille documents',
  largeprintdocs: 'Documents in large print',
  docsaudio: 'Audio translation of documents',
  readoutdocs: 'Documents read out to me',
  emailInfo: 'Information emailed to me',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any of this support at this time',
  continue: 'Continue',
  largePrintDocsDetails: 'Describe what you need',
  errors: {
    docsSupport: {
      required: 'Please select an answer',
    },
    otherDetails: {
      required: 'Please provide the details',
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
    docsDetails: {
      required: 'Please provide the docs details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen dogfennau mewn fformat amgen',
  courtcommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  docsprint: 'Dogfennau mewn lliw penodol',
  docsreadformat: 'Dogfennau mewn fformat hawdd i’w darllen',
  brailledocs: 'Dogfennau Braille',
  largeprintdocs: 'Dogfennau mewn print bras',
  docsaudio: 'Cyfieithiad sain o ddogfennau',
  readoutdocs: 'Dogfennau yn cael eu darllen yn uchel i mi',
  emailInfo: 'Gwybodaeth yn cael ei hanfon ataf drwy e-bost',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  nosupport: 'Nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  largePrintDocsDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  errors: {
    docsSupport: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
    },
    otherDetails: {
      required: 'Rhowch fanylion',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    largePrintDetails: {
      required: 'Rhowch fanylion y print bras',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    docsDetails: {
      required: 'Rhowch fanylion y dogfennau',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
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
          label: l => l.docsprint,
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
          label: l => l.docsreadformat,
          value: 'docsreadformat',
        },
        {
          name: 'docsSupport',
          label: l => l.brailledocs,
          value: 'brailledocs',
        },
        {
          name: 'docsSupport',
          label: l => l.largeprintdocs,
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
          label: l => l.docsaudio,
          value: 'docsaudio',
        },
        {
          name: 'docsSupport',
          label: l => l.readoutdocs,
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
          label: l => l.nosupport,
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
