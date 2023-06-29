/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../app/case/case';
import { C100RebuildPartyDetails, YesNoDontKnow } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import {
  form as manualAddressForm,
  languages as manualAddressFormLanguages,
} from '../../../people/address/address-manual';
import { getPartyDetails } from '../../../people/util';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
});

export const cy = () => ({
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
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
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
  const { addressHistory, provideDetailsOfPreviousAddresses } = caseData.address!;
  return {
    fields: {
      ...manualAddressForm(caseData).fields,
      addressHistory: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.addressHistoryLabel,
        labelSize: 'm',
        section: l => l.section,
        values: [
          {
            label: l => l.one,
            selected: addressHistory === YesNoDontKnow.yes,
            value: YesNoDontKnow.yes,
          },
          {
            label: l => l.two,
            value: YesNoDontKnow.no,
            selected: addressHistory === YesNoDontKnow.no,
            subFields: {
              provideDetailsOfPreviousAddresses: {
                type: 'textarea',
                label: l => l.provideDetailsOfPreviousAddressLabel,
                hint: l => l.addressHistoryDontKnowHintText,
                value: provideDetailsOfPreviousAddresses,
                labelSize: null,
                id: 'provideDetailsOfPreviousAddresses',
                validator: value => isTextAreaValid(value),
              },
            },
          },
          {
            label: l => l.three,
            selected: addressHistory === YesNoDontKnow.dontKnow,
            value: YesNoDontKnow.dontKnow,
          },
        ],
        validator: isFieldFilledIn,
      },
    },
    errors: { en: {}, cy: {} },
  };
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
  const manualAddressFormTranslations = manualAddressFormLanguages[content.language]();
  const respondentId = content?.additionalData?.req?.params!.respondentId;
  const respondentData = getPartyDetails(respondentId, content.userCase?.resp_Respondents) as C100RebuildPartyDetails;
  const { firstName, lastName } = respondentData;

  return {
    ...translations,
    ...manualAddressFormTranslations,
    title: `${translations.title} ${firstName} ${lastName}`,
    form: updatedFormFields(form, generateFormFields(respondentData).fields),
  };
};
