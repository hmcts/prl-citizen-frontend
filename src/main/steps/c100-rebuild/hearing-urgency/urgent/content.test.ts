import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Does your situation qualify for an urgent first hearing?',
  paragraphs: [
    'In many cases the first hearing will take place within 2 months. But the court may agree to an earlier first hearing (urgent hearing) if it is necessary.',
    'For example, there may be an immediate risk of harm to you or the children.',
    'If you get an urgent hearing, this may not mean that your case will be over sooner, and you may not receive a final decision on your case at this stage.',
  ],
  warningText: {
    text: 'Only ask for an urgent hearing if you have a good reason. The court will only agree to an urgent hearing if they think the situation is critical.',
    iconFallbackText: 'Warning',
  },
  label: 'Do you have a good reason to request an urgent hearing?',
  one: 'Yes',
  two: 'No',
  errors: {
    hu_urgentHearingReasons: {
      required: 'Select yes if you have a good reason to request an urgent hearing',
    },
  },
};

const cy = {
  title: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
  paragraphs: [
    'Gyda nifer o achosion, cynhelir y gwrandawiad cyntaf o fewn 2 fis. Ond efallai y bydd y llys yn trefnu i gynnal y gwrandawiad cyntaf yn gynt na hyn (gwrandawiad brys) os bydd angen.',
    'Er enghraifft, efallai bod risg uniongyrchol o niwed i chi neu’r plant.',
    'Os cewch wrandawiad brys, nid yw hyn o reidrwydd yn golygu y bydd eich achos drosodd yn gynt, ac efallai ni fyddwch yn cael penderfyniad terfynol ar eich achos ar yr adeg hon.',
  ],
  warningText: {
    text: 'Dylech ond gofyn am wrandawiad brys os oes gennych reswm da dros wneud hynny. Bydd y llys ond yn cytuno i drefnu gwrandawiad brys os yw’n credu bod y sefyllfa’n argyfyngus.',
    iconFallbackText: 'Rhybudd',
  },
  label: 'A oes gennych chi reswm da dros wneud cais am gael gwrandawiad brys?',
  one: 'Oes',
  two: 'Nac oes',
  errors: {
    hu_urgentHearingReasons: {
      required: 'Dewiswch oes os oes gennych reswm da dros ofyn am wrandawiad brys',
    },
  },
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
    expect((applyingWithField.label as LanguageLookup)(generatedContent)).toBe(
      'Do you have a good reason to request an urgent hearing?'
    );
    expect((applyingWithField.section as LanguageLookup)(generatedContent)).toBe(undefined);
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
