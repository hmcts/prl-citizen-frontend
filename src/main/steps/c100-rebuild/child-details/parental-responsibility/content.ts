import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Parental responsibility for',
  pageHeadline: 'State everyone who has parental responsibility for and how they have parental responsibility.',
  pageHint: 'For example childs mother, or childs father who was married to the mother when the child was born.',
  linkText: 'See section E of leaflet CB1 for more information',
  urlHref: 'https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1',
});

const cy = () => ({
  pageTitle: 'Parental responsibility for',
  pageHeadline: 'State everyone who has parental responsibility for and how they have parental responsibility.',
  pageHint: 'For example childs mother, or childs father who was married to the mother when the child was born.',
  linkText: 'See section E of leaflet CB1 for more information',
  urlHref: 'https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
