import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent } from '../../../../steps/common/common.content';
import { summaryList } from '../../../../steps/common/support-you-need-during-case/summary/utils';
import { APPLICANT_STATEMENT_OF_SERVICE } from '../../../../steps/urls';

export const enContent = {
  section: 'Check your answers',
  title: ' ',
  sectionTitles: {
    aboutYou: ' ',
  },
  keys: {
    partiesServed: 'who was served?',
    partiesServedDate: 'When were they served?',
  },
  statementOfTruth: 'Statement of truth',
  confirmation:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  consent: 'I believe that the facts stated in this application are true',
  errors: {},
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  const userCase = content.additionalData?.req.session.userCase;
  return {
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, 'en', enContent.sectionTitles.aboutYou)],
    ...enContent,
  };
};

const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: ' ',
  sectionTitles: {
    aboutYou: ' ',
  },
  keys: {
    partiesServed: 'who was served?',
    partiesServedDate: 'When were they served?',
  },
  statementOfTruth: 'Statement of truth',
  confirmation:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  consent: 'I believe that the facts stated in this application are true',
  errors: {},
};

const urls = {
  whowasserved: APPLICANT_STATEMENT_OF_SERVICE,
  servedDate: APPLICANT_STATEMENT_OF_SERVICE,
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { userCase } = content.additionalData?.req.session;
  return {
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, 'cy', cyContent.sectionTitles.aboutYou)],
    ...cyContent,
  };
};

export const form: FormContent = {
  fields: {
    sosConsent: {
      type: 'checkboxes',
      labelHidden: true,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'sosConsent',
          label: l => l.consent,
          value: 'true',
        },
      ],
    },
    submit: {
      label: l => l.continue,
    },
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
