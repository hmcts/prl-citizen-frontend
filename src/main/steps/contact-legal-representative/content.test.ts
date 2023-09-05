import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../app/form/Form';
import { CommonContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  section: 'What to do next',
  title: 'Contact your legal representative',
  paragraph: 'If you have a legal representative and want them to complete the application for you:',
  bulletPoints: [
    'get in touch with your legal representative',
    'ask them what information they need from you to complete the application',
    'ask them to explain the next steps',
  ],
  returnToGOVUK: 'Return to GOV.UK',
  warningText: {
    text: 'Do not complete the application yourself if you plan to have a legal representative fill it in.',
    iconFallbackText: 'Warning',
  },
};

const cy = {
  section: 'Beth i’w wneud nesaf',
  title: "Cysylltwch â'ch cynrychiolydd cyfreithiol",
  paragraph: "Os oes gennych chi gynrychiolydd cyfreithiol a bod arnoch eisiau iddynt gwblhau'r cais ar eich rhan:",
  returnToGOVUK: 'Dychwelyd i GOV.UK',
  bulletPoints: [
    "Cysylltu â'ch cynrychiolydd cyfreithiol",
    "Gofynnwch iddynt pa wybodaeth sydd ei hangen arnynt i gwblhau'r cais",
    "Gofynnwch iddynt egluro'r camau nesaf",
  ],
  warningText: {
    text: "Peidiwch â llenwi'r cais eich hun os ydych chi'n bwriadu gofyn i gynrychiolydd cyfreithiol ei lenwi.",
    iconFallbackText: 'Rhybudd',
  },
};

describe('contact-legal-representative > content', () => {
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
