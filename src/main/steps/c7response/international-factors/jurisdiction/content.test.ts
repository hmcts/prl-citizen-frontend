import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: ' ',
  title: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'For example, because a court in another country has the power to make decisions or judgments (jurisdiction).',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    jurisdiction: {
      required: 'Please select one of the options before proceeding further',
    },
    iFactorsJurisdictionProvideDetails: {
      required: 'Please fill the provide details field before proceeding further',
    },
  },
};

const cyContent = {
  section: ' ',
  title: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'For example, because a court in another country has the power to make decisions or judgments (jurisdiction).',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    jurisdiction: {
      required: 'Please select one of the options before proceeding further',
    },
    iFactorsJurisdictionProvideDetails: {
      required: 'Please fill the provide details field before proceeding further',
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
    expect(generatedContent.summaryText).toEqual('Contacts for help');
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
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
