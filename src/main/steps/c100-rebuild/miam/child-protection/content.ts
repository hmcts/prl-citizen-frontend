import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = () => ({
  section: 'MIAM exemptions',
  title: 'What evidence of child protection concerns do you have?',
  needMoreDetails1: 'If you are seeking a MIAM exemption, you will need to give more details.',
  needMoreDetails2: 'The court needs this information to decide if you need to attend a MIAM.',
  optionHint: 'Select all that apply',
  localAuthority:
    'The children in the application, or another child in the household, is the subject of enquiries by a local authority under section 47 of the Children Act 1989 Act',
  localAuthorityHint:
    'This may mean that a local authority is carrying out enquiries because of concerns the children are suffering or might suffer significant harm. See <a href="https://www.legislation.gov.uk/ukpga/1989/41/section/17" class="govuk-link" target="_blank" aria-label="section 47 of the Children Act 1989 Act">section 47 of the Children Act 1989 Act</a> for further details.',
  childProtectionPlan:
    'The children in the application, or another child in the household, is the subject of a child protection plan put in place by the local authority',
  none: 'None of the above',
  errors: {
    miam_childProtectionEvidence: {
      required: 'Select what evidence of child safety concerns you have',
    },
  },
});

const cy = () => ({
  section: 'MIAM exemptions - Welsh',
  title: 'What evidence of child protection concerns do you have? - Welsh',
  needMoreDetails1: 'If you are seeking a MIAM exemption, you will need to give more details. - Welsh',
  needMoreDetails2: 'The court needs this information to decide if you need to attend a MIAM. - Welsh',
  optionHint: 'Select all that apply - Welsh',
  localAuthority:
    'The children in the application, or another child in the household, is the subject of enquiries by a local authority under section 47 of the Children Act 1989 Act - welsh',
  localAuthorityHint:
    'This may mean that a local authority is carrying out enquiries because of concerns the children are suffering or might suffer significant harm. See <a href="https://www.legislation.gov.uk/ukpga/1989/41/section/17" class="govuk-link" target="_blank" aria-label="section 47 of the Children Act 1989 Act">section 47 of the Children Act 1989 Act</a> for further details.',
  childProtectionPlan:
    'The children in the application, or another child in the household, is the subject of a child protection plan put in place by the local authority - Welsh',
  none: 'None of the above - Welsh',
  errors: {
    miam_childProtectionEvidence: {
      required: 'Select what evidence of child safety concerns you have - Welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_childProtectionEvidence: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'miam_childProtectionEvidence',
          label: l => l.localAuthority,
          hint: l => l.localAuthorityHint,
          value: 'localAuthority',
        },
        {
          name: 'miam_childProtectionEvidence',
          label: l => l.childProtectionPlan,
          value: 'childProtectionPlan',
        },
        {
          divider: true,
        },
        {
          name: 'miam_childProtectionEvidence',
          label: l => l.none,
          value: 'none',
          exclusive: true,
        },
      ],
    },
  },
  submit: {
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
