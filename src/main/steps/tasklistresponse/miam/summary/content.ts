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

  updateContent(userCase);

  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, '', content.language)],
  };
};

const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: 'Mediation Information and Assessment Meeting (MIAM) attendance -welsh',
  sectionTitles: {
    MIAMDetails: '',
  },
  keys: {
    miamStart: 'Ydych chi wedi mynychu MIAM?',
    miamWillingness: "A fyddech chi'n fodlon mynychu MIAM?",
    miamNotWillingExplnation: "Esboniwch pam nad ydych chi'n fodlon mynychu MIAM?",
  },
  errors: {},
};

export const urls = {};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;

  updateContent(userCase);

  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, '', content.language)],
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
