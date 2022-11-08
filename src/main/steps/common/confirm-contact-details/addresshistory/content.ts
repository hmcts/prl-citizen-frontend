//import { Case } from '../../../../app/case/case';
import { PageContent } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

const en = {
  title: 'Have you lived at this address for more than 5 years?',
  one: 'Yes',
  two: 'No',
  explainNoLabel:
    'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
  continue: 'Continue',
  errors: {
    isAtAddressLessThan5Years: {
      required: 'Enter your details known',
    },
    citizenUserAddressHistory: {
      required:
        'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
    },
  },
};

const cy: typeof en = {
  title: 'Have you lived at this address for more than 5 years?',
  one: 'Yes',
  two: 'No',
  explainNoLabel:
    'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
  continue: 'Continue',
  errors: {
    isAtAddressLessThan5Years: {
      required: 'Enter your details known',
    },
    citizenUserAddressHistory: {
      required:
        'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent = (content: CommonContent): PageContent => ({
  ...languages[content.language],
  form: { ...form, fields: addressHistoryFields() },
});

export const addressHistoryFields = (): FormFields => ({
  isAtAddressLessThan5Years: {
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
          citizenUserAddressHistory: {
            type: 'textarea',
            label: l => l.explainNoLabel,
            id: 'provideDetailsOfPreviousAddresses',
            validator: value => isFieldFilledIn(value),
          },
        },
      },
    ],
    validator: isFieldFilledIn,
  },
});
