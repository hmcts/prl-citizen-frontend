import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isAccessCodeValid, isCaseCodeValid, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

import { contact_cy, contact_en } from './contact';
import { generateContent } from './content';

const enContent = {
  title: 'Enter your access details',
  line1: 'Enter the claim number from the email or letter we sent you.',
  caseCodeLabel: 'Your case code',
  caseCodeLabelHint: 'You will find this on the email or letter we sent you',
  accessCodeLabel: 'Your access code',
  accessCodeLabelHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  contactDetails: contact_en,
  continue: 'Continue',
  errors: {
    caseCode: {
      required: 'Enter your case code',
      invalid: 'The case code must be made up of 16 characters',
      notNumeric: 'Case code must be numeric',
    },
    accessCode: {
      required: 'Enter your access code',
      invalid: 'The access code must be made up of 8 characters',
    },
  },
};

const cyContent = {
  title: 'Enter your access details',
  line1: 'Enter the claim number from the email or letter we sent you.',
  caseCodeLabel: 'Your case code',
  caseCodeLabelHint: 'You will find this on the email or letter we sent you',
  accessCodeLabel: 'Your access code',
  accessCodeLabelHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  contactDetails: contact_cy,
  continue: 'Continue',
  errors: {
    caseCode: {
      required: 'Enter your case code',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
      notNumeric: 'Case code must be numeric',
    },
    accessCode: {
      required: 'Enter your access code',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
  },
};

jest.mock('../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Enter your access details');
    expect(generatedContent.line1).toEqual('Enter the claim number from the email or letter we sent you.');
    expect(generatedContent.caseCodeLabel).toEqual('Your case code');
  });

  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain caseCode field', () => {
    const caseCodeField = fields.caseCode as FormOptions;
    expect(caseCodeField.type).toBe('text');
    expect(caseCodeField.classes).toBe('govuk-input--width-20');
    expect((caseCodeField.label as Function)(generatedContent)).toBe(enContent.caseCodeLabel);
    expect(((caseCodeField as FormInput).hint as Function)(generatedContent)).toBe(enContent.caseCodeLabelHint);
    expect(caseCodeField.labelSize).toBe(null);
    (caseCodeField.validator as Function)('ssssssssssssssss');
    expect(isFieldFilledIn).toHaveBeenCalledWith('ssssssssssssssss');
    expect(isCaseCodeValid).toHaveBeenCalledWith('ssssssssssssssss');
  });

  test('should contain accessCode field', () => {
    const accessCodeField = fields.accessCode as FormOptions;
    expect(accessCodeField.type).toBe('text');
    expect(accessCodeField.classes).toBe('govuk-input--width-20');
    expect((accessCodeField.label as Function)(generatedContent)).toBe(enContent.accessCodeLabel);
    expect(((accessCodeField as FormInput).hint as Function)(generatedContent)).toBe(enContent.accessCodeLabelHint);
    expect(accessCodeField.labelSize).toBe(null);
    (accessCodeField.validator as Function)('sssssss');
    expect(isFieldFilledIn).toHaveBeenCalledWith('sssssss');
    expect(isAccessCodeValid).toHaveBeenCalledWith('sssssss');
  });

  test('should contain continue button', () => {
    expect((form.submit.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
