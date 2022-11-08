import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import {
  form as manualAddressForm,
  languages as manualAddressFormLanguages,
} from '../../../other-person-details/address/common/address-manual';
import { getOtherPersonDetails } from '../../../other-person-details/util';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address details of',
  errors: {
    AddressLine1: {
      required: 'Enter the first line of the address',
    },
    PostTown: {
      required: 'Enter the town or city',
    },
    PostCode: {
      required: 'Enter a real postcode',
      invalid: 'Enter a real postcode',
    },
    addressUnknown: {
      cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live"',
    },
  },
});

const cy = () => ({
  title: 'Address details of - welsh',
  errors: {
    AddressLine1: {
      required: 'Enter the first line of the address - welsh',
    },
    PostTown: {
      required: 'Enter the town or city - welsh',
    },
    PostCode: {
      required: 'Enter a real postcode - welsh',
      invalid: 'Enter a real postcode - welsh',
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
  submit: {
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
  return { fields: manualAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};
export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const manualAddressFormTranslations = manualAddressFormLanguages[content.language]();
  const otherPersonId = content?.additionalData?.req?.params!.otherPersonId;
  const otherPersonDetails = getOtherPersonDetails(content.userCase!.oprs_otherPersons ?? [], otherPersonId)!;
  const { firstName, lastName } = otherPersonDetails;

  return {
    ...translations,
    ...manualAddressFormTranslations,
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(otherPersonDetails).fields),
  };
};
