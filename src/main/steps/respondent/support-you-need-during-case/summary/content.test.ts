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
    respondentAttendingToCourt: 'Would you be able to take part in hearings by video and phone?',
    respondentHearingDetails: 'Please provide the details',
    respondentLangRequirements: 'Do you have any language requirements?',
    respondentLangDetails: 'Please provide language details',
    respondentSpecialArrangements: 'Do you or the children need special safety arrangements at court?',
    respondentSpecialArrangementsDetails: 'Please describe your need in detail',
    respondentReasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  },
  dependencies: {
    respondentHearingDetails: {
      dependentOn: 'respondentAttendingToCourt',
      value: 'no hearings',
      display: true,
    },
    respondentLangDetails: {
      dependentOn: 'respondentLangRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    respondentSpecialArrangementsDetails: {
      dependentOn: 'respondentSpecialArrangements',
      value: 'other',
      display: true,
    },
    respondentDocsDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'Documents in colour print',
      display: true,
    },
    respondentLargePrintDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'Large print documents',
      display: true,
    },
    respondentOtherDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'other',
      display: true,
    },
    respondentSignLanguageDetails: {
      dependentOn: 'respondentHelpCommunication',
      value: 'sign language interpreter',
      display: true,
    },
    respondentDescribeOtherNeed: {
      dependentOn: 'respondentHelpCommunication',
      value: 'Other',
      display: true,
    },
    respondentSupportWorkerDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'support worker or carer',
      display: true,
    },
    respondentFamilyDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'friend or family member',
      display: true,
    },
    respondentTherapyDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'animal',
      display: true,
    },
    respondentCommSupportOther: {
      dependentOn: 'respondentCourtHearing',
      value: 'other',
      display: true,
    },
    respondentLightingDetails: {
      dependentOn: 'respondentCourtComfort',
      value: 'appropriate lighting',
      display: true,
    },
    respondentOtherProvideDetails: {
      dependentOn: 'respondentCourtComfort',
      value: 'Other',
      display: true,
    },
    respondentParkingDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'parking space close to the venue',
      display: true,
    },
    respondentDifferentChairDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'a different type of chair',
      display: true,
    },
    respondentTravellingOtherDetails: {
      dependentOn: 'respondentTravellingToCourt',
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
    aboutYou: 'About you',
  },
  keys: {
    respondentAttendingToCourt: 'Would you be able to take part in hearings by video and phone?',
    respondentHearingDetails: 'Please provide the details',
    respondentLangRequirements: 'Do you have any language requirements?',
    respondentLangDetails: 'Please provide language details',
    respondentSpecialArrangements: 'Do you or the children need special safety arrangements at court?',
    respondentSpecialArrangementsDetails: 'Please describe your need in detail',
    respondentReasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  },
  dependencies: {
    respondentHearingDetails: {
      dependentOn: 'respondentAttendingToCourt',
      value: 'no hearings',
      display: true,
    },
    respondentLangDetails: {
      dependentOn: 'respondentLangRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    respondentSpecialArrangementsDetails: {
      dependentOn: 'respondentSpecialArrangements',
      value: 'other',
      display: true,
    },
    respondentDocsDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'Documents in colour print',
      display: true,
    },
    respondentLargePrintDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'Large print documents',
      display: true,
    },
    respondentOtherDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'other',
      display: true,
    },
    respondentSignLanguageDetails: {
      dependentOn: 'respondentHelpCommunication',
      value: 'sign language interpreter',
      display: true,
    },
    respondentDescribeOtherNeed: {
      dependentOn: 'respondentHelpCommunication',
      value: 'Other',
      display: true,
    },
    respondentSupportWorkerDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'support worker or carer',
      display: true,
    },
    respondentFamilyDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'friend or family member',
      display: true,
    },
    respondentTherapyDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'animal',
      display: true,
    },
    respondentCommSupportOther: {
      dependentOn: 'respondentCourtHearing',
      value: 'other',
      display: true,
    },
    respondentLightingDetails: {
      dependentOn: 'respondentCourtComfort',
      value: 'appropriate lighting',
      display: true,
    },
    respondentOtherProvideDetails: {
      dependentOn: 'respondentCourtComfort',
      value: 'Other',
      display: true,
    },
    respondentParkingDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'parking space close to the venue',
      display: true,
    },
    respondentDifferentChairDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'a different type of chair',
      display: true,
    },
    respondentTravellingOtherDetails: {
      dependentOn: 'respondentTravellingToCourt',
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
    commonContent.userCase = mockUserCase;
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Your hearing needs and requirments');
    expect(generatedContent.section).toEqual('Check your answers ');
    expect(generatedContent.sectionTitles.aboutYou).toEqual('About you');
    expect(generatedContent.keys.respondentAttendingToCourt).toEqual(
      'Would you be able to take part in hearings by video and phone?'
    );
    expect(generatedContent.dependencies.respondentHearingDetails.value).toEqual('no hearings');
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
