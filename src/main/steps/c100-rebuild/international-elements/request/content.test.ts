import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Has another country asked (or been asked) for information or help for the children?',
  line1:
    'This may be due to child protection concerns, the need to enforce an order abroad or to help a court with a request for another case.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    internationalRequest: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    provideDetailsRequest: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
    },
  },
};

const cy = {
  title: 'Has another country asked (or been asked) for information or help for the children? - welsh ',
  line1:
    'This may be due to child protection concerns, the need to enforce an order abroad or to help a court with a request for another case. - welsh  ',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  provideDetails: 'Provide details - Welsh',
  errors: {
    internationalRequest: {
      required:
        'Select yes if another country has asked (or been asked) for information or help for the children - Welsh',
    },
    provideDetailsRequest: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children - Welsh ',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > international elements > request', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.internationalRequest as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);

    const field2 = applyingWithField.values[0].subFields!.provideDetailsRequest;
    expect((field2?.label as Function)(generatedContent)).toBe(en.provideDetails);
    expect(field2.type).toBe('textarea');
    (field2.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
