import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'Safety concerns',
  title: 'Provide details of the previous abductions',
  line1: 'Give a short description of the previous incidents of abduction.',
  c1A_previousAbductionsShortDescHint: 'Include any previous attempts to threaten or abduct the children.',
  c1A_policeOrInvestigatorInvolved: 'Were the police, private investigators or any other organisation involved?',
  c1A_policeOrInvestigatorInvolvedHint: 'Including in the UK or overseas.',
  one: 'Yes',
  two: 'No',
  otherDetails: 'Provide more details',
  errors: {
    c1A_previousAbductionsShortDesc: {
      required: 'Briefly describe the previous incidents of abduction',
    },
    c1A_policeOrInvestigatorInvolved: {
      required: 'Select yes if the police, private investigators or any other organisation was involved',
    },
    c1A_policeOrInvestigatorOtherDetails: {
      required: 'Provide details of the police, private investigators or any other organisation involvement',
    },
  },
};

const cy = {
  caption: 'Safety concerns - welsh',
  title: 'Provide details of the previous abductions - welsh',
  line1: 'Give a short description of the previous incidents of abduction. - welsh',
  c1A_previousAbductionsShortDescHint: 'Include any previous attempts to threaten or abduct the children. - welsh',
  c1A_policeOrInvestigatorInvolved:
    'Were the police, private investigators or any other organisation involved? - welsh',
  c1A_policeOrInvestigatorInvolvedHint: 'Including in the UK or overseas. - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  otherDetails: 'Provide more details - welsh',
  errors: {
    c1A_previousAbductionsShortDesc: {
      required: 'Briefly describe the previous incidents of abduction - welsh',
    },
    c1A_policeOrInvestigatorInvolved: {
      required: 'Select yes if the police, private investigators or any other organisation was involved - welsh',
    },
    c1A_policeOrInvestigatorOtherDetails: {
      required: 'Provide details of the police, private investigators or any other organisation involvement - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('safetyconcerns > abduction > previous abductions > content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain previous abductions fields', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const previousAbductionsShortDescField = fields.c1A_previousAbductionsShortDesc as FormOptions;

    expect(previousAbductionsShortDescField.type).toBe('textarea');
    expect((previousAbductionsShortDescField.hint as LanguageLookup)(generatedContent)).toBe(
      en.c1A_previousAbductionsShortDescHint
    );
    (previousAbductionsShortDescField.validator as Function)('test text');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text');

    const policeOrInvestigatorInvolvedField = fields.c1A_policeOrInvestigatorInvolved as FormOptions;
    expect(policeOrInvestigatorInvolvedField.classes).toBe('govuk-radios');
    expect((policeOrInvestigatorInvolvedField.label as LanguageLookup)(generatedContent)).toBe(
      en.c1A_policeOrInvestigatorInvolved
    );
    expect((policeOrInvestigatorInvolvedField.hint as LanguageLookup)(generatedContent)).toBe(
      en.c1A_policeOrInvestigatorInvolvedHint
    );
    expect((policeOrInvestigatorInvolvedField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((policeOrInvestigatorInvolvedField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);

    const policeOrInvestigatorOtherDetails = policeOrInvestigatorInvolvedField.values[0].subFields!
      .c1A_policeOrInvestigatorOtherDetails as FormInput;

    expect(policeOrInvestigatorOtherDetails.type).toBe('textarea');
    expect((policeOrInvestigatorOtherDetails.label as LanguageLookup)(generatedContent)).toBe(en.otherDetails);
    (policeOrInvestigatorOtherDetails.validator as Function)('test text');
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
