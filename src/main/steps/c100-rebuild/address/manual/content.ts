import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { C100AddressForm, C100UrlPartyType } from '../definitions';
import { getPartyData, getUpdatedForm } from '../utils';

import {
  applicantForm as applicantManualAddressForm,
  form as manualAddressForm,
  languages as manualAddressFormLanguages,
} from './address-manual';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  [C100UrlPartyType.APPLICANT]: {
    title: 'Address of',
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
  },
  [C100UrlPartyType.OTHER_PERSON]: {
    title: 'Address details of',
    addressLine1Hint: 'Court documents may be sent here',
    errors: {
      AddressLine1: {
        required: 'Enter the first line of the address',
      },
      PostTown: {
        required: 'Enter the town or city',
      },
      addressUnknown: {
        cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live"',
      },
      Country: {
        required: 'Enter the country',
      },
    },
  },
  [C100UrlPartyType.RESPONDENT]: {
    title: 'Address details of',
    subtitle:
      "Include as much detail as you can. If there's information missing, your application may take longer to process.",
    addressLine1Hint: 'Court documents will be sent here',
    addressHistoryLabel: 'Have they lived at this address for more than 5 years?',
    provideDetailsOfPreviousAddressLabel:
      'Please provide details of all previous addresses for the last 5 years below, including the dates and starting with the most recent',
    addressHistoryDontKnowHintText: "Leave blank if you don't know",
    one: 'Yes',
    two: 'No',
    three: "Don't know",
    errors: {
      AddressLine1: {
        required: 'Enter the first line of the address',
      },
      PostTown: {
        required: 'Enter the town or city',
      },
      addressHistory: {
        required: 'Enter your details known',
      },
      addressUnknown: {
        cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live"',
      },
      Country: {
        required: 'Enter the country ',
      },
      provideDetailsOfPreviousAddresses: {
        invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
        invalid:
          'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
      },
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  [C100UrlPartyType.APPLICANT]: {
    title: 'Cyfeiriad',
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
  },
  [C100UrlPartyType.OTHER_PERSON]: {
    title: 'Manylion cyfeiriad',
    addressLine1Hint: 'Gellir anfon dogfennau’r llys yma',
    errors: {
      AddressLine1: {
        required: 'Nodwch linell gyntaf y cyfeiriad',
      },
      PostTown: {
        required: ' Nodwch y dref neu’r ddinas',
      },
      addressUnknown: {
        cantHaveAddressAndUnknown: "Methu cael cyfeiriad a hefyd “nid wyf yn gwybod lle maen nhw'n byw ar hyn o bryd",
      },
      Country: {
        required: 'Nodwch y wlad',
      },
    },
  },
  [C100UrlPartyType.RESPONDENT]: {
    title: 'Cyfeiriad',
    subtitle:
      'Dylech gynnwys cymaint o fanylion ag y gallwch. Os oes gwybodaeth ar goll, gall eich cais gymryd yn hirach i’w brosesu.',
    addressLine1Hint: 'Bydd dogfennau’r llys yn cael eu hanfon yma',
    addressHistoryLabel: 'A ydynt wedi byw yn y cyfeiriad hwn am 5 mlynedd neu fwy?',
    provideDetailsOfPreviousAddressLabel:
      'Os nad ydynt, rhowch fanylion yr holl gyfeiriadau blaenorol am y 5 mlynedd diwethaf, os yn hysbys, gan gynnwys y dyddiadau, gan ddechrau gyda’r diweddaraf',
    addressHistoryDontKnowHintText: 'Gadewch yn wag os nad ydych yn gwybod',
    one: 'Ydynt',
    two: 'Nac ydynt',
    three: 'Ddim yn gwybod',
    errors: {
      AddressLine1: {
        required: 'Nodwch linell gyntaf y cyfeiriad',
      },
      PostTown: {
        required: 'Nodwch y dref neu’r ddinas',
      },

      addressHistory: {
        required: 'Rhowch eich manylion hysbys',
      },
      addressUnknown: {
        cantHaveAddressAndUnknown: 'Methu cael cyfeiriad a hefyd “nid wyf yn gwybod lle maen nhw’n byw ar hyn o bryd',
      },
      Country: {
        required: 'Nodwch y wlad',
      },
      provideDetailsOfPreviousAddresses: {
        invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
        invalid:
          'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
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

// eslint-disable-next-line @typescript-eslint/no-shadow

export const generateContent: TranslationFn = content => {
  const { id, partyType } = content?.additionalData?.req?.params ?? {};
  const translations = languages[content.language]()[partyType];
  const manualAddressFormTranslations = manualAddressFormLanguages[content.language]();
  const { firstName, lastName } = getPartyData(content.userCase!, id, partyType);

  return {
    ...manualAddressFormTranslations,
    ...translations,
    title: `${translations.title} ${firstName} ${lastName}`,
    form: getUpdatedForm(
      content.userCase!,
      id,
      partyType,
      partyType === C100UrlPartyType.APPLICANT
        ? (applicantManualAddressForm as C100AddressForm)
        : (manualAddressForm as C100AddressForm),
      form,
      YesOrNo.YES
    ),
    partyType,
  };
};
