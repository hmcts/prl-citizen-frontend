import { TranslationFn } from '../../app/controller/GetController';


const en = {
  section: 'Respondent details',
  title: 'Do the other people named in this application (the applicants) know any of your contact details?',
  line1: 'Enter the claim number from the email or letter we sent you.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Continue',
};

const cy: typeof en = {
  section: 'Respondent details',
  title: 'Enter your access details',
  line1: 'Enter the claim number from the email or letter we sent you.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
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
