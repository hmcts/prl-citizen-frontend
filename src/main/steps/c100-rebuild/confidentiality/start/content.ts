import { Case } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle: `Do you want to keep your contact details private from 
  the other people named in the application (the applicants)?`,
  paragraph1: 'The information you give us will be shared with the respondents. This includes your contact details.',
  paragraph2: `For example, if you believe the other people in the case pose a risk to you or the children, 
  you can ask the court to keep your contact details private.`,
  one: 'Yes',
  two: 'No',
  contact_details_private: 'Specify which contact details you want to keep private.',
  address: 'Address',
  homePhoneNumber: 'Home phone number',
  mobilePhoneNumber: 'Mobile phone number',
  Email: 'Email',
  errors: {
    start: {
      required: 'Select yes if you want to keep your details private',
    },
    contactDetailsPrivate: {
      required: 'Select which contact details you want to keep private',
    },
  },
});

const cy = () => ({
  caption: 'Cadw eich manylion cyswllt yn breifat ar gyfer',
  headingTitle:
    'Ydych chi eisiau cadw eich manylion cyswllt yn breifat ar gyfer oddi wrth y bobl eraill a enwir yn y cais (yr atebwyr)?',
  paragraph1:
    "Bydd yr wybodaeth a roddwch i ni yn cael ei rhannu gyda'r atebwyr. Mae hyn yn cynnwys eich manylion cyswllt.",
  paragraph2:
    "Er enghraifft, os ydych chi'n credu bod y bobl eraill yn yr achos yn peri risg i chi neu'r plant, gallwch ofyn i'r llys gadw eich manylion cyswllt yn breifat.",
  one: 'Ydw',
  two: 'Nac ydw',
  contact_details_private: "Nodwch pa fanylion cyswllt rydych chi eisiau eu cadw'n breifat.",
  address: 'Cyfeiriad',
  homePhoneNumber: 'Rhif ffôn cartref',
  mobilePhoneNumber: 'Rhif ffôn symudol',
  Email: 'E-bost',
  errors: {
    start: {
      required: "Dewiswch 'ydw' os ydych am gadw eich manylion yn breifat",
    },
    contactDetailsPrivate: {
      required: "Nodwch pa fanylion cyswllt rydych chi eisiau eu cadw'n breifat",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    start: {
      id: 'start',
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
                if (formData.start === 'Yes') {
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
