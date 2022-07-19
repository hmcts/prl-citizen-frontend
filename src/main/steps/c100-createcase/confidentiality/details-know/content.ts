import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle:
    'Do you want to keep your contact details private from the other people named in the application (the respondents)?',
  para1: 'The information you give us will be shared with the respondents. This includes your contact details.',
  para2:
    'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
});

const cy = () => ({
  caption: 'Keeping your contact details private - welsh',
  headingTitle:
    'Do you want to keep your contact details private from the other people named in the application (the respondents)? - welsh  ',
  para1: 'The information you give us will be shared with the respondents. This includes your contact details. - welsh',
  para2:
    'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private. welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  three: "I don't know - Welsh",
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
        {
          label: l => l.three,
          value: 'I dont know',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
