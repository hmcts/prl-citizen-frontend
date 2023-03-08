import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  serviceName: 'Service Name',
  section: 'What to do next',
  title: 'Complete your application using a paper form',
  subtitle: "you can do this using a child arrangements application form(also known as 'Form C100').",
  giveDetails:
    "See <a href='https://get.adobe.com/uk/reader/' class='govuk-link' rel='external' target='_blank'>Form C100 on GOV.UK</a>. Download the from and fill in your details",
  returnToGOVUK: ' Return to GOV.UK',
};

const cy = {
  serviceName: 'Service Name -welsh',
  section: 'What to do next -welsh',
  title: 'Complete your application using a paper form -welsh',
  subtitle: "you can do this using a child arrangements application form(also known as 'Form C100'). -welsh",
  giveDetails:
    "See <a href='https://get.adobe.com/uk/reader/' class='govuk-link' rel='external' target='_blank'>Form C100 on GOV.UK</a>. Download the from and fill in your details -welsh",
  returnToGOVUK: ' Return to GOV.UK -welsh',
};

describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain return to gov UK button button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe(undefined);
  });
});
