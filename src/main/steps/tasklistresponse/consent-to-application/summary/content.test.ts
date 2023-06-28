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
    reasonForNotConsenting: 'Give your reasons for not consenting to the application.',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Is the applicant required to seek permission from the court before making applications?',
    courtOrderDetails: 'Provide details of the court order in place.',
  },
};

const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: 'Cydsynio i’r cais',
  sectionTitles: {
    consentDetails: '',
  },
  keys: {
    doYouConsent: 'A ydych chi’n cydsynio i’r cais?',
    reasonForNotConsenting: 'Give your reasons for not consenting to the application. (welsh)',
    applicationReceivedDate: "Pryd gawsoch chi'r cais?",
    courtPermission: "A oes angen i'r ceisydd ofyn am ganiatâd gan y llys cyn gwneud ceisiadau?",
    courtOrderDetails: 'Provide details of the court order in place. (welsh)',
  },
};

describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  commonContent.userCase = mockUserCase;
  let generatedContent;

  test('should return correct english content', () => {
    generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.keys).toEqual(enContent.keys);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({
      ...commonContent,
      language: 'cy',
    });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.keys).toEqual(cyContent.keys);
  });
});
