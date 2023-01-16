import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { typeofcaseuser } from '../../../steps/typeofcaseuserutil';
const en = () => {
  return {
    section: 'All documents',
    title: 'Orders from the court',
    summaryText: 'Contacts for help',
    pagetitle: '',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'All documents',
    title: 'Orders from the court',
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
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
