import { C100Applicant } from 'app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { form as selectAddressForm, generateContent as selectAddressGenerateContent } from '../common/address-select';

const selectAddressFormFields = selectAddressForm.fields as FormFields;

export const form: FormContent = {
  ...selectAddressForm,
  fields: () => {
    return {
      applicantSelectAddress: selectAddressFormFields.selectAddress,
    };
  }
};

export const generateContent: TranslationFn = content => {
  const applicantId = content?.additionalData?.req?.query?.applicantId as string;
  const applicantData = content.userCase?.appl_allApplicants?.find(i => i.id === applicantId) as C100Applicant;
  const manualAddressUrlLink = `/c100-rebuild/applicant/address/manual` + '?applicantId=' + applicantId;
  const lookupAddressUrlLink = `/c100-rebuild/applicant/address/lookup` + '?applicantId=' + applicantId;
  const en = () => {
    return {
      title: `Select Address of ` + applicantData.applicantFirstName + ' ' + applicantData.applicantLastName,
      changePostCodeLabel: 'Change postcode',
      adddressPostCode: applicantData.applicantAddressPostcode,
      changePostCodeUrl: lookupAddressUrlLink,
      cantFindAddressUrl: manualAddressUrlLink,
      errors: {
        applicantSelectAddress: {
          notSelected: 'Select an address',
        },
      },
    };
  };
  const cy = () => {
    return {
      title: `Select Address of ` + applicantData.applicantFirstName + ' ' + applicantData.applicantLastName,
      changePostCodeLabel: 'Change postcode',
      adddressPostCode: applicantData.applicantAddressPostcode,
      changePostCodeUrl: lookupAddressUrlLink,
      cantFindAddressUrl: manualAddressUrlLink,
      errors: {
        applicantSelectAddress: {
          notSelected: 'Select an address - welsh',
        },
      },
    };
  };

  const languages = {
    en,
    cy,
  };

  const selectAddressContent = selectAddressGenerateContent(content);
  const translationContent = languages[content.language]();

  return {
    ...selectAddressContent,
    ...translationContent,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
