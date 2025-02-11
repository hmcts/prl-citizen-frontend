/* eslint-disable import/namespace */

import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  title: 'Accessibility statement for Family Private Law',
  paragraphs: [
    'This accessibility statement applies to <a href="/" class="govuk-link">this link</a>, that enables users to make child arrangements or submit domestic abuse applications.',
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
  phone: ['Telephone: 0300 323 0185'],
  considerYourRequest: 'We’ll consider your request and get back to you in 10 working days.',
  reportingAccessibility: 'Reporting accessibility problems with this website',
  improvements: [
    'We’re always looking to improve the accessibility of this website.',
    'If you find any problems not listed on this page or think we’re not meeting accessibility requirements contact us at:',
  ],
  enforcementProcedure: 'Enforcement procedure',
  humanRightsInfo: [
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the <a href="https://www.legislation.gov.uk/uksi/2018/852/contents/made" class="govuk-link" target="_blank" aria-label="This link will open a new tab for legislation.gov.uk">Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 </a> (the ‘accessibility regulations’).',
    'If you’re not happy with how we respond to your complaint, <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">contact the Equality Advisory and Support Service (EASS)</a>.',
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
    'Heading labels are provided however they are non-descriptive. This means that assistive technology users may struggle to understand the content. This fails WCAG 2.2 success criterion 2.4.6 Headings and Labels (Level AA).',
    'An autocomplete attribute has been supplied an invalid value for ‘property name or number’ which may cause issues for screen reader users. This fails WCAG 2.2 success criterion 1.3.5 Identify Input Purpose (Level AA).',
    'Text was found to fail the minimum text contrast requirements within ‘draft’ marked PDF documents which means that users who are colourblind may struggle to see the content. This fails WCAG 2.2 success criterion 1.4.3 Contrast (Minimum) (Level AA).',
    'Content becomes obscured when resizing text on the page, which means that some users with low vision may struggle to read the content. This fails WCAG 2.2 success criterion 1.4.4 Resize text (Level AA).',
    'Some error messages do not convey suggestions on how to correct the errors, which means some users will struggle to fix their input errors on the page. This fails WCAG 2.2 success criterion 3.3.3 Error Suggestion (Level AA).',
    'A timeout feature is present however there is no way to adjust or cancel when the timeout occurs throughout the service. The lack of a prior warning may cause frustration and make it much more difficult for users who need additional time. This fails WCAG 2.2 success criterion 2.2.1 Timing Adjustable (Level A).',
    'A fieldset is used, however no legend was included and in some cases is unnecessary. This can be confusing for screen reader users when navigating out of context. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A).',
    'Optional pages are not relayed as such for users navigating the service which means that some users may become stuck at this stage feeling forced to upload a document as nothing on the page informs users of the step being optional. This fails WCAG 2.2 success criterion 3.3.2 Labels or Instructions (Level A).',
    'Some labels may be present but not programmatically associated to the form element which means that assistive technology users may not understand the purpose of the form input. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A).',
    'Some form fields do not have a visible label present which means that assistive technology users may not get the necessary information conveyed to them. This fails WCAG 2.2 success criterion 3.3.2 Labels or Instructions (Level A).',
    'Some page titles were found to be non-descriptive which means that the page may not present its purpose for assistive technology users. This fails WCAG 2.2 success criterion 2.4.2 Page Titled (Level A).',
    'At least one PDF document was found to be missing a title. This property is used by screen readers to inform users of the document’s details, which they may not be able to do without the title. This fails WCAG 2.2 success criterion 2.4.2 Page Titled (Level A).',
    'Some PDF documents do not contain tags used to define elements on the page. This means some assistive technology users may not be able to access the content within the PDF. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A).',
    'A non-interactive element receives focus when navigating which may cause confusion for keyboard/screen reader users. This fails WCAG 2.2 success criterion 2.4.3 Focus Order (Level A).',
    'An input has a label that is not programmatically associated so hint text that contains important information when inputting data has not been associated to the relevant inputs on the page. This means that assistive technology users may not be able to understand the label and its associated hint text. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A).',
    'Empty links may be encountered when navigating the service. This means that assistive technology users may experience unexpected functionality when interacting with the links. This fails WCAG 2.2 success criterion 2.4.3 Focus Order (Level A).',
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
  paragraphs: [
    "Mae'r datganiad hygyrchedd hwn yn berthnasol i <a href='/' class='govuk-link'>y ddolen hon</a>, sy'n galluogi defnyddwyr i wneud trefniadau plentyn neu gyflwyno ceisiadau cam-drin domestig.",
    'Gwasanaeth Llysoedd a Thribiwnlysoedd EM sy’n gyfrifol am y gwasanaeth hwn.',
    'Rydym eisiau i gymaint o bobl â phosibl allu ei ddefnyddio, felly rydym wedi ceisio ei wneud mor hygyrch â phosibl.  Er enghraifft, dylech allu:',
  ],
  accessibilityOptions: [
    'newid y lliwiau, y lefelau cyferbyniad disgleirdeb a’r ffontiau trwy osodiadau porwr neu’r ddyfais',
    'gwneud y testun hyd at 400% yn fwy heb iddo ddiflannu oddi ar y sgrin',
    "llywio'r rhan fwyaf o'r wefan gan ddefnyddio bysellfwrdd yn unig",
    "llywio'r rhan fwyaf o'r wefan gan ddefnyddio meddalwedd adnabod llais",
    'gwrando ar y rhan fwyaf o’r wefan gan ddefnyddio darllenydd sgrin (gan gynnwys fersiynau diweddaraf NVDA, CCA (Dadansoddwr cyferbyniad lliwiau) a VoiceOver)',
  ],
  additionalParagraphs: [
    "Rydym hefyd wedi gwneud y testun mor syml â phosibl i'w ddeall.",
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank">Mae AbilityNet</a> yn rhoi cyngor ar sut i wneud eich dyfais yn haws i’w defnyddio os oes gennych anabledd.',
  ],
  howAccessible: "Pa mor hygyrch yw'r wefan hon",
  somePartsNot: 'Gwyddom nad yw rhai rhannau o’r wefan hon yn gwbl hygyrch, er enghraifft:',
  notAccessibleParts: [
    'nid yw rhai labeli pennawd yn ddisgrifiadol',
    'mae rhywfaint o’r cynnwys yn cael ei guddio wrth newid maint y testun',
    'nid yw rhai dogfennau PDF yn gwbl hygyrch i feddalwedd darllen sgrin',
    'mae priodoledd iaith ar gyfer rhywfaint o’r testun Cymraeg ar goll, a fydd yn cael effaith ar ynganiad rhai meddalwedd testun i leferydd',
    'mae angen gwella rhai negeseuon gwallau i gyfleu awgrymiadau am sut i gywiro’r gwall',
  ],
  feedbackAndContactInformation: 'Adborth a gwybodaeth gyswllt',
  contactInfo: [
    'Rydym yn darparu gwasanaeth cyfnewid testun ar gyfer pobl fyddar, pobl sydd â nam ar eu clyw a phobl sydd â nam ar eu lleferydd.',
    'Mae yna ddolenni sain yn ein swyddfeydd, neu os byddwch yn cysylltu â ni cyn eich ymweliad, gallwn drefnu cyfieithydd Iaith Arwyddion Prydain (BSL) ar eich cyfer.',
    "Os ydych angen cymorth wrth ymweld â'r wefan, neu eich bod angen gwybodaeth sydd ar y wefan hon mewn fformat arall megis ar ffurf PDF hygyrch, print bras, fformat hawdd ei ddeall, recordiad sain neu braille cysylltwch â ni yn: ",
  ],
  phone: ['Ffoniwch: 01634 887900'],
  considerYourRequest: 'Byddwn yn ystyried eich cais ac yn ymateb o fewn 10 diwrnod gwaith.',
  reportingAccessibility: "Riportio problemau hygyrchedd gyda'r wefan hon",
  improvements: [
    'Rydym wastad yn ceisio gwella hygyrchedd y wefan hon.',
    "Os byddwch yn dod o hyd i unrhyw broblemau nad ydynt wedi'u rhestru ar y dudalen hon neu'n meddwl nad ydym yn bodloni gofynion hygyrchedd cysylltwch â ni yn:",
  ],
  enforcementProcedure: 'Y Weithdrefn Orfodi',
  humanRightsInfo: [
    'Y Comisiwn Cydraddoldeb a Hawliau Dynol (EHRC) sy’n gyfrifol am orfodi <a href="https://www.legislation.gov.uk/uksi/2018/852/contents/made/" class="govuk-link" target="_blank"> Rheoliadau Hygyrchedd Cyrff y Sector Cyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018 </a> (y ‘rheoliadau hygyrchedd’).',
    'Os ydych wedi cysylltu â ni ynghylch mater hygyrchedd ac nad ydych yn fodlon â’n hymateb, gallwch gysylltu â’r <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank">Gwasanaeth Chynghori a Chymorth Cydraddoldeb (EASS)</a>.',
  ],
  technicalInfo: 'Gwybodaeth dechnegol am hygyrchedd y wefan hon',
  hmctsIsCommitted:
    'Mae GLlTEM wedi ymrwymo i sicrhau bod ei wefannau yn hygyrch, a hynny yn unol â Rheoliadau Hygyrchedd Cyrff y Sector Gyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018.',
  complianceStatus: 'Statws cydymffurfiaeth',
  partiallyCompliant:
    'Mae’r wefan hon yn cydymffurfio’n rhannol â safon <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">AA Canllawiau Hygyrchedd Cynnwys Gwe fersiwn 2.2,</a>a hynny oherwydd y materion o beidio â chydymffurfio a’r esemptiadau a restrir isod.',
  nonAccessibleContent: 'Cynnwys anhygyrch',
  nonAccessibleDescription: "Nid yw'r cynnwys a restrir isod yn hygyrch am y rhesymau canlynol.",
  issuesWithDocuments: "Diffyg cydymffurfio â'r rheoliadau hygyrchedd",
  issuesWithDocumentDescriptions: [
    'Mae labeli penawdau wedi’u darparu ond nid ydynt yn ddisgrifiadol. Mae hyn yn golygu gall defnyddwyr technoleg gynorthwyol gael trafferth yn deall y cynnwys. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 2.4.6: Penawdau a Labeli (Lefel AA).',
    'Mae priodoledd cwblhau awtomatig wedi darparu gwerth annilys ar gyfer ‘enw neu rif yr eiddo’ a all achosi problemau i ddefnyddwyr darllenwyr sgrin. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 1.3.5 Adnabod Pwrpas y Mewnbwn (Lefel AA).',
    'Roedd y testun wedi methu â bodloni’r gofynion cyferbyniad testun lleiaf o fewn dogfennau PDF wedi’i marcio fel ‘drafft’, sy’n golygu efallai bydd defnyddwyr lliwddall yn cael trafferth gweld y cynnwys.  Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 1.4.3: Cyferbyniad (Lleiaf) (Lefel AA).',
    'Mae cynnwys yn aneglur neu’n cael ei guddio wrth newid maint testun ar y dudalen, sy’n golygu y gall rhai defnyddwyr gyda golwg cyfyngedig gael trafferth yn darllen y cynnwys. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 1.4.4 Newid maint testun (Lefel AA).',
    'Nid yw rhai negeseuon gwallau yn cyfleu amgrymiadau am sut i gywiro gwallau, sy’n golygu bydd rhai defnyddwyr yn cael trafferth cywiro gwallau mewnbwn ar y dudalen. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 3.3.3 Awgrymiadau ar gyfer Gwallau (Lefel AA).',
    'Mae nodwedd terfyn amser ar gael, fodd bynnag, nid oes ffordd i addasu neu ganslo pan fydd terfyn amser yn digwydd, a hynny thrwy’r gwasanaeth gyfan. Gall y diffyg rhybudd ymlaen llaw beri rhwystredigaeth a gall olygu ei fod yn llawer anoddach i ddefnyddwyr sydd angen amser ychwanegol. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 2.2.1 Amseru Addasadwy (Lefel A).',
    'Mae rheolydd labeli yn cael ei ddefnyddio, ond nid oedd allwedd wedi’i chynnwys ac mewn rhai achosion mae’n ddiangen. Gall hyn fod yn ddryslyd i ddefnyddwyr darllenydd sgrin wrth llywio heb gyd-destun. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 1.3.1 Gwybodaeth a Pherthnasau (Lefel A).',
    'Nid yw tudalennau dewisol wedi’u marcio felly ar gyfer defnyddwyr sy’n llywio’r gwasanaeth, sy’n golygu gall rhai defnyddwyr ddod i stop yn y cam hwn, a theimlo bod rhaid iddynt lwytho dogfen oherwydd nid oes unrhyw beth ar y dudalen yn cyfleu i ddefnyddwyr bod y cam hwn yn ddewisol. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 3.3.2 Labeli neu Gyfarwyddiadau (Lefel A).',
    'Mae rhai labeli yn bresennol ond nid ydynt wedi’u cysylltu â’r elfen ffurflen, sy’n golygu efallai na fydd defnyddwyr technoleg gynorthwyol yn gallu deall pwrpas y mewnbwn ffurflen. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 1.3.1 Gwybodaeth a Pherthnasau (Lefel A).',
    'Nid oes label weledol ar rhai o feysydd y ffurflen, sy’n golygu efallai na fydd yr wybodaeth angenrheidiol yn cael ei chyfleu i ddefnyddwyr technoleg gynorthwyol. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 3.3.2 Labeli neu Gyfarwyddiadau (Lefel A).',
    'Roedd teitlau rhai tudalennau yn rhai nad ydynt yn ddisgrifiadol, sy’n golygu efallai na fydd y dudalen yn cyflwyno ei bwrpas i ddefnyddwyr technoleg gynorthwyol. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 2.4.2 Tudalen gyda Theitl (Lefel A).',
    'Roedd o leiaf un dogfen PDF gyda theitl ar goll. Mae’r nodwedd hon yn cael ei defnyddio gan ddarllenyddion sgrin i hysbysu defnyddwyr am fanylion y ddogfen, ac efallai na fyddant yn gallu gwneud hynny heb y teitl. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 2.4.2 Tudalen gyda Theitl (Lefel A).',
    'Nid yw rhai dogfennau PDF yn cynnwys tagiau a ddefnyddir i ddiffinio elfennau ar y dudalen. Mae hyn yn golygu efallai na fydd rhai defnyddwyr technoleg gynorthwyol yn gallu cael mynediad at gynnwys y PDF. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 1.3.1 Gwybodaeth a Pherthnasau (Lefel A).',
    'Mae elfen nad yw’n rhyngweithiol yn destun ffocws wrth lywio’r dudalen, a all beri dryswch i ddefnyddwyr bysellfwrdd/darllenydd sgrin. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 2.4.3: Trefn Ffocws (Lefel A).',
    'Mae mewnbwn yn cynnwys label nad yw’n gysylltiedig â rhaglen, felly mae testun awgrymiadol sy’n cynnwys gwybodaeth bwysig wrth fewnbynnu data ddim wedi’i gysylltu â’r mewnbynnau perthnasol ar y dudalen. Mae hyn yn golygu efallai na fydd defnyddwyr technoleg gynorthwyol yn gallu deall y label a’r testun awgrymiadol cysylltiedig.  Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 1.3.1 Gwybodaeth a Pherthnasau (Lefel A).',
    'Gellir dod ar draws dolenni gwag wrth lywio’r gwasanaeth. Mae hyn golygu gall defnyddwyr technoleg gynorthwyol brofi swyddogaethau annisgwyl wrth ryngweithio â’r dolenni. Mae hyn yn methu â bodloni WCAG 2.2 maen prawf llwyddiant 2.4.3: Trefn Ffocws (Lefel A).',
  ],
  thirdPartyContent1: 'Cynnwys nad yw o fewn cwmpas y rheoliadau hygyrchedd',
  thirdPartyContent2: 'Cynnwys trydydd parti sydd dan reolaeth rhywun arall',
  thirdPartyContent3:
    "Efallai na fydd tudalennau a gwefannau sy’n berthnasol i'r gwasanaeth Cyfraith Deulu Breifat yn gwbwl hygyrch. Mae’r rhain yn cynnwys:",
  thirdPartyContentDescriptions: [
    'Tudalennau allanol sy’n cynnwys dogfennau PDF',
    'Y tudalennau talu sydd â datganiad hygyrchedd ar wahân',
  ],
  toImproveAccessibility: 'Beth rydym yn ei wneud i wella hygyrchedd',
  improveAccessibilityDescription: [
    'Rydym yn gweithio i wella hygyrchedd ar y wefan hon, ac yn bwriadu trwsio’r problemau a nodwyd erbyn 30 Tachwedd 2025.',
  ],
  preparationAccessibilityStatement: "Paratoi'r datganiad hygyrchedd hwn",
  statementPreparationInfo: [
    'Cafodd y datganiad hwn ei baratoi ar Ddydd Mercher 4 Ionawr 2023. Cafodd ei adolygu ddiwethaf ar 24 Ionawr 2025.',
    'Cafodd y wefan ei phrofi ddiwethaf gan y Ganolfan Hygyrchedd Digidol (DAC) ar 31 Gorffennaf 2024 ar draws amrywiaeth o dechnolegau cynorthwyol a gyda defnyddwyr anabl.',
    'Adolygwyd atebion gan dîm profi hygyrchedd GLlTEM yn y Ganolfan Profi Rhagoriaeth.',
  ],
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
