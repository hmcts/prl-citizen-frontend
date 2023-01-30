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
    hwf_feesAppliedDetails: {
      required: 'Select yes if you already applied for help with your application fee',
    },
    helpWithFeesReferenceNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees',
    },
  },
});

const cy = () => ({
  feesAppliedDetailsTitle: 'A ydych chi eisoes wedi gwneud cais am help i dalu ffi’r cais?',
  hwfReferenceNumberLabel: 'Rhowch eich cyfeirnod help i dalu ffioedd',
  hwfReferenceNumberHint: `Cawsoch y rhif hwn pan wnaethoch gais am help i dalu ffioedd.<br/>
  Er enghraifft, HWF-A1B-23C`,
  one: 'Do',
  two: 'Naddo',
  errors: {
    hwf_feesAppliedDetails: {
      required: 'Dewiswch do os ydych eisoes wedi gwneud cais am help i dalu ffi eich cais',
    },
    helpWithFeesReferenceNumber: {
      required: 'ENodwch y cyfeirnod Help i dalu Ffioedd a gawsoch pan wnaethoch chi wneud cais am Help i dalu Ffioedd',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    hwf_feesAppliedDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            helpWithFeesReferenceNumber: {
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
