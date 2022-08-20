import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  pageTitle: 'Provide details for',
  label: 'Date of birth',
  hint: 'For example, 31 3 2016',
  childSexLabel: 'Sex',
  male: 'Male',
  female: 'Female',
  unspecified: 'Unspecified',
  approximateCheckboxLabel: 'I don’t know their date of birth',
  approximateDobLabel: 'Approximate date of birth',
  errors: {
    childDateOfBirth: {
      required: 'Enter the date of birth',
    },
    childDateOfBirthNotValid: {
      required: 'Date of birth is not valid',
    },
    cannotHaveBothApproxAndExact: {
      required: 'Cannot have a date of birth and also "I dont know their date of birth"',
    },
    childDateOfBirthNotValidSubField: {
      required: 'Date of birth is not valid',
    },
    childSex: {
      required: 'Select the sex',
    },
    apDateOfBirth: {
      required: 'Select approximate date of birth',
    },
  },
};

const cy = {
  pageTitle: 'Enter the names of the children - welsh',
  label: 'Date of birth - welsh',
  hint: 'For example, 31 3 2016 - welsh',
  childSexLabel: 'Sex - welsh',
  male: 'Male - welsh',
  female: 'Female - welsh',
  unspecified: 'Unspecified - welsh',
  approximateCheckboxLabel: 'I don’t know their date of birth- welsh',
  approximateDobLabel: 'Approximate date of birth - welsh',
  errors: {
    childDateOfBirth: {
      required: 'Enter the date of birth  - welsh',
    },
    childDateOfBirthNotValid: {
      required: 'Date of birth is not valid - welsh',
    },
    cannotHaveBothApproxAndExact: {
      required: 'Cannot have a date of birth and also "I dont know their date of birth - Welsh"',
    },
    childDateOfBirthNotValidSubField: {
      required: 'Date of birth is not valid - welsh',
    },
    childSex: {
      required: 'Select the sex  - welsh',
    },
    apDateOfBirth: {
      required: 'Select approximate date of birth - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child details > personal-details', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
