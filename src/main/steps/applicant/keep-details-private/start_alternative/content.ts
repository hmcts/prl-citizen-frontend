import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import {
  en as english,
  form as formWithContents,
  cy as welsh,
} from '../../../common/keep-details-private/start_alternative/content';
const en = {
  ...english,
  title:
    'Do you want to keep your contact details private from the other person named in the application (the respondent)?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  contact_details_private_hint: 'Make sure you only select details the respondent does not already know.',
  continue: 'Save and continue',
};

const cy: typeof en = {
  ...welsh,
  title:
    'Do you want to keep your contact details private from the other person named in the application (the respondent)?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  contact_details_private_hint: 'Make sure you only select details the respondent does not already know.',
  continue: 'Save and continue',
};
const languages = {
  en,
  cy,
};
//@typescript-eslint/explicit-module-boundary-type
export const form: FormContent = {
  fields: formWithContents.fields,
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
