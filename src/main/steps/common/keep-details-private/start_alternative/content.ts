import { PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';

export const en = {
  section: 'Keeping your contact details private',
  line1:
    'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  address: 'Address',
  Phone_number: 'Phone number',
  Email: 'Email',
  contact_details_private:
    'Which contact details do you want to keep private from the other people in this application?',
  continue: 'Save and continue',
  [PartyType.RESPONDENT]: {
    title:
      'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
    line2:
      'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private.',
    contact_details_private_hint:
      "You've said that the applicants know some of your contact details. Make sure you select contact details the applicants do not already know.",
    errors: {
      startAlternative: {
        required: 'Enter your start alternative',
      },
      contactDetailsPrivate: {
        required: 'Select your contact details',
      },
    },
  },
  [PartyType.APPLICANT]: {
    title:
      'Do you want to keep your contact details private from the other person named in the application (the respondent)?',
    line2:
      'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
    contact_details_private_hint: 'Make sure you only select details the respondent does not already know.',
    errors: {
      startAlternative: {
        required: 'Please select one among the following',
      },
      contactDetailsPrivate: {
        required: 'Select your contact details',
      },
    },
  },
};

export const cy: typeof en = {
  section: 'Cadw eich manylion cyswllt yn breifat',
  line1:
    'The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.',
  one: 'Ydw',
  two: 'Nac ydw',
  three: 'Nid wyf yn gwybod',
  address: 'Cyfeiriad',
  Phone_number: 'Rhif ffôn',
  Email: 'E-bost',
  contact_details_private:
    "Pa fanylion cyswllt ydych chi eisiau eu cadw'n breifat oddi wrth y bobl eraill yn y cais hwn?",
  continue: 'Cadw a pharhau',
  [PartyType.RESPONDENT]: {
    title:
      'A ydych eisiau cadw eich manylion cyswllt yn breifat oddi wrth yr unigolyn wnaeth wneud cais i’r llys (y ceisydd)?',
    line2:
      "Er enghraifft, os ydych chi'n credu bod y bobl eraill yn yr achos yn peri risg i chi, gallwch ofyn i'r llys gadw eich manylion cyswllt yn breifat.",
    contact_details_private_hint:
      "Rydych wedi dweud bod y ceiswyr yn gwybod rhai o'ch manylion cyswllt. Gwnewch yn siŵr eich bod yn dewis manylion cyswllt nad yw'r ceiswyr yn eu gwybod yn barod.",
    errors: {
      startAlternative: {
        required: 'Nodwch eich dyddiad cychwyn amgen',
      },
      contactDetailsPrivate: {
        required: 'Dewiswch eich manylion cyswllt',
      },
    },
  },
  [PartyType.APPLICANT]: {
    title: 'A yw’r unigolyn a wnaeth gais i’r llys (y ceisydd) yn gwybod unrhyw rai o’ch manylion cyswllt?',
    line2:
      'Bydd eich manylion cyswllt yn cael eu rhannu gyda’r ceisydd, oni bai eich bod yn gofyn i’r llys beidio â rhannu’r wybodaeth hon.',
    contact_details_private_hint:
      'Gwnewch yn siŵr eich bod ond yn dewis manylion nad yw’r ceisydd eisoes yn gwybod amdanynt.',
    errors: {
      startAlternative: {
        required: "Dewiswch un o'r canlynol",
      },
      contactDetailsPrivate: {
        required: 'Dewiswch eich manylion cyswllt',
      },
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
    ...translations[getCasePartyType(content.userCase!, content.userIdamId!)],
    form,
  };
};
