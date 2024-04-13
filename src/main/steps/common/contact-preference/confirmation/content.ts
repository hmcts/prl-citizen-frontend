/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars*/
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { interpolate } from '../../string-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number {caseNumber}',
  title: 'Contact preferences updated',
  emailText: 'You will receive digital updates about the case.',
  postText: 'You will receive updates on the case by post.',
  continue: 'Continue',
  warningText: "If you cannot find the emails in your inbox, check your 'spam' folder.",
});

export const cy = () => ({
  caption: 'Rhif yr achos {caseNumber}',
  title: 'Dewisiadau cyswllt wedi’u diweddaru',
  emailText: 'Byddwch yn cael diweddariadau digidol am yr achos',
  postText: 'Byddwch yn cael diweddariadau am yr achos drwy’r post.',
  continue: 'Parhau',
  warningText: "Os na allwch weld y negeseuon e-bost yn eich mewnflwch, gwiriwch eich ffolder 'spam'.",
});

const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateFormFields = (): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {};

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const { fields } = generateFormFields();
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const caseNumber = content.userCase?.id!;

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
    contactPreference: content.additionalData?.req.session.userCase.partyContactPreference,
  };
};
