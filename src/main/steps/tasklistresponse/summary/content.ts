/* eslint-disable import/no-unresolved */
import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, PartyType, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';
import { removeFields } from '../../../steps/common/confirm-contact-details/checkanswers/content';
import { applyParms } from '../../../steps/common/url-parser';
import {
  CONSENT_TO_APPLICATION,
  DETAILS_KNOWN,
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_START,
  LEGAL_REPRESENTATION_START,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_START,
  REFUGE_UPLOAD_DOC,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_PERSONAL_DETAILS,
  RESPOND_TO_AOH,
  RESPONSE_TO_AOH,
  START_ALTERNATIVE,
  STAYING_IN_REFUGE,
} from '../../../steps/urls';
import { summaryList as prepareRASummaryList } from '../../common/reasonable-adjustments/review/content';
import {
  SafetyConcerns,
  SafetyConcerns_child,
  SafetyConcerns_others,
  SafetyConcerns_yours,
} from '../../common/safety-concerns/review/mainUtil';
import { summaryList } from '../../common/summary/utils';
import { PastAndCurrentProceedings } from '../proceedings/mainUtils';

import { ANYTYPE } from './common/index';
import { populateSummaryData } from './handler';

export * from './routeGuard';

export const enlegalRepresntationContent = {
  sectionTitles: {
    title: '1. Legal representation',
  },
  keys: {
    legalRepresentation: 'Will you be using a legal representative to respond to the application?',
  },
};

export const enConsentContent = {
  sectionTitles: {
    title: '2. Consent to the application',
  },
  keys: {
    doYouConsent: 'Do you agree to the application?',
    reasonForNotConsenting: 'Give your reasons for not consenting to the application.',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Does the applicant need permission from the court before making applications?',
    courtOrderDetails: 'Details',
  },
};

export const enKeepYourDetailsContent = {
  sectionTitles: {
    title: 'Keeping your details private',
  },
  keys: {
    detailsKnown: 'Do the other people named in this application (the applicants) know any of your contact details?',
    startAlternative:
      'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
  },
};

export const enContentMiam = {
  sectionTitles: {
    title: 'Mediation (MIAM)',
  },
  keys: {
    miamStart: 'Have you attended a MIAM?',
    miamWillingness: 'Would you be willing to attend a MIAM?',
    miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM?',
  },
};

export const enConfirmYourDetailsContent = {
  sectionTitles: {
    title: 'Confirm or edit your contact details',
  },
  keys: {
    citizenUserFullName: 'Name',
    citizenUserDateOfBirthText: 'Date of birth',
    citizenUserPlaceOfBirthText: 'Place of birth',
    citizenUserLivingInRefugeText: 'Living in refuge',
    refugeDocumentText: 'C8 refuge document',
    citizenUserAddressText: 'Address',
    citizenUserAddressHistory: 'Address history',
    citizenUserPhoneNumberText: 'Phone number',
    citizenUserEmailAddressText: 'Email',
    citizenUserSafeToCall: 'When it is safe to call you (optional)',
  },
};

export const enContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: 'Current or previous court cases',
  sectionTitles: {
    title: 'Current or previous proceeding',
  },
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
    refugeDocumentText: {
      required: 'You must upload a C8 document',
    },
  },
  continue: 'Submit your response',
  warning1: 'Warning',
  yourResponse: 'Your response will be shared with the other people in this case.',
  confirm: 'Confirm before continuing',
  submit:
    "Once you submit your response, you cannot make any further changes. Please select 'Submit your response' to complete your online response.",
  download: 'You can download a copy of your submitted response using the link below.',
  believeFacts: 'I believe that the facts stated in this response are true',
  statementOfTruthSubmission:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.',
  downloadDraftPDF: 'Download a draft of your response (PDF)',
  cannotOpen: 'If you cannot open the PDF file on your device, download and install',
  adobeReader: 'Adobe Acrobat Reader',
  tryAgain: 'and try again.',
  forRecords: 'Please note this draft is for your records. Only the completed response will be admitted in court.',
  downloadDraft: 'Download draft response',
  downloadDraftWelsh: 'Download draft response welsh',
  completeSectionError: '<span class="govuk-error-message">Complete this section</span>',
};

export const enInternationalContent = {
  sectionTitles: {
    title: '6. International element',
  },
  keys: {
    start: 'Do the children live outside of England or Wales?',
    iFactorsStartProvideDetails: 'Provide details',
    parents: "Do the childrens' parents or anyone significant to the children live outside of England or Wales?",
    iFactorsParentsProvideDetails: 'Provide details',
    jurisdiction:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    iFactorsJurisdictionProvideDetails: 'Provide details',
    request: 'Has another country asked (or been asked) for information or help for the children?',
    iFactorsRequestProvideDetails: 'Provide details',
  },
};

export const enDummyContent = {
  sectionTitles: {
    title2: '3. Your details',
    title3: '4. Application details',
    title4: '5. Safety Concern',
  },
  keys: {},
};

export const enContentProceding = {
  section: '',
  title: 'Check your answers',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Save and continue',
  Yes: 'Yes',
  No: 'No ',
  errors: {},
  sectionTitles: {
    otherProceedings: 'Current or previous proceedings',
  },
  keys: {
    childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
    courtOrderProtection: 'Have you had a court order made for your protection?',
    optitle: 'Provide details of court cases you or the children have been involved in',
    courtIssuedLabel: 'Which court issued this order? (optional)',
    caseNumberLabel: 'Case number (optional)',
    orderDateLabel: 'What date was it made (optional)',
    orderEndDateLabel: 'How long was the order for? (optional)',
    isCurrentOrderLabel: 'Is this a current order? (optional)',
    copyOfOrderLabel: 'Do you have a copy of the order (optional)',
    copy: 'Copy uploaded?',
    emergencyProtectionOrderLabel: 'Emergency Protection Order',
    childArrangementOrderLabel: 'Child Arrangements Order',
    supervisionOrderLabel: 'Supervision Order',
    careOrderLabel: 'Care Order',
    childAbductionOrderLabel: 'Child Abduction Order',
    contactOrderForDivorceLabel:
      'A contact or residence order (Section 8 Children Act 1989) made within proceedings for a divorce or dissolution of a civil partnership',
    contactOrderForAdoptionLabel:
      'A contact or residence order (Section 8 Children Act 1989) made in connection with an Adoption Order',
    childMaintenanceOrderLabel: 'Child Maintenance Order',
    financialOrderLabel: 'Financial Order',
    nonMolestationOrderLabel: 'Non-molestation Order',
    occupationOrderLabel: 'Occupation Order',
    forcedMarriageProtectionOrderLabel: 'Forced Marriage Protection Order',
    restrainingOrderLabel: 'Restraining Order',
    otherInjuctionOrderLabel: 'Other Injunction Order',
    undertakingOrderLabel: 'Undertaking Order',
    otherOrderLabel: 'Other Order',
  },
};

export const enSaftyConcern = {
  change: 'Edit',
  sectionTitles: {
    title: '5. Safety concerns',
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
    againstChild: 'against the child',
    applicantDetails: 'Applicant [^^^] - Your details',
    childrenConcernedAboutLabel: 'Which children are you concerned about? (optional)',
    physicalAbuse: 'Physical abuse',
    psychologicalAbuse: 'Psychological abuse',
    emotionalAbuse: 'Emotional abuse',
    sexualAbuse: 'Sexual abuse',
    sexualAbuseHint:
      'Include being forced or pressured to have sex without consent, being threatened into an unwanted sexual activity, or unwanted touching or groping',
    financialAbuse: 'Financial abuse',
    financialAbuseHint:
      'Examples of financial abuse can be not allowing a person to work, stopping someone saving their own money, or withholding money or credit cards',
    somethingElse: 'Something else',
    physicalAbusePageTitle: 'Briefly describe the physical abuse if you feel able to',
    psychologicalAbusePageTitle: 'Briefly describe the psychological abuse if you feel able to',
    emotionalAbusePageTitle: 'Briefly describe the emotional abuse if you feel able to',
    sexualAbusePageTitle: 'Briefly describe the sexual abuse if you feel able to',
    financialAbusePageTitle: 'Briefly describe the financial abuse if you feel able to',
    somethingElsePageTitle: 'Briefly describe the abuse if you feel able to',
    behaviourDetailsLabel: 'Describe the behaviours you would like the court to be aware of. (optional)',
    behaviourDetailsHintText:
      'Keep your answer brief. You will have a chance to give more detail to the court later in the proceedings.',
    behaviourStartDateLabel: 'When did this behaviour start and how long did it continue? (optional)',
    behaviourStartDateHintText: 'This does not need to be an exact date.',
    isOngoingBehaviourLabel: 'Is the behaviour ongoing? (optional)',
    isOngoingBehaviourHint:
      '<p class="govuk-body" for="respabuseongoing-hint">Contact 999 if there is an emergency. If it\'s not an emergency, <a href="https://www.gov.uk/report-domestic-abuse" class="govuk-link" rel="external" target="_blank">contact one of the suggested agencies</a> to get help or report the behaviour with <a href="https://www.police.uk/" class="govuk-link" rel="external" target="_blank">your local policing team</a>. - welsh</p>',
    YesOptionLabel: 'Yes',
    NoOptionLabel: 'No',
    seekHelpFromPersonOrAgencyLabel: 'Have you ever asked for help from a professional person or agency? (optional)',
    seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP.',
    doYouHaveSafetyConcerns: 'Do you have any concerns for your safety or the safety of the children?',
    whoAreConcernsAbout: 'Who are you concerned about?',
    select_all_relevant: 'Select all options that are relevant to you.',
    children: 'The children in this application',
    respondent: 'Yourself',
    childConcerns: 'What type of behaviour have the children experienced or are at risk of experiencing?',
    applicantConcerns: 'What type of behaviour have the children experienced or are at risk of experiencing?',
    abduction: 'Abduction',
    childrenMoreThanOnePassport: 'Do the children have more than one passport?',
    possessionChildrenPassport: 'Who is in possession of the children’s passports?',
    c1A_policeOrInvestigatorInvolved: 'Were the police, private investigators or any other organisation involved?',
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
    haspassportOfficeNotified: 'Has the passport office been notified?',
    abducionThreats: 'Have the children been abducted or kept outside the UK without your consent before?',
    previousAbduction: 'Provide details of the previous abductions',
  },
  Yes: 'Yes',
  No: 'No ',
};
export const enResponseToAOH = {
  sectionTitles: {
    title: '7. Respond to allegations of harm and violence',
  },
  keys: {
    aoh_wishToRespond: "Do you wish to respond to the applicant's allegations of harm?",
    aoh_responseToAllegations: 'Your response',
  },
};

export const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: 'Edrychwch dros eich atebion cyn i chi gyflwyno eich ymateb',
  title2: 'Achosion llys cyfredol neu flaenorol',
  sectionTitles: {
    title: 'Achos cyfredol neu flaenorol',
  },
  statementOfTruth: 'Datganiad gwirionedd',
  warning: 'Rhybudd',
  warningText:
    'Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
  errors: {
    declarationCheck: {
      required: 'Cadarnhewch y datganiad',
    },
    refugeDocumentText: {
      required: 'Mae’n rhaid i chi uwchlwytho dogfen C8',
    },
  },
  continue: 'Cyflwyno eich ymateb',
  warning1: 'Rhybudd',
  yourResponse: 'Bydd eich ymateb yn cael ei rannu gyda’r bobl eraill yn yr achos hwn',
  confirm: 'Cadarnhewch cyn parhau',
  submit:
    'Unwaith y byddwch wedi cyflwyno’ch ymateb, ni allwch wneud unrhyw newidiadau pellach iddo. Dewiswch ‘Cyflwyno eich ymateb’ i gwblhau eich ymateb ar-lein.',
  download: 'Gallwch ddefnyddio’r ddolen isod i lawrlwytho copi o’r ymateb rydych wedi’i gyflwyno.',
  believeFacts: 'Credaf fod y ffeithiau a nodir yn yr ymateb hwn yn wir',
  statementOfTruthSubmission:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth. Gelwir hwn yn eich ‘datganiad gwirionedd’.',
  downloadDraftPDF: 'Lawrlwytho drafft o’ch ymateb (PDF)',
  cannotOpen: 'Os na allwch agor y ffeil PDF ar eich dyfais, llwythwch a gosodwch',
  adobeReader: 'Adobe Acrobat Reader',
  tryAgain: 'ar eich dyfais a cheisio eto.',
  forRecords: 'Noder mai drafft yw hwn ar gyfer eich cofnodion. Dim ond yr ymateb terfynol a dderbynnir yn y llys.',
  downloadDraft: 'Lawrlwytho drafft o’r ymateb',
  downloadDraftWelsh: 'Lawrlwytho drafft o’r ymateb cymraeg',
  completeSectionError: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
};

export const cyContentProceding = {
  section: '',
  title: 'Gwirio eich atebion',
  change: 'Golygu',
  topWarning: 'Bydd eich atebion yn cael eu rhannu gyda phobl eraill yn yr achos hwn.',
  makingSure: 'Edrychwch dros eich atebion cyn gorffen gwneud eich cais.',
  continue: 'Cadw a pharhau',
  Yes: 'Yes -welsh',
  No: 'No  -welsh',
  errors: {},
  sectionTitles: {
    otherProceedings: 'Achos cyfredol neu flaenorol',
  },
  keys: {
    childrenInvolvedCourtCase: "Ydy'r plant wedi bod yn rhan o achos llys?",
    courtOrderProtection: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer i’ch amddiffyn?',
    optitle: "Darparwch fanylion am achosion llys rydych chi neu'r plant wedi bod yn rhan ohonynt",
    courtIssuedLabel: 'Pa lys a gyhoeddodd y gorchymyn hwn?',
    caseNumberLabel: 'Rhif yr achos (dewisol)',
    orderDateLabel: 'Pa ddyddiad gafodd ei wneud? (dewisol)',
    orderEndDateLabel: 'Am ba mor hir gwnaethpwyd y gorchymyn?',
    isCurrentOrderLabel: 'A yw hwn yn orchymyn cyfredol?',
    copyOfOrderLabel: "Oes gennych chi gopi o'r gorchymyn? (dewisol)",
    copy: 'Copi wedi’i lwytho',
    emergencyProtectionOrderLabel: 'Gorchymyn Diogelu Brys',
    childArrangementOrderLabel: 'Gorchymyn Trefniadau Plant',
    supervisionOrderLabel: 'Gorchymyn Goruchwylio',
    careOrderLabel: 'Gorchymyn Gofal',
    childAbductionOrderLabel: 'Herwgydio Plentyn',
    contactOrderForDivorceLabel:
      'Gorchymyn Cyswllt neu Orchymyn Preswylio (Adran 8 Deddf Plant 1989) a wnaed fel rhan o achos ysgariad neu achos diddymu partneriaeth sifil',
    contactOrderForAdoptionLabel:
      'Gorchymyn Cyswllt neu Orchymyn Preswylio (Adran 8 Deddf Plant 1989) a wnaed mewn perthynas â Gorchymyn Mabwysiadu',
    childMaintenanceOrderLabel: 'Gorchymyn Trefniadau Plant',
    financialOrderLabel: 'Gorchmynion Ariannol',
    nonMolestationOrderLabel: 'Gorchymyn Rhag Molestu',
    occupationOrderLabel: 'Gorchymyn Anheddu',
    forcedMarriageProtectionOrderLabel: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
    restrainingOrderLabel: 'Gorchymyn Atal',
    otherInjuctionOrderLabel: 'Gorchymyn Gwaharddeb Arall',
    undertakingOrderLabel: 'Gorchymyn Ymgymeriad',
    otherOrderLabel: 'Gorchymyn Arall',
  },
};

export const cylegalRepresntationContent = {
  sectionTitles: {
    title: '1. Cynrychiolydd cyfreithiol',
  },
  keys: {
    legalRepresentation: "A fyddwch chi'n defnyddio cynrychiolydd cyfreithiol i ymateb i'r cais?",
  },
};

export const cyConsentContent = {
  sectionTitles: {
    title: '2. Cydsynio i’r cais',
  },
  keys: {
    doYouConsent: 'Do you agree to the application? - welsh',
    reasonForNotConsenting: 'Rhowch eich rhesymau dros beidio â chydsynio i’r cais.',
    applicationReceivedDate: 'Pryd gawsoch chi’r cais?',
    courtPermission: 'A yw’r ceisydd angen caniatâd gan y llys cyn gwneud ceisiadau?',
    courtOrderDetails: 'Manylion',
  },
};

export const cyKeepYourDetailsContent = {
  sectionTitles: {
    title: 'Cadw eich manylion yn breifat',
  },
  keys: {
    detailsKnown: "A yw'r bobl eraill a enwir yn y cais hwn (y ceiswyr) yn gwybod beth yw eich manylion cyswllt?",
    startAlternative:
      "Ydych chi eisiau cadw'ch manylion cyswllt yn breifat oddi wrth y bobl eraill a enwir yn y cais (y ceiswyr)?",
  },
};

export const cyContentMiam = {
  sectionTitles: {
    title: 'Cyfryngu (MIAM)',
  },
  keys: {
    miamStart: 'Ydych chi wedi mynychu MIAM?',
    miamWillingness: "A fyddech chi'n fodlon mynychu MIAM?",
    miamNotWillingExplnation: "Esboniwch pam nad ydych chi'n fodlon mynychu MIAM?",
  },
};

export const cyConfirmYourDetailsContent = {
  sectionTitles: {
    title: 'Cadarnhau neu olygu eich manylion cyswllt',
  },
  keys: {
    citizenUserFullName: 'Enw',
    citizenUserDateOfBirthText: 'Dyddiad geni',
    citizenUserPlaceOfBirthText: 'Lleoliad geni',
    citizenUserLivingInRefugeText: 'Byw mewn lloches',
    refugeDocumentText: 'Dogfen lloches C8',
    citizenUserAddressText: 'Cyfeiriad',
    citizenUserAddressHistory: 'Hanes cyfeiriad',
    citizenUserPhoneNumberText: 'Rhif ffôn',
    citizenUserEmailAddressText: 'E-bost',
    citizenUserSafeToCall: 'Pa bryd y mae’n ddiogel eich ffonio (dewisol)',
  },
};

export const cyInternationalContent = {
  sectionTitles: {
    title: '6. Elfennau rhyngwladol',
  },
  keys: {
    start: "A yw'r plant yn byw y tu allan i Gymru neu Loegr?",
    iFactorsStartProvideDetails: 'Darparwch fanylion',
    parents: "A yw rhieni'r plant neu unrhyw un o bwys i'r plant yn byw y tu allan i Gymru neu Loegr?",
    iFactorsParentsProvideDetails: 'Darparwch fanylion',
    jurisdiction:
      'A allai rhywun arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr?',
    iFactorsJurisdictionProvideDetails: 'Darparwch fanylion',
    request: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
    iFactorsRequestProvideDetails: 'Darparwch fanylion',
  },
};

export const cySaftyConcern = {
  change: 'Golygu',
  sectionTitles: {
    title: '5. Pryderon diogelwch',
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
    againstChild: "Disgrifiwch yn gryno y [***] yn erbyn y plant os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
    applicantDetails: 'Ceisydd [^^^] - Eich manylion',
    childrenConcernedAboutLabel: "Pa blant ydych chi'n pryderu amdanynt? (dewisol)",
    physicalAbuse: 'cam-drin corfforol',
    psychologicalAbuse: 'Cam-drin seicolegol',
    emotionalAbuse: 'cam-drin emosiynol',
    sexualAbuse: 'Cam-drin rhywiol',
    sexualAbuseHint:
      'Yn cynnwys cael eich gorfodi neu’ch rhoi dan bwysau i gael rhyw heb gydsyniad, cael eich bygwth i gyflawni gweithred rhywiol digroeso, neu cael eich cyffwrdd neu eich ymbalfalu yn ddi-groeso',
    financialAbuse: 'Cam-drin ariannol',
    financialAbuseHint:
      'Mae enghreifftiau o gam-drin ariannol yn cynnwys peidio â chaniatau i rywun weithio, atal rhywun rhag cynilio arian ei hun, neu gadw arian neu gardiau credyd oddi wrthynt',
    somethingElse: 'Rhywbeth Arall',
    physicalAbusePageTitle:
      "Disgrifiwch y cam-drin corfforol yn gryno os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
    psychologicalAbusePageTitle:
      "Disgrifiwch y cam-drin seicolegol yn gryno os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
    emotionalAbusePageTitle:
      "Disgrifiwch y cam-drin emosiynol yn gryno os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
    sexualAbusePageTitle:
      "Disgrifiwch y cam-drin rhywiol yn gryno os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
    financialAbusePageTitle:
      "Disgrifiwch y cam-drin ariannol yn gryno os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
    somethingElsePageTitle: 'Disgrifiwch y gamdriniaeth yn gryno os ydych yn teimlo eich bod yn gallu gwneud hynny',
    behaviourDetailsLabel: "Disgrifiwch yr ymddygiadau yr hoffech i'r llys fod yn ymwybodol ohonynt.",
    behaviourDetailsHintText:
      "Cadwch eich ateb yn fyr. Bydd cyfle i chi roi mwy o fanylion i'r llys yn ddiweddarach yn yr achos.",
    behaviourStartDateLabel: 'Pryd ddechreuodd yr ymddygiad hwn a pha mor hir wnaeth hynny barhau?',
    behaviourStartDateHintText: 'Nid oes angen i hyn fod yn union ddyddiad.',
    isOngoingBehaviourLabel: 'Ydy’r ymddygiad yn digwydd ar hyn o bryd?',
    isOngoingBehaviourHint:
      '<p class="govuk-body" for="respabuseongoing-hint">Ffoniwch 999 os oes argyfwng. Os nad yw\'n argyfwng, ystyriwch gysylltu â\'r <a href="https://www.nspcc.org.uk" class="govuk-link" rel="external" target="_blank">NSPCC</a> neu\'r <a href="https://www.gov.uk/report-child-abuse-to-local-council" class="govuk-link" rel="external" target="_blank">tîm gofal cymdeithasol yn eich cyngor  lleol</a>.</p>',
    YesOptionLabel: 'Yes - welsh',
    NoOptionLabel: 'No - welsh',
    seekHelpFromPersonOrAgencyLabel: 'Ydych chi erioed wedi gofyn am help gan unigolyn neu asiantaeth broffesiynol?',
    seekHelpFromPersonOrAgencyHintText: "Er enghraifft, siarad â'ch meddyg teulu lleol.",
    seekHelpDetailsYesHint:
      '<p class="govuk-body">Dywedwch wrth bwy wnaethoch chi ofyn am help, a beth wnaethon nhw i helpu (dewisol). </p><p class="govuk-body">Peidiwch â chynnwys manylion personol fel enwau a chyfeiriadau.</p>',
    doYouHaveSafetyConcerns: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
    whoAreConcernsAbout: 'Am bwy ydych chi’n poeni amdano/amdani?',
    select_all_relevant: "Dewiswch bob opsiwn sy'n berthnasol i'ch sefyllfa.",
    children: 'Y plant yn y cais hwn',
    respondent: 'Y plant yn y cais hwn',
    childConcerns: 'Pa fath o ymddygiad ydych chi wedi ei brofi neu mewn perygl o’i brofi?',
    applicantConcerns: 'Pa fath o ymddygiad ydych chi wedi ei brofi neu mewn perygl o’i brofi?',
    abduction: 'Herwgydio',
    childrenMoreThanOnePassport: 'A oes gan y plant fwy nag un pasbort?',
    possessionChildrenPassport: "Ym meddiant pwy y mae pasbortau'r plant?",
    c1A_policeOrInvestigatorInvolved: 'A oedd yr heddlu, ymchwilwyr preifat neu unrhyw sefydliad arall ynghlwm â hyn?',
    childDrugAbuse:
      'A yw’r plant wedi cael eu heffeithio o ganlyniad i gamddefnyddio cyffuriau, alcohol neu sylweddau?',
    otherWellBeingIssues: 'A oes gennych chi unrhyw bryderon eraill am ddiogelwch a lles y plant?',
    doWantCourtToAction: "Beth ydych chi eisiau i'r llys ei wneud i'ch cadw chi a'r plant yn ddiogel?",
    selectSupervisionAgreementLabel: "Ydych chi'n cytuno i'r plant dreulio amser gyda'r bobl eraill yn y cais hwn?",
    supervisionAgreementOtherWaysLabel:
      "Ydych chi'n cytuno i'r bobl eraill yn y cais hwn fod mewn cysylltiad â'r plant mewn ffyrdd eraill?",
    childLocation:
      "Pam ydych chi'n meddwl y gallai'r plant gael eu herwgydio neu eu cadw y tu allan i'r DU heb eich caniatâd?",
    childsCurrentLocationText: "Ble mae'r plant nawr?",
    passportOffice: "A oes gan unrhyw un o'r plant basbort?",
    haspassportOfficeNotified: "Ydy'r swyddfa basbort wedi cael gwybod?",
    abducionThreats: "Ydy'r plant wedi cael eu herwgydio neu eu cadw y tu allan i'r DU heb eich caniatâd o'r blaen?",
    previousAbduction: 'Darparwch fanylion am y digwyddiadau blaenorol o herwgydio',
  },
  Yes: 'Yes',
  No: 'No ',
};

export const cyDummyContent = {
  sectionTitles: {
    title2: '3. Eich manylion',
    title3: '4. Manylion y cais',
    title4: '5. Elfen ryngwladol',
  },
  keys: {},
};
export const cyResponseToAOH = {
  sectionTitles: {
    title: '7. Ymateb i honiadau o niwed a thrais',
  },
  keys: {
    aoh_wishToRespond: 'Ydych chi eisiau ymateb i honiadau o niwed a thrais y ceisydd?',
    aoh_responseToAllegations: 'Eich ymateb',
  },
};

const urls = {
  doYouConsent: CONSENT_TO_APPLICATION,
  reasonForNotConsenting: CONSENT_TO_APPLICATION,
  applicationReceivedDate: CONSENT_TO_APPLICATION,
  courtPermission: CONSENT_TO_APPLICATION,
  courtOrderDetails: CONSENT_TO_APPLICATION,
  proceedingsStart: PROCEEDINGS_START,
  proceedingsStartOrder: PROCEEDINGS_START,
  emergencyOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  supervisionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  careOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  childAbductionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  caOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  financialOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  nonmolestationOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  occupationalOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  marraigeOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  restrainingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  injuctiveOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  underTakingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  citizenUserFullName: RESPONDENT_PERSONAL_DETAILS,
  citizenUserDateOfBirthText: RESPONDENT_PERSONAL_DETAILS,
  citizenUserPlaceOfBirthText: RESPONDENT_PERSONAL_DETAILS,
  citizenUserAddressText: RESPONDENT_ADDRESS_DETAILS,
  postalAddress: RESPONDENT_ADDRESS_DETAILS,
  citizenUserAddressHistory: RESPONDENT_ADDRESS_HISTORY,
  citizenUserPhoneNumberText: RESPONDENT_CONTACT_DETAILS,
  citizenUserEmailAddressText: RESPONDENT_CONTACT_DETAILS,
  citizenUserLivingInRefugeText: applyParms(STAYING_IN_REFUGE, { root: PartyType.RESPONDENT }),
  refugeDocumentText: applyParms(REFUGE_UPLOAD_DOC, { root: PartyType.RESPONDENT }),
  start: INTERNATIONAL_FACTORS_START,
  iFactorsStartProvideDetails: INTERNATIONAL_FACTORS_START,
  parents: INTERNATIONAL_FACTORS_PARENTS,
  iFactorsParentsProvideDetails: INTERNATIONAL_FACTORS_PARENTS,
  jurisdiction: INTERNATIONAL_FACTORS_JURISDICTION,
  iFactorsJurisdictionProvideDetails: INTERNATIONAL_FACTORS_JURISDICTION,
  request: INTERNATIONAL_FACTORS_REQUEST,
  iFactorsRequestProvideDetails: INTERNATIONAL_FACTORS_REQUEST,
  detailsKnown: applyParms(DETAILS_KNOWN, { partyType: PartyType.RESPONDENT }),
  startAlternative: applyParms(START_ALTERNATIVE, { partyType: PartyType.RESPONDENT }),
  miamWillingness: MIAM_ATTEND_WILLINGNESS,
  miamNotWillingExplnation: MIAM_ATTEND_WILLINGNESS,
  miamStart: MIAM_START,
  legalRepresentation: LEGAL_REPRESENTATION_START,
  aoh_wishToRespond: RESPOND_TO_AOH,
  aoh_responseToAllegations: RESPONSE_TO_AOH,
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

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  userCase.refugeDocumentText = !_.isEmpty(userCase.refugeDocument)
    ? userCase.refugeDocument.document_filename
    : enContent.completeSectionError;
  populateSummaryData(userCase, content.userIdamId);

  const sections = [] as ANYTYPE;
  sections.push(
    summaryList(
      enlegalRepresntationContent,
      userCase,
      urls,
      enlegalRepresntationContent.sectionTitles.title,
      content.language
    ),
    summaryList(enConsentContent, userCase, urls, enConsentContent.sectionTitles.title, content.language),
    summaryList(enDummyContent, userCase, '', enDummyContent.sectionTitles.title2, content.language),
    summaryList(
      enKeepYourDetailsContent,
      userCase,
      urls,
      enKeepYourDetailsContent.sectionTitles.title,
      content.language
    ),
    summaryList(
      removeFields(userCase, content.additionalData?.req?.session?.user, enConfirmYourDetailsContent),
      userCase,
      urls,
      enConfirmYourDetailsContent.sectionTitles.title,
      content.language
    ),
    prepareRASummaryList('C7ConsolidatedReview', 'en', userCase),
    summaryList(enDummyContent, userCase, '', enDummyContent.sectionTitles.title3, content.language),
    summaryList(enContentMiam, userCase, urls, enContentMiam.sectionTitles.title, content.language),
    PastAndCurrentProceedings(enContentProceding, userCase, content.language),
    summaryList(enDummyContent, userCase, '', enDummyContent.sectionTitles.title4, content.language),
    SafetyConcerns(enSaftyConcern, userCase, content.language)
  );

  if (userCase.hasOwnProperty('c1A_haveSafetyConcerns') && userCase['c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    sections.push(SafetyConcerns_child(enSaftyConcern, userCase, content.language));
    if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
      sections.push(SafetyConcerns_yours(enSaftyConcern, userCase, content.language));
    }
    sections.push(SafetyConcerns_others(enSaftyConcern, userCase, content.language));
  }

  sections.push(
    summaryList(enInternationalContent, userCase, urls, enInternationalContent.sectionTitles.title, content.language)
  );
  if (userCase.aoh_wishToRespond) {
    sections.push(summaryList(enResponseToAOH, userCase, urls, enResponseToAOH.sectionTitles.title, content.language));
  }
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  userCase.refugeDocumentText = !_.isEmpty(userCase.refugeDocument)
    ? userCase.refugeDocument.document_filename
    : cyContent.completeSectionError;
  populateSummaryData(userCase, content.userIdamId);

  const sections = [] as ANYTYPE;
  sections.push(
    summaryList(
      cylegalRepresntationContent,
      userCase,
      urls,
      cylegalRepresntationContent.sectionTitles.title,
      content.language
    ),
    summaryList(cyConsentContent, userCase, urls, cyConsentContent.sectionTitles.title, content.language),
    summaryList(cyDummyContent, userCase, '', cyDummyContent.sectionTitles.title2, content.language),
    summaryList(
      cyKeepYourDetailsContent,
      userCase,
      urls,
      cyKeepYourDetailsContent.sectionTitles.title,
      content.language
    ),
    summaryList(
      removeFields(userCase, content.additionalData?.req?.session?.user, cyConfirmYourDetailsContent),
      userCase,
      urls,
      cyConfirmYourDetailsContent.sectionTitles.title,
      content.language
    ),
    prepareRASummaryList('C7ConsolidatedReview', 'cy', userCase),
    summaryList(cyDummyContent, userCase, '', cyDummyContent.sectionTitles.title3, content.language),
    summaryList(cyContentMiam, userCase, urls, cyContentMiam.sectionTitles.title, content.language),
    PastAndCurrentProceedings(cyContentProceding, userCase, content.language),
    summaryList(cyDummyContent, userCase, '', cyDummyContent.sectionTitles.title4, content.language),
    SafetyConcerns(cySaftyConcern, userCase, content.language)
  );

  if (userCase.hasOwnProperty('c1A_haveSafetyConcerns') && userCase['c1A_haveSafetyConcerns'] === YesOrNo.YES) {
    sections.push(SafetyConcerns_child(cySaftyConcern, userCase, content.language));
    if (toggleApplicantSafetyConcerns('c1A_safetyConernAbout', userCase, 'c1A_concernAboutChild')) {
      sections.push(SafetyConcerns_yours(cySaftyConcern, userCase, content.language));
    }
    sections.push(SafetyConcerns_others(cySaftyConcern, userCase, content.language));
  }

  sections.push(
    summaryList(cyInternationalContent, userCase, urls, cyInternationalContent.sectionTitles.title, content.language)
  );
  if (userCase.aoh_wishToRespond) {
    sections.push(summaryList(cyResponseToAOH, userCase, urls, cyResponseToAOH.sectionTitles.title, content.language));
  }
  return {
    ...cyContent,
    language: content.language,
    sections,
  };
};

export const form: FormContent = {
  fields: {
    declarationCheck: {
      type: 'checkboxes',
      values: [
        {
          name: 'declarationCheck',
          label: l => l.declaration,
          value: 'declaration',
        },
      ],
      validator: atLeastOneFieldIsChecked,
    },
  },
  onlyContinue: {
    text: l => l.continue,
    disabled: true,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const caseData = content.userCase as CaseWithId;
  form.onlyContinue!.disabled = caseData.isCitizenLivingInRefuge === YesOrNo.YES && _.isEmpty(caseData.refugeDocument);

  return {
    ...translations,
    form,
  };
};
