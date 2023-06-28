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
    PRL_c1A_previousAbductionsShortDesc: {
      required: 'Briefly describe the previous incidents of abduction',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    PRL_c1A_policeOrInvestigatorInvolved: {
      required: 'Select yes if the police, private investigators or any other organisation was involved',
    },
    PRL_c1A_policeOrInvestigatorOtherDetails: {
      required: 'Provide details of the police, private investigators or any other organisation involvement',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy = {
  caption: 'Pryderon diogelwch',
  title: 'Darparwch fanylion am y digwyddiadau blaenorol o herwgydio',
  line1: "Rhowch ddisgrifiad byr o'r digwyddiadau blaenorol o gipio.",
  c1A_previousAbductionsShortDescHint: "Dylech gynnwys unrhyw ymdrechion blaenorol i fygwth neu gipio'r plant.",
  c1A_policeOrInvestigatorInvolved: 'A oedd yr heddlu, ymchwilwyr preifat neu unrhyw sefydliad arall ynghlwm â hyn?',
  c1A_policeOrInvestigatorInvolvedHint: 'Gan gynnwys yn y DU neu dramor.',
  one: 'Oedd',
  two: 'Nac oedd',
  otherDetails: 'Darparwch fwy o fanylion',
  errors: {
    PRL_c1A_previousAbductionsShortDesc: {
      required: 'Disgrifiwch yn fyr y digwyddiadau blaenorol o herwgydio',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    PRL_c1A_policeOrInvestigatorInvolved: {
      required: 'Dewiswch oedd os oedd yr heddlu, ymchwilwyr preifat neu unrhyw sefydliad arall ynghlwm â hyn',
    },
    PRL_c1A_policeOrInvestigatorOtherDetails: {
      required: 'Rhowch fanylion yr heddlu, ymchwilwyr preifat neu unrhyw sefydliad arall oedd ynghlwm â hyn',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
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
    const previousAbductionsShortDescField = fields.PRL_c1A_previousAbductionsShortDesc as FormOptions;

    expect(previousAbductionsShortDescField.type).toBe('textarea');
    expect((previousAbductionsShortDescField.hint as LanguageLookup)(generatedContent)).toBe(
      en.c1A_previousAbductionsShortDescHint
    );
    (previousAbductionsShortDescField.validator as Function)('test text');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text');

    const policeOrInvestigatorInvolvedField = fields.PRL_c1A_policeOrInvestigatorInvolved as FormOptions;
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
      .PRL_c1A_policeOrInvestigatorOtherDetails as FormInput;

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
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
