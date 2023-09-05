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

const cyContent: typeof enContent = {
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

export const urls = {
  attendingToCourt: CA_DA_ATTENDING_THE_COURT,
  hearingDetails: CA_DA_ATTENDING_THE_COURT,
  languageRequirements: CA_DA_LANGUAGE_REQUIREMENTS,
  languageDetails: CA_DA_LANGUAGE_REQUIREMENTS,
  safetyArrangements: CA_DA_SPECIAL_ARRANGEMENTS,
  safetyArrangementsDetails: CA_DA_SPECIAL_ARRANGEMENTS,
  reasonableAdjustments: CA_DA_REASONABLE_ADJUSTMENTS,
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
