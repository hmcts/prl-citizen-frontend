import { capitalize } from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { CaseType } from '../../app/case/definition';
import { PageContent, TranslationFn } from '../../app/controller/GetController';
import { C100_APPLICANT_TASKLIST, C100_URL, COMMON_PAGE_URLS } from '../../steps/urls';

import AppSurvey from './app-survey/appSurveyController';
import { appSurveyContents } from './app-survey/content';
import { interpolate } from './string-parser';

export const en = {
  phase: 'Beta',
  applyForChildArrangements: 'Private Law',
  applyForDissolution: 'Private Law',
  commonServiceName: 'Child arrangements and family injunctions',
  c100ServiceName: 'Child arrangements',
  fl401ServiceName: 'Family Injunctions',
  languageToggle: '<a lang="{lang}" {href} class="govuk-link language">{language}</a>',
  govUk: 'GOV.UK',
  back: 'Back',
  continue: 'Save and continue',
  next: 'Next',
  change: 'Change',
  upload: 'Upload',
  download: 'Download',
  delete: 'Delete',
  warning: 'Warning',
  required: 'You have not answered the question. You need to select an answer before continuing.',
  notAnswered: 'You have not answered the question.',
  errorSaving: 'Sorry, we’re having technical problems saving your application. Please try again in a few minutes.',
  errorSendingInvite:
    'Sorry, we’re having technical problems sending your application for review. Please try again in a few minutes.',
  ogl: 'All content is available under the <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated',
  errorSummaryHeading: 'There is a problem on this page',
  saveAndSignOut: 'Save and sign out',
  saveAndComeLater: 'Save and come back later',
  goBack: 'Go back',
  saveAsDraft: 'Save as draft',
  onlyContinue: 'Continue',
  onlycontinue: 'Continue',
  cancel: 'Cancel',
  signOut: 'Sign out',
  signIn: 'Sign in',
  accessibility: 'Accessibility statement',
  cookies: 'Cookies',
  privacyPolicy: 'Privacy policy',
  termsAndConditions: 'Terms and conditions',
  testingSupportLabel: 'Testing Support',
  marriage: 'marriage',
  divorce: 'divorce',
  civilPartnership: 'civil partnership',
  endingCivilPartnership: 'ending a civil partnership',
  husband: 'husband',
  wife: 'wife',
  partner: 'partner',
  civilPartner: 'civil partner',
  withHim: 'with him',
  withHer: 'with her',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
  yes: 'Yes',
  no: 'No',
  notSure: 'Not sure',
  english: 'English',
  welsh: 'Welsh',
  contactUsForHelp: 'Contact us for help',
  webChat: 'Web chat',
  sendUsAMessage: 'Telephone',
  sendUsAMessageDetails: 'We aim to get back to you within 5 days.',
  telephone: 'Telephone',
  telephoneNumber: '0300 323 0185',
  telephoneDetails: 'Monday – Friday, 9am – 5pm',
  findOutCharges: 'Find out about call charges',
  openNewWindow: '(opens in a new window)',
  habitualResidentHelpText1:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  habitualResidentHelpText2:
    'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
  cookiesHeading: 'Cookies on',
  cookiesLine1: 'We use some essential cookies to make this service work.',
  cookiesLine2:
    'We’d like to set additional cookies so we can remember your settings, understand how people use the service and to improve government services.',
  acceptAnalyticsCookies: 'Accept analytics cookies',
  rejectAnalyticsCookies: 'Reject analytics cookies',
  viewCookies: 'View cookies',
  hideMessage: 'Hide this message',
  cookiesAcceptedPart: 'You’ve accepted additional cookies. You can',
  cookiesAcceptorRejectPart2: 'change your cookie settings',
  cookiesAcceptorRejectPart3: 'at any time.',
  cookiesRejectedPart: 'You’ve rejected additional cookies. You can',
  changeCookiesHeading: 'Change your cookie settings',
  allowAnalyticsCookies: 'Allow cookies that measure website use?',
  useAnalyticsCookies: 'Use cookies that measure my website use',
  doNotUseAnalyticsCookies: 'Do not use cookies that measure my website use',
  save: 'Save',
  cookiesSaved: 'Your cookie settings were saved',
  additionalCookies:
    'Government services may set additional cookies and, if so, will have their own cookie policy and banner.',
  goToHomepage: 'Go to homepage',
  apmCookiesHeadings: 'Allow cookies that measure website application performance monitoring?',
  useApmCookies: 'Use cookies that measure website application performance monitoring',
  doNotUseApmCookies: 'Do not use cookies that measure website application performance monitoring',
  divider: 'or',
  edit: 'Edit',
  appName: '- Private law - GOV.UK',
  ...appSurveyContents.en,
  feedback: 'FeedBack',
  awpErrorSummaryHeading: 'There is a problem',
  invalidDate: 'Invalid Date',
};

export const cy: typeof en = {
  phase: 'Beta',
  applyForChildArrangements: 'Cyfraith breifat',
  applyForDissolution: 'Cyfraith breifat',
  commonServiceName: 'Trefniadau plant a gwaharddebau teulu',
  c100ServiceName: 'Trefniadau plant',
  fl401ServiceName: 'Gwaharddeb Teulu',
  languageToggle: '<a lang="{lang}" {href} class="govuk-link language">{language}</a>',
  govUk: 'GOV.UK',
  back: 'Yn ôl',
  continue: 'Cadw a pharhau',
  change: 'Newid',
  upload: 'Uwchlwytho',
  download: 'Llwytho i lawr',
  delete: 'Dileu',
  warning: 'Rhybudd',
  required: 'Nid ydych wedi ateb y cwestiwn. Rhaid ichi ddewis ateb cyn symud ymlaen.',
  notAnswered: 'Nid ydych wedi ateb y cwestiwn.',
  errorSaving:
    "Mae'n ddrwg gennym, rydym yn cael problemau technegol wrth geisio cadw eich cais. Rhowch gynnig arall arni mewn ychydig funudau.",
  ogl: 'Mae’r holl gynnwys ar gael o dan <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license" >Drwydded Agored y Llywodraeth f3.0</a>, oni nodir fel arall',
  errorSummaryHeading: 'Mae yna broblem',
  saveAndSignOut: 'Cadw ac allgofnodi',
  saveAndComeLater: 'Cadw’r cais a dychwelyd ato yn hwyrach ymlaen',
  goBack: 'Yn ôl',
  saveAsDraft: 'Save as draft (in welsh)',
  signOut: 'Allgofnodi',
  signIn: 'Sign in (in welsh)',
  cancel: 'Canslo',
  accessibility: 'Datganiad hygyrchedd',
  cookies: 'Cwcis',
  privacyPolicy: 'Polisi preifatrwydd',
  termsAndConditions: 'Telerau ac amodau',
  testingSupportLabel: 'Testing Support (in welsh)',
  marriage: 'priodas',
  divorce: 'ysgariad',
  endingCivilPartnership: 'dod â phartneriaeth sifil i ben',
  civilPartnership: 'partneriaeth sifil',
  husband: 'gŵr',
  wife: 'gwraig',
  partner: 'partner',
  civilPartner: 'partner sifil',
  withHim: 'gydag ef',
  withHer: 'gyda hi',
  months: [
    'Ionawr',
    'Chwefror',
    'Mawrth',
    'Ebrill',
    'Mai',
    'Mehefin',
    'Gorffennaf',
    'Awst',
    'Medi',
    'Hydref',
    'Tachwedd',
    'Rhagfyr',
  ],
  dateFormat: {
    day: 'Diwrnod',
    month: 'Mis',
    year: 'Blwyddyn',
  },
  yes: 'Do',
  no: 'Naddo',
  notSure: 'Ddim yn siŵr',
  english: 'Saesneg',
  welsh: 'Cymraeg',
  contactUsForHelp: 'Cysylltu â ni i gael cymorth',
  webChat: 'Sgwrsio dros y we',
  sendUsAMessage: 'Ffôn',
  sendUsAMessageDetails: 'Byddwn yn ymdrechu i ymateb o fewn 5 diwrnod.',
  findOutCharges: 'Gwybodaeth am brisiau galwadau',
  openNewWindow: '(agor mewn ffenestr newydd)',
  telephone: 'Ffôn',
  cookiesLine1: 'Rydym yn defnyddio rhai cwcis hanfodol i wneud i’r gwasanaeth hwn weithio',
  cookiesLine2:
    'Hoffwn osod cwcis ychwanegol ar eich cyfrifiadur fel y gallwn gofio eich gosodiadau, deall sut mae pobl yn defnyddio’r gwasanaeth a gwella gwasanaethau’r llywodraeth',
  cookiesAcceptedPart: 'Rydych wedi derbyn cwcis ychwanegol. Gallwch',
  cookiesAcceptorRejectPart2: 'newid eich gosodiadau cwcis ',
  cookiesAcceptorRejectPart3: ' ar unrhyw bryd',
  cookiesRejectedPart: 'Rydych wedi gwrthod cwcis ychwanegol. Gallwch',
  changeCookiesHeading: 'Newid eich gosodiadau cwcis',
  allowAnalyticsCookies: "Caniatáu cwcis sy’n mesur defnydd o'r wefan?",
  useAnalyticsCookies: "Defnyddio cwcis sy’n mesur fy nefnydd o'r wefan",
  doNotUseAnalyticsCookies: "Peidio â defnyddio cwcis sy'n mesur fy nefnydd o'r wefan",
  apmCookiesHeadings: "Caniatáu cwcis sy'n mesur y broses o fonitro perfformiad gwefannau?",
  useApmCookies: 'Defnyddio cwcis sy’n mesur y broses o fonitro perfformiad gwefannau',
  doNotUseApmCookies: 'Peidio â defnyddio cwcis sy’n mesur y broses o fonitro perfformiad gwefannau',
  cookiesHeading: 'Cwcis y gwasanaeth',
  acceptAnalyticsCookies: 'Derbyn cwcis dadansoddol',
  rejectAnalyticsCookies: 'Gwrthod cwcis dadansoddol',
  viewCookies: 'Gweld cwcis',
  hideMessage: 'Cuddio’r neges hon',
  telephoneNumber: '0300 323 0185',
  telephoneDetails: 'Dydd Llun i ddydd Gwener, 9am i 5pm',
  onlyContinue: 'Parhau',
  onlycontinue: 'Parhau',
  divider: 'neu',
  edit: 'Golygu',
  appName: '- Cyfraith Breifat - GOV.UK',
  ...appSurveyContents.cy,
  feedback: 'Adborth',
  awpErrorSummaryHeading: 'Mae yna broblem',
  invalidDate: 'Dyddiad Annilys',
  next: 'Next',
  errorSendingInvite:
    'Sorry, we’re having technical problems sending your application for review. Please try again in a few minutes.',
  habitualResidentHelpText1:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  habitualResidentHelpText2:
    'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
  save: 'Save',
  cookiesSaved: 'Your cookie settings were saved',
  additionalCookies:
    'Government services may set additional cookies and, if so, will have their own cookie policy and banner.',
  goToHomepage: 'Go to homepage',
};

export const generatePageContent = ({
  language,
  pageContent,
  userCase,
  userEmail,
  userCaseList,
  caption,
  name,
  byApplicant,
  document_type,
  addresses = [],
  userIdamId,
  additionalData,
  userId,
}: {
  language: Language;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  userEmail?: string;
  caption?: string;
  document_type?: string;
  userCaseList?: Partial<CaseWithId>[];
  addresses?: [];
  name?: string;
  byApplicant?: string;
  userIdamId?: string;
  additionalData?: CommonContentAdditionalData;
  userId?: string;
}): PageContent => {
  const commonTranslations: typeof en = language === 'en' ? en : cy;
  const url = additionalData?.req?.path;
  const serviceName = getServiceName(commonTranslations, userCase, url);
  const inPageSurveyContent = AppSurvey.getInPageSurveyContent(
    userCase?.caseTypeOfApplication as string,
    additionalData?.req,
    commonTranslations.inPageSurveyContent
  );

  const content: CommonContent = {
    ...commonTranslations,
    serviceName,
    language,
    userCase,
    userEmail,
    name,
    userCaseList,
    addresses,
    caption,
    document_type,
    userIdamId,
    byApplicant,
    additionalData,
    userId,
    inPageSurveyContent,
    languageToggle: interpolate(commonTranslations.languageToggle, {
      lang: language === 'en' ? 'cy' : 'en',
      href: `href="?lng=${language === 'en' ? 'cy' : 'en'}"`,
      language: language === 'en' ? 'Cymraeg' : 'English',
    }),
  };

  if (pageContent !== null && pageContent !== undefined) {
    Object.assign(content, pageContent(content));
  }

  return content;
};

const getServiceName = (
  translations: typeof en | typeof cy,
  userCase: Partial<CaseWithId> | undefined,
  url: string | undefined
): string => {
  let serviceName = translations.commonServiceName;

  if (!url || COMMON_PAGE_URLS.some(_url => _url.includes(url))) {
    return capitalize(serviceName);
  }
  if (userCase?.caseTypeOfApplication === CaseType.FL401) {
    serviceName = translations.fl401ServiceName;
  } else if (
    url.startsWith(C100_URL) ||
    userCase?.caseTypeOfApplication === CaseType.C100 ||
    url?.includes(C100_APPLICANT_TASKLIST)
  ) {
    serviceName = translations.c100ServiceName;
  }

  return capitalize(serviceName);
};

export type CommonContentAdditionalData = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type CommonContent = typeof en & {
  language: Language;
  serviceName: string;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  userEmail?: string;
  userCaseList?: Partial<CaseWithId>[];
  name?: string;
  caption?: string;
  document_type?: string;

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  addresses?: any[];
  byApplicant?: string;
  additionalData?: CommonContentAdditionalData;
  userId?: string;
  userIdamId?: string;
};

export type Language = 'en' | 'cy';
