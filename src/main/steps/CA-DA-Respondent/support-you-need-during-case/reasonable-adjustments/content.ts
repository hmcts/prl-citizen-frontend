import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  courtcommunication:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  optionHint: 'Select all that apply to you - specific requirements can be given next',
  summaryText: 'Contacts for help',
  docsFormat: 'I need documents in an alternative format',
  docsFormatHint: 'for example, braille or different colours and text sizes',
  commHelp: 'I need to read and write in Welsh',
  commHelpHint: 'for example, sight, hearing, speaking or interpretation',
  hearingSupport: 'I need to bring support with me to a hearing',
  hearingSupportHint: 'for example, someone you know or an assistance animal',
  hearingComfort: 'I need something to feel comfortable during a hearing',
  hearingComfortHint: 'for example, breaks or extra space',
  travellingHelp: 'I need help travelling to, or moving around court buildings',
  travellingHelpHint: 'for example, access and mobility support if a hearing takes place in person',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    respondentReasonableAdjustments: {
      required: 'Please select an answer',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  courtcommunication:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  optionHint: 'Select all that apply to you - specific requirements can be given next',
  summaryText: 'Contacts for help',
  docsFormat: 'I need documents in an alternative format',
  docsFormatHint: 'for example, braille or different colours and text sizes',
  commHelp: 'I need to read and write in Welsh',
  commHelpHint: 'for example, sight, hearing, speaking or interpretation',
  hearingSupport: 'I need to bring support with me to a hearing',
  hearingSupportHint: 'for example, someone you know or an assistance animal',
  hearingComfort: 'I need something to feel comfortable during a hearing',
  hearingComfortHint: 'for example, breaks or extra space',
  travellingHelp: 'I need help travelling to, or moving around court buildings',
  travellingHelpHint: 'for example, access and mobility support if a hearing takes place in person',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    respondentReasonableAdjustments: {
      required: 'Please select an answer',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    respondentReasonableAdjustments: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'respondentReasonableAdjustments',
          label: l => l.docsFormat,
          hint: l => l.docsFormatHint,
          value: 'document format',
        },
        {
          name: 'respondentReasonableAdjustments',
          label: l => l.commHelp,
          hint: l => l.commHelpHint,
          value: 'comminication help',
        },
        {
          name: 'respondentReasonableAdjustments',
          label: l => l.hearingSupport,
          hint: l => l.hearingSupportHint,
          value: 'hearing support',
        },
        {
          name: 'respondentReasonableAdjustments',
          label: l => l.hearingComfort,
          hint: l => l.hearingComfortHint,
          value: 'hearing comfort',
        },
        {
          name: 'respondentReasonableAdjustments',
          label: l => l.travellingHelp,
          hint: l => l.travellingHelpHint,
          value: 'travel help',
        },
        {
          divider: true,
        },
        {
          name: 'respondentReasonableAdjustments',
          label: l => l.noSupport,
          value: 'no need of support',
          exclusive: true,
        },
      ],
    },
  },
  submit: {
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
