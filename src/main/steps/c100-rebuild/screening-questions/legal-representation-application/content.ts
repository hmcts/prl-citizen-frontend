/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Do you want your legal representative to complete the application for you?',
  one: 'Yes',
  two: 'No',
  errors: {
    sq_legalRepresentationApplication: {
      required: 'Select yes if you want your legal representative to complete this application',
    },
  },
});

export const cy = () => ({
  title: " Ydych chi eisiau i'ch cynrychiolydd cyfreithiol lenwi'r cais ar eich rhan?",
  one: 'Ydw',
  two: 'Nac ydw',
  errors: {
    sq_legalRepresentationApplication: {
      required: "Dewiswch ‘ydw’ os ydych am i'ch cynrychiolydd cyfreithiol lenwi'r cais hwn",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    sq_legalRepresentationApplication: {
      type: 'radios',
      classes: 'govuk-radios',
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
