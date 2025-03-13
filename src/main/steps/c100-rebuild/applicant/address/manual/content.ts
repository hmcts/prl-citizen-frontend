import { CaseWithId } from '../../../../../app/case/case';
import { C100Applicant } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { form as manualAddressForm, languages as manualAddressFormLanguages } from '../common/address-manual';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address details of',
  errors: {
    address1: {
      required: 'Enter the first line of the address',
    },
    addressTown: {
      required: 'Enter the town or city',
    },
    addressHistory: {
      required: 'Enter your details known',
    },
    provideDetailsOfPreviousAddresses: {
      required:
        'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
    },
    country: {
      required: 'Enter the country',
    },
  },
});

const cy = () => ({
  title: 'Manylion cyfeiriad',
  errors: {
    address1: {
      required: 'Nodwch linell gyntaf y cyfeiriad',
    },
    addressTown: {
      required: 'Nodwch y dref neu’r ddinas',
    },
    addressHistory: {
      required: 'Rhowch eich manylion hysbys',
    },
    provideDetailsOfPreviousAddresses: {
      required: 'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf',
    },
    country: {
      required: 'Nodwch y wlad',
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
  return { fields: manualAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const manualAddressFormTranslations = manualAddressFormLanguages[content.language]();
  const applicantId = content?.additionalData?.req?.params!.applicantId;
  const applicantData = content.userCase?.appl_allApplicants!.find(i => i.id === applicantId) as C100Applicant;
  const { applicantFirstName, applicantLastName } = applicantData;

  return {
    ...translations,
    ...manualAddressFormTranslations,
    title: `${translations.title} ${applicantFirstName} ${applicantLastName}`,
    form: updatedFormFields(form, generateFormFields(applicantData).fields),
  };
};
