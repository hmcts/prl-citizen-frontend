import { C100RebuildPartyDetails, YesNoDontKnow, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import {
  form as manualAddressForm,
  languages as manualAddressFormLanguages,
} from '../../../people/address/address-manual';
import { getPartyDetails } from '../../../people/util';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address details of',
  subtitle:
    "Include as much detail as you can. If there's information missing, your application may take longer to process.",
  addressLine1Hint: 'Court documents will be sent here',
  addressHistoryLabel: 'Have they lived at this address for more than 5 years?',
  provideDetailsOfPreviousAddressLabel:
    'Please provide details of all previous addresses for the last 5 years below, including the dates and starting with the most recent',
  addressHistoryDontKnowHintText: "Leave blank if you don't know",
  one: 'Yes',
  two: 'No',
  three: "Don't know",
  errors: {
    AddressLine1: {
      required: 'Enter the first line of the address',
    },
    PostTown: {
      required: 'Enter the town or city',
    },
    PostCode: {
      required: 'Enter the postcode',
      invalid: 'Enter a valid postcode',
    },
    addressHistory: {
      required: 'Enter your details known',
    },
    addressUnknown: {
      cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live"',
    },
  },
});

const cy = () => ({
  title: 'Address details of - welsh',
  subtitle:
    "Include as much detail as you can. If there's information missing, your application may take longer to process. - welsh",
  addressLine1Hint: 'Court documents will be sent here - welsh',
  addressHistoryLabel: 'Have they lived at this address for more than 5 years? - welsh',
  provideDetailsOfPreviousAddressLabel:
    'Please provide details of all previous addresses for the last 5 years below, including the dates and starting with the most recent - welsh',
  addressHistoryDontKnowHintText: "Leave blank if you don't know - welsh",
  one: 'Yes - welsh',
  two: 'No - welsh',
  three: "Don't know - welsh",
  errors: {
    AddressLine1: {
      required: 'Enter the first line of the address - welsh',
    },
    PostTown: {
      required: 'Enter the town or city - welsh',
    },
    PostCode: {
      required: 'Enter the postcode - welsh',
      invalid: 'Enter a valid postcode - welsh',
    },
    addressHistory: {
      required: 'Enter your details known - welsh',
    },
    addressUnknown: {
      cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live" - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

// eslint-disable-next-line @typescript-eslint/no-shadow
const updatedFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const getUpdatedForm = (): FormContent => updatedForm;

export const generateFormFields = (caseData: Partial<C100RebuildPartyDetails>): GenerateDynamicFormFields => {
  const { addressHistory, provideDetailsOfPreviousAddresses } = caseData.address!;
  return {
    fields: {
      ...manualAddressForm(caseData).fields,
      addressHistory: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.addressHistoryLabel,
        labelSize: 'm',
        section: l => l.section,
        values: [
          {
            label: l => l.one,
            selected: addressHistory === YesNoDontKnow.yes,
            value: YesOrNo.YES,
          },
          {
            label: l => l.two,
            value: YesOrNo.NO,
            selected: addressHistory === YesNoDontKnow.no,
            subFields: {
              provideDetailsOfPreviousAddresses: {
                type: 'textarea',
                label: l => l.provideDetailsOfPreviousAddressLabel,
                hint: l => l.addressHistoryDontKnowHintText,
                value: provideDetailsOfPreviousAddresses,
                labelSize: null,
                id: 'provideDetailsOfPreviousAddresses',
              },
            },
          },
          {
            label: l => l.three,
            selected: addressHistory === YesNoDontKnow.dontKnow,
            value: YesNoDontKnow.dontKnow,
          },
        ],
        validator: isFieldFilledIn,
      },
    },
    errors: { en: {}, cy: {} },
  };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const manualAddressFormTranslations = manualAddressFormLanguages[content.language]();
  const respondentId = content?.additionalData?.req?.params!.respondentId;
  const respondentData = getPartyDetails(content.userCase?.resp_Respondents, respondentId) as C100RebuildPartyDetails;
  const { firstName, lastName } = respondentData;

  return {
    ...translations,
    ...manualAddressFormTranslations,
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(respondentData).fields),
  };
};
