import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../../app/case/definition';
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
  detail:
    'Describe in a few sentences the nature of the behaviour that you want the court to be aware of. Explain who is involved, and if the behaviour is ongoing.',
  errors: {
    c1A_childSafetyConcerns: {
      required: 'Select yes if you have other concerns about the children’s safety and wellbeing',
    },
    c1A_childSafetyConcernsDetails: {
      required: 'Describe what concerns you have about the children’s safety and wellbeing',
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
  detail:
    "Disgrifiwch mewn ychydig frawddegau, natur yr ymddygiad rydych eisiau i'r llys fod yn ymwybodol ohono. Esboniwch pwy sy'n ymddwyn yn amhriodol, ac os yw'r ymddygiad yn parhau.",
  errors: {
    c1A_childSafetyConcerns: {
      required: 'Dewiswch oes os oes gennych unrhyw bryderon am eich diogelwch neu ddiogelwch y plant',
    },
    c1A_childSafetyConcernsDetails: {
      required: 'Disgrifiwch unrhyw bryderon sydd gennych am ddiogelwch a lles y plant',
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
    const childSafetyConcerns = fields.c1A_childSafetyConcerns as FormOptions;
    expect(childSafetyConcerns.type).toBe('radios');
    expect(childSafetyConcerns.classes).toBe('govuk-radios');
    expect((childSafetyConcerns.section as Function)(generatedContent)).toBe(en.section);
    expect((childSafetyConcerns.label as Function)(generatedContent)).toBe(undefined);
    expect((childSafetyConcerns.hint as Function)(generatedContent)).toBe(en.hint);
    expect(childSafetyConcerns.values[0].value).toBe(YesOrNo.YES);
    expect((childSafetyConcerns.values[0].label as Function)(generatedContent)).toBe(en.one);
    expect(
      (childSafetyConcerns.values[0].subFields!.c1A_childSafetyConcernsDetails.label as Function)(generatedContent)
    ).toBe(en.detail);
    expect(childSafetyConcerns.values[0].subFields!.c1A_childSafetyConcernsDetails.type).toBe('textarea');
    expect(childSafetyConcerns.values[1].value).toBe(YesOrNo.NO);
    expect((childSafetyConcerns.values[1].label as Function)(generatedContent)).toBe(en.two);
  });

  test('should contain continue button', () => {
    expect(
      (form?.onlycontinue.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
