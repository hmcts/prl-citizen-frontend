import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  title: 'Has the passport office been notified? ',
  Yes: 'Yes',
  No: 'No',
  errors: {
    c1A_abductionPassportOfficeNotified: {
      required: 'Select yes if the passport office has been notified',
    },
  },
};

const cy = {
  serviceName: 'Child arrangements - welsh',
  caption: 'Safety concerns - welsh',
  title: 'Has the passport office been notified? - welsh',
  Yes: 'Yes - welsh',
  No: 'No - welsh',
  errors: {
    c1A_abductionPassportOfficeNotified: {
      required: 'Select yes if the passport office has been notified - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Safety concern > abduction > passportofficenotified', () => {
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

  test('should contain safety concern about field', () => {
    const concernAboutField = fields.c1A_abductionPassportOfficeNotified as FormOptions;
    expect(concernAboutField.type).toBe('radios');
    expect((concernAboutField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.Yes);
    expect((concernAboutField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.No);

    (concernAboutField.validator as Function)('c1A_abductionPassportOfficeNotified');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('c1A_abductionPassportOfficeNotified');
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
