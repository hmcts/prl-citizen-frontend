import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import {
  form as manualAddressForm,
  languages as manualAddressFormLanguages,
} from '../../../people/address/address-manual';
import { getPartyDetails } from '../../../people/util';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address details of',
  addressLine1Hint: 'Court documents may be sent here',
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
    addressUnknown: {
      cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live"',
    },
    Country: {
      required: 'Enter the country',
    },
  },
});

const cy = () => ({
  title: 'Address details of - welsh',
  addressLine1Hint: 'Court documents may be sent here - welsh',
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
    addressUnknown: {
      cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live" - welsh',
    },
    Country: {
      required: 'Enter the country - welsh',
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

export const getFormFields = (): FormContent => {
  return updatedForm;
};

// eslint-disable-next-line @typescript-eslint/no-shadow
const updatedFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
      _ctx: {
        type: 'hidden',
        labelHidden: true,
        value: 'opAddressManual',
      },
    },
  };

  return updatedForm;
};

export const getUpdatedForm = (): FormContent => updatedForm;

export const generateFormFields = (caseData: Partial<C100RebuildPartyDetails>): GenerateDynamicFormFields => {
  return { fields: manualAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};
export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const manualAddressFormTranslations = manualAddressFormLanguages[content.language]();
  const otherPersonId = content?.additionalData?.req?.params!.otherPersonId;
  const otherPersonDetails = getPartyDetails(
    otherPersonId,
    content.userCase?.oprs_otherPersons
  ) as C100RebuildPartyDetails;
  const { firstName, lastName } = otherPersonDetails;

  return {
    ...translations,
    ...manualAddressFormTranslations,
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(otherPersonDetails).fields),
  };
};
