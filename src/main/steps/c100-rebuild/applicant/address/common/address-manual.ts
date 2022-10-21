import { C100Applicant } from 'app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  addressLine1: 'Building and street',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  addressHistoryLabel: 'Have you lived at this address for more than 5 years?',
  one: 'Yes',
  two: 'No',
  explainNoLabel: 'Provide details of previous addresses you have lived at in the last 5 years',
  explainNoHint: 'Start with your most recent',
});

const cy = () => ({
  addressLine1: 'Building and street - welsh',
  town: 'Town or city - welsh',
  county: 'County - welsh',
  postcode: 'Postcode - welsh',
  enterInternationalAddress: 'Enter an international address - welsh',
  addressHistoryLabel: 'Have you lived at this address for more than 5 years? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  explainNoLabel: 'Provide details of previous addresses you have lived at in the last 5 years - welsh',
  explainNoHint: 'Start with your most recent - welsh',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

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

export const generateFormFields = (applicantData: C100Applicant): GenerateDynamicFormFields => {
  // const { applicantAddressPostcode, applicantAddress1, applicantAddress2, applicantAddressTown,
  //   applicantAddressCounty, applicantProvideDetailsOfPreviousAddresses} = applicantData;

  const { applicantAddress1} = applicantData;

const errors = {
      en: {},
      cy: {},
};

  const fields = {
    address1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine1,
      labelSize: null,
      value: applicantAddress1,
      validator: isFieldFilledIn,
    },
    // address2: {
    //   type: 'text',
    //   classes: 'govuk-label',
    //   label: l => l.addressLine2,
    //   value: applicantAddress2,
    //   labelSize: null,
    // },
    // addressTown: {
    //   type: 'text',
    //   classes: 'govuk-label govuk-!-width-two-thirds',
    //   label: l => l.town,
    //   value: applicantAddressTown,
    //   labelSize: null,
    //   validator: isFieldFilledIn,
    // },
    // addressCounty: {
    //   type: 'text',
    //   classes: 'govuk-label govuk-!-width-two-thirds',
    //   label: l => l.county,
    //   value: applicantAddressCounty,
    //   labelSize: null,
    // },
    // addressPostcode: {
    //   type: 'text',
    //   classes: 'govuk-label govuk-input--width-10',
    //   label: l => l.postcode,
    //   labelSize: null,
    //   value: applicantAddressPostcode,
    //   attributes: {
    //     maxLength: 14,
    //   },
    //   validator: isInvalidPostcode,
    // },
    // addressHistory: {
    //   type: 'radios',
    //   classes: 'govuk-radios',
    //   label: l => l.addressHistoryLabel,
    //   labelSize: 'm',
    //   section: l => l.section,
    //   values: [
    //     {
    //       label: l => l.one,
    //       value: 'Yes',
    //     },
    //     {
    //       label: l => l.two,
    //       value: 'No',
    //       subFields: {
    //         provideDetailsOfPreviousAddresses: {
    //           type: 'textarea',
    //           label: l => l.explainNoLabel,
    //           labelSize: null,
    //           hint: l => l.explainNoHint,
    //           value: applicantProvideDetailsOfPreviousAddresses,
    //           id: 'provideDetailsOfPreviousAddresses',
    //           validator: value => isFieldFilledIn(value),
    //         },
    //       },
    //     },
    //   ],
    //   validator: isFieldFilledIn,
    // },
  };
  return {fields, errors};
}

export const generateContent: TranslationFn = content => {
  const applicantId = content?.additionalData?.req?.query?.applicantId as string;
  const applicantData = content.userCase?.appl_allApplicants?.find(i => i.id === applicantId) as C100Applicant;
  const { fields } = generateFormFields(applicantData);
  const translations = languages[content.language]();
  return {
    ...translations,
  //  title: `${translations['title']} ${applicantData.applicantFirstName} ${applicantData.applicantLastName}`,
    form: updateFormFields(form, fields),
  };
};
