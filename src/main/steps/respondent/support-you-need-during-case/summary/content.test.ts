import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Check your answers ',
  title: 'Your hearing needs and requirments',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    attendingToCourt: 'Would you be able to take part in hearings by video and phone?',
    hearingDetails: 'Please provide the details',
    languageRequirements: 'Do you have any language requirements?',
    languageDetails: 'Please provide language details',
    safetyArrangements: 'Do you or the children need special safety arrangements at court?',
    safetyArrangementsDetails: 'Please describe your need in detail',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    docsDetails: 'Please provide the docs details',
    docsSupport: 'I need documents in an alternative format',
    largePrintDetails: 'Please provide the large print details',
    otherDetails: 'Please provide the other details',
    communicationSupportOther: 'Please provide the details',
    courtComfort: 'I need something to make me feel comfortable during a court hearing',
    courtHearing: 'I would need to bring support with me to a court hearing',
    describeOtherNeed: 'Please provide the details',
    describeSignLanguageDetails: 'Please provide sign language details',
    differentChairDetails: 'Please describe different chair details',
    familyProviderDetails: 'Please provide family member details',
    helpCommunication: 'I need help communicating and understanding',
    lightingProvideDetails: 'Please describe appropriate lighting details',
    otherProvideDetails: 'Please describe your need in detail',
    parkingDetails: 'Please describe parking space details',
    supportWorkerDetails: 'Please provide support worker details',
    therapyDetails: 'Please provide therapy animal details',
    travellingOtherDetails: 'Please describe your need in detail',
    travellingToCourt: 'I need help travelling to, or moving around court buildings',
  },

  errors: {},
};

const cy: typeof en = {
  section: 'Check your answers -welsh',
  title: 'Your hearing needs and requirments -welsh',
  sectionTitles: {
    aboutYou: 'About you -welsh',
  },
  keys: {
    attendingToCourt: 'Would you be able to take part in hearings by video and phone? -welsh',
    hearingDetails: 'Please provide the details -welsh',
    languageRequirements: 'Do you have any language requirements? -welsh',
    languageDetails: 'Please provide language details -welsh',
    safetyArrangements: 'Do you or the children need special safety arrangements at court? -welsh',
    safetyArrangementsDetails: 'Please describe your need in detail -welsh',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case? -welsh',
    docsDetails: 'Please provide the docs details -welsh',
    docsSupport: 'I need documents in an alternative format -welsh',
    largePrintDetails: 'Please provide the large print details -welsh',
    otherDetails: 'Please provide the other details -welsh',
    communicationSupportOther: 'Please provide the details -welsh',
    courtComfort: 'I need something to make me feel comfortable during a court hearing -welsh',
    courtHearing: 'I would need to bring support with me to a court hearing -welsh',
    describeOtherNeed: 'Please provide the details -welsh',
    describeSignLanguageDetails: 'Please provide sign language details -welsh',
    differentChairDetails: 'Please describe different chair details -welsh',
    familyProviderDetails: 'Please provide family member details -welsh',
    helpCommunication: 'I need help communicating and understanding -welsh',
    lightingProvideDetails: 'Please describe appropriate lighting details -welsh',
    otherProvideDetails: 'Please describe your need in detail -welsh',
    parkingDetails: 'Please describe parking space details -welsh',
    supportWorkerDetails: 'Please provide support worker details -welsh',
    therapyDetails: 'Please provide therapy animal details -welsh',
    travellingOtherDetails: 'Please describe your need in detail -welsh',
    travellingToCourt: 'I need help travelling to, or moving around court buildings -welsh',
  },
  errors: {},
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  beforeEach(() => {
    commonContent.userCase = {
      ...mockUserCase,
      attendingToCourt: [''],
      hearingDetails: '',
      languageRequirements: [''],
      languageDetails: '',
      safetyArrangements: [''],
      safetyArrangementsDetails: 'Please describe your need in detail',
      reasonableAdjustments: ['docsformat', 'commhelp', 'hearingsupport', 'hearingcomfort', 'travellinghelp'],
      docsSupport: ['docsprint'],
      docsDetails: 'blue',
    };
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Your hearing needs and requirments');
    expect(generatedContent.section).toEqual('Check your answers ');
    expect(generatedContent.sectionTitles.aboutYou).toEqual('About you');
    expect(generatedContent.keys.attendingToCourt).toEqual(
      'Would you be able to take part in hearings by video and phone?'
    );
    expect(generatedContent.keys.docsSupport).toEqual('I need documents in an alternative format');
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
