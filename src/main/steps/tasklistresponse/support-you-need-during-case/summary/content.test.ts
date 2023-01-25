import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../common/common.content';

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
  },
  dependencies: {
    hearingDetails: {
      dependentOn: 'attendingToCourt',
      value: 'no hearings',
      display: true,
    },
    languageDetails: {
      dependentOn: 'languageRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    safetyArrangementsDetails: {
      dependentOn: 'safetyArrangements',
      value: 'other',
      display: true,
    },
    docsDetails: {
      dependentOn: 'docsSupport',
      value: 'Documents in colour print',
      display: true,
    },
    largePrintDetails: {
      dependentOn: 'docsSupport',
      value: 'Large print documents',
      display: true,
    },
    otherDetails: {
      dependentOn: 'docsSupport',
      value: 'other',
      display: true,
    },
    describeSignLanguageDetails: {
      dependentOn: 'helpCommunication',
      value: 'sign language interpreter',
      display: true,
    },
    describeOtherNeed: {
      dependentOn: 'helpCommunication',
      value: 'Other',
      display: true,
    },
    supportWorkerDetails: {
      dependentOn: 'courtHearing',
      value: 'support worker or carer',
      display: true,
    },
    familyProviderDetails: {
      dependentOn: 'courtHearing',
      value: 'friend or family member',
      display: true,
    },
    therapyDetails: {
      dependentOn: 'courtHearing',
      value: 'animal',
      display: true,
    },
    communicationSupportOther: {
      dependentOn: 'courtHearing',
      value: 'other',
      display: true,
    },
    lightingProvideDetails: {
      dependentOn: 'courtComfort',
      value: 'appropriate lighting',
      display: true,
    },
    otherProvideDetails: {
      dependentOn: 'courtComfort',
      value: 'Other',
      display: true,
    },
    parkingDetails: {
      dependentOn: 'travellingToCourt',
      value: 'parking space close to the venue',
      display: true,
    },
    differentChairDetails: {
      dependentOn: 'travellingToCourt',
      value: 'a different type of chair',
      display: true,
    },
    travellingOtherDetails: {
      dependentOn: 'travellingToCourt',
      value: 'Other',
      display: true,
    },
  },
  errors: {},
};

const cy: typeof en = {
  section: 'Check your answers ',
  title: 'Your hearing needs and requirments',
  sectionTitles: {
    aboutYou: 'Amdanoch chi',
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
  },
  dependencies: {
    hearingDetails: {
      dependentOn: 'attendingToCourt',
      value: 'no hearings',
      display: true,
    },
    languageDetails: {
      dependentOn: 'languageRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    safetyArrangementsDetails: {
      dependentOn: 'safetyArrangements',
      value: 'other',
      display: true,
    },
    docsDetails: {
      dependentOn: 'docsSupport',
      value: 'Documents in colour print',
      display: true,
    },
    largePrintDetails: {
      dependentOn: 'docsSupport',
      value: 'Large print documents',
      display: true,
    },
    otherDetails: {
      dependentOn: 'docsSupport',
      value: 'other',
      display: true,
    },
    describeSignLanguageDetails: {
      dependentOn: 'helpCommunication',
      value: 'sign language interpreter',
      display: true,
    },
    describeOtherNeed: {
      dependentOn: 'helpCommunication',
      value: 'Other',
      display: true,
    },
    supportWorkerDetails: {
      dependentOn: 'courtHearing',
      value: 'support worker or carer',
      display: true,
    },
    familyProviderDetails: {
      dependentOn: 'courtHearing',
      value: 'friend or family member',
      display: true,
    },
    therapyDetails: {
      dependentOn: 'courtHearing',
      value: 'animal',
      display: true,
    },
    communicationSupportOther: {
      dependentOn: 'courtHearing',
      value: 'other',
      display: true,
    },
    lightingProvideDetails: {
      dependentOn: 'courtComfort',
      value: 'appropriate lighting',
      display: true,
    },
    otherProvideDetails: {
      dependentOn: 'courtComfort',
      value: 'Other',
      display: true,
    },
    parkingDetails: {
      dependentOn: 'travellingToCourt',
      value: 'parking space close to the venue',
      display: true,
    },
    differentChairDetails: {
      dependentOn: 'travellingToCourt',
      value: 'a different type of chair',
      display: true,
    },
    travellingOtherDetails: {
      dependentOn: 'travellingToCourt',
      value: 'Other',
      display: true,
    },
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
      reasonableAdjustments: [''],
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
    expect(generatedContent.dependencies.hearingDetails.value).toEqual('no hearings');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});

/* eslint-enable @typescript-eslint/ban-types */
