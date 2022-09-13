import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1: 'What you told us',
  line2: 'You have not suffered or are not at risk of suffering: ',
  line3: 'psychological abuse',
  line4: 'financial abuse',
  line5: 'emotional abuse',
  line6: 'physical abuse',
  line7: 'sexual abuse',
  line8:
    'Based on your answer, we will not ask you any more questions about domestic violence or abuse. You can continue your response.',
  line9: 'Are you unsure about the answer you gave?',
  line10: 'Have a look at the following information if you are unsure about your answer.',
  line11: '*These links are a placeholder and will changes',
  line12: 'Find out about the signs of domestic violence or abuse',
  line13: 'Lorem ipsum about Womens aid',
  line14: 'If you are a man and have concerns for your safety',
  line15: 'National Domestic Violence Helpline',
  line16: 'If you want to change your answer, go back to the previous screen.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  goBack: 'Go back',
};

const cy: typeof en = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1: 'What you told us',
  line2: 'You have not suffered or are not at risk of suffering: ',
  line3: 'psychological abuse',
  line4: 'financial abuse',
  line5: 'emotional abuse',
  line6: 'physical abuse',
  line7: 'sexual abuse',
  line8:
    'Based on your answer, we will not ask you any more questions about domestic violence or abuse. You can continue your response.',
  line9: 'Are you unsure about the answer you gave?',
  line10: 'Have a look at the following information if you are unsure about your answer.',
  line11: 'These links are a placeholder and will changes',
  line12: 'Find out about the signs of domestic violence or abuse',
  line13: 'Lorem ipsum about Womens aid',
  line14: 'If you are a man and have concerns for your safety',
  line15: 'National Domestic Violence Helpline',
  line16: 'If you want to change your answer, go back to the previous screen.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  goBack: 'Go back',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
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
