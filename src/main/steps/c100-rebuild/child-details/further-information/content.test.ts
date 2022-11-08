import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Further Information',
  childrenKnownToSocialServicesLabel: 'Are any of the children known to social service?',
  childrenKnownToSocialServicesHint:
    'State which child and the name of the local authority and social worker, if known',
  childrenSubjectOfProtectionPlanLabel: 'Are any of the children the subject of a a child protection plan?',
  childrenProtectionPlanHint: `A child protection plan is prepared by a local authority where a child is thought to be at risk of significant harm.
  It sets out steps to be taken to protect the child and support the family.`,
  one: 'Yes',
  two: 'No',
  three: "Don't know",
  errors: {
    cd_childrenKnownToSocialServices: {
      required: 'Select if any of the children are known to social services',
    },
    cd_childrenKnownToSocialServicesDetails: {
      required: 'Enter details',
    },
    cd_childrenSubjectOfProtectionPlan: {
      required: 'Select if any of the children are the subject of a child protection plan',
    },
  },
};

const cy = {
  title: 'Further Information - welsh',
  childrenKnownToSocialServicesLabel: 'Are any of the children known to social service - welsh?',
  childrenKnownToSocialServicesHint:
    'State which child and the name of the local authority and social worker, if known - welsh',
  childrenSubjectOfProtectionPlanLabel: 'Are any of the children the subject of a a child protection plan - welsh?',
  childrenProtectionPlanHint: `A child protection plan is prepared by a local authority where a child is thought to be at risk of significant harm.
  It sets out steps to be taken to protect the child and support the family.- welsh`,
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  three: "Don't know - Welsh",
  errors: {
    cd_childrenKnownToSocialServices: {
      required: 'Select if any of the children are known to social services - welsh',
    },
    cd_childrenKnownToSocialServicesDetails: {
      required: 'Enter details - welsh',
    },
    cd_childrenSubjectOfProtectionPlan: {
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
    const {
      cd_childrenKnownToSocialServices: childrenKnownToSocialServices,
      cd_childrenSubjectOfProtectionPlan: childrenSubjectOfProtectionPlan,
    } = fields as Record<string, FormFields>;
    const { cd_childrenKnownToSocialServicesDetails: childrenKnownToSocialServicesDetails } =
      childrenKnownToSocialServices.values[0].subFields;

    expect(childrenKnownToSocialServices.type).toBe('radios');
    expect(childrenKnownToSocialServices.classes).toBe('govuk-radios');
    expect((childrenKnownToSocialServices.label as LanguageLookup)(generatedContent)).toBe(
      en.childrenKnownToSocialServicesLabel
    );
    expect((childrenKnownToSocialServices.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((childrenKnownToSocialServices.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect((childrenKnownToSocialServices.values[2].label as LanguageLookup)(generatedContent)).toBe(en.three);
    (childrenKnownToSocialServices.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');

    expect(childrenKnownToSocialServicesDetails.type).toBe('textarea');
    expect((childrenKnownToSocialServicesDetails.hint as LanguageLookup)(generatedContent)).toBe(
      en.childrenKnownToSocialServicesHint
    );
    (childrenKnownToSocialServicesDetails.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');

    expect(childrenSubjectOfProtectionPlan.type).toBe('radios');
    expect(childrenSubjectOfProtectionPlan.classes).toBe('govuk-radios');
    expect((childrenSubjectOfProtectionPlan.label as LanguageLookup)(generatedContent)).toBe(
      en.childrenSubjectOfProtectionPlanLabel
    );
    expect((childrenSubjectOfProtectionPlan.hint as LanguageLookup)(generatedContent)).toBe(
      en.childrenProtectionPlanHint
    );
    expect((childrenSubjectOfProtectionPlan.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((childrenSubjectOfProtectionPlan.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect((childrenSubjectOfProtectionPlan.values[2].label as LanguageLookup)(generatedContent)).toBe(en.three);
    (childrenSubjectOfProtectionPlan.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
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
