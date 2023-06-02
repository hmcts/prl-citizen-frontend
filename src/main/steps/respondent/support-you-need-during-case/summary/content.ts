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
  edit: 'Edit -welsh',
  keys: {
    attendingToCourt: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
    hearingDetails: 'Please provide the details -welsh',
    languageRequirements: 'A oes gennych chi unrhyw ofynion ieithyddol?',
    languageDetails: 'Please provide language details -welsh',
    safetyArrangements: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau diogelwch arbennig?',
    safetyArrangementsDetails: 'Please describe your need in detail -welsh',
    reasonableAdjustments:
      'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
    docsSupport: 'I need documents in an alternative format -welsh',
    docsDetails: 'Please provide the docs details -welsh',
    largePrintDetails: 'Please provide the large print details -welsh',
    otherDetails: 'Please provide the other details -welsh',
    helpCommunication: 'I need help communicating and understanding -welsh',
    signLanguageDetails: 'Please provide sign language details -welsh',
    describeOtherNeed: 'Please provide the details -welsh',
    courtHearing: 'I would need to bring support with me to a court hearing -welsh',
    supportWorkerDetails: 'Please provide support worker details -welsh',
    familyProviderDetails: 'Please provide family member details -welsh',
    therapyDetails: 'Please provide therapy animal details -welsh',
    communicationSupportOther: 'Please provide the details -welsh',
    courtComfort: 'I need something to make me feel comfortable during a court hearing -welsh',
    lightingProvideDetails: 'Please describe appropriate lighting details -welsh',
    otherProvideDetails: 'Please describe your need in detail -welsh',
    travellingToCourt: 'I need help travelling to, or moving around court buildings -welsh',
    parkingDetails: 'Please describe parking space details -welsh',
    differentChairDetails: 'Please describe different chair details -welsh',
    travellingOtherDetails: 'Please describe your need in detail -welsh',
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
    videohearings: 'Yes, I can take part in video hearings - welsh',
    phonehearings: 'Yes, I can take part in phone hearingss - welsh',
    nohearings: 'No, I cannot take part in either video or phone hearings - welsh',
    //Travelling
    parkingspace: 'Parking space close to the venue - welsh',
    stepfree: 'Step free / wheelchair access - welsh',
    wheelchair: 'Use of venue wheelchair - welsh',
    toilet: 'Accessible toilet - welsh',
    lift: 'Help using a lift - welsh',
    differentchair: 'A different type of chair - welsh',
    building: 'Guiding in the building - welsh',
    other: 'Other - welsh',
    //Help Coomunication
    hearingloop: 'Hearing loop (hearing enhancement system) - welsh',
    infraredreceiver: 'Infrared receiver (hearing enhancement system) - welsh',
    needspeakinghelp: 'Need to be close to who is speaking - welsh',
    lipspeaker: 'Lip speaker - welsh',
    signlanguage: 'Sign Language interpreter - welsh',
    speechreporter: 'Speech to text reporter (palantypist) - welsh',
    extratime: 'Extra time to think and explain myself - welsh',
    courtvisit: 'Visit to court before the hearing - welsh',
    courthearing: "Explanation of the court and who's in the room at the hearing - welsh",
    intermediary: 'Intermediary - welsh',
    nosupport: 'No, I do not need any support at this time - welsh',
    //Court comfort
    appropriatelighting: 'Appropriate lighting - welsh',
    breaks: 'Regular breaks - welsh',
    space: 'Space to be able to get up and move around - welsh',
    //Safety Arrangements
    waitingroom: 'Separate waiting room - welsh',
    separateexitentry: 'Separate exits and entrances - welsh',
    screens: 'Screens so you and the other people in the case cannot see each other - welsh',
    separatetoilets: 'Separate toilets - welsh',
    visitToCourt: 'Visit to court before the hearing - welsh',
    videolinks: 'Video links - welsh',
    noSafetyrequirements: 'No, I do not have any safety requirements at this time - welsh',
    //Docs support
    docsreadformat: 'Documents in an easy read format - welsh',
    brailledocs: 'Braille documents - welsh',
    largeprintdocs: 'Documents in large print - welsh',
    docsaudio: 'Audio translation of documents - welsh',
    docsReadOut: 'Documents read out to me - welsh',
    emailInfo: 'Information emailed to me - welsh',
    docsprint: 'Documents in a specified colour - welsh',
    //Reasonable adjustments
    docsformat: 'I need documents in an alternative format - welsh',
    commhelp: 'I need help communicating and understanding - welsh',
    hearingsupport: 'I need to bring support with me to a hearing - welsh',
    hearingcomfort: 'I need something to feel comfortable during a hearing - welsh',
    travellinghelp: 'I need help travelling to, or moving around court buildings - welsh',
    //court support
    supportworker: 'A support worker or carer - welsh',
    familymember: 'A friend or family member - welsh',
    assistance: 'Assistance / guide dog - welsh',
    animal: 'Therapy animal - welsh',
    //languagerequirements
    speakwelsh: 'I need to speak in Welsh - welsh',
    readandwritewelsh: 'I need to read and write in Welsh - welsh',
    languageinterpreter: 'I need an interpreter in a certain language - welsh',
    nointerpreter: 'No, I do not have any language requirements at this time - welsh',
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
