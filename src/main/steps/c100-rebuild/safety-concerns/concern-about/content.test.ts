import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  headingTitle: 'Who are you concerned about?',
  select_all_relevant: 'Select all options that are relevant to you.',
  childrenInThisApplication: 'The children in this application',
  yourself: 'Yourself',
  errors: {
    c1A_safetyConernAbout: {
      required: 'Specify who you are concerned about',
    },
  },
};

const cy = {
  serviceName: 'Trefniadau plant',
  caption: 'Pryderon diogelwch',
  headingTitle: 'Am bwy ydych chi’n poeni amdano/amdani?',
  select_all_relevant: "Dewiswch bob opsiwn sy'n berthnasol i chi",
  childrenInThisApplication: 'Y plant yn y cais hwn',
  yourself: 'Chi eich hun',
  errors: {
    c1A_safetyConernAbout: {
      required: "Nodwch am bwy yr ydych chi'n poeni",
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Safety concern about > applying-with > content', () => {
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
    const concernAboutField = fields.c1A_safetyConernAbout as FormOptions;
    expect(concernAboutField.type).toBe('checkboxes');
    expect((concernAboutField?.hint as Function)(generatedContent)).toBe(en.select_all_relevant);
    expect((concernAboutField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.childrenInThisApplication);
    expect((concernAboutField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.yourself);

    (concernAboutField.validator as Function)('c1A_safetyConernAbout');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('c1A_safetyConernAbout');
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
