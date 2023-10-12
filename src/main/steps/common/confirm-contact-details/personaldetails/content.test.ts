//import { FormContent , FormFields , FormOptions } from "../../../../app/form/Form";

import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator } from '../../../../app/form/validation';
import { CommonContent } from '../../common.content';

import { generateContent } from './content';

//jest.mock('../../../app/form/validation');

const enContent = {
  title: 'Your name and date of birth',
  citizenUserFirstNames: 'Your first name',
  citizenUserLastNames: 'Your last name',
  previousName: 'Previous name(s), if any (optional)',
  citizenUserPlaceOfBirth: 'Place of birth',
  citizenUserDateOfBirth: 'Your date of birth',
  hintDateOfBirth: 'For example - 31 3 1980',
  continue: 'Continue',
  errors: {
    citizenUserFirstNames: {
      required: 'Enter Your first name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    citizenUserLastNames: {
      required: 'Enter Your last name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    citizenUserPlaceOfBirth: {
      required: 'Enter Your Place of birth',
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
    citizenUserAdditionalName: {
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    citizenUserDateOfBirth: {
      required: 'Enter your date of birth',
      invalidDate: 'Date of birth must be a real date',
      incompleteDay: 'Your date of birth must include a day',
      incompleteMonth: 'Your date of birth must include a month',
      incompleteYear: 'Your date of birth must include a year',
      invalidDateInFuture: 'Your date of birth must be in the past',
    },
  },
};

const cyContent: typeof enContent = {
  title: 'Eich enw a dyddiad geni',
  citizenUserFirstNames: 'Eich enw cyntaf',
  citizenUserLastNames: 'Eich cyfenw',
  previousName: 'Enwau blaenorol, os o gwbl (Dewisol)',
  citizenUserPlaceOfBirth: 'Man geni',
  citizenUserDateOfBirth: 'Eich dyddiad geni',
  hintDateOfBirth: 'Er enghraifft - 31 3 1980',
  continue: 'Parhau',
  errors: {
    citizenUserFirstNames: {
      required: 'Rhowch Eich enw cyntaf',
      invalid:
        ' Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    citizenUserLastNames: {
      required: 'Rhowch Eich Enw Diwethaf',
      invalid:
        ' Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    citizenUserPlaceOfBirth: {
      required: 'Rhowch Eich Man Geni',
      invalid: 'Rydych wedi defnyddio nod annilys. Defnyddiwch lythrennau a rhifau yn unig.',
    },
    citizenUserAdditionalName: {
      invalid:
        ' Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    citizenUserDateOfBirth: {
      required: 'Rhowch eich dyddiad geni',
      invalidDate: 'Rhaid i’r dyddiad geni fod yn ddyddiad go iawn',
      incompleteDay: 'Rhaid i’ch dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’ch dyddiad geni gynnwys mis',
      incompleteYear: 'Rhaid i’ch dyddiad geni gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’ch dyddiad geni fod yn y gorffennol',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('address details', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  const commonContentcy = { language: 'cy', userCase: {} } as CommonContent;
  let generatedContent;
  let generatedContentcy;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    generatedContentcy = generateContent(commonContentcy);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.citizenUserFirstNames).toEqual(enContent.citizenUserFirstNames);
    expect(generatedContent.citizenUserLastNames).toEqual(enContent.citizenUserLastNames);
    expect(generatedContent.previousName).toEqual(enContent.previousName);
    expect(generatedContent.citizenUserPlaceOfBirth).toEqual(enContent.citizenUserPlaceOfBirth);
    expect(generatedContent.citizenUserDateOfBirth).toEqual(enContent.citizenUserDateOfBirth);
    expect(generatedContent.hintDateOfBirth).toEqual(enContent.hintDateOfBirth);
    expect(generatedContent.continue).toEqual(enContent.continue);
    expect(generatedContent.errors.citizenUserFirstNames.required).toEqual(
      enContent.errors.citizenUserFirstNames.required
    );
    expect(generatedContent.errors.citizenUserLastNames.required).toEqual(
      enContent.errors.citizenUserLastNames.required
    );
    expect(generatedContent.errors.citizenUserPlaceOfBirth.required).toEqual(
      enContent.errors.citizenUserPlaceOfBirth.required
    );
    expect(generatedContent.errors.citizenUserDateOfBirth.invalidDate).toEqual(
      enContent.errors.citizenUserDateOfBirth.invalidDate
    );
    expect(generatedContent.errors.citizenUserDateOfBirth.incompleteDay).toEqual(
      enContent.errors.citizenUserDateOfBirth.incompleteDay
    );
    expect(generatedContent.errors.citizenUserDateOfBirth.incompleteMonth).toEqual(
      enContent.errors.citizenUserDateOfBirth.incompleteMonth
    );
    expect(generatedContent.errors.citizenUserDateOfBirth.incompleteYear).toEqual(
      enContent.errors.citizenUserDateOfBirth.incompleteYear
    );
    expect(generatedContent.errors.citizenUserDateOfBirth.invalidDateInFuture).toEqual(
      enContent.errors.citizenUserDateOfBirth.invalidDateInFuture
    );
  });

  test('should return correct welsh content', () => {
    expect(generatedContentcy.title).toEqual(cyContent.title);
    expect(generatedContentcy.citizenUserFirstNames).toEqual(cyContent.citizenUserFirstNames);
    expect(generatedContentcy.citizenUserLastNames).toEqual(cyContent.citizenUserLastNames);
    expect(generatedContentcy.previousName).toEqual(cyContent.previousName);
    expect(generatedContentcy.citizenUserPlaceOfBirth).toEqual(cyContent.citizenUserPlaceOfBirth);
    expect(generatedContentcy.citizenUserDateOfBirth).toEqual(cyContent.citizenUserDateOfBirth);
    expect(generatedContentcy.hintDateOfBirth).toEqual(cyContent.hintDateOfBirth);
    expect(generatedContentcy.continue).toEqual(cyContent.continue);
    expect(generatedContentcy.errors.citizenUserFirstNames.required).toEqual(
      cyContent.errors.citizenUserFirstNames.required
    );
    expect(generatedContentcy.errors.citizenUserLastNames.required).toEqual(
      cyContent.errors.citizenUserLastNames.required
    );
    expect(generatedContentcy.errors.citizenUserPlaceOfBirth.required).toEqual(
      cyContent.errors.citizenUserPlaceOfBirth.required
    );
    expect(generatedContentcy.errors.citizenUserDateOfBirth.invalidDate).toEqual(
      cyContent.errors.citizenUserDateOfBirth.invalidDate
    );
    expect(generatedContentcy.errors.citizenUserDateOfBirth.incompleteDay).toEqual(
      cyContent.errors.citizenUserDateOfBirth.incompleteDay
    );
    expect(generatedContentcy.errors.citizenUserDateOfBirth.incompleteMonth).toEqual(
      cyContent.errors.citizenUserDateOfBirth.incompleteMonth
    );
    expect(generatedContentcy.errors.citizenUserDateOfBirth.incompleteYear).toEqual(
      cyContent.errors.citizenUserDateOfBirth.incompleteYear
    );
    expect(generatedContentcy.errors.citizenUserDateOfBirth.invalidDateInFuture).toEqual(
      cyContent.errors.citizenUserDateOfBirth.invalidDateInFuture
    );
  });

  test('should return correct english content using language assertions', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content using language assertions', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const citizenUserFirstNamesField = fields.citizenUserFirstNames as FormOptions;

    expect(citizenUserFirstNamesField.type).toBe('text');
    expect(citizenUserFirstNamesField.classes).toBe('govuk-input--width-20');
    expect((citizenUserFirstNamesField.label as Function)(generatedContent)).toBe(enContent.citizenUserFirstNames);
    (citizenUserFirstNamesField.validator as Validator)('test value');

    const citizenUserLastNamesField = fields.citizenUserLastNames as FormOptions;
    expect(citizenUserLastNamesField.type).toBe('text');
    expect(citizenUserLastNamesField.classes).toBe('govuk-input--width-20');
    expect((citizenUserLastNamesField.label as Function)(generatedContent)).toBe(enContent.citizenUserLastNames);
    (citizenUserLastNamesField.validator as Validator)('test value');

    const citizenUserAdditionalNameField = fields.citizenUserAdditionalName as FormOptions;
    expect(citizenUserAdditionalNameField.type).toBe('text');
    expect(citizenUserAdditionalNameField.classes).toBe('govuk-input--width-20');
    expect((citizenUserAdditionalNameField.label as Function)(generatedContent)).toBe(enContent.previousName);
    (citizenUserAdditionalNameField.validator as Validator)('test value');

    const citizenUserPlaceOfBirthField = fields.citizenUserPlaceOfBirth as FormOptions;
    expect(citizenUserPlaceOfBirthField.type).toBe('text');
    expect(citizenUserPlaceOfBirthField.classes).toBe('govuk-input--width-20');
    expect((citizenUserPlaceOfBirthField.label as Function)(generatedContent)).toBe(enContent.citizenUserPlaceOfBirth);
    (citizenUserPlaceOfBirthField.validator as Validator)('test value');

    const citizenUserDateOfBirthField = fields.citizenUserDateOfBirth as FormOptions;
    expect(citizenUserDateOfBirthField.type).toBe('date');
    expect(citizenUserDateOfBirthField.classes).toBe('govuk-date-input');
    expect((citizenUserDateOfBirthField.label as Function)(generatedContent)).toBe(enContent.citizenUserDateOfBirth);
    expect((citizenUserDateOfBirthField.hint as Function)(generatedContent)).toBe(enContent.hintDateOfBirth);
    (citizenUserDateOfBirthField.validator as Validator)('test value');

    expect(citizenUserDateOfBirthField.values[0].name).toBe('day');
    expect(
      (citizenUserDateOfBirthField.values[0].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Day');
    expect(citizenUserDateOfBirthField.values[0].classes).toBe('govuk-input--width-2');

    expect(citizenUserDateOfBirthField.values[1].name).toBe('month');
    expect(
      (citizenUserDateOfBirthField.values[1].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Month');
    expect(citizenUserDateOfBirthField.values[1].classes).toBe('govuk-input--width-2');

    expect(citizenUserDateOfBirthField.values[2].name).toBe('year');
    expect(
      (citizenUserDateOfBirthField.values[2].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Year');
    expect(citizenUserDateOfBirthField.values[2].classes).toBe('govuk-input--width-4');
    (citizenUserDateOfBirthField.validator as Validator)('test value');
    expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');
  });
});
