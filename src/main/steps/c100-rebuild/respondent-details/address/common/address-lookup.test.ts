import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './address-lookup';

jest.mock('../../../../../app/form/validation');

const en = {
  subTitle: 'Documents relating to this application will be sent here.',
  postcode: 'Current postcode',
  enterAddressManually: "I don't know their postcode or they live outside the UK",
  manualAddressUrl: '#',
};

const cy = {
  subTitle: 'Documents relating to this application will be sent here. - welsh',
  postcode: 'Current postcode - welsh',
  enterAddressManually: "I don't know their postcode or they live outside the UK - welsh",
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
