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
    respondentAdditionalInformation: 'Additional information',
  },
  keys: {
    start: 'Do the children live outside of England or Wales?',
    iFactorsStartProvideDetails: 'Provide details',
    parents: "Do the children's parents or anyone significant to the children live outside of England or Wales?",
    iFactorsParentsProvideDetails: 'Provide details',
    jurisdiction:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    iFactorsJurisdictionProvideDetails: 'Provide details',
    request: 'Has another country asked (or been asked) for information or help for the children?',
    iFactorsRequestProvideDetails: 'Provide details',
  },
  dependencies: {
    iFactorsStartProvideDetails: {
      dependantOn: 'start',
      value: 'Yes',
      display: true,
    },
    iFactorsParentsProvideDetails: {
      dependantOn: 'parents',
      value: 'Yes',
      display: true,
    },
    iFactorsJurisdictionProvideDetails: {
      dependantOn: 'jurisdiction',
      value: 'Yes',
      display: true,
    },
    iFactorsRequestProvideDetails: {
      dependantOn: 'request',
      value: 'Yes',
      display: true,
    },
  },
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  updateUserCaseUrls(userCase);
  //updateUserCase(userCase);

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
    respondentAdditionalInformation: 'Additional information',
  },
  keys: {
    start: 'Do the children live outside of England or Wales?',
    iFactorsStartProvideDetails: 'Provide details',
    parents: "Do the children's parents or anyone significant to the children live outside of England or Wales?",
    iFactorsParentsProvideDetails: 'Provide details',
    jurisdiction:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    iFactorsJurisdictionProvideDetails: 'Provide details',
    request: 'Has another country asked (or been asked) for information or help for the children?',
    iFactorsRequestProvideDetails: 'Provide details',
  },
  dependencies: {
    iFactorsStartProvideDetails: {
      dependantOn: 'start',
      value: 'Yes',
      display: true,
    },
    iFactorsParentsProvideDetails: {
      dependantOn: 'parents',
      value: 'Yes',
      display: true,
    },
    iFactorsJurisdictionProvideDetails: {
      dependantOn: 'jurisdiction',
      value: 'Yes',
      display: true,
    },
    iFactorsRequestProvideDetails: {
      dependantOn: 'request',
      value: 'Yes',
      display: true,
    },
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

const fieldType = {
  start: 'String',
  iFactorsStartProvideDetails: 'String',
  parents: 'String',
  iFactorsParentsProvideDetails: 'String',
  jurisdiction: 'String',
  iFactorsJurisdictionProvideDetails: 'String',
  request: 'String',
  iFactorsRequestProvideDetails: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;

  updateUserCaseUrls(userCase);

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

function updateUserCaseUrls(userCase: Partial<CaseWithId>) {
  if (userCase.start === YesOrNo.NO) {
    userCase.iFactorsStartProvideDetails = '';
  }
  if (userCase.parents === YesOrNo.NO) {
    userCase.iFactorsParentsProvideDetails = '';
  }
  if (userCase.jurisdiction === YesOrNo.NO) {
    userCase.iFactorsJurisdictionProvideDetails = '';
  }
  if (userCase.request === YesOrNo.NO) {
    userCase.iFactorsRequestProvideDetails = '';
  }

  for (const key in enContent.keys) {
    if (userCase[key] === '') {
      delete enContent.keys[key];
      delete urls[key];
    }
  }

  // for (const key in enContent.keys) {
  //  if(enContent?.keys[key]?.includes('Provide details')){
  //     enContent.keys[key] === '';
  //   }
  // }
}
// function updateUserCase(userCase: Partial<CaseWithId>) {
//   Object.assign(urls, { start: INTERNATIONAL_FACTORS_START });
//   Object.assign(fieldType, { start: 'String' });
//   if (userCase.start === YesOrNo.YES) {
//     Object.assign(enContent.keys, { iFactorsStartProvideDetails: 'Provide details' });
//     Object.assign(urls, { iFactorsStartProvideDetails: INTERNATIONAL_FACTORS_START });
//     Object.assign(fieldType, { iFactorsStartProvideDetails: 'String' });
//   }
//   Object.assign(urls, { parents: INTERNATIONAL_FACTORS_PARENTS });
//   Object.assign(fieldType, { parents: 'String' });
//   if (userCase.parents === YesOrNo.YES) {
//     Object.assign(enContent.keys, { iFactorsParentsProvideDetails: 'Provide details' });
//     Object.assign(urls, { iFactorsParentsProvideDetails: INTERNATIONAL_FACTORS_PARENTS });
//     Object.assign(fieldType, { iFactorsParentsProvideDetails: 'String' });
//   }
//   Object.assign(urls, { jurisdiction: INTERNATIONAL_FACTORS_JURISDICTION });
//   Object.assign(fieldType, { jurisdiction: 'String' });
//   if (userCase.jurisdiction === YesOrNo.YES) {
//     Object.assign(enContent.keys, { iFactorsJurisdictionProvideDetails: 'Provide details' });
//     Object.assign(urls, { iFactorsJurisdictionProvideDetails: INTERNATIONAL_FACTORS_JURISDICTION });
//     Object.assign(fieldType, { iFactorsJurisdictionProvideDetails: 'String' });
//   }
//   Object.assign(urls, { request: INTERNATIONAL_FACTORS_REQUEST });
//   Object.assign(fieldType, { request: 'String' });
//   if (userCase.request === YesOrNo.YES) {
//     Object.assign(enContent.keys, { iFactorsRequestProvideDetails: 'Provide details' });
//     Object.assign(urls, { iFactorsRequestProvideDetails: INTERNATIONAL_FACTORS_REQUEST });
//     Object.assign(fieldType, { iFactorsRequestProvideDetails: 'String' });
//   }
// }
