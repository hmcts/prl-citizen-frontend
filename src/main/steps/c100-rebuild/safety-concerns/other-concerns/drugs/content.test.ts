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
    c1A_otherConcernsDrugs: {
      required: 'Select yes if the children have been impacted by drug, alcohol or substance abuse',
    },
    c1A_otherConcernsDrugsDetails: {
      required: 'Describe how the children have been impacted by drug, alcohol or substance abuse',
    },
  },
};

const cy = {
  serviceName: 'Trefniadau plant',
  caption: 'Pryderon diogelwch',
  title: 'A fu effaith ar y plant o ganlyniad i gamddefnyddio cyffuriau, alcohol neu sylweddau?',
  line1: "Gallai hyn fod yn gamdriniaeth sy'n digwydd nawr neu yn y gorffennol.",
  line2:
    "Er enghraifft, rydych chi'n meddwl yr effeithir ar y plant oherwydd eu bod yn byw efo rhywun sydd â phroblem camddefnyddio sylweddau.",
  one: 'Do',
  two: 'Naddo',
  description:
    "Disgrifiwch mewn ychydig frawddegau, natur yr ymddygiad rydych eisiau i'r llys fod yn ymwybodol ohono. Esboniwch pwy sy'n ymddwyn yn amhriodol, ac os yw'r ymddygiad yn parhau.",
  errors: {
    c1A_otherConcernsDrugs: {
      required:
        "Dewiswch do os yw'r plant wedi cael eu heffeithio gan rywun a oedd yn camddefnyddio cyffuriau, alcohol neu sylweddau",
    },
    c1A_otherConcernsDrugsDetails: {
      required:
        "Dewiswch do os yw'r plant wedi cael eu heffeithio gan rywun a oedd yn camddefnyddio cyffuriau, alcohol neu sylweddau",
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
    const applyingWithField = fields.c1A_otherConcernsDrugs as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    const field2 = applyingWithField.values[0].subFields!.c1A_otherConcernsDrugsDetails;
    expect((field2?.label as Function)(generatedContent)).toBe(en.description);
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
