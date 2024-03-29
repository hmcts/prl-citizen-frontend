import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
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
  summaryText: 'Cysylltiadau am gymorth',
  supportworker: 'Gweithiwr cymorth neu ofalwr',
  supportWorkerDetails: 'Dywedwch wrthym pwy fyddwch yn dod efo chi',
  familymember: "ffrind neu aelod o'r teulu",
  familyMemberDetails: 'Dywedwch wrthym pwy fyddwch yn dod efo chi',
  assistance: 'Ci cymorth / ci tywys',
  animal: 'Anifail therapi',
  animalDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    courtHearing: {
      required: 'Dewiswch pa gymorth sydd ei angen arnoch i ddod â rhywun efo chi i’ch cefnogi mewn gwrandawiad llys',
    },
    supportWorkerDetails: {
      required: 'Rhowch fanylion eich gweithiwr cymorth',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    familyProviderDetails: {
      required: 'Rhowch fanylion aelod o’ch teulu',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    therapyDetails: {
      required: 'Rhowch fanylion yr anifail therapi',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    communicationSupportOther: {
      required: 'Rhowch fanylion',
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
    expect((courthearingField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((courthearingField.section as Function)(generatedContent)).toBe(en.section);
    expect((courthearingField.values[0].label as Function)(generatedContent)).toBe(en.supportworker);
    expect((courthearingField.values[0].subFields?.supportWorkerDetails.label as Function)(generatedContent)).toBe(
      en.supportWorkerDetails
    );

    (courthearingField.values[0].subFields?.supportWorkerDetails.validator as Validator)('supportWorkerDetails');
    expect(isFieldFilledIn).toHaveBeenCalledWith('supportWorkerDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('supportWorkerDetails');

    expect((courthearingField.values[1].label as Function)(generatedContent)).toBe(en.familymember);
    expect((courthearingField.values[1].subFields?.familyProviderDetails.label as Function)(generatedContent)).toBe(
      en.familyMemberDetails
    );

    (courthearingField.values[1].subFields?.familyProviderDetails.validator as Validator)('familyProviderDetails');
    expect(isFieldFilledIn).toHaveBeenCalledWith('familyProviderDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('familyProviderDetails');

    expect((courthearingField.values[2].label as Function)(generatedContent)).toBe(en.assistance);
    expect((courthearingField.values[3].label as Function)(generatedContent)).toBe(en.animal);
    expect((courthearingField.values[3].subFields?.therapyDetails.label as Function)(generatedContent)).toBe(
      en.animalDetails
    );

    (courthearingField.values[3].subFields?.therapyDetails.validator as Validator)('therapyDetails');
    expect(isFieldFilledIn).toHaveBeenCalledWith('therapyDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('therapyDetails');

    expect((courthearingField.values[4].label as Function)(generatedContent)).toBe(en.other);
    expect((courthearingField.values[4].subFields?.communicationSupportOther.label as Function)(generatedContent)).toBe(
      en.otherDetails
    );

    (courthearingField.values[4].subFields?.communicationSupportOther.validator as Validator)(
      'communicationSupportOther'
    );
    expect(isFieldFilledIn).toHaveBeenCalledWith('communicationSupportOther');
    expect(isTextAreaValid).toHaveBeenCalledWith('communicationSupportOther');

    expect((courthearingField.values[6].label as Function)(generatedContent)).toBe(en.nosupport);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
