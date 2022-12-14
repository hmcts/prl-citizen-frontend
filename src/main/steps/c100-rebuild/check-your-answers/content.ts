/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C1AAbuseTypes, C1ASafteyConcernsAbout, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';
import { cy as CyMidiationDocument, en as EnMidiationDocument } from '.././miam/mediator-document/content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../miam/domestic-abuse/content';
import { cy as caseNameCyContent, en as caseNameEnContent } from '../case-name/content';

import { HTML } from './common/htmlSelectors';

// eslint-disable-next-line import/no-unresolved
import { ANYTYPE } from './common/index';
import {
  ApplicantDetails,
  CaseName,
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
  OtherPeopleDetails,
  OtherPeopleDetailsTitle,
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
  reasonableAdjustment,
  whereDoChildLive,
} from './mainUtil';
import { InternationElements } from './util/InternationElement.util';
import { ApplicantElements } from './util/applicant.util';
import { childDetailsContents } from './util/childDetails.util';
import { hearingDetailsContents } from './util/hearingwithout.util';
import { HelpWithFeeContent } from './util/helpWithFee.util';
import { MiamFieldsLoader } from './util/miam.util';
import { otherProceedingsContents } from './util/otherProceeding.util';
import { ReasonableAdjustmentElement } from './util/reasonableAdjustmentContent.util';
import { RespondentsElements } from './util/respondent.util';
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
    inset: '',
    insetTextPayAndSubmit:
      "<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select 'Pay and submit your application' to complete your online application.</p><p>You can download a copy of your submitted application in PDF format using the link provided.</p>",
    insetTextSubmit:
      "<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select 'Submit your application' to complete your online application.</p><p>You can download a copy of your submitted application in PDF format using the link provided.</p>",
    check: 'I believe that the facts stated in this application are true',
    lastPara:
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.',
    payAndSubmitButton: 'Pay and submit your application',
    SubmitButton: 'Submit your application',
  },
  errors: {
    statementOfTruth: {
      required: 'Confirm that you believe the information in this application is true',
    },
    paymentError: {
      title: 'There is a problem',
      content: 'Your application is not submitted. Please try again',
    },
  },
  sectionTitles: {
    locationDetails: '[^^sectionNo^^]. Location details', // section 1
    typeOfApplication: '[^^sectionNo^^]. Type of application', //section 2,
    legalRepresentativeDetails: '[^^sectionNo^^]. Legal representative details', //section 3
    permissionForApplication: '[^^sectionNo^^]. Permission to make the application', //section 4
    Miam: '[^^sectionNo^^]. MIAM: Mediation Information and Assessment Meeting', //section 5
    MiamAttendance: 'MIAM attendance',
    MiamExemption: 'MIAM exemption',
    AdvisingCourt: "[^^sectionNo^^]. What you're asking the court to decide", //section 6
    WithoutNoticeHearing: '[^^sectionNo^^]. Hearing details', //section 7
    peopleDetails: '[^^sectionNo^^]. Details of the people in the application ', // section 8
    ChildernDetails: "Children's details",
    ApplicantDetails: 'Details of the applicants',
    InternationalElement: '[^^sectionNo^^]. International elements', //section 11
    otherProceedings: '[^^sectionNo^^]. Past and current proceeding', //section 9
    safetyConcerns: '[^^sectionNo^^]. Safety concerns', //section 10
    additionationDetailsAboutChildern: 'Additional details about the children',
    childSafetyConcerns: 'Safety concerns: the children in the application ',
    yourSafetyConcerns: 'Safety concern: your safety',
    otherSafetyConcerns: 'Safety concern: other concerns that you have',
    otherChildernDetails: 'Other Children details',
    detailsOfRespondent: 'Details of the respondents',
    helpWithFee: '[^^sectionNo^^]. Help with Fees', //section 13
    whereTheChildrenLive: 'Where the children live',
    detailofOtherPeople: 'Details of the other people in the application',
    reasonAbleAdjustment: '[^^sectionNo^^]. Support you need during your case', //section 12
    caseName: '[^^sectionNo^^]. Case name',
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
    previousAddress: 'Previous Addresses',
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
    applicantDetails: 'Applicant [^^^] - Your details',
    //respondent-details
    relationshipTo: 'Relationship to',
    whoDoesLiveWith: 'Who does [^childName^] currently live with?',
    otherPerson: 'Other person',
    contactDetailsOf: 'Contact details of [^applicantName^]',
    addressDetails: 'Address details',
    doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
    courtOrderPrevent:
      'There is a court order preventing me from making an application without first getting the permission of the court',
    anotherReason: 'Another reason',
    dontKnow: "Don't know",
    enterCaseName: caseNameEnContent().title,
  },
};
export const cyContent: typeof enContent = {
  serviceName: 'Check your answers - welsh ',
  section: '',
  title: 'Check your Answers -welsh',
  change: 'Golygu',
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
    inset: '',
    insetTextPayAndSubmit:
      "<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select 'Pay and submit your application' to complete your online application.</p><p>You can download a copy of your submitted application in PDF format using the link provided.</p>",
    insetTextSubmit:
      "<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select 'Submit your application' to complete your online application.</p><p>You can download a copy of your submitted application in PDF format using the link provided.</p>",
    check: 'I believe that the facts stated in this application are true',
    lastPara:
      'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.',
    payAndSubmitButton: 'Pay and submit your application',
    SubmitButton: 'Submit your application',
  },
  errors: {
    statementOfTruth: {
      required: 'Confirm that you believe the information in this application is true',
    },
    paymentError: {
      title: 'There is a problem - welsh',
      content: 'Your application is not submitted. Please try again - welsh',
    },
  },
  sectionTitles: {
    locationDetails: '[^^sectionNo^^]. Location details', // section 1
    typeOfApplication: '[^^sectionNo^^]. Type of application', //section 2,
    legalRepresentativeDetails: '[^^sectionNo^^]. Legal representative details', //section 3
    permissionForApplication: '[^^sectionNo^^]. Permission to make the application', //section 4
    Miam: '[^^sectionNo^^]. MIAM: Mediation Information and Assessment Meeting', //section 5
    MiamAttendance: 'MIAM attendance - welsh',
    MiamExemption: 'MIAM exemption - welsh',
    AdvisingCourt: "[^^sectionNo^^]. What you're asking the court to decide - welsh", //section 6
    WithoutNoticeHearing: '[^^sectionNo^^]. Hearing details - welsh', //section 7
    peopleDetails: '[^^sectionNo^^]. Details of the people in the application - welsh', // section 8
    ChildernDetails: "Childen's details - welsh",
    ApplicantDetails: 'Details of the applicants - welsh',
    InternationalElement: '[^^sectionNo^^]. International elements - welsh', //section 11
    otherProceedings: '[^^sectionNo^^]. Past and current proceeding - welsh', //section 9
    safetyConcerns: '[^^sectionNo^^]. Safety concerns - welsh', //section 10
    additionationDetailsAboutChildern: 'Additional details about the children - welsh',
    childSafetyConcerns: 'Safety concerns: the children in the application ',
    yourSafetyConcerns: 'Safety concern: your safety',
    otherSafetyConcerns: 'Safety concern: other concerns that you have',
    otherChildernDetails: 'Other Children details',
    detailsOfRespondent: 'Details of the respondents',
    helpWithFee: '[^^sectionNo^^]. Help with Fees', //section 13
    whereTheChildrenLive: 'Where the children live',
    detailofOtherPeople: 'Details of the other people in the application',
    reasonAbleAdjustment: '[^^sectionNo^^]. Support you need during your case', //section 12
    caseName: '[^^sectionNo^^]. Case name',
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
    previousAddress: 'Previous Addresses',
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
    applicantDetails: 'Applicant [^^^] - Your details - welsh',
    //respondent-details
    relationshipTo: 'Relationship to',
    whoDoesLiveWith: 'Who does [^childName^] currently live with?',
    otherPerson: 'Other person',
    contactDetailsOf: 'Contact details of [^applicantName^]',
    addressDetails: 'Address details',
    doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
    courtOrderPrevent:
      'There is a court order preventing me from making an application without first getting the permission of the court',
    anotherReason: 'Another reason',
    dontKnow: "Don't know",
    enterCaseName: caseNameCyContent().title,
  },
};

export const toggleApplicantSafetyConcerns = (safteyConcernsAboutKey, userCase, childConcernsKey): boolean => {
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

export const sectionCountFormatter = sections => {
  let sectionCount = 1;
  sections = sections.map(section => {
    const { title } = section;
    if (title?.includes('[^^sectionNo^^]')) {
      section['title'] = title.split('[^^sectionNo^^]').join(sectionCount);
      sectionCount++;
    }
    return section;
  });
  return sections;
};
export const peopleSections = (userCase, contentLanguage) => {
  const otherPeopleSection =
    userCase.hasOwnProperty('oprs_otherPersonCheck') && userCase['oprs_otherPersonCheck'] === YesOrNo.YES
      ? OtherPeopleDetails(contentLanguage, userCase)
      : [];
  return [
    PeopleDetails(contentLanguage),
    ChildernDetails(contentLanguage, userCase),
    ChildernDetailsAdditional(contentLanguage, userCase),
    OtherChildrenDetails(contentLanguage, userCase),
    ApplicantDetails(contentLanguage, userCase),
    RespondentDetails(contentLanguage, userCase),
    OtherPeopleDetailsTitle(contentLanguage, userCase),
    otherPeopleSection,
    whereDoChildLive(contentLanguage, userCase),
  ];
};

const safteyConcenFilledSection = (userCase, contentLanguage) => {
  const additionalSafteyConcernSections = [] as ANYTYPE;
  if (userCase.hasOwnProperty('c1A_haveSafetyConcerns') && userCase['c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    additionalSafteyConcernSections.push(SafetyConcerns_child(contentLanguage, userCase));
    if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
      additionalSafteyConcernSections.push(SafetyConcerns_yours(contentLanguage, userCase));
    }
    additionalSafteyConcernSections.push(SafetyConcerns_others(contentLanguage, userCase));
  }
  return additionalSafteyConcernSections;
};
//on Screeing screen if user selects Yes

export const commonSectionsForContentLoader = (contentLanguage, userCase) => {
  return {
    PostCodeAndTypeOfApplication: [
      CaseName(contentLanguage, userCase),
      LocationDetails(contentLanguage, userCase),
      TypeOfApplication(contentLanguage, userCase),
    ],
    ScreeingQuestions: [
      LegalRepresentativeDetails(contentLanguage, userCase),
      PermissionForApplication(contentLanguage, userCase),
    ],
    MIAM_ALL: [MiamTitle(contentLanguage), MiamAttendance(contentLanguage, userCase)],
    IE_RA_HF: [
      InternationalElement(contentLanguage, userCase),
      reasonableAdjustment(contentLanguage, userCase),
      HelpWithFee(contentLanguage, userCase),
    ],
  };
};
export const CheckYourAnswerFlow1 = (userCase, contentLanguage) => {
  return [
    ...commonSectionsForContentLoader(contentLanguage, userCase).PostCodeAndTypeOfApplication,
    TypeOfOrder(contentLanguage, userCase),
    WithoutNoticeHearing(contentLanguage, userCase),
    peopleSections(userCase, contentLanguage),
    PastAndCurrentProceedings(contentLanguage, userCase),
    SafetyConcerns(contentLanguage, userCase),
    ...safteyConcenFilledSection(userCase, contentLanguage),
    ...commonSectionsForContentLoader(contentLanguage, userCase).IE_RA_HF,
  ];
};
// on Screeing screen if user selects No and user opts out of miam
export const CheckYourAnswerFlow2 = (userCase, contentLanguage) => {
  return [
    ...commonSectionsForContentLoader(contentLanguage, userCase).PostCodeAndTypeOfApplication,
    ...commonSectionsForContentLoader(contentLanguage, userCase).ScreeingQuestions,
    MiamTitle(contentLanguage),
    MiamAttendance(contentLanguage, userCase),
    PastAndCurrentProceedings(contentLanguage, userCase),
    TypeOfOrder(contentLanguage, userCase),
    WithoutNoticeHearing(contentLanguage, userCase),
    peopleSections(userCase, contentLanguage),
    SafetyConcerns(contentLanguage, userCase),
    ...safteyConcenFilledSection(userCase, contentLanguage),
    ...commonSectionsForContentLoader(contentLanguage, userCase).IE_RA_HF,
  ];
};
// if user selects Yes for valid excemptions on maim_exemption
export const CheckYourAnswerFlow3 = (userCase, contentLanguage, newContents) => {
  return [
    ...commonSectionsForContentLoader(contentLanguage, userCase).PostCodeAndTypeOfApplication,
    ...commonSectionsForContentLoader(contentLanguage, userCase).ScreeingQuestions,
    ...commonSectionsForContentLoader(contentLanguage, userCase).MIAM_ALL,
    MiamExemption(newContents, userCase),
    WithoutNoticeHearing(contentLanguage, userCase),
    TypeOfOrder(contentLanguage, userCase),
    peopleSections(userCase, contentLanguage),
    PastAndCurrentProceedings(contentLanguage, userCase),
    SafetyConcerns(contentLanguage, userCase),
    ...safteyConcenFilledSection(userCase, contentLanguage),
    ...commonSectionsForContentLoader(contentLanguage, userCase).IE_RA_HF,
  ];
};
// if user selects No for valid excemptions on maim_exemption
export const CheckYourAnswerFlow4 = (userCase, contentLanguage, newContents) => {
  return [
    ...commonSectionsForContentLoader(contentLanguage, userCase).PostCodeAndTypeOfApplication,
    ...commonSectionsForContentLoader(contentLanguage, userCase).ScreeingQuestions,
    ...commonSectionsForContentLoader(contentLanguage, userCase).MIAM_ALL,
    MiamExemption(newContents, userCase),
    TypeOfOrder(contentLanguage, userCase),
    WithoutNoticeHearing(contentLanguage, userCase),
    peopleSections(userCase, contentLanguage),
    PastAndCurrentProceedings(contentLanguage, userCase),
    SafetyConcerns(contentLanguage, userCase),
    ...safteyConcenFilledSection(userCase, contentLanguage),
    ...commonSectionsForContentLoader(contentLanguage, userCase).IE_RA_HF,
  ];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const en = (content: CommonContent, newEnContents?: ANYTYPE) => {
  const userCase = content.userCase!;
  let sections = [] as ANYTYPE;
  // if on sreening screen enable Yes
  if (userCase.hasOwnProperty('sq_writtenAgreement') && userCase['sq_writtenAgreement'] === YesOrNo.YES) {
    sections = CheckYourAnswerFlow1(userCase, enContent).flat() as ANYTYPE;
  } else {
    if (userCase.hasOwnProperty('miam_otherProceedings') && userCase['miam_otherProceedings'] === YesOrNo.YES) {
      sections = CheckYourAnswerFlow2(userCase, enContent).flat() as ANYTYPE;
    } else {
      //if miam urgency is requested miam_urgency
      if (
        userCase['miam_urgency'] &&
        userCase.hasOwnProperty('miam_urgency') &&
        !userCase['miam_urgency'].includes('none')
      ) {
        sections = CheckYourAnswerFlow3(userCase, enContent, newEnContents).flat() as ANYTYPE;
      } else {
        sections = CheckYourAnswerFlow4(userCase, enContent, newEnContents).flat() as ANYTYPE;
      }
    }
  }
  sections = sectionCountFormatter(sections);
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

export const cy: typeof en = (content: CommonContent, newCyContents?: ANYTYPE) => {
  const userCase = content.userCase!;
  let sections = [] as ANYTYPE;
  // if on sreening screen enable Yes
  if (userCase.hasOwnProperty('sq_writtenAgreement') && userCase['sq_writtenAgreement'] === YesOrNo.YES) {
    sections = CheckYourAnswerFlow1(userCase, cyContent).flat() as ANYTYPE;
  } else {
    if (userCase.hasOwnProperty('miam_otherProceedings') && userCase['miam_otherProceedings'] === YesOrNo.YES) {
      sections = CheckYourAnswerFlow2(userCase, cyContent).flat() as ANYTYPE;
    } else {
      //if miam urgency is requested miam_urgency
      if (
        userCase['miam_urgency'] &&
        userCase.hasOwnProperty('miam_urgency') &&
        !userCase['miam_urgency'].includes('none')
      ) {
        sections = CheckYourAnswerFlow3(userCase, cyContent, newCyContents).flat() as ANYTYPE;
      } else {
        sections = CheckYourAnswerFlow4(userCase, cyContent, newCyContents).flat() as ANYTYPE;
      }
    }
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
  fields: {
    statementOftruthHeading: {},
    statementOftruthSubHeading: {},
    statementOftruthWarning: {},
    statementOftruthInset: {},
    statementOfTruth: {
      type: 'checkboxes',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'statementOfTruth',
          label: l => l.StatementOfTruth['check'],
          value: YesOrNo.YES,
        },
      ],
    },
    statementOftruthLastPara: {},
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const languages = {
  en,
  cy,
};
export const generateContent: TranslationFn = content => {
  const newContents = content['language'] === 'en' ? enContent : cyContent;
  const hwfConditions =
    content.userCase &&
    content.userCase.hasOwnProperty('hwf_needHelpWithFees') &&
    content.userCase['hwf_needHelpWithFees'] !== YesOrNo.NO &&
    content.userCase.hasOwnProperty('helpWithFeesReferenceNumber') &&
    content.userCase['helpWithFeesReferenceNumber'] !== '';
  if (hwfConditions) {
    newContents.StatementOfTruth.inset = newContents.StatementOfTruth.insetTextSubmit;
  } else {
    newContents.StatementOfTruth.inset = newContents.StatementOfTruth.insetTextPayAndSubmit;
  }
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
    ...ApplicantElements(content['language']),
    ...HelpWithFeeContent(content['language']),
    ...RespondentsElements(content['language']),
    ...ReasonableAdjustmentElement(content['language']),
    ...{ none: content['language'] === 'en' ? enContent.keys.none : cyContent.keys.none },
  };
  const translations = languages[content.language](content, newContents);

  form.fields['statementOftruthHeading'] = {
    type: 'textAndHtml',
    textAndHtml: `${HTML.H1}${newContents.StatementOfTruth['title']} ${HTML.H1_CLOSE}`,
  };

  form.fields['statementOftruthSubHeading'] = {
    type: 'textAndHtml',
    textAndHtml: `${HTML.STATEMENT_OF_TRUTH_H2}${newContents.StatementOfTruth['heading']} ${HTML.STATEMENT_OF_TRUTH_H2_CLOSE}`,
  };

  form.fields['statementOftruthWarning'] = {
    type: 'warning',
    label: `${newContents.StatementOfTruth['warning']}`,
  };

  form.fields['statementOftruthInset'] = {
    type: 'inset',
    label: `${newContents.StatementOfTruth['inset']}`,
  };

  form.fields['statementOftruthLastPara'] = {
    type: 'textAndHtml',
    textAndHtml: HTML.BREAK + `${newContents.StatementOfTruth['lastPara']}` + HTML.BREAK + HTML.BREAK + HTML.BREAK,
  };
  if (hwfConditions) {
    form.submit = {
      text: l => l.StatementOfTruth['SubmitButton'],
    };
  } else {
    form.submit = {
      text: l => l.StatementOfTruth['payAndSubmitButton'],
    };
  }
  return {
    ...translations,
    form,
  };
};
