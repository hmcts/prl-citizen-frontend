import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import { C100_RESPONDENT_DETAILS_ADDRESS_MANUAL } from '../../../../../steps/urls';
import {
  form as lookupAddressForm,
  languages as lookupAddressFormLanguages,
} from '../../../people/address/address-lookup';
import { getPartyDetails } from '../../../people/util';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address of',
  subTitle: 'Documents relating to this application will be sent here.',
  enterAddressManually: "I don't know their postcode or they live outside the UK",
  errors: {
    PostCode: {
      required: 'Enter the postcode',
      invalid: 'Enter a valid postcode',
    },
  },
});

const cy = () => ({
  title: 'Address of - welsh',
  subTitle: 'Documents relating to this application will be sent here. - welsh',
  enterAddressManually: "I don't know their postcode or they live outside the UK - welsh",
  errors: {
    PostCode: {
      required: 'Enter the postcode - welsh',
      invalid: 'Enter a valid postcode - welsh',
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
  return { fields: lookupAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const lookupAddressFormTranslations = lookupAddressFormLanguages[content.language]();
  const respondentId = content?.additionalData?.req?.params!.respondentId;
  const respondentData = getPartyDetails(content.userCase?.resp_Respondents, respondentId) as C100RebuildPartyDetails;
  const { firstName, lastName } = respondentData;

  return {
    ...translations,
    ...lookupAddressFormTranslations,
    manualAddressUrl: applyParms(C100_RESPONDENT_DETAILS_ADDRESS_MANUAL, { respondentId: respondentData.id }),
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(respondentData).fields),
  };
};
