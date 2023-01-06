import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Check your answers',
  title: 'Your hearing needs and requirements',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    communicationSupportOther: 'Describe what you need',
    courtComfort: 'I need something to make me feel comfortable during a court hearing',
    courtHearing: 'I would need to bring support with me to a court hearing',
    courtProceedingProvideDetails: 'Provie details',
    describeOtherNeed: 'Describe what you need',
    docsSupport: 'I need documents in an alternative format',
    helpCommunication: 'I need help communicating and understanding',
    languageDetails: 'Give details of the language you require (including dialect, if applicable)',
    languageRequirements: 'Do you have any language requirements?',
    otherDetails: 'Describe what you need',
    otherProvideDetails: 'Describe what you need',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    safetyArrangements: 'Do you or the children need special safety arrangements at court?',
    safetyArrangementsDetails: 'Describe what you need',
    travellingOtherDetails: 'Describe what you need',
    travellingToCourt: 'I need help travelling to, or moving around court buildings',
    unableForCourtProceedings: 'I need something to make me feel comfortable during a court hearing',
  },
  dependencies: {
    languageDetails: {
      dependantOn: 'languageRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    otherDetails: {
      dependantOn: 'docsSupport',
      value: 'other',
      display: true,
    },
    describeOtherNeed: {
      dependantOn: 'helpCommunication',
      value: 'Other',
      display: true,
    },
    communicationSupportOther: {
      dependantOn: 'courtHearing',
      value: 'other',
      display: true,
    },
    otherProvideDetails: {
      dependantOn: 'courtComfort',
      value: 'other',
      display: true,
    },
    travellingOtherDetails: {
      dependantOn: 'unableForCourtProceedings',
      value: 'Yes',
      display: true,
    },
    safetyArrangementsDetails: {
      dependantOn: 'safetyArrangements',
      value: 'other',
      display: true,
    },
  },
  errors: {},
};

const cy: typeof en = {
  section: 'Check your answers',
  title: 'Your hearing needs and requirements',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    communicationSupportOther: 'Describe what you need',
    courtComfort: 'I need something to make me feel comfortable during a court hearing',
    courtHearing: 'I would need to bring support with me to a court hearing',
    courtProceedingProvideDetails: 'Provie details',
    describeOtherNeed: 'Describe what you need',
    docsSupport: 'I need documents in an alternative format',
    helpCommunication: 'I need help communicating and understanding',
    languageDetails: 'Give details of the language you require (including dialect, if applicable)',
    languageRequirements: 'Do you have any language requirements?',
    otherDetails: 'Describe what you need',
    otherProvideDetails: 'Describe what you need',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    safetyArrangements: 'Do you or the children need special safety arrangements at court?',
    safetyArrangementsDetails: 'Describe what you need',
    travellingOtherDetails: 'Describe what you need',
    travellingToCourt: 'I need help travelling to, or moving around court buildings',
    unableForCourtProceedings: 'I need something to make me feel comfortable during a court hearing',
  },
  dependencies: {
    languageDetails: {
      dependantOn: 'languageRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    otherDetails: {
      dependantOn: 'docsSupport',
      value: 'other',
      display: true,
    },
    describeOtherNeed: {
      dependantOn: 'helpCommunication',
      value: 'Other',
      display: true,
    },
    communicationSupportOther: {
      dependantOn: 'courtHearing',
      value: 'other',
      display: true,
    },
    otherProvideDetails: {
      dependantOn: 'courtComfort',
      value: 'other',
      display: true,
    },
    travellingOtherDetails: {
      dependantOn: 'unableForCourtProceedings',
      value: 'Yes',
      display: true,
    },
    safetyArrangementsDetails: {
      dependantOn: 'safetyArrangements',
      value: 'other',
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
    expect(generatedContent.title).toEqual('Your hearing needs and requirements');
    expect(generatedContent.section).toEqual('Check your answers');
    expect(generatedContent.sectionTitles.aboutYou).toEqual('About you');
    expect(generatedContent.keys.communicationSupportOther).toEqual('Describe what you need');
    expect(generatedContent.dependencies.languageDetails.value).toEqual('I need an interpreter in a certain language');
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
