import { CaseDate } from 'app/case/case';
import { FormContent } from 'app/form/Form';
import { TranslationFn } from '../../../../app/controller/GetController';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
} from '../../../../app/form/validation';
import { covertToDateObject } from '../../../../app/form/parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Provide details for',
  label: 'Date of birth',
  hint: 'For example, 31 3 2016',
  childSexLabel: 'Sex',
  male: 'Male',
  female: 'Female',
  unspecified: 'Unspecified',
  approximateCheckboxLabel: 'I don’t know their date of birth',
  approximateDobLabel: 'Approximate date of birth',
  errors: {
    childDateOfBirth: {
      required: 'Enter the date of birth',
    },
    childSex: {
      required: 'Select the sex',
    },
    apDateOfBirth: {
      required: 'Select approximate date of birth',
    }
  },
  
});

const cy = () => ({
  pageTitle: 'Enter the names of the children - welsh',
  label: 'Date of birth - welsh',
  hint: 'For example, 31 3 2016 - welsh',
  childSexLabel: 'Sex - welsh',
  male: 'Male - welsh',
  female: 'Female - welsh',
  unspecified: 'Unspecified - welsh',
  approximateCheckboxLabel: 'I don’t know their date of birth- welsh',
  approximateDobLabel: 'Approximate date of birth - welsh',
  errors: {
    childDateOfBirth: {
      required: 'Enter the date of birth  - welsh',
    },
    childSex: {
      required: 'Select the sex  - welsh',
    },
    apDateOfBirth: {
      required: 'Select approximate date of birth - welsh',
    }
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    childDateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.label,
      hint: l => l.hint,
      labelSize: 's',
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
      parser: body => covertToDateObject('childDateOfBirth', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },
    apDateOfBirth: {
      type: 'checkboxes',
      classes: "govuk-checkboxes--small",
      values: [
        {
          name: 'isDopKnown',
          label: l => l.approximateCheckboxLabel,
          value: 'Yes',
          subFields: {
            apDateOfBirth: {
              type: 'date',
              classes: 'govuk-date-input',
              label: 'Approximate date of birth',
              labelSize: 's',
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
              parser: body => covertToDateObject('apDateOfBirth', body as Record<string, unknown>),
              validator: value =>
                areDateFieldsFilledIn(value as CaseDate) ||
                isDateInputInvalid(value as CaseDate) ||
                isFutureDate(value as CaseDate),
            },
          },
        },
      ],
    },
    childSex: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.childSexLabel,
      labelSize: 'm',
      values: [
        {
          label: l => l.male,
          value: 'Male',
        },
        {
          label: l => l.female,
          value: 'Female  ',
        },
        {
          label: l => l.unspecified,
          value: 'Unspecified',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};
export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
