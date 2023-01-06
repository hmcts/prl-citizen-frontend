import { Case } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle: `Do you want to keep your contact details private from 
  the other people named in the application (the respondents)?`,
  paragraph1: 'The information you give us will be shared with the respondents. This includes your contact details.',
  paragraph2: `For example, if you believe the other people in the case pose a risk to you or the children, 
  you can ask the court to keep your contact details private.`,
  one: 'Yes',
  two: 'No',
  contact_details_private: `Specify which contact details you want to keep private.
  Make sure you only select details the applicants do not already know.`,
  address: 'Address',
  homePhoneNumber: 'Home phone number',
  mobilePhoneNumber: 'Mobile phone number',
  Email: 'Email',
  errors: {
    startAlternative: {
      required: 'Select yes if you want to keep your details private',
    },
    contactDetailsPrivateAlternative: {
      required: `Select which contact details you want to keep private.
      Make sure you only select details the applicants do not already know.`,
    },
  },
});

const cy = () => ({
  caption: 'Cadw eich manylion cyswllt yn breifat',
  headingTitle:
    'Ydych chi eisiau cadw eich manylion cyswllt yn breifat oddi wrth y bobl eraill a enwir yn y cais (yr atebwyr)?',
  paragraph1:
    "Bydd yr wybodaeth a roddwch i ni yn cael ei rhannu gyda'r atebwyr. Mae hyn yn cynnwys eich manylion cyswllt.",
  paragraph2:
    "Er enghraifft, os ydych chi'n credu bod y bobl eraill yn yr achos yn peri risg i chi neu'r plant, gallwch ofyn i'r llys gadw eich manylion cyswllt yn breifat.",
  one: 'Ydw',
  two: 'Nac ydw',
  contact_details_private:
    "Nodwch pa fanylion cyswllt rydych chi eisiau eu cadw'n breifat. Gwnewch yn siŵr eich bod ond yn dewis manylion nad yw'r atebwyr eisoes yn gwybod amdanynt.",
  address: 'Cyfeiriad',
  homePhoneNumber: 'Home phone number - Welsh',
  mobilePhoneNumber: 'Mobile phone number - Welsh',
  Email: 'E-bost',
  errors: {
    startAlternative: {
      required: 'Select yes if you want to keep your details private',
    },
    contactDetailsPrivateAlternative: {
      required:
        "Nodwch pa fanylion cyswllt rydych chi eisiau eu cadw'n breifat. Gwnewch yn siŵr eich bod ond yn dewis manylion nad yw'r atebwyr eisoes yn gwybod amdanynt.",
    },
  },
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
            contactDetailsPrivateAlternative: {
              type: 'checkboxes',
              label: l => l.contact_details_private,
              // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
              validator: (value, formData: Partial<Case>) => {
                if (formData.startAlternative === 'Yes') {
                  return atLeastOneFieldIsChecked(formData?.contactDetailsPrivateAlternative);
                }
                return '';
              },
              values: [
                {
                  name: 'contactDetailsPrivateAlternative',
                  label: l => l.address,
                  value: 'address',
                },
                {
                  name: 'contactDetailsPrivateAlternative',
                  label: l => l.homePhoneNumber,
                  value: 'homephone',
                },
                {
                  name: 'contactDetailsPrivateAlternative',
                  label: l => l.mobilePhoneNumber,
                  value: 'mobilephone',
                },
                {
                  name: 'contactDetailsPrivateAlternative',
                  label: l => l.Email,
                  value: 'email',
                },
              ],
            },
          },
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.onlycontinue,
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
