import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Check your answers',
  title: ' ',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    whowasserved: 'who was served?',
    servedDate: 'When were they served?',
  },
  errors: {},
};

const cy: typeof en = {
  section: 'Gwirio eich atebion',
  title: ' ',
  sectionTitles: {
    aboutYou: 'Amdanoch chi',
  },

  keys: {
    whowasserved: 'who was served?',
    servedDate: 'When were they served?',
  },
  errors: {},
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  beforeEach(() => {
    commonContent.additionalData = {
      req: {
        session: {
          userCase: {
            ...mockUserCase,
            helpCommunication: [''],
            courtComfort: [''],
            courtHearing: [''],
            docsSupport: [''],
            attendingToCourt: [''],
            languageRequirements: [''],
            safetyArrangements: [''],
            reasonableAdjustments: [''],
            travellingToCourt: [''],
            communicationSupportOther: '',
            describeOtherNeed: '',
            languageDetails: '',
            otherDetails: '',
            otherProvideDetails: '',
            safetyArrangementsDetails: '',
            travellingOtherDetails: '',
          },
          user: {
            id: '1234',
          },
        },
      },
    };
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Your hearing needs and requirements');
    expect(generatedContent.section).toEqual('Check your answers');
    expect(generatedContent.sectionTitles.aboutYou).toEqual('About you');
    expect(generatedContent.keys.languageDetails).toEqual(
      'Give details of the language you require (including dialect, if applicable)'
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Submit button', () => {
    const form = generatedContent.form as FormContent;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
