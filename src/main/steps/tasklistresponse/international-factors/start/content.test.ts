import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: ' ',
  title: "Are the children's lives mainly based outside of England and Wales?",
  one: 'Yes',
  two: 'No',
  hint: 'For example, is their family life mainly based outside of England and Wales?',
  continue: 'Continue',
  provideDetails: 'Provide details',
  errors: {
    start: {
      required:
        "Select yes if the children's parents (or anyone significant to the children) are mainly based outside of England and Wales",
    },
    iFactorsStartProvideDetails: {
      required:
        "Provide details about the children's parents (or anyone significant to the children) lives outside of England and Wales",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cyContent = {
  section: ' ',
  title: 'Ydy bywyd y plant yn cael ei dreulio’n bennaf y tu allan i Gymru a Lloegr?',
  one: 'Ydy',
  two: 'Nac ydy',
  hint: 'Er enghraifft, a yw eu bywyd teuluol yn bennaf y tu allan i Gymru a Lloegr?',
  continue: 'Parhau',
  provideDetails: 'Rhowch fanylion',
  errors: {
    start: {
      required:
        "Dewiswch ydy os yw rhieni’r plant (neu unrhyw un sy’n bwysig i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr",
    },
    iFactorsStartProvideDetails: {
      required:
        'Rhowch fanylion am rieni’r plant (neu unrhyw un sy’n bwysig i’r plant) sy’n byw y tu allan i Gymru a Lloegr',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
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
    expect(generatedContent.title).toEqual("Are the children's lives mainly based outside of England and Wales?");
    expect(generatedContent.section).toEqual(' ');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const startField = fields.start as FormOptions;
    expect(startField.type).toBe('radios');
    expect(startField.classes).toBe('govuk-radios');
    expect((startField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((startField.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect(startField.validator).toBe(isFieldFilledIn);
    expect((startField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect((startField.values[0].subFields?.iFactorsStartProvideDetails.label as Function)(generatedContent)).toBe(
      enContent.provideDetails
    );
    (startField.values[0].subFields?.iFactorsStartProvideDetails.validator as Validator)('test value');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test value');
    expect((startField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
  });

  test('should onlyContinue continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
