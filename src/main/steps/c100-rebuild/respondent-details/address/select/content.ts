import { CaseWithId } from '../../../../../app/case/case';
import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import {
  C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP,
  C100_RESPONDENT_DETAILS_ADDRESS_MANUAL,
} from '../../../../../steps/urls';
import {
  form as selectAddressForm,
  languages as selectAddressFormLanguages,
} from '../../../people/address/address-select';
import { getPartyDetails } from '../../../people/util';

console.info('** FOR SONAR **');

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
  title: 'Dewiswch gyfeiriad',
  changePostCodeLabel: 'Newid y cod post',
  errors: {
    selectAddress: {
      notSelected: "Dewiswch gyfeiriad o'r rhestr",
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

export const generateFormFields = (caseData: Partial<C100RebuildPartyDetails>): GenerateDynamicFormFields => {
  return { fields: selectAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};

export const getUpdatedForm = (
  caseData: Partial<CaseWithId>,
  respondentId: C100RebuildPartyDetails['id']
): FormContent => {
  const respondentData = getPartyDetails(respondentId, caseData?.resp_Respondents) as C100RebuildPartyDetails;

  return updatedFormFields(form, generateFormFields(respondentData ?? {}).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const selectAddressFormTranslations = selectAddressFormLanguages[content.language](content);
  const respondentId = content?.additionalData?.req?.params!.respondentId;
  const respondentData = getPartyDetails(respondentId, content.userCase?.resp_Respondents) as C100RebuildPartyDetails;
  const { firstName, lastName } = respondentData;

  return {
    ...translations,
    ...selectAddressFormTranslations,
    adddressPostCode: respondentData.address?.PostCode,
    changePostCodeUrl: applyParms(C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP, { respondentId }),
    cantFindAddressUrl: applyParms(C100_RESPONDENT_DETAILS_ADDRESS_MANUAL, { respondentId }),
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(respondentData).fields),
  };
};
