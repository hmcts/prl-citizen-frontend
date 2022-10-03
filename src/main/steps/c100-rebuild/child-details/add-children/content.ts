import { childrenDetails } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { C100_children_DETAILS_ADD } from '../../../urls';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Enter the names of the children',
  subTitle: 'Only include the children you’re making this application about',
  firstName: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastName: 'Last name(s)',
  buttonAddChild: 'Add another child',
  removeChild: 'Remove Child',
  labelFornewName: 'Enter a new name',
  errors: {
    firstname: {
      required: 'Enter the first name',
    },
    lastname: {
      required: 'Enter the last name',
    },
  },
});

const cy = () => ({
  pageTitle: 'Enter the names of the children- welsh',
  subTitle: 'Only include the children you’re making this application about- welsh',
  firstName: 'First name(s) - welsh',
  firstNameHint: 'Include all middle names here - welsh',
  lastName: 'Last name(s) - welsh',
  buttonAddChild: 'Add another child - welsh',
  removeChild: 'Remove child - welsh',
  labelFornewName: 'Enter a new name - welsh',
  errors: {
    firstname: {
      required: 'Enter the first name - welsh',
    },
    lastname: {
      required: 'Enter the last name - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const generateFormFields = (applicantData: childrenDetails[]): GenerateDynamicFormFields => {
  const fields = {};
  const errors = {
    en: {},
    cy: {},
  };
  for (let index = 0; index < applicantData.length; index++) {
    const count = index + 1;
    const key = `fieldset${count}`;

    fields[key] = {
      type: 'fieldset',
      label: () => {
        return `Child ${count}`;
      },
      classes: 'govuk-fieldset__legend--m',
      subFields: {
        [`childFirstName-${count}`]: {
          type: 'text',
          value: applicantData[index].firstname,
          labelSize: 'none',
          classes: 'govuk-input govuk-!-width-one-half',
          label: l => l.firstName,
          validator: value => isFieldFilledIn(value as string),
        },
        [`childLastName-${count}`]: {
          type: 'text',
          label: l => l.lastName,
          value: applicantData[index].lastname,
          classes: 'govuk-input govuk-!-width-one-half',
          hint: h => h.caseNumberHint,
          labelSize: 'none',
          validator: isFieldFilledIn,
        },
        removeChild: {
          type: 'link',
          label: l => l.removeChild + ` ${count}`,
          classes: 'govuk-button govuk-button--warning margin-top-3',
          value: 'Yes',
          href: `${C100_children_DETAILS_ADD}?action=remove&childId=${applicantData[index].id}`,
        },
      },
    };

    //generate dynamic error message
    errors.en = {
      ...errors.en,
      [`childFirstName-${count}`]: en().errors.firstname,
      [`childLastName-${count}`]: en().errors.lastname,
    };
    errors.cy = {
      ...errors.cy,
      [`childFirstName-${count}`]: cy().errors.firstname,
      [`childLastName-${count}`]: cy().errors.lastname,
    };
  }

  return { fields, errors };
};

export const form: FormContent = {
  fields: {
    childLabel: {
      type: 'heading',
      label: label => label.labelFornewName,
      labelSize: 'm',
    },
    firstname: {
      type: 'text',
      classes: 'govuk-input govuk-!-width-one-half',
      label: label => label.firstName,
      hint: hint => hint.firstNameHint,
      validator: isFieldFilledIn,
      labelSize: 'none',
    },
    lastname: {
      type: 'text',
      classes: 'govuk-input govuk-!-width-one-half',
      label: label => label.lastName,
      validator: isFieldFilledIn,
      labelSize: 'none',
    },
    addAnotherChild: {
      type: 'button',
      label: l => l.buttonAddChild,
      classes: 'govuk-button--secondary margin-top-3',
      value: 'Yes',
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

let updatedFormContents: FormContent;

// eslint-disable-next-line @typescript-eslint/no-shadow
const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedFormContents = {
    ...form,
    fields: {
      informationFieldSet: {
        type: 'inset',
        label: label => label.subTitle,
      },
      ...formFields,
      ...(form.fields ?? {}),
    },
  };
  return updatedFormContents;
};

const updatedSessionValue = (formValues: FormContent, sessionData) => {
  formValues.fields['firstname'].value = sessionData.TempFirstName;
  formValues.fields['lastname'].value = sessionData.TempLastName;
  return {
    ...formValues,
  };
};

export const generateContent: TranslationFn = content => {
  const sessionDataOFApplicant = content.additionalData?.req.session;
  const applicantData: childrenDetails[] =
    sessionDataOFApplicant['userCase'].hasOwnProperty('children') && sessionDataOFApplicant['userCase']['children']
      ? sessionDataOFApplicant['userCase']['children']
      : ([] as childrenDetails[]);
  const translations = languages[content.language]();

  const { fields, errors } = generateFormFields(applicantData);

  translations.errors = {
    ...translations.errors,
    ...errors[content.language],
  };

  return {
    ...translations,
    form: updateFormFields(
      updatedSessionValue(form, content.additionalData?.req.session.userCase?.tempchildrenFormData),
      fields
    ),
  };
};
