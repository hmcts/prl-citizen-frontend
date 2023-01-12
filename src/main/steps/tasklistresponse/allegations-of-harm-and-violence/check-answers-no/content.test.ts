import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';
const enContent = {
  section: 'Check your answers',
  title: 'Safety concerns',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    PRL_c1A_haveSafetyConcerns: 'Do you have any concerns for your safety or the safety of the children?',
  },
  errors: {},
};

const cyContent: typeof enContent = {
  section: 'Check your answers',
  title: 'Safety concerns',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    PRL_c1A_haveSafetyConcerns: 'Do you have any concerns for your safety or the safety of the children?',
  },
  errors: {},
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('your or child safety concerns > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
