import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title:
    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
  line1:
    'For example, this could include a grandparent or another close relative. They may have work, property or school arrangements that are mainly based outside of England and Wales.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    ie_internationalParents: {
      required:
        "Select yes if the children's parents or anyone significant to the children living outside of England or Wales",
    },
    ie_provideDetailsParents: {
      required:
        "Provide details about the children's parents or anyone significant to the children living outside of England or Wales",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy = {
  title:
    "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
  line1:
    "Er enghraifft, gallai hyn gynnwys nain neu berthynas agos arall. Efallai bod ganddynt waith, eiddo neu ysgol sydd wedi'i leoli'n bennaf y tu allan i Gymru a Lloegr.",
  one: 'Ydynt',
  two: 'Nac ydynt',
  provideDetails: 'Rhowch fanylion',
  errors: {
    ie_internationalParents: {
      required:
        "Dewiswch 'ydynt' os yw rhieni’r plant neu unrhyw un sy’n bwysig i’r plant yn byw y tu allan i Gymru neu Loegr",
    },
    ie_provideDetailsParents: {
      required:
        "Darparwch fanylion am rieni’r plant neu unrhyw un sy’n bwysig i'r plant sy'n byw y tu allan i Gymru neu Loegr",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > international elements > parents', () => {
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
    const applyingWithField = fields.ie_internationalParents as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    const field2 = applyingWithField.values[0].subFields!.ie_provideDetailsParents;
    expect((field2?.label as Function)(generatedContent)).toBe(en.provideDetails);
    expect(field2.type).toBe('textarea');
    (field2.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
