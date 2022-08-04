import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  line1:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  select_all_apply: 'Select all that apply to you - specific requirements can be given next',
  documentsHelp: 'I need documents in an alternative format',
  documentsHelpHint: 'for example, braille or different colours and text sizes',
  communicationHelp: 'I need help communicating and understanding',
  communicationHelpHint: 'for example, hearing, speaking or interpretation',
  extraSupport: 'I need to bring support with me to a hearing',
  extraSupportHint: 'for example, someone you know or an assistance dog',
  feelComfortableSupport: 'I need something to feel comfortable during a hearing',
  feelComfortableSupportHint: 'for example, extra breaks or extra space',
  helpTravellingMovingBuildingSupport: 'I need help travelling to, or moving around court buildings',
  helpTravellingMovingBuildingSupportHint:
    'for example, access and mobility support if a hearing takes place in person',
  noSupportRequired: 'No, I do not need any support at this time',
  errors: {
    disabilityRequirements: {
      required:
        'Select whether or not you have a physical, mental or learning disability or health condition that means you need support during your case',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case? - welsh',
  line1:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change. - welsh',
  select_all_apply: 'Select all that apply to you - specific requirements can be given next - welsh',
  documentsHelp: 'I need documents in an alternative format - welsh',
  documentsHelpHint: 'for example, braille or different colours and text sizes - welsh',
  communicationHelp: 'I need help communicating and understanding - welsh',
  communicationHelpHint: 'for example, hearing, speaking or interpretation - welsh',
  extraSupport: 'I need to bring support with me to a hearing - welsh',
  extraSupportHint: 'for example, someone you know or an assistance dog - welsh',
  feelComfortableSupport: 'I need something to feel comfortable during a hearing - welsh',
  feelComfortableSupportHint: 'for example, extra breaks or extra space - welsh',
  helpTravellingMovingBuildingSupport: 'I need help travelling to, or moving around court buildings - welsh',
  helpTravellingMovingBuildingSupportHint:
    'for example, access and mobility support if a hearing takes place in person - welsh',
  noSupportRequired: 'No, I do not need any support at this time - welsh',
  errors: {
    disabilityRequirements: {
      required:
        'Select whether or not you have a physical, mental or learning disability or health condition that means you need support during your case - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Disability requirements content', () => {
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

  test('should contain disabilityRequirements field', () => {
    const disabilityRequirementsField = fields.disabilityRequirements as FormOptions;

    expect(disabilityRequirementsField.type).toBe('checkboxes');

    expect((disabilityRequirementsField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((disabilityRequirementsField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.documentsHelp);
    expect((disabilityRequirementsField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.communicationHelp
    );
    expect((disabilityRequirementsField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.extraSupport);
    expect((disabilityRequirementsField.values[3].label as LanguageLookup)(generatedContent)).toBe(
      en.feelComfortableSupport
    );
    expect((disabilityRequirementsField.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.helpTravellingMovingBuildingSupport
    );
    expect(disabilityRequirementsField.values[6].behaviour).toBe('exclusive');
    expect((disabilityRequirementsField.values[6].label as LanguageLookup)(generatedContent)).toBe(
      en.noSupportRequired
    );

    expect((disabilityRequirementsField.values[0].hint as LanguageLookup)(generatedContent)).toBe(en.documentsHelpHint);

    expect((disabilityRequirementsField.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      en.communicationHelpHint
    );
    expect((disabilityRequirementsField.values[2].hint as LanguageLookup)(generatedContent)).toBe(en.extraSupportHint);
    expect((disabilityRequirementsField.values[3].hint as LanguageLookup)(generatedContent)).toBe(
      en.feelComfortableSupportHint
    );
    expect((disabilityRequirementsField.values[4].hint as LanguageLookup)(generatedContent)).toBe(
      en.helpTravellingMovingBuildingSupportHint
    );

    (disabilityRequirementsField.validator as Function)('documentsHelp');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('documentsHelp');
  });

  test('should contain continue button', () => {
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
