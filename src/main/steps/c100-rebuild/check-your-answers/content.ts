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
  HelpWithFee,
  InternationalElement,
  LegalRepresentativeDetails,
  LocationDetails,
  MiamAttendance,
  MiamExemption,
  MiamTitle,
  OtherChildrenDetails,
  PastAndCurrentProceedings,
  PeopleDetails,
  PermissionForApplication,
  RespondentDetails,
  SafetyConcerns,
  SafetyConcerns_child,
  SafetyConcerns_others,
  SafetyConcerns_yours,
  TypeOfApplication,
  TypeOfOrder,
  WithoutNoticeHearing,
  OtherPeopleDetails,
  whereDoChildLive,
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
    locationDetails: '1. Location details',
    typeOfApplication: '2. Type of application',
    legalRepresentativeDetails: '3. Legal representative details',
    permissionForApplication: '4. Permission to make the application',
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
    otherChildernDetails: 'Other Childern details',
    detailsOfRespondent: 'Details of the respondents',
    helpWithFee: '13. Help with Fees',
    whereTheChildrenLive: 'Where the children live',
    detailofOtherPeople: 'Details of the other people',
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
    respondents: 'Respondent',
    urgentHearingHeading:
      'Do you require an urgent hearing because you or the children are at risk for any of the following reasons?',
    previousMIAMOrExemptHeading:
      'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend?',
    validExemptionHeading:
      'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case?',
    //child concern screens
    detailsOfChildConcern: 'Briefly describe the [***] [^^^] if you feel able to ',
    concerns: 'concerns',
    againstChild: 'against the child',
    anyOtherPeopleKnowDetails:
      'Do the other people named in this application (the respondents) know any of your contact details?    ',
    doYouWantToKeep:
      'Do you want to keep your contact details private from  the other people named in the application (the respondents)?',
    applicantDetails: 'Applicant [^^^] - Your details',
    haveLivedMore: 'have you lived at this address for more than 5 years ?',
    previousAddress: 'Previous Addresses',
    hasOtherChildren: 'Do you or any respondents have other children who are not part of this application?',
    otherGender: 'They identify in another way ',
    whereDoChildLive: 'Where do the children live?',
    writtenAgreement:
      'Do you have a written agreement with the other people in the case, that you want the court to review?',
    willYoubeUsingLegalRespresentator: 'Will you be using a legal representative in these proceedings?',
    doyouWantLegalRespresentatorToCompleteApplication:
      'Do you want your legal representative to complete the application for you?',
    whyCourtGrantSubmittingPermission: 'Explain why the court should grant you permission to submit this application',
    reasonPermissionRequired:
      'Is there any reason that you would need permission from the court to make this application?',
    whyPermissionRequiredFromCourt: 'Why do you need a permission from the court to make this application? (optional)',
    doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
    courtOrderPrevent:
      'There is a court order preventing me from making an application without first getting the permission of the court',
    anotherReason: 'Another reason',
    doRequireHelpwithFee: 'Do you need help with paying the fee for this application?',
    hwfApplication: 'Enter your help with fees reference number',
    //respondent-details
    repondentDetials: 'Have they change thier name?',
    respondentPlaceOfBirth: 'Place of birth',
    approxCheckboxLabel: 'I don’t know their date of birth',
    respondentPlaceOfBirthUnknown: 'I don’t know their place of birth',
    addressDetails: 'Address details',
    relationshipTo: 'Relationship to',
    whoDoesLiveWith: 'Who does [^childName^] currently live with?',
    otherPerson: 'Other person',
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
    locationDetails: '1. Location details',
    typeOfApplication: '2. Type of application',
    legalRepresentativeDetails: '3. Legal representative details',
    permissionForApplication: '4. Permission to make the application',
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
    otherChildernDetails: 'Other Childern details',
    detailsOfRespondent: 'Details of the respondents',
    helpWithFee: '13. Help with Fees',
    whereTheChildrenLive: 'Where the children live',
    detailofOtherPeople: 'Details of the other people',
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
    respondents: 'Respondent',
    urgentHearingHeading:
      'Do you require an urgent hearing because you or the children are at risk for any of the following reasons? - welsh',
    previousMIAMOrExemptHeading:
      'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend? - welsh',
    validExemptionHeading:
      'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case? - welsh',
    //child concern screens
    detailsOfChildConcern: 'Briefly describe the [***] [^^^] if you feel able to ',
    concerns: 'concerns',
    againstChild: 'against the child',
    anyOtherPeopleKnowDetails:
      'Do the other people named in this application (the respondents) know any of your contact details? ',
    doYouWantToKeep:
      'Do you want to keep your contact details private from  the other people named in the application (the respondents)?',
    applicantDetails: 'Applicant [^^^] - Your details - welsh',
    haveLivedMore: 'have you lived at this address for more than 5 years ?',
    previousAddress: 'Previous Addresses',
    hasOtherChildren: 'Do you or any respondents have other children who are not part of this application?- welsh',
    otherGender: 'They identify in another way ',
    whereDoChildLive: 'Where do the children live? - welsh',
    writtenAgreement:
      'Do you have a written agreement with the other people in the case, that you want the court to review? - welsh',
    willYoubeUsingLegalRespresentator: 'Will you be using a legal representative in these proceedings? - welsh',
    doyouWantLegalRespresentatorToCompleteApplication:
      'Do you want your legal representative to complete the application for you? - welsh',
    whyCourtGrantSubmittingPermission: 'Explain why the court should grant you permission to submit this application',
    reasonPermissionRequired:
      'Is there any reason that you would need permission from the court to make this application?',
    whyPermissionRequiredFromCourt: 'Why do you need a permission from the court to make this application? (optional)',
    doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
    courtOrderPrevent:
      'There is a court order preventing me from making an application without first getting the permission of the court',
    anotherReason: 'Another reason',
    doRequireHelpwithFee: 'Do you need help with paying the fee for this application?',
    hwfApplication: 'Enter your help with fees reference number',
    //respondent-details
    repondentDetials: 'Have they change thier name?',
    respondentPlaceOfBirth: 'Place of birth',
    approxCheckboxLabel: 'I don’t know their date of birth',
    respondentPlaceOfBirthUnknown: 'I don’t know their place of birth',
    addressDetails: 'Address details',
    relationshipTo: 'Relationship to',
    whoDoesLiveWith: 'Who does [^childName^] currently live with?',
    otherPerson: 'Other person',
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
    LocationDetails(enContent, userCase),
    TypeOfApplication(enContent, userCase),
    LegalRepresentativeDetails(enContent, userCase),
    PermissionForApplication(enContent, userCase),
    MiamTitle(enContent),
    MiamAttendance(enContent, userCase),
    MiamExemption(newEnContents, userCase),
    TypeOfOrder(enContent, userCase),
    WithoutNoticeHearing(enContent, userCase),
    PeopleDetails(enContent),
    ChildernDetails(enContent, userCase),
    ChildernDetailsAdditional(enContent, userCase),
    OtherChildrenDetails(enContent, userCase),
    ApplicantDetails(enContent, userCase),
    RespondentDetails(enContent, userCase),
    OtherPeopleDetails(enContent, userCase),
    whereDoChildLive(enContent, userCase),
    PastAndCurrentProceedings(enContent, userCase),
    SafetyConcerns(enContent, userCase),
    SafetyConcerns_child(enContent, userCase),
  ];

  if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
    sections.push(SafetyConcerns_yours(enContent, userCase));
  }
  sections.push(
    SafetyConcerns_others(enContent, userCase),
    InternationalElement(enContent, userCase),
    HelpWithFee(enContent, userCase)
  );
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

const cy: typeof en = (content: CommonContent, newCyContents?: any) => {
  const userCase = content.userCase!;

  const sections = [
    LocationDetails(cyContent, userCase),
    TypeOfApplication(cyContent, userCase),
    LegalRepresentativeDetails(cyContent, userCase),
    PermissionForApplication(cyContent, userCase),
    MiamTitle(cyContent),
    MiamAttendance(cyContent, userCase),
    MiamExemption(newCyContents, userCase),
    TypeOfOrder(cyContent, userCase),
    WithoutNoticeHearing(cyContent, userCase),
    PeopleDetails(cyContent),
    ChildernDetails(cyContent, userCase),
    ChildernDetailsAdditional(cyContent, userCase),
    OtherChildrenDetails(cyContent, userCase),
    ApplicantDetails(cyContent, userCase),
    whereDoChildLive(enContent, userCase),
    RespondentDetails(cyContent, userCase),
    OtherPeopleDetails(cyContent, userCase),
    PastAndCurrentProceedings(cyContent, userCase),
    SafetyConcerns(cyContent, userCase),
    SafetyConcerns_child(cyContent, userCase),
  ];

  if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
    sections.push(SafetyConcerns_yours(cyContent, userCase));
  }
  sections.push(
    SafetyConcerns_others(cyContent, userCase),
    InternationalElement(cyContent, userCase),
    HelpWithFee(cyContent, userCase)
  );
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
