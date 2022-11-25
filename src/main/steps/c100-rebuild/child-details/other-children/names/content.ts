import { OtherChildrenDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

let updatedForm: FormContent;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Enter the other child’s name',
  firstNameLabel: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastNameLabel: 'Last name(s)',
  addChildLabel: 'Add another child',
  removeChildLabel: 'Remove Child',
  newNameLabel: 'Enter a new name',
  errors: {
    c100TempFirstName: {
      required: 'Enter the first name',
    },
    c100TempLastName: {
      required: 'Enter the last name',
    },
  },
});

const cy = () => ({
  title: 'Nodwch enw’r plentyn arall',
  firstNameLabel: 'Enw(au) cyntaf',
  firstNameHint: 'Nodwch bob enw canol yma',
  lastNameLabel: 'Cyfenw(au)',
  addChildLabel: 'Ychwanegu plentyn arall',
  removeChildLabel: 'Dileu Plentyn',
  newNameLabel: 'Nodwch enw newydd',
  errors: {
    c100TempFirstName: {
      required: 'Enter the first name - welsh',
    },
    c100TempLastName: {
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

export const generateFormFields = (children: OtherChildrenDetails[]): GenerateDynamicFormFields => {
  const fields = {};
  const errors = {
    en: {},
    cy: {},
  };

  for (let index = 0; index < children.length; index++) {
    const count = index + 1;
    const key = `fieldset${count}`;
    const { id, firstName = '', lastName = '' } = children[index];

    fields[key] = {
      type: 'fieldset',
      label: () => `Child ${count}`,
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
        remove: {
          type: 'button',
          label: l => `${l.removeChildLabel} ${count}`,
          classes: 'govuk-button--warning margin-top-3',
          value: id,
        },
      },
    };

    //generate dynamic error message
    errors.en[`firstName-${count}`] = en().errors.c100TempFirstName;
    errors.en[`lastName-${count}`] = en().errors.c100TempLastName;
    errors.cy[`firstName-${count}`] = cy().errors.c100TempFirstName;
    errors.cy[`lastName-${count}`] = cy().errors.c100TempLastName;
  }

  return { fields, errors };
};

export const form: FormContent = {
  fields: {
    'fieldset-childDetails': {
      type: 'fieldset',
      classes: 'govuk-fieldset__legend--m',
      label: l => l.newNameLabel,
      subFields: {
        c100TempFirstName: {
          type: 'text',
          classes: 'govuk-!-width-one-half',
          label: l => l.firstNameLabel,
          hint: hint => hint.firstNameHint,
          labelSize: 'none',
          validator: isFieldFilledIn,
        },
        c100TempLastName: {
          type: 'text',
          classes: 'govuk-!-width-one-half',
          label: l => l.lastNameLabel,
          labelSize: 'none',
          validator: isFieldFilledIn,
        },
        add: {
          type: 'button',
          label: l => l.addChildLabel,
          classes: 'govuk-button--secondary',
          value: 'true',
        },
      },
    },
    _ctx: {
      type: 'hidden',
      labelHidden: true,
      value: 'oc',
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
  const sessionData = content?.userCase?.ocd_otherChildren;

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
