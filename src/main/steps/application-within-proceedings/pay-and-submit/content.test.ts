/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Pay and submit',
  line1:
    'You will be asked to enter your card details and make payment. You will receive a confirmation email when your payment is successful.',
  line2:
    'Once you have paid, your application will be submitted to the court and you will not be able to make any further changes.',
  line3: 'The court will process your application and take it forward.',
  submit: 'Pay and submit',
  cancel: 'Cancel',
};

const cy: typeof en = {
  title: 'Pay and submit (welsh)',
  line1:
    'You will be asked to enter your card details and make payment. You will receive a confirmation email when your payment is successful. (welsh)',
  line2:
    'Once you have paid, your application will be submitted to the court and you will not be able to make any further changes. (welsh)',
  line3: 'The court will process your application and take it forward. (welsh)',
  submit: 'Pay and submit (welsh)',
  cancel: 'Canslo',
};

describe('pay and submit content', () => {
  const commonContent = { language: 'en' } as unknown as CommonContent;
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

  test('should contain submit button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe(en.submit);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/application-within-proceedings/list-of-applications/1');
  });
});
