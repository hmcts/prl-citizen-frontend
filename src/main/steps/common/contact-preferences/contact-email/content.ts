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
import { APPLICANT_CONTACT_DETAILS, RESPONDENT_CONTACT_DETAILS } from '../../../../steps/urls';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number {caseNumber}',
  title: 'Contact Preferences',
  subTitle: 'Personal details',
  text: 'You have decided to receive updates by email. You will still receive some information by post.',
  continue: 'Submit',
  warningText: 'Make sure that your contact details are up to date.',
  email: 'Email',
  change: 'Change',
  nameText: 'name',
});

export const cy = () => ({
  caption: 'Rhif yr achos {caseNumber}',
  title: 'Dewisiadau Cyswllt',
  subTitle: 'Manylion personol',
  text: 'Rydych wedi penderfynu cael diweddariadau drwy e-bost. Byddwch yn dal i gael rhywfaint o wybodaeth drwy’r post.',
  continue: 'Cyflwyno',
  warningText: 'Sicrhewch fod eich manylion cyswllt yn gyfredol.',
  email: 'E-bost',
  change: 'Newid',
  nameText: 'enw',
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

export const getFormFields = (): FormContent => {
  return updateFormFields(form, generateFormFields().fields);
};

export const generateContent: TranslationFn = content => {
  const caseNumber = content.userCase?.id!;
  const translations = languages[content.language]();
  const { fields } = generateFormFields();

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
    emailAddress: getPartyDetails(content.userCase as CaseWithId, content.userIdamId as UserDetails['id'])?.email,
    changeEmailLink:
      getCasePartyType(content.userCase as CaseWithId, content.userIdamId as UserDetails['id']) === PartyType.APPLICANT
        ? APPLICANT_CONTACT_DETAILS
        : RESPONDENT_CONTACT_DETAILS,
  };
};
