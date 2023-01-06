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
  contact_details_private: 'Specify which contact details you want to keep private.',
  address: 'Address',
  telephoneNumber: 'Telephone number',
  Email: 'Email',
  errors: {
    startAlternative: {
      required: 'Select yes if you want to keep your details private',
    },
    contactDetailsPrivateAlternative: {
      required: 'Select which contact details you want to keep private.',
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
  contact_details_private: "Nodwch pa fanylion cyswllt rydych chi eisiau eu cadw'n breifat.",
  address: 'Cyfeiriad',
  telephoneNumber: 'Rhif ffôn',
  Email: 'E-bost',
  errors: {
    startAlternative: {
      required: 'Dewiswch oes os ydych eisiau cadw eich mnylion yn gyfrinachol',
    },
    contactDetailsPrivateAlternative: {
      required: "Dewiswch pa fanylion cyswllt rydych chi eisiau eu cadw'n gyfrinachol",
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
    _ctx: {
      type: 'hidden',
      labelHidden: true,
      value: 'appl_start_alternative',
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
  const applicantId = content.additionalData?.req.params.applicantId ?? '';
  const userId = applicantId;
  const startOption = content.userCase!.appl_allApplicants?.filter(user => user['id'] === userId)[0]?.[
    'startAlternative'
  ];
  const contactDetailsPrivateAlternative = content.userCase?.appl_allApplicants?.filter(
    user => user['id'] === userId
  )[0]?.['contactDetailsPrivateAlternative'] as [];

  let detailKnownFormField = form.fields['startAlternative']?.['values'];

  const formFieldValues = [
    {
      label: l => l.one,
      value: YesOrNo.YES,
      subFields: {
        contactDetailsPrivateAlternative: {
          type: 'checkboxes',
          hint: l => l.contact_details_private,
          // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
          validator: (value, formData: Partial<Case>) => {
            if (formData.startAlternative === 'Yes') {
              return atLeastOneFieldIsChecked(formData?.contactDetailsPrivateAlternative);
            }
          },
          values: [
            {
              name: 'contactDetailsPrivateAlternative',
              label: l => l.address,
              value: 'address',
            },
            {
              name: 'contactDetailsPrivateAlternative',
              label: l => l.telephoneNumber,
              value: 'telephone',
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
          const subFields = fieldSet['subFields']!['contactDetailsPrivateAlternative']['values'] as [];
          for (const subValue of subFields) {
            for (const bodyVal of contactDetailsPrivateAlternative) {
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
  form.fields['startAlternative'].values = detailKnownFormField;
  const translations = languages[content.language]();
  const applicantData = content.userCase?.appl_allApplicants?.filter(user => user['id'] === userId)[0];
  const applicantName = applicantData?.['applicantFirstName'] + ' ' + applicantData?.['applicantLastName'];
  translations['applicantName'] = applicantName;
  return {
    ...translations,
    form,
  };
};
