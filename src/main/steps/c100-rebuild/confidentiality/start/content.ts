import { YesOrNo } from '../../../../app/case/definition';
import { Case } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, atLeastOneFieldIsChecked } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle: 'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
  paragraph1: 'The information you give us will be shared with the respondents. This includes your contact details.',
  paragraph2: 'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private.',
  one: 'Yes',
  two: 'No',
  contact_details_private: "Specify which contact details you want to keep private.",
  address: 'Address',
  homePhoneNumber: 'Home phone number',
  mobilePhoneNumber: 'Mobile phone number',
  Email: 'Email'
});

const cy = () => ({
  caption: 'Keeping your contact details private  - welsh',
  headingTitle:
    'Do you want to keep your contact details private from the other people named in the application (the applicants)? - welsh  ',
  paragraph1: 'The information you give us will be shared with the respondents. This includes your contact details. - welsh',
  paragraph2: 'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private. - welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  contact_details_private: "Specify which contact details you want to keep private. - Welsh",
  address: 'Address - Welsh',
  homePhoneNumber: 'Home phone number - Welsh',
  mobilePhoneNumber: 'Mobile phone number - Welsh',
  Email: 'Email - Welsh'
});

const languages = {
  en,
  cy,
};

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
          value: YesOrNo.YES,
          subFields: {
            contactDetailsPrivate: {
              type: 'checkboxes',
              label: l => l.contact_details_private,
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
                  label: l => l.homePhoneNumber,
                  value: 'homephone',
                },
                {
                  name: 'contactDetailsPrivate',
                  label: l => l.mobilePhoneNumber,
                  value: 'mobilephone',
                }, 
                {
                  name: 'contactDetailsPrivate',
                  label: l => l.Email,
                  value: 'email',
                }
              ],
            },
          },
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        }
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
