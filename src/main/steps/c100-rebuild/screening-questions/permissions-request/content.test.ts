import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Explain why the court should grant you permission to submit this application',
  subHeading:
    'Give your answer in bullet points and short sentences. Explain your relationship to the children in the case and why you should be allowed to make the application.',
  errors: {
    sq_permissionsRequest: {
      required: 'Explain why the court should grant you permission to submit this application',
    },
  },
};

const cy = {
  title: 'Explain why the court should grant you permission to submit this application - welsh',
  subHeading: 'Explain why the court should grant you permission to submit this application - welsh',
  errors: {
    sq_permissionsRequest: {
      required: 'Describe what you want the court to do regarding the children in this application - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('c100-rebuild > screening-question > permission-request', () => {
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

  test('should contain courtOrder short statement text area', () => {
    const permissionRequestField = fields.sq_permissionsRequest as FormOptions;
    expect(permissionRequestField.type).toBe('textarea');
    (permissionRequestField.validator as Function)('Test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Test');
    expect(isTextAreaValid).toHaveBeenCalledWith('Test');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
