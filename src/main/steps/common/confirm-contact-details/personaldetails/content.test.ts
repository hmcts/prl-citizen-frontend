//import { FormContent , FormFields , FormOptions } from "../../../../app/form/Form";

import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
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
    },
    citizenUserLastNames: {
      required: 'Enter Your last name',
    },
    citizenUserPlaceOfBirth: {
      required: 'Enter Your Place of birth',
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
  citizenUserLastNames: 'Eich enw olaf',
  previousName: 'Enw(au) blaenorol, os o gwbl (dewisol)',
  citizenUserPlaceOfBirth: 'Man geni',
  citizenUserDateOfBirth: 'Eich dyddiad geni',
  hintDateOfBirth: 'Er enghraifft - 31 3 1980',
  continue: 'Continue',
  errors: {
    citizenUserFirstNames: {
      required: 'Rhowch Eich enw cyntaf',
    },
    citizenUserLastNames: {
      required: 'Rhowch Eich Enw Diwethaf',
    },
    citizenUserPlaceOfBirth: {
      required: 'Rhowch Eich Man Geni',
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

  // test('should contain citizenUserAddressPostcode field', () => {
  //   const form = generatedContent.form as FormContent;
  //   const fields = form.fields as FormFields;
  //   const addressPostcodeField = fields.citizenUserAddressPostcode as FormOptions;

  //   expect(addressPostcodeField.type).toBe('text');
  //   expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
  //   expect((addressPostcodeField.label as Function)(generatedContent)).toBe(enContent.citizenUserAddressPostcode);
  //   expect(addressPostcodeField.labelSize).toBe('m');
  //   expect(addressPostcodeField.attributes!.maxLength).toBe(14);
  //   expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
  //   expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');
  // });

  // test('should contain citizenUserAddressPostcode field with welsh', () => {
  //   const form = generatedContent.form as FormContent;
  //   const fields = form.fields as FormFields;
  //   const addressPostcodeField = fields.citizenUserAddressPostcode as FormOptions;

  //   expect(addressPostcodeField.type).toBe('text');
  //   expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
  //   expect((addressPostcodeField.label as Function)(generatedContentcy)).toBe(cyContent.citizenUserAddressPostcode);
  //   expect(addressPostcodeField.labelSize).toBe('m');
  //   expect(addressPostcodeField.attributes!.maxLength).toBe(14);
  //   expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
  //   expect((form.submit?.text as Function)(generatedContentcy)).toBe('Continue (in welsh)');
  // });
});
