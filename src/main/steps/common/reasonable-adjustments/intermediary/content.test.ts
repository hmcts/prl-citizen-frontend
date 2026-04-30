import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, en as commonContentEN, generatePageContent } from '../../common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'Reasonable adjustments',
  headingTitle: 'Are you aware of whether an intermediary will be required?',
  yes: 'Yes',
  no: 'No',
  intermediaryRequired: 'Give details in the box below.',
  errors: {
    ra_intermediaryRequired_subfield: {
      required: "Provide details for 'Are you aware of whether an intermediary will be required?'",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_intermediaryRequirements: {
      required: 'Select whether or not an intermediary will be required',
    },
  },
};

const cy = {
  caption: 'Addasiadau rhesymol',
  headingTitle: 'A ydych yn gwybod a fydd angen cyfryngwr?',
  yes: 'Ydw',
  no: 'Nac ydw',
  intermediaryRequired: 'Os Oes, nodwch beth yw’r anghenion hynny',
  errors: {
    ra_intermediaryRequired_subfield: {
      required: "Rhowch fanylion 'A ydych yn gwybod a fydd angen cyfryngwr?'",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_intermediaryRequirements: {
      required: "Dewiswch p'un a fydd angen cyfryngwr ai peidio",
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Intermediary requirements content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/reasonable-adjustments/intermediary',
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

  test('should contain intermediaryRequirements field', () => {
    const intermediaryRequirementsField = fields.ra_intermediaryRequirements as FormOptions;
    const intermediaryRequiredField = intermediaryRequirementsField.values[0].subFields
      ?.ra_intermediaryRequired_subfield as FormOptions;

    expect(intermediaryRequirementsField.labelHidden).toBe(true);
    expect(intermediaryRequirementsField.type).toBe('radios');
    expect(intermediaryRequirementsField.classes).toBe('govuk-radios');
    expect((intermediaryRequirementsField.label as Function)(generatedContent)).toBe(en.headingTitle);

    (intermediaryRequirementsField.validator as Validator)(generatedContent);
    expect(isFieldFilledIn).toHaveBeenCalled();

    expect((intermediaryRequirementsField.values[0].label as Function)(commonContentEN)).toBe(YesOrNo.YES);
    expect((intermediaryRequirementsField.values[1].label as Function)(commonContentEN)).toBe(YesOrNo.NO);

    expect(intermediaryRequiredField.type).toBe('textarea');
    expect((intermediaryRequiredField.label as LanguageLookup)(generatedContent)).toBe(en.intermediaryRequired);
    (intermediaryRequiredField.validator as Function)('test text area');
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
