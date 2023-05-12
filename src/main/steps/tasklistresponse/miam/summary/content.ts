import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { summaryList } from '../../../common/summary/utils';

import { updateContent } from './handler';

export const enContent = {
  section: 'Check your answers',
  title: 'Mediation Information and Assessment Meeting (MIAM) attendance',
  sectionTitles: {
    MIAMDetails: '',
  },
  keys: {
    miamStart: 'Have you attended a MIAM?',
    miamWillingness: 'Would you be willing to attend a MIAM?',
    miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM?',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;

  //updateContent(enContent, userCase, urls);
  updateContent(userCase);

  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, '', fieldType, content.language)],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your answers -welsh',
  title: 'Mediation Information and Assessment Meeting (MIAM) attendance -welsh',
  sectionTitles: {
    MIAMDetails: '',
  },
  keys: {
    miamStart: 'Have you attended a MIAM? -welsh',
    miamWillingness: 'Would you be willing to attend a MIAM? -welsh',
    miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM? -welsh',
  },
  errors: {},
};

export const urls = {};

const fieldType = {
  miamStart: 'String',
  miamWillingness: 'String',
  miamNotWillingExplnation: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;

  //updateContent(cyContent, userCase, urls);
  updateContent(userCase);

  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, '', fieldType, content.language)],
  };
};

export const form: FormContent = {
  fields: {},
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
