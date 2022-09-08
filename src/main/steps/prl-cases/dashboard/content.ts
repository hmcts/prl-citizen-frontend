import { CaseWithId } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { summaryCaseList } from '../../common/summary/utils';
//import { summaryCaseList } from './utils';

export const enContent = {
  title: 'Welcome to Citizen dashboard',
  sectionTitles: {
    yourCAapplication: 'CA Applications made by you',
    daApplicationsAgainstYou: 'DA Applications made against you',
  },
  keys: {},
  errors: {},
};

const en = (content: CommonContent) => {
  const userCaseList: Partial<CaseWithId>[] = content.userCaseList || [];
  const c100CaseList: Partial<CaseWithId>[] = [];
  const fl401CaseList: Partial<CaseWithId>[] = [];
  for (const userCase of userCaseList || []) {
    if (userCase.caseTypeOfApplication === 'C100') {
      c100CaseList.push(userCase);
    } else if (userCase.caseTypeOfApplication === 'FL401') {
      fl401CaseList.push(userCase);
    }
  }
  return {
    title: enContent.title,
    sections: [
      summaryCaseList(c100CaseList, enContent.sectionTitles.yourCAapplication),
      summaryCaseList(fl401CaseList, enContent.sectionTitles.daApplicationsAgainstYou),
    ],
  };
};

const cy = () => ({
  title: 'Welcome to Citizen dashboard(welsh)',
  section: 'C100 applications(welsh)',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
