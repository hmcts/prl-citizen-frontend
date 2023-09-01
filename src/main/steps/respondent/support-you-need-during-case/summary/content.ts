import { summaryList } from '../../../../../main/steps/common/support-you-need-during-case/summary/utils';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import {
  CA_DA_ATTENDING_THE_COURT,
  CA_DA_LANGUAGE_REQUIREMENTS,
  CA_DA_REASONABLE_ADJUSTMENTS,
  CA_DA_SPECIAL_ARRANGEMENTS,
} from '../../../../steps/urls';
import { CommonContent } from '../../../common/common.content';
import { filterSelectedUrls } from '../../../common/support-you-need-during-case/summary/handler';

export const enContent = {
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

export const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: 'Eich anghenion a gofynion o ran clywed',
  sectionTitles: {
    aboutYou: 'Amdanoch chi',
  },
  edit: 'Golygu',
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
export const SupportYouNeedAllEnum = {
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
export const urls = {
  attendingToCourt: CA_DA_ATTENDING_THE_COURT,
  hearingDetails: CA_DA_ATTENDING_THE_COURT,
  languageRequirements: CA_DA_LANGUAGE_REQUIREMENTS,
  languageDetails: CA_DA_LANGUAGE_REQUIREMENTS,
  safetyArrangements: CA_DA_SPECIAL_ARRANGEMENTS,
  safetyArrangementsDetails: CA_DA_SPECIAL_ARRANGEMENTS,
  reasonableAdjustments: CA_DA_REASONABLE_ADJUSTMENTS,
};
const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { userCase, user } = content.additionalData?.req.session;
  filterSelectedUrls(userCase, urls, user.id);
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, 'en', enContent.sectionTitles.aboutYou)],
  };
};
const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { userCase, user } = content.additionalData?.req.session;
  filterSelectedUrls(userCase, urls, user.id);
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, 'cy', cyContent.sectionTitles.aboutYou)],
  };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
