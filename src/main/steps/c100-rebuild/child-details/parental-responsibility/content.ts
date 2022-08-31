import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
//import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Parental responsibility for',
  labelText: 'State everyone who has parental responsibility for  and how they have parental responsibility.',
  hintText: `<p>For example 'child's mother', or 'child's father who was married to the mother when the child was born.</p>
 <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p>`,
  errors: {
    parentalResponsibility: {
      required: 'Enter an answer',
    },
  },
});

const cy = () => ({
  pageTitle: 'Parental responsibility for  - welsh',
  labelText: 'State everyone who has parental responsibility for  and how they have parental responsibility. - welsh',
  hintText: `<p>For example 'child's mother', or 'child's father who was married to the mother when the child was born.</p>
  <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p> - welsh`,
  errors: {
    parentalResponsibility: {
      required: 'Enter an answer  - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
