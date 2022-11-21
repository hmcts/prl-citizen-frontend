/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child arrangements',
  title: 'Is there anyone else who should know about your application?',
  paragraph: 'For example, you should tell everyone who:',
  bulletPoints: [
    "Cares for the children (but is not their parent), including social services if the children are in local authority accommodation (such as foster care or a children's home)",
    'Is currently involved in another court case or named in a current court order that concerns the children and is relevant to this application',
    'The child has lived with for at least 3 years prior to this application',
  ],
  one: 'Yes',
  two: 'No',
  errors: {
    oprs_otherPersonCheck: {
      required: 'Select yes if anyone else should know about the application',
    },
  },
});

export const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  title: 'Is there anyone else who should know about your application? - welsh',
  paragraph: 'For example, you should tell everyone who: - welsh',
  bulletPoints: [
    "Cares for the children (but is not their parent), including social services if the children are in local authority accommodation (such as foster care or a children's home) -",
    'Is currently involved in another court case or named in a current court order that concerns the children and is relevant to this application -',
    'The child has lived with for at least 3 years prior to this application -',
  ],
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    oprs_otherPersonCheck: {
      required: 'Select yes if anyone else should know about the application - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    oprs_otherPersonCheck: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
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
