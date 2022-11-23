import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { isEmailValid } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  serviceName: 'Child arrangements',
  headingTitle: 'How would you like to submit your application to court?',
  paragraph1:
    'Your completed application can be sent straight to the court electronically, or you can print it and send it by post if you prefer.',
  submitElectronically: 'Submit electronically',
  sendByPost: 'Print and send by post',
  emailTitle: 'Enter an email address if you would like to get a confirmation',
  errors: {
    documentSubmission: {
      required: 'Select yes if you want to submit your application to the court electronically',
    },
    emailAddress: {
      invalid: 'Provide a valid email address',
    },
  },
};

const cy = {
  serviceName: 'Child arrangements - Welsh',
  headingTitle: 'How would you like to submit your application to court? - Welsh',
  paragraph1:
    'Your completed application can be sent straight to the court electronically, or you can print it and send it by post if you prefer. - Welsh',
  submitElectronically: 'Submit electronically - Welsh',
  sendByPost: 'Print and send by post - Welsh',
  emailTitle: 'Enter an email address if you would like to get a confirmation - Welsh',
  errors: {
    documentSubmission: {
      required: 'Select yes if you want to submit your application to the court electronically - Welsh',
    },
    emailAddress: {
      invalid: 'Provide a valid email address - Welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('document submission  > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
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

  test('should contain document submission field', () => {
    const documentSubmissionField = fields.documentSubmission as FormOptions;

    expect(documentSubmissionField.type).toBe('radios');
    expect(documentSubmissionField.classes).toBe('govuk-radios');
    expect((documentSubmissionField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.submitElectronically);
    expect((documentSubmissionField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.sendByPost);

    const emailAddressField = documentSubmissionField.values[0].subFields?.emailAddress as FormOptions;
    expect(emailAddressField.classes).toBe('govuk-!-width-one-half');
    expect((emailAddressField.label as LanguageLookup)(generatedContent)).toBe(en.emailTitle);
    (emailAddressField.validator as Function)('test@hmcts.com');
    expect(isEmailValid).toHaveBeenCalledWith('test@hmcts.com');
  });
  test('should contain Continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
