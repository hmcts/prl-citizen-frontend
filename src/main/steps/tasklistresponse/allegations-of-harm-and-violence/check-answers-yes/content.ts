/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PRL_C1ASafteyConcernsAbout } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

export const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  headingTitle: 'Who are you concerned about?',
  select_all_relevant: 'Select all options that are relevant to you.',
  childrenInThisApplication: 'The children in this application',
  yourself: 'Yourself',
  errors: {
    PRL_c1A_safetyConernAbout: {
      required: 'Specify who you are concerned about',
    },
  },
});

export const cy = () => ({
  serviceName: 'Trefniadau plant',
  caption: 'Pryderon diogelwch',
  headingTitle: 'Am bwy ydych chi’n poeni amdano/amdani?',
  select_all_relevant: "Dewiswch bob opsiwn sy'n berthnasol i'ch sefyllfa.",
  childrenInThisApplication: 'Y plant yn y cais hwn',
  yourself: 'Chi eich hun',
  errors: {
    PRL_c1A_safetyConernAbout: {
      required: 'Nodwch am bwy ydych chi’n pryderu amdano/i',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_safetyConernAbout: {
      id: 'PRL_c1A_safetyConernAbout',
      type: 'checkboxes',
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'PRL_c1A_safetyConernAbout',
          label: l => l.childrenInThisApplication,
          value: PRL_C1ASafteyConcernsAbout.CHILDREN,
        },
        {
          name: 'PRL_c1A_safetyConernAbout',
          label: l => l.yourself,
          value: PRL_C1ASafteyConcernsAbout.RESPONDENT,
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
