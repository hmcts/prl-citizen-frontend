import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './address-manual';

jest.mock('../../../../../app/form/validation');

const enContent = {
  addressLine1: 'Building and street',
  addressLine1Hint: 'Court documents may be sent here',
  town: 'Town or city',
  county: 'County',
  country: 'Country',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  explainNoLabel: 'I dont know where they currently live',
};

const cyContent = {
  addressLine1: 'Building and street - welsh',
  addressLine1Hint: 'Court documents may be sent here - welsh',
  town: 'Town or city - welsh',
  county: 'County - welsh',
  country: 'Country - welsh',
  postcode: 'Postcode - welsh',
  enterInternationalAddress: 'Enter an international address - welsh',
  explainNoLabel: 'I dont know where they currently live - welsh',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > manual-address > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
