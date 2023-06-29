import { PageContent } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
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
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  title: 'Ydych chi wedi byw yn y cyfeiriad hwn am fwy na 5 mlynedd?',
  one: 'Ydw',
  two: 'Nac ydw',
  explainNoLabel:
    'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf, gan gychwyn gyda’r diweddaraf',
  continue: 'Parhau',
  errors: {
    isAtAddressLessThan5Years: {
      required: 'Rhowch eich manylion hysbys',
    },
    citizenUserAddressHistory: {
      required:
        'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf, gan gychwyn gyda’r diweddaraf',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

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
            validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
          },
        },
      },
    ],
    validator: isFieldFilledIn,
  },
});

export const form: FormContent = {
  fields: addressHistoryFields(),
  submit: {
    text: l => l.continue,
  },
};

export const generateContent = (content: CommonContent): PageContent => ({
  ...languages[content.language],
  form,
});
