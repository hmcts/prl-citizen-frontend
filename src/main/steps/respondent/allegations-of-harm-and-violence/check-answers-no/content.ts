import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { summaryList } from '../../../common/summary/utils';

export const enContent = {
  section: 'Check your answers',
  title: 'Safety concerns',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    yourchildconcernsstart: 'Do you have any concerns for your safety or the safety of the children?',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, '', fieldType, content.language)],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your answers',
  title: 'Safety concerns',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    yourchildconcernsstart: 'Do you have any concerns for your safety or the safety of the children?',
  },
  errors: {},
};

const urls = {
  yourchildconcernsstart: 'your-or-child-safety-concerns',
};
const fieldType = {
  yourchildconcernsstart: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  //userCase.citizenUserDateOfBirthText = getFormattedDate(userCase.citizenUserDateOfBirth);
  //console.log("userCase.citizenUserDateOfBirthText====>"+userCase.citizenUserDateOfBirthText);
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
