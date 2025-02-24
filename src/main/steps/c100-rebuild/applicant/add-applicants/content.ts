import _ from 'lodash';

import { C100ListOfApplicants } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormInput, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../../app/form/validation';
import { C100_APPLICANT_ADD_APPLICANTS } from '../../../urls';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Enter your name',
  subTitle:
    'You and anyone else making this application are known as the applicants. <br> <br> The other people who will receive this application are known as the respondents. We will ask for their details later.',
  applicant: 'Applicant',
  firstName: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastName: 'Last name(s)',
  buttonAddApplicant: 'Add another applicant',
  removeApplicant: 'Remove applicant',
  labelFornewName: 'Enter name',
  errors: {
    applicantFirstName: {
      required: 'Enter the first name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    applicantLastName: {
      required: 'Enter the last name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
  },
});

const cy = () => ({
  title: 'Nodwch eich enw',
  subTitle:
    'Gelwir chi ac unrhyw un arall sy’n gwneud y cais hwn yn ‘y ceiswyr’.<br> <br> Gelwir y bobl eraill sy’n derbyn y cais hwn yn ‘yr atebwyr.’ Byddwn yn gofyn am eu manylion yn nes ymlaen.',
  applicant: 'Ceisydd',
  firstName: 'Enw(au) cyntaf',
  firstNameHint: 'Nodwch bob enw canol yma',
  lastName: 'Cyfenw(au)',
  buttonAddApplicant: 'Ychwanegu ceisydd arall',
  removeApplicant: 'Dileu Ceisydd',
  labelFornewName: 'Enter name -welsh',
  errors: {
    applicantFirstName: {
      required: 'Nodwch yr enw cyntaf',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    applicantLastName: {
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

export const generateFormFields = (
  applicantData: C100ListOfApplicants,
  context: string | undefined
): GenerateDynamicFormFields => {
  const fields = {};
  const errors = {
    en: {},
    cy: {},
  };
  const nameFieldConfig: FormInput = {
    type: 'text',
    labelSize: 'none',
    classes: 'govuk-!-width-one-half',
    validator: value => isFieldFilledIn(value) || isFieldLetters(value),
    attributes: {
      autocomplete: 'off',
    },
  };

  for (let index = 0; index < applicantData.length; index++) {
    const count = index + 1;
    const key = `fieldset${count}`;
    const inputFieldConfig = { ...nameFieldConfig };

    if ((context === 'add' && count === applicantData.length) || (context === 'remove' && count === 1)) {
      inputFieldConfig.attributes = {
        ...inputFieldConfig.attributes,
        autofocus: true,
      };
    }

    fields[key] = {
      type: 'fieldset',
      label: l => {
        return `${l.applicant} ${count}`;
      },
      classes: 'govuk-fieldset__legend--m',
      subFields: {
        [`ApplicantFirstName-${count}`]: {
          ...inputFieldConfig,
          label: l => l.firstName,
          value: applicantData[index].applicantFirstName,
        },
        [`ApplicantLastName-${count}`]: {
          ...inputFieldConfig,
          label: l => l.lastName,
          value: applicantData[index].applicantLastName,
        },
        removeApplicant: {
          type: 'link',
          label: l => l.removeApplicant + ` ${count}`,
          classes: 'govuk-button govuk-button--warning margin-top-3',
          value: 'Yes',
          href: `${C100_APPLICANT_ADD_APPLICANTS}?action=remove&applicantId=${applicantData[index].id}`,
        },
      },
    };

    //generate dynamic error message
    errors.en = {
      ...errors.en,
      [`ApplicantFirstName-${count}`]: en().errors.applicantFirstName,
      [`ApplicantLastName-${count}`]: en().errors.applicantLastName,
    };
    errors.cy = {
      ...errors.cy,
      [`ApplicantFirstName-${count}`]: cy().errors.applicantFirstName,
      [`ApplicantLastName-${count}`]: cy().errors.applicantLastName,
    };
  }

  return { fields, errors };
};

export const form: FormContent = {
  fields: {
    applicantLabel: {
      type: 'heading',
      label: label => label.labelFornewName,
      labelSize: 'm',
    },
    applicantFirstName: {
      type: 'text',
      classes: 'govuk-input govuk-!-width-one-half',
      label: label => label.firstName,
      hint: hint => hint.firstNameHint,
      validator: value => isFieldFilledIn(value) || isFieldLetters(value),
      labelSize: 'none',
      attributes: {
        autocomplete: 'off',
      },
    },
    applicantLastName: {
      type: 'text',
      classes: 'govuk-input govuk-!-width-one-half',
      label: label => label.lastName,
      labelSize: 'none',
      validator: value => isFieldFilledIn(value) || isFieldLetters(value),
      attributes: {
        autocomplete: 'off',
      },
    },
    addAnotherApplicant: {
      type: 'button',
      label: l => l.buttonAddApplicant,
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
  formValues.fields['applicantFirstName'].value = sessionData.TempFirstName;
  formValues.fields['applicantLastName'].value = sessionData.TempLastName;
  return {
    ...formValues,
  };
};

export const generateContent: TranslationFn = content => {
  const sessionDataOFApplicant = content.additionalData?.req.session;
  const applicantData: C100ListOfApplicants =
    sessionDataOFApplicant['userCase'].hasOwnProperty('appl_allApplicants') &&
    sessionDataOFApplicant['userCase']['appl_allApplicants']
      ? sessionDataOFApplicant['userCase']['appl_allApplicants']
      : ([] as C100ListOfApplicants);
  const translations = languages[content.language]();

  const { fields, errors } = generateFormFields(
    applicantData,
    _.get(content, 'additionalData.req.session.applicationSettings.dynamicForm.context')
  );

  translations.errors = {
    ...translations.errors,
    ...errors[content.language],
  };

  return {
    ...translations,
    form: updateFormFields(
      updatedSessionValue(form, content.additionalData?.req.session.userCase?.applicantTemporaryFormData),
      fields
    ),
  };
};
