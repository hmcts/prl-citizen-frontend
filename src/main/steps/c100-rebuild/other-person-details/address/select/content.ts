import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import {
  C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
  C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
} from '../../../../../steps/urls';
import {
  form as selectAddressForm,
  languages as selectAddressFormLanguages,
} from '../../../people/address/address-select';
import { getPartyDetails } from '../../../people/util';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Select Address of',
  changePostCodeLabel: 'Change postcode',
  errors: {
    selectAddress: {
      notSelected: 'Select an address from the list',
    },
  },
});

const cy = () => ({
  title: 'Select Address of -welsh',
  changePostCodeLabel: 'Change postcode - welsh',
  errors: {
    selectAddress: {
      notSelected: 'Select an address from the list -  welsh',
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
  return { fields: selectAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const selectAddressFormTranslations = selectAddressFormLanguages[content.language](content);
  const otherPersonId = content?.additionalData?.req?.params!.otherPersonId;
  const otherPersonDetails = getPartyDetails(
    content.userCase?.oprs_otherPersons,
    otherPersonId
  ) as C100RebuildPartyDetails;
  const { firstName, lastName } = otherPersonDetails;

  return {
    ...translations,
    ...selectAddressFormTranslations,
    adddressPostCode: otherPersonDetails.address?.PostCode,
    changePostCodeUrl: applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP, { otherPersonId }),
    cantFindAddressUrl: applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL, { otherPersonId }),
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(otherPersonDetails).fields),
  };
};
