import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need help travelling to, or moving around court buildings',
  //line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  parkingSpace: 'Parking space close to the venue',
  parkingSpaceSubField: 'Describe why you need this',
  wheelchairAccess: 'Step free / wheelchair access',
  venueWheelchair: 'Use of venue wheelchair',
  accessToilet: 'Accessible toilet',
  helpUsingLift: 'Help using a lift',
  differentTypeChair: 'A different type of chair',
  differentTypeChairSubField: 'Describe what you need',
  differentTypeChairSubFieldHint: 'For example, a chair with back support',
  guideBuilding: 'Guiding in the building',
  travellingCourtOther: 'Other',
  travellingCourtOtherSubField: 'Describe what you need',
  travellingCourtNoOption: 'No, I do not need any support at this time',
  errors: {
    parkingSpaceSubField: {
      required: 'Describe why you need a parking space close to the venue',
    },
    differentTypeChairSubField: {
      required: 'Describe what type of chair you need',
    },
    travellingCourtOtherSubField: {
      required: 'Describe what help you need if travelling to, or moving around court buildings',
    },
    travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need help travelling to, or moving around court buildings - welsh',
  //line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  parkingSpace: 'Parking space close to the venue - welsh',
  parkingSpaceSubField: 'Describe why you need this - welsh',
  wheelchairAccess: 'Step free / wheelchair access - welsh',
  venueWheelchair: 'Use of venue wheelchair - welsh',
  accessToilet: 'Accessible toilet - welsh',
  helpUsingLift: 'Help using a lift - welsh',
  differentTypeChair: 'A different type of chair - welsh',
  differentTypeChairSubField: 'Describe what you need - welsh',
  differentTypeChairSubFieldHint: 'For example, a chair with back support - welsh',
  guideBuilding: 'Guiding in the building - welsh',
  travellingCourtOther: 'Other - welsh',
  travellingCourtOtherSubField: 'Describe what you need - welsh',
  travellingCourtNoOption: 'No, I do not need any support at this time - welsh',
  errors: {
    parkingSpaceSubField: {
      required: 'Describe why you need a parking space close to the venue - welsh',
    },
    differentTypeChairSubField: {
      required: 'Describe what type of chair you need - welsh',
    },
    travellingCourtOtherSubField: {
      required: 'Describe what help you need if travelling to, or moving around court buildings - welsh',
    },
    travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings - welsh',
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

  test('should contain travellingCourt field', () => {
    const travellingCourtField = fields.travellingCourt as FormOptions;
    const parkingSpaceSubFields = travellingCourtField.values[0].subFields?.parkingSpaceSubField as FormOptions;

    expect(travellingCourtField.type).toBe('checkboxes');
    expect(parkingSpaceSubFields.type).toBe('textarea');
    expect((parkingSpaceSubFields?.label as Function)(generatedContent)).toBe(en.parkingSpaceSubField);

    (travellingCourtField.validator as Function)('parkingSpace');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('parkingSpace');

    (parkingSpaceSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const differentTypeChairSubFields = travellingCourtField.values[5].subFields
      ?.differentTypeChairSubField as FormOptions;

    expect(travellingCourtField.type).toBe('checkboxes');
    expect(differentTypeChairSubFields.type).toBe('textarea');
    expect((differentTypeChairSubFields?.label as Function)(generatedContent)).toBe(en.differentTypeChairSubField);
    expect((differentTypeChairSubFields?.hint as Function)(generatedContent)).toBe(en.differentTypeChairSubFieldHint);

    (differentTypeChairSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const travellingCourtOtherSubFields = travellingCourtField.values[7].subFields
      ?.travellingCourtOtherSubField as FormOptions;

    expect(travellingCourtOtherSubFields.type).toBe('textarea');
    expect((travellingCourtOtherSubFields?.label as Function)(generatedContent)).toBe(en.travellingCourtOtherSubField);

    (travellingCourtOtherSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    expect(travellingCourtField.type).toBe('checkboxes');
    //expect(friendFamilyMemberSubFields.type).toBe('textarea');
    // expect((friendFamilyMemberSubFields?.label as Function)(generatedContent)).toBe(en.friendFamilyMemberSubField);

    expect((travellingCourtField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((travellingCourtField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.parkingSpace);
    expect((travellingCourtField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.wheelchairAccess);
    expect((travellingCourtField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.venueWheelchair);
    expect((travellingCourtField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.accessToilet);
    expect((travellingCourtField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.helpUsingLift);
    expect((travellingCourtField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.differentTypeChair);
    expect((travellingCourtField.values[6].label as LanguageLookup)(generatedContent)).toBe(en.guideBuilding);
    expect((travellingCourtField.values[7].label as LanguageLookup)(generatedContent)).toBe(en.travellingCourtOther);
    expect((travellingCourtField.values[9].label as LanguageLookup)(generatedContent)).toBe(en.travellingCourtNoOption);

    expect(travellingCourtField.values[9].behaviour).toBe('exclusive');
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
