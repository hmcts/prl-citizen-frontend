import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';


const en = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1: 'The court needs to know if you have suffered, or are at risk of suffering, any form of domestic violence or abuse.',
  line2: 'The following questions will ask whether you have suffered, or are at risk of suffering, any form of harm.',
  line3: 'Find out about the signs of domestic violence or abuse',

  continue: 'Continue',
};

const cy: typeof en = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1: 'The court needs to know if you have suffered, or are at risk of suffering, any form of domestic violence or abuse.',
  line2: 'The following questions will ask whether you have suffered, or are at risk of suffering, any form of harm.',
  line3: 'Find out about the signs of domestic violence or abuse',
  
  continue: 'Continue',
 };

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
   
    },

  submit: {
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
