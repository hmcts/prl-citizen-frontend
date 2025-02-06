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
  title: 'Accessibility statement for Family Private Law -welsh',
  paragraphs: [
    'This accessibility statement applies to <a href="/" class="govuk-link">this link</a>, that enables users to make child arrangements or submit domestic abuse applications. -welsh',
    'The website is run by HM Courts & Tribunals Service (HMCTS).  -welsh',
    'We want as many people as possible to be able to use this website. For example, that means you should be able to:  -welsh',
  ],
  accessibilityOptions: [
    'change colours, contrast levels and fonts using browser or device settings  -welsh',
    'zoom in up to 400% without the text spilling off the screen  -welsh',
    'navigate most of the website using just a keyboard  -welsh',
    'navigate most of the website using speech recognition software  -welsh',
    'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)  -welsh',
  ],
  additionalParagraphs: [
    'We’ve also made the website text as simple as possible to understand.  -welsh',
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank">AbilityNet</a> has advice on making your device easier to use if you have a disability.  -welsh',
  ],
  howAccessible: 'How accessible this website is -welsh',
  somePartsNot: 'We know some parts of this website are not fully accessible, for example:  -welsh',
  notAccessibleParts: [
    'some heading labels are non-descriptive  -welsh',
    'some content becomes obscured when resizing text -welsh',
    "some PDF documents aren't fully accessible to screen reader software -welsh",
    'a language attribute for some Welsh text is missing which will impact some text to speech software pronunciation -welsh',
    'error messages require improvement to convey suggestions on how to correct the error  -welsh',
  ],
  feedbackAndContactInformation: 'Feedback and contact information  -welsh',
  contactInfo: [
    'We provide a text relay service for people who are d/Deaf, hearing impaired or have a speech impediment.  -welsh',
    'Our offices have audio induction loops, or if you contact us before your visit we can arrange a British Sign Language (BSL) interpreter.  -welsh',
    'If you require support when visiting or need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille contact us at:  -welsh',
  ],
  phoneAndEmail: ['Email: hmctsforms@justice.gov.uk  -welsh', 'Telephone: 0300 323 0185  -welsh'],
  considerYourRequest: 'We’ll consider your request and get back to you in 10 working days.  -welsh',
  reportingAccessibility: 'Reporting accessibility problems with this website  -welsh',
  improvements: [
    'We’re always looking to improve the accessibility of this website.  -welsh',
    'If you find any problems not listed on this page or think we’re not meeting accessibility requirements:  -welsh',
  ],
  enforcementProcedure: 'Enforcement procedure  -welsh',
  humanRightsInfo: [
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the <a href="https://www.legislation.gov.uk/uksi/2018/852/contents/made" class="govuk-link" target="_blank" aria-label="This link will open a new tab for legislation.gov.uk">Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 </a> (the ‘accessibility regulations’).  -welsh',
    'If you’re not happy with how we respond to your complaint, contact the <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">contact the Equality Advisory and Support Service (EASS)</a>.  -welsh',
  ],
  technicalInfo: 'Technical information about this website’s accessibility  -welsh',
  hmctsIsCommitted:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.  -welsh',
  complianceStatus: 'Compliance status  -welsh',
  partiallyCompliant:
    'This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">Web Content Accessibility Guidelines version 2.2</a> AA standard, due to the non-compliances listed below.  -welsh',
  nonAccessibleContent: 'Non-accessible content  -welsh',
  nonAccessibleDescription: 'The content listed below is non-accessible for the following reasons.  -welsh',
  issuesWithDocuments: 'Non-compliance with the accessibility regulations  -welsh',
  issuesWithDocumentDescriptions: [
    'Heading labels are provided however they are non-descriptive.  This does not meet WCAG 2.2 success criterion 2.4.6 Headings and Labels (Level AA).  -welsh',
    'An autocomplete attribute has been supplied an invalid value for ‘property name or number’ which may cause issues for screen reader users.  This does not meet WCAG 2.2 success criterion 1.3.5 Identify Input Purpose (Level AA).  -welsh',
    'Text was found to fail the minimum text contrast requirements within ‘draft’ marked PDF documents.  This does not meet WCAG 2.2 success criterion 1.4.3 Contrast (Minimum) (Level AA)  -welsh',
    'Content becomes obscured when resizing text on the page. This does not meet WCAG 2.2 success criterion 1.4.4 Resize text (Level AA).  -welsh',
    'Some error messages do not convey suggestions on how to correct the errors.  This does not meet WCAG 2.2 success criterion 3.3.3 Error Suggestion (Level AA).  -welsh',
    'A timeout feature is present however there is no way to adjust or cancel when the timeout occurs throughout the service. The lack of a prior warning may cause frustration and make it much more difficult for users who need additional time. This fails WCAG 2.2 success criterion 2.2.1 Timing Adjustable (Level A).  -welsh',
    'A fieldset is used however no legend was included and in some cases is unnecessary. This can be confusing for screen reader users when navigating out of context. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A). -welsh',
    'Optional pages are not relayed as such for users navigating the service which means that some users may become stuck at this stage as they may feel forced to upload a document as nothing on the page informs users of the step being optional. This fails WCAG 2.2 success criterion 3.3.2 Labels or Instructions (Level A).-welsh',
    'Some labels may be present but not programmatically associated to the form element which means that assistive technology users will be presented with an unlabelled input. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A). -welsh',
    'Some form fields do not have a visible label present which means that assistive technology users do not get the necessary information conveyed to them. This fails WCAG 2.2 success criterion 3.3.2 Labels or Instructions (Level A). -welsh',
    'At least on page title was found to be non-descriptive which means that the page does not present its purpose which would normally be presented in heading level one. This fails WCAG 2.2 success criterion 2.4.2 Page Titled (Level A). -welsh',
    'At least one PDF document was found to be missing a title. This property is used by screen readers to informs these users of the document’s details. This fails WCAG 2.2 success criterion 2.4.2 Page Titled (Level A). -welsh',
    'At least on PDF document does not contain tags used to define elements on the page which can prevent assistive technology users to access the content within the PDF. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A). -welsh',
    'A non-interactive element receives focus when navigating via keyboard/screen reader software. This affects the navigation for keyboard and screen reader users where the section will receive the focus order when it is unneeded. This fails WCAG 2.2 success criterion 2.4.3 Focus Order (Level A). -welsh',
    'An input has a label that is not programmatically associated. This means that hint text that contains important information when inputting data has not been associated to the relevant inputs on the page. This fails WCAG 2.2 success criterion 1.3.1 Info and Relationships (Level A). -welsh',
    'Empty links may be encountered when navigating the service. This means that assistive technology users may experience unexpected functionality which may disorient these users.  This fails WCAG 2.2 success criterion 2.4.3 Focus Order (Level A). -welsh',
  ],
  thirdPartyContent1: 'Content that’s not within the scope of the accessibility regulations -welsh',
  thirdPartyContent2: 'Third party content that’s under someone else’s control -welsh',
  thirdPartyContent3:
    'Pages and websites that are linked to and from the Family Private Law service may not be fully accessible. These include: -welsh',
  thirdPartyContentDescriptions: [
    'External pages hosting PDF documents -welsh',
    'The payment pages which have a separate accessibility statement -welsh',
  ],
  toImproveAccessibility: 'What we’re doing to improve accessibility -welsh',
  improveAccessibilityDescription:
    'We are working to improve accessibility on this website, and plan to fix the identified issues by 30 November 2025. -welsh',
  preparationAccessibilityStatement: 'Preparation of this accessibility statement -welsh',
  statementPreparationInfo: [
    'This statement was prepared on Wednesday 4 January 2023. It was last reviewed on 24 January 2025. -welsh',
    'This website was last tested by the Digital Accessibility Centre (DAC) on 31st July 2024 across a range of assistive technologies and with disabled users. -welsh',
    'Fixes were reviewed by the HMCTS accessibility testing team in the Testing Centre of Excellence. -welsh',
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
