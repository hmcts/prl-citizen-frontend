import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Overview',
  overview:
    'This privacy policy explains why we collect personal data and what we do with it. It also explains the rights which you and your client have, and how to enforce them.',
  whoManages: 'Who manages this service',
  managedBy:
    'This service is managed by HM Courts & Tribunals Service (HMCTS), which is an executive agency of the Ministry of Justice (MoJ).',
  mojPersonalInformationCharter:
    "The MoJ is known as the data controller for data protection purposes. The <a class='govuk-link' href='https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter'>The MoJ personal information charter</a> explains how the MoJ processes personal data.",
  personalData: 'More information about using this service is in the terms and conditions.',
  thePersonal: 'Why we collect your personal data',
  whenYouUseService: 'We collect personal data to:',
  process: "enable us to process your client's application",
  legal: 'meet legal requirements',
  improvements: 'make improvements to this service',
  staffAndPersonalData:
    "Our staff use personal data to process your client's application. They work in the UK and your data is stored in the UK.",
  typesOfPersonalData: 'Types of personal data we collect',
  personalDataCollected: 'The personal data we collect includes:',
  name: 'your name, address and contact details',
  email: 'your email and password (if you create an account)',
  personalInformation: 'other personal information you provide in your claim or application',
  clientsData: 'your client’s personal data - including their name, address and contact details',
  collectMore: 'We collect more personal data for some types of application.',
  usingYourData: 'Using your data',
  emailAddress:
    'As part of your application, you’ll be asked to use your email address to set up an account. You will be able to use this email and password to sign into other HMCTS services.',
  govUK:
    'We may ask for your permission to use your email address to send you emails using GOV.UK Notify. This system processes emails only within the European Economic Area until the point where emails are handed over to the email provider you use.',
  cookies: 'We use cookies to collect data that tells us about how you’re using this service, including:',
  openEmail: 'if you open an email from us or click on a link in an email',
  ipAddress: 'your computer, phone or tablet’s IP address',
  region: 'the region or town where you are using your computer, phone or tablet',
  webBrowser: 'the web browser you use',
  storingYourData: 'Storing your data',
  amountOfTime:
    "When you make an application we store the data you have provided. The amount of time that your data is kept for depends on what you're applying for.",
  sharingYourData: 'Sharing your data',
  anotherGovDepartment:
    'While processing your application, another government department, agency or organisation might be involved and we may share your data with them.',
  preventCrime:
    'In some circumstances we may share your data, for example to prevent or detect crime, or to produce anonymised statistics.',
  googleAnalytics:
    'We use Google Analytics to collect data about how a website is used. This anonymous data is shared with Google. Find out about this in our terms an conditions.',
  storingAndSharing: 'Storing and sharing your data internationally',
  internationally:
    'Sometimes we need to send your personal information outside of the UK. When we do this we comply with data protection law.',
  yourRights: 'Your rights',
  youCanAsk: 'You can ask:',
  seeData: 'to see the personal data that we hold on you',
  changeData: 'to have the personal data corrected',
  deleteData:
    'to have the personal data removed or deleted (this will depend on the circumstances, for example if you decide not to continue your claim or application)',
  restrictedData:
    'that access to the personal data is restricted (for example, you can ask to have your data stored for longer and not automatically deleted)',
  seePersonalData: 'If you want to see the personal data that we hold on you, you can:',
  mojForm:
    "complete a form to <a class='govuk-link' href=https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter'>make a subject access request</a> - your request goes to the MoJ as data controller",
  writeToUs: 'write to us: Disclosure Team, Post point 10.24, 102 Petty France, London, SW1H 9AJ',
  emailUs: "email us: <a class='govuk-link' href='mailto:data.access@justice.gov.uk'>data.access@justice.gov.uk</a>",
  moreInformation: 'You can ask for more information about:',
  sharingInformation: 'agreements we have on sharing information with other organisations',
  passingOnInfo: 'when we are allowed to pass on personal information without telling you',
  staffInstructions: 'our instructions to staff on how to collect, use or delete your personal information',
  checkingInfo: 'how we check that the information we hold is accurate and up-to-date',
  contactingMOJDataProtection: 'You can contact the MoJ data protection officer by:',
  write:
    'writing to us: The Data Protection Officer, Ministry of Justice, 3rd Floor, Post Point 3.20, 10 South Colonnades, Canary Wharf, London, E14 4PU',
  emailDPO: "emailing: <a class='govuk-link' href='mailto:DPO@justice.gov.uk'>DPO@justice.gov.uk</a>",
  howToComplain: 'How to complain',
  complaints:
    "See our <a class='govuk-link' href='https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service/about/complaints-procedure'>complaints procedure</a> if you want to complain about how we've handled your personal data.",
  complaintsWritten: 'Write to: Post point 10.38, 102 Petty France, London, SW1H 9AJ',
  complaintsEmail:
    "Email:  <a class='govuk-link' href='https://ico.org.uk/global/contact-us'>privacy@justice.gov.uk</a>",
  ico: "You can also complain to the  <a class='govuk-link' href='mailto:privacy@justice.gov.uk'>Information Commissioner’s Office</a> if you’re not satisfied with our response or believe we are not processing your personal data lawfully.",
};

const cy: typeof en = {
  title: 'Overview {in welsh}',
  overview:
    'This privacy policy explains why we collect personal data and what we do with it. It also explains the rights which you and your client have, and how to enforce them.',
  whoManages: 'Who manages this service',
  managedBy:
    'This service is managed by HM Courts & Tribunals Service (HMCTS), which is an executive agency of the Ministry of Justice (MoJ).',
  mojPersonalInformationCharter:
    "The MoJ is known as the data controller for data protection purposes. The <a class='govuk-link' href='https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter'>The MoJ personal information charter</a> explains how the MoJ processes personal data. {in welsh}",
  personalData: 'More information about using this service is in the terms and conditions. {in welsh}',
  thePersonal: 'Why we collect your personal data {in welsh}',
  whenYouUseService: 'We collect personal data to: {in welsh}',
  process: "enable us to process your client's application {in welsh}",
  legal: 'meet legal requirements {in welsh}',
  improvements: 'make improvements to this service',
  staffAndPersonalData:
    "Our staff use personal data to process your client's application. They work in the UK and your data is stored in the UK. {in welsh}",
  typesOfPersonalData: 'Types of personal data we collect {in welsh}',
  personalDataCollected: 'The personal data we collect includes: {in welsh}',
  name: 'your name, address and contact details {in welsh}',
  email: 'your email and password (if you create an account) {in welsh}',
  personalInformation: 'other personal information you provide in your claim or application {in welsh}',
  clientsData: 'your client’s personal data - including their name, address and contact details {in welsh}',
  collectMore: 'We collect more personal data for some types of application. {in welsh}',
  usingYourData: 'Using your data {in welsh}',
  emailAddress:
    'As part of your application, you’ll be asked to use your email address to set up an account. You will be able to use this email and password to sign into other HMCTS services. {in welsh}',
  govUK:
    'We may ask for your permission to use your email address to send you emails using GOV.UK Notify. This system processes emails only within the European Economic Area until the point where emails are handed over to the email provider you use. {in welsh}',
  cookies: 'We use cookies to collect data that tells us about how you’re using this service, including: {in welsh}',
  openEmail: 'if you open an email from us or click on a link in an email {in welsh}',
  ipAddress: 'your computer, phone or tablet’s IP address {in welsh}',
  region: 'the region or town where you are using your computer, phone or tablet {in welsh}',
  webBrowser: 'the web browser you use {in welsh}',
  storingYourData: 'Storing your data {in welsh}',
  amountOfTime:
    "When you make an application we store the data you have provided. The amount of time that your data is kept for depends on what you're applying for. {in welsh}",
  sharingYourData: 'Sharing your data {in welsh}',
  anotherGovDepartment:
    'While processing your application, another government department, agency or organisation might be involved and we may share your data with them. {in welsh}',
  preventCrime:
    'In some circumstances we may share your data, for example to prevent or detect crime, or to produce anonymised statistics. {in welsh}',
  googleAnalytics:
    'We use Google Analytics to collect data about how a website is used. This anonymous data is shared with Google. Find out about this in our terms an conditions. {in welsh}',
  storingAndSharing: 'Storing and sharing your data internationally {in welsh}',
  internationally:
    'Sometimes we need to send your personal information outside of the UK. When we do this we comply with data protection law. {in welsh}',
  yourRights: 'Your rights {in welsh}',
  youCanAsk: 'You can ask: {in welsh}',
  seeData: 'to see the personal data that we hold on you {in welsh}',
  changeData: 'to have the personal data corrected {in welsh}',
  deleteData:
    'to have the personal data removed or deleted (this will depend on the circumstances, for example if you decide not to continue your claim or application) {in welsh}',
  restrictedData:
    'that access to the personal data is restricted (for example, you can ask to have your data stored for longer and not automatically deleted) {in welsh}',
  seePersonalData: 'If you want to see the personal data that we hold on you, you can: {in welsh}',
  mojForm:
    "complete a form to <a class='govuk-link' href=https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter'>make a subject access request</a> - your request goes to the MoJ as data controller {in welsh}",
  writeToUs: 'write to us: Disclosure Team, Post point 10.24, 102 Petty France, London, SW1H 9AJ {in welsh}',
  emailUs:
    "email us: <a class='govuk-link' href='mailto:data.access@justice.gov.uk'>data.access@justice.gov.uk</a> {in welsh}",
  moreInformation: 'You can ask for more information about: {in welsh}',
  sharingInformation: 'agreements we have on sharing information with other organisations {in welsh}',
  passingOnInfo: 'when we are allowed to pass on personal information without telling you {in welsh}',
  staffInstructions: 'our instructions to staff on how to collect, use or delete your personal information {in welsh}',
  checkingInfo: 'how we check that the information we hold is accurate and up-to-date {in welsh}',
  contactingMOJDataProtection: 'You can contact the MoJ data protection officer by: {in welsh}',
  write:
    'writing to us: The Data Protection Officer, Ministry of Justice, 3rd Floor, Post Point 3.20, 10 South Colonnades, Canary Wharf, London, E14 4PU {in welsh}',
  emailDPO: "emailing: <a class='govuk-link' href='mailto:DPO@justice.gov.uk'>DPO@justice.gov.uk</a> {in welsh}",
  howToComplain: 'How to complain {in welsh}',
  complaints:
    "See our <a class='govuk-link' href='https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service/about/complaints-procedure'>complaints procedure</a> if you want to complain about how we've handled your personal data. {in welsh}",
  complaintsWritten: 'Write to: Post point 10.38, 102 Petty France, London, SW1H 9AJ {in welsh}',
  complaintsEmail:
    "Email:  <a class='govuk-link' href='https://ico.org.uk/global/contact-us'>privacy@justice.gov.uk</a> {in welsh}",
  ico: "You can also complain to the  <a class='govuk-link' href='mailto:privacy@justice.gov.uk'>Information Commissioner’s Office</a> if you’re not satisfied with our response or believe we are not processing your personal data lawfully. {in welsh}",
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
