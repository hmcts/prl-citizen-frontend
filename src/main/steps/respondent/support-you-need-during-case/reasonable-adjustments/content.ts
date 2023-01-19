import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
const en = {
  section: 'Reasonable adjustments',
  pagetitle: '',
  title:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  courtcommunication:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  optionHint: 'Select all that apply to you - specific requirements can be given next',
  summaryText: 'Contacts for help',
  docsFormat: 'I need documents in an alternative format',
  docsFormatHint: 'for example, braille or different colours and text sizes',
  commHelp: 'I need help communicating and understanding',
  commHelpHint: 'for example, hearing, speaking or interpretation',
  hearingSupport: 'I need to bring support with me to a hearing',
  hearingSupportHint: 'for example, someone you know or an assistance animal',
  hearingComfort: 'I need something to feel comfortable during a hearing',
  hearingComfortHint: 'for example, breaks or extra space',
  travellingHelp: 'I need help travelling to, or moving around court buildings',
  travellingHelpHint: 'for example, access and mobility support if a hearing takes place in person',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    reasonableAdjustments: {
      required: 'Please select an answer',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  pagetitle: '',
  title:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  courtcommunication:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  optionHint: 'Select all that apply to you - specific requirements can be given next',
  summaryText: 'Contacts for help',
  docsFormat: 'I need documents in an alternative format',
  docsFormatHint: 'for example, braille or different colours and text sizes',
  commHelp: 'I need help communicating and understanding',
  commHelpHint: 'for example, hearing, speaking or interpretation',
  hearingSupport: 'I need to bring support with me to a hearing',
  hearingSupportHint: 'for example, someone you know or an assistance animal',
  hearingComfort: 'I need something to feel comfortable during a hearing',
  hearingComfortHint: 'for example, breaks or extra space',
  travellingHelp: 'I need help travelling to, or moving around court buildings',
  travellingHelpHint: 'for example, access and mobility support if a hearing takes place in person',
  noSupport: 'No, I do not need any extra support at this time',
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
          label: l => l.docsFormat,
          hint: l => l.docsFormatHint,
          value: 'docsformat',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.commHelp,
          hint: l => l.commHelpHint,
          value: 'commhelp',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.hearingSupport,
          hint: l => l.hearingSupportHint,
          value: 'hearingsupport',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.hearingComfort,
          hint: l => l.hearingComfortHint,
          value: 'hearingcomfort',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.travellingHelp,
          hint: l => l.travellingHelpHint,
          value: 'travellinghelp',
        },
        {
          divider: true,
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.noSupport,
          value: 'nosupport',
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
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  return {
    ...translations,
    form,
  };
};
