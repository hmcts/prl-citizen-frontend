import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  headingTitle: 'Where do the children live?',
  paragraph1: 'Please tell us the postcode of the children you’re making this application about.',
  paragraph2: `This information will be used to identify which court will handle your application.
                If the children have a different postcode, enter the one that is most 
                convenient to most children in the application.`,
  warningText: {
    text: `You should only enter your own postcode if the children live with you at the address,
          or you don't know where the children are living.`,
    iconFallbackText: 'Warning',
  },
  postcodeLabel: 'Postcode',
  detailsLabel: "Why we use the term 'children'",
  detailsContent: `We use ‘children’ as a general term to mean whether you have a child or children.
                   We do this to avoid repetition.`,
  errors: {
    c100RebuildChildPostCode: {
      required: 'Enter a full postcode, with or without a space',
      invalid: 'Enter a valid full postcode, with or without a space',
    },
  },
};

const cy = {
  headingTitle: 'Where do the children live? - welsh',
  paragraph1: `Please tell us the postcode of the children 
              you’re making this application about. - welsh`,
  paragraph2: `This information will be used to identify which court will handle your application.
                If the children have a different postcode, enter the one that is most 
                convenient to most children in the application. - welsh`,
  warningText: {
    text: `You should only enter your own postcode if the children live with you at the address,
          or you don't know where the children are living. - welsh`,
    iconFallbackText: 'Warning - welsh',
  },
  postcodeLabel: 'Postcode - welsh',
  detailsLabel: "Why we use the term 'children' - welsh",
  detailsContent: `We use ‘children’ as a general term to mean whether you have a child or children.
                   We do this to avoid repetition. - welsh`,
  errors: {
    c100RebuildChildPostCode: {
      required: 'Enter a full postcode, with or without a space - welsh',
      invalid: 'Enter a valid full postcode, with or without a space - welsh',
    },
  },
};
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
  test('should contain applyingWith field', () => {
    const applyingWithField = fields.c100RebuildChildPostCode as FormOptions;
    expect(applyingWithField.type).toBe('text');
    expect(applyingWithField.classes).toBe('govuk-input--width-10');
  });
  test('should contain Continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
