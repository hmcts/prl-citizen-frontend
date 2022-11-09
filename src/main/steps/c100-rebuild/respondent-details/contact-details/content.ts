import { C100RebuildPartyDetails, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../../app/form/validation';
import { getRespndentDetails } from '../util';

const en = () => ({
  title: 'Contact details of',
  subTitle:
    'Include as much detail as you can. If there’s information missing, your application may take longer to process.',
  donKnowEmailAddress: "I don't know their email",
  emailAddress: 'Email address',
  telephoneNumber: 'Telephone number',
  donKnowTelephoneNumber: "I don't know their telephone number",
  errors: {
    emailAddress: {
      required: 'Enter an email address in the correct format, like name@example.com',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    telephoneNumber: {
      required: 'Enter an answer',
      invalid: 'is invalid',
    },
  },
});

const cy = () => ({
  title: 'Contact details of - welsh ',
  subTitle:
    'Include as much detail as you can. If there’s information missing, your application may take longer to process. - welsh',
  donKnowEmailAddress: "I don't know their email - welsh",
  emailAddress: 'Email address - welsh',
  telephoneNumber: 'Telephone number - welsh',
  donKnowTelephoneNumber: "I don't know their telephone number - welsh",
  errors: {
    emailAddress: {
      required: 'Enter an email address in the correct format, like name@example.com - welsh',
      invalid: 'Enter an email address in the correct format, like name@example.com - welsh',
    },
    telephoneNumber: {
      required: 'Enter an answer - welsh',
      invalid: 'is invalid - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

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
  contactDetails: C100RebuildPartyDetails['contactDetails']
): GenerateDynamicFormFields => {
  const { donKnowEmailAddress, emailAddress, telephoneNumber, donKnowTelephoneNumber } = contactDetails!;

  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    emailAddress: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.emailAddress,
      value: emailAddress,
      labelSize: null,
      validator: (value, formData) =>
        formData?.donKnowEmailAddress === YesOrNo.YES ? '' : isFieldFilledIn(value) || isEmailValid(value),
    },

    donKnowEmailAddress: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes--small',
      values: [
        {
          name: 'donKnowEmailAddress',
          label: l => l.donKnowEmailAddress,
          selected: donKnowEmailAddress === YesOrNo.YES,
          value: YesOrNo.YES,
        },
      ],
    },

    telephoneNumber: {
      type: 'text',
      classes: 'govuk-input--width-10',
      label: l => l.telephoneNumber,
      value: telephoneNumber,
      labelSize: null,
      validator: (value, formData) =>
        formData?.donKnowTelephoneNumber === YesOrNo.YES ? '' : isFieldFilledIn(value) || isPhoneNoValid(value),
    },

    donKnowTelephoneNumber: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes--small',
      values: [
        {
          name: 'donKnowTelephoneNumber',
          label: l => l.donKnowTelephoneNumber,
          selected: donKnowTelephoneNumber === YesOrNo.YES,
          value: YesOrNo.YES,
        },
      ],
    },
  };

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

export const getFormFields = (): FormContent => {
  return updatedForm;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const respondentId = content.additionalData!.req.params.respondentId;
  const respondentDetails = getRespndentDetails(content.userCase!.resp_Respondents ?? [], respondentId)!;
  const { fields } = generateFormFields(respondentDetails.contactDetails);

  return {
    ...translations,
    title: `${translations['title']} ${respondentDetails.firstName} ${respondentDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
