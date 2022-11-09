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
  docsformat: 'I need documents in an alternative format',
  docsformathint: 'for example, braille or different colours and sizes',
  commhelp: 'I need help communicating and understanding',
  commhelphint: 'for example, sight, hearing, speaking or interpretation',
  hearingsupport: 'I need to bring support with me to a hearing',
  hearingsupporthint: 'for example, someone you know or an assistance animal',
  hearingcomfort: 'I need something to feel comfortable during a hearing',
  hearingcomforthint: 'for example, breaks or extra space',
  travellinghelp: 'I need help travelling to, or moving around court buildings',
  travellinghelphint: 'access and mobility support if a hearing takes place in person',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    reasonableAdjustments: {
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
  docsformat: 'I need documents in an alternative format',
  docsformathint: 'for example, braille or different colours and sizes',
  commhelp: 'I need help communicating and understanding',
  commhelphint: 'for example, sight, hearing, speaking or interpretation',
  hearingsupport: 'I need to bring support with me to a hearing',
  hearingsupporthint: 'for example, someone you know or an assistance animal',
  hearingcomfort: 'I need something to feel comfortable during a hearing',
  hearingcomforthint: 'for example, breaks or extra space',
  travellinghelp: 'I need help travelling to, or moving around court buildings',
  travellinghelphint: 'access and mobility support if a hearing takes place in person',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    reasonableAdjustments: {
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
    reasonableAdjustments: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'reasonableAdjustments',
          label: l => l.docsformat,
          hint: l => l.docsformathint,
          value: 'document format',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.commhelp,
          hint: l => l.commhelphint,
          value: 'comminication help',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.hearingsupport,
          hint: l => l.hearingsupporthint,
          value: 'hearing support',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.hearingcomfort,
          hint: l => l.hearingcomforthint,
          value: 'hearing comfort',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.travellinghelp,
          hint: l => l.travellinghelphint,
          value: 'travel help',
        },
        {
          divider: true,
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.nosupport,
          value: 'no need of support',
          exclusive: true,
        },
      ],
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
