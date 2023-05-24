import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  section: 'What to do next',
  title: 'Complete your application using a paper form',
  subtitle: "you can do this using a child arrangements application form (also known as 'Form C100').",
  giveDetails:
    "See <a href='https://www.gov.uk/government/publications/form-c100-application-under-the-children-act-1989-for-a-child-arrangements-prohibited-steps-specific-issue-section-8-order-or-to-vary-or-discharge' class='govuk-link' rel='external' target='_blank'>Form C100 on GOV.UK</a>. Download the from and fill in your details.",
  returnToGOVUK: 'Return to GOV.UK',
});

const cy = () => ({
  section: 'What to do next -welsh',
  title: 'Complete your application using a paper form -welsh',
  subtitle: "you can do this using a child arrangements application form (also known as 'Form C100'). -welsh",
  giveDetails:
    "See <a href='https://www.gov.uk/government/publications/form-c100-application-under-the-children-act-1989-for-a-child-arrangements-prohibited-steps-specific-issue-section-8-order-or-to-vary-or-discharge' class='govuk-link' rel='external' target='_blank'>Form C100 on GOV.UK</a>. Download the from and fill in your details. -welsh",
  returnToGOVUK: 'Return to GOV.UK -welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  link: {
    classes: 'govuk-button',
    href: 'https://www.gov.uk/',
    text: l => l.returnToGOVUK,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
