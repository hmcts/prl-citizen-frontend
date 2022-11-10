import { CaseDate } from '../../../../app/case/case';
import { C100Applicant, Gender, YesNoEmpty } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
} from '../../../../app/form/validation';
import { getApplicantDetails } from '../util';
//export * from '../routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Provide details for',
  haveYouChangeNameLabel: 'Have you changed your name?',
  haveYouChangeNameHint:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names',
  one: 'Yes',
  two: 'No',
  applicantPlaceOfBirthLabel: 'Your place of birth',
  applicantPlaceOfBirthHint: 'For example, town or city',
  dontKnowLabel: "Don't know",
  dobLabel: 'Your date of birth',
  dobHint: 'For example, 31 3 2016',
  previousNameLabel: 'Enter your previous name',
  previousNameHint: 'This should be the full legal name(including any middle names)',
  applicantGenderLabel: 'Gender',
  male: 'Male',
  female: 'Female',
  other: 'They identify in another way',
  otherGenderDetailsLabel: "Applicant's gender (Optional)",
  errors: {
    haveYouChangeName: {
      required: 'Select if you’ve changed your name',
    },
    applPreviousName: {
      required: 'Enter your previous name',
    },
    dateOfBirth: {
      required: 'Enter the date of birth',
      invalidDate: 'Date of birth is not valid',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDateInFuture: 'Date of birth must be in the past',
    },
    gender: {
      required: 'Select the gender',
    },
    applicantPlaceOfBirth: {
      required: 'Enter your place of birth',
    },
  },
});

const cy = () => ({
  title: 'Provide details for - welsh',
  haveYouChangeNameLabel: 'Have you changed your name? - welsh',

  haveYouChangeNameHint:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names - welsh',
  one: 'Yes',
  two: 'No',
  applicantPlaceOfBirthLabel: 'Your place of birth - welsh',
  applicantPlaceOfBirthHint: 'For example, town or city - welsh',
  dontKnowLabel: "Don't know - welsh",
  dobLabel: 'Your date of birth - welsh',
  dobHint: 'For example, 31 3 2016 - welsh',
  previousNameLabel: 'Enter your previous name -welsh',
  previousNameHint: 'This should be the full legal name(including any middle names) -welsh',
  applicantGenderLabel: 'Gender - welsh',
  male: 'Male - welsh',
  female: 'Female - welsh',
  other: 'They identify in another way - welsh',
  otherGenderDetailsLabel: "applicant's gender (Optional) - welsh",
  errors: {
    haveYouChangeName: {
      required: 'Select if you’ve changed your name -welsh',
    },
    applPreviousName: {
      required: 'Enter your previous name -welsh',
    },
    dateOfBirth: {
      required: 'Enter the date of birth - welsh',
      invalidDate: 'Date of birth is not valid - welsh',
      incompleteDay: 'Date of birth must include a day - welsh',
      incompleteMonth: 'Date of birth must include a month - welsh',
      incompleteYear: 'Date of birth must include a year - welsh',
      invalidDateInFuture: 'Date of birth must be in the past - welsh',
    },

    gender: {
      required: 'Select the gender - welsh',
    },
    applicantPlaceOfBirth: {
      required: 'Enter your place of birth -welsh',
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

export const generateFormFields = (personalDetails: C100Applicant['personalDetails']): GenerateDynamicFormFields => {
  const { haveYouChangeName, applPreviousName, dateOfBirth, gender, otherGenderDetails, applicantPlaceOfBirth } =
    personalDetails;
  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    haveYouChangeName: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.haveYouChangeNameLabel,
      hint: l => l.haveYouChangeNameHint,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesNoEmpty.YES,
          selected: haveYouChangeName === YesNoEmpty.YES,
          subFields: {
            applPreviousName: {
              type: 'text',
              class: 'govuk-label',
              labelSize: null,
              label: l => l.previousNameLabel,
              hint: l => l.previousNameHint,
              value: applPreviousName,
              validator: isFieldFilledIn,
            },
          },
        },
        {
          selected: haveYouChangeName === YesNoEmpty.NO,
          label: l => l.two,
          value: YesNoEmpty.NO,
        },
      ],
      validator: isFieldFilledIn,
    },

    gender: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.applicantGenderLabel,
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
      hint: l => l.dobHint,
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
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },

    applicantPlaceOfBirth: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.applicantPlaceOfBirthLabel,
      hint: l => l.applicantPlaceOfBirthHint,
      value: applicantPlaceOfBirth,
      labelSize: 'm',
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
  const applicantId = content.additionalData!.req.params.applicantId;
  const applicantDetails = getApplicantDetails(content.userCase!.appl_allApplicants ?? [], applicantId)!;
  const { fields } = generateFormFields(applicantDetails.personalDetails);

  return {
    ...translations,
    title: `${translations['title']} ${applicantDetails.applicantFirstName} ${applicantDetails.applicantLastName}`,
    form: updateFormFields(form, fields),
  };
};
