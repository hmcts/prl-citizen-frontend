import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { C100RebuildPartyDetails, PartyType } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { Validator, areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../../people/util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
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
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
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
    otherGenderDetails: {
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
  },
};

const cy = {
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
  maleOptionLabel: 'Benyw',
  femaleOptionLabel: 'Gwryw',
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
      invalid:
        'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig. ',
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
    otherGenderDetails: {
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.- Welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('other person details > personal details', () => {
  const commonContent = {
    language: 'en',
    dateFormat: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
    userCase: {
      oprs_otherPersons: [
        {
          id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
          firstName: 'John',
          lastName: 'Doe',
          personalDetails: {
            dateOfBirth: {
              year: '1999',
              month: '09',
              day: '09',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'dontKnow',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          otherPersonId: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    const { errors } = generateFormFields(
      (getDataShape(PartyType.OTHER_PERSON) as C100RebuildPartyDetails).personalDetails
    );
    languageAssertions(
      'en',
      {
        ...en,
        title: `${en.title} John Doe`,
        errors: {
          ...en.errors,
          ...errors.en,
        },
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    const { errors } = generateFormFields(
      (getDataShape(PartyType.OTHER_PERSON) as C100RebuildPartyDetails).personalDetails
    );
    languageAssertions(
      'cy',
      {
        ...cy,
        title: `${cy.title} John Doe`,
        errors: {
          ...cy.errors,
          ...errors.cy,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain personal details form fields', () => {
    const { dateOfBirth, isDateOfBirthUnknown, gender } = fields as Record<string, FormFields>;

    expect(dateOfBirth.type).toBe('date');
    expect(dateOfBirth.classes).toBe('govuk-date-input');
    expect((dateOfBirth.label as Function)(generatedContent)).toBe(en.dobLabel);
    (dateOfBirth.validator as Validator)(commonContent.userCase!.oprs_otherPersons![0].personalDetails.dateOfBirth);
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith({
      day: '09',
      month: '09',
      year: '1999',
    });
    expect(isDateInputInvalid).toHaveBeenCalledWith({
      day: '09',
      month: '09',
      year: '1999',
    });
    expect(isFutureDate).toHaveBeenCalledWith({
      day: '09',
      month: '09',
      year: '1999',
    });

    expect(isDateOfBirthUnknown.type).toBe('checkboxes');
    expect(isDateOfBirthUnknown.values[0].name).toBe('isDateOfBirthUnknown');
    expect((isDateOfBirthUnknown.values[0].label as Function)(generatedContent)).toBe(en.approxCheckboxLabel);
    expect(isDateOfBirthUnknown.values[0].subFields.approxDateOfBirth.type).toBe('date');
    expect(isDateOfBirthUnknown.values[0].subFields.approxDateOfBirth.classes).toBe('govuk-date-input');
    expect((isDateOfBirthUnknown.values[0].subFields.approxDateOfBirth.label as Function)(generatedContent)).toBe(
      en.approxDobLabel
    );
    (isDateOfBirthUnknown.values[0].subFields.approxDateOfBirth.validator as Validator)(
      commonContent.userCase!.oprs_otherPersons![0].personalDetails.dateOfBirth
    );
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith({
      day: '09',
      month: '09',
      year: '1999',
    });
    expect(isDateInputInvalid).toHaveBeenCalledWith({
      day: '09',
      month: '09',
      year: '1999',
    });
    expect(isFutureDate).toHaveBeenCalledWith({
      day: '09',
      month: '09',
      year: '1999',
    });

    expect(gender.type).toBe('radios');
    expect(gender.classes).toBe('govuk-radios');
    expect((gender.label as Function)(generatedContent)).toBe(en.genderLabelText);
    expect((gender.values[0].label as Function)(generatedContent)).toBe(en.maleOptionLabel);
    expect(gender.values[0].value).toBe('Male');
    expect((gender.values[1].label as Function)(generatedContent)).toBe(en.femaleOptionLabel);
    expect(gender.values[1].value).toBe('Female');
    expect((gender.values[2].label as Function)(generatedContent)).toBe(en.otherOptionLabel);
    expect(gender.values[2].value).toBe('Other');
    expect(gender.values[2].subFields.otherGenderDetails.type).toBe('text');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
