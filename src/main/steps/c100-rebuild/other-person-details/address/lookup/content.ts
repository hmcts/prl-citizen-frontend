import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import { C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL } from '../../../../../steps/urls';
import {
  form as lookupAddressForm,
  languages as lookupAddressFormLanguages,
} from '../../../people/address/address-lookup';
import { getPartyDetails } from '../../../people/util';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Address of',
  hint: 'Documents relating to this application may be sent here',
  enterAddressManually: 'I dont know their postcode or they live outside the UK',
  errors: {
    PostCode: {
      required: 'Enter the postcode',
      invalid: 'Enter a valid postcode',
    },
  },
});

const cy = () => ({
  title: 'Cyfeiriad',
  hint: 'Bydd dogfennau sy’n ymwneud â’r cais hwn yn cael eu hanfon yno.',
  enterAddressManually: 'Nid wyf yn gwybod beth yw eu cod post neu maen nhw’n byw y tu allan i’r DU',
  errors: {
    PostCode: {
      required: 'Nodwch y cod post',
      invalid: 'Rhowch god post dilys.',
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

export const getFormFields = (): FormContent => {
  return updatedForm;
};

// eslint-disable-next-line @typescript-eslint/no-shadow
const updatedFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
      _ctx: {
        type: 'hidden',
        labelHidden: true,
        value: 'opAddressLookup',
      },
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
  const otherPersonDetails = getPartyDetails(
    otherPersonId,
    content.userCase?.oprs_otherPersons
  ) as C100RebuildPartyDetails;
  const { firstName, lastName } = otherPersonDetails;

  return {
    ...translations,
    ...lookupAddressFormTranslations,
    manualAddressUrl: applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL, { otherPersonId: otherPersonDetails.id }),
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(otherPersonDetails).fields),
  };
};
