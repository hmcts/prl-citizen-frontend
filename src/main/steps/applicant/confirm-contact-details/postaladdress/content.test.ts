import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Postal address',
  addressLine1: 'Building and street',
  addressLine2: 'Address line 2',
  addressLine3: 'Address line 3',
  town: 'Town or city',
  country: 'Country',
  postcode: 'Postcode',
  continue: 'Save and continue',
  errors: {},
};

const cy: typeof en = {
  title: 'Postal address',
  addressLine1: 'Building and street',
  addressLine2: 'Address line 2',
  addressLine3: 'Address line 3',
  town: 'Town or city',
  country: 'Country',
  postcode: 'Postcode',
  continue: 'Save and continue',
  errors: {},
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('address history > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
