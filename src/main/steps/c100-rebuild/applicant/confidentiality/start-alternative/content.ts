import { Case } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';

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
  caption: 'Keeping your contact details private  - welsh',
  headingTitle: `Do you want to keep your contact details private from 
  the other people named in the application (the respondents)? - welsh`,
  paragraph1: `The information you give us will be shared with the respondents. 
  This includes your contact details. - welsh`,
  paragraph2: `For example, if you believe the other people in the case pose a risk to you or the children, 
  you can ask the court to keep your contact details private. - welsh`,
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  contact_details_private: `Specify which contact details you want to keep private.
  Make sure you only select details the applicants do not already know. - welsh`,
  address: 'Address - Welsh',
  homePhoneNumber: 'Home phone number - Welsh',
  mobilePhoneNumber: 'Mobile phone number - Welsh',
  Email: 'Email - Welsh',
  errors: {
    startAlternative: {
      required: 'Select yes if you want to keep your details private',
    },
    contactDetailsPrivateAlternative: {
      required: `Select which contact details you want to keep private.
      Make sure you only select details the applicants do not already know. - welsh`,
    },
  },
});

const languages = {
  en,
  cy,
};

//c

export const form: FormContent = {
  fields: {
    startAlternative: {
      id: 'startAlternative',
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [],
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

type FieldLabel = {
  name: string;
  label: string;
  value: string;
  attributes: {
    checked: boolean;
  };
};

type FieldLabelArray = FieldLabel[];

export const generateContent: TranslationFn = content => {
  const userId = content['userId'];
  const startOption = content.userCase?.allApplicants?.filter(user => user['id'] === userId)[0]?.['startAlternative'];
  const contactDetailsPrivateAlternative = content.userCase?.allApplicants?.filter(user => user['id'] === userId)[0]?.[
    'contactDetailsPrivateAlternative'
  ] as [];

  let detailKnownFormField = form.fields['startAlternative']?.['values'];

  const formFieldValues = [
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
  ];
  switch (startOption) {
    case YesOrNo.YES:
      // eslint-disable-next-line no-case-declarations
      let subFieldValueStorage: FieldLabelArray = [];
      detailKnownFormField = formFieldValues.map(fieldSet => {
        const { value } = fieldSet;
        if (value === YesOrNo.YES) {
          fieldSet['attributes'] = { checked: true };
          const subFields = fieldSet['subFields']?.['contactDetailsPrivateAlternative']['values'] as [];
          for (const subValue of subFields) {
            for (const bodyVal of contactDetailsPrivateAlternative) {
              const field: FieldLabel = subValue as never;
              if (subValue['value'] === bodyVal) {
                field['attributes'] = { checked: true };
              }
              subFieldValueStorage = [
                ...subFieldValueStorage.filter(item => item.value !== field['value']),
                field as FieldLabel,
              ];
            }
          }
          if (fieldSet.subFields?.contactDetailsPrivateAlternative.values) {
            fieldSet.subFields.contactDetailsPrivateAlternative.values = subFieldValueStorage as any;
          }
        }
        return fieldSet;
      });
      break;

    case YesOrNo.NO:
      detailKnownFormField = formFieldValues.map(fieldSet => {
        const { value } = fieldSet;
        if (value === YesOrNo.NO) {
          fieldSet['attributes'] = { checked: true };
        }
        return fieldSet;
      });
      break;

    default:
      detailKnownFormField = formFieldValues;
  }
  form.fields['startAlternative'].values = detailKnownFormField;
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
