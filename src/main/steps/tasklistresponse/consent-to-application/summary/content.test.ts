import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

// eslint-disable-next-line jest/no-export
export const enContent = {
  section: 'Check your answers',
  title: 'Your consent to the application',
  sectionTitles: {
    consentDetails: '',
  },
  keys: {
    doYouConsent: 'Do you provide your consent to the application?',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Is the applicant required to seek permission from the court before making applications?',
  },
};

const cyContent: typeof enContent = {
  section: 'Check your answers',
  title: 'Your consent to the application',
  sectionTitles: {
    consentDetails: '',
  },
  keys: {
    doYouConsent: 'Do you provide your consent to the application?',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Is the applicant required to seek permission from the court before making applications?',
  },
};

describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  commonContent.userCase = mockUserCase;
  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });
  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.keys).toEqual(enContent.keys);
  });

  test('should return correct welsh content', () => {
    const commonConten = { language: 'cy' } as CommonContent;
    commonConten.userCase = mockUserCase;
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.keys).toEqual(cyContent.keys);
  });
});
