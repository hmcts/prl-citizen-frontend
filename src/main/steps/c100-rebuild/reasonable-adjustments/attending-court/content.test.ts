import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Attending the court',
  headingTitle: `Would you be able to take 
  part in hearings by video and phone?`,
  paragraph1: 'If your case goes to a hearing, it can take place either:',
  paragraph2: `Some hearings use a combination of these methods. 
  The approach taken will be decided by a judge.`,
  line1: "in person, in a room at a venue ('face-to-face')",
  line2: 'by video (where you can join from a place suitable to you)',
  line3: 'by phone',
  select_all_apply: 'Select all that apply',
  videoHearing: 'Yes, I can take part in video hearings',
  phoneHearing: 'Yes, I can take part in phone hearings',
  noVideoAndPhoneHearing: 'No, I cannot take part in either video or phone hearings',
  noVideoAndPhoneHearingReason: 'If you choose this option please tell us why in case we can assist you',
  noVideoAndPhoneHearingExplanation: 'Explain why you are unable to take part in video or phone hearings',
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Attending the court - welsh',
  headingTitle: `Would you be able to take 
  part in hearings by video and phone? - welsh`,
  paragraph1: 'If your case goes to a hearing, it can take place either: - welsh',
  paragraph2: `Some hearings use a combination of these methods. 
  The approach taken will be decided by a judge. - welsh`,
  line1: "in person, in a room at a venue ('face-to-face') - welsh",
  line2: 'by video (where you can join from a place suitable to you) - welsh',
  line3: 'by phone - welsh',
  select_all_apply: 'Select all that apply - welsh',
  videoHearing: 'Yes, I can take part in video hearings - welsh',
  phoneHearing: 'Yes, I can take part in phone hearings - welsh',
  noVideoAndPhoneHearing: 'No, I cannot take part in either video or phone hearings - welsh',
  noVideoAndPhoneHearingReason: 'If you choose this option please tell us why in case we can assist you - welsh',
  noVideoAndPhoneHearingExplanation: 'Explain why you are unable to take part in video or phone hearings - welsh',
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

  test('should contain typeOfHearing field', () => {
    const typeOfHearingField = fields.ra_typeOfHearing as FormOptions;
    const noVideoAndPhoneHearingExplanationField = typeOfHearingField.values[3].subFields
      ?.ra_noVideoAndPhoneHearingExplanation as FormOptions;

    expect(typeOfHearingField.type).toBe('checkboxes');
    expect(noVideoAndPhoneHearingExplanationField.type).toBe('textarea');
    expect((noVideoAndPhoneHearingExplanationField.label as LanguageLookup)(generatedContent)).toBe(
      en.noVideoAndPhoneHearingExplanation
    );

    expect((typeOfHearingField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((typeOfHearingField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.videoHearing);
    expect((typeOfHearingField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.phoneHearing);
    expect((typeOfHearingField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.noVideoAndPhoneHearing);
    expect((typeOfHearingField.values[3].hint as LanguageLookup)(generatedContent)).toBe(
      en.noVideoAndPhoneHearingReason
    );
    expect(typeOfHearingField.values[3].behaviour).toBe('exclusive');

    (typeOfHearingField.validator as Function)('videoHearing');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('videoHearing');

    (noVideoAndPhoneHearingExplanationField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');
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
