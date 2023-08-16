import { capitalize } from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { C100_CASE_TYPE } from '../../app/case/definition';
import { PageContent, TranslationFn } from '../../app/controller/GetController';
import { ANONYMOUS_URLS, C100_URL, DASHBOARD_URL } from '../../steps/urls';

import AppSurvey from './app-survey/appSurveyController';
import { appSurveyContents } from './app-survey/content';

export const en = {
  phase: 'Beta',
  applyForChildArrangements: 'Private Law',
  applyForDissolution: 'Private Law',
  commonServiceName: 'Child arrangements and family injunctions',
  c100ServiceName: 'Child arrangements',
  fl401ServiceName: 'Family Injunctions',
  languageToggle: '<a href="?lng=cy" class="govuk-link language">Cymraeg</a>',
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
  webChatDetails: 'Ask a question or get any help in any language',
  sendUsAMessage: 'Telephone',
  sendUsAMessageDetails: 'We aim to get back to you within 5 days.',
  telephone: 'Telephone',
  telephoneNumber: '0300 303 0742',
  telephoneDetails: 'Monday to Friday, 8am to 8pm, Saturday 8am to 2pm.',
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
  contactUs1:
    'You can <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">contact the relevant court</a> if you need to discuss your case.',
  contactUs2: 'They cannot give you legal advice or answer questions about applications submitted.',
  contactUs3:
    'If you would like to report a problem or have a suggestion to help improve this service, send an email to: <a href="#" class="govuk-link" target="blank">C100applications@justice.gov.uk</a>',
  contactUs4: 'This email should only be used for feedback on the digital service.',
  feedback: 'FeedBack',
  youMust: 'You must ',
};

export const cy: typeof en = {
  ...en, // @TODO delete me to get a list of missing translations
  phase: 'Beta',
  applyForChildArrangements: 'Cyfraith breifat',
  applyForDissolution: 'Cyfraith breifat',
  commonServiceName: 'Trefniadau plant a gwaharddebau teulu',
  c100ServiceName: 'Trefniadau plant',
  fl401ServiceName: 'Family injunction (in welsh)',
  languageToggle: '<a href="?lng=en" class="govuk-link language">English</a>',
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
  contactUsForHelp: 'Cysylltiadau i gael gymorth',
  webChat: 'Sgwrsio dros y we',
  webChatDetails: 'Gofyn cwestiwn neu gael cymorth mewn unrhyw iaith',
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
  telephoneNumber: '0300 303 0742',
  telephoneDetails: 'Dydd Llun i ddydd Gwener, 8am i 8pm',
  onlyContinue: 'Parhau',
  onlycontinue: 'Parhau',
  divider: 'neu',
  edit: 'Golygu',
  appName: '- Private law - GOV.UK (welsh)',
  ...appSurveyContents.cy,
  contactUs1:
    'Gallwch <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">gysylltu â’r llys perthnasol</a> os ydych angen trafod eich achos.',
  contactUs2: 'Ni allant roi cyngor cyfreithiol i chi nac ateb cwestiynau am geisiadau a gyflwynwyd.',
  contactUs3:
    'Os hoffech roi gwybod inni am broblem neu os oes gennych awgrym i’n helpu ni i wella’r gwasanaeth hwn, anfonwch neges e-bost i: <a href="#" class="govuk-link" target="blank">C100applications@justice.gov.uk-welsh</a>',
  contactUs4: "Dim ond i roi adborth ar y gwasanaeth digidol y dylid defnyddio'r cyfeiriad e-bost hwn.",
  feedback: 'Adborth',
  youMust: 'You must (welsh)',
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
  userId?: string | undefined;
}): PageContent => {
  const commonTranslations: typeof en = language === 'en' ? en : cy;
  const serviceName = getServiceName(additionalData?.req, commonTranslations);
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
  };

  if (pageContent !== null && pageContent !== undefined) {
    Object.assign(content, pageContent(content));
  }

  return content;
};

const getServiceName = (
  reqData: CommonContentAdditionalData | undefined,
  translations: typeof en | typeof cy
): string => {
  const url = reqData?.path;
  const isCommonServiceName = url?.includes(DASHBOARD_URL) || ANONYMOUS_URLS.some(_url => _url.includes(url));
  const isC100 = url?.startsWith(C100_URL) || reqData?.session?.userCase?.caseTypeOfApplication === C100_CASE_TYPE.C100;
  let serviceName;

  if (isCommonServiceName) {
    serviceName = translations.commonServiceName;
  } else {
    if (isC100) {
      serviceName = translations.c100ServiceName;
    } else {
      serviceName = translations.fl401ServiceName;
    }
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
  userId?: string | undefined;
  userIdamId?: string;
};

export type Language = 'en' | 'cy';
