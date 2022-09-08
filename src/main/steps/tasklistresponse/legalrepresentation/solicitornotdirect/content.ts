import { TranslationFn } from '../../../../app/controller/GetController';

const en = {};

const cy: typeof en = {};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const caseId = content.userCase?.id;

  return {
    ...translations,
    caseId,
  };
};
