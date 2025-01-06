import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../steps/common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Transfer your case to your legal representative',
  content1: 'To transfer your case to your legal representative, provide them with your Case number.',
  content2:
    "Once your case is passed to your representative, you won't be able to edit your response. They will handle your case and receive any updates from the court.",
  content3: 'Your Case number is: ',
  content4:
    'Do not respond to this application yourself if you plan to have a legal representative complete the response.',
};

const cy = {
  title: "Trosglwyddo eich achos i'ch cynrychiolydd cyfreithiol",
  content1: "I drosglwyddo eich achos i'ch cynrychiolydd cyfreithiol, rhowch eich rhif achos iddo.",
  content2:
    "Ar ôl i'ch achos gael ei drosglwyddo i'ch cynrychiolydd, ni fyddwch yn gallu golygu eich ymateb. Bydd yn trin eich achos ac yn derbyn unrhyw ddiweddariadau gan y llys.",
  content3: 'Rhif eich achos yw:',
  content4:
    "Peidiwch ag ymateb i'r cais hwn eich hun os ydych yn bwriadu cael cynrychiolydd cyfreithiol i gwblhau'r ymateb.",
};

describe('tasklistresponse > legalrepresentation >  solicitordirect > content', () => {
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

  test('should contain continue button', () => {
    expect(form.onlyContinue.text(generatePageContent({ language: 'en' }))).toBe('Continue');
  });
});
