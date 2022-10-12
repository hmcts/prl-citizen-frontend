import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child arrangements',
  title: 'Do any of the children have a passport?',
  guidanceParentalChildlink: 'https://www.gov.uk/government/collections/child-abduction',
  guidanceParentalChild: 'Guidance on parental child abduction',
  getHelpChildtoReturnlink: 'https://www.gov.uk/return-or-contact-abducted-child',
  getHelpChildtoReturn: 'Get help to return a child from abroad or arrange contact',
  stopChildgettingPassportlink: 'https://www.gov.uk/stop-child-passport',
  stopChildgettingPassport: 'Stop a child from getting a passport',
  caption: 'Safety concerns',
  one: 'Yes',
  two: 'No',
  errors: {
    passportOffice: {
      required: 'Select yes if any of the children have a passport',
    },
  },
});

const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  title: 'Do any of the children have a passport? - welsh',
  guidanceParentalChildlink: 'https://www.gov.uk/government/collections/child-abduction',
  guidanceParentalChild: 'Guidance on parental child abduction',
  getHelpChildtoReturnlink: 'https://www.gov.uk/return-or-contact-abducted-child',
  getHelpChildtoReturn: 'Get help to return a child from abroad or arrange contact',
  stopChildgettingPassportlink: 'https://www.gov.uk/stop-child-passport',
  stopChildgettingPassport: 'Stop a child from getting a passport',
  caption: 'Safety concerns - welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    passportOffice: {
      required: 'Select yes if any of the children have a passport - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    passportOffice: {
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
