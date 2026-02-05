/* eslint-disable import/no-unresolved */
import { cy as CyMidiationDocument, en as EnMidiationDocument } from '.././miam/mediator-document/content';
import { CaseWithId, Miam_urgency } from '../../../app/case/case';
import { C1ASafteyConcernsAbout, MiamNonAttendReason, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { cy as ChildProtectionCy, en as ChildProtectionEn } from '../miam/child-protection/content';
import { cy as DomesticAbuseCy, en as DomesticAbuseEn } from '../miam/domestic-abuse/domestic-abuse/content';

import { form, generateContent, sectionCountFormatter, toggleApplicantSafetyConcerns } from './content';

jest.mock('../validation/util.ts', () => {
  return {
    isAllMandatoryFieldsFilled: jest.fn().mockReturnValue(true),
    getAllMandatoryFields: jest.fn().mockReturnValue([]),
  };
});

const enContent = {
  section: '',
  title: 'Check your answers to your C100 application',
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
    wantingCourtToDo: 'describe what you want the court to do regarding the children in this application',
    qualifyForUrgentHearing: 'Does your situation qualify for an urgent first hearing?',
    askingNoHearing: 'Are you asking for a without notice hearing?',
    phoneNumber: 'Phone number',
    emailAddress: 'Contact number of the person named on the application',
    domesticVoilenceHeading: DomesticAbuseEn.title,
    childProtectionHeading: ChildProtectionEn.title,
    midatatorDocumentTitle: EnMidiationDocument.title,
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
      'There is an order under section 91(14) Children Act 1989, a limited civil restraint order, a general civil restraint order or an extended civil restraint order in force which means I need permission to make this application',
    anotherReason: 'Another reason',
    dontKnow: "Don't know",
    contactPrefernces: 'Contact preferences',
    child: 'Child',
    reasonForNotAttendingMiam: 'What are your reasons for not attending a MIAM?',
    applicantLabel: 'Applicant',
  },
};
const cyContent = {
  section: '',
  title: 'Check your answers to your C100 application (welsh)',
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
    domesticVoilenceHeading: DomesticAbuseCy.title,
    childProtectionHeading: ChildProtectionCy.title,
    midatatorDocumentTitle: CyMidiationDocument.title,
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
    courtOrderPrevent:
      "Mae gorchymyn o dan adran 91(14) Deddf Plant 1989, gorchymyn atal sifil cyfyngedig, gorchymyn atal sifil cyffredinol, neu orchymyn atal sifil estynedig mewn grym sy'n golygu bod angen caniatâd arnaf i wneud y cais hwn",
    anotherReason: 'Rheswm arall',
    dontKnow: 'Ddim yn gwybod',
    contactPrefernces: 'Dewisiadau cyswllt',
    child: 'Plant',
    reasonForNotAttendingMiam: 'Beth yw eich rhesymau dros beidio â mynychu MIAM?',
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

  test('Form should return correct content if all mandatory fields filled', () => {
    const statementOfTruthField = fields.statementOfTruth as FormOptions;
    expect(statementOfTruthField.type).toBe('checkboxes');
    expect((statementOfTruthField.label as Function)(generatedContent)).toBe(enContent.StatementOfTruth.heading);
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
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c100RebuildChildPostCode',
                  },
                  href: '/c100-rebuild/childaddress',
                  text: 'Edit',
                  visuallyHiddenText: 'Where do the children live?',
                },
              ],
            },
            key: {
              text: 'Where do the children live?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">1.</span> Location details',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_writtenAgreement',
                  },
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a written agreement with the other people in the case that you want the court to review?',
                },
              ],
            },
            key: {
              text: 'Do you have a written agreement with the other people in the case that you want the court to review?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">2.</span> Type of application',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_legalRepresentation',
                  },
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: 'Edit',
                  visuallyHiddenText: 'Will you be using a legal representative in these proceedings?',
                },
              ],
            },
            key: {
              text: 'Will you be using a legal representative in these proceedings?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">3.</span> Legal representative details',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_courtPermissionRequired',
                  },
                  href: '/c100-rebuild/screening-questions/permission',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Is there any reason that you would need permission from the court to make this application?',
                },
              ],
            },
            key: {
              text: 'Is there any reason that you would need permission from the court to make this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">4.</span> Permission to make the application',
      },
      {
        rows: [],
        title:
          '<span class="app-task-list__section-number">5.</span> MIAM: Mediation Information and Assessment Meeting',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_otherProceedings',
                  },
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
                    'a) is still going on? or ' +
                    'b) has finished but the order is still in place?',
                },
              ],
            },
            key: {
              text:
                'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
                'a) is still going on? or ' +
                'b) has finished but the order is still in place?',
            },
            value: {
              html: 'Yes',
            },
          },
        ],
        subTitle: 'MIAM attendance',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_childrenInvolvedCourtCase',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have the children been involved in a court case?',
                },
              ],
            },
            key: {
              text: 'Have the children been involved in a court case?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_courtOrderProtection',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have you had a court order made for your protection?',
                },
              ],
            },
            key: {
              text: 'Have you had a court order made for your protection?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">6.</span> Past and current proceeding',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_courtOrder',
                  },
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: 'Edit',
                  visuallyHiddenText: 'What are you asking the court to do?',
                },
              ],
            },
            key: {
              text: 'What are you asking the court to do?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_shortStatement',
                  },
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Describe what you want the court to do regarding the children in this application',
                },
              ],
            },
            key: {
              text: 'Describe what you want the court to do regarding the children in this application',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">7.</span> What you\'re asking the court to decide',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hu_urgentHearingReasons',
                  },
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: 'Edit',
                  visuallyHiddenText: 'Does your situation qualify for an urgent first hearing?',
                },
              ],
            },
            key: {
              text: 'Does your situation qualify for an urgent first hearing?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwn_reasonsForApplicationWithoutNotice',
                  },
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: 'Edit',
                  visuallyHiddenText: 'Are you asking for a without notice hearing?',
                },
              ],
            },
            key: {
              text: 'Are you asking for a without notice hearing?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">8.</span> Hearing details',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">9.</span> Details of the people in the application ',
      },
      {
        rows: [],
        subTitle: "Children's details",
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenKnownToSocialServices',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children known to social services?',
                },
              ],
            },
            key: {
              text: 'Are any of the children known to social services?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenSubjectOfProtectionPlan',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children the subject of a child protection plan?',
                },
              ],
            },
            key: {
              text: 'Are any of the children the subject of a child protection plan?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Additional details about the children',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ocd_hasOtherChildren',
                  },
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you or any respondents have other children who are not part of this application?',
                },
              ],
            },
            key: {
              text: 'Do you or any respondents have other children who are not part of this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Other Children details',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Details of the applicants',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Details of the respondents',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'oprs_otherPersonCheck',
                  },
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: 'Edit',
                  visuallyHiddenText: 'Is there anyone else who should know about your application?',
                },
              ],
            },
            key: {
              text: 'Is there anyone else who should know about your application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Details of the other people in the application',
        title: '',
      },
      [],
      {
        rows: [],
        title: 'Where the children live',
      },
      [],
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_haveSafetyConcerns',
                  },
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any concerns for your safety or the safety of the children?',
                },
              ],
            },
            key: {
              text: 'Do you have any concerns for your safety or the safety of the children?',
            },
            value: {
              html: 'Yes',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_safetyConernAbout',
                  },
                  href: '/c100-rebuild/safety-concerns/concern-about',
                  text: 'Edit',
                  visuallyHiddenText: 'Who are you concerned about?',
                },
              ],
            },
            key: {
              text: 'Who are you concerned about?',
            },
            value: {
              html: '<ul class="govuk-list govuk-list--bullet"><li>Yourself</li></ul>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">10.</span> Safety concerns',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_concernAboutChild',
                  },
                  href: '/c100-rebuild/safety-concerns/child/concerns-about',
                  text: 'Edit',
                  visuallyHiddenText:
                    'What type of behaviour have the children experienced or are at risk of experiencing?',
                },
              ],
            },
            key: {
              text: 'What type of behaviour have the children experienced or are at risk of experiencing?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Safety concerns: the children in the application ',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_concernAboutApplicant',
                  },
                  href: '/c100-rebuild/safety-concerns/yourself/concerns-about',
                  text: 'Edit',
                  visuallyHiddenText:
                    'What type of behaviour have the children experienced or are at risk of experiencing?',
                },
              ],
            },
            key: {
              text: 'What type of behaviour have the children experienced or are at risk of experiencing?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Safety concern: your safety',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_otherConcernsDrugs',
                  },
                  href: '/c100-rebuild/safety-concerns/other-concerns/drugs',
                  text: 'Edit',
                  visuallyHiddenText: 'Have the children been impacted by drug, alcohol or substance abuse?',
                },
              ],
            },
            key: {
              text: 'Have the children been impacted by drug, alcohol or substance abuse?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_childSafetyConcerns',
                  },
                  href: '/c100-rebuild/safety-concerns/other-concerns/other-issues',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any other concerns about the children’s safety and wellbeing?',
                },
              ],
            },
            key: {
              text: 'Do you have any other concerns about the children’s safety and wellbeing?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_keepingSafeStatement',
                  },
                  href: '/c100-rebuild/safety-concerns/orders-required/court-action',
                  text: 'Edit',
                  visuallyHiddenText: 'What do you want the court to do to keep you and the children safe?',
                },
              ],
            },
            key: {
              text: 'What do you want the court to do to keep you and the children safe?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_supervisionAgreementDetails',
                  },
                  href: '/c100-rebuild/safety-concerns/orders-required/unsupervised',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you agree to the children spending time with the other people in this application?',
                },
              ],
            },
            key: {
              text: 'Do you agree to the children spending time with the other people in this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_agreementOtherWaysDetails',
                  },
                  href: '/c100-rebuild/safety-concerns/orders-required/unsupervised',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you agree to the other people in this application being in touch with the children in other ways?',
                },
              ],
            },
            key: {
              text: 'Do you agree to the other people in this application being in touch with the children in other ways?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Safety concern: other concerns that you have',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalStart',
                  },
                  href: '/c100-rebuild/international-elements/start',
                  text: 'Edit',
                  visuallyHiddenText: "Are the children's lives mainly based outside of England and Wales?",
                },
              ],
            },
            key: {
              text: "Are the children's lives mainly based outside of England and Wales?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalParents',
                  },
                  href: '/c100-rebuild/international-elements/parents',
                  text: 'Edit',
                  visuallyHiddenText:
                    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
                },
              ],
            },
            key: {
              text: "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalJurisdiction',
                  },
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Could another person in the application apply for a similar order in a country outside England or Wales?',
                },
              ],
            },
            key: {
              text: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalRequest',
                  },
                  href: '/c100-rebuild/international-elements/request',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has another country asked (or been asked) for information or help for the children?',
                },
              ],
            },
            key: {
              text: 'Has another country asked (or been asked) for information or help for the children?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">11.</span> International elements',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_typeOfHearing',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/attending-court',
                  text: 'Edit',
                  visuallyHiddenText: 'Would you be able to take part in hearings by video and phone?',
                },
              ],
            },
            key: {
              text: 'Would you be able to take part in hearings by video and phone?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_languageNeeds',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/language-requirements',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any language requirements?',
                },
              ],
            },
            key: {
              text: 'Do you have any language requirements?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_specialArrangements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/special-arrangements',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you or the children need special arrangements at court?',
                },
              ],
            },
            key: {
              text: 'Do you or the children need special arrangements at court?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_disabilityRequirements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
                },
              ],
            },
            key: {
              text: 'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">12.</span> Support you need during your case',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwf_needHelpWithFees',
                  },
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you need help with paying the fee for this application?',
                },
              ],
            },
            key: {
              text: 'Do you need help with paying the fee for this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">13.</span> Help with Fees',
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
        miam_urgency: Miam_urgency.freedomPhysicalSafety,
        miam_nonAttendanceReasons: [MiamNonAttendReason.URGENT],
      },
    });
    expect(generatedEnContent.sections).toStrictEqual([
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c100RebuildChildPostCode',
                  },
                  href: '/c100-rebuild/childaddress',
                  text: 'Edit',
                  visuallyHiddenText: 'Where do the children live?',
                },
              ],
            },
            key: {
              text: 'Where do the children live?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">1.</span> Location details',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_writtenAgreement',
                  },
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a written agreement with the other people in the case that you want the court to review?',
                },
              ],
            },
            key: {
              text: 'Do you have a written agreement with the other people in the case that you want the court to review?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">2.</span> Type of application',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_legalRepresentation',
                  },
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: 'Edit',
                  visuallyHiddenText: 'Will you be using a legal representative in these proceedings?',
                },
              ],
            },
            key: {
              text: 'Will you be using a legal representative in these proceedings?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">3.</span> Legal representative details',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_courtPermissionRequired',
                  },
                  href: '/c100-rebuild/screening-questions/permission',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Is there any reason that you would need permission from the court to make this application?',
                },
              ],
            },
            key: {
              text: 'Is there any reason that you would need permission from the court to make this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">4.</span> Permission to make the application',
      },
      {
        rows: [],
        title:
          '<span class="app-task-list__section-number">5.</span> MIAM: Mediation Information and Assessment Meeting',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_otherProceedings',
                  },
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
                    'a) is still going on? or ' +
                    'b) has finished but the order is still in place?',
                },
              ],
            },
            key: {
              text:
                'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
                'a) is still going on? or ' +
                'b) has finished but the order is still in place?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'MIAM attendance',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_nonAttendanceReasons',
                  },
                  href: '/c100-rebuild/miam/general-reasons',
                  text: 'Edit',
                  visuallyHiddenText: 'What are your reasons for not attending a MIAM?',
                },
              ],
            },
            key: {
              text: 'What are your reasons for not attending a MIAM?',
            },
            value: {
              html: '<ul class="govuk-list govuk-list--bullet"><li>Urgency</li></ul>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_urgency',
                  },
                  href: '/c100-rebuild/miam/urgency',
                  text: 'Edit',
                  visuallyHiddenText: 'Why is your application urgent?',
                },
              ],
            },
            key: {
              text: 'Why is your application urgent?',
            },
            value: {
              html: 'There is a risk to your life, freedom or physical safety',
            },
          },
        ],
        subTitle: 'MIAM exemption',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hu_urgentHearingReasons',
                  },
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: 'Edit',
                  visuallyHiddenText: 'Does your situation qualify for an urgent first hearing?',
                },
              ],
            },
            key: {
              text: 'Does your situation qualify for an urgent first hearing?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwn_reasonsForApplicationWithoutNotice',
                  },
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: 'Edit',
                  visuallyHiddenText: 'Are you asking for a without notice hearing?',
                },
              ],
            },
            key: {
              text: 'Are you asking for a without notice hearing?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">6.</span> Hearing details',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_courtOrder',
                  },
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: 'Edit',
                  visuallyHiddenText: 'What are you asking the court to do?',
                },
              ],
            },
            key: {
              text: 'What are you asking the court to do?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_shortStatement',
                  },
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Describe what you want the court to do regarding the children in this application',
                },
              ],
            },
            key: {
              text: 'Describe what you want the court to do regarding the children in this application',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">7.</span> What you\'re asking the court to decide',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">8.</span> Details of the people in the application ',
      },
      {
        rows: [],
        subTitle: "Children's details",
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenKnownToSocialServices',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children known to social services?',
                },
              ],
            },
            key: {
              text: 'Are any of the children known to social services?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenSubjectOfProtectionPlan',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children the subject of a child protection plan?',
                },
              ],
            },
            key: {
              text: 'Are any of the children the subject of a child protection plan?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Additional details about the children',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ocd_hasOtherChildren',
                  },
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you or any respondents have other children who are not part of this application?',
                },
              ],
            },
            key: {
              text: 'Do you or any respondents have other children who are not part of this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Other Children details',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Details of the applicants',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Details of the respondents',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'oprs_otherPersonCheck',
                  },
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: 'Edit',
                  visuallyHiddenText: 'Is there anyone else who should know about your application?',
                },
              ],
            },
            key: {
              text: 'Is there anyone else who should know about your application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Details of the other people in the application',
        title: '',
      },
      [],
      {
        rows: [],
        title: 'Where the children live',
      },
      [],
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_childrenInvolvedCourtCase',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have the children been involved in a court case?',
                },
              ],
            },
            key: {
              text: 'Have the children been involved in a court case?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_courtOrderProtection',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have you had a court order made for your protection?',
                },
              ],
            },
            key: {
              text: 'Have you had a court order made for your protection?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">9.</span> Past and current proceeding',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_haveSafetyConcerns',
                  },
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any concerns for your safety or the safety of the children?',
                },
              ],
            },
            key: {
              text: 'Do you have any concerns for your safety or the safety of the children?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">10.</span> Safety concerns',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalStart',
                  },
                  href: '/c100-rebuild/international-elements/start',
                  text: 'Edit',
                  visuallyHiddenText: "Are the children's lives mainly based outside of England and Wales?",
                },
              ],
            },
            key: {
              text: "Are the children's lives mainly based outside of England and Wales?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalParents',
                  },
                  href: '/c100-rebuild/international-elements/parents',
                  text: 'Edit',
                  visuallyHiddenText:
                    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
                },
              ],
            },
            key: {
              text: "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalJurisdiction',
                  },
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Could another person in the application apply for a similar order in a country outside England or Wales?',
                },
              ],
            },
            key: {
              text: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalRequest',
                  },
                  href: '/c100-rebuild/international-elements/request',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has another country asked (or been asked) for information or help for the children?',
                },
              ],
            },
            key: {
              text: 'Has another country asked (or been asked) for information or help for the children?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">11.</span> International elements',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_typeOfHearing',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/attending-court',
                  text: 'Edit',
                  visuallyHiddenText: 'Would you be able to take part in hearings by video and phone?',
                },
              ],
            },
            key: {
              text: 'Would you be able to take part in hearings by video and phone?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_languageNeeds',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/language-requirements',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any language requirements?',
                },
              ],
            },
            key: {
              text: 'Do you have any language requirements?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_specialArrangements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/special-arrangements',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you or the children need special arrangements at court?',
                },
              ],
            },
            key: {
              text: 'Do you or the children need special arrangements at court?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_disabilityRequirements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
                },
              ],
            },
            key: {
              text: 'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">12.</span> Support you need during your case',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwf_needHelpWithFees',
                  },
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you need help with paying the fee for this application?',
                },
              ],
            },
            key: {
              text: 'Do you need help with paying the fee for this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">13.</span> Help with Fees',
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
        miam_urgency: Miam_urgency.freedomPhysicalSafety,
        miam_nonAttendanceReasons: [MiamNonAttendReason.URGENT],
      },
      language: 'cy',
    });

    expect(generatedCyContent.sections).toStrictEqual([
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c100RebuildChildPostCode',
                  },
                  href: '/c100-rebuild/childaddress',
                  text: ' Golygu',
                  visuallyHiddenText: "Ble mae'r plant yn byw?",
                },
              ],
            },
            key: {
              text: "Ble mae'r plant yn byw?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">1.</span> Manylion lleoliad',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_writtenAgreement',
                  },
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
                },
              ],
            },
            key: {
              text: "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">2.</span> Math o gais',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_legalRepresentation',
                  },
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
                },
              ],
            },
            key: {
              text: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">3.</span> Manylion cynrychiolydd cyfreithiol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_courtPermissionRequired',
                  },
                  href: '/c100-rebuild/screening-questions/permission',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
                },
              ],
            },
            key: {
              text: 'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">4.</span> Caniatâd i wneud cais',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">5.</span> MIAM: Cyfarfod Asesu a Gwybodaeth am Gyfryngu',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_otherProceedings',
                  },
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes unrhyw gais wedi'i wneud ar gyfer gorchymyn gofal, gorchymyn goruchwylio, gorchymyn amddiffyn brys neu orchymyn sy'n ei wneud yn ofynnol i rywun ddatgelu lleoliad plentyn neu i gludo'r plentyn i rywun arall ac sydd: a) dal i fynd rhagddo? neu b) wedi dod i ben ond mae'r gorchymyn dal mewn grym?",
                },
              ],
            },
            key: {
              text: "A oes unrhyw gais wedi'i wneud ar gyfer gorchymyn gofal, gorchymyn goruchwylio, gorchymyn amddiffyn brys neu orchymyn sy'n ei wneud yn ofynnol i rywun ddatgelu lleoliad plentyn neu i gludo'r plentyn i rywun arall ac sydd: a) dal i fynd rhagddo? neu b) wedi dod i ben ond mae'r gorchymyn dal mewn grym?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Mynychu MIAM',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_nonAttendanceReasons',
                  },
                  href: '/c100-rebuild/miam/general-reasons',
                  text: ' Golygu',
                  visuallyHiddenText: 'Beth yw eich rhesymau dros beidio â mynychu MIAM?',
                },
              ],
            },
            key: {
              text: 'Beth yw eich rhesymau dros beidio â mynychu MIAM?',
            },
            value: {
              html: '<ul class="govuk-list govuk-list--bullet"><li>Cais brys</li></ul>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_urgency',
                  },
                  href: '/c100-rebuild/miam/urgency',
                  text: ' Golygu',
                  visuallyHiddenText: 'Pam bod eich cais yn un brys?',
                },
              ],
            },
            key: {
              text: 'Pam bod eich cais yn un brys?',
            },
            value: {
              html: "Mae perygl i'ch bywyd, rhyddid neu ddiogelwch corfforol",
            },
          },
        ],
        subTitle: 'Esemptiad MIAM',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hu_urgentHearingReasons',
                  },
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
                },
              ],
            },
            key: {
              text: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Llenwch yr adran hon</span></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwn_reasonsForApplicationWithoutNotice',
                  },
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: ' Golygu',
                  visuallyHiddenText: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
                },
              ],
            },
            key: {
              text: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Llenwch yr adran hon</span></div>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">6.</span>  Manylion y gwrandawiad',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_courtOrder',
                  },
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: ' Golygu',
                  visuallyHiddenText: "Beth ydych chi'n gofyn i'r llys ei wneud?",
                },
              ],
            },
            key: {
              text: "Beth ydych chi'n gofyn i'r llys ei wneud?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_shortStatement',
                  },
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
                },
              ],
            },
            key: {
              text: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">7.</span> Beth yr ydych chi’n gofyn i’r llys ei benderfynu',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">8.</span> Manylion y bobl yn y cais',
      },
      {
        rows: [],
        subTitle: 'Manylion y plant',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenKnownToSocialServices',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
                },
              ],
            },
            key: {
              text: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenSubjectOfProtectionPlan',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
                },
              ],
            },
            key: {
              text: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion ychwanegol am y plant',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ocd_hasOtherChildren',
                  },
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion plant eraill',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Manylion y ceiswyr',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Manylion yr atebwyr',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'oprs_otherPersonCheck',
                  },
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes unrhyw un arall y dylai wybod am eich cais?',
                },
              ],
            },
            key: {
              text: 'A oes unrhyw un arall y dylai wybod am eich cais?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion y bobl eraill yn y cais',
        title: '',
      },
      [],
      {
        rows: [],
        title: 'Ble mae’r plant yn byw',
      },
      [],
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_childrenInvolvedCourtCase',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
                },
              ],
            },
            key: {
              text: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_courtOrderProtection',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
                },
              ],
            },
            key: {
              text: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">9.</span> Achosion yn y gorffennol ac achosion cyfredol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_haveSafetyConcerns',
                  },
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">10.</span> Pryderon am ddiogelwch',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalStart',
                  },
                  href: '/c100-rebuild/international-elements/start',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
                },
              ],
            },
            key: {
              text: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalParents',
                  },
                  href: '/c100-rebuild/international-elements/parents',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
                },
              ],
            },
            key: {
              text: "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalJurisdiction',
                  },
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
                },
              ],
            },
            key: {
              text: 'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalRequest',
                  },
                  href: '/c100-rebuild/international-elements/request',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
                },
              ],
            },
            key: {
              text: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">11.</span> Elfennau rhyngwladol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_typeOfHearing',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/attending-court',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
                },
              ],
            },
            key: {
              text: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_languageNeeds',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/language-requirements',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw ofynion ieithyddol?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi unrhyw ofynion ieithyddol?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_specialArrangements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/special-arrangements',
                  text: ' Golygu',
                  visuallyHiddenText: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
                },
              ],
            },
            key: {
              text: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_disabilityRequirements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
                },
              ],
            },
            key: {
              text: 'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title:
          '<span class="app-task-list__section-number">12.</span> Cefnogaeth y mae arnoch ei hangen yn ystod eich achos',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwf_needHelpWithFees',
                  },
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: ' Golygu',
                  visuallyHiddenText: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
                },
              ],
            },
            key: {
              text: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">13.</span>  Help i dalu ffioedd',
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
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c100RebuildChildPostCode',
                  },
                  href: '/c100-rebuild/childaddress',
                  text: ' Golygu',
                  visuallyHiddenText: "Ble mae'r plant yn byw?",
                },
              ],
            },
            key: {
              text: "Ble mae'r plant yn byw?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">1.</span> Manylion lleoliad',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_writtenAgreement',
                  },
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
                },
              ],
            },
            key: {
              text: "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
            },
            value: {
              html: 'Oes',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">2.</span> Math o gais',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_courtOrder',
                  },
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: ' Golygu',
                  visuallyHiddenText: "Beth ydych chi'n gofyn i'r llys ei wneud?",
                },
              ],
            },
            key: {
              text: "Beth ydych chi'n gofyn i'r llys ei wneud?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_shortStatement',
                  },
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
                },
              ],
            },
            key: {
              text: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">3.</span> Beth yr ydych chi’n gofyn i’r llys ei benderfynu',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hu_urgentHearingReasons',
                  },
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
                },
              ],
            },
            key: {
              text: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Llenwch yr adran hon</span></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwn_reasonsForApplicationWithoutNotice',
                  },
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: ' Golygu',
                  visuallyHiddenText: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
                },
              ],
            },
            key: {
              text: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Llenwch yr adran hon</span></div>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">4.</span>  Manylion y gwrandawiad',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">5.</span> Manylion y bobl yn y cais',
      },
      {
        rows: [],
        subTitle: 'Manylion y plant',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenKnownToSocialServices',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
                },
              ],
            },
            key: {
              text: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenSubjectOfProtectionPlan',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
                },
              ],
            },
            key: {
              text: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion ychwanegol am y plant',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ocd_hasOtherChildren',
                  },
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion plant eraill',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Manylion y ceiswyr',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Manylion yr atebwyr',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'oprs_otherPersonCheck',
                  },
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes unrhyw un arall y dylai wybod am eich cais?',
                },
              ],
            },
            key: {
              text: 'A oes unrhyw un arall y dylai wybod am eich cais?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion y bobl eraill yn y cais',
        title: '',
      },
      [],
      {
        rows: [],
        title: 'Ble mae’r plant yn byw',
      },
      [],
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_childrenInvolvedCourtCase',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
                },
              ],
            },
            key: {
              text: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_courtOrderProtection',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
                },
              ],
            },
            key: {
              text: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">6.</span> Achosion yn y gorffennol ac achosion cyfredol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_haveSafetyConcerns',
                  },
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">7.</span> Pryderon am ddiogelwch',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalStart',
                  },
                  href: '/c100-rebuild/international-elements/start',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
                },
              ],
            },
            key: {
              text: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalParents',
                  },
                  href: '/c100-rebuild/international-elements/parents',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
                },
              ],
            },
            key: {
              text: "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalJurisdiction',
                  },
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
                },
              ],
            },
            key: {
              text: 'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalRequest',
                  },
                  href: '/c100-rebuild/international-elements/request',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
                },
              ],
            },
            key: {
              text: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">8.</span> Elfennau rhyngwladol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_typeOfHearing',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/attending-court',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
                },
              ],
            },
            key: {
              text: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_languageNeeds',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/language-requirements',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw ofynion ieithyddol?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi unrhyw ofynion ieithyddol?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_specialArrangements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/special-arrangements',
                  text: ' Golygu',
                  visuallyHiddenText: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
                },
              ],
            },
            key: {
              text: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_disabilityRequirements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
                },
              ],
            },
            key: {
              text: 'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title:
          '<span class="app-task-list__section-number">9.</span> Cefnogaeth y mae arnoch ei hangen yn ystod eich achos',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwf_needHelpWithFees',
                  },
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: ' Golygu',
                  visuallyHiddenText: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
                },
              ],
            },
            key: {
              text: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">10.</span>  Help i dalu ffioedd',
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
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c100RebuildChildPostCode',
                  },
                  href: '/c100-rebuild/childaddress',
                  text: ' Golygu',
                  visuallyHiddenText: "Ble mae'r plant yn byw?",
                },
              ],
            },
            key: {
              text: "Ble mae'r plant yn byw?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">1.</span> Manylion lleoliad',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_writtenAgreement',
                  },
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
                },
              ],
            },
            key: {
              text: "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">2.</span> Math o gais',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_legalRepresentation',
                  },
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
                },
              ],
            },
            key: {
              text: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">3.</span> Manylion cynrychiolydd cyfreithiol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_courtPermissionRequired',
                  },
                  href: '/c100-rebuild/screening-questions/permission',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
                },
              ],
            },
            key: {
              text: 'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">4.</span> Caniatâd i wneud cais',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">5.</span> MIAM: Cyfarfod Asesu a Gwybodaeth am Gyfryngu',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_otherProceedings',
                  },
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes unrhyw gais wedi'i wneud ar gyfer gorchymyn gofal, gorchymyn goruchwylio, gorchymyn amddiffyn brys neu orchymyn sy'n ei wneud yn ofynnol i rywun ddatgelu lleoliad plentyn neu i gludo'r plentyn i rywun arall ac sydd: a) dal i fynd rhagddo? neu b) wedi dod i ben ond mae'r gorchymyn dal mewn grym?",
                },
              ],
            },
            key: {
              text: "A oes unrhyw gais wedi'i wneud ar gyfer gorchymyn gofal, gorchymyn goruchwylio, gorchymyn amddiffyn brys neu orchymyn sy'n ei wneud yn ofynnol i rywun ddatgelu lleoliad plentyn neu i gludo'r plentyn i rywun arall ac sydd: a) dal i fynd rhagddo? neu b) wedi dod i ben ond mae'r gorchymyn dal mewn grym?",
            },
            value: {
              html: 'Ydyn',
            },
          },
        ],
        subTitle: 'Mynychu MIAM',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_childrenInvolvedCourtCase',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
                },
              ],
            },
            key: {
              text: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_courtOrderProtection',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
                },
              ],
            },
            key: {
              text: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">6.</span> Achosion yn y gorffennol ac achosion cyfredol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_courtOrder',
                  },
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: ' Golygu',
                  visuallyHiddenText: "Beth ydych chi'n gofyn i'r llys ei wneud?",
                },
              ],
            },
            key: {
              text: "Beth ydych chi'n gofyn i'r llys ei wneud?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_shortStatement',
                  },
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
                },
              ],
            },
            key: {
              text: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">7.</span> Beth yr ydych chi’n gofyn i’r llys ei benderfynu',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hu_urgentHearingReasons',
                  },
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
                },
              ],
            },
            key: {
              text: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Llenwch yr adran hon</span></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwn_reasonsForApplicationWithoutNotice',
                  },
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: ' Golygu',
                  visuallyHiddenText: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
                },
              ],
            },
            key: {
              text: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Llenwch yr adran hon</span></div>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">8.</span>  Manylion y gwrandawiad',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">9.</span> Manylion y bobl yn y cais',
      },
      {
        rows: [],
        subTitle: 'Manylion y plant',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenKnownToSocialServices',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
                },
              ],
            },
            key: {
              text: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenSubjectOfProtectionPlan',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
                },
              ],
            },
            key: {
              text: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion ychwanegol am y plant',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ocd_hasOtherChildren',
                  },
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion plant eraill',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Manylion y ceiswyr',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Manylion yr atebwyr',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'oprs_otherPersonCheck',
                  },
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes unrhyw un arall y dylai wybod am eich cais?',
                },
              ],
            },
            key: {
              text: 'A oes unrhyw un arall y dylai wybod am eich cais?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion y bobl eraill yn y cais',
        title: '',
      },
      [],
      {
        rows: [],
        title: 'Ble mae’r plant yn byw',
      },
      [],
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_haveSafetyConcerns',
                  },
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">10.</span> Pryderon am ddiogelwch',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalStart',
                  },
                  href: '/c100-rebuild/international-elements/start',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
                },
              ],
            },
            key: {
              text: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalParents',
                  },
                  href: '/c100-rebuild/international-elements/parents',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
                },
              ],
            },
            key: {
              text: "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalJurisdiction',
                  },
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
                },
              ],
            },
            key: {
              text: 'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalRequest',
                  },
                  href: '/c100-rebuild/international-elements/request',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
                },
              ],
            },
            key: {
              text: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">11.</span> Elfennau rhyngwladol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_typeOfHearing',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/attending-court',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
                },
              ],
            },
            key: {
              text: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_languageNeeds',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/language-requirements',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw ofynion ieithyddol?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi unrhyw ofynion ieithyddol?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_specialArrangements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/special-arrangements',
                  text: ' Golygu',
                  visuallyHiddenText: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
                },
              ],
            },
            key: {
              text: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_disabilityRequirements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
                },
              ],
            },
            key: {
              text: 'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title:
          '<span class="app-task-list__section-number">12.</span> Cefnogaeth y mae arnoch ei hangen yn ystod eich achos',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwf_needHelpWithFees',
                  },
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: ' Golygu',
                  visuallyHiddenText: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
                },
              ],
            },
            key: {
              text: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">13.</span>  Help i dalu ffioedd',
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
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c100RebuildChildPostCode',
                  },
                  href: '/c100-rebuild/childaddress',
                  text: ' Golygu',
                  visuallyHiddenText: "Ble mae'r plant yn byw?",
                },
              ],
            },
            key: {
              text: "Ble mae'r plant yn byw?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">1.</span> Manylion lleoliad',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_writtenAgreement',
                  },
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
                },
              ],
            },
            key: {
              text: "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">2.</span> Math o gais',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_legalRepresentation',
                  },
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
                },
              ],
            },
            key: {
              text: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">3.</span> Manylion cynrychiolydd cyfreithiol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_courtPermissionRequired',
                  },
                  href: '/c100-rebuild/screening-questions/permission',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
                },
              ],
            },
            key: {
              text: 'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">4.</span> Caniatâd i wneud cais',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">5.</span> MIAM: Cyfarfod Asesu a Gwybodaeth am Gyfryngu',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_otherProceedings',
                  },
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes unrhyw gais wedi'i wneud ar gyfer gorchymyn gofal, gorchymyn goruchwylio, gorchymyn amddiffyn brys neu orchymyn sy'n ei wneud yn ofynnol i rywun ddatgelu lleoliad plentyn neu i gludo'r plentyn i rywun arall ac sydd: a) dal i fynd rhagddo? neu b) wedi dod i ben ond mae'r gorchymyn dal mewn grym?",
                },
              ],
            },
            key: {
              text: "A oes unrhyw gais wedi'i wneud ar gyfer gorchymyn gofal, gorchymyn goruchwylio, gorchymyn amddiffyn brys neu orchymyn sy'n ei wneud yn ofynnol i rywun ddatgelu lleoliad plentyn neu i gludo'r plentyn i rywun arall ac sydd: a) dal i fynd rhagddo? neu b) wedi dod i ben ond mae'r gorchymyn dal mewn grym?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Mynychu MIAM',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_courtOrder',
                  },
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: ' Golygu',
                  visuallyHiddenText: "Beth ydych chi'n gofyn i'r llys ei wneud?",
                },
              ],
            },
            key: {
              text: "Beth ydych chi'n gofyn i'r llys ei wneud?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_shortStatement',
                  },
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
                },
              ],
            },
            key: {
              text: 'Disgrifiwch yr hyn rydych chi eisiau i’r llys ei wneud o ran y plant yn y cais hwn',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">6.</span> Beth yr ydych chi’n gofyn i’r llys ei benderfynu',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hu_urgentHearingReasons',
                  },
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
                },
              ],
            },
            key: {
              text: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Llenwch yr adran hon</span></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwn_reasonsForApplicationWithoutNotice',
                  },
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: ' Golygu',
                  visuallyHiddenText: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
                },
              ],
            },
            key: {
              text: ' Ydych chi’n gofyn am wrandawiad heb rybudd?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Llenwch yr adran hon</span></div>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">7.</span>  Manylion y gwrandawiad',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">8.</span> Manylion y bobl yn y cais',
      },
      {
        rows: [],
        subTitle: 'Manylion y plant',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenKnownToSocialServices',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
                },
              ],
            },
            key: {
              text: 'A yw gwasanaethau cymdeithasol yn gyfarwydd ag unrhyw un o’r plant?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenSubjectOfProtectionPlan',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
                },
              ],
            },
            key: {
              text: 'A yw unrhyw un o’r plant yn destun cynllun amddiffyn plentyn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion ychwanegol am y plant',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ocd_hasOtherChildren',
                  },
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion plant eraill',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Manylion y ceiswyr',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Manylion yr atebwyr',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'oprs_otherPersonCheck',
                  },
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes unrhyw un arall y dylai wybod am eich cais?',
                },
              ],
            },
            key: {
              text: 'A oes unrhyw un arall y dylai wybod am eich cais?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        subTitle: 'Manylion y bobl eraill yn y cais',
        title: '',
      },
      [],
      {
        rows: [],
        title: 'Ble mae’r plant yn byw',
      },
      [],
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_childrenInvolvedCourtCase',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
                },
              ],
            },
            key: {
              text: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_courtOrderProtection',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
                },
              ],
            },
            key: {
              text: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">9.</span> Achosion yn y gorffennol ac achosion cyfredol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_haveSafetyConcerns',
                  },
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi unrhyw bryderon am eich diogelwch chi neu ddiogelwch y plant?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">10.</span> Pryderon am ddiogelwch',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalStart',
                  },
                  href: '/c100-rebuild/international-elements/start',
                  text: ' Golygu',
                  visuallyHiddenText: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
                },
              ],
            },
            key: {
              text: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalParents',
                  },
                  href: '/c100-rebuild/international-elements/parents',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
                },
              ],
            },
            key: {
              text: "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalJurisdiction',
                  },
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
                },
              ],
            },
            key: {
              text: 'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalRequest',
                  },
                  href: '/c100-rebuild/international-elements/request',
                  text: ' Golygu',
                  visuallyHiddenText:
                    "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
                },
              ],
            },
            key: {
              text: "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Llenwch yr adran hon</span></dd></div></dl>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">11.</span> Elfennau rhyngwladol',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_typeOfHearing',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/attending-court',
                  text: ' Golygu',
                  visuallyHiddenText: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
                },
              ],
            },
            key: {
              text: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_languageNeeds',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/language-requirements',
                  text: ' Golygu',
                  visuallyHiddenText: 'A oes gennych chi unrhyw ofynion ieithyddol?',
                },
              ],
            },
            key: {
              text: 'A oes gennych chi unrhyw ofynion ieithyddol?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_specialArrangements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/special-arrangements',
                  text: ' Golygu',
                  visuallyHiddenText: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
                },
              ],
            },
            key: {
              text: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_disabilityRequirements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
                  text: ' Golygu',
                  visuallyHiddenText:
                    'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
                },
              ],
            },
            key: {
              text: 'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title:
          '<span class="app-task-list__section-number">12.</span> Cefnogaeth y mae arnoch ei hangen yn ystod eich achos',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwf_needHelpWithFees',
                  },
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: ' Golygu',
                  visuallyHiddenText: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
                },
              ],
            },
            key: {
              text: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
            },
            value: {
              html: '<span class="govuk-error-message">Llenwch yr adran hon</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">13.</span>  Help i dalu ffioedd',
      },
    ]);
  });

  test('en should generate sections properly for miam cert upload scenarios', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      language: 'en',
      userCase: {
        ...commonContent.userCase,
        sq_writtenAgreement: undefined,
        miam_otherProceedings: YesOrNo.NO,
        miam_attendance: YesOrNo.YES,
        miam_haveDocSigned: YesOrNo.YES,
        miam_certificate: {
          id: '123',
          url: '/123',
          filename: 'MIAM_cert.pdf',
          binaryUrl: '/123/binary',
        },
      },
    });
    expect(generatedEnContent.sections).toStrictEqual([
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c100RebuildChildPostCode',
                  },
                  href: '/c100-rebuild/childaddress',
                  text: 'Edit',
                  visuallyHiddenText: 'Where do the children live?',
                },
              ],
            },
            key: {
              text: 'Where do the children live?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">1.</span> Location details',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_writtenAgreement',
                  },
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a written agreement with the other people in the case that you want the court to review?',
                },
              ],
            },
            key: {
              text: 'Do you have a written agreement with the other people in the case that you want the court to review?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">2.</span> Type of application',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_legalRepresentation',
                  },
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: 'Edit',
                  visuallyHiddenText: 'Will you be using a legal representative in these proceedings?',
                },
              ],
            },
            key: {
              text: 'Will you be using a legal representative in these proceedings?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">3.</span> Legal representative details',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_courtPermissionRequired',
                  },
                  href: '/c100-rebuild/screening-questions/permission',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Is there any reason that you would need permission from the court to make this application?',
                },
              ],
            },
            key: {
              text: 'Is there any reason that you would need permission from the court to make this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">4.</span> Permission to make the application',
      },
      {
        rows: [],
        title:
          '<span class="app-task-list__section-number">5.</span> MIAM: Mediation Information and Assessment Meeting',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_otherProceedings',
                  },
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
                    'a) is still going on? or ' +
                    'b) has finished but the order is still in place?',
                },
              ],
            },
            key: {
              text:
                'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
                'a) is still going on? or ' +
                'b) has finished but the order is still in place?',
            },
            value: {
              html: 'No',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_attendance',
                  },
                  href: '/c100-rebuild/miam/attendance',
                  text: 'Edit',
                  visuallyHiddenText: 'Have you attended a MIAM?',
                },
              ],
            },
            key: {
              text: 'Have you attended a MIAM?',
            },
            value: {
              html: 'Yes',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_haveDocSigned',
                  },
                  href: '/c100-rebuild/miam/mediator-document',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have a document signed by the mediator?  ',
                },
              ],
            },
            key: {
              text: 'Do you have a document signed by the mediator?  ',
            },
            value: {
              html: 'Yes',
            },
          },
        ],
        subTitle: 'MIAM attendance',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_childrenInvolvedCourtCase',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have the children been involved in a court case?',
                },
              ],
            },
            key: {
              text: 'Have the children been involved in a court case?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_courtOrderProtection',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have you had a court order made for your protection?',
                },
              ],
            },
            key: {
              text: 'Have you had a court order made for your protection?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">6.</span> Past and current proceeding',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_courtOrder',
                  },
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: 'Edit',
                  visuallyHiddenText: 'What are you asking the court to do?',
                },
              ],
            },
            key: {
              text: 'What are you asking the court to do?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_shortStatement',
                  },
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Describe what you want the court to do regarding the children in this application',
                },
              ],
            },
            key: {
              text: 'Describe what you want the court to do regarding the children in this application',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">7.</span> What you\'re asking the court to decide',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hu_urgentHearingReasons',
                  },
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: 'Edit',
                  visuallyHiddenText: 'Does your situation qualify for an urgent first hearing?',
                },
              ],
            },
            key: {
              text: 'Does your situation qualify for an urgent first hearing?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwn_reasonsForApplicationWithoutNotice',
                  },
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: 'Edit',
                  visuallyHiddenText: 'Are you asking for a without notice hearing?',
                },
              ],
            },
            key: {
              text: 'Are you asking for a without notice hearing?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">8.</span> Hearing details',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">9.</span> Details of the people in the application ',
      },
      {
        rows: [],
        subTitle: "Children's details",
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenKnownToSocialServices',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children known to social services?',
                },
              ],
            },
            key: {
              text: 'Are any of the children known to social services?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenSubjectOfProtectionPlan',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children the subject of a child protection plan?',
                },
              ],
            },
            key: {
              text: 'Are any of the children the subject of a child protection plan?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Additional details about the children',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ocd_hasOtherChildren',
                  },
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you or any respondents have other children who are not part of this application?',
                },
              ],
            },
            key: {
              text: 'Do you or any respondents have other children who are not part of this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Other Children details',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Details of the applicants',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Details of the respondents',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'oprs_otherPersonCheck',
                  },
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: 'Edit',
                  visuallyHiddenText: 'Is there anyone else who should know about your application?',
                },
              ],
            },
            key: {
              text: 'Is there anyone else who should know about your application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Details of the other people in the application',
        title: '',
      },
      [],
      {
        rows: [],
        title: 'Where the children live',
      },
      [],
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_haveSafetyConcerns',
                  },
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any concerns for your safety or the safety of the children?',
                },
              ],
            },
            key: {
              text: 'Do you have any concerns for your safety or the safety of the children?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">10.</span> Safety concerns',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalStart',
                  },
                  href: '/c100-rebuild/international-elements/start',
                  text: 'Edit',
                  visuallyHiddenText: "Are the children's lives mainly based outside of England and Wales?",
                },
              ],
            },
            key: {
              text: "Are the children's lives mainly based outside of England and Wales?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalParents',
                  },
                  href: '/c100-rebuild/international-elements/parents',
                  text: 'Edit',
                  visuallyHiddenText:
                    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
                },
              ],
            },
            key: {
              text: "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalJurisdiction',
                  },
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Could another person in the application apply for a similar order in a country outside England or Wales?',
                },
              ],
            },
            key: {
              text: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalRequest',
                  },
                  href: '/c100-rebuild/international-elements/request',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has another country asked (or been asked) for information or help for the children?',
                },
              ],
            },
            key: {
              text: 'Has another country asked (or been asked) for information or help for the children?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">11.</span> International elements',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_typeOfHearing',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/attending-court',
                  text: 'Edit',
                  visuallyHiddenText: 'Would you be able to take part in hearings by video and phone?',
                },
              ],
            },
            key: {
              text: 'Would you be able to take part in hearings by video and phone?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_languageNeeds',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/language-requirements',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any language requirements?',
                },
              ],
            },
            key: {
              text: 'Do you have any language requirements?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_specialArrangements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/special-arrangements',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you or the children need special arrangements at court?',
                },
              ],
            },
            key: {
              text: 'Do you or the children need special arrangements at court?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_disabilityRequirements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
                },
              ],
            },
            key: {
              text: 'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">12.</span> Support you need during your case',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwf_needHelpWithFees',
                  },
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you need help with paying the fee for this application?',
                },
              ],
            },
            key: {
              text: 'Do you need help with paying the fee for this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">13.</span> Help with Fees',
      },
    ]);
  });

  test('cy should generate sections properly for miam cert upload scenarios', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      language: 'cy',
      userCase: {
        ...commonContent.userCase,
        sq_writtenAgreement: undefined,
        miam_otherProceedings: YesOrNo.NO,
        miam_attendance: YesOrNo.YES,
      },
    });
    expect(generatedEnContent.sections).not.toBe([]);
  });

  test('generateContent without hwf conditions', () => {
    expect(fields.statementOftruthHeading.type).toBe('textAndHtml');
    expect(fields.statementOftruthHeading.textAndHtml).toBe(
      "<h2 class='govuk-heading-l govuk-!-padding-bottom-3 govuk-!-padding-top-2'>Statement of Truth </h2>"
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

  test('en should generate correct content for flow 4', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      language: 'en',
      userCase: {
        miam_validReason: 'Yes',
        miam_attendance: 'No',
      } as CaseWithId,
    });
    expect(generatedEnContent.sections).toStrictEqual([
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c100RebuildChildPostCode',
                  },
                  href: '/c100-rebuild/childaddress',
                  text: 'Edit',
                  visuallyHiddenText: 'Where do the children live?',
                },
              ],
            },
            key: {
              text: 'Where do the children live?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">1.</span> Location details',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_writtenAgreement',
                  },
                  href: '/c100-rebuild/screening-questions/consent-agreement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a written agreement with the other people in the case that you want the court to review?',
                },
              ],
            },
            key: {
              text: 'Do you have a written agreement with the other people in the case that you want the court to review?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">2.</span> Type of application',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_legalRepresentation',
                  },
                  href: '/c100-rebuild/screening-questions/legal-representation',
                  text: 'Edit',
                  visuallyHiddenText: 'Will you be using a legal representative in these proceedings?',
                },
              ],
            },
            key: {
              text: 'Will you be using a legal representative in these proceedings?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">3.</span> Legal representative details',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'sq_courtPermissionRequired',
                  },
                  href: '/c100-rebuild/screening-questions/permission',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Is there any reason that you would need permission from the court to make this application?',
                },
              ],
            },
            key: {
              text: 'Is there any reason that you would need permission from the court to make this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">4.</span> Permission to make the application',
      },
      {
        rows: [],
        title:
          '<span class="app-task-list__section-number">5.</span> MIAM: Mediation Information and Assessment Meeting',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_otherProceedings',
                  },
                  href: '/c100-rebuild/miam/other-proceedings',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
                    'a) is still going on? or ' +
                    'b) has finished but the order is still in place?',
                },
              ],
            },
            key: {
              text:
                'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which: ' +
                'a) is still going on? or ' +
                'b) has finished but the order is still in place?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'MIAM attendance',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'miam_nonAttendanceReasons',
                  },
                  href: '/c100-rebuild/miam/general-reasons',
                  text: 'Edit',
                  visuallyHiddenText: 'What are your reasons for not attending a MIAM?',
                },
              ],
            },
            key: {
              text: 'What are your reasons for not attending a MIAM?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'MIAM exemption',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_courtOrder',
                  },
                  href: '/c100-rebuild/typeoforder/select-courtorder',
                  text: 'Edit',
                  visuallyHiddenText: 'What are you asking the court to do?',
                },
              ],
            },
            key: {
              text: 'What are you asking the court to do?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'too_shortStatement',
                  },
                  href: '/c100-rebuild/typeoforder/shortstatement',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Describe what you want the court to do regarding the children in this application',
                },
              ],
            },
            key: {
              text: 'Describe what you want the court to do regarding the children in this application',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">6.</span> What you\'re asking the court to decide',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hu_urgentHearingReasons',
                  },
                  href: '/c100-rebuild/hearing-urgency/urgent',
                  text: 'Edit',
                  visuallyHiddenText: 'Does your situation qualify for an urgent first hearing?',
                },
              ],
            },
            key: {
              text: 'Does your situation qualify for an urgent first hearing?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwn_reasonsForApplicationWithoutNotice',
                  },
                  href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                  text: 'Edit',
                  visuallyHiddenText: 'Are you asking for a without notice hearing?',
                },
              ],
            },
            key: {
              text: 'Are you asking for a without notice hearing?',
            },
            value: {
              html: '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">7.</span> Hearing details',
      },
      {
        rows: [],
        title: '<span class="app-task-list__section-number">8.</span> Details of the people in the application ',
      },
      {
        rows: [],
        subTitle: "Children's details",
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenKnownToSocialServices',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children known to social services?',
                },
              ],
            },
            key: {
              text: 'Are any of the children known to social services?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'cd_childrenSubjectOfProtectionPlan',
                  },
                  href: '/c100-rebuild/child-details/further-information',
                  text: 'Edit',
                  visuallyHiddenText: 'Are any of the children the subject of a child protection plan?',
                },
              ],
            },
            key: {
              text: 'Are any of the children the subject of a child protection plan?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Additional details about the children',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ocd_hasOtherChildren',
                  },
                  href: '/c100-rebuild/child-details/has-other-children',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you or any respondents have other children who are not part of this application?',
                },
              ],
            },
            key: {
              text: 'Do you or any respondents have other children who are not part of this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Other Children details',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Details of the applicants',
        title: '',
      },
      {
        rows: [],
        subTitle: 'Details of the respondents',
        title: '',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'oprs_otherPersonCheck',
                  },
                  href: '/c100-rebuild/other-person-details/other-person-check',
                  text: 'Edit',
                  visuallyHiddenText: 'Is there anyone else who should know about your application?',
                },
              ],
            },
            key: {
              text: 'Is there anyone else who should know about your application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        subTitle: 'Details of the other people in the application',
        title: '',
      },
      [],
      {
        rows: [],
        title: 'Where the children live',
      },
      [],
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_childrenInvolvedCourtCase',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have the children been involved in a court case?',
                },
              ],
            },
            key: {
              text: 'Have the children been involved in a court case?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'op_courtOrderProtection',
                  },
                  href: '/c100-rebuild/other-proceedings/current-previous-proceedings',
                  text: 'Edit',
                  visuallyHiddenText: 'Have you had a court order made for your protection?',
                },
              ],
            },
            key: {
              text: 'Have you had a court order made for your protection?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">9.</span> Past and current proceeding',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'c1A_haveSafetyConcerns',
                  },
                  href: '/c100-rebuild/safety-concerns/concerns-for-safety',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any concerns for your safety or the safety of the children?',
                },
              ],
            },
            key: {
              text: 'Do you have any concerns for your safety or the safety of the children?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">10.</span> Safety concerns',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalStart',
                  },
                  href: '/c100-rebuild/international-elements/start',
                  text: 'Edit',
                  visuallyHiddenText: "Are the children's lives mainly based outside of England and Wales?",
                },
              ],
            },
            key: {
              text: "Are the children's lives mainly based outside of England and Wales?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalParents',
                  },
                  href: '/c100-rebuild/international-elements/parents',
                  text: 'Edit',
                  visuallyHiddenText:
                    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
                },
              ],
            },
            key: {
              text: "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalJurisdiction',
                  },
                  href: '/c100-rebuild/international-elements/jurisdiction',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Could another person in the application apply for a similar order in a country outside England or Wales?',
                },
              ],
            },
            key: {
              text: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ie_internationalRequest',
                  },
                  href: '/c100-rebuild/international-elements/request',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Has another country asked (or been asked) for information or help for the children?',
                },
              ],
            },
            key: {
              text: 'Has another country asked (or been asked) for information or help for the children?',
            },
            value: {
              html: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">11.</span> International elements',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_typeOfHearing',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/attending-court',
                  text: 'Edit',
                  visuallyHiddenText: 'Would you be able to take part in hearings by video and phone?',
                },
              ],
            },
            key: {
              text: 'Would you be able to take part in hearings by video and phone?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_languageNeeds',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/language-requirements',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you have any language requirements?',
                },
              ],
            },
            key: {
              text: 'Do you have any language requirements?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_specialArrangements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/special-arrangements',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you or the children need special arrangements at court?',
                },
              ],
            },
            key: {
              text: 'Do you or the children need special arrangements at court?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'ra_disabilityRequirements',
                  },
                  href: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
                  text: 'Edit',
                  visuallyHiddenText:
                    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
                },
              ],
            },
            key: {
              text: 'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">12.</span> Support you need during your case',
      },
      {
        rows: [
          {
            actions: {
              items: [
                {
                  attributes: {
                    id: 'hwf_needHelpWithFees',
                  },
                  href: '/c100-rebuild/help-with-fees/need-help-with-fees',
                  text: 'Edit',
                  visuallyHiddenText: 'Do you need help with paying the fee for this application?',
                },
              ],
            },
            key: {
              text: 'Do you need help with paying the fee for this application?',
            },
            value: {
              html: '<span class="govuk-error-message">Complete this section</span>',
            },
          },
        ],
        title: '<span class="app-task-list__section-number">13.</span> Help with Fees',
      },
    ]);
  });

  test('generateContent with hwf conditions', () => {
    generatedContent = generateContent({
      ...commonContent,
      userCase: {
        hwf_needHelpWithFees: 'Yes' as YesOrNo,
        helpWithFeesReferenceNumber: '1234',
      },
    });
    generatedForm = generatedContent.form as FormContent;
    fields = generatedForm.fields as FormFields;

    expect(fields.statementOftruthHeading.type).toBe('textAndHtml');
    expect(fields.statementOftruthHeading.textAndHtml).toBe(
      "<h2 class='govuk-heading-l govuk-!-padding-bottom-3 govuk-!-padding-top-2'>Statement of Truth </h2>"
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

  test('generateContent should add error text for parties', () => {
    const generatedErrorsContent = generateContent({
      ...commonContent,
      language: 'en',
      userCase: {
        ...commonContent.userCase,
        appl_allApplicants: [
          {
            id: '00ad391d-60b1-450d-ba05-674809fee4e5',
            applicantFirstName: 'Test',
            applicantLastName: 'Applicant',
            detailsKnown: 'Yes',
            startAlternative: 'No',
            start: '',
            contactDetailsPrivate: ['Address'],
            contactDetailsPrivateAlternative: [],
            relationshipDetails: {
              relationshipToChildren: [
                {
                  childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                  relationshipType: 'Other',
                  otherRelationshipTypeDetails: 'test',
                },
              ],
            },
            personalDetails: {
              haveYouChangeName: 'Yes',
              applPreviousName: 'sasdasd',
              dateOfBirth: {
                year: '1999',
                month: '11',
                day: '11',
              },
              gender: 'Other',
              otherGenderDetails: 'Test',
              applicantPlaceOfBirth: 'okdsdsd',
            },
            applicantContactDetail: {
              canProvideEmail: 'No',
              emailAddress: '',
              telephoneNumber: '447205308786',
              canNotProvideTelephoneNumberReason: '',
              canLeaveVoiceMail: 'Yes',
              canProvideTelephoneNumber: 'Yes',
            },
            applicantAddressPostcode: '',
            applicantAddress1: 'dasdas',
            applicantAddress2: '',
            applicantAddressTown: 'dada',
            applicantAddressCounty: '',
            applicantAddressHistory: 'Yes',
            applicantProvideDetailsOfPreviousAddresses: '',
            country: 'United Kingdom',
            liveInRefuge: 'Yes',
            refugeConfidentialityC8Form: null,
          },
        ],
        oprs_otherPersons: [
          {
            id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
            firstName: 'Respondent',
            lastName: 'FirstPage',
            personalDetails: {
              dateOfBirth: {
                year: '1999',
                month: '01',
                day: '11',
              },
              isDateOfBirthUnknown: 'No',
              approxDateOfBirth: {
                year: '1999',
                month: '01',
                day: '11',
              },
            },
            relationshipDetails: {
              relationshipToChildren: [
                {
                  childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                  relationshipType: 'Grandparent',
                  otherRelationshipTypeDetails: '',
                },
              ],
            },
            liveInRefuge: 'Yes',
            addressUnknown: 'Yes',
            isOtherPersonAddressConfidential: null,
          },
        ],
        cd_children: [
          {
            id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
            firstName: 'Nir',
            lastName: 'Sin',
            personalDetails: {
              dateOfBirth: { year: undefined, month: undefined, day: undefined },
            },
            childMatters: {},
            parentialResponsibility: {},
          },
        ],
        resp_Respondents: [
          {
            address: {},
            contactDetails: {},
            personalDetails: {
              dateOfBirth: { year: undefined, month: undefined, day: undefined },
              approxDateOfBirth: { year: undefined, month: undefined, day: undefined },
            },
          },
        ],
        ocd_otherChildren: [
          { personalDetails: { dateOfBirth: { year: undefined, month: undefined, day: undefined } } },
        ],
      } as unknown as CaseWithId,
    });

    expect(generatedErrorsContent.errors?.['c8RefugeDocument-applicant-0']).toStrictEqual({
      required: 'You must upload a C8 document',
    });
    expect(generatedErrorsContent.errors?.['c8RefugeDocument-otherPerson-0']).toStrictEqual({
      required: 'You must upload a C8 document',
    });
    expect(generatedErrorsContent.errors?.['otherPersonConfidentiality-otherPerson-0']).toStrictEqual({
      required: 'Select yes if you want to keep Respondent FirstPage’s identity private',
    });
    expect(generatedErrorsContent.errors?.['contactDetails-applicant-0']).toStrictEqual({
      invalidEmail: 'Enter an email address in the correct format, like name@example.com',
      invalidPhoneNumber: 'Enter a telephone number in the correct format',
      required: 'Contact details of Test Applicant',
    });
    expect(generatedErrorsContent.errors?.['fullName-applicant-0']).toStrictEqual({
      required: 'Enter the full name',
    });
    expect(generatedErrorsContent.errors?.['fullName-child-0']).toStrictEqual({
      required: 'Enter the full name',
    });
    expect(generatedErrorsContent.errors?.['fullName-respondent-0']).toStrictEqual({
      required: 'Enter the full name',
    });
    expect(generatedErrorsContent.errors?.['fullName-otherPerson-0']).toStrictEqual({
      required: 'Enter the full name',
    });
    expect(generatedErrorsContent.errors?.['fullName-otherChild-0']).toStrictEqual({
      required: 'Enter the full name',
    });
  });

  test('generateContent should add error text for other person and child when arrays empty', () => {
    const generatedErrorsContent = generateContent({
      ...commonContent,
      language: 'en',
      userCase: {
        ...commonContent.userCase,
        oprs_otherPersonCheck: 'Yes',
        ocd_hasOtherChildren: 'Yes',
        oprs_otherPersons: [],
        ocd_otherChildren: [],
      } as unknown as CaseWithId,
    });

    expect(generatedErrorsContent.errors?.['fullName-otherPerson-0']).toStrictEqual({
      required: 'Enter the full name',
    });
    expect(generatedErrorsContent.errors?.['fullName-otherChild-0']).toStrictEqual({
      required: 'Enter the full name',
    });
  });

  test('generateContent should add error error text for other person confidentiality', () => {
    const generatedRefugeErrorsContent = generateContent({
      ...commonContent,
      language: 'en',
      userCase: {
        ...commonContent.userCase,
        appl_allApplicants: [
          {
            id: '00ad391d-60b1-450d-ba05-674809fee4e5',
            applicantFirstName: 'Test',
            applicantLastName: 'Applicant',
            detailsKnown: 'Yes',
            startAlternative: 'No',
            start: '',
            contactDetailsPrivate: ['Address'],
            contactDetailsPrivateAlternative: [],
            relationshipDetails: {
              relationshipToChildren: [
                {
                  childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                  relationshipType: 'Other',
                  otherRelationshipTypeDetails: 'test',
                },
              ],
            },
            personalDetails: {
              haveYouChangeName: 'Yes',
              applPreviousName: 'sasdasd',
              dateOfBirth: {
                year: '1999',
                month: '11',
                day: '11',
              },
              gender: 'Other',
              otherGenderDetails: 'Test',
              applicantPlaceOfBirth: 'okdsdsd',
            },
            applicantContactDetail: {
              canProvideEmail: 'No',
              emailAddress: '',
              telephoneNumber: '447205308786',
              canNotProvideTelephoneNumberReason: '',
              canLeaveVoiceMail: 'Yes',
              canProvideTelephoneNumber: 'Yes',
            },
            applicantAddressPostcode: '',
            applicantAddress1: 'dasdas',
            applicantAddress2: '',
            applicantAddressTown: 'dada',
            applicantAddressCounty: '',
            applicantAddressHistory: 'Yes',
            applicantProvideDetailsOfPreviousAddresses: '',
            country: 'United Kingdom',
          },
        ],
        oprs_otherPersons: [
          {
            id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
            firstName: 'Respondent',
            lastName: 'FirstPage',
            personalDetails: {
              dateOfBirth: {
                year: '1999',
                month: '01',
                day: '11',
              },
              isDateOfBirthUnknown: 'No',
              approxDateOfBirth: {
                year: '1999',
                month: '01',
                day: '11',
              },
            },
            relationshipDetails: {
              relationshipToChildren: [
                {
                  childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                  relationshipType: 'Grandparent',
                  otherRelationshipTypeDetails: '',
                },
              ],
            },
            isOtherPersonAddressConfidential: null,
          },
        ],
        cd_children: [
          {
            id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
            firstName: 'Nir',
            lastName: 'Sin',
            personalDetails: {
              haveYouChangeName: 'No',
              applPreviousName: '',
              approxDateOfBirth: {
                year: '1999',
                month: '11',
                day: '11',
              },
              isDateOfBirthUnknown: 'Yes',
              gender: 'Male',
              otherGenderDetails: '',
              applicantPlaceOfBirth: 'okdsdsd',
            },
            childMatters: {
              needsResolution: ['relocateChildrenOutsideUk'],
            },
            parentialResponsibility: {
              statement: 'ok',
            },
            mainlyLiveWith: {
              id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
              firstName: 'test',
              lastName: 'parent',
              partyType: 'other',
            },
          },
        ],
      } as unknown as CaseWithId,
    });

    expect(generatedRefugeErrorsContent.errors?.['otherPersonConfidentiality-otherPerson-0']).toStrictEqual({
      required: 'Select yes if you want to keep Respondent FirstPage’s identity private',
    });
  });

  test('en should generate sections properly for consent order with safety concerns when train track enabled', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      additionalData: { req: { session: { enableC100CaseProgressionTrainTrack: true } } },
    });
    expect(generatedEnContent.sections?.[4].title).not.toStrictEqual(
      '<span class="app-task-list__section-number">5.</span> MIAM: Mediation Information and Assessment Meeting'
    );
  });

  test('en should generate sections properly for miam_otherProceedings with safety concerns when train track enabled', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      userCase: {
        ...commonContent.userCase,
        sq_writtenAgreement: undefined,
        c1A_haveSafetyConcerns: 'Yes' as YesOrNo.YES,
        c1A_safetyConernAbout: ['applicant' as C1ASafteyConcernsAbout],
      },
      additionalData: { req: { session: { enableC100CaseProgressionTrainTrack: true } } },
    });
    expect(generatedEnContent.sections?.[6].title).toStrictEqual(
      '<span class="app-task-list__section-number">6.</span> Past and current proceeding'
    );
  });

  test('en should generate sections properly for miam urgency when train track enabled', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      userCase: {
        ...commonContent.userCase,
        sq_writtenAgreement: undefined,
        miam_otherProceedings: undefined,
        miam_urgency: Miam_urgency.freedomPhysicalSafety,
        miam_nonAttendanceReasons: [MiamNonAttendReason.URGENT],
      },
      additionalData: { req: { session: { enableC100CaseProgressionTrainTrack: true } } },
    });
    expect(generatedEnContent.sections?.[7].title).toStrictEqual(
      '<span class="app-task-list__section-number">6.</span> Hearing details'
    );
  });

  test('en should generate correct content for default flow when train track enabled', () => {
    const generatedEnContent = generateContent({
      ...commonContent,
      language: 'en',
      userCase: {
        miam_validReason: 'Yes',
        miam_attendance: 'No',
      } as CaseWithId,
      additionalData: { req: { session: { enableC100CaseProgressionTrainTrack: true } } },
    });
    expect(generatedEnContent.sections?.[7].title).toStrictEqual(
      '<span class="app-task-list__section-number">6.</span> What you\'re asking the court to decide'
    );
  });
});
