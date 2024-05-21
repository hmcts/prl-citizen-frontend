import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, YesOrNo } from '../../../app/case/definition';
import { FormContent, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { cyContent, enContent, generateContent } from './content';

jest.mock('../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    commonContent.userCase = {
      ...mockUserCase,
      attendingToCourt: [''],
      hearingDetails: '',
      languageRequirements: [''],
      languageDetails: '',
      safetyArrangements: [''],
      safetyArrangementsDetails: 'Please describe your need in detail',
      reasonableAdjustments: [''],
      c1A_haveSafetyConcerns: YesOrNo.YES,
      c1A_safetyConernAbout: [C1ASafteyConcernsAbout.CHILDREN],
      c1A_concernAboutChild: [C1AAbuseTypes.PHYSICAL_ABUSE, C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE],
    };
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent | undefined;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Please review your answers before you complete your response.');
    expect(generatedContent.section).toEqual('Check your answers');
    expect(generatedContent).not.toEqual('');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
  test('should return correct english content respondent abuse only', () => {
    const commonContent1 = { language: 'en' } as CommonContent;
    commonContent1.userCase = {
      ...mockUserCase,
      attendingToCourt: [''],
      hearingDetails: '',
      languageRequirements: [''],
      languageDetails: '',
      safetyArrangements: [''],
      safetyArrangementsDetails: 'Please describe your need in detail',
      reasonableAdjustments: [''],
      c1A_haveSafetyConcerns: YesOrNo.YES,
      c1A_safetyConernAbout: [C1ASafteyConcernsAbout.RESPONDENT],
    };
    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.title).toEqual('Please review your answers before you complete your response.');
    expect(generatedContent1.section).toEqual('Check your answers');
    expect(generatedContent1).not.toEqual('');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
