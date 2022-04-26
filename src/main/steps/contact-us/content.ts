import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Adoption',
  email: 'Email',
  emailAddress:
    'Email us at <a href="mailto:privatelawproject@justice.gov.uk" class="govuk-link">privatelawproject@justice.gov.uk.</a>',
};

const cy: typeof en = {
  title: 'Mabwysiadu',
  email: 'E-bost',
  emailAddress:
    'Anfonwch neges e-bost i <a href="mailto:privatelawproject@justice.gov.uk" class="govuk-link">privatelawproject@justice.gov.uk.</a>',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
