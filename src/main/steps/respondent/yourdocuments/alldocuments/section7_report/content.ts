import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { typeofcaseuser } from '../../../../common/typeofcaseuser';
const en = () => {
  return {
    section: 'All documents',
    title: 'Section 7 report',
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    pagetitle: '',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'All documents',
    title: 'Section 7 report',
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    pagetitle: '',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: userCase => {
    return {
      caseNumber: {
        label: l => l.caseNumber + '' + userCase.caseCode,
        type: 'hidden',
        labelHidden: true,
      },
    };
  },
  submit: {
    text: l => l.continue,
    classes: 'govuk-button--secondary',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  const orders: object[] = [];

  return {
    ...translations,
    orders,
  };
};
