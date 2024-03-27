import { TranslationFn } from '../../../app/controller/GetController';

console.info('** FOR SONAR **');

const en = () => ({
  title: 'Welcome to Citizen dashboard',
  paymentError: '',
  applicant: 'DA Applicant',
  respondent: 'CA DA Respondent',
  c100: 'C100 Application',
  pay: 'Pay Now ',
  errorTitle: 'There is a problem',
  paymentErrorText: 'The payment has been unsuccessful',
});

const cy = () => ({
  title: 'Croeso i’r dangosfwrdd i ddinasyddion',
  paymentError: '',
  applicant: 'DA Applicant (welsh)',
  respondent: 'CA DA Respondent (welsh)',
  c100: 'C100 Application (welsh)',
  pay: 'Talu Nawr',
  errorTitle: 'Mae yna broblem',
  paymentErrorText: 'Mae’r taliad wedi bod yn aflwyddiannus',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
  };
};
