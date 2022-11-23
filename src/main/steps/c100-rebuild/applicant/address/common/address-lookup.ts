/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100Applicant } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isInvalidPostcode } from '../../../../../app/form/validation';

const en = () => ({
  postcode: 'Current postcode',
  enterAddressManually: 'I live outside the UK',
  manualAddressUrl: '#',
});

const cy = () => ({
  postcode: 'Current postcode - welsh',
  enterAddressManually: 'I live outside the UK - welsh',
  manualAddressUrl: '#',
});

export const form = (caseData: Partial<C100Applicant>): FormContent => {
  const { applicantAddressPostcode } = caseData;
  return {
    fields: {
      addressPostcode: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.postcode,
        labelSize: null,
        value: applicantAddressPostcode,
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
