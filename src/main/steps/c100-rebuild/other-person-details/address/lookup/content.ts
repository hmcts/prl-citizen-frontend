import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import {
  form as lookupAddressForm,
  languages as lookupAddressFormLanguages,
} from '../../../../../steps/c100-rebuild/applicant/address/common/address-lookup';
import { applyParms } from '../../../../../steps/common/url-parser';
import { C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL } from '../../../../../steps/urls';
import { getOtherPersonDetails } from '../../../other-person-details/util';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address of',
  errors: {
    PostCode: {
      required: 'Enter a real postcode',
      invalid: 'Enter a real postcode',
    },
  },
});

const cy = () => ({
  title: 'Address of - welsh',
  errors: {
    PostCode: {
      required: 'Enter a real postcode - welsh',
      invalid: 'Enter a real postcode - welsh',
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
  // const otherPersonData = { ...caseData, addressPostcode: caseData.otherPersonAddress?.PostCode }
  // console.log(caseData, otherPersonData, "case")
  Object.assign(caseData, { applicantAddressPostcode: caseData.otherPersonAddress?.PostCode });
  return { fields: lookupAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const lookupAddressFormTranslations = lookupAddressFormLanguages[content.language]();
  const otherPersonId = content?.additionalData?.req?.params!.otherPersonId;
  const otherPersonDetails = getOtherPersonDetails(content.userCase!.oprs_otherPersons ?? [], otherPersonId)!;
  const { firstName, lastName } = otherPersonDetails;

  console.log(generateFormFields(otherPersonDetails).fields, form, 'fields');

  return {
    ...translations,
    ...lookupAddressFormTranslations,
    manualAddressUrl: applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL, { otherPersonId: otherPersonDetails.id }),
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(otherPersonDetails).fields),
  };
};
