import { C100Applicant } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormField, FormFields, FormFieldsFn, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { form as manualAddressForm, generateContent as manualAddressGenerateContent } from '../common/address-manual';

let updatedForm: FormContent;

const en = () => ({
    title: 'Address of',
    errors: {
      address1: {
        required: 'Enter the first line of the address',
      },
      addressTown: {
        required: 'Enter the town or city',
      },
      addressPostcode: {
        required: 'Enter a real postcode',
        invalid: 'Enter a real postcode',
      },
      addressHistory: {
        required: 'Enter your details known',
      },
      provideDetailsOfPreviousAddresses: {
        required:
          'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
      },
    },
});

const cy = () => ({
  title: 'Address of - welsh',
  errors: {
    address1: {
      required: 'Enter the first line of the address - welsh',
    },
    addressTown: {
      required: 'Enter the town or city - welsh',
    },
    addressPostcode: {
      required: 'Enter a real postcode - welsh',
      invalid: 'Enter a real postcode - welsh',
    },
    addressHistory: {
      required: 'Enter your details known - welsh',
    },
    provideDetailsOfPreviousAddresses: {
      required:
        'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address - welsh',
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

export const generateFormFields = (caseData:Partial<C100Applicant>): GenerateDynamicFormFields=>{
  const { applicantAddressPostcode, applicantAddress1, applicantAddress2, applicantAddressTown,applicantAddressCounty} = caseData;
    const errors = {en:{}, cy:{}}
  const fields = manualAddressForm.fields;
  const {address1,address2, addressTown, addressCounty, addressPostcode } = fields as FormFields
  address1.value = applicantAddress1
address2.value= applicantAddress2;
addressTown.value = applicantAddressTown
addressCounty.value = applicantAddressCounty
addressPostcode.value = applicantAddressPostcode
  return {fields, errors}
}

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const applicantId = content?.additionalData?.req?.query?.applicantId as string;
  const applicantData = content.userCase?.appl_allApplicants?.find(i => i.id === applicantId) as C100Applicant;

  const manualAddressContent = manualAddressGenerateContent(content);
  const translationContent = languages[content.language]();

  return {
    ...translations,
    title: `${translations.title} `,
    form: ,
  };
};
