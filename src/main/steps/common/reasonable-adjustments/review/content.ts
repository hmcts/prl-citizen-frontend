/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../../app/case/case';
import { PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import {
  GovUkNunjucksSummary,
  SummaryList,
  SummaryListRow,
} from '../../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { applyParms } from '../../../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
  REASONABLE_ADJUSTMENTS_INTERMEDIARY,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
  REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
  REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE,
} from '../../../../steps/urls';
import { CommonContent } from '../../../common/common.content';

export const enContent = {
  title: 'Check your answers to hearing requirements',
  subTitle: 'Your hearing needs and requirements',
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
    ra_intermediaryRequirements: 'Are you aware of whether an intermediary will be required?',
    ra_intermediaryRequired_subfield: 'Give details in the box below.',
    ra_disabilityRequirements:
      'If attending the court, do you or any of the parties involved have a disability for which you require special assistance or special facilities?',
    ra_assistanceRequired_subfield: 'Give details in the box below.',
  },
  errors: {},
};

export const cyContent: typeof enContent = {
  title: 'Gwirio eich atebion ynghylch gofynion gwrandawiad',
  subTitle: 'Eich anghenion a gofynion o ran clywed',
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
    ra_intermediaryRequirements: "Dewiswch p'un a fydd angen cyfryngwr ai peidio",
    ra_intermediaryRequired_subfield: 'Os Oes, nodwch beth yw’r anghenion hynny',
    ra_disabilityRequirements:
      'Os byddwch yn mynychu’r llys, a oes gennych chi neu unrhywun o’r partïon cysylltiedig anabledd y bydd angen cymorth neu gyfleusterau arbennig arnoch ar ei gyfer?',
    ra_assistanceRequired_subfield: 'Os Oes, nodwch beth yw’r anghenion hynny',
  },
  errors: {},
};

const displayText = {
  en: {
    videohearings: 'Yes, I can take part in video hearings',
    phonehearings: 'Yes, I can take part in phone hearings',
    nohearings: 'No, I cannot take part in either video or phone hearings',
    //Travelling
    parkingspace: 'Parking space close to the venue',
    stepfree: 'Step free / wheelchair access',
    wheelchair: 'Use of venue wheelchair',
    toilet: 'Accessible toilet',
    lift: 'Help using a lift',
    differentchair: 'A different type of chair',
    building: 'Guiding in the building',
    other: 'Other',
    //Help Coomunication
    hearingloop: 'Hearing loop (hearing enhancement system)',
    infraredreceiver: 'Infrared receiver (hearing enhancement system)',
    needspeakinghelp: 'Need to be close to who is speaking',
    lipspeaker: 'Lip speaker',
    signlanguage: 'Sign Language interpreter',
    speechreporter: 'Speech to text reporter (palantypist)',
    extratime: 'Extra time to think and explain myself',
    courtvisit: 'Visit to court before the hearing',
    courthearing: "Explanation of the court and who's in the room at the hearing",
    intermediary: 'Intermediary',
    nosupport: 'No, I do not need any support at this time',
    //Court comfort
    appropriatelighting: 'Appropriate lighting',
    breaks: 'Regular breaks',
    space: 'Space to be able to get up and move around',
    //Safety Arrangements
    waitingroom: 'a separate waiting room in the court building',
    separateexitentry: 'a separate entrance and exit from the court building',
    screens:
      'to be shielded by a privacy screen in the courtroom (a privacy screen would mean the respondent would not be able to see you while in the courtroom).',
    separatetoilets: 'Separate toilets',
    visitToCourt: 'Visit to court before the hearing',
    videolinks:
      "to join the hearing by video link rather than in person (it is the judge's decision whether to allow a hearing by video link).",
    noSafetyrequirements: 'No, I do not have any safety requirements at this time',
    //Docs support
    docsreadformat: 'Documents in an easy read format',
    brailledocs: 'Braille documents',
    largeprintdocs: 'Documents in large print',
    docsaudio: 'Audio translation of documents',
    docsReadOut: 'Documents read out to me',
    emailInfo: 'Information emailed to me',
    docsprint: 'Documents in a specified colour',
    //Reasonable adjustments
    docsformat: 'I need documents in an alternative format',
    commhelp: 'I need help communicating and understanding',
    hearingsupport: 'I need to bring support with me to a hearing',
    hearingcomfort: 'I need something to feel comfortable during a hearing',
    travellinghelp: 'I need help travelling to, or moving around court buildings',
    //court support
    supportworker: 'A support worker or carer',
    familymember: 'A friend or family member',
    assistance: 'Assistance / guide dog',
    animal: 'Therapy animal',
    //languagerequirements
    speakwelsh: 'I need to speak in Welsh',
    readandwritewelsh: 'I need to read and write in Welsh',
    languageinterpreter: 'I need an interpreter in a certain language',
    nointerpreter: 'No, I do not have any language requirements at this time',
  },
  cy: {
    videohearings: 'Gallaf gymryd rhan mewn gwrandawiadau fideo',
    phonehearings: 'Gallaf gymryd rhan mewn gwrandawiadau dros y ffôn',
    nohearings: 'Na allaf, ni allaf gymryd rhan mewn gwrandawiad fideo na gwrandawiad dros y ffôn',
    //Travelling
    parkingspace: "Lle parcio yn agos i'r adeilad",
    stepfree: 'Dim grisiau / mynediad ar gyfer cadair olwyn',
    wheelchair: 'Y gallu i ddefnyddio cadair olwyn a geir yn y lleoliad',
    toilet: 'Toiledau hygyrch',
    lift: 'Help i ddefnyddio lifft',
    differentchair: 'Math gwahanol o gadair',
    building: 'Cymorth i fynd o amgylch yr adeilad',
    other: 'Arall',
    //Help Coomunication
    hearingloop: 'Dolen sain (system gwella clyw). Derbynnydd isgoch (system gwella clyw)',
    infraredreceiver: 'Derbynnydd isgoch (system gwella clyw)',
    needspeakinghelp: "Angen bod yn agos at bwy bynnag sy'n siarad",
    lipspeaker: 'Siaradwr gwefusau',
    signlanguage: 'Dehonglydd iaith arwyddion',
    speechreporter: 'Cofnodwr iaith lafar i destun (palanteipydd)',
    extratime: 'Amser ychwanegol i feddwl ac egluro fy hun',
    courtvisit: "Ymweld â'r llys cyn y gwrandawiad",
    courthearing: 'Esboniad o osodiad y llys a phwy fydd yn yr ystafell wrandawiadau',
    intermediary: 'Cyfryngwr',
    nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
    //Court comfort
    appropriatelighting: 'Goleuadau priodol',
    breaks: 'Seibiannau rheolaidd',
    space: 'Lle i allu codi a symud o gwmpas',
    //Safety Arrangements
    waitingroom: 'ystafell aros ar wahân yn yr adeilad llys',
    separateexitentry: 'mynedfa ac allanfa ar wahân o’r adeilad llys',
    screens:
      'cael eich cysgodi gan sgrin breifatrwydd yn ystafell y llys (byddai sgrin breifatrwydd yn golygu na fyddai’r atebydd yn gallu eich gweld tra byddech yn yr ystafell llys).',
    separatetoilets: 'Toiledau ar wahân',
    visitToCourt: "Ymweld â'r llys cyn y gwrandawiad",
    videolinks: 'Cyswllt fideo',
    noSafetyrequirements: 'Nac oes, nid oes arnaf angen unrhyw ofynion o ran diogelwch ar hyn o bryd',
    //Docs support
    docsreadformat: 'Dogfennau mewn fformat hawdd i’w darllen',
    brailledocs: 'Dogfennau Braille',
    largeprintdocs: 'Dogfennau mewn print bras',
    docsaudio: 'Recordiad sain o ddogfennau',
    docsReadOut: 'Dogfennau yn cael eu darllen yn uchel i mi',
    emailInfo: 'Gwybodaeth yn cael ei hanfon ataf drwy e-bost',
    docsprint: 'Dogfennau mewn lliw penodol',
    //Reasonable adjustments
    docsformat: 'Rwyf angen dogfennau mewn fformat amgen',
    commhelp: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
    hearingsupport: 'Rwyf angen dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad',
    hearingcomfort: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad',
    travellinghelp: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
    //court support
    supportworker: 'Gweithiwr cymorth neu ofalwr',
    familymember: "Ffrind neu aelod o'r teulu",
    assistance: 'Ci cymorth / ci tywys',
    animal: 'Anifail therapi',
    //languagerequirements
    speakwelsh: 'Rwyf eisiau siarad Cymraeg',
    readandwritewelsh: 'Rwyf eisiau darllen ac ysgrifennu yn Gymraeg',
    languageinterpreter: 'Mae arnaf angen cyfieithydd mewn iaith benodol',
    nointerpreter: 'Nac oes, nid oes gennyf unrhyw ofynion o ran iaith ar hyn o bryd',
  },
};

const url = {
  ra_typeOfHearing: applyParms(REASONABLE_ADJUSTMENTS_ATTENDING_COURT, { root: PartyType.RESPONDENT }),
  ra_noVideoAndPhoneHearing_subfield: applyParms(REASONABLE_ADJUSTMENTS_ATTENDING_COURT, {
    root: PartyType.RESPONDENT,
  }),
  ra_languageNeeds: applyParms(REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS, { root: PartyType.RESPONDENT }),
  ra_needInterpreterInCertainLanguage_subfield: applyParms(REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS, {
    root: PartyType.RESPONDENT,
  }),
  ra_intermediaryRequirements: applyParms(REASONABLE_ADJUSTMENTS_INTERMEDIARY, { root: PartyType.RESPONDENT }),
  ra_intermediaryRequired_subfield: applyParms(REASONABLE_ADJUSTMENTS_INTERMEDIARY, { root: PartyType.RESPONDENT }),
  ra_specialArrangements: applyParms(REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS, { root: PartyType.RESPONDENT }),
  ra_disabilityRequirements: applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE, { root: PartyType.RESPONDENT }),
  ra_assistanceRequired_subfield: applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE, {
    root: PartyType.RESPONDENT,
  }),
};

const getSectionSummaryList = (rows: SummaryListRow[], language: string): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {}) },
      value: { ...(item.value ? { text: item.value } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl,
                  text: language === 'en' ? enContent.edit : cyContent.edit,
                  visuallyHiddenText: `${item.key}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

export const summaryList = (
  context: string,
  language: string,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  const contents = language === 'en' ? enContent : cyContent;
  const isReasonableAdjustmentsNeedsPresent = RAProvider.utils.isReasonableAdjustmentsNeedsPresent(userCase);

  for (const key in contents.keys) {
    const row = {
      key: contents.keys[key],
      value: getValue(key, userCase, language),
      changeUrl: url[key],
    };

    if (row.value) {
      summaryData.push(row);
    }
  }

  return {
    title: isReasonableAdjustmentsNeedsPresent ? (context === 'C7Review' ? contents.sectionTitles.aboutYou : '') : '',
    subTitle: isReasonableAdjustmentsNeedsPresent
      ? context === 'C7ConsolidatedReview'
        ? contents.sectionTitles.supportYouNeed
        : ''
      : '',
    rows: isReasonableAdjustmentsNeedsPresent ? getSectionSummaryList(summaryData, language) : [],
  };
};

const getValue = (key: string, userCase: Partial<CaseWithId>, language = 'en'): string => {
  let output;
  const value = userCase[key];
  if (typeof value === 'string') {
    output = displayText[language][value] as string;
    if (!output) {
      output = value;
    }
    return output;
  }
  let temp = '';

  if (value) {
    for (const k of value) {
      const keyLabel = k as string;
      temp += displayText[language][keyLabel];
      if (value.indexOf(k) !== value.length - 1) {
        temp += ', ';
      }
    }
  }
  return temp;
};

const getContents = (language: string, content: CommonContent): Record<string, any> => {
  const request = content.additionalData?.req;
  const contents = language === 'en' ? enContent : cyContent;

  return {
    ...contents,
    language,
    sections: [summaryList('C7Review', language, request.session.userCase)],
  };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const languages = {
  en: getContents.bind(null, 'en'),
  cy: getContents.bind(null, 'cy'),
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
