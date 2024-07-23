import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getRespondToAohSummary } from '../../../../steps/tasklistresponse/utils';
import { RESPOND_TO_APPLICATION } from '../../../../steps/urls';
import { cy as commonContentCy, en as commonContentEn } from '../../../common/common.content';
import { languages as willingToRespondLanguages } from '../willing-to-respond/content';
import { languages as yourResponseLanguages } from '../your-response/content';

export const en = {
  ...commonContentEn,
  caption: 'Respond to allegations of harm and violence',
  title: 'Check your answers',
  content1: 'Case number:',
  wishToRespondLabel: "Do you wish to respond to the applicant's allegations of harm and violence?",
  responseToAohLabel: yourResponseLanguages.en.responseToAohLabel,
  yes: willingToRespondLanguages.en.yes,
  no: willingToRespondLanguages.en.no,
  submit: 'Submit',
};

export const cy: typeof en = {
  ...commonContentCy,
  caption: 'Ymateb i honiadau o niwed a thrais',
  title: 'Ymateb i’r honiadau',
  content1: 'Rhif yr achos:',
  wishToRespondLabel: 'Ydych chi eisiau ymateb i honiadau o niwed a thrais y ceisydd?',
  responseToAohLabel: yourResponseLanguages.cy.responseToAohLabel,
  yes: willingToRespondLanguages.cy.yes,
  no: willingToRespondLanguages.cy.no,
  submit: 'Cyflwyno',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.submit,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: RESPOND_TO_APPLICATION,
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    itemsToReview: getRespondToAohSummary(content.userCase, translations),
    form,
  };
};
