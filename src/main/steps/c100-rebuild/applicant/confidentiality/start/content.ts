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
  contact_details_private:
    'Specify which contact details you want to keep private.\n Make sure you only select details the respondents do not know already',
  address: 'Address',
  telephoneNumber: 'Telephone number',
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
  caption: 'Keeping your contact details private  - welsh',
  headingTitle: `Do you want to keep your contact details private from 
  the other people named in the application (the respondents)? - welsh`,
  paragraph1: `The information you give us will be shared with the respondents. 
  This includes your contact details. - welsh`,
  paragraph2: `For example, if you believe the other people in the case pose a risk to you or the children, 
  you can ask the court to keep your contact details private. - welsh`,
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  contact_details_private:
    'Specify which contact details you want to keep private.\n Make sure you only select details the respondents do not know already - welsh',
  address: 'Address - welsh',
  telephoneNumber: 'Telephone number - welsh',
  Email: 'Email - welsh',
  errors: {
    start: {
      required: 'Select yes if you want to keep your details private - Welsh',
    },
    contactDetailsPrivate: {
      required: 'Select which contact details you want to keep private - Welsh',
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
  const applicantId = content.additionalData?.req.params?.applicantId ?? '';
  const userId = applicantId;
  const startOption = content.userCase?.appl_allApplicants?.filter(user => user['id'] === userId)[0]?.['start'];
  const contactDetailsPrivate = content.userCase?.appl_allApplicants?.filter(user => user['id'] === userId)[0]?.[
    'contactDetailsPrivate'
  ] as [];
  let detailKnownFormField = form.fields['start']['values']!;
  const formFieldValues = [
    {
      label: l => l.one,
      value: YesOrNo.YES,
      subFields: {
        contactDetailsPrivate: {
          type: 'checkboxes',
          hint: l => l.contact_details_private,
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
              label: l => l.telephoneNumber,
              value: 'telephone',
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
  ];

  switch (startOption) {
    case YesOrNo.YES:
      // eslint-disable-next-line no-case-declarations
      let subFieldValueStorage: FieldLabelArray = [];
      detailKnownFormField = formFieldValues.map(fieldSet => {
        const { value } = fieldSet;
        if (value === YesOrNo.YES) {
          fieldSet['attributes'] = { checked: true };
          const subFields = fieldSet['subFields']?.['contactDetailsPrivate']['values'] as [];
          for (const subValue of subFields) {
            for (const bodyVal of contactDetailsPrivate) {
              const field: FieldLabel = subValue;
              if (subValue['value'] === bodyVal) {
                field['attributes'] = { checked: true };
              }
              subFieldValueStorage = [
                ...subFieldValueStorage.filter(item => item.value !== field['value']),
                field as FieldLabel,
              ];
            }
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
  form.fields['start'].values = detailKnownFormField;
  const translations = languages[content.language]();
  const applicantData = content.userCase?.appl_allApplicants?.filter(user => user['id'] === userId)[0];
  const applicantName = applicantData?.['applicantFirstName'] + ' ' + applicantData?.['applicantLastName'];
  translations['applicantName'] = applicantName;
  return {
    ...translations,
    form,
  };
};
