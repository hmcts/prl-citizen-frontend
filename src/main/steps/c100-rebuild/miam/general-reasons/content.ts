import { MiamNonAttendReason } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'MIAM exemptions',
  title: 'What are your valid reasons for not attending a MIAM?',
  courtcommunication:
    'The court needs more information to assess if your reasons are valid. If you cannot provide enough supporting information, you will be asked to attend a MIAM.',
  optionHint: 'Select all that apply to you - you will be asked to provide further details next',
  domesticViolence: 'I have evidence of domestic violence and abuse',
  childProtection: 'I have child protection concerns',
  urgentHearing: 'I have a reason for an urgent hearing',
  previousMIAMOrExempt: 'I have previously attended a MIAM, or already have a court confirmed exemption',
  validExemption: 'I have other valid reasons to be exempt from a MIAM',
  noReason: 'None of the above',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    miam_nonAttendanceReasons: {
      required: 'Select your valid reasons for not attending a MIAM',
    },
  },
};

const cy: typeof en = {
  section: 'Esemptiadau MIAM',
  title: "Beth yw eich rhesymau dilys dros beidio â mynychu MIAM?",
  courtcommunication:
    "Mae'r llys angen mwy o wybodaeth er mwyn asesu a yw eich rhesymau'n ddilys. Os na allwch ddarparu digon o wybodaeth ategol, fe ofynnir i chi fynychu MIAM.",
  optionHint: "Dewiswch bopeth sy'n berthnasol i chi - gofynnir i chi ddarparu manylion pellach nesaf",
  domesticViolence: "Mae gen i dystiolaeth o drais domestig a chamdriniaeth",
  childProtection: "Mae gen i bryderon o ran amddiffyn plant",
  urgentHearing: "Mae gen i reswm dros gael gwrandawiad brys",
  previousMIAMOrExempt: "Rwyf eisoes wedi mynychu MIAM, neu mae’r llys eisoes wedi cadarnhau’r esemptiad",
  validExemption: "Mae gen i resymau dilys eraill dros gael fy eithrio rhag mynychu MIAM",
  noReason: 'Dim un o’r uchod',
  summaryText: "Cysylltiadau am gymorth",
  continue: "Cadw’r cais a dychwelyd ato yn hwyrach ymlaen",
  errors: {
    miam_nonAttendanceReasons: {
      required: 'Select your valid reasons for not attending a MIAM',
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
          divider: 'or',
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
