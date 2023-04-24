import { Case } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { en as english, cy as welsh } from '../../../common/keep-details-private/start_alternative/content';
const en = {
  ...english,
  title:
    'Do you want to keep your contact details private from the other person named in the application (the respondent)?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  contact_details_private_hint: 'Make sure you only select details the respondent does not already know.',
  continue: 'Save and continue',
};

const cy: typeof en = {
  ...welsh,
  title:
    'Do you want to keep your contact details private from the other person named in the application (the respondent)?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  contact_details_private_hint: 'Make sure you only select details the respondent does not already know.',
  continue: 'Save and continue',
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
                  value: 'phoneNumber',
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
