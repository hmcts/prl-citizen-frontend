/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100Applicant, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

export const en = () => ({
  addressLine1: 'Building and street',
  town: 'Town or city',
  county: 'County',
  country: 'Country',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  addressHistoryLabel: 'Have you lived at this address for more than 5 years?',
  one: 'Yes',
  two: 'No',
  explainNoLabel: 'Provide details of previous addresses you have lived at in the last 5 years',
  explainNoHint: 'Start with your most recent',
});

export const cy = () => ({
  addressLine1: 'Building and street - welsh',
  town: 'Town or city - welsh',
  county: 'County - welsh',
  country: 'Country - welsh',
  postcode: 'Postcode - welsh',
  enterInternationalAddress: 'Enter an international address - welsh',
  addressHistoryLabel: 'Have you lived at this address for more than 5 years? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  explainNoLabel: 'Provide details of previous addresses you have lived at in the last 5 years - welsh',
  explainNoHint: 'Start with your most recent - welsh',
});

export const form = (caseData: Partial<C100Applicant>): FormContent => {
  const {
    applicantAddress1,
    applicantAddress2,
    applicantAddressTown,
    applicantAddressCounty,
    applicantAddressPostcode,
    applicantAddressHistory,
    applicantProvideDetailsOfPreviousAddresses,
    country,
  } = caseData;

  return {
    fields: {
      address1: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.addressLine1,
        labelSize: null,
        value: applicantAddress1,
        validator: isFieldFilledIn,
      },
      address2: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.addressLine2,
        value: applicantAddress2,
        labelSize: null,
      },
      addressTown: {
        type: 'text',
        classes: 'govuk-label govuk-!-width-two-thirds',
        label: l => l.town,
        labelSize: null,
        value: applicantAddressTown,
        validator: isFieldFilledIn,
      },
      addressCounty: {
        type: 'text',
        classes: 'govuk-label govuk-!-width-two-thirds',
        label: l => l.county,
        value: applicantAddressCounty,
        labelSize: null,
      },
      addressPostcode: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.postcode,
        labelSize: null,
        value: applicantAddressPostcode,
        attributes: {
          maxLength: 14,
        },
      },
      country: {
        type: 'text',
        classes: 'govuk-label govuk-!-width-two-thirds',
        label: l => l.country,
        value: country ?? 'United Kingdom',
        labelSize: null,
        validator: isFieldFilledIn,
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
            selected: applicantAddressHistory === YesOrNo.YES,
            value: YesOrNo.YES,
          },
          {
            label: l => l.two,
            value: YesOrNo.NO,
            selected: applicantAddressHistory === YesOrNo.NO,
            subFields: {
              provideDetailsOfPreviousAddresses: {
                type: 'textarea',
                label: l => l.explainNoLabel,
                value: applicantProvideDetailsOfPreviousAddresses,
                labelSize: null,
                hint: l => l.explainNoHint,
                id: 'provideDetailsOfPreviousAddresses',
                validator: value => isFieldFilledIn(value),
              },
            },
          },
        ],
        validator: isFieldFilledIn,
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
