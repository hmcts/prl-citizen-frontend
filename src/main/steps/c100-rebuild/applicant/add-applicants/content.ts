import { C100ListOfApplicants } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { C100_APPLICANT_ADD_APPLICANTS } from '../../../urls';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Enter your name  ',
  subTitle:
    'You and anyone else making this application are known as the applicants. <br> <br> The other people who will receive this application are known as the respondents. We will ask for their details later.',
  firstName: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastName: 'Last name(s)',
  buttonAddApplicant: 'Add another applicant',
  removeApplicant: 'Remove applicant',
  labelFornewName: 'Enter a new name',
  errors: {
    applicantFirstName: {
      required: 'Enter the first name',
    },
    applicantLastName: {
      required: 'Enter the last name',
    },
  },
});

const cy = () => ({
  pageTitle: 'Enter your name - welsh',
  subTitle:
  'You and anyone else making this application are known as the applicants. <br> <br> The other people who will receive this application are known as the respondents. We will ask for their details later. - welsh',
  firstName: 'First name(s) - welsh',
  firstNameHint: 'Include all middle names here - welsh',
  lastName: 'Last name(s) - welsh',
  buttonAddApplicant: 'Add another applicant - welsh',
  removeApplicant: 'Remove applicant - welsh',
  labelFornewName: 'Enter a new name - welsh',
  errors: {
    applicantFirstName: {
      required: 'Enter the first name - welsh',
    },
    applicantLastName: {
      required: 'Enter the last name - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const generateFormFields = (applicantData: C100ListOfApplicants): GenerateDynamicFormFields => {
  const fields = {};
  const errors = {
    en: {},
    cy: {},
  };

  console.log(applicantData);

  for (let index = 0; index < applicantData.length; index++) {
    const count = index + 1;
    const key = `fieldset${count}`;

    fields[key] = {
      type: 'fieldset',
      label: () => {
        return `Applicant ${count}`;
      },
      classes: 'govuk-fieldset__legend--m',
      subFields: {
        [`ApplicantFirstName-${count}`]: {
          type: 'text',
          value: applicantData[index].applicantFirstName,
          labelSize: 'none',
          classes: 'govuk-input govuk-!-width-one-half',
          label: l => l.firstName,
          validator: value => isFieldFilledIn(value as string),
        },
        [`ApplicantLastName-${count}`]: {
          type: 'text',
          label: l => l.lastName,
          value: applicantData[index].applicantLastName,
          classes: 'govuk-input govuk-!-width-one-half',
          hint: h => h.caseNumberHint,
          labelSize: 'none',
          validator: isFieldFilledIn,
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
      validator: isFieldFilledIn,
      labelSize: 'none',
    },
    applicantLastName: {
      type: 'text',
      classes: 'govuk-input govuk-!-width-one-half',
      label: label => label.lastName,
      validator: isFieldFilledIn,
      labelSize: 'none',
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

  const { fields, errors } = generateFormFields(applicantData);

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
