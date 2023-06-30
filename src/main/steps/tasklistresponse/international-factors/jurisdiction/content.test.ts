import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: ' ',
  title: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'For example, because a court in another country has the power (jurisdiction) to make decisions or judgments.',
  continue: 'Continue',
  provideDetails: 'Provide details',
  errors: {
    jurisdiction: {
      required:
        'Select yes if another person in the application could apply for a similar order in a country outside England or Wales',
    },
    iFactorsJurisdictionProvideDetails: {
      required:
        'Provide details about another person in the application applying for a similar order in a country outside England or Wales',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cyContent = {
  section: ' ',
  title: 'A allai rhywun arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr?',
  one: 'Gallai',
  two: 'Na allai',
  twoHint:
    'Er enghraifft, am fod gan lys mewn gwlad arall y pŵer (awdurdodaeth) i wneud penderfyniadau neu ddyfarniadau.',
  continue: 'Parhau',
  provideDetails: 'Rhowch fanylion',
  errors: {
    jurisdiction: {
      required:
        'Select yes if another person in the application could apply for a similar order in a country outside England or Wales',
    },
    iFactorsJurisdictionProvideDetails: {
      required:
        'Rhowch fanylion am rywun arall yn y cais sy’n gwneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr',
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
      'Could another person in the application apply for a similar order in a country outside England or Wales?'
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

  test('should contain detailsKnown field', () => {
    const detailsKnownField = fields.jurisdiction as FormOptions;
    expect(detailsKnownField.type).toBe('radios');
    expect(detailsKnownField.classes).toBe('govuk-radios');
    expect((detailsKnownField.section as Function)(generatedContent)).toBe(enContent.section);

    const jurisdictionField = fields.jurisdiction as FormOptions;
    expect(jurisdictionField.type).toBe('radios');
    expect(jurisdictionField.classes).toBe('govuk-radios');
    expect((jurisdictionField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((jurisdictionField.hint as Function)(generatedContent)).toBe(enContent.twoHint);
    expect(jurisdictionField.validator).toBe(isFieldFilledIn);
    expect((jurisdictionField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect(
      (jurisdictionField.values[0].subFields?.iFactorsJurisdictionProvideDetails.label as Function)(generatedContent)
    ).toBe(enContent.provideDetails);
    (jurisdictionField.values[0].subFields?.iFactorsJurisdictionProvideDetails.validator as Validator)('test value');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test value');
    expect((jurisdictionField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
  });

  test('should contain onlyContinue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
