import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { summaryList } from '../../../../steps/common/support-you-need-during-case/summary/utils';
import { APPLICANT_STATEMENT_OF_SERVICE } from '../../../../steps/urls';

export const enContent = {
  section: 'Check your answers',
  title: ' ',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    whowasserved: 'who was served?',
    servedDate: 'When were they served?',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  const userCase = content.additionalData?.req.session.userCase;
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, 'en', enContent.sectionTitles.aboutYou)],
  };
};

const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: ' ',
  sectionTitles: {
    aboutYou: 'Amdanoch chi',
  },

  keys: {
    whowasserved: 'who was served?',
    servedDate: 'When were they served?',
  },
  errors: {},
};

const urls = {
  whowasserved: APPLICANT_STATEMENT_OF_SERVICE,
  servedDate: APPLICANT_STATEMENT_OF_SERVICE,
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { userCase } = content.additionalData?.req.session;
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, 'cy', cyContent.sectionTitles.aboutYou)],
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
