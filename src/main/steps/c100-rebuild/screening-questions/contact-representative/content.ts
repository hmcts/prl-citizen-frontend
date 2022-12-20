import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child arrangements',
  title: 'Contact your legal representative',
  paragraph: 'If you have a legal representative and want them to complete the application for you:',
  bulletPoints: [
    'get in touch with your legal representative',
    'ask them what information they need from you to complete the application',
    'ask them to explain the next steps',
  ],
  closeApplication: 'Close the application',
  warningText: {
    text: 'Do not complete the application yourself if you plan to have a legal representative fill it in.',
    iconFallbackText: 'Warning',
  },
});

const cy = () => ({
  serviceName: 'Trefniadau plant',
  title: 'Contact your legal representative - welsh',
  paragraph: 'If you have a legal representative and want them to complete the application for you: - welsh',
  closeApplication: 'Close the application - welsh',
  bulletPoints: [
    'get in touch with your legal representative - welsh',
    'ask them what information they need from you to complete the application - welsh',
    'ask them to explain the next steps - welsh',
  ],
  warningText: {
    text: 'Do not complete the application yourself if you plan to have a legal representative fill it in. - welsh',
    iconFallbackText: 'Warning',
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.closeApplication,
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
