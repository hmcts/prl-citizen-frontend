import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  headingTitle: 'Who are you concerned about?',
  select_all_relevant: 'Select all options that are relevant to you.',
  childrenInThisApplication: 'The children in this application',
  yourself: 'Yourself',
  errors: {
    safetyConernAbout: {
      required: 'Specify who you are concerned about',
    },
  },
});

const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  caption: 'Safety concerns - welsh',
  headingTitle: 'Who are you concerned about? - welsh',
  select_all_relevant: 'Select all options that are relevant to you. - welsh',
  childrenInThisApplication: 'The children in this application - welsh',
  yourself: 'Yourself - welsh',
  errors: {
    safetyConernAbout: {
      required: 'Specify who you are concerned about - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    safetyConernAbout: {
      id: 'safetyConernAbout',
      type: 'checkboxes',
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'safetyConernAbout',
          label: l => l.childrenInThisApplication,
          value: 'children',
        },
        {
          name: 'safetyConernAbout',
          label: l => l.yourself,
          value: 'applicant',
        },
      ],
    },
  },
  onlycontinue: {
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
