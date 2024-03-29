import { C100Applicant } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import { C100_APPLICANT_ADDRESS_MANUAL } from '../../../../../steps/urls';
import { form as lookupAddressForm, languages as lookupAddressFormLanguages } from '../common/address-lookup';

import { CaseWithId } from './../../../../../app/case/case';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address of',
  errors: {
    addressPostcode: {
      required: 'Enter the postcode',
      invalid: 'Enter a valid postcode',
    },
  },
});

const cy = () => ({
  title: 'Cyfeiriad',
  errors: {
    addressPostcode: {
      required: 'Nodwch y cod post',
      invalid: ' Rhowch god post dilys.',
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

export const getUpdatedForm = (caseData: Partial<CaseWithId>, applicantId: C100Applicant['id']): FormContent => {
  const applicantData = caseData?.appl_allApplicants?.find(i => i.id === applicantId) as C100Applicant;

  return updatedFormFields(form, generateFormFields(applicantData ?? {}).fields);
};

export const generateFormFields = (caseData: Partial<C100Applicant>): GenerateDynamicFormFields => {
  return { fields: lookupAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const lookupAddressFormTranslations = lookupAddressFormLanguages[content.language]();
  const applicantId = content?.additionalData?.req?.params!.applicantId;
  const applicantData = content.userCase?.appl_allApplicants!.find(i => i.id === applicantId) as C100Applicant;
  const { applicantFirstName, applicantLastName } = applicantData;

  return {
    ...translations,
    ...lookupAddressFormTranslations,
    manualAddressUrl: applyParms(C100_APPLICANT_ADDRESS_MANUAL, { applicantId }),
    title: `${translations.title} ${applicantFirstName} ${applicantLastName}`,
    form: updatedFormFields(form, generateFormFields(applicantData).fields),
  };
};
