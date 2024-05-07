/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cy as CyMidiationDocument, en as EnMidiationDocument } from '.././miam/mediator-document/content';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../miam/domestic-abuse/content';

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
    contactPrefernces: 'Contact preferences',
    child: 'Child',
    reasonForNotAttendingMiam: 'What are your valid reasons for not attending a MIAM?',
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
    detailofOtherPeople: 'Manylion y bobl eraill yn y cais',
    reasonAbleAdjustment: '[^^sectionNo^^]. Cefnogaeth y mae arnoch ei hangen yn ystod eich achos', //section 12
  },
  keys: {
    wantingCourtToDo: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
    qualifyForUrgentHearing: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
    askingNoHearing: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
    phoneNumber: ' Rhif ffôn',
    emailAddress: 'C Rhif cyswllt yr un a enwir yn y cais',
    domesticVoilenceHeading: DomesticAbuseCy().title,
    childProtectionHeading: ChildProtectionCy().title,
    midatatorDocumentTitle: CyMidiationDocument().title,
    previousAddress: 'Cyfeiriad blaenorol',
    none: 'dim',
    details: 'Manylion',
    fullName: 'Enw llawn',
    respondents: 'Atebydd',
    urgentHearingHeading:
      'Oes angen gwrandawiad brys arnoch chi am eich bod chi neu’r plant mewn perygl am unrhyw un o’r rhesymau canlynol?',
    previousMIAMOrExemptHeading:
      'A allwch chi gadarnhau eich bod wedi mynychu MIAM yn flaenorol, neu fod gennych reswm dilys dros beidio â mynychu?’,',
    validExemptionHeading:
      'A allwch chi gadarnhau bod unrhyw un o’r rhesymau dilys eraill dros beidio â mynychu MIAM yn berthnasol?',
    //child concern screens
    detailsOfChildConcern: 'Disgrifiwch y  [***] [^^^] yn fyr os ydych yn teimlo eich bod yn gallu gwneud hynny',
    concerns: 'pryderon',
    againstChild: 'yn erbyn y plentyn',
    applicantDetails: 'Ceisydd [^^^] - Eich manylion',
    //respondent-details
    relationshipTo: 'Perthynas â',
    whoDoesLiveWith: 'Gyda phwy mae [^childName^] yn byw ar hyn o bryd?',
    otherPerson: 'Rhywun arall',
    contactDetailsOf: 'Manylion cyswllt [^applicantName^]',
    addressDetails: 'Manylion cyfeiriad',
    doNotHaveParentalResponsibility: 'Nid oes gennyf gyfrifoldeb rhiant dros y plant',
    courtOrderPrevent: 'Mae gorchymyn llys sy’n fy rhwystro rhag gwneud cais heb gael caniatâd gan y llys yn gyntaf',
    anotherReason: 'Rheswm arall',
    dontKnow: 'Ddim yn gwybod',
    contactPrefernces: 'Dewisiadau cyswllt',
    child: 'Plant',
    reasonForNotAttendingMiam: 'Beth yw eich rhesymau dilys dros beidio â mynychu MIAM?',
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
export const peopleSections = (userCase, contentLanguage, language) => {
  const otherPeopleSection =
    userCase.hasOwnProperty('oprs_otherPersonCheck') && userCase['oprs_otherPersonCheck'] === YesOrNo.YES
      ? OtherPeopleDetails(contentLanguage, userCase, language)
      : [];
  return [
    PeopleDetails(contentLanguage),
    ChildernDetails(contentLanguage, userCase, language),
    ChildernDetailsAdditional(contentLanguage, userCase, language),
    OtherChildrenDetails(contentLanguage, userCase, language),
    ApplicantDetails(contentLanguage, userCase, language),
    RespondentDetails(contentLanguage, userCase, language),
    OtherPeopleDetailsTitle(contentLanguage, userCase, language),
    otherPeopleSection,
    whereDoChildLive(contentLanguage, userCase),
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
      CaseName(contentLanguage, userCase),
      LocationDetails(contentLanguage, userCase),
      TypeOfApplication(contentLanguage, userCase, language),
    ],
    ScreeingQuestions: [
      LegalRepresentativeDetails(contentLanguage, userCase, language),
      PermissionForApplication(contentLanguage, userCase, language),
    ],
    MIAM_ALL: [MiamTitle(contentLanguage), MiamAttendance(contentLanguage, userCase, language)],
    IE_RA_HF: [
      InternationalElement(contentLanguage, userCase, language),
      reasonableAdjustment(contentLanguage, userCase),
      HelpWithFee(contentLanguage, userCase, language),
    ],
  };
};
export const CheckYourAnswerFlow1 = (userCase, contentLanguage, language) => {
  return [
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).PostCodeAndTypeOfApplication,
    TypeOfOrder(contentLanguage, userCase),
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
    TypeOfOrder(contentLanguage, userCase),
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
    MiamExemption(newContents, userCase),
    WithoutNoticeHearing(contentLanguage, userCase, language),
    TypeOfOrder(contentLanguage, userCase),
    peopleSections(userCase, contentLanguage, language),
    PastAndCurrentProceedings(contentLanguage, userCase, language),
    SafetyConcerns(contentLanguage, userCase, language),
    ...safteyConcenFilledSection(userCase, contentLanguage, language),
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).IE_RA_HF,
  ];
};
// if user selects No for valid excemptions on maim_exemption
export const CheckYourAnswerFlow4 = (userCase, contentLanguage, newContents, language) => {
  return [
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).PostCodeAndTypeOfApplication,
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).ScreeingQuestions,
    ...commonSectionsForContentLoader(contentLanguage, userCase, language).MIAM_ALL,
    MiamExemption(newContents, userCase),
    TypeOfOrder(contentLanguage, userCase),
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
  let sections;
  // if on sreening screen enable Yes
  if (userCase.hasOwnProperty('sq_writtenAgreement') && userCase['sq_writtenAgreement'] === YesOrNo.YES) {
    sections = CheckYourAnswerFlow1(userCase, enContent, content.language).flat() as ANYTYPE;
  } else {
    if (userCase.hasOwnProperty('miam_otherProceedings') && userCase['miam_otherProceedings'] === YesOrNo.YES) {
      sections = CheckYourAnswerFlow2(userCase, enContent, content.language).flat() as ANYTYPE;
    } else {
      //if miam urgency is requested miam_urgency
      // if (userCase['miam_urgency'] && userCase.hasOwnProperty('miam_urgency') && userCase['miam_urgency'] !== 'none') {
      //   sections = CheckYourAnswerFlow3(userCase, enContent, newEnContents, content.language).flat() as ANYTYPE;
      // } else {
      //   sections = CheckYourAnswerFlow4(userCase, enContent, newEnContents, content.language).flat() as ANYTYPE;
      // }
    }
  }
  sections = sectionCountFormatter(sections);
  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

export const cy = (content: CommonContent, newCyContents?: ANYTYPE) => {
  const userCase = content.userCase!;
  let sections;
  // if on sreening screen enable Yes
  if (userCase.hasOwnProperty('sq_writtenAgreement') && userCase['sq_writtenAgreement'] === YesOrNo.YES) {
    sections = CheckYourAnswerFlow1(userCase, cyContent, content.language).flat() as ANYTYPE;
  } else {
    if (userCase.hasOwnProperty('miam_otherProceedings') && userCase['miam_otherProceedings'] === YesOrNo.YES) {
      sections = CheckYourAnswerFlow2(userCase, cyContent, content.language).flat() as ANYTYPE;
    } else {
      //if miam urgency is requested miam_urgency
      // if (userCase['miam_urgency'] && userCase.hasOwnProperty('miam_urgency') && userCase['miam_urgency'] !== 'none') {
      //   sections = CheckYourAnswerFlow3(userCase, cyContent, newCyContents, content.language).flat() as ANYTYPE;
      // } else {
      //   sections = CheckYourAnswerFlow4(userCase, cyContent, newCyContents, content.language).flat() as ANYTYPE;
      // }
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
