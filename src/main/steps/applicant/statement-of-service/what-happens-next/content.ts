import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

export const en = {
  successMessage: 'Statement of service submitted to the court',
  caption: 'Case number ',
  title: 'What happens next',
  courtwillcontactlabel: 'The court will contact you with details of what happens next',
  cafcassinvolvedlabel: 'If Cafcass are involved in the case, they will provide the court with a safeguarding letter',
  continue: 'Close and return to the case overview',
};

export const cy = {
  successMessage: 'Statement of service submitted to the court',
  caption: 'Case number ',
  title: 'What happens next',
  courtwillcontactlabel: 'The court will contact you with details of what happens next',
  cafcassinvolvedlabel: 'If Cafcass are involved in the case, they will provide the court with a safeguarding letter',
  continue: 'Close and return to the case overview',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},

  onlyContinue: {
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
