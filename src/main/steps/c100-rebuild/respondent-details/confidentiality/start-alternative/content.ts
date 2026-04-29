/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Case } from '../../../../../app/case/case';
import { C100RebuildPartyDetails, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';
import { generateDetailsKnownYesField } from '../common/utils';
import { getPartyDetails } from '../../../people/util';
import { interpolate } from 'steps/common/string-parser';

export const en = {
  caption: "Keeping {firstName} {lastName}'s contact details private",
  headingTitle: 'Keeping contact details private',
  paragraphOne: "The information you give us will be shared with the other people named in this application. This includes {firstName} {lastName}'s contact details, unless you ask the court to keep them private.",
  paragraphTwo: "You can request this if, for example, you believe sharing these details may lead to unwanted contact or a risk of harm to {firstName} {lastName} or the children.",
  keepContactDetailsPrivate: "Do you want to request to keep {firstName} {lastName}'s contact details private from the other people named in the application?",
  one: 'Yes',
  two: 'No',
  whichDetailsPrivate: 'Select which contact details you want to keep private',
  address: 'Address',
  telephoneNumber: 'Telephone number',
  email: 'Email',
  errors: {
    startAlternative: {
      required: 'Select yes if you want to keep {firstName} {lastName} address private',
    },
    contactDetailsPrivateAlternative: {
      required: 'Select which contact details you want to keep private.',
    },
  },
};

//TODO remember to put welsh translations here
export const cy = {
  caption: "Keeping {firstName} {lastName}'s contact details private",
  headingTitle: 'Keeping contact details private',
  paragraphOne: "The information you give us will be shared with the other people named in this application. This includes {firstName} {lastName}'s contact details, unless you ask the court to keep them private.",
  paragraphTwo: "You can request this if, for example, you believe sharing these details may lead to unwanted contact or a risk of harm to {firstName} {lastName} or the children.",
  keepContactDetailsPrivate: "Do you want to request to keep {firstName} {lastName}'s contact details private from the other people named in the application?",
  one: 'Yes',
  two: 'No',
  whichDetailsPrivate: 'Select which contact details you want to keep private',
  address: 'Address',
  telephoneNumber: 'Telephone number',
  email: 'Email',
  errors: {
    startAlternative: {
      required: 'Select yes if you want to keep your details private, or no if not.',
    },
    contactDetailsPrivateAlternative: {
      required: 'Select which contact details you want to keep private.',
    },
  },
};

const languages = {
  en,
  cy,
};

export const generateFormFields = (confidential: YesOrNo): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    confidentiality: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.keepContactDetailsPrivate,
      labelSize: 's',
      values: [
        {
          label: l => l.one, // Points to 'Yes' in English and 'Ydw' in Welsh
          value: YesOrNo.YES,
          // selected: confidential === YesOrNo.YES,
        },
        {
          label: l => l.two, // Points to 'No' in English and 'Nac ydw' in Welsh
          value: YesOrNo.NO,
          // selected: confidential === YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  };

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/no-shadow
const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateContent: TranslationFn = content => {
  const { errors: originalErrors, ...translations } = languages[content.language];
  const respondentId = content.additionalData?.req.params.respondentId ?? '';
  const respondentDetails = getPartyDetails(respondentId, content.userCase!.resp_Respondents) as C100RebuildPartyDetails;
  
  const { firstName = '', lastName = '', isRespondentAddressConfidential, isResponentTelephoneNumberConfidential, isRespondentEmailAddressConfidential } = respondentDetails || {};
  const nameData = { firstName, lastName };

  const injectName = (str: string) => interpolate(str, nameData);

  const startOption = content.userCase!.resp_Respondents?.filter(user => user['id'] === respondentId)[0]?.[
    'startAlternative'
  ];
  const contactDetailsPrivateAlternative = content.userCase?.resp_Respondents?.filter(
    user => user['id'] === respondentId
  )[0]?.['contactDetailsPrivateAlternative'] as [];

  const formFieldValues = [
    {
      label: l => l.one,
      value: YesOrNo.YES,
      subFields: {
        contactDetailsPrivateAlternative: {
          type: 'checkboxes',
          label: l => l.keepContactDetailsPrivate,
          labelHidden: true,
          hint: l => l.whichDetailsPrivate,
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
              label: l => l.email,
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

  let detailKnownFormField;

  switch (startOption) {
    case YesOrNo.YES:
      detailKnownFormField = formFieldValues.map(fieldSet => {
        return generateDetailsKnownYesField(fieldSet, contactDetailsPrivateAlternative, true);
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

  return {
    ...translations,
    form: updateFormFields(form, generateFormFields((isRespondentAddressConfidential || isResponentTelephoneNumberConfidential || isRespondentEmailAddressConfidential) ?? YesOrNo.NO).fields),
    caption: injectName(translations.caption),
    paragraphOne: injectName(translations.paragraphOne),
    paragraphTwo: injectName(translations.paragraphTwo),
    keepContactDetailsPrivate: injectName(translations.keepContactDetailsPrivate),
    errors: {
      confidentiality: {
        ...originalErrors.startAlternative,
        required: injectName(originalErrors.startAlternative.required),
      },
    },
  };
};
