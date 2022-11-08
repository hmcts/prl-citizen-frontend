/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100RebuildPartyDetails, YesNoEmpty, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';

const en = () => ({
  addressLine1: 'Building and street',
  addressLine1Hint: 'Court documents may be sent here',
  town: 'Town or city',
  county: 'County',
  country: 'Country',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  explainNoLabel: 'I dont know where they currently live',
});

const cy = () => ({
  addressLine1: 'Building and street - welsh',
  addressLine1Hint: 'Court documents may be sent here - welsh',
  town: 'Town or city - welsh',
  county: 'County - welsh',
  country: 'Country - welsh',
  postcode: 'Postcode - welsh',
  enterInternationalAddress: 'Enter an international address - welsh',
  explainNoLabel: 'I dont know where they currently live - welsh',
});

export const form = (caseData: Partial<C100RebuildPartyDetails>): FormContent => {
  const { address, addressUnknown } = caseData;
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
    // County: {
    //   type: 'text',
    //   classes: 'govuk-label govuk-!-width-two-thirds',
    //   label: l => l.county,
    //   value: address!.County,
    //   labelSize: null,
    // },
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
  };

  fields.addressUnknown.values = fields.addressUnknown.values.map(config =>
    config.value === addressUnknown ? { ...config, selected: true } : config
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
