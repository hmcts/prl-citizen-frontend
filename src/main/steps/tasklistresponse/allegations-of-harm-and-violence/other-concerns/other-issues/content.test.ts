import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { Validator, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Safety concerns',
  title: 'Do you have any other concerns about the children’s safety and wellbeing?',
  hint: 'For example, their basic needs are not being met (known as child neglect) or you’re worried about someone they may have contact with.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  description:
    'Describe in a few sentences the nature of the behaviour that you want the court to be aware of. Explain who is involved, and if the behaviour is ongoing.',
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
  title: 'A oes gennych chi unrhyw bryderon eraill am ddiogelwch a lles y plant?',
  hint: "Er enghraifft, nid yw eu hanghenion sylfaenol yn cael eu diwallu (a elwir yn esgeuluso plant) neu rydych chi'n poeni am rywun y gallai fod ganddynt gysylltiad â nhw.",
  one: 'Oes',
  two: 'Nac oes',
  summaryText: 'Cysylltiadau am gymorth',
  description:
    "Disgrifiwch mewn ychydig frawddegau, natur yr ymddygiad rydych eisiau i'r llys fod yn ymwybodol ohono. Esboniwch pwy sy'n ymddwyn yn amhriodol, ac os yw'r ymddygiad yn parhau.",
  errors: {
    PRL_c1A_childSafetyConcerns: {
      required: 'Dewiswch oes os oes gennych bryderon eraill am ddiogelwch a lles y plant',
    },
    PRL_c1A_childSafetyConcernsDetails: {
      required: 'Disgrifiwch y pryderon sydd gennych am ddiogelwch a lles y plant',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
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
    expect((childSafetyConcerns.label as Function)(generatedContent)).toBe(undefined);
    expect((childSafetyConcerns.hint as Function)(generatedContent)).toBe(en.hint);
    expect((childSafetyConcerns.section as Function)(generatedContent)).toBe(en.section);

    expect((childSafetyConcerns.values[0].label as Function)(generatedContent)).toBe(en.one);

    (childSafetyConcerns.values[0].subFields?.PRL_c1A_childSafetyConcernsDetails.validator as Validator)(
      'PRL_c1A_childSafetyConcernsDetails'
    );
    expect(isFieldFilledIn).toHaveBeenCalledWith('PRL_c1A_childSafetyConcernsDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('PRL_c1A_childSafetyConcernsDetails');

    expect((childSafetyConcerns.values[1].label as Function)(generatedContent)).toBe(en.two);
  });

  test('should contain continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
