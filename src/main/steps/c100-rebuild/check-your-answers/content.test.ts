/* eslint-disable import/no-unresolved */
import { cy as CyMidiationDocument, en as EnMidiationDocument } from '.././miam/mediator-document/content';
import { C1ASafteyConcernsAbout, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../miam/domestic-abuse/content';

import { form, generateContent, sectionCountFormatter, toggleApplicantSafetyConcerns } from './content';

const enContent = {
  serviceName: 'Check your answers ',
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
const cyContent = {
  serviceName: 'Gwiriwch eich atebion',
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
      content: 'Nid yw eich cais wedi’i gyflwyno. Rhowch gynnig arall arni',
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
      Email: 'E-bost',
      'Telephone number': 'Rhif ffôn',
      'I dont know their email address': 'Nid wyf yn gwybod beth yw eu cyfeiriad e-bost',
      'I dont know their telephone number': 'Nid wyf yn gwybod beth yw eu rhif ffôn',
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

describe('testing contents en and cy', () => {
  test('en content', () => {
    expect(enContent.toString()).toEqual(enContent.toString());
    expect(enContent.keys.toString()).toEqual(enContent.keys.toString());
    expect(enContent.section.toString()).toEqual(enContent.section.toString());
  });

  test('cy content', () => {
    expect(cyContent.toString()).toEqual(cyContent.toString());
    expect(cyContent.keys.toString()).toEqual(cyContent.keys.toString());
    expect(cyContent.section.toString()).toEqual(cyContent.section.toString());
  });
});
/* eslint-disable @typescript-eslint/ban-types */
describe('Content.ts toggle test cases', () => {
  const commonContent = {
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
  } as unknown as CommonContent;
  let generatedContent;
  let generatedForm;
  let fields;
  const formContent = form as FormContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    generatedForm = generatedContent.form as FormContent;
    fields = generatedForm.fields as FormFields;
  });

  test('toggleApplicantSafetyConcerns when concerned is for child', () => {
    const safteyConcernsAboutKey = 'concerner',
      userCase = {
        concerner: ['children'],
        abuse: ['witnessingDomesticAbuse'],
      },
      childConcernsKey = 'abuse';
    expect(toggleApplicantSafetyConcerns(safteyConcernsAboutKey, userCase, childConcernsKey)).toBe(true);
  });

  test('toggleApplicantSafetyConcerns when concerned is applicant', () => {
    const safteyConcernsAboutKey = 'concerner',
      userCase = {
        concerner: ['applicant'],
      },
      childConcernsKey = 'abuse';
    expect(toggleApplicantSafetyConcerns(safteyConcernsAboutKey, userCase, childConcernsKey)).toBe(true);
  });

  test('sectionCountFormatter', () => {
    expect(sectionCountFormatter([{ title: '[^^sectionNo^^]' }, {}]).toString()).toEqual(
      [{ title: '1' }, {}].toString()
    );
  });

  test('Form should return correct content', () => {
    const formFields = formContent.fields as FormFields;
    const statementOfTruthField = formFields.statementOfTruth as FormOptions;
    expect(statementOfTruthField.type).toBe('checkboxes');
    expect(statementOfTruthField.validator).toBe(atLeastOneFieldIsChecked);
    expect((statementOfTruthField.values[0].label as Function)(generatedContent)).toBe(
      enContent.StatementOfTruth.check
    );
    expect(statementOfTruthField.values[0].value).toBe('Yes');
  });

  test('en should generate sections properly for miam_otherProceedings with safety concerns', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      userCase: {
        ...commonContent.userCase,
        sq_writtenAgreement: undefined,
        c1A_haveSafetyConcerns: 'Yes' as YesOrNo.YES,
        c1A_safetyConernAbout: ['applicant' as C1ASafteyConcernsAbout],
      },
    });
    expect(generatedEnContent.sections).toStrictEqual([
      {
        title: '1. Case name',
        rows: [
          {
            key: {
              text: 'Enter Case Name',
            },
            value: {
              text: 'test',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/case-name',
                  text: 'Edit',
                  visuallyHiddenText: 'Enter Case Name',
                },
              ],
            },
          },
        ],
      },
      {
        title: '2. Location details',
        rows: [
          {
            key: {
              text: 'Where do the children live?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/childaddress',
                  text: 'Edit',
                  visuallyHiddenText: 'Where do the children live?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '3. Type of application',
        rows: [
          {
            key: {
              text: 'Do you have a written agreement with the other people in the case that you want the court to review?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a written agreement with the other people in the case that you want the court to review?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '4. Legal representative details',
        rows: [
          {
            key: {
              text: 'Will you be using a legal representative in these proceedings?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: 'Edit',
                  visuallyHiddenText: 'Will you be using a legal representative in these proceedings?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '5. Permission to make the application',
        rows: [
          {
            key: {
              text: 'Is there any reason that you would need permission from the court to make this application?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/permission',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Is there any reason that you would need permission from the court to make this application?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '6. MIAM: Mediation Information and Assessment Meeting',
        rows: [],
      },
      {
        title: 'MIAM attendance',
        rows: [
          {
            key: {
              text: 'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)? ',
            },
            value: {
              text: 'Yes',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)? ',
                },
              ],
            },
          },
        ],
      },
      {
        title: '7. Past and current proceeding',
        rows: [
          {
            key: {
              text: 'Have the children been involved in a court case?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have the children been involved in a court case?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Have you had a court order made for your protection?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have you had a court order made for your protection?',
                },
              ],
            },
          },
        ],
      },
      {
        title: "8. What you're asking the court to decide",
        rows: [
          {
            key: {
              text: 'What are you asking the court to do?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: 'Edit',
                  visuallyHiddenText: 'What are you asking the court to do?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Describe what you want the court to do regarding the children in this application',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Describe what you want the court to do regarding the children in this application',
                },
              ],
            },
          },
        ],
      },
      {
        title: '9. Hearing details',
        rows: [
          {
            key: {
              text: 'Does your situation qualify for an urgent first hearing?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: 'Edit',
                  visuallyHiddenText: 'Does your situation qualify for an urgent first hearing?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Are you asking for a without notice hearing?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: 'Edit',
                  visuallyHiddenText: 'Are you asking for a without notice hearing?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '10. Details of the people in the application ',
        rows: [],
      },
      {
        title: "Children's details",
        rows: [],
      },
      {
        title: 'Additional details about the children',
        rows: [
          {
            key: {
              text: 'Are any of the children known to social services?',
            },
            value: {
              html: '<br>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children known to social services?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Are any of the children the subject of a child protection plan?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children the subject of a child protection plan?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Other Children details',
        rows: [
          {
            key: {
              text: 'Do you or any respondents have other children who are not part of this application?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you or any respondents have other children who are not part of this application?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Details of the applicants',
        rows: [],
      },
      {
        title: 'Details of the respondents',
        rows: [],
      },
      {
        title: 'Details of the other people in the application',
        rows: [
          {
            key: {
              text: 'Is there anyone else who should know about your application?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: 'Edit',
                  visuallyHiddenText: 'Is there anyone else who should know about your application?',
                },
              ],
            },
          },
        ],
      },
      [],
      {
        title: 'Where the children live',
        rows: [],
      },
      {
        title: '11. Safety concerns',
        rows: [
          {
            key: {
              text: 'Do you have any concerns for your safety or the safety of the children?',
            },
            value: {
              text: 'Yes',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any concerns for your safety or the safety of the children?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Who are you concerned about?',
            },
            value: {
              html: '<ul><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">Yourself</li></ul>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/concern-about',
                  text: 'Edit',
                  visuallyHiddenText: 'Who are you concerned about?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Safety concerns: the children in the application ',
        rows: [
          {
            key: {
              text: 'What type of behaviour have the children experienced or are at risk of experiencing?',
            },
            value: {
              html: '<ul></ul>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/child/concerns-about',
                  text: 'Edit',
                  visuallyHiddenText:
                    'What type of behaviour have the children experienced or are at risk of experiencing?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Safety concern: your safety',
        rows: [
          {
            key: {
              text: 'What type of behaviour have the children experienced or are at risk of experiencing?',
            },
            value: {
              html: '<ul><ul>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/applicant/concerns-about',
                  text: 'Edit',
                  visuallyHiddenText:
                    'What type of behaviour have the children experienced or are at risk of experiencing?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Safety concern: other concerns that you have',
        rows: [
          {
            key: {
              text: 'Have the children been impacted by drug, alcohol or substance abuse?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/other-concerns/drugs',
                  text: 'Edit',
                  visuallyHiddenText: 'Have the children been impacted by drug, alcohol or substance abuse?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Do you have any other concerns about the children’s safety and wellbeing?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/other-concerns/other-issues',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any other concerns about the children’s safety and wellbeing?',
                },
              ],
            },
          },
          {
            key: {
              text: 'What do you want the court to do to keep you and the children safe?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/orders-required/court-action',
                  text: 'Edit',
                  visuallyHiddenText: 'What do you want the court to do to keep you and the children safe?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Do you agree to the children spending time with the other people in this application?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/orders-required/unsupervised',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you agree to the children spending time with the other people in this application?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Do you agree to the other people in this application being in touch with the children in other ways?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/orders-required/unsupervised',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you agree to the other people in this application being in touch with the children in other ways?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '12. International elements',
        rows: [
          {
            key: {
              text: "Are the children's lives mainly based outside of England and Wales?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/start',
                  text: 'Edit',
                  visuallyHiddenText: "Are the children's lives mainly based outside of England and Wales?",
                },
              ],
            },
          },
          {
            key: {
              text: "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/parents',
                  text: 'Edit',
                  visuallyHiddenText:
                    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
                },
              ],
            },
          },
          {
            key: {
              text: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Could another person in the application apply for a similar order in a country outside England or Wales?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Has another country asked (or been asked) for information or help for the children?',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/request',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has another country asked (or been asked) for information or help for the children?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '13. Support you need during your case',
        rows: [
          {
            key: {
              text: 'Your support',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/applicant/reasonable-adjustments/guidance',
                  text: 'Edit',
                  visuallyHiddenText: 'Your support',
                },
              ],
            },
          },
        ],
      },
      {
        title: '14. Help with Fees',
        rows: [
          {
            key: {
              text: 'Do you need help with paying the fee for this application?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you need help with paying the fee for this application?',
                },
              ],
            },
          },
        ],
      },
    ]);
  });

  test('en should generate sections properly for miam urgency', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      userCase: {
        ...commonContent.userCase,
        sq_writtenAgreement: undefined,
        miam_otherProceedings: undefined,
        miam_urgency: ['test'],
      },
    });
    expect(generatedEnContent.sections).toStrictEqual([
      {
        title: '1. Case name',
        rows: [
          {
            key: {
              text: 'Enter Case Name',
            },
            value: {
              text: 'test',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/case-name',
                  text: 'Edit',
                  visuallyHiddenText: 'Enter Case Name',
                },
              ],
            },
          },
        ],
      },
      {
        title: '2. Location details',
        rows: [
          {
            key: {
              text: 'Where do the children live?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/childaddress',
                  text: 'Edit',
                  visuallyHiddenText: 'Where do the children live?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '3. Type of application',
        rows: [
          {
            key: {
              text: 'Do you have a written agreement with the other people in the case that you want the court to review?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a written agreement with the other people in the case that you want the court to review?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '4. Legal representative details',
        rows: [
          {
            key: {
              text: 'Will you be using a legal representative in these proceedings?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: 'Edit',
                  visuallyHiddenText: 'Will you be using a legal representative in these proceedings?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '5. Permission to make the application',
        rows: [
          {
            key: {
              text: 'Is there any reason that you would need permission from the court to make this application?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/permission',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Is there any reason that you would need permission from the court to make this application?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '6. MIAM: Mediation Information and Assessment Meeting',
        rows: [],
      },
      {
        title: 'MIAM attendance',
        rows: [
          {
            key: {
              text: 'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)? ',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)? ',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'MIAM exemption',
        rows: [
          {
            key: {
              text: 'What are your valid reasons for not attending a MIAM?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/miam/general-reasons',
                  text: 'Edit',
                  visuallyHiddenText: 'What are your valid reasons for not attending a MIAM?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '7. Hearing details',
        rows: [
          {
            key: {
              text: 'Does your situation qualify for an urgent first hearing?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: 'Edit',
                  visuallyHiddenText: 'Does your situation qualify for an urgent first hearing?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Are you asking for a without notice hearing?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: 'Edit',
                  visuallyHiddenText: 'Are you asking for a without notice hearing?',
                },
              ],
            },
          },
        ],
      },
      {
        title: "8. What you're asking the court to decide",
        rows: [
          {
            key: {
              text: 'What are you asking the court to do?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: 'Edit',
                  visuallyHiddenText: 'What are you asking the court to do?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Describe what you want the court to do regarding the children in this application',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Describe what you want the court to do regarding the children in this application',
                },
              ],
            },
          },
        ],
      },
      {
        title: '9. Details of the people in the application ',
        rows: [],
      },
      {
        title: "Children's details",
        rows: [],
      },
      {
        title: 'Additional details about the children',
        rows: [
          {
            key: {
              text: 'Are any of the children known to social services?',
            },
            value: {
              html: '<br>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children known to social services?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Are any of the children the subject of a child protection plan?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children the subject of a child protection plan?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Other Children details',
        rows: [
          {
            key: {
              text: 'Do you or any respondents have other children who are not part of this application?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you or any respondents have other children who are not part of this application?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Details of the applicants',
        rows: [],
      },
      {
        title: 'Details of the respondents',
        rows: [],
      },
      {
        title: 'Details of the other people in the application',
        rows: [
          {
            key: {
              text: 'Is there anyone else who should know about your application?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: 'Edit',
                  visuallyHiddenText: 'Is there anyone else who should know about your application?',
                },
              ],
            },
          },
        ],
      },
      [],
      {
        title: 'Where the children live',
        rows: [],
      },
      {
        title: '10. Past and current proceeding',
        rows: [
          {
            key: {
              text: 'Have the children been involved in a court case?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have the children been involved in a court case?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Have you had a court order made for your protection?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have you had a court order made for your protection?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '11. Safety concerns',
        rows: [
          {
            key: {
              text: 'Do you have any concerns for your safety or the safety of the children?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any concerns for your safety or the safety of the children?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '12. International elements',
        rows: [
          {
            key: {
              text: "Are the children's lives mainly based outside of England and Wales?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/start',
                  text: 'Edit',
                  visuallyHiddenText: "Are the children's lives mainly based outside of England and Wales?",
                },
              ],
            },
          },
          {
            key: {
              text: "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/parents',
                  text: 'Edit',
                  visuallyHiddenText:
                    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
                },
              ],
            },
          },
          {
            key: {
              text: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Could another person in the application apply for a similar order in a country outside England or Wales?',
                },
              ],
            },
          },
          {
            key: {
              text: 'Has another country asked (or been asked) for information or help for the children?',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/request',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has another country asked (or been asked) for information or help for the children?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '13. Support you need during your case',
        rows: [
          {
            key: {
              text: 'Your support',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/applicant/reasonable-adjustments/guidance',
                  text: 'Edit',
                  visuallyHiddenText: 'Your support',
                },
              ],
            },
          },
        ],
      },
      {
        title: '14. Help with Fees',
        rows: [
          {
            key: {
              text: 'Do you need help with paying the fee for this application?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you need help with paying the fee for this application?',
                },
              ],
            },
          },
        ],
      },
    ]);
  });

  test('cy should generate sections properly for miam urgency', () => {
    const generatedCyContent = generateContent({
      ...commonContent,
      userCase: {
        ...commonContent.userCase,
        sq_writtenAgreement: undefined,
        miam_otherProceedings: undefined,
        miam_urgency: ['test'],
      },
      language: 'cy',
    });

    expect(generatedCyContent.sections).toStrictEqual([
      {
        title: '1. Enw’r Achos',
        rows: [
          {
            key: {
              text: "Enw'r achos",
            },
            value: {
              text: 'test',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/case-name',
                  text: ' Golygu',
                  visuallyHiddenText: "Enw'r achos",
                },
              ],
            },
          },
        ],
      },
      {
        title: '2. Manylion lleoliad',
        rows: [
          {
            key: {
              text: "Ble mae'r plant yn byw?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/childaddress',
                  text: ' Golygu',
                  visuallyHiddenText: "Ble mae'r plant yn byw?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '3. Math o gais',
        rows: [
          {
            key: {
              text: "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '4. Manylion cynrychiolydd cyfreithiol',
        rows: [
          {
            key: {
              text: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '5. Caniatâd i wneud cais',
        rows: [
          {
            key: {
              text: 'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/permission',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '6. MIAM: Cyfarfod Asesu a Gwybodaeth am Gyfryngu',
        rows: [],
      },
      {
        title: 'Mynychu MIAM',
        rows: [
          {
            key: {
              text: 'A yw’r plant ynghlwm ag unrhyw achos diogelu, gofal neu oruchwyliaeth brys (neu a fuont ynghlwm ag achosion o’r fath)?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A yw’r plant ynghlwm ag unrhyw achos diogelu, gofal neu oruchwyliaeth brys (neu a fuont ynghlwm ag achosion o’r fath)?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Esemptiad MIAM',
        rows: [
          {
            key: {
              text: 'Beth yw eich rhesymau dilys dros beidio â mynychu MIAM?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/miam/general-reasons',
                  text: ' Golygu',
                  visuallyHiddenText: 'Beth yw eich rhesymau dilys dros beidio â mynychu MIAM?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '7.  Manylion y gwrandawiad',
        rows: [
          {
            key: {
              text: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
                },
              ],
            },
          },
          {
            key: {
              text: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: ' Golygu',
                  visuallyHiddenText: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '8. Beth yr ydych chi’n gofyn i’r llys ei benderfynu',
        rows: [
          {
            key: {
              text: "Beth ydych chi'n gofyn i'r llys ei wneud?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: ' Golygu',
                  visuallyHiddenText: "Beth ydych chi'n gofyn i'r llys ei wneud?",
                },
              ],
            },
          },
          {
            key: {
              text: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
                },
              ],
            },
          },
        ],
      },
      {
        title: '9. Manylion y bobl yn y cais',
        rows: [],
      },
      {
        title: 'Manylion y plant',
        rows: [],
      },
      {
        title: 'Manylion ychwanegol am y plant',
        rows: [
          {
            key: {
              text: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
            },
            value: {
              html: '<br>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
                },
              ],
            },
          },
          {
            key: {
              text: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Manylion plant eraill',
        rows: [
          {
            key: {
              text: 'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Manylion y ceiswyr',
        rows: [],
      },
      {
        title: 'Manylion yr atebwyr',
        rows: [],
      },
      {
        title: 'Manylion y bobl eraill yn y cais',
        rows: [
          {
            key: {
              text: 'A oes unrhyw un arall y dylai wybod am eich cais?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes unrhyw un arall y dylai wybod am eich cais?',
                },
              ],
            },
          },
        ],
      },
      [],
      {
        title: 'Ble mae’r plant yn byw',
        rows: [],
      },
      {
        title: '10. Achosion yn y gorffennol ac achosion cyfredol',
        rows: [
          {
            key: {
              text: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
                },
              ],
            },
          },
          {
            key: {
              text: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '11. Pryderon am ddiogelwch',
        rows: [
          {
            key: {
              text: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '12. Elfennau rhyngwladol',
        rows: [
          {
            key: {
              text: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/start',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
                },
              ],
            },
          },
          {
            key: {
              text: "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/parents',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
                },
              ],
            },
          },
          {
            key: {
              text: 'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
                },
              ],
            },
          },
          {
            key: {
              text: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/request',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '13. Cefnogaeth y mae arnoch ei hangen yn ystod eich achos',
        rows: [
          {
            key: {
              text: 'Your support - welsh',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/applicant/reasonable-adjustments/guidance',
                  text: ' Golygu',
                  visuallyHiddenText: 'Your support - welsh',
                },
              ],
            },
          },
        ],
      },
      {
        title: '14.  Help i dalu ffioedd',
        rows: [
          {
            key: {
              text: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: ' Golygu',
                  visuallyHiddenText: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
                },
              ],
            },
          },
        ],
      },
    ]);
  });

  test('cy should generate sections properly for sq_writtenAgreement', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      language: 'cy',
    });
    expect(generatedEnContent.sections).toStrictEqual([
      {
        title: '1. Enw’r Achos',
        rows: [
          {
            key: {
              text: "Enw'r achos",
            },
            value: {
              text: 'test',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/case-name',
                  text: ' Golygu',
                  visuallyHiddenText: "Enw'r achos",
                },
              ],
            },
          },
        ],
      },
      {
        title: '2. Manylion lleoliad',
        rows: [
          {
            key: {
              text: "Ble mae'r plant yn byw?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/childaddress',
                  text: ' Golygu',
                  visuallyHiddenText: "Ble mae'r plant yn byw?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '3. Math o gais',
        rows: [
          {
            key: {
              text: "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
            },
            value: {
              text: 'Oes',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '4. Beth yr ydych chi’n gofyn i’r llys ei benderfynu',
        rows: [
          {
            key: {
              text: "Beth ydych chi'n gofyn i'r llys ei wneud?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: ' Golygu',
                  visuallyHiddenText: "Beth ydych chi'n gofyn i'r llys ei wneud?",
                },
              ],
            },
          },
          {
            key: {
              text: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
                },
              ],
            },
          },
        ],
      },
      {
        title: '5.  Manylion y gwrandawiad',
        rows: [
          {
            key: {
              text: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
                },
              ],
            },
          },
          {
            key: {
              text: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: ' Golygu',
                  visuallyHiddenText: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '6. Manylion y bobl yn y cais',
        rows: [],
      },
      {
        title: 'Manylion y plant',
        rows: [],
      },
      {
        title: 'Manylion ychwanegol am y plant',
        rows: [
          {
            key: {
              text: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
            },
            value: {
              html: '<br>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
                },
              ],
            },
          },
          {
            key: {
              text: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Manylion plant eraill',
        rows: [
          {
            key: {
              text: 'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Manylion y ceiswyr',
        rows: [],
      },
      {
        title: 'Manylion yr atebwyr',
        rows: [],
      },
      {
        title: 'Manylion y bobl eraill yn y cais',
        rows: [
          {
            key: {
              text: 'A oes unrhyw un arall y dylai wybod am eich cais?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes unrhyw un arall y dylai wybod am eich cais?',
                },
              ],
            },
          },
        ],
      },
      [],
      {
        title: 'Ble mae’r plant yn byw',
        rows: [],
      },
      {
        title: '7. Achosion yn y gorffennol ac achosion cyfredol',
        rows: [
          {
            key: {
              text: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
                },
              ],
            },
          },
          {
            key: {
              text: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '8. Pryderon am ddiogelwch',
        rows: [
          {
            key: {
              text: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '9. Elfennau rhyngwladol',
        rows: [
          {
            key: {
              text: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/start',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
                },
              ],
            },
          },
          {
            key: {
              text: "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/parents',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
                },
              ],
            },
          },
          {
            key: {
              text: 'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
                },
              ],
            },
          },
          {
            key: {
              text: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/request',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '10. Cefnogaeth y mae arnoch ei hangen yn ystod eich achos',
        rows: [
          {
            key: {
              text: 'Your support - welsh',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/applicant/reasonable-adjustments/guidance',
                  text: ' Golygu',
                  visuallyHiddenText: 'Your support - welsh',
                },
              ],
            },
          },
        ],
      },
      {
        title: '11.  Help i dalu ffioedd',
        rows: [
          {
            key: {
              text: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: ' Golygu',
                  visuallyHiddenText: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
                },
              ],
            },
          },
        ],
      },
    ]);
  });

  test('cy should generate sections properly for miam_otherProceedings', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      language: 'cy',
      userCase: {
        ...commonContent.userCase,
        sq_writtenAgreement: undefined,
      },
    });
    expect(generatedEnContent.sections).toStrictEqual([
      {
        title: '1. Enw’r Achos',
        rows: [
          {
            key: {
              text: "Enw'r achos",
            },
            value: {
              text: 'test',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/case-name',
                  text: ' Golygu',
                  visuallyHiddenText: "Enw'r achos",
                },
              ],
            },
          },
        ],
      },
      {
        title: '2. Manylion lleoliad',
        rows: [
          {
            key: {
              text: "Ble mae'r plant yn byw?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/childaddress',
                  text: ' Golygu',
                  visuallyHiddenText: "Ble mae'r plant yn byw?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '3. Math o gais',
        rows: [
          {
            key: {
              text: "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '4. Manylion cynrychiolydd cyfreithiol',
        rows: [
          {
            key: {
              text: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '5. Caniatâd i wneud cais',
        rows: [
          {
            key: {
              text: 'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/permission',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '6. MIAM: Cyfarfod Asesu a Gwybodaeth am Gyfryngu',
        rows: [],
      },
      {
        title: 'Mynychu MIAM',
        rows: [
          {
            key: {
              text: 'A yw’r plant ynghlwm ag unrhyw achos diogelu, gofal neu oruchwyliaeth brys (neu a fuont ynghlwm ag achosion o’r fath)?',
            },
            value: {
              text: 'Ydyn',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A yw’r plant ynghlwm ag unrhyw achos diogelu, gofal neu oruchwyliaeth brys (neu a fuont ynghlwm ag achosion o’r fath)?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '7. Achosion yn y gorffennol ac achosion cyfredol',
        rows: [
          {
            key: {
              text: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
                },
              ],
            },
          },
          {
            key: {
              text: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '8. Beth yr ydych chi’n gofyn i’r llys ei benderfynu',
        rows: [
          {
            key: {
              text: "Beth ydych chi'n gofyn i'r llys ei wneud?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: ' Golygu',
                  visuallyHiddenText: "Beth ydych chi'n gofyn i'r llys ei wneud?",
                },
              ],
            },
          },
          {
            key: {
              text: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
                },
              ],
            },
          },
        ],
      },
      {
        title: '9.  Manylion y gwrandawiad',
        rows: [
          {
            key: {
              text: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
                },
              ],
            },
          },
          {
            key: {
              text: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: ' Golygu',
                  visuallyHiddenText: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '10. Manylion y bobl yn y cais',
        rows: [],
      },
      {
        title: 'Manylion y plant',
        rows: [],
      },
      {
        title: 'Manylion ychwanegol am y plant',
        rows: [
          {
            key: {
              text: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
            },
            value: {
              html: '<br>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
                },
              ],
            },
          },
          {
            key: {
              text: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Manylion plant eraill',
        rows: [
          {
            key: {
              text: 'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Manylion y ceiswyr',
        rows: [],
      },
      {
        title: 'Manylion yr atebwyr',
        rows: [],
      },
      {
        title: 'Manylion y bobl eraill yn y cais',
        rows: [
          {
            key: {
              text: 'A oes unrhyw un arall y dylai wybod am eich cais?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes unrhyw un arall y dylai wybod am eich cais?',
                },
              ],
            },
          },
        ],
      },
      [],
      {
        title: 'Ble mae’r plant yn byw',
        rows: [],
      },
      {
        title: '11. Pryderon am ddiogelwch',
        rows: [
          {
            key: {
              text: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '12. Elfennau rhyngwladol',
        rows: [
          {
            key: {
              text: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/start',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
                },
              ],
            },
          },
          {
            key: {
              text: "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/parents',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
                },
              ],
            },
          },
          {
            key: {
              text: 'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
                },
              ],
            },
          },
          {
            key: {
              text: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/request',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '13. Cefnogaeth y mae arnoch ei hangen yn ystod eich achos',
        rows: [
          {
            key: {
              text: 'Your support - welsh',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/applicant/reasonable-adjustments/guidance',
                  text: ' Golygu',
                  visuallyHiddenText: 'Your support - welsh',
                },
              ],
            },
          },
        ],
      },
      {
        title: '14.  Help i dalu ffioedd',
        rows: [
          {
            key: {
              text: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: ' Golygu',
                  visuallyHiddenText: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
                },
              ],
            },
          },
        ],
      },
    ]);
  });

  test('cy should generate sections properly for other scenarios', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      language: 'cy',
      userCase: {
        ...commonContent.userCase,
        sq_writtenAgreement: undefined,
        miam_otherProceedings: undefined,
      },
    });
    expect(generatedEnContent.sections).toStrictEqual([
      {
        title: '1. Enw’r Achos',
        rows: [
          {
            key: {
              text: "Enw'r achos",
            },
            value: {
              text: 'test',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/case-name',
                  text: ' Golygu',
                  visuallyHiddenText: "Enw'r achos",
                },
              ],
            },
          },
        ],
      },
      {
        title: '2. Manylion lleoliad',
        rows: [
          {
            key: {
              text: "Ble mae'r plant yn byw?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/childaddress',
                  text: ' Golygu',
                  visuallyHiddenText: "Ble mae'r plant yn byw?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '3. Math o gais',
        rows: [
          {
            key: {
              text: "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '4. Manylion cynrychiolydd cyfreithiol',
        rows: [
          {
            key: {
              text: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '5. Caniatâd i wneud cais',
        rows: [
          {
            key: {
              text: 'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/screening-questions/permission',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '6. MIAM: Cyfarfod Asesu a Gwybodaeth am Gyfryngu',
        rows: [],
      },
      {
        title: 'Mynychu MIAM',
        rows: [
          {
            key: {
              text: 'A yw’r plant ynghlwm ag unrhyw achos diogelu, gofal neu oruchwyliaeth brys (neu a fuont ynghlwm ag achosion o’r fath)?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A yw’r plant ynghlwm ag unrhyw achos diogelu, gofal neu oruchwyliaeth brys (neu a fuont ynghlwm ag achosion o’r fath)?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Esemptiad MIAM',
        rows: [
          {
            key: {
              text: 'Beth yw eich rhesymau dilys dros beidio â mynychu MIAM?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/miam/general-reasons',
                  text: ' Golygu',
                  visuallyHiddenText: 'Beth yw eich rhesymau dilys dros beidio â mynychu MIAM?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '7. Beth yr ydych chi’n gofyn i’r llys ei benderfynu',
        rows: [
          {
            key: {
              text: "Beth ydych chi'n gofyn i'r llys ei wneud?",
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: ' Golygu',
                  visuallyHiddenText: "Beth ydych chi'n gofyn i'r llys ei wneud?",
                },
              ],
            },
          },
          {
            key: {
              text: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
                },
              ],
            },
          },
        ],
      },
      {
        title: '8.  Manylion y gwrandawiad',
        rows: [
          {
            key: {
              text: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
                },
              ],
            },
          },
          {
            key: {
              text: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: ' Golygu',
                  visuallyHiddenText: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '9. Manylion y bobl yn y cais',
        rows: [],
      },
      {
        title: 'Manylion y plant',
        rows: [],
      },
      {
        title: 'Manylion ychwanegol am y plant',
        rows: [
          {
            key: {
              text: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
            },
            value: {
              html: '<br>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
                },
              ],
            },
          },
          {
            key: {
              text: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Manylion plant eraill',
        rows: [
          {
            key: {
              text: 'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
                },
              ],
            },
          },
        ],
      },
      {
        title: 'Manylion y ceiswyr',
        rows: [],
      },
      {
        title: 'Manylion yr atebwyr',
        rows: [],
      },
      {
        title: 'Manylion y bobl eraill yn y cais',
        rows: [
          {
            key: {
              text: 'A oes unrhyw un arall y dylai wybod am eich cais?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes unrhyw un arall y dylai wybod am eich cais?',
                },
              ],
            },
          },
        ],
      },
      [],
      {
        title: 'Ble mae’r plant yn byw',
        rows: [],
      },
      {
        title: '10. Achosion yn y gorffennol ac achosion cyfredol',
        rows: [
          {
            key: {
              text: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
                },
              ],
            },
          },
          {
            key: {
              text: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '11. Pryderon am ddiogelwch',
        rows: [
          {
            key: {
              text: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
                },
              ],
            },
          },
        ],
      },
      {
        title: '12. Elfennau rhyngwladol',
        rows: [
          {
            key: {
              text: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/start',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
                },
              ],
            },
          },
          {
            key: {
              text: "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/parents',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
                },
              ],
            },
          },
          {
            key: {
              text: 'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
                },
              ],
            },
          },
          {
            key: {
              text: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
            },
            value: {
              html: '<p></p>',
            },
            actions: {
              items: [
                {
                  href: '/c100-rebuild/international-elements/request',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
                },
              ],
            },
          },
        ],
      },
      {
        title: '13. Cefnogaeth y mae arnoch ei hangen yn ystod eich achos',
        rows: [
          {
            key: {
              text: 'Your support - welsh',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/applicant/reasonable-adjustments/guidance',
                  text: ' Golygu',
                  visuallyHiddenText: 'Your support - welsh',
                },
              ],
            },
          },
        ],
      },
      {
        title: '14.  Help i dalu ffioedd',
        rows: [
          {
            key: {
              text: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
            },
            value: {},
            actions: {
              items: [
                {
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: ' Golygu',
                  visuallyHiddenText: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
                },
              ],
            },
          },
        ],
      },
    ]);
  });

  test('generateContent without hwf conditions', () => {
    expect(fields.statementOftruthHeading.type).toBe('textAndHtml');
    expect(fields.statementOftruthHeading.textAndHtml).toBe('<h1>Statement of Truth </h1>');

    expect(fields.statementOftruthSubHeading.type).toBe('textAndHtml');
    expect(fields.statementOftruthSubHeading.textAndHtml).toBe(
      "<h2 class='govuk-heading-m govuk-!-padding-bottom-4'>Confirm before you submit the application </h2>"
    );

    expect(fields.statementOftruthWarning.type).toBe('warning');
    expect(fields.statementOftruthWarning.label).toBe(enContent.StatementOfTruth.warning);

    expect(fields.statementOftruthInset.type).toBe('inset');
    expect(fields.statementOftruthInset.label).toBe(enContent.StatementOfTruth.insetTextPayAndSubmit);

    expect(fields.statementOftruthLastPara.type).toBe('textAndHtml');
    expect(fields.statementOftruthLastPara.textAndHtml).toBe(
      '<br>This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.<br><br><br>'
    );

    expect((form?.submit?.text as LanguageLookup)(generatedContent)).toBe(
      enContent.StatementOfTruth.payAndSubmitButton
    );
  });

  test('generateContent with hwf conditions', () => {
    generatedContent = generateContent({
      ...commonContent,
      userCase: {
        hwf_needHelpWithFees: 'Yes' as YesOrNo,
        helpWithFeesReferenceNumber: '1234',
      },
    });

    expect(fields.statementOftruthHeading.type).toBe('textAndHtml');
    expect(fields.statementOftruthHeading.textAndHtml).toBe('<h1>Statement of Truth </h1>');

    expect(fields.statementOftruthSubHeading.type).toBe('textAndHtml');
    expect(fields.statementOftruthSubHeading.textAndHtml).toBe(
      "<h2 class='govuk-heading-m govuk-!-padding-bottom-4'>Confirm before you submit the application </h2>"
    );

    expect(fields.statementOftruthWarning.type).toBe('warning');
    expect(fields.statementOftruthWarning.label).toBe(enContent.StatementOfTruth.warning);

    expect(fields.statementOftruthInset.type).toBe('inset');
    expect(fields.statementOftruthInset.label).toBe(enContent.StatementOfTruth.insetTextSubmit);

    expect(fields.statementOftruthLastPara.type).toBe('textAndHtml');
    expect(fields.statementOftruthLastPara.textAndHtml).toBe(
      '<br>This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.<br><br><br>'
    );

    expect((form?.submit?.text as LanguageLookup)(generatedContent)).toBe(enContent.StatementOfTruth.SubmitButton);
  });
});
