import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'Keeping your contact details private',
  headingTitle: 'The court will keep your contact details private',
  p1: 'You have told us you want to keep these contact details private',
  heading3: 'What the court will do',
  p2: 'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass CYMRU unless it is by order of the court.',
};

const cy = {
  caption: 'Cadw eich manylion cyswllt yn breifat',
  headingTitle: 'Bydd y llys yn cadw eich manylion cyswllt yn breifat.',
  p1: "Rydych wedi dweud wrthym eich bod eisiau cadw'r manylion cyswllt yma yn breifat:",
  heading3: 'Beth fydd y llys yn ei wneud',
  p2: "Bydd y llys yn cadw'r wybodaeth hon yn ddiogel ac ni fydd yn ei rhannu ag unrhyw un ac eithrio Cafcass (Children and Family Court Advisory and Support Service) neu Cafcass CYMRU oni bai ei fod trwy orchymyn y llys.",
};

describe('applicant personal details > confidentiality > feedback', () => {
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
    const applyingWithField = fields.fields as FormOptions;
    expect(applyingWithField?.type).not.toBe('radios');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
