/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isInvalidPostcode } from '../../../../../app/form/validation';

const en = () => ({
  postcode: 'Current postcode',
  manualAddressUrl: '#',
});

const cy = () => ({
  postcode: 'Current postcode - welsh',
  manualAddressUrl: '#',
});

export const form = (caseData: Partial<C100RebuildPartyDetails>): FormContent => {
  const { address } = caseData;
  return {
    fields: {
      PostCode: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.postcode,
        labelSize: null,
        value: address!.PostCode,
        attributes: {
          maxLength: 14,
        },
        validator: isInvalidPostcode,
      },
    },
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
