import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child arrangements',
  title: 'Will you be using a legal representative in these proceedings?',
  one: 'Yes',
  two: 'No',
  findLegalRepresentationLabel: 'Find legal representation',
  findLegalRepresentationLink: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
  legalAidLabel: 'Do you need legal aid?',
  legalAidLink: 'https://www.gov.uk/legal-aid',
  errors: {
    sq_legalRepresentation: {
      required: 'Select yes if you will be using a legal representative in these proceedings',
    },
  },
};

const cy = {
  serviceName: 'Child arrangements - welsh',
  title: 'Will you be using a legal representative in these proceedings? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  findLegalRepresentationLabel: 'Find legal representation - welsh',
  findLegalRepresentationLink: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
  legalAidLabel: 'Do you need legal aid? - welsh',
  legalAidLink: 'https://www.gov.uk/legal-aid',
  errors: {
    sq_legalRepresentation: {
      required: 'Select yes if you will be using a legal representative in these proceedings - welsh',
    },
  },
};

describe('screeing questions', () => {
  let form;
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain screening question fields', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const sqLegalRepresentation = fields.sq_legalRepresentation as FormOptions;
    expect(sqLegalRepresentation.type).toBe('radios');
    expect(sqLegalRepresentation.classes).toBe('govuk-radios');
    expect((sqLegalRepresentation.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((sqLegalRepresentation.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    (sqLegalRepresentation.validator as Validator)('YES');
    expect(isFieldFilledIn).toHaveBeenCalledWith('YES');
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
