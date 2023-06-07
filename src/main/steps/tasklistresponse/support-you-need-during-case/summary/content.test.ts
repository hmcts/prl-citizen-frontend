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
  edit: 'Edit',

  keys: {
    attendingToCourt: 'Would you be able to take part in hearings by video and phone?',
    hearingDetails: 'Please provide the details',
    languageRequirements: 'Do you have any language requirements?',
    languageDetails: 'Please provide language details',
    safetyArrangements: 'Do you or the children need special safety arrangements at court?',
    safetyArrangementsDetails: 'Please describe your need in detail',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    docsSupport: 'I need documents in an alternative format',
    docsDetails: 'Please provide the docs details',
    largePrintDetails: 'Please provide the large print details',
    otherDetails: 'Please provide the other details',
    helpCommunication: 'I need help communicating and understanding',
    signLanguageDetails: 'Please provide sign language details',
    describeOtherNeed: 'Please provide the details',
    courtHearing: 'I would need to bring support with me to a court hearing',
    supportWorkerDetails: 'Please provide support worker details',
    familyProviderDetails: 'Please provide family member details',
    therapyDetails: 'Please provide therapy animal details',
    communicationSupportOther: 'Please provide the details',
    courtComfort: 'I need something to make me feel comfortable during a court hearing',
    lightingProvideDetails: 'Please describe appropriate lighting details',
    otherProvideDetails: 'Please describe your need in detail',
    travellingToCourt: 'I need help travelling to, or moving around court buildings',
    parkingDetails: 'Please describe parking space details',
    differentChairDetails: 'Please describe different chair details',
    travellingOtherDetails: 'Please describe your need in detail',
  },
  errors: {},
};

const cy: typeof en = {
  section: 'Gwirio eich atebion',
  title: 'Eich anghenion a gofynion o ran clywed',
  sectionTitles: {
    aboutYou: 'Amdanoch chi',
  },
  edit: 'Edit -welsh',
  keys: {
    attendingToCourt: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
    hearingDetails: 'Rhowch fanylion',
    languageRequirements: 'A oes gennych chi unrhyw ofynion ieithyddol?',
    languageDetails: 'Rhowch fanylion eich gofynion ieithyddol',
    safetyArrangements: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau diogelwch arbennig?',
    safetyArrangementsDetails: 'Disgrifiwch eich anghenion yn fanwl',
    reasonableAdjustments:
      'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
    docsSupport: 'Rwyf angen dogfennau mewn fformat amgen',
    docsDetails: 'Rhowch fanylion y dogfennau',
    largePrintDetails: 'Rhowch fanylion y print bras',
    otherDetails: 'Rhowch y manylion eraill',
    helpCommunication: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
    signLanguageDetails: 'Rhowch fanylion yr iaith arwyddion',
    describeOtherNeed: 'Rhowch fanylion',
    courtHearing: 'Byddwn i angen dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad llys',
    supportWorkerDetails: 'Rhowch fanylion eich gweithiwr cymorth',
    familyProviderDetails: 'Rhowch fanylion aelod o’ch teulu',
    therapyDetails: 'Rhowch fanylion yr anifail therapi',
    communicationSupportOther: 'Rhowch fanylion',
    courtComfort: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
    lightingProvideDetails: 'Rhowch fanylion y goleuadau priodol',
    otherProvideDetails: 'Disgrifiwch eich anghenion yn fanwl',
    travellingToCourt: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
    parkingDetails: 'Rhowch fanylion y lle parcio',
    differentChairDetails: 'Rhowch fanylion y math gwahanol o gadair',
    travellingOtherDetails: 'Disgrifiwch eich anghenion yn fanwl',
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
            attendingToCourt: [''],
            hearingDetails: '',
            languageRequirements: [''],
            languageDetails: '',
            safetyArrangements: [''],
            safetyArrangementsDetails: 'Please describe your need in detail',
            reasonableAdjustments: ['docsformat', 'commhelp', 'hearingsupport', 'hearingcomfort', 'travellinghelp'],
            docsSupport: ['docsprint'],
            docsDetails: 'blue',
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
    expect(generatedContent.title).toEqual('Your hearing needs and requirments');
    expect(generatedContent.section).toEqual('Check your answers ');
    expect(generatedContent.sectionTitles.aboutYou).toEqual('About you');
    expect(generatedContent.keys.attendingToCourt).toEqual(
      'Would you be able to take part in hearings by video and phone?'
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
