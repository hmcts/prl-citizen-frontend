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
    title: 'Eich ymateb i honiad yr ochr arall o niwed a thrais ',
    threeHint: 'Mae hwn yn god 8 nod',
    summaryText: 'Cysylltiadau cymorth',
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
  return {
    ...translations,
  };
};
