import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  section: 'Esemptiadau MIAM',
  title: 'Pa dystiolaeth o bryderon amddiffyn plant sydd gennych?',
  needMoreDetails1: 'Os ydych chi’n ceisio esemptiad rhag mynychu MIAM, bydd angen i chi roi mwy o fanylion.',
  needMoreDetails2: "Mae'r llys angen yr wybodaeth hon i benderfynu a oes angen i chi fynychu MIAM ai peidio.",
  optionHint: "Dewiswch bob un sy'n berthnasol i chi",
  localAuthority:
    'Mae’r plant yn y cais, neu blentyn arall ar yr aelwyd, yn destun ymholiadau gan awdurdod lleol o dan adran 47 Deddf Plant 1989',
  localAuthorityHint:
    'This may mean that a local authority is carrying out enquiries because of concerns the children are suffering or might suffer significant harm. See <a href="https://www.legislation.gov.uk/ukpga/1989/41/section/17" class="govuk-link" target="_blank" aria-label="section 47 of the Children Act 1989 Act">section 47 of the Children Act 1989 Act</a> for further details.',
  childProtectionPlan:
    'Mae’r plant yn y cais, neu blentyn arall ar yr aelwyd, yn destun cynllun amddiffyn plant a roddwyd ar waith gan yr awdurdod lleol',
  none: 'Dim un o’r uchod',
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
