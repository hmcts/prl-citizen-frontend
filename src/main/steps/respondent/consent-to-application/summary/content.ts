import { CONSENT_TO_APPLICATION} from '../../../../steps/urls';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';

import {
  summaryList,
} from '../../../common/summary/utils';

const urls = {
  doYouConsent: CONSENT_TO_APPLICATION,
  applicationReceivedDate: CONSENT_TO_APPLICATION,
  courtPermission: CONSENT_TO_APPLICATION,
};

const fieldType = {
  doYouConsent: 'String',
  applicationReceivedDate: 'Date',
  courtPermission: 'String',
};

export const enContent = {
  section: 'Check your answers',
  title: 'Your consent to the application',
  sectionTitles: {
    consentDetails: 'Your consent to the application',
  },
  keys: {
    doYouConsent:"Do you provide your consent to the application?",
    applicationReceivedDate:"When did you receive the application?",
    courtPermission:"Is the applicant required to seek permission from the court before making applications?"
  },
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...enContent,
    language: content.language,
    sections: [
      summaryList(enContent, userCase, urls, 'consentDetails', fieldType, content.language),
    ],
  };
};

const cyContent: typeof enContent = {
    section: 'Check your answers',
    title: 'Your consent to the application',
    sectionTitles: {
        consentDetails: 'Your consent to the application',
    },
    keys: {
      doYouConsent:"Do you provide your consent to the application?",
      applicationReceivedDate:"When did you receive the application?",
      courtPermission:"Is the applicant required to seek permission from the court before making applications?"
    },
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(cyContent, userCase, urls, 'consentDetails'),
    ],
  };
};

export const form: FormContent = {
  fields: {
  
  },
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
