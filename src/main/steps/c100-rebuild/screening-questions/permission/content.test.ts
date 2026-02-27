import languageAssertions from './../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from './../../../../app/form/Form';
import { CommonContent, generatePageContent } from './../../../common/common.content';
import { generateContent } from './content';

jest.mock('./../../../../app/form/validation');

const en = {
  title: 'Permission to apply',
  paragraphsOne: ['You will not normally need permission if you are the child’s:'],
  bulletPoints: ['parent', 'guardian', 'special guardian'],
  paragraphsTwo: [
    "However, this does not apply if there is an order in place stating that you cannot make an application without the court's permission. For example:",
  ],
  bulletPointsTwo: [
    'an order under section 91(14) of the Children Act 1989',
    'a limited civil restraint order',
    'a general civil restraint order',
    'an extended civil restraint order',
  ],
  question: 'Is there any reason that you would need permission from the court to make this application?',
  one: 'Yes',
  two: 'No',
  errors: {
    sq_courtPermissionRequired: {
      required:
        'Select yes if there is any reason why you would need permission from the court to make this application',
    },
  },
};

const cy = {
  title: 'Caniatâd i wneud cais',
  paragraphsOne: ["Ni fyddwch angen caniatâd fel rheol os mai chi yw'r:"],
  bulletPoints: ['rhiant', 'gwarcheidwad', 'gwarcheidwad arbennig'],
  paragraphsTwo: [
    'Fodd bynnag, nid yw hyn yn berthnasol os oes yna orchymyn yn nodi na allwch wneud cais heb ganiatâd y llys. Er enghraifft:',
  ],
  bulletPointsTwo: [
    'gorchymyn o dan adran 91(14) Deddf Plant 1989',
    'gorchymyn ataliad sifil cyfyngedig',
    'gorchymyn ataliad sifil cyffredinol',
    'gorchymyn ataliad sifil estynedig',
  ],
  question: 'Oes yna unrhyw reswm y byddech angen caniatâd gan y llys i wneud y cais hwn?',
  one: 'Oes',
  two: 'Nac oes',
  errors: {
    sq_courtPermissionRequired: {
      required: 'Dewiswch ‘oes’ os oes unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn',
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
    const courtPermissionRequired = fields.sq_courtPermissionRequired as FormOptions;
    expect(courtPermissionRequired.type).toBe('radios');
    (courtPermissionRequired.validator as Function)('courtPermissionRequired');
    expect((courtPermissionRequired.label as LanguageLookup)(generatedContent)).toBe(en.question);
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
