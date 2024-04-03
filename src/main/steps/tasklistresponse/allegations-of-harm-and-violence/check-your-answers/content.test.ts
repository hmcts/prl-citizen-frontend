import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { toggleApplicantSafetyConcerns } from '../../../c100-rebuild/check-your-answers/content';
import { CommonContent } from '../../../common/common.content';

/* eslint-disable import/no-unresolved */
import { ANYTYPE } from './common';
import { cy, en, generateContent } from './content';

const keys = {
  abducionThreats: 'Have the children been abducted or kept outside the UK without your consent before?',
  abduction: 'Abduction',
  abductionAbuse: 'Abduction',
  abductionAbuseHint:
    'A risk of the children being taken away from their caregivers, especially if they are kept abroad',
  allchildLabel: 'All the children in above application',
  applicantConcerns: 'Pa fath o ymddygiad ydych chi wedi ei brofi neu mewn perygl o’i brofi?',
  applicantDetails: 'Applicant [^^^] - Your details',
  behaviourDetailsHintText:
    'Keep your answer brief. You will have a chance to give more detail to the court later in the proceedings.',
  behaviourDetailsLabel: 'Describe the behaviours you would like the court to be aware of. (optional)',
  behaviourStartDateHintText: 'This does not need to be an exact date.',
  behaviourStartDateLabel: 'When did this behaviour start and how long did it continue? (optional)',
  c1A_policeOrInvestigatorInvolved: 'Were the police, private investigators or any other organisation involved?',
  c1A_policeOrInvestigatorInvolvedHint: 'Including in the UK or overseas.',
  c1A_previousAbductionsShortDescHint: 'Include any previous attempts to threaten or abduct the children.',
  caption: 'Safety concerns',
  childConcerns: 'What type of behaviour have the children experienced or are at risk of experiencing?',
  childDrugAbuse: 'Have the children been impacted by drug, alcohol or substance abuse?',
  childLocation: 'Why do you think the children may be abducted or kept outside the UK without your consent?',
  children: 'The children in this application',
  childrenConcernedAboutLabel: 'Which children are you concerned about? (optional)',
  childrenMoreThanOnePassport: 'Do the children have more than one passport?',
  childsCurrentLocationText: 'Where are the children now?',
  concerns: 'concerns',
  details: 'Details',
  detailsOfChildConcern: 'Briefly describe the [***] against the child if you feel able to ',
  detailsOfYourConcern: 'Briefly describe the [***] if you feel able to ',
  doWantCourtToAction: 'What do you want the court to do to keep you and the children safe?',
  doYouHaveSafetyConcerns: 'Do you have any concerns for your safety or the safety of the children?',
  emotionalAbuse: 'Emotional abuse',
  emotionalAbuseHint: 'Making a child feel unloved, worthless, humiliated or ignored',
  emotionalAbusePageTitle: 'Briefly describe the emotional abuse against the children if you feel able to',
  errors: '',
  financialAbuse: 'Financial abuse',
  financialAbuseHint: "Stealing and exploiting a child's money, or using their personal information to obtain funds",
  financialAbusePageTitle: 'Briefly describe the financial abuse against the children if you feel able to',
  haspassportOfficeNotified: 'Has the passport office been notified? ',
  headingTitle: 'What type of behaviour have the children experienced or are at risk of experiencing?',
  introText:
    '<p class="govuk-body ">Complete this section as best you can. If you don\'t feel able to discuss the abuse at this stage, you can do so when you speak to Cafcass.</p>\n              <p class="govuk-body ">The information that you give will be used in the application. It is not a request for a domestic abuse injunction.</p>\n              <p class="govuk-body ">You can <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link govuk-link a" rel="external" target="_blank">apply for a domestic abuse injunction</a> separately.</p>',
  isOngoingBehaviourHint:
    '<p class="govuk-body" for="respabuseongoing-hint">Contact 999 if there is an emergency. If it\'s not an emergency, consider contacting <a href="https://www.nspcc.org.uk" class="govuk-link" rel="external" target="_blank">NSPCC</a> or <a href="https://www.gov.uk/report-child-abuse-to-local-council" class="govuk-link" rel="external" target="_blank">the social care team at you local council </a>.</p>',
  isOngoingBehaviourLabel: 'Is the behaviour ongoing? (optional)',
  line1: 'Give a short description of the previous incidents of abduction.',
  one: 'Yes',
  ongoingBehaviourNoLabel: 'No',
  ongoingBehaviourYesLabel: 'Yes',
  onlyContinue: 'Continue',
  option1: 'Mother',
  option2: 'Father',
  option3: 'Other',
  otherDetails: 'Provide more details',
  otherWellBeingIssues: 'Do you have any other concerns about the children’s safety and wellbeing?',
  paragraph1: 'See the National Society for Prevention of Cruelty to Children (NSPCC) guidance on ',
  passportOffice: 'Do any of the children have a passport?',
  physicalAbuse: 'Physical abuse',
  physicalAbuseHint: 'Behaviour such as punching, choking, kicking or hitting with an object',
  physicalAbusePageTitle: 'Briefly describe the physical abuse against the children if you feel able to',
  possessionChildrenPassport: 'Who is in possession of the children’s passports?',
  previousAbduction: 'Provide details of the previous abductions',
  professionalHelpNoLabel: 'No',
  professionalHelpYesLabel: 'Yes',
  psychologicalAbuse: 'Psychological abuse',
  psychologicalAbuseHint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder',
  psychologicalAbusePageTitle: 'Briefly describe the psychological abuse against the children if you feel able to',
  respondent: 'Yourself',
  seekHelpDetailsNoHint:
    '<p class="govuk-body">See the <a href="https://www.nspcc.org.uk/keeping-children-safe/reporting-abuse/dedicated-helplines/" class="govuk-link" rel="external" target="_blank">NSPCC guidance</a> if you are unsure how to get help.</p>',
  seekHelpDetailsYesHint:
    '<p class="govuk-body">Indicate who you sought help from, and what they did to help (optional). </p><p class="govuk-body">Do not include personal details such as names and addresses.</p>',
  seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP.',
  seekHelpFromPersonOrAgencyLabel: 'Have you ever asked for help from a professional person or agency? (optional)',
  select_all_relevant: 'Select all options that are relevant to you.',
  selectSupervisionAgreementLabel:
    'Do you agree to the children spending time with the other people in this application?',
  sexualAbuse: 'Sexual abuse',
  sexualAbuseHint:
    'A child being forced or persuaded to take part in sexual activities, including online. It can be without contact, for example grooming or exploitation',
  sexualAbusePageTitle: 'Briefly describe the sexual abuse against the children if you feel able to',
  somethingElse: 'Something else',
  somethingElseHint: 'Any concerns you have that do not fit into the above categories',
  spottingSignsOfChildAbuseLabel: ' spotting the signs of child abuse.',
  spottingSignsOfChildHyperLink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse',
  supervisionAgreementOtherWaysLabel:
    'Do you agree to the other people in this application being in touch with the children in other ways?',
  title: 'Provide details of the children’s passports',
  two: 'No',
  warningText:
    'We will share the information that you give in this section with the other person in the case so that they can respond to what you have said.',
  whoAreConcernsAbout: 'Who are you concerned about?',
  witnessingDomesticAbuse: 'Witnessing domestic abuse',
  witnessingDomesticAbuseHint:
    "The child's emotional and mental wellbeing being impacted by domestic abuse in the home",
};

const enContent = {
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
    // details: 'Details',
    //child concern screens
    // detailsOfChildConcern: 'Briefly describe the [***] against the child if you feel able to ',
    // detailsOfYourConcern: 'Briefly describe the [***] if you feel able to ',
    // concerns: 'concerns',
    // applicantDetails: 'Applicant [^^^] - Your details',
    ...keys,
  },
};

const cyContent = {
  section: '',
  title: 'Gwirio eich atebion',
  change: 'Golygu',
  topWarning: 'Bydd eich atebion yn cael eu rhannu gyda phobl eraill yn yr achos hwn.',
  makingSure: 'Edrychwch dros eich atebion cyn gorffen gwneud eich cais.',
  continue: 'Cadw a chyflwyno',
  Yes: 'Yes - welsh',
  No: 'No - welsh',
  sectionTitles: {
    safetyConcerns: '[^^sectionNo^^]. Pryderon diogelwch', //section 10
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
    applicantDetails: 'Ceisydd [^^^] - Eich manylion',
  },
};

const languages = {
  enContent,
  cyContent,
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Content.ts test cases', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  const commonContent2 = {
    language: 'en',
    userCase: {
      ...mockUserCase,
      PRL_c1A_haveSafetyConcerns: YesOrNo.YES,
    },
  } as CommonContent;

  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('en should be an object', () => {
    expect(typeof enContent).toBe('object');
  });

  test('cy should be an object', () => {
    expect(typeof cyContent).toBe('object');
  });

  test('toggleApplicantSafetyConcerns', () => {
    const safteyConcernsAboutKey = 'concerner',
      userCase = {
        concerner: ['children', 'applicant'],
        abuse: ['witnessingDomesticAbuse'],
      },
      childConcernsKey = 'abuse';
    expect(toggleApplicantSafetyConcerns(safteyConcernsAboutKey, userCase, childConcernsKey)).toBe(true);
  });

  test('en', () => {
    const sections = {
      sections: [
        {
          title: '1. Safety concerns',
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns',
                    text: 'Edit',
                    visuallyHiddenText: 'Do you have any concerns for your safety or the safety of the children?',
                  },
                ],
              },
              key: {
                text: 'Do you have any concerns for your safety or the safety of the children?',
              },
              value: {
                text: 'No',
              },
            },
          ],
        },
      ],
    };

    const sections2 = {
      sections: [
        {
          title: '1. Safety concerns',
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns',
                    text: 'Edit',
                    visuallyHiddenText: 'Do you have any concerns for your safety or the safety of the children?',
                  },
                ],
              },
              key: {
                text: 'Do you have any concerns for your safety or the safety of the children?',
              },
              value: {
                text: 'Yes',
              },
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/check-answers-yes',
                    text: 'Edit',
                    visuallyHiddenText: 'Who are you concerned about?',
                  },
                ],
              },
              key: {
                text: 'Who are you concerned about?',
              },
              value: {
                html: '<ul></ul>',
              },
            },
          ],
        },
        {
          title: 'Safety concerns: the children in the application ',
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/child/concerns-about',
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
                html: '<ul></ul>',
              },
            },
          ],
        },
        {
          title: 'Safety concern: other concerns that you have',
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/other-concerns/drugs',
                    text: 'Edit',
                    visuallyHiddenText: 'Have the children been impacted by drug, alcohol or substance abuse?',
                  },
                ],
              },
              key: {
                text: 'Have the children been impacted by drug, alcohol or substance abuse?',
              },
              value: {
                html: 'No',
              },
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/other-concerns/other-issues',
                    text: 'Edit',
                    visuallyHiddenText: 'Do you have any other concerns about the children’s safety and wellbeing?',
                  },
                ],
              },
              key: {
                text: 'Do you have any other concerns about the children’s safety and wellbeing?',
              },
              value: {
                html: 'No',
              },
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/orders-required/court-action',
                    text: 'Edit',
                    visuallyHiddenText: 'What do you want the court to do to keep you and the children safe?',
                  },
                ],
              },
              key: {
                text: 'What do you want the court to do to keep you and the children safe?',
              },
              value: {},
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/orders-required/unsupervised',
                    text: 'Edit',
                    visuallyHiddenText:
                      'Do you agree to the children spending time with the other people in this application?',
                  },
                ],
              },
              key: {
                text: 'Do you agree to the children spending time with the other people in this application?',
              },
              value: {},
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/orders-required/unsupervised',
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
                text: 'No',
              },
            },
          ],
        },
      ],
    };

    expect(en(commonContent)).toEqual({
      ...enContent,
      ...sections,
      language: 'en',
    });

    expect(en(commonContent2)).toEqual({
      ...enContent,
      ...sections2,
      language: 'en',
    });
  });

  test('cy', () => {
    const sections = {
      sections: [
        {
          title: '1. Pryderon diogelwch',
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns',
                    text: 'Golygu',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {},
              value: {
                text: 'No',
              },
            },
          ],
        },
      ],
    };

    const sections2 = {
      sections: [
        {
          title: '1. Pryderon diogelwch',
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns',
                    text: 'Golygu',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {},
              value: {
                text: 'Yes',
              },
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/check-answers-yes',
                    text: 'Golygu',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {},
              value: {
                html: '<ul></ul>',
              },
            },
          ],
        },
        {
          title: 'Pryderon am ddiogelwch: y plant yn y cais',
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/child/concerns-about',
                    text: 'Golygu',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {},
              value: {
                html: '<ul></ul>',
              },
            },
          ],
        },
        {
          title: 'Pryderon am ddiogelwch: pryderon eraill sydd gennych',
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/other-concerns/drugs',
                    text: 'Golygu',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {},
              value: {
                html: 'No',
              },
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/other-concerns/other-issues',
                    text: 'Golygu',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {},
              value: {
                html: 'No',
              },
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/orders-required/court-action',
                    text: 'Golygu',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {},
              value: {},
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/orders-required/unsupervised',
                    text: 'Golygu',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {},
              value: {},
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/allegations-of-harm-and-violence/orders-required/unsupervised',
                    text: 'Golygu',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {},
              value: {
                text: 'No',
              },
            },
          ],
        },
      ],
    };

    expect(cy(commonContent)).toEqual({
      ...cyContent,
      ...sections,
      language: 'en',
    });

    expect(cy(commonContent2)).toEqual({
      ...cyContent,
      ...sections2,
      language: 'en',
    });
  });

  // test('cy - toggleApplicantSafetyConcerns to return true', () => {
  //   expect(cy(commonContent3)).toBe(cyContent);
  // });

  test('en - language', () => {
    expect(languages.enContent).not.toEqual('');
  });

  test('cy - language', () => {
    expect(languages.cyContent).not.toEqual('');
  });

  const contents = {
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

  test('should contain continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and submit');
  });
});
