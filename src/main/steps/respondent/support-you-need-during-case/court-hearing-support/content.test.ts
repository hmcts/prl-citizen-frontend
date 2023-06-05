import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need to bring support with me to a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  supportworker: 'A support worker or carer',
  supportWorkerDetails: 'Tell us who you will bring',
  familymember: 'A friend or family member',
  familyMemberDetails: 'Tell us who you will bring',
  assistance: 'Assistance / guide dog',
  animal: 'Therapy animal',
  animalDetails: 'Describe what you need',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    courtHearing: {
      required: 'Select what help you need to bring support with you to a court hearing',
    },
    supportWorkerDetails: {
      required: 'Please provide support worker details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    familyProviderDetails: {
      required: 'Please provide family member details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    therapyDetails: {
      required: 'Please provide therapy animal details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    communicationSupportOther: {
      required: 'Please provide the details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf eisiau dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad llys',
  courtcommunication:
    'Meddyliwch am yr hyn y byddwch ei angen os bydd eich gwrandawiad yn un wyneb yn wyneb, trwy fideo neu dros y ffôn.',
  optionHint: 'Dogfennau mewn lliw penodol',
  supportworker: 'Gweithiwr cymorth neu ofalwr',
  supportWorkerDetails: 'Tell us who you will bring',
  familymember: "ffrind neu aelod o'r teulu",
  familyMemberDetails: 'Tell us who you will bring',
  assistance: 'Ci cymorth / ci tywys',
  animal: 'Anifail therapi',
  animalDetails: 'Describe what you need',
  other: 'Arall',
  otherDetails: 'Describe what you need',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Continue',
  errors: {
    courtHearing: {
      required: 'Select what help you need to bring support with you to a court hearing',
    },
    supportWorkerDetails: {
      required: 'Please provide support worker details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    familyProviderDetails: {
      required: 'Please provide family member details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    therapyDetails: {
      required: 'Please provide therapy animal details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    communicationSupportOther: {
      required: 'Please provide the details',
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
    expect(generatedContent.title).toEqual('I need to bring support with me to a court hearing');
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtcommunication).toEqual(
      'Consider in-person, phone or video, in case your preferred hearing type is not possible'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.supportworker).toEqual('A support worker or carer');
    expect(generatedContent.supportWorkerDetails).toEqual('Tell us who you will bring');
    expect(generatedContent.familymember).toEqual('A friend or family member');
    expect(generatedContent.familyMemberDetails).toEqual('Tell us who you will bring');
    expect(generatedContent.assistance).toEqual('Assistance / guide dog');
    expect(generatedContent.animal).toEqual('Therapy animal');
    expect(generatedContent.animalDetails).toEqual('Describe what you need');
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.otherDetails).toEqual('Describe what you need');
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
    const courthearingField = fields.courtHearing as FormOptions;
    expect(courthearingField.type).toBe('checkboxes');
    expect((courthearingField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((courthearingField.section as Function)(generatedContent)).toBe(en.section);
    expect((courthearingField.values[0].label as Function)(generatedContent)).toBe(en.supportworker);
    expect((courthearingField.values[0].subFields?.supportWorkerDetails.label as Function)(generatedContent)).toBe(en.supportWorkerDetails);
    expect((courthearingField.values[0].subFields?.supportWorkerDetails.validator as Function)(generatedContent)).toBe(undefined);
    
    expect((courthearingField.values[1].label as Function)(generatedContent)).toBe(en.familymember);
    expect((courthearingField.values[1].subFields?.familyProviderDetails.label as Function)(generatedContent)).toBe(en.familyMemberDetails);
    expect((courthearingField.values[1].subFields?.familyProviderDetails.validator as Function)(generatedContent)).toBe(undefined);

    expect((courthearingField.values[2].label as Function)(generatedContent)).toBe(en.assistance);
    expect((courthearingField.values[3].label as Function)(generatedContent)).toBe(en.animal);
    expect((courthearingField.values[3].subFields?.therapyDetails.label as Function)(generatedContent)).toBe(en.animalDetails);
    expect((courthearingField.values[3].subFields?.therapyDetails.validator as Function)(generatedContent)).toBe(undefined);

    expect((courthearingField.values[4].label as Function)(generatedContent)).toBe(en.other);
    expect((courthearingField.values[4].subFields?.communicationSupportOther.label as Function)(generatedContent)).toBe(en.otherDetails);
    expect((courthearingField.values[4].subFields?.communicationSupportOther.validator as Function)(generatedContent)).toBe(undefined);

    expect((courthearingField.values[6].label as Function)(generatedContent)).toBe(en.nosupport);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
