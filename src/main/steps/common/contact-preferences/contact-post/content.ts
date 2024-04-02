/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { CaseWithId } from '../../../../app/case/case';
import { PartyType } from '../../../../app/case/definition';
import { UserDetails } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { interpolate } from '../../../../steps/common/string-parser';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../../../steps/tasklistresponse/utils';
import { APPLICANT_ADDRESS_DETAILS, RESPONDENT_ADDRESS_DETAILS } from '../../../../steps/urls';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number {caseNumber}',
  title: 'Contact Preferences',
  subTitle: 'Personal details',
  continue: 'Submit',
  textList: [
    'You have decided to receive updates by post.',
    'You will no longer receive updates by email. You can still access previous updates through your dashboard.',
  ],
  warningText: 'Make sure that your contact details are up to date.',
  address: 'Address',
  change: 'Change',
  addressLowerCase: 'address',
});

export const cy = () => ({
  caption: 'Rhif yr achos {caseNumber}',
  title: 'Dewisiadau Cyswllt',
  subTitle: 'Manylion personol',
  continue: 'Cyflwyno',
  textList: [
    'Rydych wedi penderfynu cael diweddariadau drwy’r post.',
    'Ni fyddwch yn cael diweddariadau drwy e-bost o hyn ymlaen. Gallwch dal weld diweddariadau blaenorol yn eich dangosfwrdd',
  ],
  warningText: 'Sicrhewch fod eich manylion cyswllt yn gyfredol.',
  address: 'Cyfeiriad',
  change: 'Newid',
  addressLowerCase: 'cyfeiriad',
});

const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateFormFields = (): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {};

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const caseNumber: string = content.userCase?.id!;
  const partyDetails = getPartyDetails(content.userCase as CaseWithId, content.userIdamId as UserDetails['id']);
  const translations = languages[content.language]();
  const { fields } = generateFormFields();

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
    addresses: Object.values(partyDetails?.address!).filter(address => {
      if (address?.trim()) {
        return address;
      }
    }),
    changeAddressLink:
      getCasePartyType(content.userCase as CaseWithId, content.userIdamId as UserDetails['id']) === PartyType.APPLICANT
        ? APPLICANT_ADDRESS_DETAILS
        : RESPONDENT_ADDRESS_DETAILS,
  };
};
