import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  serviceName: 'Apply to court about child arrangements',
  title: 'Is there anyone else who should know about your application?',
  paragraph: 'For example, you should tell everyone who:',
  bulletPoints: [
    "Cares for the children (but is not their parent), including social services if the children are in local authority accommodation (such as foster care or a children's home)",
    'Is currently involved in another court case or named in a current court order that concerns the children and is relevant to this application',
    'The child has lived with for at least 3 years prior to this application',
  ],
  one: 'Yes',
  two: 'No',
  errors: {
    otherPersonCheck: {
      required: 'Select yes if anyone else should know about the application',
    },
  },
};

const cy = {
  serviceName: 'Apply to court about child arrangements - welsh',
  title: 'Is there anyone else who should know about your application? - welsh',
  paragraph: 'For example, you should tell everyone who: - welsh',
  bulletPoints: [
    "Cares for the children (but is not their parent), including social services if the children are in local authority accommodation (such as foster care or a children's home) -",
    'Is currently involved in another court case or named in a current court order that concerns the children and is relevant to this application -',
    'The child has lived with for at least 3 years prior to this application -',
  ],
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    otherPersonCheck: {
      required: 'Select yes if anyone else should know about the application - welsh',
    },
  },
};

describe('/other-people content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent | undefined;
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

  test('should contain applyingWith field', () => {
    const applyingWithField = fields.otherPersonCheck as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
  });

  test('should contain Continue button', () => {
    generatedContent = generateContent(commonContent);
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    generatedContent = generateContent(commonContent);
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
