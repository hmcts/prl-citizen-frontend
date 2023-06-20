import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../app/form/Form';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  title: 'Do you want your legal representative to complete the application for you?',
  yes: 'Yes',
  no: 'No',
  cancel: 'Cancel',
  errors: {
    legalRepresentativeForApplication: {
      required: 'Please select an answer to the below question',
    },
  },
};

const cy = {
  title: "Ydych chi eisiau i’ch cynrychiolydd cyfreithiol gwblhau'r cais ar eich rhan?",
  yes: 'Ydw',
  no: 'Nac ydw',
  cancel: 'Canslo',
  errors: {
    legalRepresentativeForApplication: {
      required: 'Please select an answer to the below question - welsh',
    },
  },
};

describe('complete-your-application-legal-representative > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
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
    languageAssertions('en', en, () => generatedContent);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain legalRepresentativeForApplication radio button', () => {
    const { legalRepresentativeForApplication } = fields as Record<string, FormFields>;
    expect(legalRepresentativeForApplication.type).toBe('radios');
    expect(legalRepresentativeForApplication.classes).toBe('govuk-radios');
    expect((legalRepresentativeForApplication.values[0].label as LanguageLookup)(generatedContent)).toBe('Yes');
    expect((legalRepresentativeForApplication.values[1].label as LanguageLookup)(generatedContent)).toBe('No');
  });

  test('should contain submit button', () => {
    expect(form.submit.text(generatePageContent({ language: 'en' }))).toBe('Continue');
  });

  test('should contain cancel button', () => {
    expect(form.link.text(generatedContent)).toBe('Cancel');
    expect(form.link.href).toBe(
      'https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a'
    );
  });
});
