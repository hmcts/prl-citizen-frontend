import { TranslationFn } from '../../../../app/controller/GetController';

const en = {
  section: 'Check your answers',
  title:'Safety concerns',
  lineheading:'Do you have any concerns for your safety or the safety of the children?',
  
 
  continue: 'Save and continue',
};

const cy: typeof en = {
  section: 'Check your answers - in welsh',
  title:'Safety concerns - in welsh',
  lineheading:'Do you have any concerns for your safety or the safety of the children? - in welsh',
  
 
  continue: 'Save and continue - in welsh',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations
  };
};
