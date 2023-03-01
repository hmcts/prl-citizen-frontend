import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { en as english, form, cy as welsh } from '../../../common/keep-details-private/details_known/content';
const en = {
  ...english,
  title: 'Does the other person named in your application (the respondent) know any of your contact details?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
};

const cy: typeof en = {
  ...welsh,
  title: 'Does the other person named in your application (the respondent) know any of your contact details?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
};

const languages = {
  en,
  cy,
};

export const formWithFields: FormContent = {
  fields: form.fields,
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form: formWithFields,
  };
};
