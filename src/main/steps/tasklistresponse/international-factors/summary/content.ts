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
  title: 'Check your answers',
  sectionTitles: {
    respondentAdditionalInformation: 'International elements',
  },
  keys: {
    start: "Are the children's lives mainly based outside of England and Wales?",
    iFactorsStartProvideDetails: 'Provide details',
    parents:
      "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
    iFactorsParentsProvideDetails: 'Provide details',
    jurisdiction:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    iFactorsJurisdictionProvideDetails: 'Provide details',
    request: 'Has another country asked (or been asked) for information or help for the children?',
    iFactorsRequestProvideDetails: 'Provide details',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  updateUserCaseUrls(userCase);
  return {
    ...enContent,
    language: content.language,
    sections: [
      summaryList(enContent, userCase, urls, enContent.sectionTitles.respondentAdditionalInformation, content.language),
    ],
  };
};

const cyContent: typeof enContent = {
  title: 'Gwirio eich atebion',
  sectionTitles: {
    respondentAdditionalInformation: 'Elfennau rhyngwladol',
  },
  keys: {
    start: 'Ydy bywyd y plant yn cael ei dreulio’n bennaf y tu allan i Gymru a Lloegr?',
    iFactorsStartProvideDetails: 'Rhowch fanylion',
    parents:
      "A yw rhieni'r plant (neu unrhyw un o bwys i'r plant) wedi'u lleoli y tu allan i Gymru a Lloegr yn bennaf?",
    iFactorsParentsProvideDetails: 'Rhowch fanylion',
    request: "A oes gwlad arall wedi gofyn (neu wedi cael cais) am wybodaeth neu gymorth i'r plant?",
    iFactorsJurisdictionProvideDetails: 'Rhowch fanylion',
    jurisdiction:
      'A allai rhywun arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr?',
    iFactorsRequestProvideDetails: 'Rhowch fanylion',
  },
  errors: {},
};

const urls = {
  start: INTERNATIONAL_FACTORS_START,
  iFactorsStartProvideDetails: INTERNATIONAL_FACTORS_START,
  parents: INTERNATIONAL_FACTORS_PARENTS,
  iFactorsParentsProvideDetails: INTERNATIONAL_FACTORS_PARENTS,
  jurisdiction: INTERNATIONAL_FACTORS_JURISDICTION,
  iFactorsJurisdictionProvideDetails: INTERNATIONAL_FACTORS_JURISDICTION,
  request: INTERNATIONAL_FACTORS_REQUEST,
  iFactorsRequestProvideDetails: INTERNATIONAL_FACTORS_REQUEST,
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  updateUserCaseUrls(userCase);

  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(cyContent, userCase, urls, cyContent.sectionTitles.respondentAdditionalInformation, content.language),
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

function updateUserCaseUrls(userCase: Partial<CaseWithId>) {
  if (userCase.start?.includes(YesOrNo.NO)) {
    userCase.iFactorsStartProvideDetails = '';
  }
  if (userCase.parents?.includes(YesOrNo.NO)) {
    userCase.iFactorsParentsProvideDetails = '';
  }
  if (userCase.jurisdiction?.includes(YesOrNo.NO)) {
    userCase.iFactorsJurisdictionProvideDetails = '';
  }
  if (userCase.request?.includes(YesOrNo.NO)) {
    userCase.iFactorsRequestProvideDetails = '';
  }
}
