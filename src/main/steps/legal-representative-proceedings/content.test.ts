import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../app/form/Form';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  title: 'Will you be using a legal representative in these proceedings?',
  yes: 'Yes',
  no: 'No',
  cancel: 'Cancel',
  errors: {
    legalRepresentativeForProceedings: {
      required: 'Please select an answer to the below question',
    },
  },
};

const cy = {
  title: 'A fyddwch yn defnyddio cynrychiolydd cyfreithiol yn yr achos hwn?',
  yes: 'Byddaf',
  no: 'Na fyddaf',
  cancel: 'Canslo',
  errors: {
    legalRepresentativeForProceedings: {
      required: 'Please select an answer to the below question - welsh',
    },
  },
};

describe('legal-representative-proceedings > content', () => {
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

  test('should contain legalRepresentativeForProceedings radio button', () => {
    const { legalRepresentativeForProceedings } = fields as Record<string, FormFields>;
    expect(legalRepresentativeForProceedings.type).toBe('radios');
    expect(legalRepresentativeForProceedings.classes).toBe('govuk-radios');
    expect((legalRepresentativeForProceedings.values[0].label as LanguageLookup)(generatedContent)).toBe('Yes');
    expect((legalRepresentativeForProceedings.values[1].label as LanguageLookup)(generatedContent)).toBe('No');
  });

  test('should contain submit button', () => {
    expect(form.submit.text(generatePageContent({ language: 'en' }))).toBe('Continue');
  });

  test('should contain cancel button', () => {
    expect(form.link.text(generatedContent)).toBe('Cancel');
    expect(form.link.href).toBe('https://apply-to-court-about-child-arrangements.service.justice.gov.uk');
  });
});
