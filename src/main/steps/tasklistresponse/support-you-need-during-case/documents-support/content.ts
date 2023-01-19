import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need documents in an alternative format',
  courtCommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
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
  noSupport: 'I do not need any of this support at this time',
  continue: 'Continue',
  errors: {
    respondentDocsSupport: {
      required: 'Please select an answer',
    },
    respondentDocsDetails: {
      required: 'Please provide the docs details',
    },
    respondentLargePrintDetails: {
      required: 'Please provide the large print details',
    },
    respondentOtherDetails: {
      required: 'Please provide the other details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need documents in an alternative format',
  courtCommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
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
  noSupport: 'I do not need any of this support at this time',
  continue: 'Continue',
  errors: {
    respondentDocsSupport: {
      required: 'Please select an answer',
    },
    respondentDocsDetails: {
      required: 'Please provide the docs details',
    },
    respondentLargePrintDetails: {
      required: 'Please provide the large print details',
    },
    respondentOtherDetails: {
      required: 'Please provide the other details',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    respondentDocsSupport: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'respondentDocsSupport',
          label: l => l.docsColour,
          value: 'Documents in colour print',
          subFields: {
            respondentDocsDetails: {
              type: 'textarea',
              label: l => l.docsColourDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'respondentDocsSupport',
          label: l => l.docsReadFormat,
          hint: l => l.docsReadFormatHint,
          value: 'documents in read format',
        },
        {
          name: 'respondentDocsSupport',
          label: l => l.brailleDocs,
          value: 'Braille documents',
        },
        {
          name: 'respondentDocsSupport',
          label: l => l.largePrintDocs,
          value: 'Large print documents',
          subFields: {
            respondentLargePrintDetails: {
              type: 'textarea',
              label: l => l.largePrintDocsDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'respondentDocsSupport',
          label: l => l.audioTranslation,
          value: 'Audio translation of documents',
        },
        {
          name: 'respondentDocsSupport',
          label: l => l.docsReadOut,
          value: 'Documents read out to me',
        },
        {
          name: 'respondentDocsSupport',
          label: l => l.emailInfo,
          value: 'email information',
        },
        {
          name: 'respondentDocsSupport',
          label: l => l.other,
          value: 'other',
          subFields: {
            respondentOtherDetails: {
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
          name: 'respondentDocsSupport',
          label: l => l.noSupport,
          value: 'no need of support',
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
