import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need something to feel comfortable during a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  appropriatelighting: 'Appropriate lighting',
  lightingDetails: 'Describe what you need',
  break: 'Regular breaks',
  space: 'Space to be able to get up and move around',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    courtComfort: {
      required: 'Select what help you need to feel comfortable during a court hearing',
    },
    lightingProvideDetails: {
      required: 'Please describe lighting detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    otherProvideDetails: {
      required: 'Please describe your need in details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
  courtcommunication:
    'Meddyliwch am yr hyn y byddwch ei angen os bydd eich gwrandawiad yn un wyneb yn wyneb, trwy fideo neu dros y ffôn.',
  optionHint: 'Dogfennau mewn lliw penodol',
  appropriatelighting: 'Goleuadau priodol',
  lightingDetails: 'Describe what you need',
  break: 'Seibiannau rheolaidd',
  space: 'Lle i allu codi a symud o gwmpas',
  other: 'Arall',
  otherDetails: 'Describe what you need',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Continue',
  errors: {
    courtComfort: {
      required: 'Select what help you need to feel comfortable during a court hearing',
    },
    lightingProvideDetails: {
      required: 'Please describe lighting detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    otherProvideDetails: {
      required: 'Please describe your need in details',
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
    expect(generatedContent.title).toEqual('I need something to feel comfortable during a court hearing');
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtcommunication).toEqual(
      'Consider in-person, phone or video, in case your preferred hearing type is not possible'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.appropriatelighting).toEqual('Appropriate lighting');
    expect(generatedContent.break).toEqual('Regular breaks');
    expect(generatedContent.space).toEqual('Space to be able to get up and move around');
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.nosupport).toEqual('No, I do not need any support at this time');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain courthearing field', () => {
    const courtcomfortField = fields.courtComfort as FormOptions;
    expect(courtcomfortField.type).toBe('checkboxes');
    expect((courtcomfortField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((courtcomfortField.section as Function)(generatedContent)).toBe(en.section);
    expect((courtcomfortField.values[0].label as Function)(generatedContent)).toBe(en.appropriatelighting);
    expect((courtcomfortField.values[0].subFields?.lightingProvideDetails.label as Function)(generatedContent)).toBe(
      en.lightingDetails
    );
    expect(
      (courtcomfortField.values[0].subFields?.lightingProvideDetails.validator as Function)(generatedContent)
    ).toBe(undefined);
    expect((courtcomfortField.values[1].label as Function)(generatedContent)).toBe(en.break);
    expect((courtcomfortField.values[2].label as Function)(generatedContent)).toBe(en.space);
    expect((courtcomfortField.values[3].label as Function)(generatedContent)).toBe(en.other);
    expect((courtcomfortField.values[3].subFields?.otherProvideDetails.label as Function)(generatedContent)).toBe(
      en.otherDetails
    );
    expect((courtcomfortField.values[3].subFields?.otherProvideDetails.validator as Function)(generatedContent)).toBe(
      undefined
    );
    expect((courtcomfortField.values[5].label as Function)(generatedContent)).toBe(en.nosupport);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
