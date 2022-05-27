import { MIAM_START, MIAM_ATTEND_WILLINGNESS } from '../../../../steps/urls';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';

import {
  summaryList,
} from '../../../common/summary/utils';

export const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    miamStart :"What is a Mediation Information and Assessment Meeting (MIAM)?",
    miamWillingness:"Would you be willing to attend a MIAM?",
    miamNotWillingExplnation:"Explain why"
  },
  errors: {
    
  },
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...enContent,
    language: content.language,
    sections: [
      summaryList(enContent, userCase, urls),
    ],
  };
};

const cyContent: typeof enContent = {
    section: 'Check your details',
    title: 'Read the information to make sure it is correct, and add any missing details',
    sectionTitles: {
        applicationDetails: 'Application details',
      },
    keys: {
      miamStart :"What is a Mediation Information and Assessment Meeting (MIAM)?",
      miamWillingness:"Would you be willing to attend a MIAM?",
      miamNotWillingExplnation:"Explain why"
    },
    errors: {
      
    },
};

const urls = {
  miamStart: MIAM_START,
  miamWillingness: MIAM_ATTEND_WILLINGNESS,
  miamNotWillingExplnation: MIAM_ATTEND_WILLINGNESS,
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(cyContent, userCase, urls, 'applicationDetails'),
    ],
  };
};

export const form: FormContent = {
  fields: {
  
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
