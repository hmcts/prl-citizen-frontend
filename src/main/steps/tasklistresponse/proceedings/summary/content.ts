import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { PastAndCurrentProceedings } from '../mainUtils';
import { otherProceedingsContents } from '../proceedingUtils';

export const enContent = {
  serviceName: 'Check your answers ',
  section: '',
  title: 'Check your answers',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Save and continue',
  Yes: 'Yes',
  No: 'No ',
  errors: {},
  sectionTitles: {
    otherProceedings: 'Current or previous proceedings',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case?',
    proceedingsStartOrder: 'Have you had a court order made for your protection?',
  },
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  const sections = [PastAndCurrentProceedings(enContent, userCase)];
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

export const cyContent: typeof enContent = {
  serviceName: 'Check your answers -welsh ',
  section: '',
  title: 'Check your answers -welsh ',
  change: 'Edit -welsh ',
  topWarning: 'Your answers will be shared with the other people in this case. -welsh ',
  makingSure: 'Please review your answers before you finish your application. -welsh ',
  continue: 'Save and continue -welsh ',
  Yes: 'Yes -welsh ',
  No: 'No  -welsh ',
  errors: {},
  sectionTitles: {
    otherProceedings: 'Current or previous proceedings -welsh ',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case? -welsh ',
    proceedingsStartOrder: 'Have you had a court order made for your protection? -welsh ',
  },
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const sections = [PastAndCurrentProceedings(cyContent, userCase)];
  return {
    ...cyContent,
    language: content.language,
    sections,
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
  const newContents = content['language'] === 'en' ? enContent : cyContent;
  newContents['keys'] = {
    ...newContents.keys,
    ...otherProceedingsContents(content['language']),
  };
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
