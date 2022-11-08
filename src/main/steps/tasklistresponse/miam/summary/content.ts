import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { MIAM_ATTEND_WILLINGNESS, MIAM_START } from '../../../../steps/urls';
import { summaryList } from '../../../common/summary/utils';

export const enContent = {
  section: 'Check your answers',
  title: 'Mediation Information and Assessment Meeting (MIAM) attendance',
  sectionTitles: {
    MIAMDetails: '',
  },
  keys: {},
  errors: {},
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;

  updateContent(enContent, userCase, urls);

  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, '', fieldType, content.language)],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your answers',
  title: 'Mediation Information and Assessment Meeting (MIAM) attendance',
  sectionTitles: {
    MIAMDetails: '',
  },
  keys: {},
  errors: {},
};

const urls = {};

const fieldType = {
  miamStart: 'String',
  miamWillingness: 'String',
  miamNotWillingExplnation: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;

  updateContent(cyContent, userCase, urls);

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

function updateContent(enContentTemp, userCaseTemp, urlsTemp) {
  if (userCaseTemp.miamStart === 'Yes') {
    clearObject(enContentTemp.keys, urlsTemp);
    addMIAMStart(enContentTemp, urlsTemp);
  } else if (userCaseTemp.miamStart === 'No') {
    if (userCaseTemp.miamWillingness === 'Yes') {
      clearObject(enContentTemp.keys, urlsTemp);
      addMIAMStart(enContentTemp, urlsTemp);
      addMIAMWillingness(enContentTemp, urlsTemp);
    } else if (userCaseTemp.miamWillingness === 'No') {
      clearObject(enContentTemp.keys, urlsTemp);
      addMIAMStart(enContentTemp, urlsTemp);
      addMIAMWillingness(enContentTemp, urlsTemp);
      addMIAMNotWillingExplnation(enContentTemp, urlsTemp);
    }
  }
}
function addMIAMWillingness(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { miamWillingness: 'Would you be willing to attend a MIAM?' });
  Object.assign(urlstemp, { miamWillingness: MIAM_ATTEND_WILLINGNESS });
}

function addMIAMNotWillingExplnation(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM?' });
  Object.assign(urlstemp, { miamNotWillingExplnation: MIAM_ATTEND_WILLINGNESS });
}

function addMIAMStart(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { miamStart: 'Have you attended a MIAM?' });
  Object.assign(urlstemp, { miamStart: MIAM_START });
}

function clearObject(enContenttemp, urlstemp) {
  for (const key in enContenttemp) {
    delete enContenttemp[key];
  }
  for (const key in urlstemp) {
    delete urlstemp[key];
  }
}
