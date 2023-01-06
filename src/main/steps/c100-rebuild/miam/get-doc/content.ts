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
});

const cy = () => ({
  title: 'Mae arnoch angen cael dogfen gan y cyfryngwr',
  paragraph:
    'Gofynnwch i’r cyfryngwr roi dogfen wedi’i llofnodi i chi sy’n cadarnhau eich bod wedi mynychu MIAM, neu i gadarnhau nad oes angen i chi fynychu.',
  lines: [
    "Bydd angen i chi lwytho'r ddogfen hon i'r cais.",
    'Pan fydd gennych ddogfen gan y cyfryngwr, dewch yn ôl i’r sgrin hon i barhau â’ch cais.',
  ],
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
    classes: 'govuk-button',
  },
  goBack: {
    text: l => l.goBack,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
