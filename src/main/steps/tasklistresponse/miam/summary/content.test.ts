import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

// eslint-disable-next-line jest/no-export
export const enContent = {
  section: 'Check your answers',
  title: 'Mediation Information and Assessment Meeting (MIAM) attendance',
  sectionTitles: {
    MIAMDetails: '',
  },
  keys: {
    miamStart: 'Have you attended a MIAM?',
    miamWillingness: 'Would you be willing to attend a MIAM?',
    miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM?',
  },
};

const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: 'Presenoldeb mewn Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
  sectionTitles: {
    MIAMDetails: '',
  },
  keys: {
    miamStart: 'Ydych chi wedi mynychu MIAM?',
    miamWillingness: "A fyddech chi'n fodlon mynychu MIAM?",
    miamNotWillingExplnation: "Esboniwch pam nad ydych chi'n fodlon mynychu MIAM?",
  },
};

describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  beforeEach(() => {
    commonContent.userCase = {
      ...mockUserCase,
      miamStart: 'No',
      miamWillingness: 'No',
      miamNotWillingExplnation: 'No explain',
    };
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english data content1', () => {
    expect(generatedContent.title).toEqual('Mediation Information and Assessment Meeting (MIAM) attendance');
    expect(generatedContent.section).toEqual('Check your answers');
  });
  test('should return correct english data content2', () => {
    commonContent.userCase = {
      ...mockUserCase,
      miamStart: 'No',
      miamWillingness: 'Yes',
    };
    generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual('Mediation Information and Assessment Meeting (MIAM) attendance');
    expect(generatedContent.section).toEqual('Check your answers');
  });
  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
