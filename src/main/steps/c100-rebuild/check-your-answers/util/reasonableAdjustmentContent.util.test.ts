/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReasonableAdjustmentElement } from './reasonableAdjustmentContent.util';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
const TestReasonableAdjustmentElement = language => {
  const opContents = {
    en: () => {
      return {
        attendingCourtHeading: 'Would you be able to take part in hearings by video and phone?',
        caption: 'Reasonable adjustments',
        disabilityRequirementHeading:
          'If attending the court, do you or any of the parties involved have a disability for which you require special assistance or special facilities?',
        headingTitle:
          'If attending the court, do you or any of the parties involved have a disability for which you require special assistance or special facilities?',
        intermediaryRequired: 'Give details in the box below.',
        intermediaryRequirementsHeading: 'Are you aware of whether an intermediary will be required?',
        langaugeRequirementHeading: 'Do you have any language requirements?',
        line1:
          'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
        line2: 'by video (where you can join from a place suitable to you)',
        line3: 'by phone',
        needInterpreterInCertainLanguage: 'I need an interpreter in a certain language',
        needInterpreterInCertainLanguage_subfield:
          'Give details of the language you require (including dialect, if applicable)',
        no: 'No',
        noLanguageRequirements: 'No, I do not have any language requirements at this time',
        noSafetyRequirements: 'No, I do not have any safety requirements at this time',
        noVideoAndPhoneHearing: 'No, I cannot take part in either video or phone hearings',
        noVideoAndPhoneHearingReason: 'If you choose this option please tell us why in case we can assist you',
        noVideoAndPhoneHearing_subfield: 'Explain why you are unable to take part in video or phone hearings',
        paragraph1: 'If your case goes to a hearing, it can take place either:',
        paragraph2: 'Some hearings use a combination of these methods. The approach taken will be decided by a judge.',
        phoneHearing: 'Yes, I can take part in phone hearings',
        readAndWriteInWelsh: 'I want to read and write in Welsh',
        screenWithOtherPeople:
          'to be shielded by a privacy screen in the courtroom (a privacy screen would mean the respondent would not be able to see you while in the courtroom).',
        select_all_apply: 'Select all that apply to you',
        separateExitEntrance: 'a separate entrance and exit from the court building',
        separateWaitingRoom: 'a separate waiting room in the court building',
        speakInWelsh: 'I want to speak in Welsh',
        specialArrangementsHeading: 'Do you or the children need special arrangements at court?',
        assistanceRequired: 'Give details in the box below.',
        videoHearing: 'Yes, I can take part in video hearings',
        videoLinks:
          "to join the hearing by video link rather than in person (it is the judge's decision whether to allow a hearing by video link).",
        yes: 'Yes',
        courtGuidanceText: 'Court staff may get in touch with you about the requirements',
        errors: {
          ra_assistanceRequirements_subfield: {
            required:
              "Provide details for 'If attending the court, do you or any of the parties involved have a disability for which you require special assistance or special facilities?'",
            invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
            invalid:
              'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
          },
          ra_assistanceRequirements: {
            required:
              'Select whether any of the parties involved have a disability for which you require special assistance or special facilities',
          },
        },
      };
    },
    cy: () => {
      return {
        attendingCourtHeading: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
        caption: 'Addasiadau rhesymol',
        disabilityRequirementHeading:
          'Os byddwch yn mynychu’r llys, a oes gennych chi neu unrhywun o’r partïon cysylltiedig anabledd y bydd angen cymorth neu gyfleusterau arbennig arnoch ar ei gyfer?',
        headingTitle:
          'Os byddwch yn mynychu’r llys, a oes gennych chi neu unrhywun o’r partïon cysylltiedig anabledd y bydd angen cymorth neu gyfleusterau arbennig arnoch ar ei gyfer?',
        intermediaryRequired: 'Os Oes, nodwch beth yw’r anghenion hynny',
        intermediaryRequirementsHeading: 'A ydych yn gwybod a fydd angen cyfryngwr?',
        langaugeRequirementHeading: 'A oes gennych chi unrhyw ofynion ieithyddol?',
        line1:
          "Efallai y bydd angen trefniadau penodol arnoch chi neu'r plant pan fyddwch chi'n dod i'r llys. Rhaid i rai o’r addasiadau hyn gael eu cymeradwyo gan farnwr neu GLlTEF. Os yw eich anghenion yn newid, gallwch drafod hyn gyda'r llys.",
        line2: "trwy fideo (lle gallwch chi ymuno o leoliad sy'n addas i chi)",
        line3: 'dros y ffôn',
        needInterpreterInCertainLanguage: "Rwy'n dymuno cael cyfieithydd mewn iaith benodol",
        needInterpreterInCertainLanguage_subfield:
          'Rhowch fanylion yr iaith sydd ei hangen arnoch (gan gynnwys tafodiaith, os yn berthnasol)',
        no: 'Nac ydw',
        noLanguageRequirements: 'Nac oes, nid oes gennyf unrhyw ofynion ieithyddol ar hyn o bryd',
        noSafetyRequirements: 'Nac oes, nid oes arnaf angen unrhyw ofynion o ran diogelwch ar hyn o bryd',
        noVideoAndPhoneHearing: 'Ni allaf gymryd rhan mewn gwrandawiad fideo na gwrandawiad dros y ffôn',
        noVideoAndPhoneHearingReason:
          'Os dewiswch yr opsiwn hwn, dywedwch wrthym pam rhag ofn y gallwn eich cynorthwyo',
        noVideoAndPhoneHearing_subfield:
          'Esboniwch pam nad ydych yn gallu cymryd rhan mewn gwrandawiad drwy fideo na gwrandawiad dros y ffôn',
        paragraph1: 'Os bydd eich achos yn mynd i wrandawiad, gellir ei gynnal naill ai:',
        paragraph2:
          "Mae rhai gwrandawiadau yn defnyddio cyfuniad o'r dulliau hyn. Y Barnwr fydd yn penderfynu pa ddull fydd yn cael ei ddefnyddio.",
        phoneHearing: 'Gallaf gymryd rhan mewn gwrandawiad dros y ffôn',
        readAndWriteInWelsh: 'Rwyf eisiau darllen ac ysgrifennu yn Gymraeg',
        screenWithOtherPeople:
          'cael eich cysgodi gan sgrin breifatrwydd yn ystafell y llys (byddai sgrin breifatrwydd yn golygu na fyddai’r atebydd yn gallu eich gweld tra byddech yn yr ystafell llys).',
        select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
        separateExitEntrance: 'mynedfa ac allanfa ar wahân o’r adeilad llys',
        separateWaitingRoom: 'ystafell aros ar wahân yn yr adeilad llys',
        speakInWelsh: 'Rwyf eisiau siarad Cymraeg',
        specialArrangementsHeading: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
        assistanceRequired: 'Os Oes, nodwch beth yw’r anghenion hynny',
        videoHearing: 'Gallaf gymryd rhan mewn gwrandawiad fideo',
        videoLinks:
          'ymuno â’r gwrandawiad drwy gyswllt fideo yn hytrach na bod yno wyneb yn wyneb (penderfyniad y barnwr yw p’un a ddylid caniatáu gwrandawiad drwy gyswllt fideo ai peidio).',
        yes: 'Ydw',
        courtGuidanceText: 'Efallai y bydd staff y llys yn cysylltu â chi ynghylch eich gofynion.',
        errors: {
          ra_assistanceRequirements_subfield: {
            required:
              "Rhowch fanylion 'Os byddwch yn mynychu’r llys, a oes gennych chi neu unrhywun o’r partïon cysylltiedig anabledd y bydd angen cymorth neu gyfleusterau arbennig arnoch ar ei gyfer?'",
            invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
            invalid:
              'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
          },
          ra_assistanceRequirements: {
            required:
              "Dewiswch a oes gan unrhyw un o'r partïon dan sylw anabledd y mae angen cymorth arbennig neu gyfleusterau arbennig arnynt",
          },
        },
      };
    },
  };
  return language === 'en' ? opContents.en() : opContents.cy();
};

describe('test cases for otherProceedingsContents', () => {
  test('english contents', () => {
    expect(ReasonableAdjustmentElement('en')).toStrictEqual(TestReasonableAdjustmentElement('en'));
  });
  test('Welsh contents', () => {
    expect(ReasonableAdjustmentElement('cy')).toStrictEqual(TestReasonableAdjustmentElement('cy'));
  });
});
