import { CaseWithId } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import {
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_START,
} from '../../../../steps/urls';
import { summaryList } from '../../../common/summary/utils';

export const enContent = {
  section: ' ',
  title: 'Check your answers',
  title2: 'International element',
  sectionTitles: {
    respondentAdditionalInformation: 'International elements',
  },
  keys: {},
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  updateUserCaseUrls(userCase, YesOrNo.YES);

  return {
    ...enContent,
    language: content.language,
    sections: [
      summaryList(
        enContent,
        userCase,
        urls,
        enContent.sectionTitles.respondentAdditionalInformation,
        fieldType,
        content.language
      ),
    ],
  };
};

const cyContent: typeof enContent = {
  section: ' ',
  title: 'Check your answers',
  title2: 'International element',
  sectionTitles: {
    respondentAdditionalInformation: 'International elements',
  },
  keys: {},
  errors: {},
};

let urls;

const fieldType = {
  start: 'String',
  parents: 'String',
  jurisdiction: 'String',
  request: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;

  updateUserCaseUrls(userCase, YesOrNo.NO);

  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(
        cyContent,
        userCase,
        urls,
        cyContent.sectionTitles.respondentAdditionalInformation,
        fieldType,
        content.language
      ),
    ],
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

function updateUserCaseUrls(userCase: Partial<CaseWithId>, isEnglish: YesOrNo) {
  urls = {
    start: INTERNATIONAL_FACTORS_START,
    parents: INTERNATIONAL_FACTORS_PARENTS,
    jurisdiction: INTERNATIONAL_FACTORS_JURISDICTION,
    request: INTERNATIONAL_FACTORS_REQUEST,
  };

  if (isEnglish === YesOrNo.YES) {
    enContent.keys = {
      start: "Are the children's lives mainly based outside of England and Wales?",
      parents:
        "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
      jurisdiction:
        'Could another person in the application apply for a similar order in a country outside England or Wales?',
      request: 'Has another country asked (or been asked) for information or help for the children?',
    };

    for (const key in enContent.keys) {
      if (userCase[key] === '') {
        delete enContent.keys[key];
        delete urls[key];
      }
    }
  } else if (isEnglish === YesOrNo.NO) {
    cyContent.keys = {
      start: "Are the children's lives mainly based outside of England and Wales?",
      parents:
        "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
      jurisdiction:
        'Could another person in the application apply for a similar order in a country outside England or Wales?',
      request: 'Has another country asked (or been asked) for information or help for the children?',
    };

    for (const key in cyContent.keys) {
      if (userCase[key] === '') {
        delete cyContent.keys[key];
        delete urls[key];
      }
    }
  }
}
