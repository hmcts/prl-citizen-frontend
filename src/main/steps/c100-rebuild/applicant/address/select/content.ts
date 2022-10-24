import { C100Applicant } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { form as selectAddressForm, languages as selectAddressFormLanguages } from '../common/address-select';

let updatedForm: FormContent;

const en = () => ({
    title: 'Select Address of',
    changePostCodeLabel: 'Change postcode',
    errors: {
      selectAddress: {
        notSelected: 'Select an address',
      },
    },
});

const cy = () => ({
  title: 'Select Address of',
  changePostCodeLabel: 'Change postcode - welsh',
    errors: {
      selectAddress: {
        notSelected: 'Select an address -  welsh',
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

const updatedFormFields=(form: FormContent, formFields:FormContent['fields']):FormContent=>{
  updatedForm={
    ...form,
    fields:{
      ...formFields,
      ...form.fields ?? {},
    }
  }

  return updatedForm
}

export const getUpdatedForm = ():FormContent => updatedForm

export const generateFormFields = (caseData:Partial<C100Applicant>): GenerateDynamicFormFields=>{
  return {fields:selectAddressForm(caseData).fields, errors:{en:{}, cy:{}}}
}

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const selectAddressFormTranslations = selectAddressFormLanguages[content.language](content);
  const applicantId = content?.additionalData?.req?.query!.applicantId;
  const applicantData = content.userCase?.appl_allApplicants!.find(i => i.id === applicantId) as C100Applicant;
  const {applicantFirstName, applicantLastName} = applicantData
  
  return {
    ...translations,
    ...selectAddressFormTranslations,
    adddressPostCode: applicantData.applicantAddressPostcode,
    changePostCodeUrl: '/c100-rebuild/applicant/address/lookup' + '?applicantId=' + applicantId,
    cantFindAddressUrl: '/c100-rebuild/applicant/address/manual' + '?applicantId=' + applicantId,
    title: `${translations.title} ${applicantFirstName} ${applicantLastName}`,
    form: updatedFormFields(form, generateFormFields(applicantData).fields),
  };
};
