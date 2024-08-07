import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
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
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_feelComportableOther_subfield: {
      required: 'Describe what you need to feel comfortable during a court hearing',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_feelComportable: {
      required: 'Select what you need to feel comfortable during a court hearing',
    },
  },
};

const cy = {
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
  line1:
    'Ystyriwch wrandawiad wyneb yn wyneb, dros y ffôn neu drwy fideo, rhag ofn nad yw’r math o wrandawiad a ffefrir gennych yn bosibl',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  appropriateLighting: 'Golau priodol',
  appropriateLighting_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  regularBreaks: 'Seibiannau rheolaidd',
  spaceUpAndMoveAround: 'Lle i allu codi a symud o gwmpas',
  feelComportableOther: 'Arall',
  feelComportableOther_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  feelComportableNoOption: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_appropriateLighting_subfield: {
      required: 'Disgrifiwch y goleuadau priodol sydd ei angen arnoch',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_feelComportableOther_subfield: {
      required: "Disgrifiwch yr hyn sydd angen arnoch i deimlo'n gyfforddus yn ystod y gwrandawiad llys",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_feelComportable: {
      required: "Dewiswch beth sydd angen arnoch i deimlo'n gyfforddus yn ystod y gwrandawiad llys",
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > applying-with > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/reasonable-adjustments/support-during-court-hearing',
      },
    },
  } as unknown as CommonContent;
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

    expect(feelComportableField.values[5].exclusive).toBe(true);
  });

  test('should contain correct values when not c100 journey', () => {
    commonContent.additionalData!.req.originalUrl = 'applicant/reasonable-adjustments/needs-during-court-hearing';
    generatedContent = generateContent(commonContent);
    const feelComportableField = generatedContent.form.fields.ra_feelComportable as FormOptions;

    expect(feelComportableField.values[0].value).toBe('appropriatelighting');
    expect(feelComportableField.values[1].value).toBe('breaks');
    expect(feelComportableField.values[2].value).toBe('space');
    expect(feelComportableField.values[3].value).toBe('other');
    expect(feelComportableField.values[5].value).toBe('nosupport');
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
