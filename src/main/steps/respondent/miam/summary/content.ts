import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { MIAM_ATTEND_WILLINGNESS, MIAM_START } from '../../../../steps/urls';
import { summaryList } from '../../../common/summary/utils';

export const enContent = {
  section: 'Check your answers',
  title: 'Mediation Information and Assessment Meeting (MIAM) attendance',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    miamStart: 'Have you attended a MIAM?',
    miamWillingness: 'Would you be willing to attend a MIAM?',
    miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, 'applicationDetails', fieldType, content.language)],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your answers',
  title: 'Mediation Information and Assessment Meeting (MIAM) attendance',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    miamStart: 'Have you attended a MIAM?',
    miamWillingness: 'Would you be willing to attend a MIAM?',
    miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM',
  },
  errors: {},
};

const urls = {
  miamStart: MIAM_START,
  miamWillingness: MIAM_ATTEND_WILLINGNESS,
  miamNotWillingExplnation: MIAM_ATTEND_WILLINGNESS,
};

const fieldType = {
  miamStart: 'String',
  miamWillingness: 'String',
  miamNotWillingExplnation: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, 'applicationDetails', fieldType, content.language)],
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
