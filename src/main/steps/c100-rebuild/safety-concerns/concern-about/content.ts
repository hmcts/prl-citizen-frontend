/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C1ASafteyConcernsAbout } from '../../../../app/case/definition';
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
    c1A_safetyConernAbout: {
      required: 'Specify who you are concerned about',
    },
  },
});

export const cy = () => ({
  serviceName: 'Trefniadau plant',
  caption: 'Pryderon diogelwch',
  headingTitle: 'Am bwy ydych chi’n poeni amdano/amdani?',
  select_all_relevant: "Dewiswch bob opsiwn sy'n berthnasol i chi",
  childrenInThisApplication: 'Y plant yn y cais hwn',
  yourself: 'Chi eich hun',
  errors: {
    c1A_safetyConernAbout: {
      required: "Nodwch am bwy yr ydych chi'n poeni",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_safetyConernAbout: {
      id: 'c1A_safetyConernAbout',
      type: 'checkboxes',
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'c1A_safetyConernAbout',
          label: l => l.childrenInThisApplication,
          value: C1ASafteyConcernsAbout.CHILDREN,
        },
        {
          name: 'c1A_safetyConernAbout',
          label: l => l.yourself,
          value: C1ASafteyConcernsAbout.APPLICANT,
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
