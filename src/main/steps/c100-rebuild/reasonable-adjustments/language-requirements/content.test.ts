import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Language requirements',
  headingTitle: `Do you have any language 
  requirements?`,
  line1: `Think about all communication with the court, as well as what you might 
  need at a hearing. Consider remote and in-person hearings, in case your preferred 
  hearing type is not possible.`,
  select_all_apply: 'Select all that apply to you',
  speakInWelsh: 'I need to speak in Welsh',
  readAndWriteInWelsh: 'I need to read and write in Welsh',
  needInterpreterInCertainLanguage: 'I need an interpreter in a certain language',
  needInterpreterInCertainLanguageDetailsLabel: `Give details of the language you require (including dialect, 
    if applicable)`,
  noLanguageRequirements: 'No, I do not have any language requirements at this time',
  errors: {
    ra_needInterpreterInCertainLanguageDetails: {
      required: 'Give details of the language you need an interpreter for',
    },
    ra_languageNeeds: {
      required: 'Select whether you have any language requirements',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Language requirements - welsh',
  headingTitle: `Do you have any language 
  requirements? - welsh`,
  line1: `Think about all communication with the court, as well as what you might 
  need at a hearing. Consider remote and in-person hearings, in case your preferred 
  hearing type is not possible. - welsh`,
  select_all_apply: 'Select all that apply to you - welsh',
  speakInWelsh: 'I need to speak in Welsh - welsh',
  readAndWriteInWelsh: 'I need to read and write in Welsh - welsh',
  needInterpreterInCertainLanguage: 'I need an interpreter in a certain language - welsh',
  needInterpreterInCertainLanguageDetailsLabel: `Give details of the language you require (including dialect, 
    if applicable) - welsh`,
  noLanguageRequirements: 'No, I do not have any language requirements at this time - welsh',
  errors: {
    ra_needInterpreterInCertainLanguageDetails: {
      required: 'Give details of the language you need an interpreter for - welsh',
    },
    ra_languageNeeds: {
      required: 'Select whether you have any language requirements - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Language requirements content', () => {
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

  test('should contain languageNeeds field', () => {
    const languageNeedsField = fields.ra_languageNeeds as FormOptions;
    const needInterpreterInCertainLanguageDetailsField = languageNeedsField.values[2].subFields
      ?.ra_needInterpreterInCertainLanguageDetails as FormOptions;

    expect(languageNeedsField.type).toBe('checkboxes');
    expect(needInterpreterInCertainLanguageDetailsField.type).toBe('textarea');

    expect((languageNeedsField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((languageNeedsField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.speakInWelsh);
    expect((languageNeedsField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.readAndWriteInWelsh);
    expect((languageNeedsField.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.needInterpreterInCertainLanguage
    );
    expect((languageNeedsField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.noLanguageRequirements);
    expect(languageNeedsField.values[4].behaviour).toBe('exclusive');

    (languageNeedsField.validator as Function)('speakInWelsh');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('speakInWelsh');

    (needInterpreterInCertainLanguageDetailsField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');
  });

  test('should contain continue button', () => {
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
