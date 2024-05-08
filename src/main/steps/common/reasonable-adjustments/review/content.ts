/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../../app/case/case';
import { PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import { RALocalComponentRespondentSupportNeeds } from '../../../../modules/reasonable-adjustments/definitions';
import {
  GovUkNunjucksSummary,
  SummaryList,
  SummaryListRow,
} from '../../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { applyParms } from '../../../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
  REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
  REASONABLE_ADJUSTMENTS_COURT_NEEDS,
  REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
  REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING,
  REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
  REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE,
  REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING,
} from '../../../../steps/urls';
import { CommonContent } from '../../../common/common.content';

export const enContent = {
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

export const cyContent: typeof enContent = {
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
    waitingroom: 'Separate waiting room',
    separateexitentry: 'Separate exits and entrances',
    screens: 'Screens so you and the other people in the case cannot see each other',
    separatetoilets: 'Separate toilets',
    visitToCourt: 'Visit to court before the hearing',
    videolinks: 'Video links',
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
    waitingroom: 'Ystafell aros ar wahân',
    separateexitentry: "Drysau ar wahân i fynd i mewn ac allan o'r llys",
    screens: "Sgriniau i'ch atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd",
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
  ra_specialArrangements: applyParms(REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS, { root: PartyType.RESPONDENT }),
  ra_specialArrangementsOther_subfield: applyParms(REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS, {
    root: PartyType.RESPONDENT,
  }),
  ra_disabilityRequirements: applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE, { root: PartyType.RESPONDENT }),
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

  Object.assign(url, ammendUrls(userCase));

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
    title: isReasonableAdjustmentsNeedsPresent
      ? context === 'C7Review'
        ? contents.sectionTitles.aboutYou
        : contents.sectionTitles.supportYouNeed
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

const ammendUrls = (caseData: Partial<CaseWithId>): Record<string, string> => {
  const urls = {};
  const supportNeeds = caseData?.ra_disabilityRequirements;

  if (supportNeeds?.includes(RALocalComponentRespondentSupportNeeds.DOCUMENTS_SUPPORT)) {
    Object.assign(urls, {
      ra_documentInformation: applyParms(REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT, { root: PartyType.RESPONDENT }),
      ra_specifiedColorDocuments_subfield: applyParms(REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT, {
        root: PartyType.RESPONDENT,
      }),
      ra_largePrintDocuments_subfield: applyParms(REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT, {
        root: PartyType.RESPONDENT,
      }),
      ra_documentHelpOther_subfield: applyParms(REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT, {
        root: PartyType.RESPONDENT,
      }),
    });
  }

  if (supportNeeds?.includes(RALocalComponentRespondentSupportNeeds.COMMUNICATION_HELP)) {
    Object.assign(urls, {
      ra_communicationHelp: applyParms(REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP, { root: PartyType.RESPONDENT }),
      ra_signLanguageInterpreter_subfield: applyParms(REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP, {
        root: PartyType.RESPONDENT,
      }),
      ra_communicationHelpOther_subfield: applyParms(REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP, {
        root: PartyType.RESPONDENT,
      }),
    });
  }

  if (supportNeeds?.includes(RALocalComponentRespondentSupportNeeds.COURT_HEARING_SUPPORT)) {
    Object.assign(urls, {
      ra_supportCourt: applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING, { root: PartyType.RESPONDENT }),
      ra_supportWorkerCarer_subfield: applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING, {
        root: PartyType.RESPONDENT,
      }),
      ra_friendFamilyMember_subfield: applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING, {
        root: PartyType.RESPONDENT,
      }),
      ra_therapyAnimal_subfield: applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING, { root: PartyType.RESPONDENT }),
      ra_supportCourtOther_subfield: applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING, {
        root: PartyType.RESPONDENT,
      }),
    });
  }

  if (supportNeeds?.includes(RALocalComponentRespondentSupportNeeds.COURT_HEARING_COMFORT)) {
    Object.assign(urls, {
      ra_feelComportable: applyParms(REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING, { root: PartyType.RESPONDENT }),
      ra_appropriateLighting_subfield: applyParms(REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING, {
        root: PartyType.RESPONDENT,
      }),
      ra_feelComportableOther_subfield: applyParms(REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING, {
        root: PartyType.RESPONDENT,
      }),
    });
  }

  if (supportNeeds?.includes(RALocalComponentRespondentSupportNeeds.TRAVELLING_TO_COURT)) {
    Object.assign(urls, {
      ra_travellingCourt: applyParms(REASONABLE_ADJUSTMENTS_COURT_NEEDS, { root: PartyType.RESPONDENT }),
      ra_parkingSpace_subfield: applyParms(REASONABLE_ADJUSTMENTS_COURT_NEEDS, { root: PartyType.RESPONDENT }),
      ra_differentTypeChair_subfield: applyParms(REASONABLE_ADJUSTMENTS_COURT_NEEDS, { root: PartyType.RESPONDENT }),
      ra_travellingCourtOther_subfield: applyParms(REASONABLE_ADJUSTMENTS_COURT_NEEDS, { root: PartyType.RESPONDENT }),
    });
  }

  return urls;
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
