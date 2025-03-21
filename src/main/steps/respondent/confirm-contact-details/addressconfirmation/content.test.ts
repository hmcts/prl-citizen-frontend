import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const name = 'test name';

const en = {
  title: `Confirm address details for ${name}`,
  citizenUserAddress1: 'Building',
  citizenUserAddressTown: 'Town or city',
  citizenUserAddressCounty: 'County',
  citizenUserAddressPostcode: 'Postcode',
  errors: {
    citizenUserAddress1: {
      required: 'Enter the first line of the address',
    },
    citizenUserAddressTown: {
      required: 'Enter the town or city',
    },
    citizenUserAddressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('address confirmation > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {
      citizenUserFullName: name,
    },
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });
});
