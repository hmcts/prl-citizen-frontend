import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { form as manualAddressForm, languages as manualAddressFormLanguages } from '../common/address-manual';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address details of',
  subtitle:
    "Include as much detail as you can. If there's information missing, your application may take longer to process.",
  errors: {
    AddressLine1: {
      required: 'Enter the first line of the address',
    },
    addressTown: {
      required: 'Enter the town or city',
    },
    addressPostcode: {
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
  errors: {
    AddressLine1: {
      required: 'Enter the first line of the address - welsh',
    },
    addressTown: {
      required: 'Enter the town or city - welsh',
    },
    addressPostcode: {
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
  const respondentId = content?.additionalData?.req?.params!.respondentId;
  const respondentData = content.userCase?.resp_Respondents!.find(
    i => i.id === respondentId
  ) as C100RebuildPartyDetails;
  const { firstName, lastName } = respondentData;

  return {
    ...translations,
    ...manualAddressFormTranslations,
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(respondentData).fields),
  };
};
