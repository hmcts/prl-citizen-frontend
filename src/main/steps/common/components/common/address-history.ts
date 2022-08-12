import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { APPLICANT_CHECK_ANSWERS } from '../../../../steps/urls';

const en = () => ({
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
      required: 'Enter your address History',
    },
    buildingAndStreet: {
      required: 'Enter your building and street',
    },
    buildingAndStreet1: {
      required: 'Enter your building and street line2',
    },
    buildingAndStreet2: {
      required: 'Enter your building and street line3',
    },
    townOrCity: {
      required: 'Enter your town or city',
    },
    country: {
      required: 'Enter your country',
    },
    postcode: {
      required: 'Enter your postcode',
    },
  },
});

const cy = () => ({
  section: '',
  title: 'Ydych chi wedi byw yn y cyfeiriad hwn am fwy na 5 mlynedd?',
  one: 'Ydw, rydw i wedi byw yn y cyfeiriad hwn ers mwy na 5 mlynedd',
  two: 'Na, nid wyf wedi byw yn y cyfeiriad hwn ers mwy na 5 mlynedd',
  previousHistory:
    'Rhowch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf, gan ddechrau gyda ch cyfeiriad diweddaraf',
  buildStreet: 'Adeilad a stryd',
  towncity: 'Tref neu ddinas',
  countryLabel: 'Gwlad',
  postcodeLabel: 'Côd post',
  summaryText: 'Cysylltiadau am help',
  continue: 'Cadw a pharhau',
  addAnotherAddress: 'Ychwanegu cyfeiriad arall',
  errors: {
    addressHistory: {
      required: 'Rhowch eich Hanes cyfeiriad',
    },
    buildingAndStreet: {
      required: 'Ewch i mewn i ch adeilad a ch stryd',
    },
    buildingAndStreet1: {
      required: 'Ewch i mewn i ch adeilad a ch llinell stryd2',
    },
    buildingAndStreet2: {
      required: 'Ewch i mewn i ch adeilad a ch llinell stryd3',
    },
    townOrCity: {
      required: 'Ewch i mewn i ch tref neu ddinas',
    },
    country: {
      required: 'Ewch i mewn i ch gwlad',
    },
    postcode: {
      required: 'Rhowch eich cod post',
    },
  },
});

const languages = {
  en,
  cy,
};

const urls = {
  checkAnswers: APPLICANT_CHECK_ANSWERS,
};

export const form: FormContent = {
  fields: {
    addressHistory: {
      type: 'radios',
      classes: 'govuk-radios',
      section: s => s.section,
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
              labelSize: null,
              validator: isFieldFilledIn,
            },
            buildingAndStreet2: {
              type: 'text',
              classes: 'govuk-label',
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
            addButton: {
              type: 'button',
              label: l => l.addAnotherAddress,
              classes: 'govuk-button--secondary',
              value: urls.checkAnswers,
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
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
