/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cy as CyMidiationDocument, en as EnMidiationDocument } from '.././miam/mediator-document/content';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, RootContext, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';

import { HTML } from './common/htmlSelectors';

// eslint-disable-next-line import/no-unresolved
import { ANYTYPE } from './common/index';
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
  generateOtherProceedingDocErrorContent,
  getCyaSections,
  otherPersonConfidentiality,
  reasonableAdjustment,
  whereDoChildrenLive,
} from './mainUtil';
import { InternationElements } from './util/InternationElement.util';
import { ApplicantElements } from './util/applicant.util';
import { childDetailsContents } from './util/childDetails.util';
import { hearingDetailsContents } from './util/hearingwithout.util';
import { HelpWithFeeContent } from './util/helpWithFee.util';
import { MiamFieldsLoader } from './util/miam.util';
import { otherProceedingsContents } from '../../common/otherProceeding/utils';
import { ReasonableAdjustmentElement } from './util/reasonableAdjustmentContent.util';
import { RespondentsElements } from './util/respondent.util';
import { SafetyConcernContentElements } from './util/safetyConcerns.util';
import { typeOfCourtOrderContents } from './util/typeOfOrder.util';
import { getOtherPeopleLivingWithChildren } from '../../c100-rebuild/other-person-details/utils';
import { SummaryList } from './lib/lib';
import { interpolate } from '../../../steps/common/string-parser';
import { CaseWithId } from '../../../app/case/case';

import { cy as detailsKnownCy, en as detailsKnownEn } from '../applicant/confidentiality/details-know/content';
import { cy as startCy, en as startEn } from '../applicant/confidentiality/start/content';
import {
  cy as startAlternativeCy,
  en as startAlternativenEn,
} from '../applicant/confidentiality/start-alternative/content';
import { cy as personalDetailsCy, en as personalDetailsEn } from '../applicant/personal-details/content';
import { cy as relationShipToChildCy, en as relationShipToChildEn } from '../applicant/relationship-to-child/content';
import { cy as contactDetailsCy, en as contactDetailsEn } from '../applicant/contact-detail/content';
import {
  cy as applicantContactPreferencesCy,
  en as applicantContactPreferencesEn,
} from '../applicant/contact-preference/content';
import { cy as childPersonalDetailsCy, en as childPersonalDetailsEn } from '../child-details/personal-details/content';
import { cy as childMattersCy, en as childMattersEn } from '../child-details/child-matters/content';
import {
  cy as parentalResponsibilityCy,
  en as parentalResponsibilityEn,
} from '../child-details/parental-responsibility/content';
import {
  cy as liveWithContentCy,
  en as liveWithContentEn,
} from '../child-details/live-with/living-arrangements/content';
import {
  cy as mainlyLiveWithContentCy,
  en as mainlyLiveWithContentEn,
} from '../child-details/live-with/mainly-live-with/content';
import {
  cy as respondentPersonalDetailsCy,
  en as respondentPersonalDetailsEn,
} from '../respondent-details/personal-details/content';
import { cy as miamAttendanceCy, en as miamAttendanceEn } from '../miam/attendance/content';
import { cy as miamNonAttendanceReasonsCy, en as miamNonAttendanceReasonsEn } from '../miam/general-reasons/content';
import { cy as internationalStartCy, en as internationalStartEn } from '../international-elements/start/content';
import { cy as internationalParentsCy, en as internationalParentsEn } from '../international-elements/parents/content';
import {
  cy as internationalJurisdictionCy,
  en as internationalJurisdictionEn,
} from '../international-elements/jurisdiction/content';
import { cy as internationalRequestCy, en as internationalRequestEn } from '../international-elements/request/content';
import {
  cy as c1A_abductionLocationCy,
  en as c1A_abductionLocationEn,
} from '../../common/safety-concerns/abduction/child-location/content';
import {
  cy as c1A_otherConcernsDrugsCy,
  en as c1A_otherConcernsDrugsEn,
} from '../../common/safety-concerns/other-concerns/drugs/content';
import {
  cy as c1A_childSafetyConcernsCy,
  en as c1A_childSafetyConcernsEn,
} from '../../common/safety-concerns/other-concerns/other-issues/content';
import {
  cy as c1A_passportOfficeCy,
  en as c1A_passportOfficeEn,
} from '../../common/safety-concerns/abduction/passport-office/content';
import {
  cy as c1A_previousAbductionsCy,
  en as c1A_previousAbductionsEn,
} from '../../common/safety-concerns/abduction/previousabductions/content';
import {
  cy as c1A_concernsForSafetyCy,
  en as c1A_concernsForSafetyEn,
} from '../../common/safety-concerns/concerns-for-safety/content';
import {
  cy as c1A_concernsAboutCy,
  en as c1A_concernsAboutEn,
} from '../../common/safety-concerns/concern-about/content';
import {
  cy as c1A_childConcernsAboutCy,
  en as c1A_childConcernsAboutEn,
} from '../../common/safety-concerns/child/concerns-about/content';
import {
  cy as c1A_passportOfficeNotifiedCy,
  en as c1A_passportOfficeNotifiedEn,
} from '../../common/safety-concerns/abduction/passport-office-notified/content';
import {
  cy as c1A_childAbductedBeforeCy,
  en as c1A_childAbductedBeforeEn,
} from '../../common/safety-concerns/abduction/threats/content';
import {
  cy as c1A_concernsAboutYourselfCy,
  en as c1A_concernsAboutYourselfEn,
} from '../../common/safety-concerns/yourself/concerns-about/content';
import {
  cy as c1A_courtActionCy,
  en as c1A_courtActionEn,
} from '../../common/safety-concerns/orders-required/court-action/content';
import {
  cy as c1A_unsupervisedCy,
  en as c1A_unsupervisedEn,
} from '../../common/safety-concerns/orders-required/unsupervised/content';
import { cy as furtherInfoCy, en as furtherInfoEn } from '../child-details/further-information/content';
import { cy as otherProceedingCY, en as otherProceedingEN } from '../other-proceedings/proceeding-details/content';
import {
  cy as otherProceedingDocumentCy,
  en as otherProceedingDocumentEn,
} from '../other-proceedings/documentUpload/content';

import { MandatoryFieldsConfig } from '../validation/definitions';
import { getAllMandatoryFields, isAllMandatoryFieldsFilled } from '../validation/util';
import _ from 'lodash';

export const enContent = {
  section: '',
  title: 'Check your Answers',
  change: 'Edit',
  topWarning: {
    text: 'Your answers will be shared with the other people in this case.',
    iconFallbackText: 'Warning',
  },
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Accept and continue',
  Yes: 'Yes',
  No: 'No',
  yes: 'Yes',
  no: 'No',
  'Dont know': 'Dont know',
  'I dont know': 'I dont know',
  'Yes, but I prefer that it is supervised': 'Yes, but I prefer that it is supervised',
  'No, I would prefer the other people do not spend time with the children':
    'No, I would prefer the other people do not spend time with the children',
  Mother: 'Mother',
  Father: 'Father',
  Guardian: 'Guardian',
  Grandparent: 'Grandparent',
  'Special Guardian': 'Special Guardian',
  None: 'None',
  Other: 'Other',
  digital: 'Digital',
  post: 'Post',
  address: 'Address',
  telephone: 'Telephone',
  email: 'E-mail',
  Male: 'Male',
  Female: 'Female',
  telephone_number: 'Telephone number',
  dont_know_email_address: 'I dont know their email address',
  dont_know_telephone: 'I dont know their telephone number',
  dontKnow: "Don't know",
  completeSectionError: 'Complete this section',
  StatementOfTruth: {
    title: 'Statement of Truth',
    heading: 'Confirm before you submit the application',
    warning:
      'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
    inset: '',
    insetTextPayAndSubmit:
      "<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select 'Pay and submit your application' to complete your online application.</p>",
    insetTextSubmit:
      "<p>Once you submit your application, you cannot make further changes. Select Save and come back later to save your application, or select 'Submit your application' to complete your online application.</p>",
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
      defaultPaymentError: 'Your application is not submitted. Please try again',
      applicationNotSubmitted: 'Your payment was successful but you need to resubmit your application',
      paymentUnsuccessful: 'Your payment was unsuccessful. Make the payment again and resubmit your application',
    },
    refugeDocumentText: {
      required: 'You must upload a C8 document',
    },
    testText: {
      required: 'test',
    },
    sq_legalRepresentation: {
      required: 'Select yes if you will be using a legal representative in these proceedings',
    },
    c100RebuildChildPostCode: {
      required: 'Enter a full postcode, with or without a space',
    },
    sq_writtenAgreement: {
      required:
        'Select yes if you have a written agreement with the other people in the case, that you want the court to review',
    },
    sq_legalRepresentationApplication: {
      required: 'Select yes if you want your legal representative to complete this application',
    },
    sq_courtPermissionRequired: {
      required:
        'Select yes if there is any reason why you would need permission from the court to make this application',
    },
    sq_permissionsWhy: {
      // not imported as title includes (optional) tag
      required: 'Why do you need a permission from the court to make this application?',
    },
    sq_permissionsRequest: {
      required: 'Explain why the court should grant you permission to submit this application',
    },
    too_courtOrder: {
      required: 'Select  what you are asking the court to do',
    },
    too_shortStatement: {
      required: 'Describe what you want the court to do regarding the children in this application',
    },
    hu_urgentHearingReasons: {
      required: 'Does your situation qualify for an urgent first hearing?',
    },
    hwn_reasonsForApplicationWithoutNotice: {
      required: 'Are you asking for a without notice hearing?',
    },
    childrenKnownToSocialServicesLabel: {
      required: 'Select if any of the children are known to social services',
    },
    // cd_childrenSubjectOfProtectionPlan: {
    //   required: 'Select if any of the children are the subject of a child protection plan',
    // },
    ocd_hasOtherChildren: {
      required: 'Select yes if you have other children',
    },
    miam_otherProceedings: {
      required:
        'Select yes if the children are involved in any emergency protection, care or supervision proceedings(or have been)',
    },
    miam_haveDocSigned: {
      required: 'Select yes if you have a document signed by the mediator',
    },
    miam_validReason: {
      required: 'Select yes if you have a valid reason for not attending a MIAM',
    },
    op_childrenInvolvedCourtCase: {
      required: 'Select yes if the children have been involved in a previous court case',
    },
    op_courtOrderProtection: {
      required: 'Select yes if you have had a court order made for your protection',
    },
    c1A_haveSafetyConcerns: c1A_concernsForSafetyEn().errors.c1A_haveSafetyConcerns,
    c1A_safetyConernAbout: c1A_concernsAboutEn().errors.c1A_safetyConernAbout,
    c1A_concernAboutChild: c1A_childConcernsAboutEn().errors.c1A_concernAboutChild,
    c1A_childsCurrentLocation: c1A_abductionLocationEn().errors.c1A_childsCurrentLocation,
    c1A_passportOffice: {
      required: c1A_passportOfficeEn().title,
    },
    c1A_abductionPassportOfficeNotified: c1A_passportOfficeNotifiedEn().errors.c1A_abductionPassportOfficeNotified,
    c1A_childAbductedBefore: c1A_childAbductedBeforeEn().errors.c1A_childAbductedBefore,
    c1A_previousAbductionsShortDesc: {
      required: c1A_previousAbductionsEn().title,
    },
    c1A_policeOrInvestigatorInvolved: {
      required: c1A_previousAbductionsEn().c1A_policeOrInvestigatorInvolved,
    },
    c1A_concernAboutApplicant: c1A_concernsAboutYourselfEn().errors.c1A_concernAboutApplicant,
    c1A_otherConcernsDrugs: { required: c1A_otherConcernsDrugsEn().title },
    c1A_childSafetyConcerns: { required: c1A_childSafetyConcernsEn().title },
    c1A_keepingSafeStatement: c1A_courtActionEn().errors.c1A_keepingSafeStatement,
    c1A_supervisionAgreementDetails: c1A_unsupervisedEn().errors.c1A_supervisionAgreementDetails,
    c1A_agreementOtherWaysDetails: c1A_unsupervisedEn().errors.c1A_agreementOtherWaysDetails,
    oprs_otherPersonCheck: {
      required: 'Select yes if anyone else should know about the application',
    },
    hwf_needHelpWithFees: {
      required: 'Select yes if you already applied for help with your application fee',
    },
    helpWithFeesReferenceNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees',
    },
    miam_nonAttendanceReasons: miamNonAttendanceReasonsEn.errors.miam_nonAttendanceReasons,
    miam_notAttendingReasons: {
      required: 'Select what other reason you have for not attending a MIAM',
    },
    miam_previousAttendance: {
      required: 'Select what evidence you have that you previously attended a MIAM or NCDR',
    },
    miam_urgency: {
      required: 'Select a reason why your application is urgent',
    },
    miam_childProtectionEvidence: {
      required: 'Select what evidence you have of child protection concerns.',
    },
    miam_domesticAbuse: {
      required: 'Select the evidence you have of domestic abuse',
    },
    fullName: {
      required: 'Enter the full name',
    },
    co_certificate: {
      required: 'Please upload a consent order certificate',
    },
    miam_certificate: {
      required: 'Please upload a miam certificate',
    },
    miam_attendance: miamAttendanceEn.errors.miam_attendance,
    detailsKnown: detailsKnownEn().errors.detailsKnown,
    start: startEn().errors.start,
    startAlternative: startAlternativenEn().errors.startAlternative,
    contactDetailsPrivateAlternative: startAlternativenEn().errors.contactDetailsPrivateAlternative,
    haveYouChangeName: personalDetailsEn().errors.haveYouChangeName,
    applPreviousName: personalDetailsEn().errors.applPreviousName,
    dateOfBirth: personalDetailsEn().errors.dateOfBirth,
    gender: personalDetailsEn().errors.gender,
    placeOfBirth: personalDetailsEn().errors.applicantPlaceOfBirth,
    relationshipType: relationShipToChildEn().errors.relationshipType,
    contactDetails: {
      required: 'Please enter contact details',
    },
    voiceMail: contactDetailsEn().errors.canLeaveVoiceMail,
    contactPreferences: applicantContactPreferencesEn().errors.applicantContactPreferences,
    isDateOfBirthUnknown: {
      required: 'Select if the date of birth is unknown',
    },
    childDateOfBirth: childPersonalDetailsEn().errors.dateOfBirth,
    approxDateOfBirth: childPersonalDetailsEn().errors.approxDateOfBirth,
    childGender: childPersonalDetailsEn().errors.gender,
    otherGenderDetails: childPersonalDetailsEn().errors.otherGenderDetails,
    childMatters: childMattersEn().errors.needsResolution,
    parentalResponsibility: parentalResponsibilityEn().errors.statement,
    liveWith: liveWithContentEn.errors.liveWith,
    mainlyLiveWith: mainlyLiveWithContentEn.errors.mainlyLiveWith,
    hasNameChanged: {
      required: respondentPersonalDetailsEn().hasNameChanged,
    },
    // need to add for parties
    otherPersonConfidentiality: {
      required: 'Select yes if you want to keep {firstName} {lastName}’s details private',
    },
    liveInRefuge: {
      required: 'Select yes if you/they currently live in a refuge',
    },
    cd_childrenKnownToSocialServices: furtherInfoEn().errors.cd_childrenKnownToSocialServices,
    cd_childrenSubjectOfProtectionPlan: furtherInfoEn().errors.cd_childrenSubjectOfProtectionPlan,
    ie_internationalStart: internationalStartEn().errors.ie_internationalStart,
    ie_internationalParents: internationalParentsEn().errors.ie_internationalParents,
    ie_internationalJurisdiction: internationalJurisdictionEn().errors.ie_internationalJurisdiction,
    ie_internationalRequest: internationalRequestEn().errors.ie_internationalRequest,
    c1A_abductionReasonOutsideUk: c1A_abductionLocationEn().errors.c1A_abductionReasonOutsideUk,
    op_courtProceedingsOrders: otherProceedingEN().errors.op_courtProceedingsOrders,
    otherProceedingsDocument: otherProceedingDocumentEn().errors.document,
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
    otherPeopleConfidentiality: 'Confidential details of the other people',
    detailofOtherPeople: 'Details of the other people in the application',
    reasonAbleAdjustment: '[^^sectionNo^^]. Support you need during your case', //section 12
  },
  keys: {
    wantingCourtToDo: 'Describe what you want the court to do regarding the children in this application',
    qualifyForUrgentHearing: 'Does your situation qualify for an urgent first hearing?',
    askingNoHearing: 'Are you asking for a without notice hearing?',
    phoneNumber: 'Phone number',
    emailAddress: 'Contact number of the person named on the application',
    domesticVoilenceHeading: 'What evidence of domestic abuse do you have?',
    childProtectionHeading: 'Which child protection concern applies?',
    midatatorDocumentTitle: EnMidiationDocument.title,
    previousAddress: 'Previous Addresses',
    none: 'none',
    details: 'Details',
    fullName: 'Full name',
    respondents: 'Respondent',
    urgentHearingHeading: 'Why is your application urgent?',
    previousMIAMOrExemptHeading: 'What evidence do you have that you previously attended a MIAM or NCDR?',
    validExemptionHeading: 'What other reason do you have for not attending a MIAM?',
    //child concern screens
    detailsOfChildConcern: 'Briefly describe the [***] [^^^] if you feel able to ',
    concerns: 'concerns',
    againstChild: 'against the child',
    applicantDetails: 'Applicant [^^^] - Your details',
    //respondent-details
    relationshipTo: 'Relationship to',
    childLivingArrangements: "{firstname} {lastname}'s living arrangements",
    whoDoesChildMainlyLiveWith: 'Who does {firstname} {lastname} mainly live with?',
    isOtherPersonAddressConfidential:
      'Do you want to keep {firstName} {lastName}’s identity private from the other people named in the application (the respondents)?',
    otherPerson: 'Other person',
    contactDetailsOf: 'Contact details of [^applicantName^]',
    addressDetails: 'Address details',
    refuge: 'Living in refuge',
    c8RefugeDocument: 'C8 refuge document',
    doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
    courtOrderPrevent:
      'There is a court order preventing me from making an application without first getting the permission of the court',
    anotherReason: 'Another reason',
    dontKnow: "Don't know",
    contactPrefernces: 'Contact preferences',
    child: 'Child',
    reasonForNotAttendingMiam: 'What are your valid reasons for not attending a MIAM?',
    domesticAbuseProvideEvidence: 'Can you provide evidence?',
    domesticAbuseCantProvideEvidence: 'Explain why you cannot provide evidence',
    domesticAbuseEvidence: 'Evidence of domestic abuse',
    haveDocSignedByMediatorForPrevAttendance: 'Do you have a document signed by a mediator?',
    detailsOfPrevMiamEvidence: 'Provide details of MIAM attendance',
    prevMiamEvidence: 'Evidence of attending a MIAM or NCDR',
    whyCantAccessMediator: 'Why can you not access a mediator?',
    giveDetailsOfMediators: 'Give details of the mediators you’ve contacted',
    disability:
      'You have a disability or other inability that prevents you from attending a MIAM in person, online or by video link, and the contacted mediators are unable to provide appropriate facilities for you to attend.',
    noMediatorIn15mile:
      'There is no mediator within 15 miles of your home and you cannot attend the MIAM online or by video link.',
    noAppointmentAvailable:
      'You are unable to attend a MIAM online or by video link because the  mediators contacted are unable to conduct a MIAM within 15 business days of the date of contact.',
    inPrison:
      'You are in prison or any other institution and there are no facilities for you to attend a MIAM online or by video link.',
    bailThatPreventContact: 'You are subject to conditions of bail that prevent contact with the other person.',
    releaseFromPrisonOnLicence:
      'You have been released from prison on licence, and you have a non-contact licence condition which includes someone who is a party to the application',
    noneOfTheAbove: 'None of these',
    applicantLabel: 'Applicant',
  },
};
export const cyContent = {
  section: '',
  title: 'Gwiriwch eich atebion',
  change: ' Golygu',
  topWarning: {
    text: 'Bydd eich atebion yn cael eu rhannu gyda phobl eraill yn yr achos hwn.',
    iconFallbackText: 'Rhybudd',
  },
  makingSure: 'Edrychwch dros eich atebion cyn gorffen gwneud eich cais.',
  continue: 'Derbyn a pharhau',
  Yes: 'Ie',
  No: 'Na',
  Mother: 'Mam',
  Father: 'Tad',
  Guardian: 'Gwarcheidwad',
  Grandparent: 'Nain/Taid',
  'Special Guardian': 'Gwarcheidwad Arbennig',
  None: 'Nain/Taid',
  Other: 'Arall',
  digital: 'Digidol',
  post: 'Drwy’r post',
  address: 'Cyfeiriad',
  telephone: 'Ffôn',
  email: 'E-bost',
  Male: 'Gwryw',
  Female: 'Benyw',
  completeSectionError: 'Llenwch yr adran hon',
  StatementOfTruth: {
    title: 'Datganiad Gwirionedd',
    heading: 'Cadarnhau cyn ichi gyflwyno’r cais',
    warning:
      'Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
    inset: '',
    insetTextPayAndSubmit:
      ' <p>Unwaith y byddwch yn cyflwyno’ch cais, ni allwch wneud unrhyw newidiadau pellach. Dewiswch cadw a dychwelyd yn nes ymlaen i gadw eich cais, neu dewiswch Talu a chyflwyno eich cais i gwblhau eich cais ar-lein.</p>',
    insetTextSubmit:
      "<p>Unwaith y byddwch yn cyflwyno’ch cais, ni allwch wneud unrhyw newidiadau pellach. Dewiswch ‘Cadw'r cais a dychwelyd ato yn hwyrach ymlaen’ i gadw eich cais, neu dewiswch ‘Cyflwyno eich cais’ i gwblhau eich cais ar-lein.</p>",
    check: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir',
    lastPara:
      'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth. Gelwir hwn yn eich ‘datganiad gwirionedd',
    payAndSubmitButton: 'Talu a cyflwyno eich cais',
    SubmitButton: 'Cyflwyno eich cais',
  },
  errors: {
    statementOfTruth: {
      required: 'Cadarnhewch eich bod yn credu bod yr wybodaeth yn y cais hwn yn wir',
    },
    paymentError: {
      title: 'Mae yna broblem',
      defaultPaymentError: 'Nid yw eich cais wedi’i gyflwyno. Rhowch gynnig arall arni',
      applicationNotSubmitted: 'Your payment was successful but you need to resubmit your application (welsh)',
      paymentUnsuccessful:
        'Your payment was unsuccessful. Make the payment again and resubmit your application (welsh)',
    },
    refugeDocumentText: {
      required: 'Mae’n rhaid i chi uwchlwytho dogfen C8',
    },
    otherPersonConfidentiality: {
      required: 'Dewiswch ydw os ydych eisiau cadw {firstName} {lastName} manylion yn gyfrinachol',
    },
    testText: {
      required: 'test',
    },
    fullName: {
      required: 'Enter the full name (welsh)',
    },
    co_certificate: {
      required: 'Please upload a consent order certificate (welsh)',
    },
    miam_certificate: {
      required: 'Please upload a miam certificate (welsh)',
    },
    miam_nonAttendanceReasons: miamNonAttendanceReasonsCy.errors.miam_nonAttendanceReasons,
    miam_attendance: miamAttendanceCy.errors.miam_attendance,
    detailsKnown: detailsKnownCy().errors.detailsKnown,
    start: startCy().errors.start,
    startAlternative: startAlternativeCy().errors.startAlternative,
    contactDetailsPrivateAlternative: startAlternativeCy().errors.contactDetailsPrivateAlternative,
    haveYouChangeName: personalDetailsCy().errors.haveYouChangeName,
    applPreviousName: personalDetailsCy().errors.applPreviousName,
    dateOfBirth: personalDetailsCy().errors.dateOfBirth,
    gender: personalDetailsCy().errors.gender,
    placeOfBirth: personalDetailsCy().errors.applicantPlaceOfBirth,
    relationshipType: relationShipToChildCy().errors.relationshipType,
    contactDetails: {
      required: 'Please enter contact details (welsh)',
    },
    voiceMail: contactDetailsCy().errors.canLeaveVoiceMail,
    contactPreferences: applicantContactPreferencesCy().errors.applicantContactPreferences,
    isDateOfBirthUnknown: {
      required: 'Select if the date of birth is unknown (welsh)',
    },
    childDateOfBirth: childPersonalDetailsCy().errors.dateOfBirth,
    approxDateOfBirth: childPersonalDetailsCy().errors.approxDateOfBirth,
    childGender: childPersonalDetailsCy().errors.gender,
    otherGenderDetails: childPersonalDetailsCy().errors.otherGenderDetails,
    childMatters: childMattersCy().errors.needsResolution,
    parentalResponsibility: parentalResponsibilityCy().errors.statement,
    liveWith: liveWithContentCy.errors.liveWith,
    mainlyLiveWith: mainlyLiveWithContentCy.errors.mainlyLiveWith,
    hasNameChanged: {
      required: respondentPersonalDetailsCy().hasNameChanged,
    },
    liveInRefuge: {
      required: 'Select yes if you/they currently live in a refuge-welsh',
    },
    cd_childrenKnownToSocialServices: furtherInfoCy().errors.cd_childrenKnownToSocialServices,
    cd_childrenSubjectOfProtectionPlan: furtherInfoCy().errors.cd_childrenSubjectOfProtectionPlan,
    previousFullName: respondentPersonalDetailsCy().errors.previousFullName,
    ie_internationalStart: internationalStartCy().errors.ie_internationalStart,
    ie_internationalParents: internationalParentsCy().errors.ie_internationalParents,
    ie_internationalJurisdiction: internationalJurisdictionCy().errors.ie_internationalJurisdiction,
    ie_internationalRequest: internationalRequestCy().errors.ie_internationalRequest,
    c1A_abductionReasonOutsideUk: c1A_abductionLocationCy().errors.c1A_abductionReasonOutsideUk,
    c1A_otherConcernsDrugs: { required: c1A_otherConcernsDrugsCy().title },
    c1A_childSafetyConcerns: { required: c1A_childSafetyConcernsCy().title },
    c1A_haveSafetyConcerns: c1A_concernsForSafetyCy().errors.c1A_haveSafetyConcerns,
    c1A_safetyConernAbout: c1A_concernsAboutCy().errors.c1A_safetyConernAbout,
    c1A_concernAboutChild: c1A_childConcernsAboutCy().errors.c1A_concernAboutChild,
    c1A_childsCurrentLocation: c1A_abductionLocationCy().errors.c1A_childsCurrentLocation,
    c1A_passportOffice: {
      required: c1A_passportOfficeCy().title,
    },
    c1A_previousAbductionsShortDesc: {
      required: c1A_previousAbductionsCy().title,
    },
    c1A_policeOrInvestigatorInvolved: {
      required: c1A_previousAbductionsCy().c1A_policeOrInvestigatorInvolved,
    },
    c1A_abductionPassportOfficeNotified: c1A_passportOfficeNotifiedCy().errors.c1A_abductionPassportOfficeNotified,
    c1A_childAbductedBefore: c1A_childAbductedBeforeCy().errors.c1A_childAbductedBefore,
    c1A_concernAboutApplicant: c1A_concernsAboutYourselfCy().errors.c1A_concernAboutApplicant,
    c1A_keepingSafeStatement: c1A_courtActionCy().errors.c1A_keepingSafeStatement,
    c1A_supervisionAgreementDetails: c1A_unsupervisedCy().errors.c1A_supervisionAgreementDetails,
    c1A_agreementOtherWaysDetails: c1A_unsupervisedCy().errors.c1A_agreementOtherWaysDetails,
    hu_urgentHearingReasons: {
      required: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
    },
    hwn_reasonsForApplicationWithoutNotice: {
      required: 'Ydych chi’n gofyn am wrandawiad heb rybudd?',
    },
    sq_permissionsWhy: {
      // not imported as title includes (optional) tag
      required: 'Pam bod angen caniatâd gan y llys i wneud y cais hwn?',
    },
    op_courtProceedingsOrders: otherProceedingCY().errors.op_courtProceedingsOrders,
    otherProceedingsDocument: otherProceedingDocumentCy().errors.document,
  },
  sectionTitles: {
    locationDetails: '[^^sectionNo^^]. Manylion lleoliad', // section 1
    typeOfApplication: '[^^sectionNo^^]. Math o gais', //section 2,
    legalRepresentativeDetails: '[^^sectionNo^^]. Manylion cynrychiolydd cyfreithiol', //section 3
    permissionForApplication: '[^^sectionNo^^]. Caniatâd i wneud cais', //section 4
    Miam: '[^^sectionNo^^]. MIAM: Cyfarfod Asesu a Gwybodaeth am Gyfryngu', //section 5
    MiamAttendance: 'Mynychu MIAM',
    MiamExemption: 'Esemptiad MIAM',
    AdvisingCourt: '[^^sectionNo^^]. Beth yr ydych chi’n gofyn i’r llys ei benderfynu', //section 6
    WithoutNoticeHearing: '[^^sectionNo^^].  Manylion y gwrandawiad', //section 7
    peopleDetails: '[^^sectionNo^^]. Manylion y bobl yn y cais', // section 8
    ChildernDetails: 'Manylion y plant',
    ApplicantDetails: 'Manylion y ceiswyr',
    InternationalElement: '[^^sectionNo^^]. Elfennau rhyngwladol', //section 11
    otherProceedings: '[^^sectionNo^^]. Achosion yn y gorffennol ac achosion cyfredol', //section 9
    safetyConcerns: '[^^sectionNo^^]. Pryderon am ddiogelwch', //section 10
    additionationDetailsAboutChildern: 'Manylion ychwanegol am y plant',
    childSafetyConcerns: 'Pryderon am ddiogelwch: y plant yn y cais ',
    yourSafetyConcerns: 'Pryder am ddiogelwch: eich diogelwch chi',
    otherSafetyConcerns: 'Pryder am ddiogelwch: pryderon eraill sydd gennych',
    otherChildernDetails: 'Manylion plant eraill',
    detailsOfRespondent: 'Manylion yr atebwyr',
    helpWithFee: '[^^sectionNo^^].  Help i dalu ffioedd', //section 13
    whereTheChildrenLive: 'Ble mae’r plant yn byw',
    otherPeopleConfidentiality: 'Manylion cyfrinachol y bobl eraill',
    detailofOtherPeople: 'Manylion y bobl eraill yn y cais',
    reasonAbleAdjustment: '[^^sectionNo^^]. Cefnogaeth y mae arnoch ei hangen yn ystod eich achos', //section 12
  },
  keys: {
    wantingCourtToDo: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
    qualifyForUrgentHearing: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
    askingNoHearing: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
    phoneNumber: ' Rhif ffôn',
    emailAddress: 'C Rhif cyswllt yr un a enwir yn y cais',
    domesticVoilenceHeading: 'Pa dystiolaeth o gam-drin domestig sydd gennych chi?',
    childProtectionHeading: 'Pa bryderon amddiffyn plant sy’n berthnasol?',
    midatatorDocumentTitle: CyMidiationDocument.title,
    previousAddress: 'Cyfeiriad blaenorol',
    none: 'dim',
    details: 'Manylion',
    fullName: 'Enw llawn',
    respondents: 'Atebydd',
    urgentHearingHeading: 'Pam bod eich cais yn un brys?',
    previousMIAMOrExemptHeading: 'Pa dystiolaeth sydd gennych eich bod eisoes wedi mynychu MIAM neu NCDR?',
    validExemptionHeading: 'Pa reswm arall sydd gennych dros beidio â mynychu MIAM?',
    //child concern screens
    detailsOfChildConcern: 'Disgrifiwch y  [***] [^^^] yn fyr os ydych yn teimlo eich bod yn gallu gwneud hynny',
    concerns: 'pryderon',
    againstChild: 'yn erbyn y plentyn',
    applicantDetails: 'Ceisydd [^^^] - Eich manylion',
    //respondent-details
    relationshipTo: 'Perthynas â',
    childLivingArrangements: "{firstname} {lastname}'s living arrangements (welsh)",
    whoDoesChildMainlyLiveWith: 'Who does {firstname} {lastname} mainly live with? (welsh)',
    isOtherPersonAddressConfidential:
      'Ydych chi eisiau cadw manylion cyswllt {firstName} {lastName} yn gyfrinachol oddi wrth yr unigolyn arall a enwir yn y cais(yr atebydd)',
    otherPerson: 'Rhywun arall',
    contactDetailsOf: 'Manylion cyswllt [^applicantName^]',
    addressDetails: 'Manylion cyfeiriad',
    refuge: 'Byw mewn lloches',
    c8RefugeDocument: 'Dogfen lloches C8',
    doNotHaveParentalResponsibility: 'Nid oes gennyf gyfrifoldeb rhiant dros y plant',
    courtOrderPrevent: 'Mae gorchymyn llys sy’n fy rhwystro rhag gwneud cais heb gael caniatâd gan y llys yn gyntaf',
    anotherReason: 'Rheswm arall',
    dontKnow: 'Ddim yn gwybod',
    contactPrefernces: 'Dewisiadau cyswllt',
    child: 'Plant',
    reasonForNotAttendingMiam: 'Beth yw eich rhesymau dilys dros beidio â mynychu MIAM?',
    domesticAbuseProvideEvidence: 'A allwch chi ddarparu tystiolaeth?',
    domesticAbuseCantProvideEvidence: 'Eglurwch pam na allwch chi ddarparu tystiolaeth',
    domesticAbuseEvidence: 'Tystiolaeth o gam-drin domestig',
    haveDocSignedByMediatorForPrevAttendance: 'A oes gennych chi ddogfen wedi’i llofnodi gan gyfryngwr?',
    detailsOfPrevMiamEvidence: 'Darparu manylion o fynychu MIAM',
    prevMiamEvidence: 'Tystiolaeth o fynychu MIAM neu NCDR',
    whyCantAccessMediator: 'Pam na allwch chi gael mynediad at gyfryngwr',
    giveDetailsOfMediators: 'Rhowch fanylion y cyfryngwyr rydych wedi cysylltu â nhw',
    disability:
      'Mae gennych anabledd neu analluogrwydd arall sy’n eich atal rhag mynychu MIAM yn bersonol, ar-lein neu drwy gyswllt fideo, ac ni all y cyfryngwyr y bu ichi gysylltu â nhw ddarparu cyfleusterau i chi fynychu.',
    noMediatorIn15mile:
      'Nid oes yna gyfryngwr o fewn 15 milltir i’ch cartref ac ni allwch fynychu MIAM ar-lein neu drwy gyswllt fideo.',
    noAppointmentAvailable:
      'Ni allwch fynychu MIAM ar-lein neu drwy gyswllt fideo oherwydd ni all y cyfryngwyr y bu ichi gysylltu â nhw gynnal MIAM o fewn 15 diwrnod busnes i ddyddiad y cyswllt.',
    inPrison:
      'Rydych yn y carchar neu mewn unrhyw fath arall o sefydliad ac nid oes yna gyfleusterau i chi fynychu MIAM ar-lein neu drwy gyswllt fideo.',
    bailThatPreventContact: 'Rydych yn destun amodau mechniaeth sy’n eich atal rhag cysylltu â’r unigolyn arall.',
    releaseFromPrisonOnLicence:
      'Rydych wedi cael eich rhyddhau o’r carchar ar drwydded, ac mae gennych amod dim cysylltu ar eich trwydded sy’n cynnwys rhywun sy’n barti i’r cais',
    noneOfTheAbove: 'Dim un o’r rhain',
    applicantLabel: 'Ceisydd',
  },
  yesNo: {
    ydynTranslation: {
      Yes: 'Ydyn',
      No: 'Nac Ydyn',
      'Dont know': 'Ddim yn gwybod',
    },
    oesTranslation: {
      Yes: 'Oes',
      No: 'Nac oes',
    },
    byddafTranslation: {
      Yes: 'Byddaf',
      No: 'Na fyddaf',
    },
    doTranslation: {
      Yes: 'Do',
      No: 'Naddo',
      yes: 'Do',
      no: 'Naddo',
    },
    ydwTranslation: {
      Yes: 'Ydw',
      No: 'Nac ydw',
    },
    ydyntTranslation: {
      Yes: 'Ydynt',
      No: 'Nac ydynt',
      'I dont know': 'Nid wyf yn gwybod ',
    },
    ydyTranslation: {
      Yes: 'Ydy',
      No: 'Nac ydy',
      yes: 'Ydy',
      no: 'Nac ydy',
      dontKnow: 'Nid wyf yn gwybod',
    },
    ydwSpecial: {
      Yes: 'Ydw',
      'Yes, but I prefer that it is supervised': 'Ydw, ond byddai’n well gennyf i’r cyswllt gael ei oruchwylio',
      'No, I would prefer the other people do not spend time with the children':
        "Nac ydw, byddai'n well gennyf pe na bai’r bobl eraill yn treulio amser gyda'r plant",
    },
    gallaiTranslation: {
      Yes: 'Gallai',
      No: 'Na allai',
    },
    gallaiTranslation1: {
      Yes: 'Gallai',
      No: 'Na allai',
    },
    oesSpecial: {
      Yes: 'Oes',
      No: 'Nac oes',
      'Yes, I need help with paying the fee': 'Oes, rwyf eisiau help i dalu’r ffi',
      'No, I do not need help': 'Nac oes, nid wyf eisiau help',
    },
    oeddTranslation: {
      Yes: 'Oedd',
      No: 'Nac oedd',
    },
    parentalTranslation: {
      Mother: 'Mam',
      Father: 'Tad',
      Other: 'Arall',
    },
    personalDetails: {
      email: 'E-bost',
      telephone_number: 'Rhif ffôn',
      dont_know_email_address: 'Nid wyf yn gwybod beth yw eu cyfeiriad e-bost',
      dont_know_telephone: 'Nid wyf yn gwybod beth yw eu rhif ffôn',
    },
    ydyntTranslationResp: {
      yes: 'Ydynt',
      no: 'Nac ydynt',
      dontKnow: 'Ddim yn gwybod',
    },
    ieTranslation: {
      Yes: 'Ie',
      No: 'Na',
    },
    byddwnTranslation: {
      Yes: 'Byddwn',
      No: 'Na fyddwn',
    },
    gallafTranslation: {
      Yes: 'Gallaf',
      No: 'Na allaf',
    },
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
      section['title'] = title
        .split('[^^sectionNo^^].')
        .join(`<span class="app-task-list__section-number">${sectionCount}.</span>`);
      sectionCount++;
    }
    return section;
  });
  return sections;
};

export const peopleSections = (userCase, contentLanguage, language) => {
  let otherPeopleSection: [] | SummaryList = [];
  let otherPeopleConfidentialitySection: [] | SummaryList = [];

  if (userCase.hasOwnProperty('oprs_otherPersonCheck') && userCase['oprs_otherPersonCheck'] === YesOrNo.YES) {
    otherPeopleSection = OtherPeopleDetails(contentLanguage, userCase, language);
    if (getOtherPeopleLivingWithChildren(userCase).length > 0) {
      otherPeopleConfidentialitySection = otherPersonConfidentiality(contentLanguage, userCase, language);
    }
  }

  return [
    PeopleDetails(contentLanguage),
    ChildernDetails(contentLanguage, userCase, language),
    ChildernDetailsAdditional(contentLanguage, userCase, language),
    OtherChildrenDetails(contentLanguage, userCase, language),
    ApplicantDetails(contentLanguage, userCase, language),
    RespondentDetails(contentLanguage, userCase, language),
    OtherPeopleDetailsTitle(contentLanguage, userCase, language),
    otherPeopleSection,
    whereDoChildrenLive(contentLanguage, userCase, language),
    otherPeopleConfidentialitySection,
  ];
};

const safteyConcenFilledSection = (userCase, contentLanguage, language) => {
  const additionalSafteyConcernSections = [] as ANYTYPE;
  if (userCase.hasOwnProperty('c1A_haveSafetyConcerns') && userCase['c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    additionalSafteyConcernSections.push(SafetyConcerns_child(contentLanguage, userCase, language));
    if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
      additionalSafteyConcernSections.push(SafetyConcerns_yours(contentLanguage, userCase, language));
    }
    additionalSafteyConcernSections.push(SafetyConcerns_others(contentLanguage, userCase, language));
  }
  return additionalSafteyConcernSections;
};
//on Screeing screen if user selects Yes

export const commonSectionsForContentLoader = (contentLanguage, userCase, language) => {
  return {
    PostCodeAndTypeOfApplication: [
      LocationDetails(contentLanguage, userCase, language),
      TypeOfApplication(contentLanguage, userCase, language),
    ],
    ScreeingQuestions: [
      LegalRepresentativeDetails(contentLanguage, userCase, language),
      PermissionForApplication(contentLanguage, userCase, language),
    ],
    MIAM_ALL: [MiamTitle(contentLanguage), MiamAttendance(contentLanguage, userCase, language)],
    IE_RA_HF: [
      InternationalElement(contentLanguage, userCase, language),
      reasonableAdjustment(contentLanguage, userCase, language),
      HelpWithFee(contentLanguage, userCase, language),
    ],
  };
};
export const CheckYourAnswerFlow1 = (userCase, contentLanguage, language) => {
  return [
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).PostCodeAndTypeOfApplication,
    TypeOfOrder(contentLanguage, userCase, language),
    WithoutNoticeHearing(contentLanguage, userCase, language),
    peopleSections(userCase, contentLanguage, language),
    PastAndCurrentProceedings(contentLanguage, userCase, language),
    SafetyConcerns(contentLanguage, userCase, language),
    ...safteyConcenFilledSection(userCase, contentLanguage, language),
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).IE_RA_HF,
  ];
};
// on Screeing screen if user selects No and user opts out of miam
export const CheckYourAnswerFlow2 = (userCase, contentLanguage, language) => {
  return [
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).PostCodeAndTypeOfApplication,
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).ScreeingQuestions,
    MiamTitle(contentLanguage),
    MiamAttendance(contentLanguage, userCase, language),
    PastAndCurrentProceedings(contentLanguage, userCase, language),
    TypeOfOrder(contentLanguage, userCase, language),
    WithoutNoticeHearing(contentLanguage, userCase, language),
    peopleSections(userCase, contentLanguage, language),
    SafetyConcerns(contentLanguage, userCase, language),
    ...safteyConcenFilledSection(userCase, contentLanguage, language),
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).IE_RA_HF,
  ];
};
// if user selects Yes for valid excemptions on maim_exemption
export const CheckYourAnswerFlow3 = (userCase, contentLanguage, newContents, language) => {
  return [
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).PostCodeAndTypeOfApplication,
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).ScreeingQuestions,
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).MIAM_ALL,
    MiamExemption(newContents, userCase, language),
    WithoutNoticeHearing(contentLanguage, userCase, language),
    TypeOfOrder(contentLanguage, userCase, language),
    peopleSections(userCase, contentLanguage, language),
    PastAndCurrentProceedings(contentLanguage, userCase, language),
    SafetyConcerns(contentLanguage, userCase, language),
    ...safteyConcenFilledSection(userCase, contentLanguage, language),
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).IE_RA_HF,
  ];
};
// if user selects No for valid excemptions on maim_exemption
export const CheckYourAnswerFlow4 = (userCase, contentLanguage, newContents, language) => {
  const flow4Sections = [
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).PostCodeAndTypeOfApplication,
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).ScreeingQuestions,
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).MIAM_ALL,
  ];

  if (userCase.miam_attendance === YesOrNo.NO) {
    flow4Sections.push(MiamExemption(newContents, userCase, language));
  }

  return [
    ...flow4Sections,
    TypeOfOrder(contentLanguage, userCase, language),
    WithoutNoticeHearing(contentLanguage, userCase, language),
    peopleSections(userCase, contentLanguage, language),
    PastAndCurrentProceedings(contentLanguage, userCase, language),
    SafetyConcerns(contentLanguage, userCase, language),
    ...safteyConcenFilledSection(userCase, contentLanguage, language),
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).IE_RA_HF,
  ];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const en = (content: CommonContent, newEnContents?: ANYTYPE) => {
  const userCase = content.userCase!;
  const sections = sectionCountFormatter(
    getCyaSections(
      userCase as CaseWithId,
      enContent,
      newEnContents,
      content.language,
      content.additionalData?.req.session.enableC100CaseProgressionTrainTrack
    )
  );
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

export const cy = (content: CommonContent, newCyContents?: ANYTYPE) => {
  const userCase = content.userCase!;
  const sections = sectionCountFormatter(
    getCyaSections(
      userCase as CaseWithId,
      cyContent,
      newCyContents,
      content.language,
      content.additionalData?.req.session.enableC100CaseProgressionTrainTrack
    )
  );
  return {
    ...cyContent,
    language: content.language,
    sections,
  };
};

export const SystemLanguageContent = (content, Function) => {
  return content['language'] === 'en' ? Function(content.userCase)?.en() : Function(content.userCase)?.cy();
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

const generateFormFields = (areAllFieldsFilled: boolean): GenerateDynamicFormFields => {
  const fields = {
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
          disabled: !areAllFieldsFilled,
        },
      ],
    },
    statementOftruthLastPara: {},
  };

  const errors = {
    en: {},
    cy: {},
  };

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.onlycontinue,
    disabled: false,
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
  const raContent = ReasonableAdjustmentElement(content['language']);
  newContents['keys'] = {
    ...newContents.keys,
    ...MiamFieldsLoader(SystemLanguageContent, content),
    ...otherProceedingsContents(content['language'], RootContext.C100_REBUILD),
    ...hearingDetailsContents(content['language']),
    ...typeOfCourtOrderContents(content['language']),
    ...hearingDetailsContents(content['language']),
    ...InternationElements(content['language']),
    ...childDetailsContents(content['language']),
    ...SafetyConcernContentElements(content['language']),
    ...ApplicantElements(content['language']),
    ...HelpWithFeeContent(content['language']),
    ...RespondentsElements(content['language']),
    ...raContent,
    ...{ none: content['language'] === 'en' ? enContent.keys.none : cyContent.keys.none },
  };
  const translations = languages[content.language](content, newContents);
  const mandatoryFields: MandatoryFieldsConfig[] = getAllMandatoryFields(content.userCase! as CaseWithId);
  const isAllFieldsFilled = isAllMandatoryFieldsFilled(mandatoryFields, content.userCase! as CaseWithId);
  // const mandetoryFieldname: string[] = [];
  // mandatoryFields.forEach(field => mandetoryFieldname.push(field.fieldName));
  // const missingObject = mandetoryFieldname.find(value => _.isEmpty(content.userCase?.[value]));
  form.fields['statementOftruthHeading'] = {
    type: 'textAndHtml',
    textAndHtml: `${HTML.STATEMENT_OF_TRUTH_HEADING_H2}${newContents.StatementOfTruth['title']} ${HTML.H2_CLOSE}`,
  };

  form.fields['statementOftruthSubHeading'] = {
    type: 'textAndHtml',
    textAndHtml: `${HTML.STATEMENT_OF_TRUTH_H3}${newContents.StatementOfTruth['heading']} ${HTML.H3_CLOSE}`,
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

  form.submit.disabled = !isAllFieldsFilled; //change to use cya redirect application completed?
  const errors = {};
  content.userCase?.appl_allApplicants?.forEach((applicant, index) => {
    errors[`c8RefugeDocument-applicant-${index}`] = translations.errors.refugeDocumentText;
    errors[`fullName-applicant-${index}`] = translations.errors.fullName;
    errors[`anyOtherPeopleKnowDetails-applicant-${index}`] = translations.errors.detailsKnown;
    //errors[`anyOtherPeopleKnowDetails-applicant-${index}`] = translations.errors.detailsKnown;
    errors[`doYouWantToKeep-applicant-${index}`] = translations.errors.contactDetailsPrivateAlternative;
    errors[`haveYouChangeName-applicant-${index}`] = translations.errors.haveYouChangeName;
    errors[`gender-applicant-${index}`] = translations.errors.gender;
    errors[`dateOfBirth-applicant-${index}`] = translations.errors.dateOfBirth;
    errors[`placeOfBirth-applicant-${index}`] = translations.errors.placeOfBirth;
    // errors[`relationshipTo-applicant-${index}-`] = translations.errors.relationshipType;
    errors[`addressDetails-applicant-${index}`] = {
      required: translations.keys.addressDetails,
    };
    errors[`contactDetails-applicant-${index}`] = translations.errors.contactDetails;
    errors[`voiceMail-applicant-${index}`] = translations.errors.voiceMail;
    errors[`contactPreferences-applicant-${index}`] = translations.errors.contactPreferences;
    errors[`refuge-applicant-${index}`] = translations.errors.liveInRefuge;
  });
  content.userCase?.appl_allApplicants?.forEach((applicant, index) => {
    // if(applicant?.relationshipDetails?.relationshipToChildren){
    // applicant?.relationshipDetails?.relationshipToChildren.forEach((relation)=>{
    content.userCase?.cd_children?.forEach((child, index1) => {
      errors[`relationshipTo-applicant-${index}-${index1}`] = translations.errors.relationshipType;
    });
  });
  //   }
  // })

  content.userCase?.cd_children?.forEach((child, index) => {
    errors[`fullName-child-${index}`] = translations.errors.fullName;
    errors[`isDateOfBirthUnknown-child-${index}`] = translations.errors.isDateOfBirthUnknown;
    errors[`approxDateOfBirth-child-${index}`] = translations.errors.approxDateOfBirth;
    errors[`dateOfBirth-child-${index}`] = translations.errors.childDateOfBirth;
    errors[`gender-child-${index}`] = translations.errors.childGender;
    errors[`orderAppliedFor-child-${index}`] = translations.errors.childMatters;
    errors[`parentalResponsibility-child-${index}`] = translations.errors.parentalResponsibility;
    errors[`childLivingArrangements-child-${index}`] = translations.errors.liveWith;
    errors[`mainlyLiveWith-child-${index}`] = translations.errors.mainlyLiveWith;
  });

  content.userCase?.resp_Respondents?.forEach((respondent, index) => {
    errors[`fullName-respondent-${index}`] = translations.errors.fullName;
    errors[`hasNameChanged-respondent-${index}`] = translations.errors.hasNameChanged;
    errors[`childGenderLabel-respondent-${index}`] = translations.errors.gender;
    errors[`isDateOfBirthUnknown-respondent-${index}`] = translations.errors.isDateOfBirthUnknown;
    errors[`dateOfBirth-respondent-${index}`] = translations.errors.otherGenderDetails;
    errors[`respondentPlaceOfBirth-respondent-${index}`] = translations.errors.placeOfBirth;
    errors[`relationshipTo-respondent-${index}`] = translations.errors.relationshipType;
    errors[`personalDetails-respondent-email-${index}`] = translations.errors.contactDetails;
    errors[`personalDetails-respondent-phone-${index}`] = translations.errors.contactDetails;
    errors[`addressDetails-respondent-${index}`] = {
      required: translations.keys.addressDetails,
    };
  });

  content.userCase?.resp_Respondents?.forEach((applicant, index) => {
    // if(applicant?.relationshipDetails?.relationshipToChildren){
    // applicant?.relationshipDetails?.relationshipToChildren.forEach((relation)=>{
    content.userCase?.cd_children?.forEach((child, index1) => {
      errors[`relationshipTo-respondent-${index}-${index1}`] = translations.errors.relationshipType;
    });
  });

  if (content.userCase?.oprs_otherPersonCheck === YesOrNo.YES && _.isEmpty(content.userCase?.oprs_otherPersons)) {
    errors['fullName-otherPerson-0'] = translations.errors.fullName;
  } else {
    content.userCase?.oprs_otherPersons?.forEach((otherPerson, index) => {
      errors[`fullName-otherPerson-${index}`] = translations.errors.fullName;
      errors[`hasNameChanged-otherPerson-${index}`] = translations.errors.hasNameChanged;
      errors[`otherGenderDetails-otherPerson-${index}`] = translations.errors.gender;
      errors[`isDateOfBirthUnknown-otherPerson-${index}`] = translations.errors.isDateOfBirthUnknown;
      errors[`approxDateOfBirth-otherPerson-${index}`] = translations.errors.approxDateOfBirth;
      errors[`dateOfBirth-otherPerson-${index}`] = translations.errors.dateOfBirth;
      errors[`c8RefugeDocument-otherPerson-${index}`] = translations.errors.refugeDocumentText;
      errors[`addressDetails-otherPerson-${index}`] = {
        required: translations.keys.addressDetails,
      };
      errors[`refuge-otherPerson-${index}`] = translations.errors.liveInRefuge;
      errors[`otherPersonConfidentiality-otherPerson-${index}`] = {
        required: interpolate(translations.errors.otherPersonConfidentiality.required, {
          firstName: otherPerson.firstName,
          lastName: otherPerson.lastName,
        }),
      };
    });
  }

  content.userCase?.oprs_otherPersons?.forEach((applicant, index) => {
    // if(applicant?.relationshipDetails?.relationshipToChildren){
    // applicant?.relationshipDetails?.relationshipToChildren.forEach((relation)=>{
    content.userCase?.cd_children?.forEach((child, index1) => {
      errors[`relationshipTo-otherPerson-${index}-${index1}`] = translations.errors.relationshipType;
    });
  });

  if (content.userCase?.ocd_hasOtherChildren === YesOrNo.YES && _.isEmpty(content.userCase?.ocd_otherChildren)) {
    errors['fullName-otherChild-0'] = translations.errors.fullName;
  } else {
    content.userCase?.ocd_otherChildren?.forEach((otherChild, index) => {
      errors[`fullName-otherChild-${index}`] = translations.errors.fullName;
      errors[`isDateOfBirthUnknown-otherChild-${index}`] = translations.errors.isDateOfBirthUnknown;
      errors[`approxDateOfBirth-otherChild-${index}`] = translations.errors.approxDateOfBirth;
      errors[`gender-otherChild-${index}`] = translations.errors.childGender;
      errors[`dateOfBirth-otherChild-${index}`] = translations.errors.dateOfBirth;
    });
  }

  const c1AAbuseErrors = [];
  c1AAbuseErrors[`c1A_concernAboutChild-${C1AAbuseTypes.PHYSICAL_ABUSE}`] = translations.errors.c1A_concernAboutChild;
  c1AAbuseErrors[`c1A_concernAboutChild-${C1AAbuseTypes.PSYCHOLOGICAL_ABUSE}`] =
    translations.errors.c1A_concernAboutChild;
  c1AAbuseErrors[`c1A_concernAboutChild-${C1AAbuseTypes.EMOTIONAL_ABUSE}`] = translations.errors.c1A_concernAboutChild;
  c1AAbuseErrors[`c1A_concernAboutChild-${C1AAbuseTypes.SEXUAL_ABUSE}`] = translations.errors.c1A_concernAboutChild;
  c1AAbuseErrors[`c1A_concernAboutChild-${C1AAbuseTypes.FINANCIAL_ABUSE}`] = translations.errors.c1A_concernAboutChild;

  return {
    ...translations,
    form: updateFormFields(form, generateFormFields(isAllFieldsFilled).fields),
    errors: {
      ...errors,
      ...translations.errors,
      ...generateOtherProceedingDocErrorContent(content.userCase?.op_otherProceedings?.order, translations),
      ...c1AAbuseErrors,
      ra_typeOfHearing: {
        required: raContent.attendingCourtHeading,
      },
      ra_languageNeeds: {
        required: raContent.langaugeRequirementHeading,
      },
      ra_specialArrangements: {
        required: raContent.specialArrangementsHeading,
      },
      ra_disabilityRequirements: raContent.errors.ra_disabilityRequirements,
      ra_documentInformation: {
        required: raContent.documentInformationHeading,
      },
      ra_communicationHelp: {
        required: raContent.communicationHelpHeading,
      },
      ra_supportCourt: {
        required: raContent.supportCourtHeading,
      },
      ra_feelComportable: {
        required: raContent.feelComfortableHeading,
      },
      ra_travellingCourt: {
        required: raContent.travellingCourtHeading,
      },
    },
  };
};
