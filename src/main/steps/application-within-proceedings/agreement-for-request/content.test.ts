/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Get agreement for your request',
  gettingAgreement:
    'If you are able to, getting agreement from the other person in the case will reduce the fee you may have to pay.',
  provideProof: 'You will need to provide proof of their agreement.',
  otherPersonAgree: 'Does the other person in the case agree with this request?',
  otherPersonAgreeDate: 'Does the other person in the case agree with the date change?',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_agreementForRequest: {
      required: 'Select whether the other person in the case agrees with your request',
    },
  },
};

const cy: typeof en = {
  title: 'Get agreement for your request (welsh)',
  gettingAgreement:
    'If you are able to, getting agreement from the other person in the case will reduce the fee you may have to pay. (welsh)',
  provideProof: 'You will need to provide proof of their agreement. (welsh)',
  otherPersonAgree: 'Does the other person in the case agree with this request? (welsh)',
  otherPersonAgreeDate: 'Does the other person in the case agree with the date change? (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_agreementForRequest: {
      required: 'Select whether the other person in the case agrees with your request (welsh)',
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
          applicationReason: 'request-more-time',
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

  test('should contain agreement for request form fields', () => {
    const agreementForRequestField = fields.awp_agreementForRequest as FormOptions;
    expect(agreementForRequestField.type).toBe('radios');
    expect((agreementForRequestField.label as Function)(generatedContent)).toBe(en.otherPersonAgree);
    expect((agreementForRequestField.values[0].label as Function)(generatedContent)).toBe(en.yes);
    expect((agreementForRequestField.values[1].label as Function)(generatedContent)).toBe(en.no);
    expect(agreementForRequestField.validator).toBe(isFieldFilledIn);
  });

  test('should contain correct text for delay or cancel hearings', () => {
    commonContent.additionalData!.req.params.applicationReason = 'delay-or-cancel-hearing-date';
    generatedContent = generateContent(commonContent);
    const agreementForRequestField = fields.awp_agreementForRequest as FormOptions;
    expect((agreementForRequestField.label as Function)(generatedContent)).toBe(en.otherPersonAgreeDate);
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/application-within-proceedings/list-of-applications/1');
  });
});
