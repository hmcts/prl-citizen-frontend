/* eslint-disable import/no-unresolved */
import { YesOrNo } from '../../../app/case/definition';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { cy as CyMidiationDocument, en as EnMidiationDocument } from '.././miam/mediator-document/content';
import { cy as caseNameCyContent, en as caseNameEnContent } from '../case-name/content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../miam/domestic-abuse/content';

import { ANYTYPE } from './common/index';
import {
  cyContent,
  enContent,
  form,
  generateContent,
  languages,
  sectionCountFormatter,
  toggleApplicantSafetyConcerns,
} from './content';

const enTestContent = {
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
    payAndSubmitButton: 'Pay and submit your application',
    SubmitButton: 'Submit your application',
  },
  errors: {
    statementOfTruth: {
      required: 'Confirm that you believe the information in this application is true',
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
    ChildernDetails: "Childen's details",
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
const cyTestContent = {
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
    payAndSubmitButton: 'Pay and submit your application',
    SubmitButton: 'Submit your application',
  },
  errors: {
    statementOfTruth: {
      required: 'Confirm that you believe the information in this application is true',
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

describe('testing contents en and cy', () => {
  test('en content', () => {
    expect(enContent.toString()).toEqual(enTestContent.toString());
    expect(enContent.keys.toString()).toEqual(enTestContent.keys.toString());
    expect(enContent.section.toString()).toEqual(enTestContent.section.toString());
  });

  test('cy content', () => {
    expect(cyContent.toString()).toEqual(cyTestContent.toString());
    expect(cyContent.keys.toString()).toEqual(cyTestContent.keys.toString());
    expect(cyContent.section.toString()).toEqual(cyTestContent.section.toString());
  });
});
/* eslint-disable @typescript-eslint/ban-types */
describe('Content.ts toggle test cases', () => {
  test('toggleApplicantSafetyConcerns', () => {
    const safteyConcernsAboutKey = 'concerner',
      userCase = {
        concerner: ['children', 'applicant'],
        abuse: ['witnessingDomesticAbuse'],
      },
      childConcernsKey = 'abuse';
    expect(toggleApplicantSafetyConcerns(safteyConcernsAboutKey, userCase, childConcernsKey)).toBe(true);
  });
  test('sectionCountFormatter', () => {
    expect(sectionCountFormatter([{ title: '[^^sectionNo^^]' }, {}]).toString()).toEqual(
      [{ title: '1' }, {}].toString()
    );
  });

  test('FormContent', () => {
    expect(
      {
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
      }.toString()
    ).toEqual(form.toString());
  });

  test('en - language', () => {
    expect(languages.en).not.toEqual('');
  });
  test('cy - language', () => {
    expect(languages.cy).not.toEqual('');
  });
  const contents = {
    language: 'en',
    phase: '',
    applyForChildArrangements: '',
    applyForDissolution: '',
    c100ServiceName: '',
    feedback: '',
    languageToggle: '',
    govUk: '',
    back: '',
    continue: '',
    next: '',
    change: '',
    upload: '',
    download: '',
    delete: '',
    warning: '',
    required: '',
    notAnswered: '',
    errorSaving: '',
    errorSendingInvite: '',
    ogl: '',
    errorSummaryHeading: '',
    saveAndSignOut: '',
    saveAndComeLater: '',
    goBack: '',
    saveAsDraft: '',
    onlyContinue: '',
    onlycontinue: '',
    cancel: '',
    signOut: '',
    signIn: '',
    accessibility: '',
    cookies: '',
    privacyPolicy: '',
    termsAndConditions: '',
    marriage: '',
    divorce: '',
    civilPartnership: '',
    endingCivilPartnership: '',
    husband: '',
    wife: '',
    partner: '',
    civilPartner: '',
    withHim: '',
    withHer: '',
    months: [],
    dateFormat: { day: '', month: '', year: '' },
    yes: '',
    no: '',
    notSure: '',
    english: '',
    welsh: '',
    contactUsForHelp: '',
    webChat: '',
    webChatDetails: '',
    sendUsAMessage: '',
    sendUsAMessageDetails: '',
    telephone: '',
    telephoneNumber: '',
    telephoneDetails: '',
    findOutCharges: '',
    openNewWindow: '',
    habitualResidentHelpText1: '',
    habitualResidentHelpText2: '',
    cookiesHeading: '',
    cookiesLine1: '',
    cookiesLine2: '',
    acceptAnalyticsCookies: '',
    rejectAnalyticsCookies: '',
    viewCookies: '',
    hideMessage: '',
    cookiesConfirmationMessage: '',
    changeCookiesHeading: '',
    allowAnalyticsCookies: '',
    useAnalyticsCookies: '',
    doNotUseAnalyticsCookies: '',
    save: '',
    cookiesSaved: '',
    additionalCookies: '',
    goToHomepage: '',
    apmCookiesHeadings: '',
    useApmCookies: '',
    doNotUseApmCookies: '',
    divider: '',
    serviceName: '',
    userCase: {
      miam_domesticAbuse: [],
      applicantCaseName: 'test',
      enterCaseName: '',
      sq_writtenAgreement: 'Yes',
      miam_otherProceedings: 'Yes',
    },
  };
  const commonContents = generateContent(contents as ANYTYPE) as Record<string, never>;
  test('generateContents', () => {
    expect(commonContents).not.toEqual('');
  });

  //generateContent
});
