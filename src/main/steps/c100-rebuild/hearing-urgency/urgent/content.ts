import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Does your situation qualify for an urgent first hearing?',
  paragraphs: [
    'In many cases the first hearing will take place within 2 months. But the court may agree to an earlier first hearing (urgent hearing) if it is necessary.',
    'For example, there may be an immediate risk of harm to you or the children.',
    'If you get an urgent hearing, this may not mean that your case will be over sooner, and you may not receive a final decision on your case at this stage.',
  ],
  warningText: {
    text: 'Only ask for an urgent hearing if you have a good reason. The court will only agree to an urgent hearing if they think the situation is critical.',
    iconFallbackText: 'Warning',
  },
  label: 'Do you have a good reason to request an urgent hearing?',
  one: 'Yes',
  two: 'No',
  errors: {
    hu_urgentHearingReasons: {
      required: 'Select yes if you have a good reason to request an urgent hearing',
    },
  },
});

const cy = () => ({
  title: 'Does your situation qualify for an urgent first hearing? - welsh',
  paragraphs: [
    'In many cases the first hearing will take place within 2 months. But the court may agree to an earlier first hearing (urgent hearing) if it is necessary. - welsh',
    'For example, there may be an immediate risk of harm to you or the children. - welsh',
    'If you get an urgent hearing, this may not mean that your case will be over sooner, and you may not receive a final decision on your case at this stage. - welsh',
  ],
  warningText: {
    text: 'Only ask for an urgent hearing if you have a good reason. The court will only agree to an urgent hearing if they think the situation is critical. - welsh',
    iconFallbackText: 'Warning',
  },
  label: 'Do you have a good reason to request an urgent hearing? - welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    hu_urgentHearingReasons: {
      required: 'Select yes if you have a good reason to request an urgent hearing - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    hu_urgentHearingReasons: {
      type: 'radios',
      classes: 'govuk-radios',
      labelSize: 'm',
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
