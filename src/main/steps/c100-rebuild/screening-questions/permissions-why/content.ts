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
  title: 'Why do you need a permission from the court to make this application? (optional) - welsh',
  line: 'Consult <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">the CB1 guidance</a> if you are not sure if you need permission to apply - welsh',
  select_all_apply: 'Select all that apply - welsh',
  doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children - welsh',
  doNotHaveParentalResponsibilityHintText: 'Provide details - welsh',
  section: 'parental responsibility means that you are responsible for the children and their property - welsh',
  courtOrderPrevent:
    'There is a court order preventing me from making an application without first getting the permission of the court - welsh',
  courtOrderPreventHintText: 'Provide details of the court order in place - welsh',
  anotherReason: 'Another reason - welsh',
  anotherReasonHintText: 'Provide details for why you need permission to make this application - welsh',
  errors: {
    sq_doNotHaveParentalResponsibility_subfield: {
      required: "Provide details for 'I do not have parental responsibility for the children' - welsh",
    },
    sq_courtOrderPrevent_subfield: {
      required: "Provide details for 'There is a court order preventing me from making an application' - welsh",
    },
    sq_anotherReason_subfield: {
      required: 'Provide details for another reason - welsh',
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
