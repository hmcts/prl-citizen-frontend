/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Do you have a help with fees reference number?',
  enterReferenceNumber:
    '<p class="govuk-heading-s govuk-!-margin-bottom-0">Enter your help with fees reference number</p>',
  referenceText:
    'You will have received this number when you applied for Help with Fees. This reference must not have been used for a previous application.',
  hint: 'For example, HWF-A1B-23C',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_have_hwfReference: {
      required: 'Select whether you have a help with fees reference number',
    },
    awp_hwf_referenceNumber: {
      required: 'Enter a valid help with fees reference number',
    },
  },
};

const cy: typeof en = {
  title: 'Do you have a help with fees reference number? (welsh)',
  enterReferenceNumber:
    '<p class="govuk-heading-s govuk-!-margin-bottom-0">Enter your help with fees reference number (welsh)</p>',
  referenceText:
    'You will have received this number when you applied for Help with Fees. This reference must not have been used for a previous application. (welsh)',
  hint: 'For example, HWF-A1B-23C (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_have_hwfReference: {
      required: 'Select whether you have a help with fees reference number (welsh)',
    },
    awp_hwf_referenceNumber: {
      required: 'Enter a valid help with fees reference number (welsh)',
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
    const helpWithFeesReferenceFields = fields.awp_have_hwfReference as FormOptions;
    const referenceSubField = helpWithFeesReferenceFields.values[0].subFields?.awp_hwf_referenceLabel as FormInput;
    const referenceNumberSubField = helpWithFeesReferenceFields.values[0].subFields
      ?.awp_hwf_referenceNumber as FormInput;

    expect(helpWithFeesReferenceFields.type).toBe('radios');
    expect((helpWithFeesReferenceFields.values[0].label as Function)(generatedContent)).toBe(en.yes);

    expect(referenceSubField?.type).toBe('textAndHtml');
    expect((referenceSubField?.textAndHtml as Function)(generatedContent)).toBe(en.enterReferenceNumber);

    expect(referenceNumberSubField?.type).toBe('text');
    expect((referenceNumberSubField?.label as Function)(generatedContent)).toBe(en.referenceText);
    expect((referenceNumberSubField?.hint as Function)(generatedContent)).toBe(en.hint);

    expect((helpWithFeesReferenceFields.values[1].label as Function)(generatedContent)).toBe(en.no);
    expect(helpWithFeesReferenceFields.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/application-within-proceedings/list-of-applications/1');
  });
});
