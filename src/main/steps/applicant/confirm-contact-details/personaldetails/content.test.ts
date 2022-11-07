import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
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

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('contact details > content', () => {
    const commonContent = generatePageContent({
      language: 'en',
      userCase: {},
    }) as CommonContent;
  
    test('should return correct english content', () => {
      languageAssertions('en', en, () => generateContent(commonContent));
    });
  });