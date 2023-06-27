import { TranslationFn } from '../../../../app/controller/GetController';

export const en = {
  caption: 'Case number ',
  title: 'What happens next',
  courtwillcontactlabel: 'The court will contact you with details of what happens next',
  cafcassinvolvedlabel: 'If Cafcass are involved in this case, they will provide the court with a safeguarding letter',
  whowasserved: 'Who was served?',
  continue: 'Continue',
};

export const cy = {
  caption: 'Case number ',
  title: 'What happens next',
  courtwillcontactlabel: 'The court will contact you with details of what happens next',
  cafcassinvolvedlabel: 'If Cafcass are involved in this case, they will provide the court with a safeguarding letter',
  whowasserved: 'Who was served?',
  continue: 'Continue',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
  };
};
