import { C100Applicant } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { form as manualAddressForm, generateContent as manualAddressGenerateContent } from '../common/address-manual';

const manualAddressFormFields = manualAddressForm.fields as FormFields;
 
export const form: FormContent = {
  ...manualAddressForm,
  fields: () => {
    return {
      applicantAddress1: manualAddressFormFields.address1,
      // applicantAddress2: manualAddressFormFields.address2,
      // applicantAddressTown: manualAddressFormFields.addressTown,
      // applicantAddressCounty: manualAddressFormFields.addressCounty,
      // applicantAddressPostcode: manualAddressFormFields.addressPostcode,
      // applicantAddressHistory: manualAddressFormFields.addressHistory,
    };
  }
};

export const generateContent: TranslationFn = content => {
  const applicantId = content?.additionalData?.req?.query?.applicantId as string;
  const applicantData = content.userCase?.appl_allApplicants?.find(i => i.id === applicantId) as C100Applicant;
 // const { fields } = generateFormFields(applicantData);
  const en = () => {
    return {
      title: `Address of ` + applicantData.applicantFirstName + ' ' + applicantData.applicantLastName,
      errors: {
        applicantAddress1: {
          required: 'Enter the first line of the address',
        },
        applicantAddressTown: {
          required: 'Enter the town or city',
        },
        applicantAddressPostcode: {
          required: 'Enter a real postcode',
          invalid: 'Enter a real postcode',
        },
        applicantAddressHistory: {
          required: 'Enter your details known',
        },
        applicantProvideDetailsOfPreviousAddresses: {
          required:
            'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
        },
      },
    };
  };
  const cy = () => {
    return {
      title: `Address of ` + applicantData.applicantFirstName + ' ' + applicantData.applicantLastName + ' - welsh',
      errors: {
        applicantAddress1: {
          required: 'Enter the first line of the address - welsh',
        },
        applicantAddressTown: {
          required: 'Enter the town or city - welsh',
        },
        applicantAddressPostcode: {
          required: 'Enter a real postcode - welsh',
          invalid: 'Enter a real postcode - welsh',
        },
        applicantAddressHistory: {
          required: 'Enter your details known - welsh',
        },
        applicantProvideDetailsOfPreviousAddresses: {
          required:
            'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address - welsh',
        },
      },
    };
  };

  const languages = {
    en,
    cy,
  };

  const manualAddressContent = manualAddressGenerateContent(content);
  const translationContent = languages[content.language]();

  return {
    ...manualAddressContent,
    ...translationContent,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
