import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Special arrangements',
  headingTitle: 'Do you or the children need special arrangements at court?',
  line1:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
  select_all_apply: 'Select all that apply to you',
  separateWaitingRoom: 'Separate waiting room',
  separateExitEntrance: 'Separate exits and entrances',
  screenWithOtherPeople: 'Screens so you and the other people in the case cannot see each other',
  screenWithOtherPeopleHint: 'This needs to be approved by a judge',
  separateToilets: 'Separate toilets',
  visitCourtBeforeHearing: 'Visit to court before the hearing',
  videoLinks: 'Video links',
  videoLinksHint: 'This needs to be approved by a judge',
  specialArrangementsOther: 'Other',
  specialArrangementsOtherSubField: 'Provide details of what you or the children need',
  noSafetyRequirements: 'No, I do not have any safety requirements at this time',
  errors: {
    specialArrangementsOtherSubField: {
      required: 'Give details of the special arrangements you or the children need',
    },
    specialArrangements: {
      required: 'Select whether you or the children need special arrangements at court',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Special arrangements - welsh',
  headingTitle: 'Do you or the children need special arrangements at court? - welsh',
  line1:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court. - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  separateWaitingRoom: 'Separate waiting room - welsh',
  separateExitEntrance: 'Separate exits and entrances - welsh',
  screenWithOtherPeople: 'Screens so you and the other people in the case cannot see each other - welsh',
  screenWithOtherPeopleHint: 'This needs to be approved by a judge - welsh',
  separateToilets: 'Separate toilets - welsh',
  visitCourtBeforeHearing: 'Visit to court before the hearing - welsh',
  videoLinks: 'Video links - welsh',
  videoLinksHint: 'This needs to be approved by a judge - welsh',
  specialArrangementsOther: 'Other - welsh',
  specialArrangementsOtherSubField: 'Provide details of what you or the children need - welsh',
  noSafetyRequirements: 'No, I do not have any safety requirements at this time - welsh',
  errors: {
    specialArrangementsOtherSubField: {
      required: 'Give details of the special arrangements you or the children need - welsh',
    },
    specialArrangements: {
      required: 'Select whether you or the children need special arrangements at court - welsh',
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
    const specialArrangementsField = fields.specialArrangements as FormOptions;
    const specialArrangementsOtherSubFields = specialArrangementsField.values[6].subFields
      ?.specialArrangementsOtherSubField as FormOptions;

    expect(specialArrangementsField.type).toBe('checkboxes');
    expect(specialArrangementsOtherSubFields.type).toBe('textarea');
    expect((specialArrangementsOtherSubFields?.label as Function)(generatedContent)).toBe(
      en.specialArrangementsOtherSubField
    );

    expect((specialArrangementsField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((specialArrangementsField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.separateWaitingRoom);
    expect((specialArrangementsField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.separateExitEntrance
    );
    expect((specialArrangementsField.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.screenWithOtherPeople
    );
    expect((specialArrangementsField.values[2].hint as LanguageLookup)(generatedContent)).toBe(
      en.screenWithOtherPeopleHint
    );
    expect((specialArrangementsField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.separateToilets);
    expect((specialArrangementsField.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.visitCourtBeforeHearing
    );
    expect((specialArrangementsField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.videoLinks);
    expect((specialArrangementsField.values[5].hint as LanguageLookup)(generatedContent)).toBe(en.videoLinksHint);
    expect((specialArrangementsField.values[6].label as LanguageLookup)(generatedContent)).toBe(
      en.specialArrangementsOther
    );
    expect((specialArrangementsField.values[8].label as LanguageLookup)(generatedContent)).toBe(
      en.noSafetyRequirements
    );

    expect(specialArrangementsField.values[8].behaviour).toBe('exclusive');

    (specialArrangementsField.validator as Function)('separateWaitingRoom');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('separateWaitingRoom');

    (specialArrangementsOtherSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
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
