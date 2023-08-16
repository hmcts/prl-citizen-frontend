/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Help with fees',
  applicationCost: 'The cost of this application is ',
  checkGuidance:
    'You can check the help with fees guidance on <a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" rel="external" target="_blank">GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.',
  usingHelpWithFees: 'Will you be using help with fees to pay for this application?',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_need_hwf: {
      required: 'Select whether you will be using help with fees for this application',
    },
  },
};

const cy: typeof en = {
  title: 'Help with fees (welsh)',
  applicationCost: 'The cost of this application is (welsh)',
  checkGuidance:
    'You can check the help with fees guidance on <a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" rel="external" target="_blank">GOV.UK (opens in a new tab)</a> to find out if you are eligible for support. (welsh)',
  usingHelpWithFees: 'Will you be using help with fees to pay for this application? (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_need_hwf: {
      required: 'Select whether you will be using help with fees for this application (welsh)',
    },
  },
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
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain help with fees form fields', () => {
    const helpWithFeesFields = fields.awp_need_hwf as FormOptions;

    expect(helpWithFeesFields.type).toBe('radios');
    expect((helpWithFeesFields.label as Function)(generatedContent)).toBe(en.usingHelpWithFees);
    expect((helpWithFeesFields.values[0].label as Function)(generatedContent)).toBe(en.yes);
    expect((helpWithFeesFields.values[1].label as Function)(generatedContent)).toBe(en.no);
    expect(helpWithFeesFields.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/application-within-proceedings/list-of-applications/1');
  });
});
