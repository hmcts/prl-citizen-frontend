/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Why do you need a permission from the court to make this application? (optional)',
  line: 'Consult <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">the CB1 guidance</a> if you are not sure if you need permission to apply',
  select_all_apply: 'Select all that apply',
  doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
  doNotHaveParentalResponsibilityHintText: 'Provide details',
  section: 'parental responsibility means that you are responsible for the children and their property',
  courtOrderPrevent:
    'There is a court order preventing me from making an application without first getting the permission of the court',
  courtOrderPreventHintText: 'Provide details of the court order in place',
  anotherReason: 'Another reason',
  anotherReasonHintText: 'Provide details for why you need permission to make this application',
  errors: {
    sq_doNotHaveParentalResponsibility_subfield: {
      required: "Provide details for 'I do not have parental responsibility for the children'",
    },
    sq_courtOrderPrevent_subfield: {
      required: "Provide details for 'There is a court order preventing me from making an application'",
    },
    sq_anotherReason_subfield: {
      required: 'Provide details for another reason',
    },
  },
});

export const cy = () => ({
  title: 'Pam bod angen caniatâd gan y llys i wneud y cais hwn? (dewisol)',
  line: 'Edrychwch ar<a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">ganllawiau CB1</a> os nad ydych yn siŵr a oes angen caniatâd arnoch i wneud cais',
  select_all_apply: "Dewiswch bob un sy'n berthnasol",
  doNotHaveParentalResponsibility: 'Does gen i ddim cyfrifoldeb rhiant dros y plant',
  doNotHaveParentalResponsibilityHintText: 'Rhowch fanylion',
  section: "Ystyr cyfrifoldeb rhiant yw eich bod yn gyfrifol am y plant a'u heiddo",
  courtOrderPrevent: 'Mae yna orchymyn llys yn fy atal rhag gwneud cais heb gael caniatâd y llys yn gyntaf',
  courtOrderPreventHintText: 'Rhowch fanylion y gorchymyn llys sydd mewn grym',
  anotherReason: 'Rheswm arall',
  anotherReasonHintText: 'Eglurwch pam bod angen caniatâd arnoch i wneud y cais hwn',
  errors: {
    sq_doNotHaveParentalResponsibility_subfield: {
      required: 'Rhowch fanylion pam nad oes gennych gyfrifoldeb rhiant dros y plant',
    },
    sq_courtOrderPrevent_subfield: {
      required: 'Rhowch fanylion am y gorchymyn llys sy’n eich atal rhag gwneud cais',
    },
    sq_anotherReason_subfield: {
      required: 'Rhowch fanylion unrhyw reswm arall',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    sq_permissionsWhy: {
      id: 'sq_permissionsWhy',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      values: [
        {
          name: 'sq_permissionsWhy',
          label: l => l.doNotHaveParentalResponsibility,
          value: 'doNotHaveParentalResponsibility',
          hint: l => l.section,
          subFields: {
            sq_doNotHaveParentalResponsibility_subfield: {
              type: 'textarea',
              labelSize: null,
              hint: l => l.doNotHaveParentalResponsibilityHintText,
              attributes: {
                rows: 4,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'sq_permissionsWhy',
          label: l => l.courtOrderPrevent,
          value: 'courtOrderPrevent',
          subFields: {
            sq_courtOrderPrevent_subfield: {
              type: 'textarea',
              labelSize: null,
              hint: l => l.courtOrderPreventHintText,
              attributes: {
                rows: 4,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'sq_permissionsWhy',
          label: l => l.anotherReason,
          value: 'anotherReason',
          subFields: {
            sq_anotherReason_subfield: {
              type: 'textarea',
              labelSize: null,
              hint: l => l.anotherReasonHintText,
              attributes: {
                rows: 4,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
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
