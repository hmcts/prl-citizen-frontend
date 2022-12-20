/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseDate, CaseWithId } from '../../../../app/case/case';
import { C100RebuildPartyDetails, Gender, YesNoDontKnow, YesNoEmpty, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isAlphaNumeric,
  isDateInputInvalid,
  isFieldFilledIn,
  isFieldLetters,
  isFutureDate,
} from '../../../../app/form/validation';
import { getPartyDetails } from '../../people/util';
//export * from '../routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Provide details for',
  hasNameChanged: 'Have they changed their name?',
  hasNameChangedHint:
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
  // day: 'Day',
  // month: 'Month',
  // year: 'Year',
  errors: {
    hasNameChanged: {
      required: 'Select if they’ve changed their name',
    },
    previousFullName: {
      required: 'Enter their previous name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
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
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
    otherGenderDetails: {
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
  },
});

export const cy = () => ({
  title: 'Darparu manylion am',
  hasNameChanged: 'A ydynt wedi newid eu henw?',
  hasNameChangedHint:
    'Er enghraifft, trwy briodas neu fabwysiadu neu drwy weithred newid enw. Mae hyn yn cynnwys enw cyntaf, cyfenw ac unrhyw enwau canol',
  one: 'Do',
  two: 'Naddo',
  respondentPlaceOfBirth: 'Lleoliad geni',
  respondentPlaceOfBirthHint: 'Er enghraifft, tref neu ddinas',
  dontKnow: 'Ddim yn gwybod',
  dobLabel: 'Dyddiad geni',
  approxCheckboxLabel: 'Nid wyf yn gwybod beth yw eu dyddiad geni',
  approxDobLabel: 'Dyddiad geni bras',
  previousName: 'Nodwch eu henw blaenorol',
  previousNameHint: 'Dylai hwn fod yr enw cyfreithiol llawn (gan gynnwys unrhyw enwau canol)',
  respondentGenderLabel: 'Rhyw',
  male: 'Benyw',
  female: 'Gwryw',
  other: 'Maen nhw’n uniaethu mewn ffordd arall',
  respondentPlaceOfBirthUnknown: 'Nid wyf yn gwybod beth yw eu man genih',
  otherGenderDetailsLabel: 'Rhywedd yr atebydd (Dewisol)',
  // day: 'Diwrnod',
  // month: 'Mis',
  // year: 'Blwyddyn',
  errors: {
    hasNameChanged: {
      required: 'Nodwch os ydyw wedi newid ei enw',
    },
    previousFullName: {
      required: 'Nodwch eu henw blaenorol',
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig. ',
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
    gender: {
      required: 'Nodwch y rhywedd',
    },
    respondentPlaceOfBirth: {
      required: 'Nodwch y man geni',
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.-Welsh',
    },
    otherGenderDetails: {
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.-Welsh',
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
    previousFullName,
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
    hasNameChanged: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.hasNameChanged,
      hint: l => l.hasNameChangedHint,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesNoDontKnow.yes,
          selected: hasNameChanged === YesNoDontKnow.yes,
          subFields: {
            previousFullName: {
              type: 'text',
              class: 'govuk-label',
              labelSize: null,
              label: l => l.previousName,
              hint: l => l.previousNameHint,
              value: previousFullName,
              validator: value => isFieldFilledIn(value) || isFieldLetters(value),
            },
          },
        },
        {
          selected: hasNameChanged === YesNoDontKnow.no,
          label: l => l.two,
          value: YesNoDontKnow.no,
        },
        {
          selected: hasNameChanged === YesNoDontKnow.dontKnow,
          label: l => l.dontKnow,
          value: YesNoDontKnow.dontKnow,
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
              validator: value => isAlphaNumeric(value),
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
    respondentPlaceOfBirth: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.respondentPlaceOfBirth,
      hint: l => l.respondentPlaceOfBirthHint,
      value: respondentPlaceOfBirth,
      labelSize: 'm',
      //  validator: value => isFieldFilledIn(value),
      validator: (value, formData) =>
        formData?.respondentPlaceOfBirthUnknown === YesOrNo.YES ? '' : isFieldFilledIn(value) || isAlphaNumeric(value),
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
  respondentId: C100RebuildPartyDetails['id']
): FormContent => {
  const respondentDetails = getPartyDetails(respondentId, caseData?.resp_Respondents) as C100RebuildPartyDetails;
  return updateFormFields(form, generateFormFields(respondentDetails.personalDetails ?? {}).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const respondentId = content.additionalData!.req.params.respondentId;
  const respondentDetails = getPartyDetails(
    respondentId,
    content.userCase!.resp_Respondents
  ) as C100RebuildPartyDetails;
  const { fields } = generateFormFields(respondentDetails.personalDetails);

  return {
    ...translations,
    title: `${translations['title']} ${respondentDetails.firstName} ${respondentDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
