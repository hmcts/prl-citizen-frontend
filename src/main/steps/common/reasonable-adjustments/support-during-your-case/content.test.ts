import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, en as commonContentEN, generatePageContent } from '../../common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'Reasonable adjustments',
  headingTitle:
    'If attending the court, do you or any of the parties involved have a disability for which you require special assistance or special facilities?',
  yes: 'Yes',
  no: 'No',
  assistanceRequired: 'Give details in the box below.',
  errors: {
    ra_assistanceRequirements_subfield: {
      required:
        "Provide details for 'If attending the court, do you or any of the parties involved have a disability for which you require special assistance or special facilities?'",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_assistanceRequirements: {
      required:
        'Select whether any of the parties involved have a disability for which you require special assistance or special facilities',
    },
  },
};

const cy = {
  caption: 'Addasiadau rhesymol',
  headingTitle:
    'Os byddwch yn mynychu’r llys, a oes gennych chi neu unrhywun o’r partïon cysylltiedig anabledd y bydd angen cymorth neu gyfleusterau arbennig arnoch ar ei gyfer?',
  yes: 'Ydw',
  no: 'Nac ydw',
  assistanceRequired: 'Os Oes, nodwch beth yw’r anghenion hynny',
  errors: {
    ra_assistanceRequirements_subfield: {
      required:
        "Rhowch fanylion 'Os byddwch yn mynychu’r llys, a oes gennych chi neu unrhywun o’r partïon cysylltiedig anabledd y bydd angen cymorth neu gyfleusterau arbennig arnoch ar ei gyfer?'",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_assistanceRequirements: {
      required:
        "Dewiswch a oes gan unrhyw un o'r partïon dan sylw anabledd y mae angen cymorth arbennig neu gyfleusterau arbennig arnynt",
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Disability requirements content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
      },
    },
  } as unknown as CommonContent;
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

  test('should contain assistanceRequirements field', () => {
    const assistanceRequirementsField = fields.ra_assistanceRequirements as FormOptions;
    const assistanceRequiredField = assistanceRequirementsField.values[0].subFields
      ?.ra_assistanceRequirements_subfield as FormOptions;

    expect(assistanceRequirementsField.labelHidden).toBe(true);
    expect(assistanceRequirementsField.type).toBe('radios');
    expect(assistanceRequirementsField.classes).toBe('govuk-radios');
    expect((assistanceRequirementsField.label as Function)(generatedContent)).toBe(en.headingTitle);

    (assistanceRequirementsField.validator as Validator)(generatedContent);
    expect(isFieldFilledIn).toHaveBeenCalled();

    expect((assistanceRequirementsField.values[0].label as Function)(commonContentEN)).toBe(YesOrNo.YES);
    expect((assistanceRequirementsField.values[1].label as Function)(commonContentEN)).toBe(YesOrNo.NO);

    expect(assistanceRequiredField.type).toBe('textarea');
    expect((assistanceRequiredField.label as LanguageLookup)(generatedContent)).toBe(en.assistanceRequired);
    (assistanceRequiredField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');
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
