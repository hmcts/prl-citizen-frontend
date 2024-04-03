import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { applyParms } from '../../../common/url-parser';
import { C100_ADDRESS_MANUAL } from '../../../urls';
import { C100AddressForm, C100UrlPartyType } from '../definitions';
import { getPartyData, getUpdatedForm } from '../utils';

import {
  applicantForm as applicantLookupAddressForm,
  form as lookupAddressForm,
  languages as lookupAddressFormLanguages,
} from './address-lookup';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  [C100UrlPartyType.APPLICANT]: {
    title: 'Address of',
    errors: {
      addressPostcode: {
        required: 'Enter the postcode',
        invalid: 'Enter a valid postcode',
      },
    },
  },
  [C100UrlPartyType.RESPONDENT]: {
    title: 'Address of',
    subTitle: 'Documents relating to this application will be sent here.',
    enterAddressManually: "I don't know their postcode or they live outside the UK",
    errors: {
      PostCode: {
        required: 'Enter the postcode',
        invalid: 'Enter a valid postcode',
      },
    },
  },
  [C100UrlPartyType.OTHER_PERSON]: {
    title: 'Address of',
    subTitle: 'Documents relating to this application may be sent here',
    enterAddressManually: 'I dont know their postcode or they live outside the UK',
    errors: {
      PostCode: {
        required: 'Enter the postcode',
        invalid: 'Enter a valid postcode',
      },
    },
  },
});

const cy = () => ({
  [C100UrlPartyType.APPLICANT]: {
    title: 'Cyfeiriad',
    errors: {
      addressPostcode: {
        required: 'Nodwch y cod post',
        invalid: ' Rhowch god post dilys.',
      },
    },
  },
  [C100UrlPartyType.RESPONDENT]: {
    title: 'Cyfeiriad',
    subTitle: 'Bydd dogfennau sy’n ymwneud â’r cais hwn yn cael eu hanfon yno.',
    enterAddressManually: 'Nid wyf yn gwybod beth yw eu cod post neu maen nhw’n byw y tu allan i’r DU',
    errors: {
      PostCode: {
        required: 'Nodwch y cod post',
        invalid: 'Rhowch god post dilys.',
      },
    },
  },
  [C100UrlPartyType.OTHER_PERSON]: {
    title: 'Cyfeiriad',
    subTitle: 'Bydd dogfennau sy’n ymwneud â’r cais hwn yn cael eu hanfon yno.',
    enterAddressManually: 'Nid wyf yn gwybod beth yw eu cod post neu maen nhw’n byw y tu allan i’r DU',
    errors: {
      PostCode: {
        required: 'Nodwch y cod post',
        invalid: 'Rhowch god post dilys.',
      },
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

export const generateContent: TranslationFn = content => {
  const { id, partyType } = content?.additionalData?.req?.params ?? {};
  const translations = languages[content.language]()[partyType];
  const lookupAddressFormTranslations = lookupAddressFormLanguages[content.language]();
  const { firstName, lastName } = getPartyData(content.userCase!, id, partyType);

  return {
    ...lookupAddressFormTranslations,
    ...translations,
    manualAddressUrl: applyParms(C100_ADDRESS_MANUAL, { id, partyType }),
    title: `${translations.title} ${firstName} ${lastName}`,
    form: getUpdatedForm(
      content.userCase!,
      id,
      partyType,
      partyType === C100UrlPartyType.APPLICANT
        ? (applicantLookupAddressForm as C100AddressForm)
        : (lookupAddressForm as C100AddressForm),
      form,
      YesOrNo.NO
    ),
    partyType,
  };
};
