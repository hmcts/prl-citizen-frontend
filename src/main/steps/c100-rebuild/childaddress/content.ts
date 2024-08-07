/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Where do the children live?',
  paragraph1: 'Please tell us the postcode of the children you’re making this application about.',
  paragraph2: `This information will be used to identify which court will handle your application.
                If the children have a different postcode, enter the one that is most 
                convenient to most children in the application.`,
  warningText: {
    text: `You should only enter your own postcode if the children live with you at the address,
          or you don't know where the children are living.`,
    iconFallbackText: 'Warning',
  },
  postcodeLabel: 'Postcode',
  detailsLabel: "Why we use the term 'children'",
  detailsContent: `We use ‘children’ as a general term to mean whether you have a child or children.
                   We do this to avoid repetition.`,
  errors: {
    c100RebuildChildPostCode: {
      required: 'Enter a full postcode, with or without a space',
      invalid: 'Enter a valid full postcode, with or without a space',
      generic: 'Sorry there is a problem, Please try again',
    },
  },
});

export const cy = () => ({
  title: "Ble mae'r plant yn byw?",
  paragraph1: "Dywedwch wrthym beth yw cod post y plant y mae'r cais hwn yn ymwneud â nhw.",
  paragraph2:
    "Bydd yr wybodaeth hon yn cael ei defnyddio i nodi pa lys fydd yn delio a’ch cais. Os oes gan y plant god post gwahanol, nodwch yr un sydd fwyaf cyfleus i'r rhan fwyaf o'r plant yn y cais.",
  warningText: {
    text: "Dim ond os yw'r plant yn byw gyda chi yn eich cyfeiriad y dylech nodi eich cod post eich hun, neu os nad ydych chi'n gwybod ble mae'r plant yn byw.",
    iconFallbackText: 'Rhybudd',
  },
  postcodeLabel: 'Cod post',
  detailsLabel: "Pam rydyn ni'n defnyddio'r term 'plant'",
  detailsContent:
    "Rydym yn defnyddio 'plant' fel term cyffredinol i gyfeirio at blentyn neu blant. Rydyn ni'n gwneud hyn er mwyn osgoi ailadrodd.",
  errors: {
    c100RebuildChildPostCode: {
      required: 'Rhowch god post llawn, gyda neu heb fwlch yn y canol',
      invalid: 'Rhowch god post llawn dilys, gyda neu heb fwlch yn y canol',
      generic: 'Sorry there is a problem, Please try again - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c100RebuildChildPostCode: {
      id: 'c100RebuildChildPostCode',
      type: 'text',
      classes: 'govuk-input--width-10',
      label: l => l.postcodeLabel,
      labelSize: null,
      section: l => l.section,
      validator: value => isFieldFilledIn(value) || isInvalidPostcode(value),
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
