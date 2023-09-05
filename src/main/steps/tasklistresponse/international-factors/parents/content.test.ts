import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: ' ',
  title:
    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
  hint: 'For example, this could include a grandparent or another close relative. They may have work, property or school arrangements that are mainly based outside of England and Wales.',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  provideDetails: 'Provide details',
  errors: {
    parents: {
      required: 'Please select one of the options before proceeding further',
    },
    iFactorsParentsProvideDetails: {
      required: 'Please fill the provide details field before proceeding further',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cyContent = {
  section: ' ',
  title: "A yw rhieni'r plant (neu unrhyw un o bwys i'r plant) wedi'u lleoli y tu allan i Gymru a Lloegr yn bennaf?",
  hint: "Er enghraifft, gallai hyn gynnwys taid a nain neu berthynas agos arall. Mae'n bosib y bydd ganddyn nhw drefniadau gwaith, eiddo neu ysgol sydd wedi'u lleoli'n bennaf y tu allan i Gymru a Lloegr.",
  one: 'Ydyn',
  two: 'Nac ydyn',
  continue: 'Parhau',
  provideDetails: 'Rhowch fanylion',
  errors: {
    parents: {
      required: 'Dewiswch un o’r opsiynau cyn parhau ymhellach',
    },
    iFactorsParentsProvideDetails: {
      required: 'Llenwch y blwch ar gyfer rhoi manylion cyn parhau ymhellach',
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
    expect(generatedContent.title).toEqual(
      "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?"
    );
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

  test('should contain parents field', () => {
    const parentsField = fields.parents as FormOptions;
    expect(parentsField.type).toBe('radios');
    expect(parentsField.classes).toBe('govuk-radios');
    expect((parentsField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((parentsField.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect(parentsField.validator).toBe(isFieldFilledIn);
    expect((parentsField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect((parentsField.values[0].subFields?.iFactorsParentsProvideDetails.label as Function)(generatedContent)).toBe(
      enContent.provideDetails
    );
    (parentsField.values[0].subFields?.iFactorsParentsProvideDetails.validator as Validator)('test value');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test value');
    expect((parentsField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
  });

  test('should contain onlyContinue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
