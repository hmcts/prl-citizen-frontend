import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Are you sure you want to withdraw your application?',
  paragraphs: [
    'The court will consider your reasons, and decide whether or not you can withdraw the application.',
    'If you have paid a court fee, you may not receive a refund.',
  ],
  warningText: {
    text: 'If you withdraw this application, you cannot resubmit it.',
    iconFallbackText: 'Warning',
  },
  one: 'Yes',
  two: 'No',
  withdrawApplicationReason: 'Why are you withdrawing this application?',
  errors: {
    withdrawApplication: {
      required: 'Select yes if you want to withdraw else select no.',
    },
    withdrawApplicationReason: {
      required: 'Provide details about withdrawing this application.',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});

const cy = () => ({
  title: 'Ydych chi’n siŵr eich bod eisiau tynnu eich cais yn ôl?',
  paragraphs: [
    'The court will consider your reasons, and decide whether or not you can withdraw the application. -welsh',
    'If you have paid a court fee, you may not receive a refund. -welsh',
  ],
  warningText: {
    text: 'If you withdraw this application, you cannot resubmit it. -welsh',
    iconFallbackText: 'Rhybudd',
  },
  one: 'Yes -welsh',
  two: 'No -welsh',
  withdrawApplicationReason: 'Why are you withdrawing this application? -welsh',
  errors: {
    withdrawApplication: {
      required: 'Select yes if you want to withdraw else select no. -welsh',
    },
    withdrawApplicationReason: {
      required: 'Rhowch ragor o fanylion ynghylch tynnu’r cais hwn yn ôl',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    withdrawApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      labelSize: 'm',
      // section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            withdrawApplicationReason: {
              type: 'textarea',
              label: l => l.withdrawApplicationReason,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
