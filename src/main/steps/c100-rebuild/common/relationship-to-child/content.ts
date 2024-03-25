/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RelationshipToChildren, RelationshipType } from '../../../../app/case/definition';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isAlphaNumeric, isFieldFilledIn } from '../../../../app/form/validation';

export const en = () => ({
  title: 'What is ',
  title1: "'s relationship to ",
  mother: 'Mother',
  father: 'Father',
  guardian: 'Guardian',
  specialGuardian: 'Special Guardian',
  grandparent: 'Grandparent',
  other: 'Other',
  otherRelationshipDetails: 'Please specify',
  errors: {
    relationshipType: {
      required: 'Enter the relationship',
    },
    otherRelationshipTypeDetails: {
      required: 'Enter the relationship',
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
  },
});

export const cy = () => ({
  title: 'Beth yw perthynas',
  title1: ' â',
  mother: 'Mam',
  father: 'Tad',
  guardian: 'Gwarcheidwad',
  specialGuardian: 'Gwarcheidwad Arbennig',
  grandparent: 'Nain/Taid',
  other: 'Arall',
  otherRelationshipDetails: 'Rhowch fanylion',
  errors: {
    relationshipType: {
      required: 'Nodwch y berthynas',
    },
    otherRelationshipTypeDetails: {
      required: 'Nodwch y berthynas',
      invalid: 'Rydych wedi defnyddio nod annilys. Defnyddiwch lythrennau a rhifau yn unig.',
    },
  },
});

export const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

export const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateFormFields = (relationshipTypeOption: RelationshipToChildren): GenerateDynamicFormFields => {
  const { relationshipType, otherRelationshipTypeDetails } = relationshipTypeOption;

  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    relationshipType: {
      type: 'radios',
      classes: 'govuk-radios',
      labelSize: 's',
      values: [
        {
          label: l => l.mother,
          value: RelationshipType.MOTHER,
        },
        {
          label: l => l.father,
          value: RelationshipType.FATHER,
        },
        {
          label: l => l.guardian,
          value: RelationshipType.GUARDIAN,
        },
        {
          label: l => l.specialGuardian,
          value: RelationshipType.SPECIAL_GUARDIAN,
        },
        {
          label: l => l.grandparent,
          value: RelationshipType.GRAND_PARENT,
        },
        {
          label: l => l.other,
          value: RelationshipType.OTHER,

          subFields: {
            otherRelationshipTypeDetails: {
              type: 'text',
              label: l => l.otherRelationshipDetails,
              labelSize: null,
              value: otherRelationshipTypeDetails,
              validator: value => isFieldFilledIn(value) || isAlphaNumeric(value),
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  };
  fields.relationshipType.values = fields.relationshipType.values.map(config =>
    config.value === relationshipType ? { ...config, selected: true } : config
  );

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};
