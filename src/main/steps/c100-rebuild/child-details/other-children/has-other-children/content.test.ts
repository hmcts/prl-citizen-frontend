import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Do you or any respondents have other children who are not part of this application?',
  one: YesOrNo.YES,
  two: YesOrNo.NO,
  errors: {
    cd_hasOtherChildren: {
      required: 'Select yes if you have other children',
    },
  },
};

const cy = {
  title: 'Do you or any respondents have other children who are not part of this application?',
  one: YesOrNo.YES,
  two: YesOrNo.NO,
  errors: {
    cd_hasOtherChildren: {
      required: 'Select yes if you have other children',
    },
  },
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent | undefined;
    fields = form.fields as FormFields;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const cd_otherChildren = fields.cd_hasOtherChildren as FormOptions;
    expect(cd_otherChildren.type).toBe('radios');
    expect(cd_otherChildren.classes).toBe('govuk-radios');
    expect((cd_otherChildren.values[0].label as LanguageLookup)(generatedContent)).toBe(YesOrNo.YES);
    expect((cd_otherChildren.values[1].label as LanguageLookup)(generatedContent)).toBe(YesOrNo.NO);
  });

  test('should contain continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
