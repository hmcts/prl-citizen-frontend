import { MiamNonAttendReason } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  title: 'MIAM exemptions',
  label: 'What are your reasons for not attending a MIAM?',
  courtcommunication: 'You need to give the court details of why you have not attended a MIAM.',
  optionHint: 'Select all reasons that apply.',
  domesticViolence: 'Domestic abuse',
  childProtection: 'Child protection concerns',
  urgentHearing: 'Urgency',
  previousMIAMOrExempt: 'Previous attendance of a MIAM, or non-court dispute resolution (NCDR)',
  validExemption: 'Other reason',
  noReason: 'None of these',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  divider: 'or',
  errors: {
    miam_nonAttendanceReasons: {
      required: 'Select reasons for not attending a MIAM',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = {
  title: 'Esemptiadau MIAM',
  label: 'Beth yw eich rhesymau dros beidio â mynychu MIAM?',
  courtcommunication: 'Mae angen i chi roi manylion i’r llys pam nad ydych wedi mynychu MIAM.',
  optionHint: "Dewiswch bob rheswm sy'n berthnasol.",
  domesticViolence: 'Cam-drin domestig',
  childProtection: 'Pryderon amddiffyn plant',
  urgentHearing: 'Cais brys',
  previousMIAMOrExempt: 'Wedi mynychu MIAM yn barod neu ddatrys anghydfod y tu allan i’r llys (NCDR)',
  validExemption: 'Rheswm arall',
  noReason: 'Dim un o’r rhain',
  summaryText: 'Cysylltiadau am gymorth',
  continue: 'Cadw’r cais a dychwelyd ato yn hwyrach ymlaen',
  divider: 'neu',
  errors: {
    miam_nonAttendanceReasons: {
      required: 'Dewiswch eich rhesymau dilys dros beidio â mynychu MIAM',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_nonAttendanceReasons: {
      type: 'checkboxes',
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      label: l => l.label,
      labelSize: 'm',
      values: [
        {
          name: 'miam_nonAttendanceReasons',
          label: l => l.domesticViolence,
          value: MiamNonAttendReason.DOMESTIC,
        },
        {
          name: 'miam_nonAttendanceReasons',
          label: l => l.childProtection,
          value: MiamNonAttendReason.CHILD_PROTECTION,
        },
        {
          name: 'miam_nonAttendanceReasons',
          label: l => l.urgentHearing,
          value: MiamNonAttendReason.URGENT,
        },
        {
          name: 'miam_nonAttendanceReasons',
          label: l => l.previousMIAMOrExempt,
          value: MiamNonAttendReason.PREV_MIAM,
        },
        {
          name: 'miam_nonAttendanceReasons',
          label: l => l.validExemption,
          value: MiamNonAttendReason.EXEMPT,
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'miam_nonAttendanceReasons',
          label: l => l.noReason,
          value: MiamNonAttendReason.NONE,
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
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
