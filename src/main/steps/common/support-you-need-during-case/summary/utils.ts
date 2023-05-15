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
    if (row.value !== '') {
      summaryData.push(row);
    }
  }

  return {
    title: sectionTitle || '',
    rows: getSectionSummaryList(summaryData, content),
  };
};

const getValue = (key: string, userCase: Partial<CaseWithId>, language = 'en') => {
  //const data=userCase[key];
  let output;
  const value = userCase[key];
  if (typeof value === 'string') {
    output = SupportYouNeedAllEnum[language][value] as string;
    if (!output) {
      output = value;
    }
    return output;
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
    videohearings: 'Gallaf gymryd rhan mewn gwrandawiad fideo',
    phonehearings: 'Gallaf gymryd rhan mewn gwrandawiad dros y ffôn',
    nohearings: 'Ni allaf gymryd rhan mewn gwrandawiad fideo na gwrandawiad dros y ffôn',
    //Travelling
    parkingspace: "Lle parcio yn agos i'r lleoliad",
    stepfree: 'Dim grisiau / mynediad ar gyfer cadair olwyn',
    wheelchair: 'Y gallu i ddefnyddio cadair olwyn a geir yn y lleoliad',
    toilet: 'Toiledau hygyrch',
    lift: 'Help i ddefnyddio lifft',
    differentchair: 'Math gwahanol o gadair',
    building: 'Cymorth i fynd o amgylch yr adeilad',
    other: 'Arall',
    //Help Coomunication
    hearingloop: 'Dolen sain (system gwella clyw)',
    infraredreceiver: 'Derbynnydd isgoch (system gwella clyw)',
    needspeakinghelp: "Angen bod yn agos at bwy bynnag sy'n siarad",
    lipspeaker: 'Siaradwr gwefusau',
    signlanguage: 'Cyfieithydd iaith arwyddion',
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
    screens: 'Sgriniau i atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd',
    separatetoilets: 'Toiledau ar wahân',
    visitToCourt: "Ymweld â'r llys cyn y gwrandawiad",
    videolinks: 'Cyswllt fideo',
    noSafetyrequirements: 'Nac oes, nid oes gennyf unrhyw ofynion o ran diogelwch ar hyn o bryd',
    //Docs support
    docsreadformat: 'Dogfennau mewn fformat hawdd i’w darllen',
    brailledocs: 'Dogfennau Braille',
    largeprintdocs: 'Dogfennau mewn print bras',
    docsaudio: 'Cyfieithiad sain o ddogfennau',
    docsReadOut: 'Dogfennau yn cael eu darllen yn uchel i mi',
    emailInfo: 'Information emailed to me - welsh',
    docsprint: 'Dogfennau mewn lliw penodol',
    //Reasonable adjustments
    docsformat: 'Rwyf angen dogfennau mewn fformat amgen',
    commhelp: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
    hearingsupport: 'Rwyf eisiau dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad',
    hearingcomfort: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad',
    travellinghelp: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
    //court support
    supportworker: 'Gweithiwr cymorth neu ofalwr',
    familymember: "ffrind neu aelod o'r teulu",
    assistance: 'Ci cymorth / ci tywys',
    animal: 'Anifail therapi',
    //languagerequirements
    speakwelsh: 'Rwyf eisiau siarad Cymraeg',
    readandwritewelsh: 'Rwyf eisiau siarad ac ysgrifennu yn Gymraeg',
    languageinterpreter: 'Mae arnaf angen cyfieithydd mewn iaith benodol',
    nointerpreter: 'Nac oes, nid oes gennyf unrhyw ofynion o ran iaith ar hyn o bryd',
  },
};
