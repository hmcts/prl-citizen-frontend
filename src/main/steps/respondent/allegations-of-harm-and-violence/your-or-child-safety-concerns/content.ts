import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  title: 'Safety concerns',
  title_desc:'Do you have any concerns for your safety or the safety of the children?',
  line1: 'You may have concerns about current, or future safety.',
  line2:"If you or the children have experienced abuse or feel unsafe, support is available. See a list of organisations that can help",
  warning: 'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can.',
  sidelink1:'Identify signs of child abuse',
  sidelink2:'Identify signs of domestic abuse',
  one: 'Yes',
  two: 'No',
  onlyContinue: 'Continue',
  errors: {
    yourchildconcernsstart: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children',
    },
  },
};

const cy: typeof en = {
  title: 'Safety concerns - welsh',
  title_desc:'Do you have any concerns for your safety or the safety of the children? - welsh',
  line1: 'You may have concerns about current, or future safety. - welsh',
  line2:"If you or the children have experienced abuse or feel unsafe, support is available. See a list of organisations that can help - welsh",
  warning: 'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can. - welsh',
  sidelink1:'Identify signs of child abuse - welsh',
  sidelink2:'Identify signs of domestic abuse - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  onlyContinue: 'Continue - welsh',
  errors: {
    yourchildconcernsstart: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children',
    },
  },
};

const languages = {
  en,
  cy,
};


export const form: FormContent = {
  fields: {
    pageDetails: {
      type: 'detailsHtml',
    },
    yourchildconcernsstart: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: 'Yes',
        },
        {
          label: l => l.two,
          value: 'No',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};


export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form
  };
};
