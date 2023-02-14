import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Accessibility statement for Family Private Law',
  websiteRanBy: 'The website is run by HM Courts & Tribunals Service (HMCTS).',
  asManyAsPossible:
    'We want as many people as possible to be able to use this website. For example, that means you should be able to:',
  asManyAsPossibleColours: 'change colours, contrast levels and fonts',
  asManyAsPossibleZoom: 'zoom in up to 300% without the text spilling off the screen',
  asManyAsPossibleKeyboard: 'navigate most of the website using just a keyboard',
  asManyAsPossibleSpeech: 'navigate most of the website using speech recognition software',
  asManyAsPossibleListen:
    'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)',
  simpleAsPossible: 'We’ve also made the website text as simple as possible to understand.',
  abilityNet:
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for AbilityNet">AbilityNet</a> has advice on making your device easier to use if you have a disability.',
  howAccessible: 'How accessible this website is',
  somePartsNot: 'We know some parts of this website are not fully accessible, for example:',
  somePartsNotReflow: "some PDF documents aren't fully accessible to screen reader software",
  somePartsNotSpacing: 'text to speech software cannot read all the text on every page',
  somePartsNotFooter: 'the text used for hyperlinks does not always describe the destination and purpose of the link',
  feedbackAndContactInformation: 'Feedback and contact information',
  needMoreInformation:
    'If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille:',
  phone: 'Telephone:  0300 323 0185',
  email:
    'Email: <a href="hmctsforms@justice.gov.uk" class="govuk-link" aria-label="This link will open in a new email to hmctsforms@justice.gov.uk">hmctsforms@justice.gov.uk</a>',
  considerYourRequest: 'We’ll consider your request and get back to you in 10 working days.',
  reportingAccessibility: 'Reporting accessibility problems with this website',
  accessibilityPhoneNumber: 'Telephone: 0300 323 0185',
  improveAccessibility:
    'If you find any problems not listed on this page or think we’re not meeting accessibility requirements:',
  enforcementProcedure: 'Enforcement procedure',
  humanRightsCommission:
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the <a href="www.legislation.gov.uk/uksi/2018/852/contents/made" class="govuk-link" target="_blank" aria-label="This link will open a new tab for legislation.gov.uk">Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 </a> (the ‘accessibility regulations’).',
  notHappy:
    'If you’re not happy with how we respond to your complaint, contact the <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">Equality Advisory and Support Service (EASS)</a>.',
  contactingUs: 'Contacting us by phone or visiting us in person',
  contactTextRelay:
    'We provide a text relay service for people who are D/deaf, hearing impaired or have a speech impediment.',
  contactInductionLoops:
    'Our offices have audio induction loops, or if you contact us before your visit we can arrange a British Sign Language (BSL) interpreter.',
  contactCourtDirectly: 'To get in touch with us:',
  technicalInfo: 'Technical information about this website’s accessibility',
  partiallyCompliant:
     'This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to the non-compliances listed below.',
  hmctsIsCommitted:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
  nonAccessibleContent: 'Non-accessible content',
  issuesWithDocuments: 'Non-compliance with the accessibility regulations',
  issuesWithDocumentDescription1:
    'Some pages do not have a logical heading structure in place, which is a barrier for users who rely on headings for navigation. This does not meet WCAG 2.1 success criterion 1.3.1 (Information and Relationships).',
  issuesWithDocumentDescription2:
    'Some content is presented to look like a table, but does not contain table mark-up. This does not meet WCAG 2.1 success criteria 1.3.1 (Information and Relationships) and 1.3.2 (Meaningful Sequence).',
  issuesWithDocumentDescription3:
    'Some links are ambiguous and non-descriptive, and do not describe the destination of the link. This does not meet WCAG 2.1. success criterion 2.4.9 (Link Purpose - Link Only).',
  issuesWithDocumentDescription4:
    'Some lists are not structured to be compatible with screen readers and other assistive technology. This does not meet WCAG 2.1 success criteria 1.3.1 (Information and Relationships) and 4.1.1 (Parsing).',
  issuesWithDocumentDescription5:
    'Some forms are difficult to navigate using a screen reader or keyboard commands. This does not meet WCAG 2.1 success criteria 1.3.1 (Information and Relationships) and 2.4.6 (Heading and Labels).',
  issuesWithDocumentDescription6:
    'PDFs are used to download and keep service receipts and copies of orders and directions, but are not structured to be accessible to a screen reader.  This does not meet WCAG 2.1 success criteria 1.3.1 (Information and Relationships), 1.1.1 (Non-text Content) and 2.3.2 (Page Titled).',
  otherKnownIssues: 'Other known issues',
  knownIssues1: 'On some pages, fields do not have associated labels that are accessible to a screen reader.',
  knownIssues2:
    'Some page elements are coded with duplicate IDs, which means that these elements can be missed by a screen reader.',
  knownIssues3: 'Some visual labels do not function correctly for users who navigate pages with voice activation.',
  knownIssues4:
    "Users are not warned of a 'timeout' or given the option to extend their time when completing certain tasks.",
  toImproveAccessibility: 'What we’re doing to improve accessibility',
  improveAccessibilityDescription:
    'We are working to improve accessibility on this website, and plan to fix the identified issues by 30 November 2023.',
  preparationAccessibilityStatement: 'Preparation of this accessibility statement',
  statementPreparationDate:
    'This statement was prepared on Wednesday 4 January 2023. It was last reviewed on 17 January 2023.',
  statementPreparationWebsite:
    'This website was last tested on 25 November 2022. The test was carried out by the Digital Accessibility Centre (DAC).',
  dacExcerpt: 'This is an excerpt from the DAC report explaining their methodology:',
  dacTestingProcedure: 'Testing procedure:',
  dacTestingProcedureDescription:
    '“The service is tested by a team of experienced auditors and analysts, many of whom are disabled individuals and users of adaptive technology. The combination of subjective pan-disability user feedback and comprehensive technical auditing allows us to measure how the service performs technically and practically, thereby offering an essential added dimension to our test results that other methods of testing cannot provide.”',
  dacTestingProcedure2: 'User testing:',
  dacTestingProcedureDescription2:
    '“Manual accessibility checking was conducted by a team of disabled individuals, using a range of adaptive technologies (hardware and software designed to facilitate the use of computers by people with disabilities).”',
  dacTestingProcedure3: 'Technical auditing:',
  dacTestingProcedureDescription3:
    '“Technical auditing involves the experienced application of a number of technical auditing and standards compliance assessment tools. This combined with an extensive knowledge of WCAG, its application and wider global practice provides the DAC website with further credibility and quality.”',
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
  email: 'E-bost: <a href=”privatelawproject@justice.gov.uk” class=”govuk-link”>privatelawproject@justice.gov.uk</a>',
  phone: 'Ffoniwch: 01634 887900',
  considerYourRequest: 'Byddwn yn ystyried eich cais ac yn ymateb o fewn 10 diwrnod gwaith.',
  reportingAccessibility: "Riportio problemau hygyrchedd gyda'r wefan hon",
  accessibilityPhoneNumber: 'Ffôn: 01634 887900',
  improveAccessibility:
    'Rydym wastad yn ceisio gwella hygyrchedd y wefan hon. Os byddwch yn cael unrhyw broblemau nad ydynt yn cael eu crybwyll ar y dudalen hon, neu os ydych yn credu nad ydym yn bodloni gofynion y rheoliadau hygyrchedd, cysylltwch â: <a href=”mailto:privatelawproject@justice.gov.uk” class=”govuk-link”>privatelawproject@justice.gov.uk</a>.',
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
