import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need something to feel comfortable during a court hearing',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  appropriateLighting: 'Appropriate lighting',
  appropriateLighting_subfield: 'Describe what you need',
  regularBreaks: 'Regular breaks',
  spaceUpAndMoveAround: 'Space to be able to get up and move around',
  feelComportableOther: 'Other',
  feelComportableOther_subfield: 'Describe what you need',
  feelComportableNoOption: 'No, I do not need any support at this time',
  errors: {
    ra_appropriateLighting_subfield: {
      required: 'Describe the appropriate lighting you need',
    },
    ra_feelComportableOther_subfield: {
      required: 'Describe what you need to feel comfortable during a court hearing',
    },
    ra_feelComportable: {
      required: 'Select what you need to feel comfortable during a court hearing',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need something to feel comfortable during a court hearing - welsh',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  appropriateLighting: 'Appropriate lighting - welsh',
  appropriateLighting_subfield: 'Describe what you need - welsh',
  regularBreaks: 'Regular breaks - welsh',
  spaceUpAndMoveAround: 'Space to be able to get up and move around - welsh',
  feelComportableOther: 'Other - welsh',
  feelComportableOther_subfield: 'Describe what you need - welsh',
  feelComportableNoOption: 'No, I do not need any support at this time - welsh',
  errors: {
    ra_appropriateLighting_subfield: {
      required: 'Describe the appropriate lighting you need - welsh',
    },
    feelComportableSubField: {
      required: 'Describe what you need to feel comfortable during a court hearing - welsh',
    },
    ra_feelComportable: {
      required: 'Select what you need to feel comfortable during a court hearing - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > applying-with > content', () => {
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

  test('should contain specialArrangements field', () => {
    const feelComportableField = fields.ra_feelComportable as FormOptions;
    const appropriateLighting_subfields = feelComportableField.values[0].subFields
      ?.ra_appropriateLighting_subfield as FormOptions;

    expect(feelComportableField.type).toBe('checkboxes');
    expect(appropriateLighting_subfields.type).toBe('textarea');
    expect((appropriateLighting_subfields?.label as Function)(generatedContent)).toBe(en.appropriateLighting_subfield);

    (feelComportableField.validator as Function)('appropriateLighting');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('appropriateLighting');

    (appropriateLighting_subfields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const feelComportableOther_subfields = feelComportableField.values[3].subFields
      ?.ra_feelComportableOther_subfield as FormOptions;

    expect(feelComportableOther_subfields.type).toBe('textarea');
    expect((feelComportableOther_subfields?.label as Function)(generatedContent)).toBe(
      en.feelComportableOther_subfield
    );

    (feelComportableOther_subfields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    expect((feelComportableField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((feelComportableField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.appropriateLighting);
    expect((feelComportableField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.regularBreaks);
    expect((feelComportableField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.spaceUpAndMoveAround);
    expect((feelComportableField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.feelComportableOther);
    expect((feelComportableField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.feelComportableNoOption);

    expect(feelComportableField.values[5].behaviour).toBe('exclusive');
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
