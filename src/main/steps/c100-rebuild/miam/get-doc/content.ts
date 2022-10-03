import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = () => ({
  title: 'You need to get a document from the mediator',
  paragraph:
    'Ask the mediator to give you a signed document that confirms you attended a MIAM, or did not need to attend.',
  lines: [
    'You will need to upload this document to the application.',
    'When you have a document from the mediator, come back to this screen to proceed with your application.',
  ],
  btnText: 'Save and come back later',
  btnLinkText: 'Go back',
});

const cy = () => ({
  title: 'You need to get a document from the mediator - welsh',
  paragraph:
    'Ask the mediator to give you a signed document that confirms you attended a MIAM, or did not need to attend. - welsh',
  lines: [
    'You will need to upload this document to the application. - welsh',
    'When you have a document from the mediator, come back to this screen to proceed with your application. - welsh',
  ],
  btnText: 'Save and come back later - welsh',
  btnLinkText: 'Go back - welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
  submit: {
    text: l => l.onlycontinue,
    classes: 'govuk-button--secondary',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
