import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn } from '../../../app/form/validation';

//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child arrangements',
  headingTitle: 'How would you like to submit your application to court?',
  paragraph1:
    'Your completed application can be sent straight to the court electronically, or you can print it and send it by post if you prefer.',
  submitElectronically: 'Submit electronically',
  sendByPost: 'Print and send by post',
  emailTitle: 'Enter an email address if you would like to get a confirmation',
  errors: {
    documentSubmission: {
      required: 'Select yes if you want to submit your application to the court electronically',
    },
    emailAddress: {
      invalid: 'Provide a valid email address',
    },
  },
});

const cy = () => ({
  serviceName: 'Trefniadau plant',
  headingTitle: 'Sut hoffech chi gyflwyno eich cais i’r llys?',
  paragraph1:
    'Gallwch anfon y cais yn syth i’r llys yn electronig, neu gallwch ei argraffu a’i anfon drwy’r post os yw’n well gennych wneud hynny.',
  submitElectronically: 'Cyflwyno’n electronig',
  sendByPost: 'Argraffu ac anfon drwy’r post',
  emailTitle: "Nodwch gyfeiriad e-bost os hoffech i'r llys anfon cadarnhad atoch",
  errors: {
    documentSubmission: {
      required: "Dewiswch 'ydw' os ydych am gyflwyno eich cais i’r llys yn electronig",
    },
    emailAddress: {
      invalid: 'Darparwch gyfeiriad e-bost dilys',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    documentSubmission: {
      id: 'documentSubmission',
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.submitElectronically,
          value: 'submitElectronically',
          subFields: {
            emailAddress: {
              classes: 'govuk-!-width-one-half',
              type: 'text',
              label: l => l.emailTitle,
              labelSize: null,
              //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
              validator: (value): void | string => {
                return isFieldFilledIn(value) !== 'required' ? isEmailValid(value) : '';
              },
            },
          },
        },
        {
          label: l => l.sendByPost,
          value: 'sendByPost',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
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
