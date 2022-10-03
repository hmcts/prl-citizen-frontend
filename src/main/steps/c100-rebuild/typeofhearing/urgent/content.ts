import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Does your situation qualify for an urgent first hearing?    ',
  firstHearing:
    'In many cases the first hearing will take place within 2 months. But the court may agree to an earlier \
  first hearing (urgent hearing) if it is necessary.',
  immediateRisk: 'For example, there may be an immediate risk of harm to you or the children.',
  urgentHearing:
    'If you get an urgent hearing, this may not mean that your case will be over sooner, and you may not receive \
  a final decision on your case at this stage.',
  warning:
    'Only ask for an urgent hearing if you have a good reason. The court will only agree to an urgent hearing \
  if they think the situation is critical.',
  one: 'Yes',
  two: 'No',
  errors: {
    urgentHearingReasons: {
      required: 'Select yes if you have a good reason to request an urgent hearing',
    },
  },
  // TODO: make label font smaller
  label: 'Do you have a good reason to request an urgent hearing?',
});

const cy = () => ({
  title: 'Does your situation qualify for an urgent first hearing? - welsh  ',
  firstHearing:
    'In many cases the first hearing will take place within 2 months. But the court may agree to an earlier \
  first hearing (urgent hearing) if it is necessary. - welsh  ',
  immediateRisk: 'For example, there may be an immediate risk of harm to you or the children.  - welsh  ',
  urgentHearing:
    'If you get an urgent hearing, this may not mean that your case will be over sooner, and you may not receive \
  a final decision on your case at this stage. - welsh  ',
  warning:
    'Only ask for an urgent hearing if you have a good reason. The court will only agree to an urgent hearing \
  if they think the situation is critical.  - welsh  ',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    urgentHearingReasons: {
      required: 'Select yes if you have a good reason to request an urgent hearing - welsh',
    },
  },
  label: 'Do you have a good reason to request an urgent hearing? - welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    detailsKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
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
