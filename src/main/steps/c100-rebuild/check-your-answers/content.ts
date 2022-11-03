/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';
import { cy as CyMidiationDocument, en as EnMidiationDocument } from '.././miam/mediator-document/content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../miam/domestic-abuse/content';

import {
  ApplicantDetails,
  ChildernDetails,
  ChildernDetailsAdditional,
  InternationalElement,
  MiamAttendance,
  MiamExemption,
  MiamTitle,
  PastAndCurrentProceedings,
  PeopleDetails,
  SafetyConcerns,
  SafetyConcerns_child,
  SafetyConcerns_others,
  SafetyConcerns_yours,
  TypeOfOrder,
  WithoutNoticeHearing,
} from './mainUtil';
import { InternationElements } from './util/InternationElement.util';
import { childDetailsContents } from './util/childDetails.util';
import { hearingDetailsContents } from './util/hearingwithout.util';
import { MiamFieldsLoader } from './util/miam.util';
import { otherProceedingsContents } from './util/otherProceeding.util';
import { SafetyConcernContentElements } from './util/safetyConcerns.util';
import { typeOfCourtOrderContents } from './util/typeOfOrder.util';

export const enContent = {
  serviceName: 'Check your answers ',
  section: '',
  title: 'Check your Answers',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Accept and continue',
  Yes: 'Yes',
  No: 'No ',
  SummaryDetail: 'Download a draft of your application (PDF)',
  SummaryDetailInnerText:
    "<p class='govuk-body'>            If you cannot open the PDF file after downloading, download and install            <a href='https://get.adobe.com/uk/reader/' class='govuk-link' rel='external' target='_blank'>Adobe Acrobat Reader</a> to try again.          </p><p class='govuk-body'>            Please note this draft is for your records. Only the completed application will be admitted in court.          </p><a class='govuk-button ga-pageLink govuk-button--secondary' role='button' draggable='false' data-module='govuk-button' data-ga-category='check your answers' data-ga-label='download draft' download='' href='/steps/completion/summary.pdf'>Download draft application</a>",
  StatementOfTruth: {
    title: 'Statement of Truth',
    heading: 'Confirm before you submit the application',
    warning:
      'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
    inset:
      '<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select Pay and submit your application to complete your online application.</p><p>You can download a copy of your submitted application in PDF format using the link provided.</p>',
    check: 'I believe that the facts stated in this application are true',
    lastPara:
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.',
  },
  sectionTitles: {
    Miam: '5. MIAM: Mediation Information and Assessment Meeting',
    MiamAttendance: 'MIAM attendance',
    MiamExemption: 'MIAM exemption',
    AdvisingCourt: "6. What you're asking the court to decide",
    WithoutNoticeHearing: '7. Hearing details',
    peopleDetails: '8. Details of the people in the application',
    ChildernDetails: "Childen's details",
    ApplicantDetails: 'Details of the applicants',
    InternationalElement: '11. International elements',
    otherProceedings: '9. Past and current proceeding',
    safetyConcerns: '10. Safety concerns',
    additionationDetailsAboutChildern: 'Additional details about the children',
    childSafetyConcerns: 'Safety concerns: the children in the application ',
    yourSafetyConcerns: 'Safety concern: your safety',
    otherSafetyConcerns: 'Safety concern: other concerns that you have',
  },
  keys: {
    wantingCourtToDo: 'Describe what you want the court to do regarding the children in this application',
    qualifyForUrgentHearing: 'Does your situation qualify for an urgent first hearing?',
    askingNoHearing: 'Are you asking for a without notice hearing?',
    phoneNumber: 'Phone number',
    emailAddress: 'Contact number of the person named on the application',
    domesticVoilenceHeading: DomesticAbuseEn().title,
    childProtectionHeading: ChildProtectionEn().title,
    midatatorDocumentTitle: EnMidiationDocument().title,
    none: 'none',
    details: 'Details',
    fullName: 'Full name',
    urgentHearingHeading:
      'Do you require an urgent hearing because you or the children are at risk for any of the following reasons?',
    previousMIAMOrExemptHeading:
      'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend?',
    validExemptionHeading:
      'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case?',
    //child concern screens
    detailsOfChildConcern: 'Briefly describe the [***] [^^^] if you feel able to ',
    againstChild: 'against the child',
    childDrugAbuse: 'Have the children been impacted by drug, alcohol or substance abuse?',
    otherWellBeingIssues: 'Do you have any other concerns about the children’s safety and wellbeing?',
    doWantCourtToAction: 'What do you want the court to do to keep you and the children safe?',
    selectSupervisionAgreementLabel:
      'Do you agree to the children spending time with the other people in this application?',
    supervisionAgreementOtherWaysLabel:
      'Do you agree to the other people in this application being in touch with the children in other ways?',
    childLocation: 'Why do you think the children may be abducted or kept outside the UK without your consent?',
    childsCurrentLocationText: 'Where are the children now?',
    passportOffice: 'Do any of the children have a passport?',
    childrenMoreThanOnePassport: 'Do the children have more than one passport?',
    possessionChildrenPassport: 'Who is in possession of the children’s passports?',
    option1: 'Mother',
    option2: 'Father',
    option3: 'Other',
    haspassportOfficeNotified: 'Has the passport office been notified? ',
    abducionThreats: 'Have the children been abducted or kept outside the UK without your consent before?',
    previousAbduction: 'Provide details of the previous abductions',
    c1A_policeOrInvestigatorInvolved: 'Were the police, private investigators or any other organisation involved?',
    anyOtherPeopleKnowDetails:
      'Do the other people named in this application (the respondents) know any of your contact details?    ',
    doYouWantToKeep:
      'Do you want to keep your contact details private from  the other people named in the application (the respondents)?',
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
  continue: 'Accept and continue - welsh',
  Yes: 'Yes - welsh',
  No: 'No - welsh',
  SummaryDetail: 'Download a draft of your application (PDF)- welsh',
  SummaryDetailInnerText:
    "<p class='govuk-body'>            If you cannot open the PDF file after downloading, download and install            <a href='https://get.adobe.com/uk/reader/' class='govuk-link' rel='external' target='_blank'>Adobe Acrobat Reader</a> to try again.          </p><p class='govuk-body'>            Please note this draft is for your records. Only the completed application will be admitted in court.          </p><a class='govuk-button ga-pageLink govuk-button--secondary' role='button' draggable='false' data-module='govuk-button' data-ga-category='check your answers' data-ga-label='download draft' download='' href='/steps/completion/summary.pdf'>Download draft application</a>",
  StatementOfTruth: {
    title: 'Statement of Truth - welsh',
    heading: 'Confirm before you submit the application - welsh',
    warning:
      'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
    inset:
      '<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select Pay and submit your application to complete your online application.</p><p>You can download a copy of your submitted application in PDF format using the link provided.</p>',
    check: 'I believe that the facts stated in this application are true',
    lastPara:
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.',
  },
  sectionTitles: {
    Miam: '5. MIAM: Mediation Information and Assessment Meeting',
    MiamAttendance: 'MIAM attendance - welsh',
    MiamExemption: 'MIAM exemption - welsh',
    AdvisingCourt: "6. What you're asking the court to decide - welsh",
    WithoutNoticeHearing: '7. Hearing details - welsh',
    peopleDetails: '8. Details of the people in the application - welsh',
    ChildernDetails: "Childen's details - welsh",
    ApplicantDetails: 'Details of the applicants - welsh',
    InternationalElement: '11. International elements - welsh',
    otherProceedings: '9. Past and current proceeding - welsh',
    safetyConcerns: '10. Safety concerns - welsh',
    additionationDetailsAboutChildern: 'Additional details about the children - welsh',
    childSafetyConcerns: 'Safety concerns: the children in the application ',
    yourSafetyConcerns: 'Safety concern: your safety',
    otherSafetyConcerns: 'Safety concern: other concerns that you have',
  },
  keys: {
    wantingCourtToDo: 'Describe what you want the court to do regarding the children in this application - welsh',
    qualifyForUrgentHearing: 'Does your situation qualify for an urgent first hearing? - welsh',
    askingNoHearing: 'Are you asking for a without notice hearing? - welsh',
    phoneNumber: 'Phone number -welsh',
    emailAddress: 'Contact number of the person named on the application - welsh',
    domesticVoilenceHeading: DomesticAbuseCy().title,
    childProtectionHeading: ChildProtectionCy().title,
    midatatorDocumentTitle: CyMidiationDocument().title,
    none: 'none',
    details: 'Details',
    fullName: 'Full name - welsh',
    urgentHearingHeading:
      'Do you require an urgent hearing because you or the children are at risk for any of the following reasons? - welsh',
    previousMIAMOrExemptHeading:
      'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend? - welsh',
    validExemptionHeading:
      'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case? - welsh',
    //child concern screens
    detailsOfChildConcern: 'Briefly describe the physical [***] [^^^] if you feel able to ',
    againstChild: 'against the child',
    childDrugAbuse: 'Have the children been impacted by drug, alcohol or substance abuse? - welsh',
    otherWellBeingIssues: 'Do you have any other concerns about the children’s safety and wellbeing? - welsh',
    doWantCourtToAction: 'What do you want the court to do to keep you and the children safe? - welsh',
    selectSupervisionAgreementLabel:
      'Do you agree to the children spending time with the other people in this application? - welsh',
    supervisionAgreementOtherWaysLabel:
      'Do you agree to the other people in this application being in touch with the children in other ways? welsh',
    childLocation: 'Why do you think the children may be abducted or kept outside the UK without your consent?',
    childsCurrentLocationText: 'Where are the children now? - welsh',
    passportOffice: 'Do any of the children have a passport? - welsh',
    childrenMoreThanOnePassport: 'Do the children have more than one passport? - welsh',
    possessionChildrenPassport: 'Who is in possession of the children’s passports? - welsh',
    option1: 'Mother - welsh',
    option2: 'Father - welsh',
    option3: 'Other',
    haspassportOfficeNotified: 'Has the passport office been notified? ',
    abducionThreats: 'Have the children been abducted or kept outside the UK without your consent before?',
    previousAbduction: 'Provide details of the previous abductions',
    c1A_policeOrInvestigatorInvolved: 'Were the police, private investigators or any other organisation involved?',
    anyOtherPeopleKnowDetails:
      'Do the other people named in this application (the respondents) know any of your contact details? ',
    doYouWantToKeep:
      'Do you want to keep your contact details private from  the other people named in the application (the respondents)?',
    applicantDetails: 'Applicant [^^^] - Your details - welsh',
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
    concerner => concerner === C1ASafteyConcernsAbout.APPLICANT
  );
  return !!(safetyConcernIFOnlyChildAndwaitnessingSafetyConcernSelected || checkIfYourSafetyConcernSelected);
};

const en = (content: CommonContent, newEnContents?: any) => {
  const userCase = content.userCase!;
  const sections = [
    MiamTitle(enContent),
    MiamAttendance(enContent, userCase),
    MiamExemption(newEnContents, userCase),
    TypeOfOrder(enContent, userCase),
    WithoutNoticeHearing(enContent, userCase),
    PeopleDetails(enContent),
    ChildernDetails(enContent, userCase),
    ChildernDetailsAdditional(enContent, userCase),
    ApplicantDetails(enContent, userCase),
    PastAndCurrentProceedings(enContent, userCase),
    SafetyConcerns(enContent, userCase),
    SafetyConcerns_child(enContent, userCase),
  ];

  if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
    sections.push(SafetyConcerns_yours(enContent, userCase));
  }
  sections.push(SafetyConcerns_others(enContent, userCase), InternationalElement(enContent, userCase));
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

const cy: typeof en = (content: CommonContent, newCyContents?: any) => {
  const userCase = content.userCase!;

  const sections = [
    MiamTitle(cyContent),
    MiamAttendance(cyContent, userCase),
    MiamExemption(newCyContents, userCase),
    TypeOfOrder(cyContent, userCase),
    WithoutNoticeHearing(cyContent, userCase),
    PeopleDetails(cyContent),
    ChildernDetails(cyContent, userCase),
    ChildernDetailsAdditional(cyContent, userCase),
    ApplicantDetails(cyContent, userCase),
    PastAndCurrentProceedings(cyContent, userCase),
    SafetyConcerns(cyContent, userCase),
    SafetyConcerns_child(cyContent, userCase),
  ];

  if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
    sections.push(SafetyConcerns_yours(cyContent, userCase));
  }
  sections.push(SafetyConcerns_others(cyContent, userCase), InternationalElement(cyContent, userCase));
  return {
    ...cyContent,
    language: content.language,
    sections,
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

export const SystemLanguageContent = (content, Function) => {
  return content['language'] === 'en' ? Function(content.userCase)?.en() : Function(content.userCase)?.cy();
};

export const generateContent: TranslationFn = content => {
  const newContents = content['language'] === 'en' ? enContent : cyContent;
  newContents['keys'] = {
    ...newContents.keys,
    ...MiamFieldsLoader(SystemLanguageContent, content),
    ...otherProceedingsContents(content['language']),
    ...hearingDetailsContents(content['language']),
    ...typeOfCourtOrderContents(content['language']),
    ...hearingDetailsContents(content['language']),
    ...InternationElements(content['language']),
    ...childDetailsContents(content['language']),
    ...SafetyConcernContentElements(content['language']),
    ...{ none: 'none' },
  };
  const translations = languages[content.language](content, newContents);
  return {
    ...translations,
    form,
  };
};
