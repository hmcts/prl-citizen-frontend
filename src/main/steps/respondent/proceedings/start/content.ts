import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Current or previous proceedings',
  title: 'Have you or the children ever been involved in court proceedings?',
  courtCase: 'Have the children been involved in a court case?',
  courtCaseYes: 'Yes',
  courtCaseNo: 'No',
  courtCaseDontKnow: "I don't know",
  courtOrder: 'Have you had a court order made for your protection?',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  summaryText: 'Contacts for help',
  saveAndContinue: 'Save and continue',
  errors: {
    proceedingsStart: {
      required: 'Please select an answer',
    },
  },
};

const cy: typeof en = {
  section: 'Current or previous proceedings',
  title: 'Have you or the children ever been involved in court proceedings?',
  courtCase: 'Have the children been involved in a court case?',
  courtCaseYes: 'Yes',
  courtCaseNo: 'No',
  courtCaseDontKnow: "I don't know",
  courtOrder: 'Have you had a court order made for your protection?',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  summaryText: 'Contacts for help',
  saveAndContinue: 'Save and continue',
  errors: {
    proceedingsStart: {
      required: 'Please select an answer',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    proceedingsCourtCase: {
      type: 'label',
      classes: 'govuk-label',
      label: l => l.courtCase,
      labelSize: null,
    },
    proceedingsStart: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.courtCaseYes,
          value: 'Yes',
        },
        {
          label: l => l.courtCaseNo,
          value: 'No',
        },
        {
          label: l => l.courtCaseDontKnow,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
    proceedingsCourtOrder: {
      type: 'label',
      classes: 'govuk-label',
      label: l => l.courtOrder,
      labelSize: null,
    },
    proceedingsStartOrder: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.courtOrderYes,
          value: 'Yes',
        },
        {
          label: l => l.courtOrderNo,
          value: 'No',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.saveAndContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
