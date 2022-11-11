/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100RebuildPartyDetails, YesNoDontKnow, YesNoEmpty, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';

const en = () => ({
  addressLine1: 'Building and street',
  addressLine1Hint: 'Court documents will be sent here',
  town: 'Town or city',
  county: 'County',
  country: 'Country',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  explainNoLabel: 'I dont know where they currently live',
  addressHistoryLabel: 'Have they lived at this address for more than 5 years?',
  provideDetailsOfPreviousAddressLabel:
    'Please provide details of all previous addresses for the last 5 years below, including the dates and starting with the most recent',
  addressHistoryDontKnowHintText: "Leave blank if you don't know",
  one: 'Yes',
  two: 'No',
  three: "Don't know",
});

const cy = () => ({
  addressLine1: 'Building and street - welsh',
  addressLine1Hint: 'Court documents will be sent here - welsh',
  town: 'Town or city - welsh',
  county: 'County - welsh',
  country: 'Country - welsh',
  postcode: 'Postcode - welsh',
  enterInternationalAddress: 'Enter an international address - welsh',
  explainNoLabel: 'I dont know where they currently live - welsh',
  addressHistoryLabel: 'Have they lived at this address for more than 5 years? - welsh',
  provideDetailsOfPreviousAddressLabel:
    'Please provide details of all previous addresses for the last 5 years below, including the dates and starting with the most recent - welsh',
  addressHistoryDontKnowHintText: "Leave blank if you don't know - welsh",
  one: 'Yes - welsh',
  two: 'No - welsh',
  three: "Don't know - welsh",
});

export const form = (caseData: Partial<C100RebuildPartyDetails>): FormContent => {
  const { address, addressUnknown } = caseData;
  const { addressHistory, provideDetailsOfPreviousAddresses } = caseData.address!;
  console.log(addressUnknown, 'known or not');

  const fields = {
    AddressLine1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine1,
      labelSize: null,
      hint: l => l.addressLine1Hint,
      value: address!.AddressLine1,
      validator: (value, formData) =>
        formData?.addressUnknown !== YesNoEmpty.YES ? isFieldFilledIn(value) : undefined,
    },
    AddressLine2: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine2,
      value: address!.AddressLine2,
      labelSize: null,
    },
    PostTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      value: address!.PostTown,
      validator: (value, formData) =>
        formData?.addressUnknown !== YesNoEmpty.YES ? isFieldFilledIn(value) : undefined,
    },
    Country: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.country,
      value: address!.Country,
      labelSize: null,
    },
    PostCode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.postcode,
      labelSize: null,
      value: address!.PostCode,
      attributes: {
        maxLength: 14,
      },
      validator: (value, formData) =>
        formData?.addressUnknown !== YesNoEmpty.YES ? isFieldFilledIn(value) || isInvalidPostcode(value) : undefined,
    },
    addressUnknown: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      labelSize: 'm',
      section: l => l.section,
      values: [
        {
          name: 'addressUnknown',
          label: l => l.explainNoLabel,
          value: YesOrNo.YES,
        },
      ],
      validator: (value, formData) =>
        formData?.addressUnknown === YesNoEmpty.YES &&
        (formData.AddressLine1 !== '' ||
          formData.AddressLine2 !== '' ||
          formData.PostTown !== '' ||
          formData.Country !== '' ||
          formData.PostCode !== '')
          ? 'cantHaveAddressAndUnknown'
          : '',
    },
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
  };

  fields.addressUnknown.values = fields.addressUnknown.values.map(config =>
    config.value === addressUnknown ? { ...config, selected: true } : config
  );

  fields.addressHistory.values = fields.addressHistory.values.map(config =>
    config.value === addressHistory ? { ...config, selected: true } : config
  );

  return {
    fields,
  };
};

export const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
