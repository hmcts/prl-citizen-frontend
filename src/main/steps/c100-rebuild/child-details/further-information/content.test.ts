import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  headingTitle: 'Further Information',
  childrenKnownToSocialServicesLable: 'Are any of the children known to social service?',
  childrenKnownToSocialServicesHint:
    'State which child and the name of the local authority and social worker, if known',
  childrenSubjectOfProtectionPlanLabel: 'Are any of the children the subject of a a child protection plan?',
  childrenProtectionPlanHint: `A child protection plan is prepared by a local authority where a child is thought to be at risk of significant harm.
  It sets out steps to be taken to protect the child and support the family.`,
  one: 'Yes',
  two: 'No',
  three: "Don't know",
  errors: {
    childrenKnownToSocialServices: {
      required: 'Select if any of the children are known to social services',
    },
    childrenKnownToSocialServicesDetails: {
      required: 'Enter details',
    },
    childrenSubjectOfProtectionPlan: {
      required: 'Select if any of the children are the subject of a child protection plan',
    },
  },
};

const cy = {
  headingTitle: 'Further Information - welsh',
  childrenKnownToSocialServicesLable: 'Are any of the children known to social service - welsh?',
  childrenKnownToSocialServicesHint:
    'State which child and the name of the local authority and social worker, if known - welsh',
  childrenSubjectOfProtectionPlanLabel: 'Are any of the children the subject of a a child protection plan - welsh?',
  childrenProtectionPlanHint: `A child protection plan is prepared by a local authority where a child is thought to be at risk of significant harm.
  It sets out steps to be taken to protect the child and support the family.- welsh`,
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  three: "Don't know - Welsh",
  errors: {
    childrenKnownToSocialServices: {
      required: 'Select if any of the children are known to social services - welsh',
    },
    childrenKnownToSocialServicesDetails: {
      required: 'Enter details - welsh',
    },
    childrenSubjectOfProtectionPlan: {
      required: 'Select if any of the children are the subject of a child protection plan - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child details > further information', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
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

  test('should contain applyingWith field', () => {
    const applyingWithField1 = fields.childrenKnownToSocialServices as FormOptions;
    expect(applyingWithField1.type).toBe('radios');
    expect(applyingWithField1.classes).toBe('govuk-radios');
    expect((applyingWithField1.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField1.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect((applyingWithField1.values[2].label as LanguageLookup)(generatedContent)).toBe(en.three);
    const applyTextField = applyingWithField1.values[0].subFields!.childrenKnownToSocialServicesDetails;
    expect(applyTextField.type).toBe('textarea');
    (applyTextField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');

    const applyingWithField2 = fields.childrenSubjectOfProtectionPlan as FormOptions;
    expect(applyingWithField2.type).toBe('radios');
    expect(applyingWithField2.classes).toBe('govuk-radios');
    expect((applyingWithField2.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField2.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect((applyingWithField2.values[2].label as LanguageLookup)(generatedContent)).toBe(en.three);
  });

  test('should contain onlycontinue button', () => {
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
