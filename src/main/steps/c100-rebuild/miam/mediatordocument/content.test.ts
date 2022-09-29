import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Do you have a document signed by the mediator?',
  paragraph: `The mediator should give you a signed document
      to confirm you attended a MIAM, or do not need to attend.
      If you do not have a document, you should ask the mediator for one.`,
  yesMediatorDocument: 'Yes',
  noMediatorDocument: 'No',
  errors: {
    miam_mediatorDocument: {
      required: 'Select yes if a mediator has confirmed that you do not need to attend a MIAM?',
    },
  },
};

const cy = {
  title: 'Do you have a document signed by the mediator? - welsh',
  paragraph: `The mediator should give you a signed document
      to confirm you attended a MIAM, or do not need to attend.
      If you do not have a document, you should ask the mediator for one.- welsh`,
  yesMediatorDocument: 'Yes- welsh',
  noMediatorDocument: 'No- welsh',
  errors: {
    miam_mediatorDocument: {
      required: 'Select yes if a mediator has confirmed that you do not need to attend a MIAM? - welsh',
    },
  },
};

describe('applicant personal details > applying-with > content', () => {
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
    const applyingWithField = fields.miam_mediatorDocument as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.yesMediatorDocument);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.noMediatorDocument);
  });

  test('should contain saveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
