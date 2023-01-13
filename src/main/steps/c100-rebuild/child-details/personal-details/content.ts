/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseDate, CaseWithId } from '../../../../app/case/case';
import { ChildrenDetails, Gender, YesNoEmpty } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
  isMoreThan18Years,
} from '../../../../app/form/validation';
import { getPartyDetails } from '../../people/util';
export * from '../routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
  // day: 'Day',
  // month: 'Month',
  // year: 'Year',
  errors: {
    dateOfBirth: {
      required: 'Enter the date of birth',
      invalidDate: 'Date of birth is not valid',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDateInFuture: 'Date of birth must be in the past',
      cannotHaveBothApproxAndExact: 'Cannot have a date of birth and also "I dont know their date of birth"',
      invalidDateOver18: 'Enter a date of birth under 18 years of age',
    },
    approxDateOfBirth: {
      required: 'Enter the approx date of birth',
      invalidDate: 'Approx date of birth is not valid',
      incompleteDay: 'Approx date of birth must include a day',
      incompleteMonth: 'Approx date of birth must include a month',
      incompleteYear: 'Approx date of birth must include a year',
      invalidDateInFuture: 'Approx date of birth must be in the past',
      invalidDateOver18: 'Enter a date of birth under 18 years of age',
    },
    gender: {
      required: 'Select the gender',
    },
  },
});

export const cy = () => ({
  title: 'Darparwch fanylion am',
  dobLabel: 'Dyddiad geni',
  dateHint: 'Er enghraifft, 31 3 2016',
  approxCheckboxLabel: 'Nid wyf yn gwybod beth yw ei (d)dyddiad geni',
  approxDobLabel: 'Dyddiad geni bras',
  childGenderLabel: 'Rhyw',
  male: 'Gwryw',
  female: 'Benyw',
  other: 'Maen nhw’n uniaethu mewn ffordd arall',
  otherGenderDetailsLabel: 'Rhyw y plentyn (Dewisol)',
  // day: 'Diwrnod',
  // month: 'Mis',
  // year: 'Blwyddyn',
  errors: {
    dateOfBirth: {
      required: 'Nodwch ei ddyddiad geni',
      invalidDate: 'Nid yw’r dyddiad geni yn ddilys',
      incompleteDay: 'DRhaid i’r dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad geni gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad geni gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’r dyddiad geni fod yn y gorffennol',
      cannotHaveBothApproxAndExact: 'Methu cael dyddiad geni a hefyd “ nid wyf yn gwybod beth yw ei ddyddiad geni',
      invalidDateOver18: 'Rhowch ddyddiad geni sy’n addas ar gyfer unigolyn dan 18 oed',
    },
    approxDateOfBirth: {
      required: 'Nodwch ddyddiad geni bras',
      invalidDate: 'Nid yw’r dyddiad geni bras yn ddilys',
      incompleteDay: 'Rhaid i’r dyddiad geni bras gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad geni bras gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad geni bras gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’r dyddiad geni bras fod yn y gorffennol',
      invalidDateOver18: 'Rhowch ddyddiad geni sy’n addas ar gyfer unigolyn dan 18 oed',
    },
    gender: {
      required: 'Nodwch y rhywedd',
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

export const generateFormFields = (personalDetails: ChildrenDetails['personalDetails'],language): GenerateDynamicFormFields => {
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
          //label: l => l.day,
          name: day(language),
          value: dateOfBirth!.day,
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['month'],
          //label: l => l.month,
          name: month(language),
          value: dateOfBirth!.month,
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['year'],
          //label: l => l.year,
          name: year(language),
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
            isMoreThan18Years(value as CaseDate) ||
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
                  name: day(language),
                  value: approxDateOfBirth!.day,
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['month'],
                  //label: l => l.month,
                  name: month(language),
                  value: approxDateOfBirth!.month,
                  classes: 'govuk-input--width-2',
                  attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
                },
                {
                  label: l => l.dateFormat['year'],
                  //label: l => l.year,
                  name: year(language),
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
                    isMoreThan18Years(value as CaseDate) ||
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
  fields: {
    _ctx: {
      type: 'hidden',
      labelHidden: true,
      value: 'pd',
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const getFormFields = (caseData: Partial<CaseWithId>, childId: ChildrenDetails['id'],language): FormContent => {
  const childDetails = getPartyDetails(childId, caseData?.cd_children) as ChildrenDetails;

  return updateFormFields(form, generateFormFields(childDetails?.personalDetails ?? {},language).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const childId = content.additionalData!.req.params.childId;
  const childDetails = getPartyDetails(childId, content.userCase!.cd_children) as ChildrenDetails;
  const { fields } = generateFormFields(childDetails.personalDetails,content.language);

  return {
    ...translations,
    title: `${translations['title']} ${childDetails.firstName} ${childDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
function day(language):string {
  if(language==="cy"){
    return "Diwrnod"
  }
  return "Day"
}
function month(language):string {
  if(language==="cy"){
    return "Mis"
  }
  return "Month"
}
function year(language):string {
  if(language==="cy"){
    return "Blwyddyn"
  }
  return "Year"
}
