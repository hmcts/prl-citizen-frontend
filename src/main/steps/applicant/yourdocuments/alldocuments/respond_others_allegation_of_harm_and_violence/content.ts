import { TranslationFn } from '../../../../../app/controller/GetController';

const en = () => {
  return {
    section: 'All documents',
    title: "Your response to other's allegation of harm and violence",
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: "Your response to other's allegation of harm and violence - welsh",
    threeHint: 'This is a 8 character code - welsh',
    summaryText: 'Contacts for help - welsh',
    caseNumber: 'Case number - welsh',
    continue: 'Go back - welsh',
  };
};

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
