/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { C1ASafteyConcernsAbout } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { C100_REBUILD_URL } from '../../../../steps/urls';
import { generateContentForLocalComponent } from '../util';

export const en = () => ({
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
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    const C100Rebuildjourney = req.originalUrl.startsWith(C100_REBUILD_URL);
    return {
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
            value: C100Rebuildjourney ? C1ASafteyConcernsAbout.APPLICANT : C1ASafteyConcernsAbout.RESPONDENT,
          },
        ],
      },
    };
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return generateContentForLocalComponent(content, languages, form);
};
