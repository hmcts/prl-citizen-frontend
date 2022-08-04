import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need to bring support with me to a court hearing',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  supportWorkerCarer: 'A support worker or carer',
  supportWorkerCarerSubField: 'Tell us who you will bring',
  friendFamilyMember: 'A friend or family member',
  friendFamilyMemberSubField: 'Tell us who you will bring',
  assistanceGuideDog: 'Assistance / guide dog',
  therapyAnimal: 'Therapy animal',
  therapyAnimalSubField: 'Describe what you need',
  supportCourtOther: 'Other',
  supportCourtOtherSubField: 'Describe what you need',
  supportCourtNoOption: 'No, I do not need any support at this time',
  errors: {
    supportWorkerCarerSubField: {
      required: 'Enter the name of the support worker or carer you will bring',
    },
    friendFamilyMemberSubField: {
      required: 'Enter the name of a friend or family member you will bring',
    },
    therapyAnimalSubField: {
      required: 'Describe which therapy animal you will bring',
    },
    supportCourtOtherSubField: {
      required: 'Describe which support you need to bring with you to a hearing ',
    },
    supportCourt: {
      required: 'Select which support you need to bring with you to a hearing',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need to bring support with me to a court hearing - welsh',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  supportWorkerCarer: 'A support worker or carer - welsh',
  supportWorkerCarerSubField: 'Tell us who you will bring - welsh',
  friendFamilyMember: 'A friend or family member - welsh',
  friendFamilyMemberSubField: 'Tell us who you will bring - welsh',
  assistanceGuideDog: 'Assistance / guide dog - welsh',
  therapyAnimal: 'Therapy animal - welsh',
  therapyAnimalSubField: 'Describe what you need - welsh',
  supportCourtOther: 'Other - welsh',
  supportCourtOtherSubField: 'Describe what you need - welsh',
  supportCourtNoOption: 'No, I do not need any support at this time - welsh',
  errors: {
    supportWorkerCarerSubField: {
      required: 'Enter the name of the support worker or carer you will bring - welsh',
    },
    friendFamilyMemberSubField: {
      required: 'Enter the name of a friend or family member you will bring - welsh',
    },
    therapyAnimalSubField: {
      required: 'Describe which therapy animal you will bring - welsh',
    },
    supportCourtOtherSubField: {
      required: 'Describe which support you need to bring with you to a hearing - welsh',
    },
    supportCourt: {
      required: 'Select which support you need to bring with you to a hearing - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain specialArrangements field', () => {
    const supportCourtField = fields.supportCourt as FormOptions;
    const supportWorkerCarerSubFields = supportCourtField.values[0].subFields
      ?.supportWorkerCarerSubField as FormOptions;

    expect(supportCourtField.type).toBe('checkboxes');
    expect(supportWorkerCarerSubFields.type).toBe('textarea');
    expect((supportWorkerCarerSubFields?.label as Function)(generatedContent)).toBe(en.supportWorkerCarerSubField);

    (supportCourtField.validator as Function)('supportWorkerCarer');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('supportWorkerCarer');

    (supportWorkerCarerSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const friendFamilyMemberSubFields = supportCourtField.values[1].subFields
      ?.friendFamilyMemberSubField as FormOptions;

    expect(supportCourtField.type).toBe('checkboxes');
    expect(friendFamilyMemberSubFields.type).toBe('textarea');
    expect((friendFamilyMemberSubFields?.label as Function)(generatedContent)).toBe(en.friendFamilyMemberSubField);

    (friendFamilyMemberSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const therapyAnimalSubFields = supportCourtField.values[3].subFields?.therapyAnimalSubField as FormOptions;

    expect(therapyAnimalSubFields.type).toBe('textarea');
    expect((therapyAnimalSubFields?.label as Function)(generatedContent)).toBe(en.therapyAnimalSubField);

    (therapyAnimalSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const supportCourtOtherSubFields = supportCourtField.values[4].subFields?.supportCourtOtherSubField as FormOptions;

    expect(supportCourtOtherSubFields.type).toBe('textarea');
    expect((supportCourtOtherSubFields?.label as Function)(generatedContent)).toBe(en.supportCourtOtherSubField);

    (supportCourtOtherSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    expect(supportCourtField.type).toBe('checkboxes');
    expect(friendFamilyMemberSubFields.type).toBe('textarea');
    expect((friendFamilyMemberSubFields?.label as Function)(generatedContent)).toBe(en.friendFamilyMemberSubField);

    expect((supportCourtField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((supportCourtField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.supportWorkerCarer);
    expect((supportCourtField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.friendFamilyMember);
    expect((supportCourtField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.assistanceGuideDog);
    expect((supportCourtField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.therapyAnimal);
    expect((supportCourtField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.supportCourtOther);
    expect((supportCourtField.values[6].label as LanguageLookup)(generatedContent)).toBe(en.supportCourtNoOption);

    expect(supportCourtField.values[6].behaviour).toBe('exclusive');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
