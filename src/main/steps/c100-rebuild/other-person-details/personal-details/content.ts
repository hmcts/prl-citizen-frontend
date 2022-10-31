import { CaseDate } from '../../../../app/case/case';
import { C100RebuildPartyDetails, Gender, YesNoDontKnow, YesNoEmpty } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
} from '../../../../app/form/validation';
import { getOtherPersonDetails } from '../util';
export * from '../routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Apply to court about child arrangements',
  title: 'Provide details for',
  isNameChangedLabelText: 'Have they changed their name?',
  inNameChangedHintText:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names',
  YesOptionLabel: 'Yes',
  NoOptionLabel: 'No',
  DontKnowOptionLabel: "Don't know",
  genderLabelText: 'Gender',
  otherGenderTextLabel: 'Provide details',
  maleOptionLabel: 'Male',
  femaleOptionLabel: 'Female',
  otherOptionLabel: 'Other',
  dobLabel: 'Date of birth',
  approxCheckboxLabel: 'I don’t know their date of birth',
  approxDobLabel: 'Approximate date of birth',
  errors: {
    isNameChanged: {
      required: 'Select if the they have changed their name',
    },
    gender: {
      required: 'Select the gender',
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
  },
});

const cy = () => ({
  serviceName: 'Apply to court about child arrangements - welsh',
  title: 'Provide details for - welsh',
  isNameChangedLabelText: 'Have they changed their name? - welsh',
  inNameChangedHintText:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names - welsh - welsh',
  YesOptionLabel: 'Yes - welsh',
  NoOptionLabel: 'No - welsh',
  DontKnowOptionLabel: "Don't know - welsh",
  genderLabelText: 'Gender - welsh',
  otherGenderTextLabel: 'Provide details - welsh',
  maleOptionLabel: 'Male - welsh',
  femaleOptionLabel: 'Female - welsh',
  otherOptionLabel: 'Other - welsh',
  dobLabel: 'Date of birth - welsh',
  approxCheckboxLabel: 'I don’t know their date of birth - welsh',
  approxDobLabel: 'Approximate date of birth - welsh',
  errors: {
    isNameChanged: {
      required: 'Select Yes, No or Maybe - welsh',
    },
    gender: {
      required: 'Select the gender - welsh',
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
  const { isNameChanged, dateOfBirth, isDateOfBirthUnknown, approxDateOfBirth, gender, otherGenderDetails } =
    personalDetails;
  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    isNameChanged: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      label: l => l.isNameChangedLabelText,
      hint: l => l.inNameChangedHintText,
      values: [
        {
          label: l => l.YesOptionLabel,
          value: YesNoDontKnow.yes,
        },
        {
          label: l => l.NoOptionLabel,
          value: YesNoDontKnow.no,
        },
        {
          label: l => l.DontKnowOptionLabel,
          value: YesNoDontKnow.dontKnow,
        },
      ],
      validator: isFieldFilledIn,
    },
    gender: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.genderLabelText,
      labelSize: 'l',
      values: [
        {
          label: l => l.maleOptionLabel,
          value: Gender.FEMALE,
        },
        {
          label: l => l.femaleOptionLabel,
          value: Gender.MALE,
        },
        {
          label: l => l.otherOptionLabel,
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
      labelSize: 'l',
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
  };

  // mark the selection for the radio buttons based on the option chosen
  fields.isNameChanged.values = fields.isNameChanged.values.map(config =>
    config.value === isNameChanged ? { ...config, selected: true } : config
  );

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
  const otherPersonId = content.additionalData!.req.params.otherPersonId;
  const otherPersonDetails = getOtherPersonDetails(content.userCase!.oprs_otherPersons ?? [], otherPersonId)!;
  const { fields } = generateFormFields(otherPersonDetails.personalDetails);

  return {
    ...translations,
    title: `${translations['title']} ${otherPersonDetails.firstName} ${otherPersonDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
