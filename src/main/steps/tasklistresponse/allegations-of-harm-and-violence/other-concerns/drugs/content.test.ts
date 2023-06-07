import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  title: 'Have the children been impacted by drug, alcohol or substance abuse?',
  line1: 'This could be abuse that is taking place now, or abuse that occurred in the past.',
  line2: 'For example, you think the children are impacted by living with someone who has a substance abuse problem.',
  one: 'Yes',
  two: 'No',
  description:
    'Describe in a few sentences the nature of the behaviour that you want the court to be aware of. Explain who is involved, and if the behaviour is ongoing.',
  errors: {
    PRL_c1A_otherConcernsDrugs: {
      required: 'Select yes if the children have been impacted by drug, alcohol or substance abuse',
    },
    PRL_c1A_otherConcernsDrugsDetails: {
      required: 'Describe how the children have been impacted by drug, alcohol or substance abuse',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy = {
  serviceName: 'Trefniadau plant',
  caption: 'Pryderon diogelwch',
  title: 'A yw’r plant wedi cael eu heffeithio o ganlyniad i gamddefnyddio cyffuriau, alcohol neu sylweddau?',
  line1: 'This could be abuse that is taking place now, or abuse that occurred in the past. - welsh',
  line2:
    'For example, you think the children are impacted by living with someone who has a substance abuse problem. -welsh',
  one: 'Do',
  two: 'Naddo',
  description:
    'Describe in a few sentences the nature of the behaviour that you want the court to be aware of. Explain who is involved, and if the behaviour is ongoing. - Welsh',
  errors: {
    PRL_c1A_otherConcernsDrugs: {
      required: 'Select yes if the children have been impacted by drug, alcohol or substance abuse - Welsh',
    },
    PRL_c1A_otherConcernsDrugsDetails: {
      required: 'Describe how the children have been impacted by drug, alcohol or substance abuse - Welsh',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Safety concern > other-concerns> drugs', () => {
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
    const applyingWithField = fields.PRL_c1A_otherConcernsDrugs as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    const field2 = applyingWithField.values[0].subFields!.PRL_c1A_otherConcernsDrugsDetails;
    expect((field2?.label as Function)(generatedContent)).toBe(en.description);
    expect(field2.type).toBe('textarea');
    (field2.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
