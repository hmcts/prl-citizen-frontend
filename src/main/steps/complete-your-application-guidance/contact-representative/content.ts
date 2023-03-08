import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Service name',
  title: 'Contact your legal representative',
  paragraph: 'If you have a legal representative and want them to complete the application for you:',
  bulletPoints: [
    'get in touch with your legal representative',
    'ask them what information they need from you to complete the application',
    'ask them to explain the next steps',
  ],
  returnGovUK: 'Return to GOV.UK',
  warningText: {
    text: 'Do not complete the application yourself if you plan to have a legal representative fill it in.',
    iconFallbackText: 'Warning',
  },
});

const cy = () => ({
  serviceName: 'Service name -welsh',
  title: "Cysylltwch â'ch cynrychiolydd cyfreithiol",
  paragraph: " Os oes gennych chi gynrychiolydd cyfreithiol a bod arnoch eisiau iddynt gwblhau'r cais ar eich rhan:",
  returnGovUK: 'Return to GOV.UK -welsh',
  bulletPoints: [
    "Cysylltu â'ch cynrychiolydd cyfreithiol",
    "Gofynnwch iddynt pa wybodaeth sydd ei hangen arnynt i gwblhau'r cais",
    "Gofynnwch iddynt egluro'r camau nesaf",
  ],
  warningText: {
    text: "Cau'r cais",
    iconFallbackText: 'Rhybudd',
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.returnGovUK,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
