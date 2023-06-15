/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Apply for help with fees',
  applyBefore: 'You must apply for help with fees before submitting your application.',
  nextSteps: 'Next steps',
  line1:
    'Go to <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" rel="external" target="_blank">apply for help with fees (opens in a new tab)</a>',
  line2: 'Enter',
  enterCourtNumber: 'when you are asked to enter a court or tribunal number',
  line3: 'Complete the help with fees application',
  line4: 'Return to complete your',
  applicationTo: 'application to',
  line5: 'Enter your help with fees reference number',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
};

const cy: typeof en = {
  title: 'Apply for help with fees (welsh)',
  applyBefore: 'You must apply for help with fees before submitting your application. (welsh)',
  nextSteps: 'Next steps (welsh)',
  line1:
    'Go to <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" rel="external" target="_blank">apply for help with fees (opens in a new tab)</a> (welsh)',
  line2: 'Enter (welsh)',
  enterCourtNumber: 'when you are asked to enter a court or tribunal number (welsh)',
  line3: 'Complete the help with fees application (welsh)',
  line4: 'Return to complete your (welsh)',
  applicationTo: 'application to (welsh)',
  line5: 'Enter your help with fees reference number (welsh)',
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
