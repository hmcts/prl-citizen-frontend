import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: ' ',
  title: "Are the children's lives mainly based outside of England and Wales?",
  one: 'Yes',
  two: 'No',
  hint: 'For example, is their family life mainly based outside of England and Wales?',
  continue: 'Continue',
  errors: {
    start: {
      required:
        "Select yes if the children's parents (or anyone significant to the children) are mainly based outside of England and Wales",
    },
    iFactorsStartProvideDetails: {
      required:
        "Provide details about the children's parents (or anyone significant to the children) lives outside of England and Wales",
    },
  },
};

const cyContent = {
  section: ' ',
  title: 'Ydy bywyd y plant yn cael ei dreulio’n bennaf y tu allan i Gymru a Lloegr?',
  one: 'Ydy',
  two: 'Nac ydy',
  hint: 'Er enghraifft, a yw eu bywyd teuluol yn bennaf y tu allan i Gymru a Lloegr?',
  continue: 'Continue',
  errors: {
    start: {
      required:
        "Select yes if the children's parents (or anyone significant to the children) are mainly based outside of England and Wales",
    },
    iFactorsStartProvideDetails: {
      required:
        "Provide details about the children's parents (or anyone significant to the children) lives outside of England and Wales",
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
    const detailsKnownField = fields.start as FormOptions;
    expect(detailsKnownField.type).toBe('radios');
    expect(detailsKnownField.classes).toBe('govuk-radios');
    expect((detailsKnownField.section as Function)(generatedContent)).toBe(enContent.section);
  });

  test('should onlyContinue continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
