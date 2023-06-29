import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../app/form/Form';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  title: 'Do you agree to pay the court fee online using a debit or credit card?',
  paragraph:
    "If you've applied for help with paying court fees, you'll be given a reference number. You can provide this at the end of the process instead of making a payment.",
  yes: 'Yes',
  no: 'No',
  cancel: 'Cancel',
  errors: {
    applicationPayOnline: {
      required: 'Please select an answer to the below question',
    },
  },
};

const cy = {
  title: 'Ydych chi’n cytuno i dalu ffi’r llys ar-lein gan ddefnyddio cerdyn debyd neu gredyd?',
  paragraph:
    'Os ydych wedi gwneud cais am help i dalu ffioedd llys, fe roddir cyfeirnod i chi.Gallwch ei nodi ar ddiwedd y broses yn hytrach na gwneud taliad.',
  yes: 'Ydw',
  no: 'Nac ydw',
  cancel: 'Canslo',
  errors: {
    applicationPayOnline: {
      required: 'Please select an answer to the below question - welsh',
    },
  },
};

describe('agree-court-fee > content', () => {
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

  test('should contain address1 field', () => {
    const { applicationPayOnline } = fields as Record<string, FormFields>;
    expect(applicationPayOnline.type).toBe('radios');
    expect(applicationPayOnline.classes).toBe('govuk-radios');
    expect((applicationPayOnline.values[0].label as LanguageLookup)(generatedContent)).toBe('Yes');
    expect((applicationPayOnline.values[1].label as LanguageLookup)(generatedContent)).toBe('No');
  });

  test('should contain submit button', () => {
    expect(form.submit.text(generatePageContent({ language: 'en' }))).toBe('Continue');
  });

  test('should contain cancel button', () => {
    expect(form.link.text(generatedContent)).toBe('Cancel');
    expect(form.link.href).toBe('https://apply-to-court-about-child-arrangements.service.justice.gov.uk');
  });
});
