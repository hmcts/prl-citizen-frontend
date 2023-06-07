import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';

export const en = {
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
  address: 'Address',
  Phone_number: 'Phone number',
  contact_details_private_hint:
    "You've said that the applicants know some of your contact details. Make sure you select contact details the applicants do not already know.",
  Email: 'Email',
  contact_details_private:
    'Which contact details do you want to keep private from the other people in this application?',
  continue: 'Save and continue',
  errors: {
    startAlternative: {
      required: 'Enter your start alternative',
    },
    contactDetailsPrivate: {
      required: 'Select your contact details',
    },
  },
};

export const cy: typeof en = {
  section: 'Cadw eich manylion cyswllt yn breifat',
  title:
    'A ydych eisiau cadw eich manylion cyswllt yn breifat oddi wrth yr unigolyn wnaeth wneud cais i’r llys (y ceisydd)?',
  line1:
    'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.',
  line2:
    "Er enghraifft, os ydych chi'n credu bod y bobl eraill yn yr achos yn peri risg i chi, gallwch ofyn i'r llys gadw eich manylion cyswllt yn breifat.",
  one: 'Ydw',
  two: 'Nac ydw',
  three: 'Nid wyf yn gwybod',
  address: 'Cyfeiriad',
  Phone_number: 'Rhif ffôn',
  Email: 'E-bost',
  contact_details_private:
    "Pa fanylion cyswllt ydych chi eisiau eu cadw'n breifat oddi wrth y bobl eraill yn y cais hwn?",
  contact_details_private_hint:
    "Rydych wedi dweud bod y ceiswyr yn gwybod rhai o'ch manylion cyswllt. Gwnewch yn siŵr eich bod yn dewis manylion cyswllt nad yw'r ceiswyr yn eu gwybod yn barod.",
  continue: 'Cadw a pharhau',
  errors: {
    startAlternative: {
      required: 'Nodwch eich dyddiad cychwyn amgen',
    },
    contactDetailsPrivate: {
      required: 'Dewiswch eich manylion cyswllt',
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
              validator: atLeastOneFieldIsChecked,
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
