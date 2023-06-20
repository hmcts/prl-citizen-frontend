import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Will you be using a legal representative in these proceedings?',
  yes: 'Yes',
  no: 'No',
  cancel: 'Cancel',
  errors: {
    legalRepresentativeForProceedings: {
      required: 'Please select an answer to the below question',
    },
  },
});

const cy = () => ({
  title: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
  yes: 'Byddaf',
  no: 'Na fyddaf',
  cancel: 'Canslo',
  errors: {
    legalRepresentativeForProceedings: {
      required: 'Please select an answer to the below question - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    legalRepresentativeForProceedings: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: 'https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
