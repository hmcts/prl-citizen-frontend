import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './address-lookup';

jest.mock('../../../../../app/form/validation');

const en = {
  postcode: 'Current postcode',
  enterAddressManually: 'I live outside the UK',
  manualAddressUrl: '#',
};

const cy = {
  postcode: 'Current postcode - welsh',
  enterAddressManually: 'I live outside the UK - welsh',
  manualAddressUrl: '#',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > address-lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

});
