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
  appropriateLightingSubField: 'Describe what you need',
  regularBreaks: 'Regular breaks',
  spaceUpAndMoveAround: 'Space to be able to get up and move around',
  feelComportableOther: 'Other',
  feelComportableOtherSubField: 'Describe what you need',
  feelComportableNoOption: 'No, I do not need any support at this time',
  errors: {
    ra_appropriateLightingSubField: {
      required: 'Describe the appropriate lighting you need',
    },
    ra_feelComportableOtherSubField: {
      required: 'Describe what you need to feel comfortable during a court hearing',
    },
    ra_feelComportable: {
      required: 'Select what you need to feel comfortable during a court hearing',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
  line1:
    'Ystyriwch wrandawiad wyneb yn wyneb, dros y ffôn neu drwy fideo, rhag ofn nad yw’r math o wrandawiad a ffefrir gennych yn bosibl',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  appropriateLighting: 'Golau priodol',
  appropriateLightingSubField: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  regularBreaks: 'Seibiannau rheolaidd',
  spaceUpAndMoveAround: 'Lle i allu codi a symud o gwmpas',
  feelComportableOther: 'Arall',
  feelComportableOtherSubField: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  feelComportableNoOption: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_appropriateLightingSubField: {
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
    const appropriateLightingSubFields = feelComportableField.values[0].subFields
      ?.ra_appropriateLightingSubField as FormOptions;

    expect(feelComportableField.type).toBe('checkboxes');
    expect(appropriateLightingSubFields.type).toBe('textarea');
    expect((appropriateLightingSubFields?.label as Function)(generatedContent)).toBe(en.appropriateLightingSubField);

    (feelComportableField.validator as Function)('appropriateLighting');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('appropriateLighting');

    (appropriateLightingSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const feelComportableOtherSubFields = feelComportableField.values[3].subFields
      ?.ra_feelComportableOtherSubField as FormOptions;

    expect(feelComportableOtherSubFields.type).toBe('textarea');
    expect((feelComportableOtherSubFields?.label as Function)(generatedContent)).toBe(en.feelComportableOtherSubField);

    (feelComportableOtherSubFields.validator as Function)('test text area');
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
