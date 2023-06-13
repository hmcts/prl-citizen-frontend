import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: ' ',
  title: 'Has another country asked (or been asked) for information or help for the children?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'It may be that there are child protection concerns, a court needs help with a request on another case, an order needs to be enforced abroad, or efforts are being made to return children to England or Wales.',
  continue: 'Continue',
  errors: {
    request: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    iFactorsRequestProvideDetails: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cyContent = {
  section: ' ',
  title: "A oes gwlad arall wedi gofyn (neu wedi cael cais) am wybodaeth neu gymorth i'r plant?",
  one: 'Oes',
  two: 'Nac oes',
  twoHint:
    'Gall fod pryderon amddiffyn plant, cymorth ar gyfer llys gyda chais am achos arall, angen gorfodi gorchymyn dramor, neu bod ymdrechion yn cael eu gwneud i ddychwelyd y plant i Gymru neu Loegr.',
  continue: 'Continue',
  errors: {
    request: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    iFactorsRequestProvideDetails: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
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
      'Has another country asked (or been asked) for information or help for the children?'
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
    const detailsKnownField = fields.request as FormOptions;
    expect(detailsKnownField.type).toBe('radios');
    expect(detailsKnownField.classes).toBe('govuk-radios');
    expect((detailsKnownField.label as Function)(generatedContent)).toBe(undefined);
    expect((detailsKnownField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((detailsKnownField.hint as Function)(generatedContent)).toBe(enContent.twoHint);
    expect((detailsKnownField.values[0].label as Function)(generatedContent)).toBe(enContent.one);

    (detailsKnownField.values[0].subFields?.iFactorsRequestProvideDetails.validator as Validator)(
      'iFactorsRequestProvideDetails'
    );
    expect(isFieldFilledIn).toHaveBeenCalledWith('iFactorsRequestProvideDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('iFactorsRequestProvideDetails');

    expect((detailsKnownField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
  });

  test('should onlyContinue continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
