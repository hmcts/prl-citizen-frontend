import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Safety Concerns',
  title: "The children's safety",
  firstParagraph:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children.',
  subHeading: 'What you told us',
  bulletPoints: [
    'You have suffered or are at risk of suffering domestic violence or abuse',
    'The children have not suffered or are not at risk of suffering domestic violence or abuse',
  ],
  paragraphs: [
    "If children see or hear someone else being treated badly, it can harm them. We'd like to ask a few questions about the children's safety.",
    'Your answers will help the court consider any risks to you or the children. This information forms part of your court application and will be dealt with sensitively.',
    'You may find some of the following questions difficult or upsetting to answer. Please complete them as best you can.',
  ],
  signsOfChildAbuseHyperlinkLabel: 'Find out about the signs of child abuse',
  signsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/',
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Safety Concerns - welsh',
  title: "The children's safety - welsh",
  firstParagraph:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children. - welsh',
  subHeading: 'What you told us - welsh',
  bulletPoints: [
    'You have suffered or are at risk of suffering domestic violence or abuse - welsh',
    'The children have not suffered or are not at risk of suffering domestic violence or abuse - welsh',
  ],
  paragraphs: [
    "If children see or hear someone else being treated badly, it can harm them. We'd like to ask a few questions about the children's safety. - welsh",
    'Your answers will help the court consider any risks to you or the children. This information forms part of your court application and will be dealt with sensitively. - welsh',
    'You may find some of the following questions difficult or upsetting to answer. Please complete them as best you can. - welsh',
  ],
  signsOfChildAbuseHyperlinkLabel: 'Find out about the signs of child abuse - welsh',
  signsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/ - welsh',
};

/* eslint-disable @typescript-eslint/ban-types */
describe("The children's safety content", () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
