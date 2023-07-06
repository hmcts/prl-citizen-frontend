import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Privacy Policy',
  overview: 'Overview',
  whyWeCollect:
    'This privacy policy explains why we collect personal data and what we do with it. It also explains the rights which you and your client have, and how to enforce them.',
  whoManages: 'Who manages this service',
  managedBy:
    'This service is managed by HM Courts & Tribunals Service (HMCTS), which is an executive agency of the Ministry of Justice (MoJ).',
  mojPersonalInformationCharter:
    "The MoJ is known as the data controller for data protection purposes. The <a class='govuk-link' href='https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter'>The MoJ personal information charter</a> explains how the MoJ processes personal data.",
  protectingData:
    'As part of the MoJ, HMCTS is responsible for deciding how personal data is used and for protecting the personal data you provide.',
  personalData:
    "More information about using this service is in the <a class='govuk-link' href='/terms-and-conditions'>terms and conditions</a>.",
  thePersonal: 'Why we collect your personal data',
  whenYouUseService: 'We collect personal data to:',
  process: "enable us to process your client's application",
  legal: 'meet legal requirements',
  improvements: 'make improvements to this service',
  staffAndPersonalData:
    "Our staff use personal data to process your client's application. They work in the UK and your data is stored in the UK.",
  typesOfPersonalData: 'Types of personal data we collect',
  personalDataCollected: 'The personal data we collect includes:',
  yourName: 'your name, address and contact details',
  email: 'your email and password (if you create an account)',
  personalInformation: 'other personal information you provide in your claim or application',
  clientsData: 'your client’s personal data - including their name, address and contact details',
  collectMore: 'We collect more personal data for some types of application.',
  usingYourData: 'Using your data',
  emailAddress:
    'As part of your application, you’ll be asked to use your email address to set up an account. You will be able to use this email and password to sign into other HMCTS services.',
  govUK:
    'We may ask for your permission to use your email address to send you emails using GOV.UK Notify. This system processes emails only within the European Economic Area until the point where emails are handed over to the email provider you use.',
  govCookies: 'We use cookies to collect data that tells us about how you’re using this service, including:',
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
  title: 'Polisi Preifatrwydd',
  overview: 'Trosolwg',
  whyWeCollect:
    'Mae’r polisi preifatrwydd hwn yn egluro pam rydym yn casglu data personol a beth rydym yn ei wneud ag ef. Mae hefyd yn egluro eich hawliau chi a hawliau eich cleient, a sut i’w gorfodi.',
  whoManages: "Pwy sy’n rheoli'r gwasanaeth hwn",
  managedBy:
    'Gwasanaeth Llysoedd a Thribiwnlysoedd EF (GLlTEF) sy’n rheoli’r gwasanaeth hwn, sef un o asiantaethau gweithredol y Weinyddiaeth Gyfiawnder (MoJ)',
  mojPersonalInformationCharter:
    "MoJ yw’r rheolydd data at ddibenion diogelu data. Mae <a class='govuk-link' href='https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter'>siarter gwybodaeth bersonol yr MoJ yn</a> egluro sut mae’r MoJ yn prosesu data personol.",
  protectingData:
    "Fel rhan o’r MoJ, mae GLlTEF yn gyfrifol am benderfynu sut mae data personol yn cael ei ddefnyddio ac am ddiogelu'r data personol rydych yn ei ddarparu.",
  personalData:
    "Ceir rhagor o wybodaeth am ddefnyddio’r gwasanaeth hwn yn y <a class='govuk-link' href='/terms-and-conditions'>telerau ac amodau</a>.",
  thePersonal: 'Pam rydym ni’n casglu eich data personol',
  whenYouUseService: 'Rydym ni’n casglu data personol er mwyn:',
  process: 'ein galluogi i brosesu cais eich cleient',
  legal: 'bodloni gofynion cyfreithiol',
  improvements: 'gwella’r gwasanaeth hwn',
  staffAndPersonalData:
    'Mae ein staff yn defnyddio data personol i brosesu cais eich cleient. Maent yn gweithio yn y DU ac mae eich data yn cael ei storio yn y DU.',
  typesOfPersonalData: 'Mathau o ddata personol rydym yn ei gasglu',
  personalDataCollected: 'Mae’r data personol rydym yn ei gasglu yn cynnwys:',
  yourName: 'eich enw, eich cyfeiriad a’ch manylion cyswllt ',
  email: 'eich e-bost a’ch cyfrinair (os byddwch yn creu cyfrif) ',
  personalInformation: 'gwybodaeth bersonol arall rydych yn ei darparu yn eich hawliad neu gais',
  clientsData: 'data personol eich cleient - gan gynnwys eu henw, eu cyfeiriad a’u manylion cyswllt ',
  collectMore: 'Rydym yn casglu mwy o ddata personol na hyn ar gyfer rhai mathau o geisiadau.',
  usingYourData: 'Defnyddio eich data',
  emailAddress:
    'Fel rhan o’ch cais, fe ofynnir ichi ddefnyddio eich cyfeiriad e-bost i greu cyfrif. Byddwch yn gallu defnyddio’r cyfeiriad e-bost hwn a chyfrinair i fewngofnodi i wasanaethau eraill GLlTEF.',
  govUK:
    'Efallai y byddwn yn gofyn am eich caniatâd i ddefnyddio eich cyfeiriad e-bost i anfon negeseuon e-bost atoch trwy’r system GOV.UK Notify. Mae’r system hon yn prosesu negeseuon e-bost o fewn Ardal Economaidd Ewrop yn unig tan y pwynt lle caiff negeseuon e-bost eu trosglwyddo i’r darparwr e-bost a ddefnyddiwch.',
  govCookies: "Rydym yn defnyddio cwcis i gasglu data am sut rydych yn defnyddio'r gwasanaeth hwn, gan gynnwys: ",
  openEmail: 'os byddwch yn agor neges e-bost gennym neu’n clicio ar ddolen mewn e-bost ',
  ipAddress: "cyfeiriad IP eich cyfrifiadur, eich ffôn symudol neu'ch tabled ",
  region: 'yr ardal neu’r dref lle rydych yn defnyddio’ch cyfrifiadur, ffôn neu dabled ',
  webBrowser: 'y porwr gwe rydych yn ei ddefnyddio',
  storingYourData: 'Storio eich data',
  amountOfTime:
    "Pan fyddwch yn gwneud cais, rydym yn storio'r data a ddarparwyd gennych. Mae am faint o amser y cedwir eich data yn dibynnu ar beth rydych yn gwneud cais amdano.",
  sharingYourData: 'Rhannu eich data',
  anotherGovDepartment:
    'Pan fydd eich cais yn cael ei brosesu, mae’n bosib y byddwn angen cysylltu ag adran, asiantaeth neu sefydliad arall yn y llywodraeth ac efallai y byddwn yn rhannu eich data â nhw.',
  preventCrime:
    'Mewn rhai amgylchiadau efallai y byddwn yn rhannu eich data, er enghraifft i atal neu i ddatrys trosedd, neu i gynhyrchu ystadegau cyffredinol.',
  googleAnalytics:
    "Rydym yn defnyddio Google Analytics i gasglu data am sut y defnyddir gwefan. Mae'r data cyffredinol hwn yn cael ei rannu â Google. Mae rhagor o wybodaeth am hyn yn ein telerau ac amodau.",
  storingAndSharing: 'Storio a rhannu eich data’n rhyngwladol',
  internationally:
    "Weithiau efallai y bydd angen inni anfon eich gwybodaeth bersonol y tu allan i'r DU. Pan fyddwn yn gwneud hyn, byddwn yn cydymffurfio â chyfraith diogelu data.",
  yourRights: 'Eich hawliau',
  youCanAsk: 'Gallwch ofyn:',
  seeData: 'i gael gweld y data personol rydym yn ei gadw amdanoch',
  changeData: "i'r data personol gael ei gywiro",
  deleteData:
    'i’r data personol gael ei symud neu ei ddileu (bydd hyn yn ddibynnol ar yr amgylchiadau, er enghraifft os ydych yn penderfynu peidio â pharhau gyda’ch hawliad neu’ch cais)',
  restrictedData:
    "i gyfyngu ar y mynediad at y data personol (er enghraifft, gallwch ofyn i'ch data gael ei storio am gyfnod hirach a pheidio â chael ei ddileu'n awtomatig)",
  seePersonalData: 'Os ydych eisiau gweld y data personol rydym yn ei gadw amdanoch, gallwch:',
  mojForm:
    "lenwi ffurflen i <a class='govuk-link' href=https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter'>wneud cais am fynediad at wybodaeth</a> - bydd eich cais yn cael ei gyfeirio at y rheolydd data, sef MoJ",
  writeToUs: 'ysgrifennu atom yn: Disclosure Team, Post point 10.24, 102 Petty France, Llundain, SW1H 9AJ',
  emailUs:
    "anfon e-bost i: <a class='govuk-link' href='mailto:data.access@justice.gov.uk'>data.access@justice.gov.uk</a>",
  moreInformation: 'Gallwch ofyn am fwy o wybodaeth ynghylch:',
  sharingInformation: 'cytundebau sydd gennym ar rannu gwybodaeth gyda sefydliadau eraill',
  passingOnInfo: 'pryd y caniateir inni drosglwyddo gwybodaeth bersonol amdanoch heb roi gwybod ichi',
  staffInstructions: 'ein cyfarwyddiadau i staff ynghylch sut i gasglu, defnyddio neu ddileu eich gwybodaeth bersonol',
  checkingInfo: 'sut rydym yn gwirio bod yr wybodaeth sydd gennym yn gywir ac yn gyfredol',
  contactingMOJDataProtection: 'Gallwch gysylltu â swyddog diogelu data’r MoJ drwy:',
  write:
    'ysgrifennu atom yn: The Data Protection Officer, Ministry of Justice, 3rd Floor, Post Point 3.20, 10 South Colonnades, Canary Wharf, Llundain, E14 4PU',
  emailDPO: "anfon neges e-bost i <a class='govuk-link' href='mailto:DPO@justice.gov.uk'>DPO@justice.gov.uk</a>",
  howToComplain: 'Sut i wneud cwyn',
  complaints:
    "Gweler ein <a class='govuk-link' href='https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service/about/complaints-procedure'>gweithdrefn gwyno</a> os ydych eisiau cwyno am sut rydym wedi trin eich data personol.",
  complaintsWritten: 'Ysgrifennwch i: Post point 10.38, 102 Petty France, Llundain SW1H 9AJ',
  complaintsEmail:
    "E-bostiwch: <a class='govuk-link' href='https://ico.org.uk/global/contact-us'>privacy@justice.gov.uk</a>",
  ico: "Gallwch gwyno hefyd wrth  <a class='govuk-link' href='mailto:privacy@justice.gov.uk'>Swyddfa’r Comisiynydd Gwybodaeth</a> os ydych yn anfodlon â’n ymateb neu’n credu nad ydym yn prosesu eich data personol yn gyfreithlon.",
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
