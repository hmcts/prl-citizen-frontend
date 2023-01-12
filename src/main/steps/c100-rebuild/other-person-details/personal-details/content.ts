import { CaseDate, CaseWithId } from '../../../../app/case/case';
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
import { getPartyDetails } from '../../people/util';
export * from '../routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child arrangements',
  title: 'Provide details for',
  isNameChangedLabelText: 'Have they changed their name?',
  inNameChangedHintText:
    'For example, through marriage or adoption or by deed poll. This includes first name, surname and any middle names',
  previousFullNameLabel: 'Enter their previous name',
  previousFullNameHintText: 'This should be the full legal name (including any middle names)',
  YesOptionLabel: 'Yes',
  NoOptionLabel: 'No',
  DontKnowOptionLabel: "Don't know",
  genderLabelText: 'Gender',
  otherGenderTextLabel: 'Provide details',
  maleOptionLabel: 'Male',
  femaleOptionLabel: 'Female',
  otherOptionLabel: 'They identify in another way',
  dobLabel: 'Date of birth',
  approxCheckboxLabel: 'I don’t know their date of birth',
  approxDobLabel: 'Approximate date of birth',
  // day: 'Day',
  // month: 'Month',
  // year: 'Year',
  errors: {
    hasNameChanged: {
      required: 'Select if the they have changed their name',
    },
    previousFullName: {
      required: 'Enter their previous name',
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
  serviceName: 'Trefniadau plant',
  title: 'Darparwch fanylion am',
  isNameChangedLabelText: 'A ydynt wedi newid eu henw?',
  inNameChangedHintText:
    'Er enghraifft, trwy briodas neu fabwysiadu neu drwy weithred newid enw. Mae hyn yn cynnwys enw cyntaf, cyfenw ac unrhyw enwau canol',
  previousFullNameLabel: 'Nodwch eu henw blaenorol',
  previousFullNameHintText: 'Dylai hwn fod yr enw cyfreithiol llawn (gan gynnwys unrhyw enwau canol)',
  YesOptionLabel: 'Do',
  NoOptionLabel: 'Naddo',
  DontKnowOptionLabel: 'Ddim yn gwybod',
  genderLabelText: 'Rhyw',
  otherGenderTextLabel: 'Rhowch fanylion',
  maleOptionLabel: 'Gwryw',
  femaleOptionLabel: 'Benyw',
  otherOptionLabel: 'Maen nhw’n uniaethu mewn ffordd arall',
  dobLabel: 'Dyddiad geni',
  approxCheckboxLabel: 'Nid wyf yn gwybod beth yw eu dyddiad geni',
  approxDobLabel: 'Dyddiad geni bras',
  // day: 'Diwrnody',
  // month: 'Mis',
  // year: 'Blwyddyn',
  errors: {
    hasNameChanged: {
      required: 'Nodwch os ydyw wedi newid ei enw',
    },
    previousFullName: {
      required: 'Nodwch eu henw blaenorol',
    },
    gender: {
      required: 'Dewiswch y rhywedd',
    },
    dateOfBirth: {
      required: 'Nodwch ei ddyddiad geni',
      invalidDate: 'Nid yw’r dyddiad geni yn ddilys',
      incompleteDay: 'DRhaid i’r dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad geni gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad geni gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’r dyddiad geni fod yn y gorffennol',
      cannotHaveBothApproxAndExact: 'Methu cael dyddiad geni a hefyd “ nid wyf yn gwybod beth yw ei ddyddiad geni',
    },
    approxDateOfBirth: {
      required: 'Nodwch ddyddiad geni bras',
      invalidDate: 'Nid yw’r dyddiad geni bras yn ddilys',
      incompleteDay: 'Rhaid i’r dyddiad geni bras gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad geni bras gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad geni bras gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’r dyddiad geni bras fod yn y gorffennol',
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
    hasNameChanged,
    dateOfBirth,
    isDateOfBirthUnknown,
    approxDateOfBirth,
    gender,
    otherGenderDetails,
    previousFullName,
  } = personalDetails;
  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    hasNameChanged: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      label: l => l.isNameChangedLabelText,
      hint: l => l.inNameChangedHintText,
      values: [
        {
          label: l => l.YesOptionLabel,
          value: YesNoDontKnow.yes,
          subFields: {
            previousFullName: {
              type: 'text',
              label: l => l.previousFullNameLabel,
              hint: l => l.previousFullNameHintText,
              labelSize: null,
              value: previousFullName,
              validator: isFieldFilledIn,
            },
          },
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
          value: Gender.MALE,
        },
        {
          label: l => l.femaleOptionLabel,
          value: Gender.FEMALE,
        },
        {
          label: l => l.otherOptionLabel,
          value: Gender.OTHER,
          subFields: {
            otherGenderDetails: {
              type: 'text',
              label: l => l.otherGenderTextLabel,
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
          //label: l => l.day,
          name: 'day',
          value: dateOfBirth!.day,
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['month'],
          //label: l => l.month,
          name: 'month',
          value: dateOfBirth!.month,
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['year'],
          //label: l => l.year,
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
                  //label: l => l.day,
                  name: 'day',
                  value: approxDateOfBirth!.day,
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  //label: l => l.month,
                  name: 'month',
                  value: approxDateOfBirth!.month,
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  //label: l => l.year,
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
  fields.hasNameChanged.values = fields.hasNameChanged.values.map(config =>
    config.value === hasNameChanged ? { ...config, selected: true } : config
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

export const getFormFields = (
  caseData: Partial<CaseWithId>,
  otherPersonId: C100RebuildPartyDetails['id']
): FormContent => {
  const otherPersonDetails = getPartyDetails(otherPersonId, caseData?.oprs_otherPersons) as C100RebuildPartyDetails;
  return updateFormFields(form, generateFormFields(otherPersonDetails?.personalDetails ?? {}).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const otherPersonId = content.additionalData!.req.params.otherPersonId;
  const otherPersonDetails = getPartyDetails(
    otherPersonId,
    content.userCase!.oprs_otherPersons
  ) as C100RebuildPartyDetails;
  const { fields } = generateFormFields(otherPersonDetails.personalDetails);

  return {
    ...translations,
    title: `${translations['title']} ${otherPersonDetails.firstName} ${otherPersonDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
