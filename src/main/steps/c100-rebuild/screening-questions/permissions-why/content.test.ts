import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Why do you need a permission from the court to make this application? (optional)',
  line: 'Consult <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">the CB1 guidance</a> if you are not sure if you need permission to apply',
  select_all_apply: 'Select all that apply',
  doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
  doNotHaveParentalResponsibilityHintText: 'Provide details',
  section: 'parental responsibility means that you are responsible for the children and their property',
  courtOrderPrevent:
    'There is a court order preventing me from making an application without first getting the permission of the court',
  courtOrderPreventHintText: 'Provide details of the court order in place',
  anotherReason: 'Another reason',
  anotherReasonHintText: 'Provide details for why you need permission to make this application',
  errors: {
    sq_doNotHaveParentalResponsibility_subfield: {
      required: "Provide details for 'I do not have parental responsibility for the children'",
    },
    sq_courtOrderPrevent_subfield: {
      required: "Provide details for 'There is a court order preventing me from making an application'",
    },
    sq_anotherReason_subfield: {
      required: 'Provide details for another reason',
    },
  },
};

const cy = {
  title: 'Why do you need a permission from the court to make this application? (optional) - welsh',
  line: 'Consult <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">the CB1 guidance</a> if you are not sure if you need permission to apply - welsh',
  select_all_apply: 'Select all that apply - welsh',
  doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children - welsh',
  doNotHaveParentalResponsibilityHintText: 'Provide details - welsh',
  section: 'parental responsibility means that you are responsible for the children and their property - welsh',
  courtOrderPrevent:
    'There is a court order preventing me from making an application without first getting the permission of the court - welsh',
  courtOrderPreventHintText: 'Provide details of the court order in place - welsh',
  anotherReason: 'Another reason - welsh',
  anotherReasonHintText: 'Provide details for why you need permission to make this application - welsh',
  errors: {
    sq_doNotHaveParentalResponsibility_subfield: {
      required: "Provide details for 'I do not have parental responsibility for the children' - welsh",
    },
    sq_courtOrderPrevent_subfield: {
      required: "Provide details for 'There is a court order preventing me from making an application' - welsh",
    },
    sq_anotherReason_subfield: {
      required: 'Provide details for another reason - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Screening questions > permissions-why', () => {
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

  test('should contain sq_permissionsWhy field', () => {
    const permissionsWhyField = fields.sq_permissionsWhy as FormOptions;
    expect(permissionsWhyField.type).toBe('checkboxes');

    expect((permissionsWhyField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((permissionsWhyField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.doNotHaveParentalResponsibility
    );
    expect((permissionsWhyField.values[0].hint as LanguageLookup)(generatedContent)).toBe(en.section);
    expect((permissionsWhyField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.courtOrderPrevent);
    expect((permissionsWhyField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.anotherReason);
    const sq_doNotHaveParentalResponsibility_subfield = permissionsWhyField.values[0].subFields
      ?.sq_doNotHaveParentalResponsibility_subfield as FormOptions;
    expect(sq_doNotHaveParentalResponsibility_subfield.type).toBe('textarea');
    const sq_courtOrderPrevent_subfield = permissionsWhyField.values[1].subFields
      ?.sq_courtOrderPrevent_subfield as FormOptions;
    expect(sq_courtOrderPrevent_subfield.type).toBe('textarea');
    const sq_anotherReason_subfield = permissionsWhyField.values[2].subFields?.sq_anotherReason_subfield as FormOptions;
    expect(sq_anotherReason_subfield.type).toBe('textarea');
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
