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
  nosupport: 'I do not need any of this support at this time',
  continue: 'Continue',
  largePrintDocsDetails: 'Describe what you need',
  errors: {
    docsSupport: {
      required: 'Please select an answer',
    },
    otherDetails: {
      required: 'Please provide the details',
    },
    largePrintDetails: {
      required: 'Please provide the large print details',
    },
    docsDetails: {
      required: 'Please provide the docs details',
    },
  },
};

const cy: typeof en = {
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
  nosupport: 'I do not need any of this support at this time',
  continue: 'Continue',
  largePrintDocsDetails: 'Describe what you need',
  errors: {
    docsSupport: {
      required: 'Please select an answer',
    },
    otherDetails: {
      required: 'Please provide the details',
    },
    largePrintDetails: {
      required: 'Please provide the large print details',
    },
    docsDetails: {
      required: 'Please provide the docs details',
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
          value: 'readoutdocs',
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
          divider: true,
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
