/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  C100Applicant,
  C100RebuildPartyDetails,
  PartyType,
  YesNoDontKnow,
  YesNoEmpty,
  YesOrNo,
} from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { getDataShape } from '../../people/util';
import { C100UrlPartyType } from '../definitions';

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
  explainNoLabelApplicant: 'Provide details of previous addresses you have lived at in the last 5 years',
  explainNoHint: 'Start with your most recent',
  explainNoLabel: 'I dont know where they currently live',
});

export const cy = () => ({
  addressLine1: 'Adeilad a stryd',
  town: 'Tref neu ddinas',
  county: 'Sir',
  country: 'Gwlad',
  postcode: 'Cod post',
  enterInternationalAddress: 'Nodwch gyfeiriad rhyngwladol',
  addressHistoryLabel: 'A ydych wedi byw yn y cyfeiriad hwn am fwy na 5 mlynedd?',
  one: 'Do',
  two: 'Naddo',
  explainNoLabelApplicant: 'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf',
  explainNoHint: 'Cychwynnwch gyda’r un mwyaf diweddar',
  explainNoLabel: 'Nid wyf yn gwybod lle maen nhw’n byw ar hyn o bryd',
});

export const applicantForm = (caseData: Partial<C100Applicant>): FormContent => {
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
                label: l => l.explainNoLabelApplicant,
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

export const form = (caseData: Partial<C100RebuildPartyDetails>, partyType: C100UrlPartyType): FormContent => {
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
    addressHistory: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.addressHistoryLabel,
      labelSize: 'm',
      section: l => l.section,
      hidden: partyType === C100UrlPartyType.OTHER_PERSON,
      values: [
        {
          label: l => l.one,
          selected: address!.addressHistory === YesNoDontKnow.yes,
          value: YesNoDontKnow.yes,
        },
        {
          label: l => l.two,
          value: YesNoDontKnow.no,
          selected: address!.addressHistory === YesNoDontKnow.no,
          subFields: {
            provideDetailsOfPreviousAddresses: {
              type: 'textarea',
              label: l => l.provideDetailsOfPreviousAddressLabel,
              hint: l => l.addressHistoryDontKnowHintText,
              value: address!.provideDetailsOfPreviousAddresses,
              labelSize: null,
              id: 'provideDetailsOfPreviousAddresses',
              validator: value => isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.three,
          selected: address!.addressHistory === YesNoDontKnow.dontKnow,
          value: YesNoDontKnow.dontKnow,
        },
      ],
      validator: partyType !== C100UrlPartyType.OTHER_PERSON ? isFieldFilledIn : undefined,
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
