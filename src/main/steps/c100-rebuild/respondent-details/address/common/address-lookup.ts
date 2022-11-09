/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isInvalidPostcode } from '../../../../../app/form/validation';

const en = () => ({
  subTitle: 'Documents relating to this application will be sent here.',
  postcode: 'Current postcode',
  enterAddressManually: "I don't know their postcode or they live outside the UK",
  manualAddressUrl: '#',
});

const cy = () => ({
  subTitle: 'Documents relating to this application will be sent here. - welsh',
  postcode: 'Current postcode - welsh',
  enterAddressManually: "I don't know their postcode or they live outside the UK - welsh",
  manualAddressUrl: '#',
});

export const form = (caseData: Partial<C100RebuildPartyDetails>): FormContent => {
  const { PostCode } = caseData.address ?? {};
  return {
    fields: {
      addressPostcode: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.postcode,
        labelSize: null,
        value: PostCode,
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
