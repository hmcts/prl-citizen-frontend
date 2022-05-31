import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';


const en = {
  section: '',
  title: 'Safety concerns',
  line1: "The answers you give in your response will be shared with the other people named in this application (the aThe court needs to know if anyone who spends time with the children poses a risk to their safety or yours.",
  line2: 'FWe use ‘children’ as a general term to avoid repetition. In this service it applies to whether it is about a child or children.',
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
  title: 'Safety concerns',
  line1: "The answers you give in your response will be shared with the other people named in this application (the aThe court needs to know if anyone who spends time with the children poses a risk to their safety or yours.",
  line2: 'FWe use ‘children’ as a general term to avoid repetition. In this service it applies to whether it is about a child or children.',
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
