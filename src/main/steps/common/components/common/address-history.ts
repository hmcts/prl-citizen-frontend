import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: '',
  title: 'Have you lived at this address for more than 5 years?',
  one: 'Yes, I have lived at this address for more than 5 years',
  two: 'No, I have not lived at this address for more than 5 years',
  previousHistory:
    'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
  buildStreet: 'Building and street',
  towncity: 'Town or city',
  countryLabel: 'Country',
  postcodeLabel: 'Postcode',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  addAnotherAddress: 'Add another address',
  errors: {
    addressHistory: {
      required: 'Enter your details known',
    },
  },
};

const cy: typeof en = {
  section: '',
  title: 'Do the other people named in this application (the applicants) know any of your contact details?',
  one: 'Yes, I have lived at this address for more than 5 years',
  two: 'No, I have not lived at this address for more than 5 years',
  previousHistory:
    'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
  buildStreet: 'Building and street',
  towncity: 'Town or city',
  countryLabel: 'Country',
  postcodeLabel: 'Postcode',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  addAnotherAddress: 'Add another address',
  errors: {
    addressHistory: {
      required: 'Enter your details known',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    addressHistory: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: 'Yes',
        },
        {
          label: l => l.two,
          value: 'No',
          subFields: {
            previousAddressHistory: {
              type: 'label',
              classes: 'govuk-label',
              label: l => l.previousHistory,
              labelSize: null,
            },
            buildingAndStreet: {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.buildStreet,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            buildingAndStreet1: {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.label,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            buildingAndStreet2: {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.label,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            townOrCity: {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.towncity,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            country: {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.countryLabel,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            postcode: {
              type: 'text',
              classes: 'govuk-label',
              label: l => l.postcodeLabel,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.addAnotherAddress,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
