import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Accessibility statement for the private law service',
  websiteRanBy: 'This service allows prospective parents to apply to adopt a child online.',
  asManyAsPossible:
    "This service is run by HM Courts and Tribunals. We want as many people as possible to be able to use it, so we've designed it to be accessible. For example, you should be able to:",
  asManyAsPossibleColours: 'change colours, contrast levels and fonts',
  asManyAsPossibleZoom: 'zoom in up to 300% without the text spilling off the screen',
  asManyAsPossibleKeyboard: 'navigate most of the website using just a keyboard',
  asManyAsPossibleSpeech: 'navigate most of the website using speech recognition software',
  asManyAsPossibleListen:
    'listen to most of the website using a screen reader (including the most recent versions of NVDA, CCA(colour contrast Analyser) and Voiceover)',
  simpleAsPossible: "We've also made the text as simple as possible to understand.",
  abilityNet:
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for AbilityNet">AbilityNet</a> has advice on making your device easier to use if you have a disability.',
  howAccessible: 'How accessible this website is',
  somePartsNot: 'We know some parts of this service may not be accessible:',
  somePartsNotReflow: 'the text will not reflow in a single column when you change the size of the browser window',
  somePartsNotSpacing: 'you cannot modify the line height or spacing of text',
  somePartsNotFooter: 'All footer links not yet implemented and so has not tested.',
  feedbackAndContactInformation: 'Feedback and contact information',
  needMoreInformation:
    'If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille:',
  email:
    'Email: <a href="adoptionproject@justice.gov.uk" class="govuk-link" aria-label="This link will open in a new email to adoptionproject@justice.gov.uk">adoptionproject@justice.gov.uk</a>',
  phone: 'Call: 01634 887900',
  considerYourRequest: 'We’ll consider your request and get back to you in 10 working days.',
  reportingAccessibility: 'Reporting accessibility problems with this website',
  accessibilityPhoneNumber: 'Telephone: 01634 887900',
  improveAccessibility:
    'We’re always looking to improve the accessibility of this website. If you find any problems that aren’t addressed on this page, or think we’re not meeting accessibility requirements, please contact us:',
  enforcementProcedure: 'Enforcement procedure',
  humanRightsCommission:
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’).',
  notHappy:
    'If you’ve contacted us about accessibility and you’re not happy with our response, you can contact the <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">Equality Advisory and Support Service (EASS)</a>.',
  contactingUs: 'Contacting us by phone or visiting us in person',
  contactCourtDirectly:
    'If you have a question about accessibility in our family courts, you can <a href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/search-by-postcode" class="govuk-link" target="blank">contact the court directly</a>.',
  contactTextRelay:
    'We provide a text relay service for people who are D/deaf, hearing impaired or have a speech impediment.',
  contactInductionLoops:
    'The family courts have audio induction loops and you can also request step-free access, a sign language interpreter or foreign language interpreter.',
  technicalInfo: 'Technical information about this website’s accessibility',
  hmctsIsCommitted:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
  complianceStatus: 'Compliance status',
  partiallyCompliant:
    'This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to the non-compliances and exemptions listed below.',
  partiallyCompliantMobile:
    'Content not presented without loss of information and requiring scrolling in two dimensions while using Adoption application via Mobile.',
  nonAccessibleContent: 'Content that’s not within the scope of the accessibility regulations',
  issuesWithDocuments: 'Documents',
  issuesWithDocumentDescription1:
    'Many of our older PDFs and Word documents do not meet accessibility standards - for example, they may not be structured so they’re accessible to a screen reader. This does not meet WCAG 2.1 success criterion 4.1.2 (name, role value).',
  issuesWithDocumentDescription2:
    'Some of our PDFs and Word documents are essential to providing our services. By December 2021, we plan to either fix these or replace them with accessible HTML pages. Any new PDFs or Word documents we publish will meet accessibility standards.',
  issuesSurveys: 'Surveys',
  issuesSurveysDescription:
    'Our feedback form and exit survey are both hosted by a third-party provider. We identified a number of accessibility issues with these pages but fixing them is beyond our control. We are liaising with the Ministry of Justice Transforming Performance and Perception team to see what improvements can be made.',
  issuesWithLinks: 'Issues with links',
  issuesWithLinksDescription:
    'On some pages, text used for links doesn’t clearly state where the link goes or what its for. This doesn’t meet WCAG 2.1 success criterion 2.4.4 (Link Purpose, In Context).',
  issuesWithHeadings: 'Issues with headings',
  issuesWithHeadingsDescription: 'N/A',
  issuesWithColour: 'Colour contrast',
  issuesWithColourDescription: 'N/A',
  issuesWithLanguage: 'Issues with language',
  issuesWithLanguageDescription:
    'On some pages the language has not been set in the code. This doesn’t meet WCAG 2.1 success criterion 3.1.2 (Language of Page) as “WELSH” translation is in work in progress.',
  issuesWithOther: 'Other known issues',
  issuesWithOtherDescription1: 'N/A',
  howWeTested: 'How we tested this website',
  howWeTestedUI: 'The user interface has been tested by our team using a range of tools.',
  howWeTestedPatty: 'Pa11Y – Test automation tool kit',
  howWeTestedNVDA: 'NVDA tool',
  howWeTestedColourContrast: 'Colour contrast analyser tool for validating contrast ratio’s',
  howWeTestedVoiceOver: 'VoiceOver',
  howWeTestedE2E: 'End-to-end testing for all GDS browsers for keyboard use.',
  improvingAccessibility: 'What we’re doing to improve accessibility',
  statementCommitted:
    'We’re committed to ensuring our services are accessible to all our customers and that they comply with level AA of the Web Content Accessibility Guidelines – WCAG 2.1.',
  statementDAC:
    'To help us achieve this, we will commission the <a href="https://digitalaccessibilitycentre.org/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Digital Accessibility Centre">Digital Accessibility Centre (DAC)</a> to carry out a WCAG 2.1 AA level technical compliance audit that includes over 50 hours of testing by users with a wide range of disabilities. We will update this statement with the testing date when it is confirmed. Any issues identified during testing will be reviewed and addressed appropriately.',
  preparationAccessibilityStatement: 'Preparation of this accessibility statement',
  statementPreparationDate: 'This statement was prepared on 11 March 2022. It was last reviewed on 11 March 2022.',
  contactHelp: 'Contact us for help:',
};

const cy = {
  title: 'Datganiad hygyrchedd ar gyfer y gwasanaeth mabwysiadu',
  websiteRanBy: 'Mae’r gwasanaeth hwn yn caniatáu i ddarpar rieni wneud cais i fabwysiadu plentyn ar-lein.',
  asManyAsPossible:
    'Gwasanaeth Llysoedd a Thribiwnlysoedd EM sy’n gyfrifol am y gwasanaeth hwn.  Rydym eisiau i gymaint o bobl â phosibl allu ei ddefnyddio, felly rydym wedi ceisio ei wneud mor hygyrch â phosibl.  Er enghraifft, dylech allu:',
  asManyAsPossibleColours: 'newid y lliwiau, y lefelau cyferbyniad a’r ffontiau',
  asManyAsPossibleZoom: 'gwneud y testun hyd at 300% yn fwy heb iddo ddiflannu oddi ar y sgrin',
  asManyAsPossibleKeyboard: "llywio'r rhan fwyaf o'r wefan gan ddefnyddio bysellfwrdd yn unig",
  asManyAsPossibleSpeech: "llywio'r rhan fwyaf o'r wefan gan ddefnyddio meddalwedd adnabod llais",
  asManyAsPossibleListen:
    'gwrando ar y rhan fwyaf o’r wefan gan ddefnyddio darllenydd sgrin (gan gynnwys fersiynau diweddaraf NVDA, CCA (Dadansoddwr cyferbyniad lliwiau) a VoiceOver)',
  simpleAsPossible: "Rydym hefyd wedi gwneud y testun mor syml â phosibl i'w ddeall.",
  abilityNet:
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank">Mae AbilityNet</a> yn rhoi cyngor ar sut i wneud eich dyfais yn haws i’w defnyddio os oes gennych anabledd.',
  howAccessible: "Pa mor hygyrch yw'r wefan hon",
  somePartsNot: "Rydym yn gwybod nad yw rhai rhannau o'r wefan hon yn gwbl hygyrch:",
  somePartsNotReflow: 'nid yw’r testun yn newid i fod mewn un golofn pan fyddwch yn newid maint ffenestr y porwr',
  somePartsNotSpacing: 'ni allwch newid lled y llinellau neu fylchiad y testun',
  somePartsNotFooter: 'Nid yw’r holl ddolenni yn y troedynnau yn weithredol ac felly nid ydynt wedi’u profi.',
  feedbackAndContactInformation: 'Adborth a gwybodaeth gyswllt',
  needMoreInformation:
    'Os ydych angen gwybodaeth sydd ar y wefan hon mewn fformat arall megis ar ffurf PDF hygyrch, print bras, fformat hawdd ei ddarllen, recordiad sain neu braille:',
  email: 'E-bost: <a href=”adoptionproject@justice.gov.uk” class=”govuk-link”>adoptionproject@justice.gov.uk</a>',
  phone: 'Ffoniwch: 01634 887900',
  considerYourRequest: 'Byddwn yn ystyried eich cais ac yn ymateb o fewn 10 diwrnod gwaith.',
  reportingAccessibility: "Riportio problemau hygyrchedd gyda'r wefan hon",
  accessibilityPhoneNumber: 'Ffôn: 01634 887900',
  improveAccessibility:
    'Rydym wastad yn ceisio gwella hygyrchedd y wefan hon. Os byddwch yn cael unrhyw broblemau nad ydynt yn cael eu crybwyll ar y dudalen hon, neu os ydych yn credu nad ydym yn bodloni gofynion y rheoliadau hygyrchedd, cysylltwch â: <a href=”mailto:adoptionproject@justice.gov.uk” class=”govuk-link”>adoptionproject@justice.gov.uk</a>.',
  enforcementProcedure: 'Y Weithdrefn Orfodi',
  humanRightsCommission:
    'Y Comisiwn Cydraddoldeb a Hawliau Dynol (EHRC) sy’n gyfrifol am orfodi Rheoliadau Hygyrchedd Cyrff y Sector Cyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018 (y ‘rheoliadau hygyrchedd’).',
  notHappy:
    'Os ydych wedi cysylltu â ni ynghylch mater hygyrchedd ac nad ydych yn fodlon â’n hymateb, gallwch gysylltu â’r <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank">Gwasanaeth Chynghori a Chymorth Cydraddoldeb (EASS)</a>.',
  contactingUs: 'Cysylltu â ni dros y ffôn neu ymweld â ni’n bersonol',
  contactCourtDirectly:
    'Os oes gennych gwestiwn am hygyrchedd yn ein llysoedd teulu, gallwch <a href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/search-by-postcode?lng=cy" class="govuk-link" target="blank">cysylltu â’r llys yn uniongyrchol</a>.',
  contactTextRelay:
    'Rydym yn darparu gwasanaeth cyfnewid negeseuon testun ar gyfer pobl fyddar, pobl sydd â nam ar eu clyw a phobl sydd â nam ar eu lleferydd.',
  contactInductionLoops:
    'Mae gan y llysoedd teulu ddolenni sain a gallwch hefyd ofyn am gael mynediad heb risiau, cyfieithydd iaith arwyddion neu gyfieithydd iaith dramor.',
  technicalInfo: 'Gwybodaeth dechnegol am hygyrchedd y wefan hon',
  hmctsIsCommitted:
    'Mae GLlTEM wedi ymrwymo i sicrhau bod ei wefannau yn hygyrch, a hynny yn unol â Rheoliadau Hygyrchedd Cyrff y Sector Gyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018.',
  complianceStatus: 'Statws cydymffurfiaeth',
  partiallyCompliant:
    'Mae’r wefan hon yn cydymffurfio’n rhannol â safon <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">AA Canllawiau Hygyrchedd Cynnwys Gwe fersiwn 2.1,</a>a hynny oherwydd y materion o beidio â chydymffurfio a’r esemptiadau a restrir isod.',
  partiallyCompliantMobile:
    'Cynnwys ddim i’w weld heb golli gwybodaeth ac angen sgrolio mewn dwy ffordd wahanol wrth ddefnyddio’r gwasanaeth Mabwysiadu ar ddyfais symudol. ',
  nonAccessibleContent: 'Cynnwys sydd ddim o fewn cwmpas y rheoliadau hygyrchedd',
  issuesWithDocuments: 'Dogfennau',
  issuesWithDocumentDescription1:
    'Nid yw nifer o’n dogfennau PDF a Word hŷn yn bodloni’r safonau hygyrchedd - er enghraifft, efallai nad ydynt wedi’u strwythuro fel eu bod yn hygyrch i ddarllenydd sgrin. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 4.1.2 (Enw, Rôl, Gwerth).',
  issuesWithDocumentDescription2:
    'Mae rhai o’n dogfennau PDF a Word yn hanfodol i’r gwasanaethau a ddarparwn. Erbyn Rhagfyr 2021, rydym yn cynllunio i naill ai ddatrys y materion neu eu cyfnewid gyda thudalennau HTML hygyrch. Bydd unrhyw ddogfennau PDF neu Word newydd y byddwn yn eu cyhoeddi yn bodloni’r safonau hygyrchedd.',
  issuesSurveys: 'Arolygon',
  issuesSurveysDescription:
    'Mae ein ffurflen adborth a’r arolwg adborth yn cael eu cynnal gan ddarparwr trydydd parti. Mi wnaethom adnabod nifer o faterion hygyrchedd gyda’r tudalennau hyn ond mae eu datrys y tu hwnt i’n rheolaeth. Rydym yn trafod gyda thîm Trawsnewid Perfformiad a Chanfyddiad y Weinyddiaeth Gyfiawnder i ganfod pa welliannau y gellir gwneud.',
  issuesWithLinks: 'Problemau gyda dolenni',
  issuesWithLinksDescription:
    'Ar rai tudalennau, nid yw’r testun a ddefnyddir ar gyfer dolenni yn nodi’n glir i ble y bydd y ddolen yn mynd â chi neu beth yw ei phwrpas. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 2.4.4 (Pwrpas y Ddolen, Ystyried y Cyd-destun).',
  issuesWithHeadings: 'Problemau gyda phenawdau',
  issuesWithHeadingsDescription: 'Amherthnasol',
  issuesWithColour: 'Cyferbyniad lliwiau',
  issuesWithColourDescription: 'Amherthnasol',
  issuesWithLanguage: 'Problemau ieithyddol',
  issuesWithLanguageDescription:
    'Ar rai tudalennau, nid yw’r iaith wedi’i rhoi mewn cod. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 3.1.2 (Iaith tudalen) gan fod y cyfieithiad “CYMRAEG” yn cael ei baratoi ar hyn o bryd.',
  issuesWithOther: 'Problemau hysbys eraill',
  issuesWithOtherDescription1: 'Amherthnasol',
  howWeTested: 'Sut rydym wedi profi’r wefan hon',
  howWeTestedUI:
    'Mae’r rhyngwyneb a ddefnyddir gan y defnyddiwr wedi’i brofi gan ein tîm gan ddefnyddio amrywiaeth o adnoddau.',
  howWeTestedPatty: 'Pa11Y – Adnodd profi awtomatiaeth',
  howWeTestedNVDA: 'Adnodd NVDA',
  howWeTestedColourContrast: 'Adnodd dadansoddi cyferbyniad lliwiau i ddilysu cymarebau cyferbyniad',
  howWeTestedVoiceOver: 'VoiceOver',
  howWeTestedE2E: 'Profi holl borwyr GDS o’r dechrau i’r diwedd ar gyfer defnyddio bysellfwrdd.',
  improvingAccessibility: 'Beth rydym yn ei wneud i wella hygyrchedd',
  statementCommitted:
    'Rydym wedi ymrwymo i sicrhau bod ein gwasanaethau’n hygyrch i’n holl gwsmeriaid a’u bod yn cydymffurfio â lefel AA Canllawiau Hygyrchedd Cynnwys Gwe - WCAG 2.1.',
  statementDAC:
    'I’n helpu i gyflawni hyn, byddwn yn comisiynu <a href="https://digitalaccessibilitycentre.org/" class="govuk-link" target="_blank">y Ganolfan Hygyrchedd Digidol (DAC)</a>. i gynnal archwiliad cydymffurfiad technegol WCAG 2.1 lefel AA lle bydd profion yn cael eu cynnal am dros 50 awr gan ddefnyddwyr sydd ag amrywiaeth eang o anableddau. Byddwn yn diweddaru’r datganiad hwn gyda dyddiad y profi ar ôl iddo gael ei gadarnhau. Bydd unrhyw faterion a adnabyddir yn ystod y profi yn cael eu hadolygu ac yn cael y sylw priodol',
  preparationAccessibilityStatement: 'Paratoi’r datganiad hygyrchedd hwn',
  statementPreparationDate:
    'Cafodd y datganiad hwn ei baratoi ar 11 Mawrth 2022. Cafodd ei adolygu diwethaf ar 11 Mawrth 2022.',
  contactHelp: 'Cysylltwch â ni i gael cymorth:',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
