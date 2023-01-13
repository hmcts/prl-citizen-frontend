import { CaseDate } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
  isTextAreaValid,
} from '../../../../app/form/validation';

const en = {
  title: 'Your understanding of the application',
  consent: 'Do you consent to the application?',
  dateReceived: 'When did you receive the application?',
  courtPermission: 'Does the applicant need permission from the court before making applications?',
  one: 'Yes',
  two: 'No',
  hint: 'For example, 27 3 2007',
  continue: 'Save and continue',
  reasonNotConsenting: 'Give your reasons for not consenting to the application.',
  courtOrderDetails: 'Provide details of the court order in place.',
  errors: {
    doYouConsent: {
      required: 'Please select an answer',
    },
    courtPermission: {
      required: 'Provide a reason',
    },
    reasonForNotConsenting: {
      required: 'Please provide a reason',
      invalid: 'Reason must be 500 characters or fewer',
    },
    courtOrderDetails: {
      required: 'Please provide court details',
      invalid: 'Details must be 500 characters or fewer',
    },
    applicationReceivedDate: {
      required: 'Enter application received date',
      invalidDate: 'Application received date must be a real date',
      incompleteDay: 'Application received date must include a day',
      incompleteMonth: 'Application received date must include a month',
      incompleteYear: 'Application received date must include a year',
      invalidDateInFuture: 'Application received date must be in the past',
    },
  },
};

const cy: typeof en = {
  title: "Eich dealltwriaeth o'r cais",
  consent: "Ydych chi'n cydsynio i'r cais?",
  dateReceived: "Pryd gawsoch chi'r cais?",
  courtPermission: 'A oes angen caniatâd y llys ar yr ymgeisydd cyn gwneud ceisiadau?',
  one: 'Oes',
  two: 'Nac oes',
  hint: 'For example, 27 3 2007 (welsh)',
  continue: 'Save and continue (welsh)',
  reasonNotConsenting: 'Give your reasons for not consenting to the application. (welsh)',
  courtOrderDetails: 'Provide details of the court order in place. (welsh)',
  errors: {
    doYouConsent: {
      required: 'Please select an answer (welsh)',
    },
    courtPermission: {
      required: 'Please select an answer (welsh)',
    },
    reasonForNotConsenting: {
      required: 'Please provide a reason (welsh)',
      invalid: 'Reason must be 500 characters or fewer (welsh)',
    },
    courtOrderDetails: {
      required: 'Please provide court details (welsh)',
      invalid: 'Details must be 500 characters or fewer (welsh)',
    },
    applicationReceivedDate: {
      required: 'Enter application received date (welsh)',
      invalidDate: 'Application received date must be a real date (welsh)',
      incompleteDay: 'Application received date must include a day (welsh)',
      incompleteMonth: 'Application received date must include a month (welsh)',
      incompleteYear: 'Application received date must include a year (welsh)',
      invalidDateInFuture: 'Application received date must be in the past (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    doYouConsent: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.consent,
      labelSize: 'm',
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: 'Yes',
        },
        {
          label: l => l.two,
          value: 'No',
          subFields: {
            reasonForNotConsenting: {
              type: 'textarea',
              label: l => l.reasonNotConsenting,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
    applicationReceivedDate: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.dateReceived,
      labelSize: 'm',
      hint: l => l.hint,
      values: [
        {
          label: l => l.dateFormat['day'],
          name: 'day',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['month'],
          name: 'month',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['year'],
          name: 'year',
          classes: 'govuk-input--width-4',
          attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
        },
      ],
      parser: body => covertToDateObject('applicationReceivedDate', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },
    courtPermission: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.courtPermission,
      labelSize: 'm',
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: 'Yes',
          subFields: {
            courtOrderDetails: {
              type: 'textarea',
              label: l => l.courtOrderDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.two,
          value: 'No',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
