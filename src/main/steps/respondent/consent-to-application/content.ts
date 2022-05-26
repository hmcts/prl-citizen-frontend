import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';


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
};

const cy: typeof en = {
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
          subFields:{
            reasonForNotConsenting: {
              type: 'textarea',
              label: l => l.reasonNotConsenting,
              id: 'notConsentingReason',
              validator: value => isFieldFilledIn(value),
            },
          },
        }
      ],
      validator: isFieldFilledIn,
    },
    applicationReceived: {
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
      parser: body => covertToDateObject('applicationReceived', body as Record<string, unknown>),
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
          subFields:{
            courtOrderDetails: {
              type: 'textarea',
              label: l => l.courtOrderDetails,
              id: 'courtOrderDetails',
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        {
          label: l => l.two,
          value: 'No',
        }
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
