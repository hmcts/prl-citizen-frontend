import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { applyParms } from '../../../common/url-parser';
import { C100_ADDRESS_LOOKUP, C100_ADDRESS_MANUAL } from '../../../urls';
import { C100AddressForm, C100UrlPartyType } from '../definitions';
import { getPartyData, getUpdatedForm } from '../utils';

import { form as selectAddressForm, languages as selectAddressFormLanguages } from './address-select';

console.info('** FOR SONAR **');

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
      notSelected: "Dewiswch gyfeiriad o'r rhestr",
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const selectAddressFormTranslations = selectAddressFormLanguages[content.language](content);
  const { id, partyType } = content?.additionalData?.req?.params ?? {};
  const { partyData, firstName, lastName } = getPartyData(content.userCase!, id, partyType);

  return {
    ...selectAddressFormTranslations,
    ...translations,
    addressPostCode:
      partyType === C100UrlPartyType.APPLICANT ? partyData['applicantAddressPostcode'] : partyData['address'].PostCode,
    changePostCodeUrl: applyParms(C100_ADDRESS_LOOKUP, { id, partyType }),
    cantFindAddressUrl: applyParms(C100_ADDRESS_MANUAL, { id, partyType }),
    title: `${translations.title} ${firstName} ${lastName}`,
    form: getUpdatedForm(content.userCase!, id, partyType, selectAddressForm as C100AddressForm, form),
  };
};
