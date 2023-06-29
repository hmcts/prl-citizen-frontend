import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'Would you be willing to attend a MIAM?',
  one: 'Yes',
  two: 'No',
  explainWhyLabel: 'Explain why',
  miamCostExemptionsLabel: 'Help with MIAM costs and exemptions',
  onlyContinue: 'Continue',
  errors: {
    miamWillingness: {
      required: 'Select yes if you are willing to attend a MIAM',
    },
    miamNotWillingExplnation: {
      required: 'Explain why',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cyContent = {
  title: "A fyddech chi'n fodlon mynychu MIAM?",
  one: 'Byddwn',
  two: 'Na fyddwn',
  explainWhyLabel: 'Eglurwch pam',
  miamCostExemptionsLabel: 'Help gyda chostau ac esemptiadau MIAM',
  onlyContinue: 'Parhau',
  errors: {
    miamWillingness: {
      required: 'Dewiswch ydw os ydych chi’n fodlon mynychu MIAM',
    },
    miamNotWillingExplnation: {
      required: 'Eglurwch pam',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
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
    expect(generatedContent.title).toEqual('Would you be willing to attend a MIAM?');
    expect(generatedContent.miamCostExemptionsLabel).toEqual('Help with MIAM costs and exemptions');
    expect(generatedContent.explainWhyLabel).toEqual('Explain why');
    expect(generatedContent.one).toEqual('Yes');
    expect(generatedContent.two).toEqual('No');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain miamWillingness field', () => {
    const miamWillingnessField = fields.miamWillingness as FormOptions;
    expect(miamWillingnessField.type).toBe('radios');
    expect(miamWillingnessField.classes).toBe('govuk-radios');
    (miamWillingnessField.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
