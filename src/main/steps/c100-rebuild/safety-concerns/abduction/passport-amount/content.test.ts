import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'Safety concerns',
  title: 'Provide details of the children’s passports',
  childrenMoreThanOnePassport: 'Do the children have more than one passport?',
  possessionChildrenPassport: 'Who is in possession of the children’s passports?',
  select_all_relevant: 'Select all that apply',
  one: 'Yes',
  two: 'No',
  option1: 'Mother',
  option2: 'Father',
  option3: 'Other',
  otherDetails: 'Provide more details',
  errors: {
    c1A_childrenMoreThanOnePassport: {
      required: 'Select yes if the children have more than one passport',
    },
    c1A_possessionChildrenPassport: {
      required: "Specify who is in possession of the children's passports",
    },
    c1A_provideOtherDetails: {
      required: 'Please provide the details',
    },
  },
};

const cy = {
  caption: 'Pryderon diogelwch',
  title: 'Darparu manylion pasbortau y plant',
  childrenMoreThanOnePassport: 'A oes gan y plant fwy nag un pasbort?',
  possessionChildrenPassport: "Ym meddiant pwy y mae pasbortau'r plant?",
  select_all_relevant: "Dewiswch bob un sy'n berthnasol",
  one: 'Oes',
  two: 'Nac oes',
  option1: 'Mam',
  option2: 'Tad',
  option3: 'Arall',
  otherDetails: 'Darparwch fwy o fanylion',
  errors: {
    c1A_childrenMoreThanOnePassport: {
      required: 'Dewis oes os oes gan y plant fwy nag un pasbort',
    },
    c1A_possessionChildrenPassport: {
      required: "Nodwch ym meddiant pwy y mae pasbortau'r plant?",
    },
    c1A_provideOtherDetails: {
      required: 'Darparwch fwy o fanylion',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('safetyconcerns > abduction > passport amount > content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childrenMoreThanOnePassportField = fields.c1A_childrenMoreThanOnePassport as FormOptions;

    expect(childrenMoreThanOnePassportField.type).toBe('radios');
    expect(childrenMoreThanOnePassportField.classes).toBe('govuk-radios');
    expect((childrenMoreThanOnePassportField.label as LanguageLookup)(generatedContent)).toBe(
      en.childrenMoreThanOnePassport
    );
    expect((childrenMoreThanOnePassportField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((childrenMoreThanOnePassportField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);

    const possessionChildrenPassportField = fields.c1A_possessionChildrenPassport as FormOptions;
    const provideOtherDetails = possessionChildrenPassportField.values[2].subFields!
      .c1A_provideOtherDetails as FormInput;

    expect(possessionChildrenPassportField.type).toBe('checkboxes');
    expect((possessionChildrenPassportField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_relevant);
    expect((possessionChildrenPassportField.label as LanguageLookup)(generatedContent)).toBe(
      en.possessionChildrenPassport
    );
    expect((possessionChildrenPassportField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.option1);
    expect((possessionChildrenPassportField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.option2);
    expect((possessionChildrenPassportField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.option3);

    expect(provideOtherDetails.type).toBe('textarea');
    expect((provideOtherDetails.label as LanguageLookup)(generatedContent)).toBe(en.otherDetails);
    (provideOtherDetails.validator as Function)('test text');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text');
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
