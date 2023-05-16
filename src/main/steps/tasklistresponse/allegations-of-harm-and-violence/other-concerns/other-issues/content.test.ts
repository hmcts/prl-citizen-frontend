import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Safety concerns',
  title: 'Do you have any other concerns about the children’s safety and wellbeing?',
  hint: 'For example, their basic needs are not being met (known as child neglect) or you’re worried about someone they may have contact with.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  errors: {
    PRL_c1A_childSafetyConcerns: {
      required: 'Select yes if you have other concerns about the children’s safety and wellbeing',
    },
    PRL_c1A_childSafetyConcernsDetails: {
      required: 'Describe what concerns you have about the children’s safety and wellbeing',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy = {
  section: 'Pryderon diogelwch',
  title: 'Do you have any other concerns about the children’s safety and wellbeing? - welsh',
  hint: 'For example, their basic needs are not being met (known as child neglect) or you’re worried about someone they may have contact with. - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  summaryText: 'Cysylltiadau am gymorth',
  errors: {
    PRL_c1A_childSafetyConcerns: {
      required: 'Select yes if you have other concerns about the children’s safety and wellbeing - welsh',
    },
    PRL_c1A_childSafetyConcernsDetails: {
      required: 'Describe what concerns you have about the children’s safety and wellbeing - welsh',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('safety_concerns > other_concerns > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Do you have any other concerns about the children’s safety and wellbeing?');
    expect(generatedContent.section).toEqual('Safety concerns');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain childSafetyConcerns field', () => {
    const childSafetyConcerns = fields.PRL_c1A_childSafetyConcerns as FormOptions;
    expect(childSafetyConcerns.type).toBe('radios');
    expect(childSafetyConcerns.classes).toBe('govuk-radios');
    expect((childSafetyConcerns.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
