import { CaseWithId } from '../../../../../app/case/case';
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
  title: 'Cyfeiriad',
  subTitle: 'Bydd dogfennau sy’n ymwneud â’r cais hwn yn cael eu hanfon yno.',
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
  return { fields: lookupAddressForm(caseData).fields, errors: { en: {}, cy: {} } };
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
  const lookupAddressFormTranslations = lookupAddressFormLanguages[content.language]();
  const respondentId = content?.additionalData?.req?.params!.respondentId;
  const respondentData = getPartyDetails(respondentId, content.userCase?.resp_Respondents) as C100RebuildPartyDetails;
  const { firstName, lastName } = respondentData;

  return {
    ...translations,
    ...lookupAddressFormTranslations,
    manualAddressUrl: applyParms(C100_RESPONDENT_DETAILS_ADDRESS_MANUAL, { respondentId: respondentData.id }),
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(respondentData).fields),
  };
};
