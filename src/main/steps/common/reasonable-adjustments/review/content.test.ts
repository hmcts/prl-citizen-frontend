import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './content';

const en = {
  section: 'Check your answers ',
  title: 'Your hearing needs and requirments',
  sectionTitles: {
    aboutYou: 'About you',
    supportYouNeed: 'Support you need during your case',
  },
  edit: 'Edit',
  keys: {
    ra_typeOfHearing: 'Would you be able to take part in hearings by video and phone?',
    ra_noVideoAndPhoneHearing_subfield: 'Please provide the details',
    ra_languageNeeds: 'Do you have any language requirements?',
    ra_needInterpreterInCertainLanguage_subfield: 'Please provide language details',
    ra_specialArrangements: 'Do you or the children need special safety arrangements at court?',
    ra_specialArrangementsOther_subfield: 'Please describe your need in detail',
    ra_disabilityRequirements:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    ra_documentInformation: 'I need documents in an alternative format',
    ra_specifiedColorDocuments_subfield: 'Please provide the docs details',
    ra_largePrintDocuments_subfield: 'Please provide the large print details',
    ra_documentHelpOther_subfield: 'Please provide the other details',
    ra_communicationHelp: 'I need help communicating and understanding',
    ra_signLanguageInterpreter_subfield: 'Please provide sign language details',
    ra_communicationHelpOther_subfield: 'Please provide the details',
    ra_supportCourt: 'I need to bring support with me to a court hearing',
    ra_supportWorkerCarer_subfield: 'Please provide support worker details',
    ra_friendFamilyMember_subfield: 'Please provide family member details',
    ra_therapyAnimal_subfield: 'Please provide therapy animal details',
    ra_supportCourtOther_subfield: 'Please provide the details',
    ra_feelComportable: 'I need something to make me feel comfortable during a court hearing',
    ra_appropriateLighting_subfield: 'Please describe appropriate lighting details',
    ra_feelComportableOther_subfield: 'Please describe your need in detail',
    ra_travellingCourt: 'I need help travelling to, or moving around court buildings',
    ra_parkingSpace_subfield: 'Please describe parking space details',
    ra_differentTypeChair_subfield: 'Please describe different chair details',
    ra_travellingCourtOther_subfield: 'Please describe your need in detail',
  },
  errors: {},
};

const cy = {
  section: 'Gwirio eich atebion',
  title: 'Eich anghenion a gofynion o ran clywed',
  sectionTitles: {
    aboutYou: 'Amdanoch chi',
    supportYouNeed: 'Cefnogaeth sydd ei hangen arnoch yn ystod eich achos',
  },
  edit: 'Golygu',
  keys: {
    ra_typeOfHearing: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
    ra_noVideoAndPhoneHearing_subfield: 'Rhowch fanylion',
    ra_languageNeeds: 'A oes gennych chi unrhyw ofynion ieithyddol?',
    ra_needInterpreterInCertainLanguage_subfield: 'Rhowch fanylion eich gofynion ieithyddol',
    ra_specialArrangements: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau diogelwch arbennig?',
    ra_specialArrangementsOther_subfield: 'Disgrifiwch eich anghenion yn fanwl',
    ra_disabilityRequirements:
      'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
    ra_documentInformation: 'Rwyf angen dogfennau mewn fformat amgen',
    ra_specifiedColorDocuments_subfield: 'Rhowch fanylion y dogfennau',
    ra_largePrintDocuments_subfield: 'Rhowch fanylion y print bras',
    ra_documentHelpOther_subfield: 'Rhowch y manylion eraill',
    ra_communicationHelp: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
    ra_signLanguageInterpreter_subfield: 'Rhowch fanylion yr iaith arwyddion',
    ra_communicationHelpOther_subfield: 'Rhowch fanylion',
    ra_supportCourt: 'Byddwn i angen dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad llys',
    ra_supportWorkerCarer_subfield: 'Rhowch fanylion eich gweithiwr cymorth',
    ra_friendFamilyMember_subfield: 'Rhowch fanylion aelod o’ch teulu',
    ra_therapyAnimal_subfield: 'Rhowch fanylion yr anifail therapi',
    ra_supportCourtOther_subfield: 'Rhowch fanylion',
    ra_feelComportable: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
    ra_appropriateLighting_subfield: 'Rhowch fanylion y goleuadau priodol',
    ra_feelComportableOther_subfield: 'Disgrifiwch eich anghenion yn fanwl',
    ra_travellingCourt: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
    ra_parkingSpace_subfield: 'Rhowch fanylion y lle parcio',
    ra_differentTypeChair_subfield: 'Rhowch fanylion y math gwahanol o gadair',
    ra_travellingCourtOther_subfield: 'Disgrifiwch eich anghenion yn fanwl',
  },
  errors: {},
};

describe('RA > review > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/reasonable-adjustments/guidance',
        session: {
          userCase: {
            ra_disabilityRequirements: ['docsformat', 'commhelp', 'hearingsupport', 'hearingcomfort', 'travellinghelp'],
          },
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});
