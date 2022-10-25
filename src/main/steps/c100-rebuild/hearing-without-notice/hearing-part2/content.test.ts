import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  hearing2title: 'Details of without notice hearing',
  line1: 'Give details of why you’re asking for a without notice hearing',
  hint: 'A judge will need to be sure that there is a good reason why the other people in the application should not be told about the application before the hearing takes place.',
  doYouNeedAWithoutNoticeHearingLabel:
    'Are you asking for a without notice hearing because the other person or people may do something that would obstruct the order you are asking for if they knew about the application?',
  doYouRequireAHearingWithReducedNoticeLabel:
    'Are you asking for a without notice hearing because there is literally no time to give notice of the application to the other person or people?',
  doYouRequireAHearingWithReducedNoticeHint:
    'This may be relevant in cases of exceptional urgency where the order is needed to prevent a threatened wrongful act. In some cases you may still be expected to have tried to give informal notice for example by telephone, text message, or email.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    hwn_reasonsForApplicationWithoutNotice: {
      required: 'Enter details',
    },
    hwn_doYouNeedAWithoutNoticeHearing: {
      required: 'Select yes if the other person may obstruct',
    },
    hwn_doYouRequireAHearingWithReducedNotice: {
      required: "Select yes if there's no time to give notice",
    },
    hwn_doYouNeedAWithoutNoticeHearingDetails: {
      required: 'Enter details',
    },
    hwn_doYouRequireAHearingWithReducedNoticeDetails: {
      required: 'Enter details',
    },
  },
};

const cy = {
  hearing2title: 'Details of without notice hearing - welsh',
  line1: 'Give details of why you’re asking for a without notice hearing - welsh',
  hint: 'A judge will need to be sure that there is a good reason why the other people in the application should not be told about the application before the hearing takes place. - welsh',
  doYouNeedAWithoutNoticeHearingLabel:
    'Are you asking for a without notice hearing because the other person or people may do something that would obstruct the order you are asking for if they knew about the application? - welsh',
  doYouRequireAHearingWithReducedNoticeLabel:
    'Are you asking for a without notice hearing because there is literally no time to give notice of the application to the other person or people? - welsh',
  doYouRequireAHearingWithReducedNoticeHint:
    'This may be relevant in cases of exceptional urgency where the order is needed to prevent a threatened wrongful act. In some cases you may still be expected to have tried to give informal notice for example by telephone, text message, or email. - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  provideDetails: 'Provide details -welsh',
  errors: {
    hwn_reasonsForApplicationWithoutNotice: {
      required: 'Enter details - welsh',
    },
    hwn_doYouNeedAWithoutNoticeHearing: {
      required: 'Select yes if the other person may obstruct - welsh',
    },
    hwn_doYouRequireAHearingWithReducedNotice: {
      required: "Select yes if there's no time to give notice - welsh",
    },
    hwn_doYouNeedAWithoutNoticeHearingDetails: {
      required: 'Enter details - welsh',
    },
    hwn_doYouRequireAHearingWithReducedNoticeDetails: {
      required: 'Enter details - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Hearing without notice part2', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain hearing without notice fields', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const reasonsForApplicationWithoutNoticeField = fields.hwn_reasonsForApplicationWithoutNotice as FormOptions;
    expect(reasonsForApplicationWithoutNoticeField.type).toBe('textarea');
    (reasonsForApplicationWithoutNoticeField.validator as Function)('Test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Test');

    const doYouNeedAWithoutNoticeHearingField = fields.hwn_doYouNeedAWithoutNoticeHearing as FormOptions;
    expect(doYouNeedAWithoutNoticeHearingField.type).toBe('radios');
    expect(doYouNeedAWithoutNoticeHearingField.classes).toBe('govuk-radios');
    expect((doYouNeedAWithoutNoticeHearingField.label as LanguageLookup)(generatedContent)).toBe(
      en.doYouNeedAWithoutNoticeHearingLabel
    );
    expect((doYouNeedAWithoutNoticeHearingField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((doYouNeedAWithoutNoticeHearingField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    const subfield1 =
      doYouNeedAWithoutNoticeHearingField.values[0].subFields!.hwn_doYouNeedAWithoutNoticeHearingDetails;
    expect((subfield1?.label as Function)(generatedContent)).toBe(en.provideDetails);
    expect(subfield1.type).toBe('textarea');
    (subfield1.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');

    const doYouRequireAHearingWithReducedNoticeField = fields.hwn_doYouRequireAHearingWithReducedNotice as FormOptions;
    expect(doYouRequireAHearingWithReducedNoticeField.type).toBe('radios');
    expect(doYouRequireAHearingWithReducedNoticeField.classes).toBe('govuk-radios');
    expect((doYouRequireAHearingWithReducedNoticeField.label as LanguageLookup)(generatedContent)).toBe(
      en.doYouRequireAHearingWithReducedNoticeLabel
    );
    expect((doYouRequireAHearingWithReducedNoticeField.hint as LanguageLookup)(generatedContent)).toBe(
      en.doYouRequireAHearingWithReducedNoticeHint
    );
    expect(doYouRequireAHearingWithReducedNoticeField.labelSize).toBe('m');
    expect((doYouRequireAHearingWithReducedNoticeField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.one
    );
    expect((doYouRequireAHearingWithReducedNoticeField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.two
    );
    const subfield2 =
      doYouRequireAHearingWithReducedNoticeField.values[0].subFields!.hwn_doYouRequireAHearingWithReducedNoticeDetails;
    expect((subfield2?.label as Function)(generatedContent)).toBe(en.provideDetails);
    expect(subfield2.type).toBe('textarea');
    (subfield2.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
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
