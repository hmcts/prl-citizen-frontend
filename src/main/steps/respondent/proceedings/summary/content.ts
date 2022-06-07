import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { PROCEEDINGS_COURT_PROCEEDINGS, PROCEEDINGS_START } from '../../../../steps/urls';
import { summaryList } from '../../../common/summary/utils';

export const enContent = {
  section: 'Check your details',
  title: 'Current or previous court cases',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case?',
    proceedingsStartOrder: 'Have you had a court order made for your protection?',
    emergencyOrderOptions: 'Emergency Protection Order',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls)],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your details',
  title: 'Current or previous court cases',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case?',
    proceedingsStartOrder: 'Have you had a court order made for your protection?',
    emergencyOrderOptions: 'Emergency Protection Order',
  },
  errors: {},
};

const urls = {
  proceedingsStart: PROCEEDINGS_START,
  proceedingsStartOrder: PROCEEDINGS_START,
  emergencyOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, 'applicationDetails')],
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
