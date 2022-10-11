import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'MIAM exemptions',
  title: 'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend?',
  insetHtml: `<p class="govuk-body">If you are seeking a MIAM exemption, you will need to give more details. </p>
              <p class="govuk-body">The court needs this information to decide if you need to attend a MIAM.</p>`,
  select_all_apply: 'Select all that apply to you',
  fourMonthsPriorAttended: `In the 4 months prior to making the application, you attended 
                            a MIAM or participated in another form of non-court dispute resolution relating 
                            to the same or substantially the same dispute`,
  onTimeParticipation: `At the time of making the application, you are participating in another
                        form of non-court dispute resolution relating to the same or 
                        substantially the same dispute`,
  beforeInitiationProceeding: `This application would be made in existing proceedings which are continuing 
                               and you attended a MIAM before initiating those proceedings`,
  fourMonthsPriorFiled: `In the 4 months prior to making the application, you filed a relevant
                        family application confirming that a MIAM exemption applied and that application
                        related to the same or substantially the same dispute`,
  miamExamptionApplied: `The application would be made in existing proceedings which are continuing
                         and a MIAM exemption applied to the application for those proceedings`,
  beforStatingApplication: `The application would be made in existing proceedings which 
                            are continuing and and the applicant attended a MIAM before starting those proceedings`,
  noneOfTheAbove: 'None of the above',
  errors: {
    miam_previousAttendance: {
      required: 'Confirm if you previously attended a MIAM, or had a valid reason not to attend',
    },
  },
});

const cy = () => ({
  caption: 'MIAM exemptions - welsh',
  title: 'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend? - welsh',
  insetHtml: `<p class="govuk-body">If you are seeking a MIAM exemption, you will need to give more details. </p>
             <p class="govuk-body">The court needs this information to decide if you need to attend a MIAM.</p> - welsh`,
  select_all_apply: 'Select all that apply to you - welsh',
  fourMonthsPriorAttended: `In the 4 months prior to making the application, you attended 
                            a MIAM or participated in another form of non-court dispute resolution relating 
                            to the same or substantially the same dispute - welsh`,
  onTimeParticipation: `At the time of making the application, you are participating in another
                        form of non-court dispute resolution relating to the same or 
                        substantially the same dispute - welsh`,
  beforeInitiationProceeding: `This application would be made in existing proceedings which are continuing 
                                and you attended a MIAM before initiating those proceedings - welsh`,
  fourMonthsPriorFiled: `In the 4 months prior to making the application, you filed a relevant
                          family application confirming that a MIAM exemption applied and that application
                          related to the same or substantially the same dispute - welsh`,
  miamExamptionApplied: `The application would be made in existing proceedings which are continuing
                          and a MIAM exemption applied to the application for those proceedings - welsh`,
  beforStatingApplication: `The application would be made in existing proceedings which 
                            are continuing and and the applicant attended a MIAM before starting those proceedings - welsh`,
  noneOfTheAbove: 'None of the above  - welsh',
  errors: {
    miam_previousAttendance: {
      required: 'Confirm if you previously attended a MIAM, or had a valid reason not to attend - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_previousAttendance: {
      id: 'miam_previousAttendance',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'miam_previousAttendance',
          label: l => l.fourMonthsPriorAttended,
          value: 'fourMonthsPriorAttended',
        },
        {
          name: 'miam_previousAttendance',
          label: l => l.onTimeParticipation,
          value: 'onTimeParticipation',
        },
        {
          name: 'miam_previousAttendance',
          label: l => l.beforeInitiationProceeding,
          value: 'beforeInitiationProceeding',
        },
        {
          name: 'miam_previousAttendance',
          label: l => l.fourMonthsPriorFiled,
          value: 'fourMonthsPriorFiled',
        },
        {
          name: 'miam_previousAttendance',
          label: l => l.miamExamptionApplied,
          value: 'miamExamptionApplied',
        },
        {
          name: 'miam_previousAttendance',
          label: l => l.beforStatingApplication,
          value: 'beforStatingApplication',
        },
        {
          divider: 'or',
        },
        {
          name: 'miam_previousAttendance',
          label: l => l.noneOfTheAbove,
          value: 'none',
          behaviour: 'exclusive',
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
