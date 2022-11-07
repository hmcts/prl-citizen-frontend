import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
    title: 'Your address',
    citizenUserAddressText: 'address',
    continue: 'Save and continue',
    editAddress: 'Edit Address',
    errors: {},
  };
  
  describe('address confirmation > content', () => {
    const commonContent = generatePageContent({
      language: 'en',
      userCase: {},
    }) as CommonContent;
  
    test('should return correct english content', () => {
      languageAssertions('en', en, () => generateContent(commonContent));
    });
  });