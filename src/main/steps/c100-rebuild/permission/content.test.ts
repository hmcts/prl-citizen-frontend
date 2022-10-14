import languageAssertions from './../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from './../../../app/form/Form';
import { CommonContent, generatePageContent } from './../../common/common.content';
import { generateContent } from './content';

jest.mock('./../../../app/form/validation');

const en = {
  title: 'Is there any reason why you would need permission from the court to make this application?',
  courtPermissionLine1: 'In some cases, the court will need to give permission before the application can be made.',
  courtPermissionLine2: 'You will not need permission if you are the:',
  courtPermissionBullet1: 'parent',
  courtPermissionBullet2: 'guardian',
  courtPermissionBullet3: 'special guardian',
  courtPermissionLine3: 'You may, or may not need permission from the court.',
  courtPermissionLine4:
    'For example, you may need permission if you are in the children’s lives, but not their parent or guardian.',
  courtPermissionLine5:
    'You will need the court’s permission if you are one of the children, and the application is about you.',
  courtPermissionLine6:
    'If you are not sure if you need permission, <a  target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">see Section C of the Form CB1 guidance on GOV.UK</a>',
  summaryText: 'Contacts for help',
  one: 'Yes',
  two: 'No',
  errors: {
    courtPermissionRequired: {
      required:
        'Select yes if there is any reason why you would need permission from the court to make this application',
    },
  },
};

const cy = {
  title: 'Is there any reason why you would need permission from the court to make this application?',
  courtPermissionLine1: 'In some cases, the court will need to give permission before the application can be made.',
  courtPermissionLine2: 'You will not need permission if you are the:',
  courtPermissionBullet1: 'parent',
  courtPermissionBullet2: 'guardian',
  courtPermissionBullet3: 'special guardian',
  courtPermissionLine3: 'You may, or may not need permission from the court.',
  courtPermissionLine4:
    'For example, you may need permission if you are in the children’s lives, but not their parent or guardian.',
  courtPermissionLine5:
    'You will need the court’s permission if you are one of the children, and the application is about you.',
  courtPermissionLine6:
    'If you are not sure if you need permission, <a  target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">see Section C of the Form CB1 guidance on GOV.UK</a>',
  summaryText: 'Contacts for help',
  one: 'Yes',
  two: 'No',
  errors: {
    courtPermissionRequired: {
      required:
        'Select yes if there is any reason why you would need permission from the court to make this application',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Safety concern > abduction > child-location', () => {
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

  test('should contain safety concerns > abduction > child-location fields', () => {
    const courtPermissionRequired = fields.courtPermissionRequired as FormOptions;
    expect(courtPermissionRequired.type).toBe('radios');
    (courtPermissionRequired.validator as Function)('courtPermissionRequired');
    expect((courtPermissionRequired.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((courtPermissionRequired.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
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
