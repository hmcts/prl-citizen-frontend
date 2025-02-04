/* eslint-disable import/namespace */
import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  title: 'Accessibility statement for Family Private Law',
  paragraphs: [
    'This accessibility statement applies to <a href="/" class="govuk-link" target="_blank">this link</a>, that enables users to make child arrangements or submit domestic abuse applications.',
    'The website is run by HM Courts & Tribunals Service (HMCTS).',
    'We want as many people as possible to be able to use this website. For example, that means you should be able to:',
  ],
  accessibilityOptions: [
    'change colours, contrast levels and fonts using browser or device settings',
    'zoom in up to 400% without the text spilling off the screen',
    'navigate most of the website using just a keyboard',
    'navigate most of the website using speech recognition software',
    'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)',
  ],
  additionalParagraphs: [
    'We’ve also made the website text as simple as possible to understand.',
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank">AbilityNet</a> has advice on making your device easier to use if you have a disability.',
  ],
  howAccessible: 'How accessible this website is',
  somePartsNot: 'We know some parts of this website are not fully accessible, for example:',
  notAccessibleParts: [
    'some heading labels are non-descriptive',
    'some content becomes obscured when resizing text',
    "some PDF documents aren't fully accessible to screen reader software",
    'a language attribute for some Welsh text is missing which will impact some text to speech software pronunciation',
    'error messages require improvement to convey suggestions on how to correct the error',
  ],
  feedbackAndContactInformation: 'Feedback and contact information',
  contactInfo: [
    'We provide a text relay service for people who are d/Deaf, hearing impaired or have a speech impediment.',
    'Our offices have audio induction loops, or if you contact us before your visit we can arrange a British Sign Language (BSL) interpreter.',
    'If you require support when visiting or need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille contact us at:',
  ],
  phoneAndEmail: ['Email: hmctsforms@justice.gov.uk', 'Telephone: 0300 323 0185'],
  considerYourRequest: 'We’ll consider your request and get back to you in 10 working days.',
  reportingAccessibility: 'Reporting accessibility problems with this website',
  improvements: [
    'We’re always looking to improve the accessibility of this website.',
    'If you find any problems not listed on this page or think we’re not meeting accessibility requirements:',
  ],
  enforcementProcedure: 'Enforcement procedure',
  humanRightsInfo: [
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the <a href="https://www.legislation.gov.uk/uksi/2018/852/contents/made" class="govuk-link" target="_blank" aria-label="This link will open a new tab for legislation.gov.uk">Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 </a> (the ‘accessibility regulations’).',
    'If you’re not happy with how we respond to your complaint, contact the <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">contact the Equality Advisory and Support Service (EASS)</a>.',
  ],

  technicalInfo: 'Technical information about this website’s accessibility',
  hmctsIsCommitted:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
  complianceStatus: 'Compliance status',
  partiallyCompliant:
    'This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">Web Content Accessibility Guidelines version 2.2</a> AA standard, due to the non-compliances listed below.',
  nonAccessibleContent: 'Non-accessible content',
  nonAccessibleDescription: 'The content listed below is non-accessible for the following reasons.',
  issuesWithDocuments: 'Non-compliance with the accessibility regulations',
  issuesWithDocumentDescriptions: [
    'Heading labels are provided however they are non-descriptive.  This does not meet WCAG 2.2 success criterion 2.4.6 Headings and Labels (Level AA).',
    'An autocomplete attribute has been supplied an invalid value for ‘property name or number’ which may cause issues for screen reader users.  This does not meet WCAG 2.2 success criterion 1.3.5 Identify Input Purpose (Level AA).',
    'Text was found to fail the minimum text contrast requirements within ‘draft’ marked PDF documents.  This does not meet WCAG 2.2 success criterion 1.4.3 Contrast (Minimum) (Level AA)',
    'Content becomes obscured when resizing text on the page. This does not meet WCAG 2.2 success criterion 1.4.4 Resize text (Level AA).',
    'Some error messages do not convey suggestions on how to correct the errors.  This does not meet WCAG 2.2 success criterion 3.3.3 Error Suggestion (Level AA).',
    'A timeout feature is present however there is no way to adjust or cancel when the timeout occurs throughout the service. The lack of a prior warning may cause frustration and make it much more difficult for users who need additional time. This fails WCAG 2.2 success criterion 2.2.1 Timing Adjustable (Level A).',
    'A fieldset is used however no legend was included and in some cases is unnecessary. This can be confusing for screen reader users when navigating out of context. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A).',
    'Optional pages are not relayed as such for users navigating the service which means that some users may become stuck at this stage as they may feel forced to upload a document as nothing on the page informs users of the step being optional. This fails WCAG 2.2 success criterion 3.3.2 Labels or Instructions (Level A).',
    'Some labels may be present but not programmatically associated to the form element which means that assistive technology users will be presented with an unlabelled input. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A).',
    'Some form fields do not have a visible label present which means that assistive technology users do not get the necessary information conveyed to them. This fails WCAG 2.2 success criterion 3.3.2 Labels or Instructions (Level A).',
    'At least on page title was found to be non-descriptive which means that the page does not present its purpose which would normally be presented in heading level one. This fails WCAG 2.2 success criterion 2.4.2 Page Titled (Level A).',
    'At least one PDF document was found to be missing a title. This property is used by screen readers to informs these users of the document’s details. This fails WCAG 2.2 success criterion 2.4.2 Page Titled (Level A).',
    'At least on PDF document does not contain tags used to define elements on the page which can prevent assistive technology users to access the content within the PDF. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A).',
    'A non-interactive element receives focus when navigating via keyboard/screen reader software. This affects the navigation for keyboard and screen reader users where the section will receive the focus order when it is unneeded. This fails WCAG 2.2 success criterion 2.4.3 Focus Order (Level A).',
    'An input has a label that is not programmatically associated. This means that hint text that contains important information when inputting data has not been associated to the relevant inputs on the page. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A).',
    'Empty links may be encountered when navigating the service. This means that assistive technology users may experience unexpected functionality which may disorient these users.  This fails WCAG 2.2 success criterion 2.4.3 Focus Order (Level A).',
  ],
  thirdPartyContent1: 'Content that’s not within the scope of the accessibility regulations',
  thirdPartyContent2: 'Third party content that’s under someone else’s control',
  thirdPartyContent3:
    'Pages and websites that are linked to and from the Family Private Law service may not be fully accessible. These include: ',
  thirdPartyContentDescriptions: [
    'External pages hosting PDF documents',
    'The payment pages which have a separate accessibility statement',
  ],
  toImproveAccessibility: 'What we’re doing to improve accessibility',
  improveAccessibilityDescription:
    'We are working to improve accessibility on this website, and plan to fix the identified issues by 30 November 2025.',
  preparationAccessibilityStatement: 'Preparation of this accessibility statement',
  statementPreparationInfo: [
    'This statement was prepared on Wednesday 4 January 2023. It was last reviewed on 24 January 2025.',
    'This website was last tested by the Digital Accessibility Centre (DAC) on 31st July 2024 across a range of assistive technologies and with disabled users.',
    'Fixes were reviewed by the HMCTS accessibility testing team in the Testing Centre of Excellence.',
  ],
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

describe('accessibility statement > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
