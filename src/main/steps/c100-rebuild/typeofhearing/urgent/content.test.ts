import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Does your situation qualify for an urgent first hearing?    ',
  paragraph1:
    'In many cases the first hearing will take place within 2 months. But the court may agree to an earlier \
  first hearing (urgent hearing) if it is necessary.',
  paragraph2: 'For example, there may be an immediate risk of harm to you or the children.',
  paragraph3:
    'If you get an urgent hearing, this may not mean that your case will be over sooner, and you may not receive \
  a final decision on your case at this stage.',
  warning:
    'Only ask for an urgent hearing if you have a good reason. The court will only agree to an urgent hearing \
  if they think the situation is critical.',
  one: 'Yes',
  two: 'No',
  errors: {
    hu_urgentHearingReasons: {
      required: 'Select yes if you have a good reason to request an urgent hearing',
    },
  },
  label: 'Do you have a good reason to request an urgent hearing?',
};

const cy = {
  title: 'Does your situation qualify for an urgent first hearing? - welsh  ',
  paragraph1:
    'In many cases the first hearing will take place within 2 months. But the court may agree to an earlier \
  first hearing (urgent hearing) if it is necessary. - welsh  ',
  paragraph2: 'For example, there may be an immediate risk of harm to you or the children.  - welsh  ',
  paragraph3:
    'If you get an urgent hearing, this may not mean that your case will be over sooner, and you may not receive \
  a final decision on your case at this stage. - welsh  ',
  warning:
    'Only ask for an urgent hearing if you have a good reason. The court will only agree to an urgent hearing \
  if they think the situation is critical.  - welsh  ',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    hu_urgentHearingReasons: {
      required: 'Select yes if you have a good reason to request an urgent hearing - welsh',
    },
  },
  label: 'Do you have a good reason to request an urgent hearing? - welsh',
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
    const applyingWithField = fields.hu_urgentHearingReasons as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
