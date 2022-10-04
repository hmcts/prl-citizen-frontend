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
    miamNonAttendanceReason: {
      required: 'Select your valid reasons for not attending a MIAM',
    },
  },
};

const cy: typeof en = {
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
    miamNonAttendanceReason: {
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
    miamNonAttendanceReason: {
      type: 'checkboxes',
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'miamNonAttendanceReason',
          label: l => l.domesticViolence,
          value: MiamNonAttendReason.DOMESTIC,
        },
        {
          name: 'miamNonAttendanceReason',
          label: l => l.childProtection,
          value: MiamNonAttendReason.CHILD_PROTECTION,
        },
        {
          name: 'miamNonAttendanceReason',
          label: l => l.urgentHearing,
          value: MiamNonAttendReason.URGENT,
        },
        {
          name: 'miamNonAttendanceReason',
          label: l => l.previousMIAMOrExempt,
          value: MiamNonAttendReason.PREV_MIAM,
        },
        {
          name: 'miamNonAttendanceReason',
          label: l => l.validExemption,
          value: MiamNonAttendReason.EXEMPT,
        },
        {
          divider: 'or',
        },
        {
          name: 'miamNonAttendanceReason',
          label: l => l.noReason,
          value: MiamNonAttendReason.NO_REASON,
          behaviour: 'exclusive',
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
