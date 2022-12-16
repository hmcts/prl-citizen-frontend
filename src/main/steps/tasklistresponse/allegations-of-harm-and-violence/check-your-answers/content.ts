/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PRL_C1AAbuseTypes, PRL_C1ASafteyConcernsAbout, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';

// eslint-disable-next-line import/no-unresolved
import { ANYTYPE } from './common/index';
import { SafetyConcerns, SafetyConcerns_child, SafetyConcerns_others, SafetyConcerns_yours } from './mainUtil';

import { SafetyConcernContentElements } from './util/safetyConcerns.util';

export const enContent = {
  serviceName: 'Check your answers ',
  section: '',
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
    detailsOfChildConcern: 'Briefly describe the [***] [^^^] if you feel able to ',
    concerns: 'concerns',
    againstChild: 'against the child',
    applicantDetails: 'Applicant [^^^] - Your details',
  },
};
export const cyContent: typeof enContent = {
  serviceName: 'Check your answers - welsh ',
  section: '',
  title: 'Check your Answers -welsh',
  change: 'change - welsh',
  topWarning: 'Your answers will be shared with the other people in this case. - welsh',
  makingSure: 'Please review your answers before you finish your application.- welsh',
  continue: 'Save and submit - welsh',
  Yes: 'Yes - welsh',
  No: 'No - welsh',
  sectionTitles: {
    safetyConcerns: '[^^sectionNo^^]. Safety concerns - welsh', //section 10
    additionationDetailsAboutChildern: 'Additional details about the children - welsh',
    childSafetyConcerns: 'Safety concerns: the children in the application ',
    yourSafetyConcerns: 'Safety concern: your safety',
    otherSafetyConcerns: 'Safety concern: other concerns that you have',
  },
  keys: {
    details: 'Details',
    //child concern screens
    detailsOfChildConcern: 'Briefly describe the [***] [^^^] if you feel able to ',
    concerns: 'concerns',
    againstChild: 'against the child',
    applicantDetails: 'Applicant [^^^] - Your details - welsh',
  },
};

const toggleApplicantSafetyConcerns = (safteyConcernsAboutKey, userCase, childConcernsKey): boolean => {
  const safetyConcernIFOnlyChildAndwaitnessingSafetyConcernSelected =
    userCase.hasOwnProperty(safteyConcernsAboutKey) &&
    userCase[safteyConcernsAboutKey]?.length === 1 &&
    userCase[safteyConcernsAboutKey]?.some(concerner => concerner === PRL_C1ASafteyConcernsAbout.CHILDREN) &&
    userCase.hasOwnProperty(childConcernsKey) &&
    userCase[childConcernsKey]?.some(abuseType => abuseType === PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE);
  const checkIfYourSafetyConcernSelected = userCase[safteyConcernsAboutKey]?.some(
    concerner => concerner === PRL_C1ASafteyConcernsAbout.RESPONDENT
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
const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  let sections = [] as ANYTYPE;

  sections.push(SafetyConcerns(enContent, userCase));

  /** if user selects safty concerns as Yes then these section will display until line 352 */
  if (userCase.hasOwnProperty('PRL_c1A_haveSafetyConcerns') && userCase['PRL_c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    sections.push(SafetyConcerns_child(enContent, userCase));
    if (toggleApplicantSafetyConcerns('PRL_c1A_safetyConernAbout', userCase, 'PRL_c1A_concernAboutChild')) {
      sections.push(SafetyConcerns_yours(enContent, userCase));
    }
    sections.push(SafetyConcerns_others(enContent, userCase));
  }

  sections = sectionCountFormatter(sections);
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  let sections = [] as ANYTYPE;

  sections.push(SafetyConcerns(cyContent, userCase));
  /** if user selects safty concerns as Yes then these section will display until line 352 */
  if (userCase.hasOwnProperty('PRL_c1A_haveSafetyConcerns') && userCase['PRL_c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    sections.push(SafetyConcerns_child(cyContent, userCase));
    if (toggleApplicantSafetyConcerns('PRL_c1A_safetyConernAbout', userCase, 'PRL_c1A_concernAboutChild')) {
      sections.push(SafetyConcerns_yours(cyContent, userCase));
    }
    sections.push(SafetyConcerns_others(cyContent, userCase));
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
