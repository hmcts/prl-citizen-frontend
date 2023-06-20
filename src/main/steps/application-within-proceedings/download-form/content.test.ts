/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Download the form',
  explainRequest: 'You can explain your request by completing and uploading the form',
  nextSteps: 'Next steps',
  line1: 'Download the form',
  from: 'from',
  govUk: 'GOV.UK (opens in a new tab)',
  line2: 'Complete the application form',
  line3: 'Save the application form onto your device',
  line4: 'Return to upload your application form',
  warning: 'Warning',
  warningText: 'You need to return to upload your application form for your request to be completed.',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
};

const cy: typeof en = {
  title: 'Download the form (welsh)',
  explainRequest: 'You can explain your request by completing and uploading the form (welsh)',
  nextSteps: 'Next steps (welsh)',
  line1: 'Download the form (welsh)',
  from: 'from (welsh)',
  govUk: 'GOV.UK (opens in a new tab) (welsh)',
  line2: 'Complete the application form (welsh)',
  line3: 'Save the application form onto your device (welsh)',
  line4: 'Return to upload your application form (welsh)',
  warning: 'Warning (welsh)',
  warningText: 'You need to return to upload your application form for your request to be completed. (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
};

describe('help with fees content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          applicationType: 'C2',
          applicationReason: 'delay-or-cancel-hearing-date',
        },
        session: {
          userCase: {
            id: '1234',
            caseTypeOfApplication: 'FL401',
            caseInvites: [],
            respondents: '',
            respondentsFL401: '',
          },
          user: {
            id: '1234',
          },
        },
      },
    },
  } as unknown as CommonContent;
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

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
  });
});
