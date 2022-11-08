import { CaseDate } from '../../../../app/case/case';
import { C100RebuildPartyDetails, Gender, YesNoEmpty, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
} from '../../../../app/form/validation';
import { getRespndentDetails } from '../util';
//export * from '../routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Provide details for',
  repondentDetials: 'Have they change thier name?',
  repondentHint:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names',
  one: 'Yes',
  two: 'No',
  respondentPlaceOfBirth: 'Place of birth',
  respondentPlaceOfBirthHint: 'For example, town or city',
  dontKnow: "Don't know",
  dobLabel: 'Date of birth',
  approxCheckboxLabel: 'I don’t know their date of birth',
  approxDobLabel: 'Approximate date of birth',
  previousName: 'Enter their previous name',
  previousNameHint: 'This should be the full legal name(including any middle names)',
  respondentGenderLabel: 'Gender',
  male: 'Male',
  female: 'Female',
  other: 'They identify in another way',
  respondentPlaceOfBirthUnknown: 'I don’t know their place of birth',
  otherGenderDetailsLabel: "Respondent's gender (Optional)",
  errors: {
    repondentDetials: {
      required: 'Select if they’ve changed their name',
    },
    previousName: {
      required: 'Enter their previous name',
    },
    dateOfBirth: {
      required: 'Enter the date of birth',
      invalidDate: 'Date of birth is not valid',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDateInFuture: 'Date of birth must be in the past',
      cannotHaveBothApproxAndExact: 'Cannot have a date of birth and also "I dont know their date of birth"',
    },
    approxDateOfBirth: {
      required: 'Enter the approx date of birth',
      invalidDate: 'Approx date of birth is not valid',
      incompleteDay: 'Approx date of birth must include a day',
      incompleteMonth: 'Approx date of birth must include a month',
      incompleteYear: 'Approx date of birth must include a year',
      invalidDateInFuture: 'Approx date of birth must be in the past',
    },
    gender: {
      required: 'Select the gender',
    },
    respondentPlaceOfBirth: {
      required: 'Enter their place of birth',
    },
  },
});

const cy = () => ({
  title: 'Provide details for - welsh',
  repondentDetails: 'Have they change thier name? - welsh',
  repondentHint:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names - welsh',
  one: 'Yes',
  two: 'No',
  respondentPlaceOfBirth: 'Place of birth',
  respondentPlaceOfBirthHint: 'For example, town or city',
  dontKnow: "Don't know - welsh",
  dobLabel: 'Date of birth - welsh',
  approxCheckboxLabel: 'I don’t know their date of birth - welsh',
  approxDobLabel: 'Approximate date of birth - welsh',
  previousName: 'Enter their previous name -welsh',
  previousNameHint: 'This should be the full legal name(including any middle names) -welsh',
  respondentGenderLabel: 'Gender - welsh',
  male: 'Male - welsh',
  female: 'Female - welsh',
  other: 'They identify in another way - welsh',
  respondentPlaceOfBirthUnknown: 'I don’t know their place of birth - welsh',
  otherGenderDetailsLabel: "Respondent's gender (Optional) - welsh",
  errors: {
    repondentDetials: {
      required: 'Select if they’ve changed their name -welsh',
    },
    previousName: {
      required: 'Enter their previous name -welsh',
    },
    dateOfBirth: {
      required: 'Enter the date of birth - welsh',
      invalidDate: 'Date of birth is not valid - welsh',
      incompleteDay: 'Date of birth must include a day - welsh',
      incompleteMonth: 'Date of birth must include a month - welsh',
      incompleteYear: 'Date of birth must include a year - welsh',
      invalidDateInFuture: 'Date of birth must be in the past - welsh',
      cannotHaveBothApproxAndExact: 'Cannot have a date of birth and also "I dont know their date of birth" - welsh',
    },
    approxDateOfBirth: {
      required: 'Enter the approx date of birth - welsh',
      invalidDate: 'Approx date of birth is not valid - welsh',
      incompleteDay: 'Approx date of birth must include a day - welsh',
      incompleteMonth: 'Approx date of birth must include a month - welsh',
      incompleteYear: 'Approx date of birth must include a year - welsh',
      invalidDateInFuture: 'Approx date of birth must be in the past - welsh',
    },
    gender: {
      required: 'Select the gender - welsh',
    },
    respondentPlaceOfBirth: {
      required: 'Enter their place of birth -welsh',
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

export const generateFormFields = (
  personalDetails: C100RebuildPartyDetails['personalDetails']
): GenerateDynamicFormFields => {
  const {
    repondentDetials,
    resPreviousName,
    dateOfBirth,
    isDateOfBirthUnknown,
    approxDateOfBirth,
    gender,
    otherGenderDetails,
    respondentPlaceOfBirth,
    respondentPlaceOfBirthUnknown,
  } = personalDetails;
  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    repondentDetials: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.repondentDetials,
      hint: l => l.repondentHint,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesNoEmpty.YES,
          selected: repondentDetials === YesNoEmpty.YES,
          subFields: {
            previousName: {
              type: 'text',
              class: 'govuk-label',
              labelSize: null,
              label: l => l.previousName,
              hint: l => l.previousNameHint,
              value: resPreviousName,
              validator: isFieldFilledIn,
            },
          },
        },
        {
          selected: repondentDetials === YesNoEmpty.NO,
          label: l => l.two,
          value: YesNoEmpty.NO,
        },
        {
          label: l => l.dontKnow,
          value: YesNoEmpty.EMPTY,
        },
      ],
      validator: isFieldFilledIn,
    },

    gender: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.respondentGenderLabel,
      labelSize: 'm',
      values: [
        {
          label: l => l.female,
          value: Gender.FEMALE,
        },
        {
          label: l => l.male,
          value: Gender.MALE,
        },
        {
          label: l => l.other,
          value: Gender.OTHER,
          subFields: {
            otherGenderDetails: {
              type: 'text',
              label: l => l.otherGenderDetailsLabel,
              labelSize: null,
              value: otherGenderDetails,
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },

    dateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      labelSize: 'm',
      label: l => l.dobLabel,
      values: [
        {
          label: l => l.dateFormat['day'],
          name: 'day',
          value: dateOfBirth!.day,
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['month'],
          name: 'month',
          value: dateOfBirth!.month,
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['year'],
          name: 'year',
          value: dateOfBirth!.year,
          classes: 'govuk-input--width-4',
          attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
        },
      ],
      parser: body => covertToDateObject('dateOfBirth', body as Record<string, unknown>),
      validator: (value, formData) =>
        formData?.isDateOfBirthUnknown !== YesNoEmpty.YES
          ? areDateFieldsFilledIn(value as CaseDate) ||
            isDateInputInvalid(value as CaseDate) ||
            isFutureDate(value as CaseDate)
          : formData?.isDateOfBirthUnknown === YesNoEmpty.YES
          ? formData.dateOfBirth.day !== '' || formData.dateOfBirth.month !== '' || formData.dateOfBirth.year !== ''
            ? 'cannotHaveBothApproxAndExact'
            : ''
          : '',
    },
    isDateOfBirthUnknown: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes--small',
      values: [
        {
          name: 'isDateOfBirthUnknown',
          label: l => l.approxCheckboxLabel,
          selected: isDateOfBirthUnknown === YesNoEmpty.YES,
          value: YesNoEmpty.YES,
          subFields: {
            approxDateOfBirth: {
              type: 'date',
              classes: 'govuk-date-input',
              labelSize: 's',
              label: l => l.approxDobLabel,
              values: [
                {
                  label: l => l.dateFormat['day'],
                  name: 'day',
                  value: approxDateOfBirth!.day,
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  name: 'month',
                  value: approxDateOfBirth!.month,
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  name: 'year',
                  value: approxDateOfBirth!.year,
                  classes: 'govuk-input--width-4',
                  attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
                },
              ],
              parser: body => covertToDateObject('approxDateOfBirth', body as Record<string, unknown>),
              validator: (value, formData) =>
                formData?.isDateOfBirthUnknown === YesNoEmpty.YES
                  ? areDateFieldsFilledIn(value as CaseDate) ||
                    isDateInputInvalid(value as CaseDate) ||
                    isFutureDate(value as CaseDate)
                  : '',
            },
          },
        },
      ],
    },
    respondentPlaceOfBirth: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.respondentPlaceOfBirth,
      hint: l => l.respondentPlaceOfBirthHint,
      value: respondentPlaceOfBirth,
      labelSize: 'm',
      //  validator: value => isFieldFilledIn(value),
      validator: (value, formData) =>
        formData?.respondentPlaceOfBirthUnknown === YesOrNo.YES ? '' : isFieldFilledIn(value),
    },
    respondentPlaceOfBirthUnknown: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes--small',
      values: [
        {
          name: 'respondentPlaceOfBirthUnknown',
          label: l => l.respondentPlaceOfBirthUnknown,
          selected: respondentPlaceOfBirthUnknown === YesOrNo.YES,
          value: YesNoEmpty.YES,
        },
      ],
    },
  };

  // mark the selection for the radio buttons based on the option chosen

  fields.gender.values = fields.gender.values.map(config =>
    config.value === gender ? { ...config, selected: true } : config
  );

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

export const getFormFields = (): FormContent => {
  return updatedForm;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const respondentId = content.additionalData!.req.params.respondentId;
  const respondentDetails = getRespndentDetails(content.userCase!.resp_Respondents ?? [], respondentId)!;
  const { fields } = generateFormFields(respondentDetails.personalDetails);

  return {
    ...translations,
    title: `${translations['title']} ${respondentDetails.firstName} ${respondentDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
