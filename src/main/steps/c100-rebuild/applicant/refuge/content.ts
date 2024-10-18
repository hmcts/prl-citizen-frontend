/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { C100Applicant, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getApplicantDetails } from '../util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Staying in a refuge',
  refugeExplanation:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported.',
  refugeShelter:
    "Find out more about refuges at <a href='https://www.citizensadvice.org.uk/' class='govuk-link' target='_blank' rel='external'>Citizen's Advice</a>.",
  refugeLabel: 'Does ',
  refugeLabel2: ' currently live in a refuge?',
  labelYes: 'Yes',
  labelNo: 'No',
  errors: {
    applicantLivesInRefuge: {
      required: "Please select if you're staying in a refugee or not",
    },
  },
});

export const cy = () => ({
  title: '',
  refugeContent: '',
  refugeShelter: '',
  refugeLabel: '',
  refugeLabel2: '',
  labelYes: '',
  labelNo: '',
  errors: {
    applicantLivesInRefuge: {
      required: '',
    },
  },
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

export const generateFormFields = (data: C100Applicant['liveInRefuge']): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    applicantLivesInRefuge: {
      id: 'applicantLivesInRefuge',
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.refugeLabel,
      labelSize: 'm',
      values: [
        {
          name: 'applicantLivesInRefuge',
          label: l => l.yes,
          selected: data === YesOrNo.YES,
          value: YesOrNo.YES,
        },
        {
          name: 'applicantLivesInRefuge',
          label: l => l.no,
          selected: data === YesOrNo.NO,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  };

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const getUpdatedForm = (caseData: Partial<CaseWithId>, applicantId: C100Applicant['id']): FormContent => {
  const applicantDetails = getApplicantDetails(caseData.appl_allApplicants ?? [], applicantId);
  return updateFormFields(form, generateFormFields(applicantDetails?.liveInRefuge).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const applicantId = content?.additionalData?.req?.params!.applicantId;
  const applicantData = content.userCase?.appl_allApplicants!.find(i => i.id === applicantId) as C100Applicant;
  const { applicantFirstName, applicantLastName } = applicantData;
  const { fields } = generateFormFields(applicantData.liveInRefuge);

  return {
    ...translations,
    refugeLabel: `${translations.refugeLabel} ${applicantFirstName} ${applicantLastName} ${translations.refugeLabel2}`,
    form: updateFormFields(form, fields),
  };
};
