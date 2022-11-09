import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import { C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL } from '../../../../../steps/urls';
import { getOtherPersonDetails } from '../../../other-person-details/util';
import { form as lookupAddressForm, languages as lookupAddressFormLanguages } from '../common/address-lookup';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address of',
  hint: 'Documents relating to this application may be sent here',
  enterAddressManually: 'I dont know their postcode or they live outside the UK',
  errors: {
    PostCode: {
      required: 'Enter the Post Code',
      invalid: 'Enter the Post Code',
    },
  },
});

const cy = () => ({
  title: 'Address of - welsh',
  hint: 'Documents relating to this application may be sent here - welsh',
  enterAddressManually: 'I dont know their postcode or they live outside the UK - welsh',
  errors: {
    PostCode: {
      required: 'Enter the Post Code - welsh',
      invalid: 'Enter the Post Code - welsh',
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
  return { fields: lookupAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const lookupAddressFormTranslations = lookupAddressFormLanguages[content.language]();
  const otherPersonId = content?.additionalData?.req?.params!.otherPersonId;
  const otherPersonDetails = getOtherPersonDetails(content.userCase!.oprs_otherPersons ?? [], otherPersonId)!;
  const { firstName, lastName } = otherPersonDetails;

  return {
    ...translations,
    ...lookupAddressFormTranslations,
    manualAddressUrl: applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL, { otherPersonId: otherPersonDetails.id }),
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(otherPersonDetails).fields),
  };
};
