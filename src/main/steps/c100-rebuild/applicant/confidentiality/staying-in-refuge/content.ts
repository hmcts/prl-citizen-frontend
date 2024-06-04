import { CaseWithId } from '../../../../../app/case/case';
import { C100Applicant, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { getPartyDetails } from '../../../people/util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  title: 'Staying in a refuge',
  paragraph1:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported.',
  paragraph2:
    'Find out more about refuges at <a href=" https://www.citizensadvice.org.uk/family/gender-violence/domestic-violence-and-abuse/#:~:text=Finding%20a%20refuge">Citizen’s Advice (opens in a new tab)</a>.',
  label: 'Does ',
  label1: 'currently live in a refuge?',
  one: 'Yes',
  two: 'No',
  errors: {
    stayingInRefuge: {
      required: 'Select yes if the person currently lives in a refuge',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = {
  title: 'Staying in a refuge -welsh',
  paragraph1:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported. -welsh',
  paragraph2:
    'Find out more about refuges at <a href=" https://www.citizensadvice.org.uk/family/gender-violence/domestic-violence-and-abuse/#:~:text=Finding%20a%20refuge">Citizen’s Advice (opens in a new tab)</a>. -welsh',
  label: 'Does  -welsh',
  label1: 'currently live in a refuge? -welsh',
  one: 'Yes -welsh',
  two: 'No -welsh',
  errors: {
    stayingInRefuge: {
      required: 'Select yes if the person currently lives in a refuge -welsh',
    },
  },
};

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

export const generateFormFields = (refuge: YesOrNo | undefined, applicantName: string): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    stayingInRefuge: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => `${l.label} ${applicantName} ${l.label1}`,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  };

  // mark the selection for the radio buttons based on the option chosen

  fields.stayingInRefuge.values = fields.stayingInRefuge.values.map(config =>
    config.value === refuge ? { ...config, selected: true } : config
  );

  return { fields, errors };
};

export const form: FormContent = {
  fields: {
    _ctx: {
      type: 'hidden',
      labelHidden: true,
      value: 'appl_refuge',
    },
  },
  onlyContinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const getFormFields = (caseData: Partial<CaseWithId>, applicantId: string): FormContent => {
  const applicantDetails = getPartyDetails(applicantId, caseData?.appl_allApplicants) as C100Applicant;

  return updateFormFields(
    form,
    generateFormFields(
      applicantDetails?.stayingInRefuge,
      `${applicantDetails?.['applicantFirstName']} ${applicantDetails?.['applicantLastName']}`
    ).fields
  );
};

export const generateContent: TranslationFn = content => {
  const applicantId = content.additionalData!.req.params.applicantId;
  const applicantDetails = getPartyDetails(applicantId, content.userCase!.appl_allApplicants) as C100Applicant;
  const { fields } = generateFormFields(
    applicantDetails.stayingInRefuge,
    `${applicantDetails?.['applicantFirstName']} ${applicantDetails?.['applicantLastName']}`
  );
  const translations = languages[content.language];
  return {
    ...translations,
    form: updateFormFields(form, fields),
  };
};
