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
  postcode: 'Cod post cyfredol',
  enterAddressManually: 'Rwy’n byw y tu allan i’r DU',
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
