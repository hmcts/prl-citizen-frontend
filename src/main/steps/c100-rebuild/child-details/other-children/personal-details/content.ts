import { CaseDate } from '../../../../../app/case/case';
import { Gender, OtherChildrenDetails, YesNoEmpty } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { covertToDateObject } from '../../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
} from '../../../../../app/form/validation';
import { getPartyDetails } from '../../../people/util';
export * from '../routeGuard';

// const getChildsName = (userCase: Partial<CaseWithId>) => {
//   const sibling = userCase.ocd_otherChildren?.find(item => item.siblingId === userCase.selectedSiblingId);
//   return `${sibling?.siblingFirstName || ''} ${sibling?.siblingLastNames || ''}`;
// };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Provide details for',
  dobLabel: 'Date of birth',
  dateHint: 'For example, 31 3 2016',
  approxCheckboxLabel: 'I don’t know their date of birth',
  approxDobLabel: 'Approximate date of birth',
  childGenderLabel: 'Gender',
  male: 'Male',
  female: 'Female',
  other: 'They identify in another way',
  otherGenderDetailsLabel: "Child's gender (Optional)",
  errors: {
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
  },
});

const cy = () => ({
  title: 'Provide details for - welsh',
  dobLabel: 'Date of birth - welsh',
  dateHint: 'For example, 31 3 2016 - welsh',
  approxCheckboxLabel: 'I don’t know their date of birth - welsh',
  approxDobLabel: 'Approximate date of birth - welsh',
  childGenderLabel: 'Gender - welsh',
  male: 'Male - welsh',
  female: 'Female - welsh',
  other: 'They identify in another way - welsh',
  otherGenderDetailsLabel: "Child's gender (Optional) - welsh",
  errors: {
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
  personalDetails: OtherChildrenDetails['personalDetails']
): GenerateDynamicFormFields => {
  const { dateOfBirth, isDateOfBirthUnknown, approxDateOfBirth, gender, otherGenderDetails } = personalDetails;
  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    dateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      labelSize: 's',
      label: l => l.dobLabel,
      hint: l => l.dateHint,
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
    gender: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.childGenderLabel,
      labelSize: 's',
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
  const childId = content.additionalData!.req.params.childId;
  const childDetails = getPartyDetails(childId, content.userCase!.ocd_otherChildren)!;
  const { fields } = generateFormFields(childDetails.personalDetails);

  return {
    ...translations,
    title: `${translations['title']} ${childDetails.firstName} ${childDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
