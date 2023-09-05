import { TranslationFn } from '../../../../../app/controller/GetController';

const en = () => {
  return {
    section: 'All documents',
    title: 'Safeguarding Letter',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Llythyr diogelu',
    caseNumber: 'Rhif yr achos',
    continue: 'Yn ôl',
  };
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orders: object[] = [];

  return {
    ...translations,
    orders,
  };
};
