/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

export const en = () => ({
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

export const cy = () => ({
  serviceName: 'Trefniadau plant',
  title: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
  one: 'Byddaf',
  two: 'Na fyddaf',
  findLegalRepresentationLabel: 'Dod o hyd i gynrychiolydd cyfreithiol',
  findLegalRepresentationLink: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
  legalAidLabel: 'A oes arnoch chi angen cymorth cyfreithiol?',
  legalAidLink: 'https://www.gov.uk/legal-aid',
  errors: {
    sq_legalRepresentation: {
      required: 'Dewiswch ‘byddaf’ os byddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn',
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
