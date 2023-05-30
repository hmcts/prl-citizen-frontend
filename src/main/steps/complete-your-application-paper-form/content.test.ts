import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../app/form/Form';
import { CommonContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  section: 'What to do next',
  title: 'Complete your application using a paper form',
  subtitle: "you can do this using a child arrangements application form (also known as 'Form C100').",
  giveDetails:
    "See <a href='https://www.gov.uk/government/publications/form-c100-application-under-the-children-act-1989-for-a-child-arrangements-prohibited-steps-specific-issue-section-8-order-or-to-vary-or-discharge' class='govuk-link' rel='external' target='_blank'>Form C100 on GOV.UK</a>. Download the from and fill in your details.",
  returnToGOVUK: 'Return to GOV.UK',
};

const cy = {
  section: 'What to do next -welsh',
  title: 'Complete your application using a paper form -welsh',
  subtitle: "you can do this using a child arrangements application form (also known as 'Form C100'). -welsh",
  giveDetails:
    "See <a href='https://www.gov.uk/government/publications/form-c100-application-under-the-children-act-1989-for-a-child-arrangements-prohibited-steps-specific-issue-section-8-order-or-to-vary-or-discharge' class='govuk-link' rel='external' target='_blank'>Form C100 on GOV.UK</a>. Download the from and fill in your details. -welsh",
  returnToGOVUK: 'Return to GOV.UK -welsh',
};

describe('complete-your-application-paper-form > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generatedContent);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain return to gov UK button', () => {
    expect(form.link.text(generatedContent)).toBe('Return to GOV.UK');
    expect(form.link.href).toBe('https://www.gov.uk/');
  });
});
