import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = () => ({
  serviceName: 'Child arrangements',
  title: 'Will you be using a legal representative in these proceedings?',
  one: 'Yes',
  two: 'No',
  findLegalRepresentationLabel: 'Find legal representation',
  findLegalRepresentationLink: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
  legalAidLabel: 'Do you need legal aid?',
  legalAidLink: 'https://www.gov.uk/legal-aid',
  errors: {
    sq_legalRepresentation: {
      required: 'Select yes if you will be using a legal representative in these proceedings',
    },
  },
});

const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  title: 'Will you be using a legal representative in these proceedings? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  findLegalRepresentationLabel: 'Find legal representation - welsh',
  findLegalRepresentationLink: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
  legalAidLabel: 'Do you need legal aid? - welsh',
  legalAidLink: 'https://www.gov.uk/legal-aid',
  errors: {
    sq_legalRepresentation: {
      required: 'Select yes if you will be using a legal representative in these proceedings - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    sq_legalRepresentation: {
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
