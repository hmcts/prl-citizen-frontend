import { CaseWithId } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';
import { CONSENT_TO_APPLICATION } from '../../../../steps/urls';
import { summaryList } from '../../../common/summary/utils';

const urls = {
  doYouConsent: CONSENT_TO_APPLICATION,
  reasonForNotConsenting: CONSENT_TO_APPLICATION,
  applicationReceivedDate: CONSENT_TO_APPLICATION,
  courtPermission: CONSENT_TO_APPLICATION,
  courtOrderDetails: CONSENT_TO_APPLICATION,
};

export const enContent = {
  section: 'Check your answers',
  title: 'Your consent to the application',
  sectionTitles: {
    consentDetails: '',
  },
  keys: {
    doYouConsent: 'Do you provide your consent to the application?',
    reasonForNotConsenting: 'Give your reasons for not consenting to the application.',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Is the applicant required to seek permission from the court before making applications?',
    courtOrderDetails: 'Provide details of the court order in place.',
  },
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  preprocess(userCase);
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, enContent.sectionTitles.consentDetails, content.language)],
  };
};

const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: 'Your consent to the application',
  sectionTitles: {
    consentDetails: '',
  },
  keys: {
    doYouConsent: 'A ydych chi’n cydsynio i’r cais?',
    reasonForNotConsenting: 'Give your reasons for not consenting to the application. (welsh)',
    applicationReceivedDate: "Pryd gawsoch chi'r cais?",
    courtPermission: "A oes angen i'r ceisydd ofyn am ganiatâd gan y llys cyn gwneud ceisiadau?",
    courtOrderDetails: 'Provide details of the court order in place. (welsh)',
  },
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  preprocess(userCase);
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, cyContent.sectionTitles.consentDetails, content.language)],
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
function preprocess(userCase: Partial<CaseWithId>) {
  if (userCase.doYouConsent === YesOrNo.YES) {
    userCase.reasonForNotConsenting = '';
  }
  if (userCase.courtPermission === YesOrNo.NO) {
    userCase.courtOrderDetails = '';
  }
}
