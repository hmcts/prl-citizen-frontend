import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';


const en = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1: 'The court needs to know if you have suffered, or are at risk of suffering, any form of domestic violence or abuse.',
  line2: 'The following questions will ask whether you have suffered, or are at risk of suffering, any form of harm.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
    }
  },
};

const cy: typeof en = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1: 'The court needs to know if you have suffered, or are at risk of suffering, any form of domestic violence or abuse.',
  line2: 'The following questions will ask whether you have suffered, or are at risk of suffering, any form of harm.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
    }
  },
};

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
          value: 'Yes',
        },
        {
          label: l => l.two,
          value: 'No',
        },
        {
          label: l => l.three,
          value: 'I',
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
