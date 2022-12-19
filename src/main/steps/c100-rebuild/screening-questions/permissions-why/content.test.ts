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
  title: 'Pam bod angen caniatâd gan y llys i wneud y cais hwn? (dewisol)',
  line: 'Edrychwch ar<a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">ganllawiau CB1</a> os nad ydych yn siŵr a oes angen caniatâd arnoch i wneud cais',
  select_all_apply: "Dewiswch bob un sy'n berthnasol",
  doNotHaveParentalResponsibility: 'Does gen i ddim cyfrifoldeb rhiant dros y plant',
  doNotHaveParentalResponsibilityHintText: 'Rhowch fanylion',
  section: "Ystyr cyfrifoldeb rhiant yw eich bod yn gyfrifol am y plant a'u heiddo",
  courtOrderPrevent: 'Mae yna orchymyn llys yn fy atal rhag gwneud cais heb gael caniatâd y llys yn gyntaf',
  courtOrderPreventHintText: 'Rhowch fanylion y gorchymyn llys sydd mewn grym',
  anotherReason: 'Rheswm arall',
  anotherReasonHintText: 'Eglurwch pam bod angen caniatâd arnoch i wneud y cais hwn',
  errors: {
    sq_doNotHaveParentalResponsibility_subfield: {
      required: 'Rhowch fanylion pam nad oes gennych gyfrifoldeb rhiant dros y plant',
    },
    sq_courtOrderPrevent_subfield: {
      required: 'Rhowch fanylion am y gorchymyn llys sy’n eich atal rhag gwneud cais',
    },
    sq_anotherReason_subfield: {
      required: 'Rhowch fanylion unrhyw reswm arall',
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
