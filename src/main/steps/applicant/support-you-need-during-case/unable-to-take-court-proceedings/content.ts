import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'Is there a reason you are unable to take part in the court proceedings?',
  courtcommunication: 'For example, do you have a disability that would prevent you from attending court in person?',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  one: 'Yes',
  two: 'No',
  continue: 'Save and continue',
  errors: {
    unableforcourtproceedings: {
      required: 'Please select an answer',
    },
    courtProceedingProvideDetails: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need something to make me feel comfortable during a court hearing',
  courtcommunication: 'Think about what you would need if the hearing was in person, by phone or video.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  one: 'Yes',
  two: 'No',
  continue: 'Save and continue',
  errors: {
    unableforcourtproceedings: {
      required: 'Please select an answer',
    },
    courtProceedingProvideDetails: {
      required: 'Please provide the details',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    unableforcourtproceedings: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.twoHint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            courtProceedingProvideDetails: {
              type: 'textarea',
              label: 'Provide details',
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
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
