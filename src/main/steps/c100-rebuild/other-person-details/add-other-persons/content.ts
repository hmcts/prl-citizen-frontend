import { C100RebuildPartyDetails } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

let updatedForm: FormContent;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Enter the other persons name',
  firstNameLabel: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastNameLabel: 'Last name(s)',
  addOtherPersonLabel: 'Add another person',
  removeOtherPersonLabel: 'Remove person',
  newNameLabel: 'Enter a new name',
  errors: {
    otherPersonFirstName: {
      required: 'Enter the first name',
    },
    otherPersonLastName: {
      required: 'Enter the last name',
    },
  },
});

const cy = () => ({
  title: 'Enter the other persons name- welsh',
  firstNameLabel: 'First name(s) - welsh',
  firstNameHint: 'Include all middle names here - welsh',
  lastNameLabel: 'Last name(s) - welsh',
  addOtherPersonLabel: 'Add another person - welsh',
  removeOtherPersonLabel: 'Remove person - welsh',
  newNameLabel: 'Enter a new name - welsh',
  errors: {
    otherPersonFirstName: {
      required: 'Enter the first name - welsh',
    },
    otherPersonLastName: {
      required: 'Enter the last name - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };
  return updatedForm;
};

export const getFormFields = (): FormContent => {
  return updatedForm;
};

export const generateFormFields = (otherPersons: C100RebuildPartyDetails[]): GenerateDynamicFormFields => {
  const fields = {};
  const errors = {
    en: {},
    cy: {},
  };

  for (let index = 0; index < otherPersons.length; index++) {
    const count = index + 1;
    const key = `fieldset${count}`;
    const { id, firstName = '', lastName = '' } = otherPersons[index];

    fields[key] = {
      type: 'fieldset',
      label: () => `Person ${count}`,
      classes: 'govuk-fieldset__legend--m',
      subFields: {
        [`firstName-${count}`]: {
          type: 'text',
          value: firstName,
          labelSize: 'm',
          classes: 'govuk-!-width-one-half',
          label: l => l.firstNameLabel,
          validator: isFieldFilledIn,
        },
        [`lastName-${count}`]: {
          type: 'text',
          label: l => l.lastNameLabel,
          value: lastName,
          classes: 'govuk-!-width-one-half',
          labelSize: 'm',
          validator: isFieldFilledIn,
        },
        removeOtherPerson: {
          type: 'button',
          label: l => `${l.removeOtherPersonLabel} ${count}`,
          classes: 'govuk-button--warning margin-top-3',
          value: id,
        },
      },
    };

    //generate dynamic error message
    errors.en[`firstName-${count}`] = en().errors.otherPersonFirstName;
    errors.en[`lastName-${count}`] = en().errors.otherPersonLastName;
    errors.cy[`firstName-${count}`] = cy().errors.otherPersonFirstName;
    errors.cy[`lastName-${count}`] = cy().errors.otherPersonLastName;
  }

  return { fields, errors };
};

export const form: FormContent = {
  fields: {
    'fieldset-otherPersonDetails': {
      type: 'fieldset',
      classes: 'govuk-fieldset__legend--m',
      label: l => l.newNameLabel,
      subFields: {
        otherPersonFirstName: {
          type: 'text',
          classes: 'govuk-!-width-one-half',
          label: l => l.firstNameLabel,
          hint: hint => hint.firstNameHint,
          labelSize: 'none',
          validator: isFieldFilledIn,
        },
        otherPersonLastName: {
          type: 'text',
          classes: 'govuk-!-width-one-half',
          label: l => l.lastNameLabel,
          labelSize: 'none',
          validator: isFieldFilledIn,
        },
        addOtherPerson: {
          type: 'button',
          label: l => l.addOtherPersonLabel,
          classes: 'govuk-button--secondary',
          value: 'true',
        },
      },
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
  const sessionData = content?.userCase?.oprs_otherPersons;

  const { fields, errors } = generateFormFields(sessionData ?? []);

  translations.errors = {
    ...translations.errors,
    ...errors[content.language],
  };

  return {
    ...translations,
    form: updateFormFields(form, fields),
  };
};
