import { CaseWithId } from '../../../../../app/case/case';
import { C100Applicant } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import { C100_APPLICANT_ADDRESS_LOOKUP, C100_APPLICANT_ADDRESS_MANUAL } from '../../../../../steps/urls';
import { form as selectAddressForm, languages as selectAddressFormLanguages } from '../common/address-select';

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
      notSelected: 'Dewiswch gyfeiriad',
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

export const getUpdatedForm = (caseData: Partial<CaseWithId>, applicantId: C100Applicant['id']): FormContent => {
  const applicantData = caseData?.appl_allApplicants?.find(i => i.id === applicantId) as C100Applicant;

  return updatedFormFields(form, generateFormFields(applicantData ?? {}).fields);
};

export const generateFormFields = (caseData: Partial<C100Applicant>): GenerateDynamicFormFields => {
  return { fields: selectAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const selectAddressFormTranslations = selectAddressFormLanguages[content.language](content);
  const applicantId = content?.additionalData?.req?.params!.applicantId;
  const applicantData = content.userCase?.appl_allApplicants!.find(i => i.id === applicantId) as C100Applicant;
  const { applicantFirstName, applicantLastName } = applicantData;

  return {
    ...translations,
    ...selectAddressFormTranslations,
    adddressPostCode: applicantData.applicantAddressPostcode,
    changePostCodeUrl: applyParms(C100_APPLICANT_ADDRESS_LOOKUP, { applicantId }),
    cantFindAddressUrl: applyParms(C100_APPLICANT_ADDRESS_MANUAL, { applicantId }),
    title: `${translations.title} ${applicantFirstName} ${applicantLastName}`,
    form: updatedFormFields(form, generateFormFields(applicantData).fields),
  };
};
