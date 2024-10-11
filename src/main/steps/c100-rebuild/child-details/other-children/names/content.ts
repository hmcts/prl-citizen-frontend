import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { OtherChildrenDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormInput, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../../../app/form/validation';

let updatedForm: FormContent;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Enter the other child’s name',
  Child: 'Child',
  firstNameLabel: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastNameLabel: 'Last name(s)',
  addChildLabel: 'Add another child',
  removeChildLabel: 'Remove Child',
  newNameLabel: 'Enter name',
  errors: {
    c100TempFirstName: {
      required: 'Enter the first name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    c100TempLastName: {
      required: 'Enter the last name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
  },
});

const cy = () => ({
  title: 'Nodwch enw’r plentyn arall',
  Child: 'Plentyn',
  firstNameLabel: 'Enw(au) cyntaf',
  firstNameHint: 'Nodwch bob enw canol yma',
  lastNameLabel: 'Cyfenw(au)',
  addChildLabel: 'Ychwanegu plentyn arall',
  removeChildLabel: 'Dileu Plentyn',
  newNameLabel: 'Enter name -welsh',
  errors: {
    c100TempFirstName: {
      required: 'Nodwch yr enw cyntaf',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    c100TempLastName: {
      required: 'Nodwch y cyfenw',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
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

export const generateFormFields = (
  children: OtherChildrenDetails[],
  context: string | undefined
): GenerateDynamicFormFields => {
  const fields = {};
  const errors = {
    en: {},
    cy: {},
  };
  const nameFieldConfig: FormInput = {
    type: 'text',
    labelSize: 'm',
    classes: 'govuk-!-width-one-half',
    validator: value => isFieldFilledIn(value) || isFieldLetters(value),
    attributes: {
      autocomplete: 'off',
    },
  };

  for (let index = 0; index < children.length; index++) {
    const count = index + 1;
    const key = `fieldset${count}`;
    const { id, firstName = '', lastName = '' } = children[index];
    const inputFieldConfig = { ...nameFieldConfig };

    if ((context === 'add' && count === children.length) || (context === 'remove' && count === 1)) {
      inputFieldConfig.attributes = {
        ...inputFieldConfig.attributes,
        autofocus: true,
      };
    }

    fields[key] = {
      type: 'fieldset',
      label: l => `${l.Child} ${count}`,
      classes: 'govuk-fieldset__legend--m',
      subFields: {
        [`firstName-${count}`]: { ...inputFieldConfig, label: l => l.firstNameLabel, value: firstName },
        [`lastName-${count}`]: { ...inputFieldConfig, label: l => l.lastNameLabel, value: lastName },
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
          validator: value => isFieldFilledIn(value) || isFieldLetters(value),
          attributes: {
            autocomplete: 'off',
          },
        },
        c100TempLastName: {
          type: 'text',
          classes: 'govuk-!-width-one-half',
          label: l => l.lastNameLabel,
          labelSize: 'none',
          validator: value => isFieldFilledIn(value) || isFieldLetters(value),
          attributes: {
            autocomplete: 'off',
          },
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

export const getFormFields = (caseData: Partial<CaseWithId>, context: string): FormContent => {
  return updateFormFields(form, generateFormFields(caseData?.ocd_otherChildren ?? [], context).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const sessionData = content?.userCase?.ocd_otherChildren;

  const { fields, errors } = generateFormFields(
    sessionData ?? [],
    _.get(content, 'additionalData.req.session.applicationSettings.dynamicForm.context')
  );

  translations.errors = {
    ...translations.errors,
    ...errors[content.language],
  };

  return {
    ...translations,
    form: updateFormFields(form, fields),
  };
};
