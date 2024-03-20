import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { cy, en, form as formContents } from '../../../common/remove-legal-representative/start/content';

console.info('** FOR SONAR **');

export const form: FormContent = {
  fields: formContents.fields,
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};
export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
