import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  feesAppliedDetailsTitle: 'Have you already applied for help with your application fee?',
  hwfReferenceNumberLabel: 'Enter your help with fees reference number',
  hwfReferenceNumberHint: `You received this number when you applied for help with fees.<br/>
  For example, HWF-A1B-23C`,
  one: 'Yes',
  two: 'No',
  errors: {
    feesAppliedDetails: {
      required: 'Select yes if you already applied for help with your application fee',
    },
    hwfReferenceNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees',
    },
  },
});

const cy = () => ({
  feesAppliedDetailsTitle: 'Have you already applied for help with your application fee? - welsh',
  hwfReferenceNumberLabel: 'Enter your help with fees reference number - welsh',
  hwfReferenceNumberHint: `You received this number when you applied for help with fees - welsh.<br/>
  For example, HWF-A1B-23C - welsh`,
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    feesAppliedDetails: {
      required: 'Select yes if you already applied for help with your application fee - welsh',
    },
    hwfReferenceNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    feesAppliedDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            hwfReferenceNumber: {
              type: 'text',
              label: l => l.hwfReferenceNumberLabel,
              labelSize: 'm',
              hint: l => l.hwfReferenceNumberHint,
              classes: 'govuk-input--width-10',
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
