/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C1AAbuseTypes, C1ASafteyConcernsAbout, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../common.content';

// eslint-disable-next-line import/no-unresolved
import { ANYTYPE } from './common/index';
import { SafetyConcerns, SafetyConcerns_child, SafetyConcerns_others, SafetyConcerns_yours } from './mainUtil';

import { SafetyConcernContentElements } from './util/safetyConcerns.util';

export const enContent = {
  title: 'Check your Answers',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Save and submit',
  Yes: 'Yes',
  No: 'No ',
  sectionTitles: {
    safetyConcerns: '[^^sectionNo^^]. Safety concerns', //section 10
    additionationDetailsAboutChildern: 'Additional details about the children',
    childSafetyConcerns: 'Safety concerns: the children in the application ',
    yourSafetyConcerns: 'Safety concern: your safety',
    otherSafetyConcerns: 'Safety concern: other concerns that you have',
  },
  keys: {
    details: 'Details',
    //child concern screens
    detailsOfChildConcern: 'Briefly describe the [***] against the child if you feel able to ',
    detailsOfYourConcern: 'Briefly describe the [***] if you feel able to ',
    concerns: 'concerns',
    applicantDetails: 'Applicant [^^^] - Your details',
  },
};
export const cyContent: typeof enContent = {
  title: 'Gwirio eich atebion',
  change: 'Golygu',
  topWarning: 'Bydd eich atebion yn cael eu rhannu gyda phobl eraill yn yr achos hwn.',
  makingSure: 'Edrychwch dros eich atebion cyn gorffen gwneud eich cais.',
  continue: 'Cadw a chyflwyno',
  Yes: 'Yes - welsh',
  No: 'No - welsh',
  sectionTitles: {
    safetyConcerns: '[^^sectionNo^^]. Pryderon diogelwch', //section 10
    additionationDetailsAboutChildern: 'Manylion ychwanegol am y plant',
    childSafetyConcerns: 'Pryderon am ddiogelwch: y plant yn y cais',
    yourSafetyConcerns: 'Pryderon am ddiogelwch: eich diogelwch chi',
    otherSafetyConcerns: 'Pryderon am ddiogelwch: pryderon eraill sydd gennych',
  },
  keys: {
    details: 'Manylion',
    //child concern screens
    detailsOfChildConcern:
      "Disgrifiwch yn gryno y [***] yn erbyn y plant os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
    detailsOfYourConcern: "Disgrifiwch y [***] yn gryno os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
    concerns: 'concerns',
    applicantDetails: 'Ceisydd [^^^] - Eich manylion',
  },
};

const toggleApplicantSafetyConcerns = (safteyConcernsAboutKey, userCase, childConcernsKey): boolean => {
  const safetyConcernIFOnlyChildAndwaitnessingSafetyConcernSelected =
    userCase.hasOwnProperty(safteyConcernsAboutKey) &&
    userCase[safteyConcernsAboutKey]?.length === 1 &&
    userCase[safteyConcernsAboutKey]?.some(concerner => concerner === C1ASafteyConcernsAbout.CHILDREN) &&
    userCase.hasOwnProperty(childConcernsKey) &&
    userCase[childConcernsKey]?.some(abuseType => abuseType === C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE);
  const checkIfYourSafetyConcernSelected = userCase[safteyConcernsAboutKey]?.some(
    concerner => concerner === C1ASafteyConcernsAbout.RESPONDENT
  );
  return !!(safetyConcernIFOnlyChildAndwaitnessingSafetyConcernSelected || checkIfYourSafetyConcernSelected);
};

export const sectionCountFormatter = sections => {
  let sectionCount = 1;
  sections = sections.map(section => {
    const { title } = section;
    if (title.includes('[^^sectionNo^^]')) {
      section['title'] = title.split('[^^sectionNo^^]').join(sectionCount);
      sectionCount++;
    }
    return section;
  });
  return sections;
};
export const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  let sections = [] as ANYTYPE;

  sections.push(SafetyConcerns(enContent, userCase, content.language));

  /** if user selects safty concerns as Yes then these section will display until line 352 */
  if (userCase.hasOwnProperty('c1A_haveSafetyConcerns') && userCase['c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    sections.push(SafetyConcerns_child(enContent, userCase, content.language));
    if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
      sections.push(SafetyConcerns_yours(enContent, userCase, content.language));
    }
    sections.push(SafetyConcerns_others(enContent, userCase, content.language));
  }

  sections = sectionCountFormatter(sections);
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

export const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  let sections = [] as ANYTYPE;

  sections.push(SafetyConcerns(cyContent, userCase, content.language));
  /** if user selects safty concerns as Yes then these section will display until line 352 */
  if (userCase.hasOwnProperty('c1A_haveSafetyConcerns') && userCase['c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    sections.push(SafetyConcerns_child(cyContent, userCase, content.language));
    if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
      sections.push(SafetyConcerns_yours(cyContent, userCase, content.language));
    }
    sections.push(SafetyConcerns_others(cyContent, userCase, content.language));
  }

  sections = sectionCountFormatter(sections);
  return {
    ...cyContent,
    language: content.language,
    sections,
  };
};

export const SystemLanguageContent = (content, Function) => {
  return content['language'] === 'en' ? Function(content.userCase)?.en() : Function(content.userCase)?.cy();
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
  const newContents = content['language'] === 'en' ? enContent : cyContent;
  newContents['keys'] = {
    ...newContents.keys,
    ...SafetyConcernContentElements(content['language']),
  };
  const translations = languages[content.language](content);

  return {
    ...translations,
    form,
  };
};
