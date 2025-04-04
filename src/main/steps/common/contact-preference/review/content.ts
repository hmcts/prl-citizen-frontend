/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { CaseWithId } from '../../../../app/case/case';
import { ContactPreference } from '../../../../app/case/definition';
import { UserDetails } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { getPartyDetails } from '../../../tasklistresponse/utils';
import { interpolate } from '../../string-parser';
import { getChangeLink } from '../util';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number {caseNumber}',
  title: 'Review contact preferences',
  subTitle: 'Personal details',
  emailText: 'You have decided to receive updates by email. You will still receive some information by post.',
  postText: [
    'You have decided to receive updates by post.',
    'You will no longer receive updates by email. You can still access previous updates through your dashboard.',
  ],
  continue: 'Continue',
  warningText: 'Make sure that your contact details are up to date.',
  email: 'Email',
  change: 'Change',
  address: 'Address',
  addressLowerCase: 'address',
  completeSection: 'Complete this section',
});

export const cy = () => ({
  caption: 'Rhif yr achos {caseNumber}',
  title: 'Adolygu dewisiadau cyswllt',
  subTitle: 'Manylion personol',
  emailText:
    'Rydych wedi penderfynu cael diweddariadau drwy e-bost. Byddwch yn dal i gael rhywfaint o wybodaeth drwy’r post.',
  postText: [
    'Rydych wedi penderfynu cael diweddariadau drwy’r post.',
    'Ni fyddwch yn cael diweddariadau drwy e-bost o hyn ymlaen. Gallwch dal weld diweddariadau blaenorol yn eich dangosfwrdd',
  ],
  continue: 'Parhau',
  warningText: 'Sicrhewch fod eich manylion cyswllt yn gyfredol.',
  email: 'E-bost',
  change: 'Newid',
  address: 'Cyfeiriad',
  addressLowerCase: 'cyfeiriad',
  completeSection: 'Llenwch yr adran hon',
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
  const caseNumber = content.userCase?.id!;
  const translations = languages[content.language]();
  const { fields } = generateFormFields();
  const partyDetails = getPartyDetails(content.userCase as CaseWithId, content.userIdamId as UserDetails['id']);

  const addressDetails = Object.values(partyDetails?.address ?? {}).filter(address => {
    if (address?.trim()) {
      return address;
    }
  });

  if (content.userCase?.partyContactPreference === ContactPreference.POST && addressDetails.length === 0) {
    form.submit!.disabled = true;
  } else {
    delete form.submit?.disabled;
  }

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
    emailAddress: partyDetails?.email,
    changeLink: getChangeLink(
      getCasePartyType(content.userCase!, content.userIdamId!),
      content.userCase?.partyContactPreference!
    ),
    contactPreference: content.userCase?.partyContactPreference,
    addresses: addressDetails,
  };
};
