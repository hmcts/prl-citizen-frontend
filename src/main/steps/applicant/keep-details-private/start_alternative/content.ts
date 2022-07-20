import { Case } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Keeping your contact details private',
  title:
    'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
  line1:
    'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.',
  line2:
    'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  address: 'Address',
  Phone_number: 'Phone number',
  contact_details_private_hint:
    "You've said that the applicants know some of your contact details. Make sure you select contact details the applicants do not already know.",
  Email: 'Email',
  contact_details_private:
    'Which contact details do you want to keep private from the other people in this application?',
  continue: 'Continue',
  errors: {
    startAlternative: {
      required: 'Enter your start alternative',
    },
    contactDetailsPrivate: {
      required: 'Select your contact details',
    },
  },
};

const cy: typeof en = {
  section: 'Keeping your contact details private',
  title:
    'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
  line1:
    'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.',
  line2:
    'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  address: 'Address',
  Phone_number: 'Phone number',
  Email: 'Email',
  contact_details_private:
    'Which contact details do you want to keep private from the other people in this application?',
  contact_details_private_hint:
    "You've said that the applicants know some of your contact details. Make sure you select contact details the applicants do not already know.",
  continue: 'Continue',
  errors: {
    startAlternative: {
      required: 'Enter your start alternative',
    },
    contactDetailsPrivate: {
      required: 'Select your contact details',
    },
  },
};
const languages = {
  en,
  cy,
};
//@typescript-eslint/explicit-module-boundary-type
export const form: FormContent = {
  fields: {
    startAlternative: {
      id: 'startAlternative',
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: 'Yes',
          subFields: {
            contactDetailsPrivate: {
              type: 'checkboxes',
              label: l => l.contact_details_private,
              hint: l => l.contact_details_private_hint,
              // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
              validator: (value, formData: Partial<Case>) => {
                if (formData.startAlternative === 'Yes') {
                  return atLeastOneFieldIsChecked(formData?.contactDetailsPrivate);
                }
                return '';
              },
              values: [
                {
                  name: 'contactDetailsPrivate',
                  label: l => l.address,
                  value: 'address',
                },
                {
                  name: 'contactDetailsPrivate',
                  label: l => l.Phone_number,
                  value: 'phone',
                },
                {
                  name: 'contactDetailsPrivate',
                  label: l => l.Email,
                  value: 'email',
                },
              ],
            },
          },
        },
        {
          label: l => l.two,
          value: 'No',
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
