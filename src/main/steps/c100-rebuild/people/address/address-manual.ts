/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100RebuildPartyDetails, PartyType, YesNoEmpty, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getDataShape } from '../util';

export const en = () => ({
  addressLine1: 'Building and street',
  town: 'Town or city',
  county: 'County',
  country: 'Country',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  explainNoLabel: 'I dont know where they currently live',
});

export const cy = () => ({
  addressLine1: 'Adeilad a stryd',
  town: 'Tref neu ddinas',
  county: 'Sir',
  country: 'Gwlad',
  postcode: 'Cod post',
  enterInternationalAddress: 'Nodwch gyfeiriad rhyngwladol',
  explainNoLabel: 'nid wyf yn gwybod lle maen nhw’n byw ar hyn o bryd',
});

export const form = (caseData: Partial<C100RebuildPartyDetails>): FormContent => {
  const { address, addressUnknown } = caseData;

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
      //label: l => l.addressLine2,
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
    County: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      value: address!.County,
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
    },
    Country: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.country,
      value: address!.Country ?? (getDataShape(PartyType.RESPONDENT) as C100RebuildPartyDetails).address.Country,
      labelSize: null,
      validator: (value, formData) =>
        formData?.addressUnknown !== YesNoEmpty.YES ? isFieldFilledIn(value) : undefined,
    },
    addressUnknown: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      labelSize: 'm',
      // section: l => l.section,
      values: [
        {
          name: 'addressUnknown',
          label: l => l.explainNoLabel,
          value: YesOrNo.YES,
        },
      ],

      validator: (value, formData) => (formData?.addressUnknown === YesNoEmpty.YES ? '' : undefined),
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
