import languageAssertions from './../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from './../../../../app/form/Form';
import { CommonContent, generatePageContent } from './../../../common/common.content';
import { generateContent } from './content';

jest.mock('./../../../../app/form/validation');

const en = {
  title: 'Is there any reason that you would need permission from the court to make this application?',
  paragraphsOne: [
    'In some cases, the court will need to give permission before the application can be made.',
    'You will not need permission if you are the:',
  ],
  bulletPoints: ['parent', 'guardian', 'special guardian'],
  paragraphsTwo: [
    'If you are not sure if you need permission, see <a  target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">Section C of the Form CB1 guidance</a>',
  ],
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
  title: 'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
  paragraphsOne: [
    "Mewn rhai achosion, bydd angen i'r llys roi caniatâd cyn y gellir gwneud y cais.",
    "Ni fydd angen caniatâd arnoch os mai chi yw'r:",
  ],
  bulletPoints: ['rhiant', 'gwarcheidwad', 'gwarcheidwad arbennig'],
  paragraphsTwo: [
    'Os nad ydych yn siŵr os oes angen caniatâd arnoch, gweler <a  target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1"> Adran C canllawiau Ffurflen CB1</a>',
  ],
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
