import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need to bring support with me to a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
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
      required: 'Select what you need to bring support with you to a court hearing',
    },
    supportWorkerDetails: {
      required: 'Please provide support worker details',
    },
    familyProviderDetails: {
      required: 'Please provide family member details',
    },
    therapyDetails: {
      required: 'Please provide therapy animal details',
    },
    communicationSupportOther: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf eisiau dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad llys',
  courtcommunication:
    'Meddyliwch am yr hyn y byddwch ei angen os bydd eich gwrandawiad yn un wyneb yn wyneb, trwy fideo neu dros y ffôn.',
  optionHint: "Dewiswch bob un sy'n berthnasol i chi",
  summaryText: 'Contacts for help',
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
      required: 'Select what you need to bring support with you to a court hearing',
    },
    supportWorkerDetails: {
      required: 'Please provide support worker details',
    },
    familyProviderDetails: {
      required: 'Please provide family member details',
    },
    therapyDetails: {
      required: 'Please provide therapy animal details',
    },
    communicationSupportOther: {
      required: 'Please provide the details',
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
    expect(generatedContent.summaryText).toEqual('Contacts for help');
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
    expect((courthearingField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
