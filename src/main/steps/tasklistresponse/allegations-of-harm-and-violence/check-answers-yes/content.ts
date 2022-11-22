import { C1ASafteyConcernsAbout } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'Safety concerns',
  title: 'Who are you concerned about?',
  optionHint: 'Select all options that are relevant to you.',
  summaryText: 'Contacts for help',
  childconcern: 'The children in this application',
  selfconcern: 'Yourself',
  continue: 'Save and continue',
  errors: {
    respondentConcernedAbout: {
      required: 'Specify who you are concerned about',
    },
  },
};

const cy: typeof en = {
  section: 'Safety concerns - in welsh',
  title: 'Who are you concerned about? - in welsh',
  optionHint: 'Select all options that are relevant to you. - in welsh',
  summaryText: 'Contacts for help - in welsh',
  childconcern: 'The children in this application - in welsh',
  selfconcern: 'Yourself - in welsh',
  continue: 'Save and continue - in welsh',
  errors: {
    respondentConcernedAbout: {
      required: 'Specify who you are concerned about - in welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_safetyConernAbout: {
      id: 'c1A_safetyConernAbout',
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'c1A_safetyConernAbout',
          label: l => l.childconcern,
          value: C1ASafteyConcernsAbout.CHILDREN,
        },
        {
          name: 'c1A_safetyConernAbout',
          label: l => l.selfconcern,
          value: C1ASafteyConcernsAbout.APPLICANT,
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
