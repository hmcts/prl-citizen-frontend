/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../../app/case/case';
import { PageContent } from '../../../../app/controller/GetController';
import {
  GovUkNunjucksSummary,
  SummaryList,
  SummaryListContent,
  SummaryListRow,
} from '../../../../steps/c100-rebuild/check-your-answers/lib/lib';

const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
  console.log(content);
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
                  text: 'Edit',
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

/* eslint-disable import/namespace */
export const summaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  urls: any,
  language: string,
  sectionTitle?: string
): SummaryList | undefined => {
  const summaryData: SummaryListRow[] = [];
  for (const key in keys) {
    const keyLabel = keys[key];
    const url = urls[key];
    const row = {
      key: keyLabel,
      value: getValue(key, userCase, language),
      changeUrl: url,
    };

    summaryData.push(row);
  }

  return {
    title: sectionTitle || '',
    rows: getSectionSummaryList(summaryData, content),
  };
};

const getValue = (key: string, userCase: Partial<CaseWithId>, language = 'en') => {
  const value = userCase[key];
  if (typeof value === 'string') {
    return SupportYouNeedAllEnum[language][value] as string;
  }
  let temp = '';

  if (value) {
    for (const k of value) {
      const keyLabel = k as string;
      temp += SupportYouNeedAllEnum[language][keyLabel];
      if (value.indexOf(k) !== value.length - 1) {
        temp += ', ';
      }
    }
  }
  return temp as string;
};

const SupportYouNeedAllEnum = {
  en: {
    videohearings: 'Yes, I can take part in video hearings',
    phonehearings: 'Yes, I can take part in phone hearingss',
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
    docsReadOut: 'Dogfennau yn cael eu darllen yn uchel i mi',
    emailInfo: 'Information emailed to me - welsh',
    docsprint: 'Dogfennau mewn lliw penodol',
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
